import type { Product, Rarity } from '@/entities/product/model/types.ts'

const productName = [
  'Crimson Edge',
  'Shadow Fang',
  'Hunter Pro',
  'Iron Wolf',
  'Night Blade',
  'Steel Viper',
  'Falcon Tooth',
  'Ghost Strike'
]

const rarityList: Rarity[] = [
  'consumer',
  'industrial',
  'mil-spec',
  'restricted',
  'classified',
  'covert'
]

const tagList = ['knife', 'outdoor', 'steel', 'tactical']

const imageList = [
  '/images/knife-1.webp',
  '/images/knife-2.webp',
  '/images/knife-3.webp',
  '/images/knife-4.webp'
]

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function randomPrice(): number {
  return Number(50 + Math.random() * 450)
}

function randomTags(): string[] {
  const shuffled = [...tagList].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 3)
}

export function generateMockProducts(count: number): Product[] {
  return Array.from({ length: count }, (_, index) => {
    return {
      id: String(index + 1),
      name: `${randomItem(productName)} ${index + 1}`,
      price: randomPrice(),
      rarity: randomItem(rarityList),
      inStock: Math.random() > 0.3,
      tags: randomTags(),
      image: randomItem(imageList),
      updatedAt: '2026-04-20'
    }
  })
}
