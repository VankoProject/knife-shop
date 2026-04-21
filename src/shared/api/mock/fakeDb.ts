import type { Product } from '@/entities/product/model/types.ts'
import { generateMockProducts } from '@/entities/product/model/mock/products.ts'

class FakeDataBase {
  private readonly products: Product[]

  public constructor() {
    this.products = generateMockProducts(80)
  }

  public allProducts(): Product[] {
    return this.products
  }

  public productById(id: string): Product | undefined {
    return this.products.find((product) => product.id == id)
  }
}

export const fakeDb = new FakeDataBase()
