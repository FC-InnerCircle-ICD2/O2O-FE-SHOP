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
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@types": path.resolve(__dirname, "./src/types"),
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
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: "./dist",
    emptyOutDir: true,
  },
}
