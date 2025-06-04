import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import htmlEnv from './vite-plugin-html-env'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [
    vue(),
    htmlEnv({
      templatePath: 'src/templates/head.html'
    })
  ],
  base: process.env.VITE_REPO_NAME ? `/${process.env.VITE_REPO_NAME}/` : '/',

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
