import type { Cart } from '@/entities/cart/model/types.ts'
import type { ProductMockDatabase } from '@/app/mock/database/ProductMockDatabase.ts'

export class CartMockDatabase {
  private readonly cart: Cart
  private products: ProductMockDatabase

  constructor(products: ProductMockDatabase) {
    this.products = products
    this.cart = {
      items: [],
      subtotal: 0,
      currency: 'USD',
      updatedAt: this.now()
    }
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

    const product = this.products.productById(productId)

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

    const actualProduct = this.products.productById(productId)

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
