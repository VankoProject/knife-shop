import type { Cart } from '@/entities/cart/model/types'

export interface ProductUpdatedEvent {
    type: 'product.updated'
    data: {
        id: string
        changes: {
            price?: number
            inStock?: boolean
            updatedAt?: string 
        }
    }
}

export interface CartSyncedEvent {
    type: 'cart.synced'
    data: {
        cart: Cart
    }
}

export type WsEvent = ProductUpdatedEvent | CartSyncedEvent