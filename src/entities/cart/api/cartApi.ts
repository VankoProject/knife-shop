import type {
  AddToCartRequest,
  RemoveFromCartRequest,
  UpdateCartItemRequest
} from '@/entities/cart/api/api-types.ts'
import type {
  AddCartErrorResponse,
  ApiErrorResponse,
  UpdateCartErrorResponse
} from '@/shared/error'
import type { Cart } from '@/entities/cart'

export async function getCartApi(): Promise<Cart> {
  const response = await fetch('/api/cart')

  if (!response.ok) {
    throw (await response.json()) as ApiErrorResponse
  }

  return response.json()
}

export async function addToCartApi(request: AddToCartRequest): Promise<Cart> {
  const response = await fetch('/api/cart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })

  if (!response.ok) {
    throw (await response.json()) as AddCartErrorResponse
  }

  return response.json()
}

export async function updateCartItemApi(
  request: UpdateCartItemRequest
): Promise<Cart> {
  const response = await fetch('/api/cart/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })

  if (!response.ok) {
    throw (await response.json()) as UpdateCartErrorResponse
  }

  return response.json()
}

export async function removeCartItemApi(
  request: RemoveFromCartRequest
): Promise<Cart> {
  const response = await fetch('/api/cart/remove', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })

  if (!response.ok) {
    throw (await response.json()) as ApiErrorResponse
  }

  return response.json()
}
