import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2019',
  },
  server: {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
