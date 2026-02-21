/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./app/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'app/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        '**/dist/**'
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
      '@shared': path.resolve(__dirname, './shared'),
      '@components': path.resolve(__dirname, './app/components'),
      '@lib': path.resolve(__dirname, './app/lib'),
      '@hooks': path.resolve(__dirname, './app/hooks'),
      '@types': path.resolve(__dirname, './app/types'),
      '@utils': path.resolve(__dirname, './app/utils'),
      '@plugins': path.resolve(__dirname, './app/plugins'),
      '@server': path.resolve(__dirname, './server'),
      '@agents': path.resolve(__dirname, './agents')
    }
  }
})