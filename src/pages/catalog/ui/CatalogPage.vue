<script setup lang="ts">
import type { Rarity } from '@/entities/product/model/types'
import ProductCard from '@/entities/product/ui/productCard/ProductCard.vue'

const mockProduct = {
  id: '1',
  name: 'Crimson Edge',
  price: 199.9,
  rarity: 'cover' as Rarity,
  inStock: false,
  tags: ['limited', 'knife', 'steel'],
  image: 'https://pngimg.com/uploads/knife/knife_PNG107.png',
  updatedAt: '2024-01-01'
}
</script>

<template>
  <main style="padding: 40px">
    <ProductCard
      :product="mockProduct"
      button-state="idle"
      @addToCart="console.log"
    />
  </main>
</template>
