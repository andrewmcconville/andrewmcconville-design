import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)

router.isReady().then(() => {
  const pathname = window.location.pathname
  if (
    (pathname.endsWith('/stack-overflow-user-research/') || pathname.endsWith('/stack-overflow-user-research/index.html')) &&
    !window.location.hash
  ) {
    router.replace({ path: '/stack-overflow-user-research' })
  }
  app.mount('#app')
})
