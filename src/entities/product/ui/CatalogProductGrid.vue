<script setup lang="ts">
import type { Product } from '@/entities/product/model/types.ts'
import ProductCard from '@/entities/product/ui/productCard/ProductCard.vue'

interface Props {
  products: Product[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'addToCart', productId: string): void
}>()

function addToCart(productId: string): void {
  emit('addToCart', productId)
}
</script>

<template>
  <section class="product-grid">
    <ProductCard
      v-for="product in props.products"
      :key="product.id"
      :product="product"
      @add-to-cart="addToCart"
    />
  </section>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
</style>
