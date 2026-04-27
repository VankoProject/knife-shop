import type { Cart } from '@/entities/cart'

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
