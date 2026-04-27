import type { Product } from './types'

export interface ProductsResponse {
  items: Product[]
  total: number
  page: number
  limit: number
}
