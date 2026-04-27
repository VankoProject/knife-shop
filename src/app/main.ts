import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '../style.css'
import App from './App.vue'
import { router } from './router'
import 'vue3-toastify/dist/index.css'
import { initLiveUpdates } from '@/app/live-updates/initLiveUpdates'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

initLiveUpdates()

async function enableMocking(): Promise<void> {
  const { worker } = await import('@/app/mock/browser.ts')
  await worker.start()
}

enableMocking().then(() => {
  app.mount('#app')
})
