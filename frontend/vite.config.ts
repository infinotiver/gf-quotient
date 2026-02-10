import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "src") },
      { find: "@features", replacement: resolve(__dirname, "src/features") },
      { find: "@components", replacement: resolve(__dirname, "src/components") },
      { find: "@hooks", replacement: resolve(__dirname, "src/hooks") },
      { find: "@utils", replacement: resolve(__dirname, "src/utils") },
      { find: "@api", replacement: resolve(__dirname, "src/api") },
    ],
  },
})
