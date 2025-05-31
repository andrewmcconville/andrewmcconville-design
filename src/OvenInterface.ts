import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)

router.isReady().then(() => {
  const pathname = window.location.pathname
  if (
    (pathname.endsWith('/oven-interface/') || pathname.endsWith('/oven-interface/index.html')) &&
    !window.location.hash
  ) {
    router.replace({ path: '/oven-interface' })
  }
  app.mount('#app')
})
