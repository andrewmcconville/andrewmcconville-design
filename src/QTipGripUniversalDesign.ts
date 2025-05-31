import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)

router.isReady().then(() => {
  const pathname = window.location.pathname
  if (
    (pathname.endsWith('/universal-design-q-tip-grip/') || pathname.endsWith('/universal-design-q-tip-grip/index.html')) &&
    !window.location.hash
  ) {
    router.replace({ path: '/universal-design-q-tip-grip' })
  }
  app.mount('#app')
})
