import { delay, http, HttpResponse } from 'msw'
import { fakeDb } from '@/app/mock/fakeDb.ts'
import { errorResponse } from '@/app/mock/errorResponse.ts'
import type { ProductFilters } from '@/entities/product/model/filters.ts'

export const productHandlers = [
  http.get('/api/products', async ({ request }) => {
    const url = new URL(request.url)
    await delay(1500)
    const filters: ProductFilters = {
      q: url.searchParams.get('q') ?? undefined,
      min: parseNumber(url.searchParams.get('min')),
      max: parseNumber(url.searchParams.get('max')),
      inStock: parseBoolean(url.searchParams.get('inStock')),
      rarity: parseString(
        url.searchParams.get('rarity')) as ProductFilters['rarity'],
      sort: parseString(
        url.searchParams.get('sort')) as ProductFilters['sort'],
      page: parseNumber(url.searchParams.get('page')) ?? 1,
      limit: parseNumber(url.searchParams.get('limit')) ?? 20
    }
    const response = fakeDb.products.productsByFilters(filters)
    return HttpResponse.json(response)
  }),

  http.get('/api/products/:id', async ({ params }) => {
    await delay(1500)
    try {
      const productId = String(params.id)
      const product = fakeDb.products.productById(productId)

      return HttpResponse.json(product)
    } catch (error) {
      return errorResponse(error)
    }
  })
]

function parseNumber(value: string | null): number | undefined {
  if (value === null || value.trim() === '') return undefined
  return Number(value)
}

function parseBoolean(value: string | null): boolean | undefined {
  if (value === null) return undefined
  return value === 'true'
}

function parseString(value: string | null): string | undefined {
  return value ?? undefined
}
