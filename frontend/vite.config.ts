import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages: репозиторий GarantKG → сайт доступен на /GarantKG/
  base: process.env.VITE_BASE_URL || '/GarantKG/',
  server: {
    host: true,
    port: 3000,
    watch: { usePolling: true },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
