<script setup lang="ts">
import { computed, ref } from 'vue'
import CatalogPagination from './CatalogPagination.vue'
import type { Product } from '@/entities/product/model/types'
import CatalogProductGrid from '@/entities/product/ui/CatalogProductGrid.vue'

interface Props {
  products: Product[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'addToCart', productId: string): void
}>()

const currentPage = ref(1)
const limit = 12

const totalPages = computed(() => {
  return Math.ceil(props.products.length / limit)
})

const paginatedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * limit
  const endIndex = startIndex + limit

  return props.products.slice(startIndex, endIndex)
})

function onAddToCart(productId: string): void {
  emit('addToCart', productId)
}

function onChangePage(page: number): void {
  currentPage.value = page
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <section class="catalog-content">
    <CatalogProductGrid
      :products="paginatedProducts"
      @add-to-cart="onAddToCart"
    />

    <CatalogPagination
      :current-page="currentPage"
      :total-pages="totalPages"
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
