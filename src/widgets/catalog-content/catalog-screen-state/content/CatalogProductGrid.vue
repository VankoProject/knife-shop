<script setup lang="ts">
import type { Product } from '@/entities/product/model/types.ts'
import ProductCard from '@/entities/product/ui/ProductCard.vue'

interface Props {
  products: Product[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'addToCart', productId: string): void
  (event: 'openDetails', productId: string): void
}>()

function addToCart(productId: string): void {
  emit('addToCart', productId)
}
function onOpenDetails(productId: string): void {
  emit('openDetails', productId)
}
</script>

<template>
  <section class="product-grid">
    <ProductCard
      v-for="product in props.products"
      :key="product.id"
      :product="product"
      @add-to-cart="addToCart"
      @open-details="onOpenDetails"
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
