import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/restaurants': { target: 'http://localhost:3000', changeOrigin: true },
      '/menus': { target: 'http://localhost:3000', changeOrigin: true },
      '/categories': { target: 'http://localhost:3000', changeOrigin: true },
      '/favoris': { target: 'http://localhost:3000', changeOrigin: true },
    },
  },
})
