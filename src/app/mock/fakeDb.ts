import { ProductMockDatabase } from '@/app/mock/database/ProductMockDatabase.ts'
import { CartMockDatabase } from '@/app/mock/database/CartMockDatabase.ts'
import { CheckoutMockDatabase } from '@/app/mock/database/CheckoutMockDatabase.ts'
import { AuthMockDatabase } from '@/app/mock/database/AuthMockDatabase.ts'

class FakeDataBase {
  public readonly products = new ProductMockDatabase()
  public readonly cart = new CartMockDatabase(this.products)
  public readonly checkout = new CheckoutMockDatabase(this.cart)
  public readonly auth = new AuthMockDatabase()
}

export const fakeDb = new FakeDataBase()
