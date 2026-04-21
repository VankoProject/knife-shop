import type { Cart } from '@/entities/cart/model/types'

export interface CheckoutRequest {
  customer: {
    name: string
    comment?: string
  }
  cart: Cart
}

export interface CheckoutResponse {
  orderId: string
}

export interface AddToCartRequest {
  productId: string
  qty: number
}

export interface UpdateCartItemRequest {
  productId: string
  qty: number
}

export interface RemoveFromCartRequest {
  productId: string
}
