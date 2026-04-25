import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '../style.css'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

async function enableMocking(): Promise<void> {
  if (import.meta.env.DEV) {
    const { worker } = await import('@/app/mock/browser.ts')
    await worker.start()
  }
}

enableMocking().then(() => {
  app.mount('#app')
})
