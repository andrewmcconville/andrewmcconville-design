import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const repoName = 'andrewmcconville-design'

export default defineConfig({
  plugins: [vue()],
  base: `/${repoName}/`,

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        OvenInterface: resolve(__dirname, 'oven-interface/index.html'),
        QTipGripUniversalDesign: resolve(__dirname, 'universal-design-q-tip-grip/index.html'),
        StackOverflowUserResearch: resolve(__dirname, 'stack-overflow-user-research/index.html'),
        AccuLynxUXEngineering: resolve(__dirname, 'ux-engineering/index.html'),
      }
    }
  }
})
