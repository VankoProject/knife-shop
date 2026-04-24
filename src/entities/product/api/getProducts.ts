import type { ProductsResponse } from '../model/api-types'
import type { ApiError } from '@/shared/api/api-error.ts'

export async function getProductsRequest(
  page: number,
  limit: number
): Promise<ProductsResponse> {
  const response: Response = await fetch(
    `/api/products?page=${page}&limit=${limit}`
  )

  if (!response.ok) {
    throw (await response.json()) as ApiError
  }

  return response.json()
}
