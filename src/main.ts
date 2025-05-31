import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)

router.isReady().then(() => {
  const pathname = window.location.pathname
  
  if (
    (pathname === '/andrewmcconville-design/' || pathname.endsWith('/index.html')) &&
    !window.location.hash
  ) {
    router.replace({ path: '/' })
  }
  // 4. Mount the app
  app.mount('#app')
})
