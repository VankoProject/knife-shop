import type { Product } from '@/entities/product/model/types.ts'
import { generateMockProducts } from '@/entities/product/model/mock/products.ts'
import type { Cart } from '@/entities/cart/model/types.ts'

class FakeDataBase {
  private readonly products: Product[]
  private readonly cart: Cart

  public constructor() {
    this.products = generateMockProducts(80)
    this.cart = {
      items: [],
      subtotal: 0,
      currency: 'USD',
      updatedAt: new Date().toISOString()
    }
  }

  public allProducts(): Product[] {
    return this.products
  }

  public productById(id: string): Product | undefined {
    return this.products.find((product) => product.id == id)
  }

  public getCart(): Cart {
    return this.cart
  }

  private recalculateCart(): void {
    this.cart.subtotal = this.cart.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    )

    this.cart.updatedAt = new Date().toISOString()
  }

  public addToCart(productId: string, qty: number): Cart {
    const product = this.productById(productId)

    if (!product) {
      throw { error: 'PRODUCT_NOT_FOUND', message: 'Product not found' }
    }

    if (!product.inStock) {
      throw { error: 'OUT_OF_STOCK' }
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
    const item = this.cart.items.find((item) => item.productId === productId)

    if (!item) {
      throw { error: 'PRODUCT_NOT_FOUND' }
    }

    if (qty <= 0) {
      this.cart.items = this.cart.items.filter(
        (item) => item.productId !== productId
      )
    } else {
      item.qty = qty
    }

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
}

export const fakeDb = new FakeDataBase()
