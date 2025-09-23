import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,     // <- don’t ship readable source maps
    minify: 'esbuild',    // default, still good; you can use 'terser' if you want heavier minification
  },
})
