import { HttpResponse } from 'msw'

type FakeApiError = {
  status: number
  error: string
  message?: string
  newPrice?: number
  serverCart?: unknown
}

export function errorResponse(error: unknown): Response {
  if (isFakeApiError(error)) {
    const { status, ...body } = error

    return HttpResponse.json(body, { status })
  }

  return HttpResponse.json(
    { error: 'UNKNOWN_ERROR', message: 'Unexpected server error' },
    { status: 500 }
  )
}

function isFakeApiError(error: unknown): error is FakeApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'error' in error
  )
}
