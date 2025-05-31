import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)

router.isReady().then(() => {
  const pathname = window.location.pathname
  if (
    (pathname.endsWith('/ux-engineering/') || pathname.endsWith('/ux-engineering/index.html')) &&
    !window.location.hash
  ) {
    router.replace({ path: '/ux-engineering' })
  }
  app.mount('#app')
})
