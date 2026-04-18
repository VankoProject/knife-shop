export interface CartItem {
    productId: string
    name: string
    price: number
    qty: number
    image: string
    inStock: boolean
}

export interface Cart {
    items: CartItem[]
    subtotal: number
    currency: string
    updatedAt: string
}