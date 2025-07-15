import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: '.', // You're already inside the Frontend folder
  publicDir: 'public', // Make sure logo2.svg is inside Frontend/public/
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist', // Netlify will deploy from this
    emptyOutDir: true,
  },
})
