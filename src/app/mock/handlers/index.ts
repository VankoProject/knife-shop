import { productHandlers } from './products.ts'
import { cartHandlers } from '@/app/mock/handlers/cart.ts'
import { checkoutHandlers } from '@/app/mock/handlers/checkout.ts'

export const handlers = [
  ...productHandlers,
  ...cartHandlers,
  ...checkoutHandlers
]
