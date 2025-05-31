import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const repoName = 'andrewmcconville-design' // ← your GitHub repo name

export default defineConfig({
  plugins: [vue()],
  base: `/${repoName}/`,

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ovenInterface: resolve(__dirname, 'oven-interface/index.html')
      }
    }
  }
})
