import { delay, http, HttpResponse } from 'msw'
import type { CheckoutRequest } from '@/features/checkout/model/types.ts'
import { fakeDb } from '@/app/mock/fakeDb.ts'
import { errorResponse } from '@/app/mock/errorResponse.ts'

export const checkoutHandlers = [
  http.post('/checkout', async ({ request }) => {
    try {
      await delay(1500)
      const body = (await request.json()) as CheckoutRequest
      const response = fakeDb.checkout.checkout(body)

      return HttpResponse.json(response)
    } catch (error) {
      return errorResponse(error)
    }
  })
]
