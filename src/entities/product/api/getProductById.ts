import type { ProductErrorResponse } from '@/shared/error'
import type { Product } from '@/entities/product'

export async function getProductByIdRequest(id: string): Promise<Product> {
  const response: Response = await fetch(`/api/products/${id}`)

  if (!response.ok) {
    const errorData: ProductErrorResponse = await response.json()
    throw errorData as ProductErrorResponse
  }

  return response.json()
}
