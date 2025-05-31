import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)

router.isReady().then(() => {
  // 3. If we landed on “/index.html” (no hash), ensure router is at `/`:
  const pathname = window.location.pathname
  // Example: “/my-vue-mpa/index.html” or just “/my-vue-mpa/”
  // We treat “/” (or “/index.html”) as Home → route path “/”
  if (
    (pathname === '/my-vue-mpa/' || pathname.endsWith('/index.html')) &&
    !window.location.hash
  ) {
    router.replace({ path: '/' })
  }
  // 4. Mount the app
  app.mount('#app')
})
