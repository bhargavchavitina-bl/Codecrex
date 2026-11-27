import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
