import { productHandlers } from './products'
import { cartHandlers } from '@/shared/api/mock/handlers/cart.ts'
import { checkoutHandlers } from '@/shared/api/mock/handlers/checkout.ts'

export const handlers = [
  ...productHandlers,
  ...cartHandlers,
  ...checkoutHandlers
]
