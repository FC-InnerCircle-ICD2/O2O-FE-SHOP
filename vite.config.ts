import { defineConfig as testConfig } from "vitest/config"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// Vite configuration
const config = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

// Vitest configuration
const tstConfig = testConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__test__/setup.ts",
  },
})

// Merge configurations
export default {
  ...config,
  ...tstConfig,
  server: {
    host: "0.0.0.0",
    port: 3001,
  },
  build: {
    outDir: "./dist",
    emptyOutDir: true,
  },
}
