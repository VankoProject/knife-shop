import { productHandlers } from './productsHandlers.ts'
import { cartHandlers } from '@/app/mock/handlers/cartHandlers.ts'
import { checkoutHandlers } from '@/app/mock/handlers/checkoutHandlers.ts'
import { authHandlers } from '@/app/mock/handlers/authHandlers.ts'

export const handlers = [
  ...productHandlers,
  ...cartHandlers,
  ...checkoutHandlers,
  ...authHandlers
]
