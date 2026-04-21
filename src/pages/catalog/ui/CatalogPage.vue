<script setup lang="ts">
import CatalogContent from '@/widgets/catalog-content/ui/CatalogContent.vue'
import { mockProducts } from '@/entities/product/model/mock/products.ts'

const products = mockProducts
function onAddToCart(productId: string): void {
  alert(productId)
}
</script>

<template>
  <main class="catalog-page">
    <CatalogContent :products="products" @add-to-cart="onAddToCart" />
  </main>
</template>

<style scoped>
.catalog-page {
  padding: 40px;
}
</style>
