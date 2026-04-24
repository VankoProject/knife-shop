import { http, HttpResponse } from 'msw'
import type { CheckoutRequest } from '@/features/checkout/model/types.ts'
import { fakeDb } from '@/shared/api/mock/fakeDb.ts'
import { errorResponse } from '@/shared/api/mock/errorResponse.ts'

export const checkoutHandlers = [
  http.post('/checkout', async ({ request }) => {
    try {
      const body = (await request.json()) as CheckoutRequest
      const response = fakeDb.checkout(body)

      return HttpResponse.json(response)
    } catch (error) {
      return errorResponse(error)
    }
  })
]
