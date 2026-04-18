export type Rarity = 
| 'consumer'
| 'industrial'
| 'mil-spec'
| 'restricted'
| 'classified'
| 'covert'

export interface Product {
    id: string
    name: string
    price: number
    rarity: Rarity
    inStock: boolean
    tags: string[]
    image: string
    updatedAt: string
}