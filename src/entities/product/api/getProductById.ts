import type { Product } from '@/entities/product/model/types.ts'
import type { ProductErrorResponse } from '@/shared/error/types.ts'

export async function getProductByIdRequest(id: string): Promise<Product> {
  const response: Response = await fetch(`/api/products/${id}`)

  if (!response.ok) {
    const errorData: ProductErrorResponse = await response.json()
    throw errorData as ProductErrorResponse
  }

  return response.json()
}
