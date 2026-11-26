import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import type { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";

function salaarDevApiPlugin(): Plugin {
  const routes: Record<string, string> = {
    "/api/salaar/chat": path.resolve(process.cwd(), "api/salaar/chat.ts"),
    "/api/salaar/progress": path.resolve(process.cwd(), "api/salaar/progress.ts"),
    "/api/salaar/streak": path.resolve(process.cwd(), "api/salaar/streak.ts"),
    "/api/salaar/activity": path.resolve(process.cwd(), "api/salaar/activity.ts"),
    "/api/salaar/memory": path.resolve(process.cwd(), "api/salaar/memory.ts"),
    "/api/salaar/practice": path.resolve(process.cwd(), "api/salaar/practice.ts"),
  };

  return {
    name: "codecrex-salaar-dev-api",
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
          res.end(JSON.stringify({ error: "API handler missing default export." }));
        } catch (err) {
          console.error(`[Vite API Middleware Error] ${pathname}:`, err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ error: "Internal API error" }));
          }
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), salaarDevApiPlugin()],
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
