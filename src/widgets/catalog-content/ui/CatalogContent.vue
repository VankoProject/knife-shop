<script setup lang="ts">
import CatalogPagination from './CatalogPagination.vue'
import type { Product } from '@/entities/product/model/types'
import CatalogProductGrid from '@/widgets/catalog-content/ui/CatalogProductGrid.vue'

interface Props {
  products: Product[]
  currentPage: number
  totalPages: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'addToCart', productId: string): void
  (event: 'changePage', page: number): void
}>()

function onAddToCart(productId: string): void {
  emit('addToCart', productId)
}

function onChangePage(page: number): void {
  emit('changePage', page)
}
</script>

<template>
  <section class="catalog-content">
    <CatalogProductGrid
      :products="props.products"
      @add-to-cart="onAddToCart" />

    <CatalogPagination
      :current-page="props.currentPage"
      :total-pages="props.totalPages"
      @change-page="onChangePage"
    />
  </section>
</template>

<style scoped>
.catalog-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
