// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    alias: {
      "@/app": "/src",
      "@/components": "/src/components",
      "@/assets": "/src/assets",
      "@/pages": "/src/pages",
    }
  },
});