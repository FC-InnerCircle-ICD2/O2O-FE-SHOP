import { defineConfig as testConfig } from 'vitest/config'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration
const config = defineConfig({
  plugins: [react()],
})

// Vitest configuration
const tstConfig = testConfig({
  test: {
    environment: 'jsdom',
  },
})

// Merge configurations
export default {
  ...config,
  ...tstConfig,
  server: {
    host: '0.0.0.0',
    port: 3001,
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
  },
}
