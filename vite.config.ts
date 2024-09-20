import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Determine if we are in development mode
const isDevelopment = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Define your aliases here
      "@/app": "/src",
      "@/components": "/src/components",
      "@/assets": "/src/assets",
      "@/pages": "/src/pages",
    },
  },
  build: {
    outDir: "dist",
    sourcemap: isDevelopment, // Disable source maps in production for security
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
      plugins: [
        // visualizer({
        //   filename: "dist/stats.html", // You can specify the output file for the visualization
        //   open: true, // Open the file automatically in the browser
        // }),
      ],
    }
  }
});
