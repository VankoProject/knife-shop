import type { Product } from '@/entities/product/model/types.ts'
import { generateMockProducts } from '@/entities/product/model/mock/products.ts'
import type { ProductFilters } from '@/entities/product/model/filters.ts'
import type { ProductsResponse } from '@/entities/product/model/api-types.ts'

export class ProductMockDatabase {
  private readonly products: Product[]

  constructor() {
    this.products = generateMockProducts(80)
  }

  public productsByFilters(filters: ProductFilters): ProductsResponse {
    let result = [...this.products]

    if (filters.q) {
      const query = filters.q.trim().toLowerCase()

      result = result.filter((product) => {
        return product.name.toLowerCase().includes(query)
      })
    }

    if (filters.min !== undefined) {
      result = result.filter((product) => {
        return product.price >= filters.min!
      })
    }

    if (filters.max !== undefined) {
      result = result.filter((product) => {
        return product.price <= filters.max!
      })
    }

    if (filters.inStock !== undefined) {
      result = result.filter((product) => {
        return product.inStock === filters.inStock
      })
    }

    if (filters.rarity !== undefined) {
      result = result.filter((product) => {
        return product.rarity === filters.rarity
      })
    }

    if (filters.sort) {
      const sortMap = {
        price_asc: (a: Product, b: Product) => a.price - b.price,
        price_desc: (a: Product, b: Product) => b.price - a.price
      }

      result = result.sort(sortMap[filters.sort])
    }

    const total = result.length

    const start = (filters.page - 1) * filters.limit
    const end = start + filters.limit

    const pageItems = result.slice(start, end)

    return {
      items: pageItems,
      total,
      page: filters.page,
      limit: filters.limit
    }
  }

  public productById(id: string): Product {
    const product = this.products.find((product) => product.id === id)

    if (!product) {
      throw {
        status: 404,
        error: 'PRODUCT_NOT_FOUND',
        message: 'Product not found'
      }
    }

    return product
  }
}
