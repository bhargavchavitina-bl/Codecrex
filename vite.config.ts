import { defineConfig, type Plugin, type PreviewServer, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import type { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import { pathToFileURL } from "node:url";

function salaarApiMiddlewarePlugin(): Plugin {
  const routes: Record<string, string> = {
    "/api/salaar/chat": path.resolve(process.cwd(), "api/salaar/chat.ts"),
    "/api/salaar/progress": path.resolve(process.cwd(), "api/salaar/progress.ts"),
    "/api/salaar/streak": path.resolve(process.cwd(), "api/salaar/streak.ts"),
    "/api/salaar/activity": path.resolve(process.cwd(), "api/salaar/activity.ts"),
    "/api/salaar/memory": path.resolve(process.cwd(), "api/salaar/memory.ts"),
    "/api/salaar/practice": path.resolve(process.cwd(), "api/salaar/practice.ts"),
  };

  const compiledCache = new Map<string, string>();

  async function runPreviewHandler(targetFile: string, req: IncomingMessage, res: ServerResponse) {
    let outFile = compiledCache.get(targetFile);
    if (!outFile) {
      const esbuild = await import("esbuild");
      const hash = crypto.createHash("sha1").update(targetFile).digest("hex").slice(0, 10);
      const outDir = path.resolve(process.cwd(), "node_modules/.tmp/preview-api");
      fs.mkdirSync(outDir, { recursive: true });
      outFile = path.join(outDir, `${path.basename(targetFile, ".ts")}-${hash}.mjs`);
      await esbuild.build({
        entryPoints: [targetFile],
        outfile: outFile,
        bundle: true,
        format: "esm",
        platform: "node",
        target: "node20",
        packages: "external",
        sourcemap: false,
      });
      compiledCache.set(targetFile, outFile);
    }
    const mod = (await import(pathToFileURL(outFile).href)) as {
      default?: (r: IncomingMessage, w: ServerResponse) => Promise<void> | void;
    };
    if (typeof mod.default === "function") {
      await mod.default(req, res);
      return;
    }
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: "API handler missing default export." }));
  }

  return {
    name: "codecrex-salaar-api",
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next) => {
        const pathname = (req.url || "/").split("?")[0];
        const targetFile = routes[pathname];
        if (!targetFile) {
          next();
          return;
        }
        try {
          const mod = await server.ssrLoadModule(targetFile);
          if (typeof mod.default === "function") {
            await mod.default(req, res);
            return;
          }
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(JSON.stringify({ error: "API handler missing default export." }));
        } catch (err) {
          console.error(`[Vite Dev API Error] ${pathname}:`, err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ error: (err as Error)?.message || "Internal API error" }));
          }
        }
      });
    },
    configurePreviewServer(server: PreviewServer) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next) => {
        const pathname = (req.url || "/").split("?")[0];
        const targetFile = routes[pathname];
        if (!targetFile) {
          next();
          return;
        }
        try {
          await runPreviewHandler(targetFile, req, res);
        } catch (err) {
          console.error(`[Vite Preview API Error] ${pathname}:`, err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ error: (err as Error)?.message || "Internal API error" }));
          }
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), salaarApiMiddlewarePlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/[/\\]@supabase[/\\]/.test(id)) return "supabase-vendor";
          if (id.includes("framer-motion")) return "motion-vendor";
          if (id.includes("lucide-react")) return "icons-vendor";
          if (/[/\\](?:react|react-dom|react-router|zustand)[/\\]/.test(id))
            return "react-vendor";
        },
      },
    },
  },
});
