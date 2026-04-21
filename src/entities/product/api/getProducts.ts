import type { ProductsResponse } from '../model/api-types'

export async function getProductsRequest(
  page: number,
  limit: number
): Promise<ProductsResponse> {
  const response: Response = await fetch(
    `/api/products?page=${page}&limit=${limit}`
  )

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}
