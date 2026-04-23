import { http, HttpResponse } from 'msw'
import type { CheckoutRequest } from '@/features/checkout/model/types.ts'
import { fakeDb } from '@/shared/api/mock/fakeDb.ts'

export const checkoutHandlers = [
  http.post('/checkout', async ({ request }) => {
    try {
      const body = (await request.json()) as CheckoutRequest
      const response = fakeDb.checkout(body)

      return HttpResponse.json(response, { status: 200 })
    } catch (error) {
      const serverError = error as {
        status: number
        error: string
        serverCart?: unknown
      }

      return HttpResponse.json(
        {
          error: serverError.error,
          serverCart: serverError.serverCart
        },
        { status: serverError.status }
      )
    }
  })
]
