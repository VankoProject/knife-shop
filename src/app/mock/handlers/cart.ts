import { delay, http, HttpResponse } from 'msw'
import { fakeDb } from '@/app/mock/fakeDb.ts'
import { errorResponse } from '@/app/mock/errorResponse.ts'

export const cartHandlers = [
  http.get('/api/cart', async() => {
    await delay(1500)
    try {
      return HttpResponse.json(fakeDb.getCart())
    } catch (error) {
      return errorResponse(error)
    }
  }),

  http.post('/api/cart/add', async ({ request }) => {
    await delay(500)
    try {
      const body = (await request.json()) as { productId: string; qty: number }
      const cart = fakeDb.addToCart(body.productId, body.qty)
      return HttpResponse.json(cart)
    } catch (error) {
      return errorResponse(error)
    }
  }),

  http.post('/api/cart/update', async ({ request }) => {
    try {
      const body = (await request.json()) as { productId: string; qty: number }
      const cart = fakeDb.updateCartItem(body.productId, body.qty)
      return HttpResponse.json(cart)
    } catch (error) {
      return errorResponse(error)
    }
  }),

  http.post('/api/cart/remove', async ({ request }) => {
    await delay(1500)
    try {
      const body = (await request.json()) as { productId: string }
      const cart = fakeDb.removeCartItem(body.productId)
      return HttpResponse.json(cart)
    } catch (error) {
      return errorResponse(error)
    }
  })
]
