import type {
  CheckoutRequest,
  CheckoutResponse
} from '@/features/checkout/model/types.ts'
import { orderIdGenerator } from '@/features/checkout/model/order.ts'
import type { CartMockDatabase } from '@/app/mock/database/CartMockDatabase.ts'

export class CheckoutMockDatabase {
  private readonly cart: CartMockDatabase

  constructor(cart: CartMockDatabase) {
    this.cart = cart
  }

  public checkout(request: CheckoutRequest): CheckoutResponse {
    if (!request.customer.name.trim()) {
      throw {
        status: 422,
        error: 'INVALID_CUSTOMER'
      }
    }

    const currentCart = this.cart.getCart()
    if (request.cart.updatedAt !== currentCart.updatedAt) {
      throw {
        status: 409,
        error: 'CART_OUTDATED',
        serverCart: this.cart
      }
    }

    const orderId = orderIdGenerator.generateOrderId()

    this.cart.clearCart()

    return { orderId }
  }
}
