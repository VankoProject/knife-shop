import type { Cart } from '@/entities/cart/model/types'
import type { Product } from '@/entities/product/model/types'
import type { User } from '@/entities/user/model/types'

export interface LoginRequest {
    provider: 'mock'
    nickname: string
    avatar: string
}

export interface LoginResponse {
    token: string
    user: User
}

export interface ProductsResponse {
    items: Product[]
    total: number
    page: number
    limit: number
}

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

