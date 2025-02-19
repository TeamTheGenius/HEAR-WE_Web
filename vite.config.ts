import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['axios'],
  },
  plugins: [react()],
  cacheDir: '.vite',
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
