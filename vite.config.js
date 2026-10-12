import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  publicDir: 'public',
  server: { port: 3000 },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: { manualChunks: { vendor: ['gsap', 'vanilla-tilt'] } },
    },
  },
})
