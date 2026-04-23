import { productHandlers } from './products'
import { cartHandlers } from '@/shared/api/mock/handlers/cart.ts'

export const handlers = [...productHandlers, ...cartHandlers]
