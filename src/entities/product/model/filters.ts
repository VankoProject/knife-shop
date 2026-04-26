import type { Rarity } from '@/entities/product'

export type ProductSort = 'price_asc' | 'price_desc'

export interface ProductFilters {
  q?: string
  min?: number
  max?: number
  inStock?: boolean
  rarity?: Rarity
  sort?: ProductSort
  page: number
  limit: number
}

export const DEFAULT_PRODUCT_FILTERS: ProductFilters = {
  page: 1,
  limit: 20
}
