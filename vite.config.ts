import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Define your aliases here
      "@": "/src",
      "@/components": "/src/components",
      "@/assets": "/src/assets",
      "@/pages": "/src/pages",
      "@/types": "/src/types",
      "@/hooks": "/src/hooks",
    },
  },
});
