import { useCartStore } from '@/features/cart'
import { useCatalogStore } from '@/features/catalog'
import { useProductStore } from '@/features/product'
import { createWsClient, type WsEvent } from '@/shared/ws'

const DEFAULT_WS_URL = 'ws://localhost:3001/ws'

export function initLiveUpdates(url: string = DEFAULT_WS_URL): () => void {
  const cartStore = useCartStore()
  const catalogStore = useCatalogStore()
  const productStore = useProductStore()

  const client = createWsClient(url, (event: WsEvent) => {
    if (event.type === 'product.updated') {
      catalogStore.applyProductLiveUpdate(event.data.id, event.data.changes)
      productStore.applyProductLiveUpdate(event.data.id, event.data.changes)
      cartStore.applyProductLiveUpdate(event.data.id, event.data.changes)
      return
    }

    if (event.type === 'cart.synced') {
      cartStore.replaceCart(event.data.cart)
    }
  })

  client.connect()

  return client.disconnect
}
