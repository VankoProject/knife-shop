import { delay, http, HttpResponse } from 'msw'
import { fakeDb } from '@/app/mock/fakeDb.ts'
import { errorResponse } from '@/app/mock/errorResponse.ts'
import type { LoginRequest } from '@/features/auth'

export const authHandlers = [
  http.post('/auth/login', async ({ request }) => {
    await delay(1500)

    try {
      const body = (await request.json()) as LoginRequest
      const response = fakeDb.auth.login(body)

      return HttpResponse.json(response, {
        status: 200
      })
    } catch (error) {
      return errorResponse(error)
    }
  }),

  http.post('/auth/logout', async () => {
    await delay(500)

    return HttpResponse.json(null, { status: 204 })
  })
]
