import type { ProductsResponse } from '../model/api-types'
import type { ProductFilters } from '@/entities/product/model/filters.ts'
import type { ProductErrorResponse } from '@/shared/error/types.ts'

export async function getProductsRequest(
  filters: ProductFilters
): Promise<ProductsResponse> {
  const params = new URLSearchParams()

  if (filters.q) params.set('q', filters.q)

  if (filters.min !== undefined) params.set('min', String(filters.min))

  if (filters.max !== undefined) params.set('max', String(filters.max))

  if (filters.inStock !== undefined)
    params.set('inStock', String(filters.inStock))

  if (filters.rarity) params.set('rarity', filters.rarity)

  if (filters.sort) params.set('sort', filters.sort)

  params.set('page', String(filters.page))
  params.set('limit', String(filters.limit))
  const url = `/api/products?${params.toString()}`
  console.log('[getProductsRequest] url:', url)
  const response = await fetch(url)
  const data = await response.json()
  console.log('[getProductsRequest] data:', data)
  if (!response.ok) {
    throw data as ProductErrorResponse
  }

  return data as ProductsResponse
}
