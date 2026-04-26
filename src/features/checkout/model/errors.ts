import type { Cart } from '@/entities/cart/model/types'
import type { ApiErrorResponse } from '@/shared/error'

export type KnownCheckoutErrorCode = 'CART_OUTDATED' | 'INVALID_CUSTOMER'

export interface CheckoutErrorResponse extends ApiErrorResponse<KnownCheckoutErrorCode> {
  serverCart?: Cart
}
