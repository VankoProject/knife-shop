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
