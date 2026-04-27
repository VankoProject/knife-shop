export class Order {
  private orderId: number

  constructor(orderId: number = 1) {
    this.orderId = orderId
  }

  public generateOrderId(): string {
    const date = new Date()

    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')

    const newOrderId = String(this.orderId++).padStart(4, '0')

    return `ORD-${yyyy}${mm}${dd}-${newOrderId}`
  }
}

export const orderIdGenerator = new Order()
