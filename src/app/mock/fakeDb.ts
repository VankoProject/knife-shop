import type { Product } from '@/entities/product/model/types.ts'
import { generateMockProducts } from '@/entities/product/model/mock/products.ts'
import type { Cart } from '@/entities/cart/model/types.ts'
import type {
  CheckoutRequest,
  CheckoutResponse
} from '@/features/checkout/model/types.ts'
import { orderIdGenerator } from '@/features/checkout/model/order.ts'
import type { ProductFilters } from '@/entities/product/model/filters.ts'
import type { ProductsResponse } from '@/entities/product/model/api-types.ts'

class FakeDataBase {
  private readonly products: Product[]
  private readonly cart: Cart

  public constructor() {
    this.products = generateMockProducts(80)
    this.cart = {
      items: [],
      subtotal: 0,
      currency: 'USD',
      updatedAt: this.now()
    }
  }

  public productsByFilters(filters: ProductFilters): ProductsResponse {
    let result = [...this.products]

    if (filters.q) {
      const query = filters.q.trim().toLowerCase()

      result = result.filter((product) => {
        return product.name.toLowerCase().includes(query)
      })
    }

    if (filters.min !== undefined) {
      result = result.filter((product) => {
        return product.price >= filters.min!
      })
    }

    if (filters.max !== undefined) {
      result = result.filter((product) => {
        return product.price <= filters.max!
      })
    }

    if (filters.inStock !== undefined) {
      result = result.filter((product) => {
        return product.inStock === filters.inStock
      })
    }

    if (filters.rarity !== undefined) {
      result = result.filter((product) => {
        return product.rarity === filters.rarity
      })
    }

    if (filters.sort) {
      const sortMap = {
        price_asc: (a: Product, b: Product) => a.price - b.price,
        price_desc: (a: Product, b: Product) => b.price - a.price
      }

      result = result.sort(sortMap[filters.sort])
    }

    const total = result.length

    const start = (filters.page - 1) * filters.limit
    const end = start + filters.limit

    const pageItems = result.slice(start, end)

    return {
      items: pageItems,
      total,
      page: filters.page,
      limit: filters.limit
    }
  }

  public productById(id: string): Product {
    const product = this.products.find((product) => product.id === id)

    if (!product) {
      throw {
        status: 404,
        error: 'PRODUCT_NOT_FOUND',
        message: 'Product not found'
      }
    }

    return product
  }

  public getCart(): Cart {
    return this.cart
  }

  private recalculateCart(): void {
    this.cart.subtotal = this.cart.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    )

    this.cart.updatedAt = this.now()
  }

  public addToCart(productId: string, qty: number): Cart {
    this.validateQty(qty)

    const product = this.productById(productId)

    if (!product.inStock) {
      throw {
        status: 409,
        error: 'OUT_OF_STOCK'
      }
    }

    const existingItem = this.cart.items.find(
      (item) => item.productId === productId
    )

    if (existingItem) {
      existingItem.qty += qty
    } else {
      this.cart.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        qty,
        image: product.image,
        inStock: product.inStock
      })
    }

    this.recalculateCart()

    return this.cart
  }

  public updateCartItem(productId: string, qty: number): Cart {
    this.validateQty(qty)

    const cartItem = this.cart.items.find(
      (item) => item.productId === productId
    )

    if (!cartItem) {
      throw {
        status: 404,
        error: 'PRODUCT_NOT_FOUND',
        message: 'Product not found'
      }
    }

    const actualProduct = this.productById(productId)

    if (cartItem.price !== actualProduct.price) {
      throw {
        status: 409,
        error: 'PRICE_CHANGED',
        newPrice: actualProduct.price
      }
    }

    cartItem.qty = qty

    this.recalculateCart()

    return this.cart
  }

  public removeCartItem(productId: string): Cart {
    this.cart.items = this.cart.items.filter(
      (item) => item.productId !== productId
    )

    this.recalculateCart()

    return this.cart
  }

  public clearCart(): Cart {
    this.cart.items = []
    this.cart.subtotal = 0
    this.cart.updatedAt = this.now()

    return this.cart
  }

  public checkout(request: CheckoutRequest): CheckoutResponse {
    if (!request.customer.name.trim()) {
      throw {
        status: 422,
        error: 'INVALID_CUSTOMER'
      }
    }

    if (request.cart.updatedAt !== this.cart.updatedAt) {
      throw {
        status: 409,
        error: 'CART_OUTDATED',
        serverCart: this.cart
      }
    }

    const orderId = orderIdGenerator.generateOrderId()

    this.clearCart()

    return { orderId }
  }

  private now(): string {
    return new Date().toISOString()
  }

  private validateQty(qty: number): void {
    if (qty <= 0) {
      throw {
        status: 400,
        error: 'BAD_QTY'
      }
    }
  }
}

export const fakeDb = new FakeDataBase()
