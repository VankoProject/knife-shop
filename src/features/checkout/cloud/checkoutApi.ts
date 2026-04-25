import type {
  CheckoutRequest,
  CheckoutResponse
} from '@/features/checkout/model/types.ts'
import type { CheckoutErrorResponse } from '@/shared/error/types.ts'

export async function checkoutApi(
  request: CheckoutRequest
): Promise<CheckoutResponse> {
  const response = await fetch('/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })

  const data = await response.json()

  if (!response.ok) {
    throw data as CheckoutErrorResponse
  }

  return data as CheckoutResponse
}
