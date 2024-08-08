/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test.setup.ts',
  },
  build: {
    outDir: 'dist',
    ssr: 'graph/renderGraphToHTML.tsx',
    rollupOptions: {
      output: {
        assetFileNames: '[name][extname]',
      },
    },
    ssrEmitAssets: true,
  },
})
