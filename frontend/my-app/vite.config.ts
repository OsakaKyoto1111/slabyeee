import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@features': path.resolve(__dirname, './src/features'),
      '@store': path.resolve(__dirname, './src/store'),
      '@routes': path.resolve(__dirname, './src/routes'), 
      '@config': path.resolve(__dirname, './src/config'), 

    }
  }
})
