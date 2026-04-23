import { http, HttpResponse } from 'msw'
import { fakeDb } from '@/shared/api/mock/fakeDb.ts'

export const productHandlers = [
  http.get('/api/products', ({ request }) => {
    const url = new URL(request.url)

    const page = Number(url.searchParams.get('page') ?? '1')
    const limit = Number(url.searchParams.get('limit') ?? '20')

    const allProducts = fakeDb.allProducts()

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    const items = allProducts.slice(startIndex, endIndex)

    return HttpResponse.json({
      items,
      total: allProducts.length,
      page,
      limit
    })
  }),

  http.get('/api/products/:id', ({ params }) => {
    const productId = String(params.id)
    const product = fakeDb.productById(productId)

    if (!product) {
      return HttpResponse.json(
        {
          error: 'PRODUCT_NOT_FOUND',
          message: 'Product not found'
        },
        { status: 404 }
      )
    }

    return HttpResponse.json(product)
  })

]
