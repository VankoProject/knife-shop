<script setup lang="ts">
import CatalogContent from '@/widgets/catalog-content/ui/CatalogContent.vue'
import { computed, onMounted, ref } from 'vue'
import type { Product } from '@/entities/product/model/types.ts'
import { getProductsRequest } from '@/entities/product/api/getProducts.ts'

const products = ref<Product[]>([])
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

const currentPage = ref(1)
const limit = ref(20)
const total = ref(0)

const totalPages = computed(() => {
  return Math.ceil(total.value / limit.value)
})

async function loadProducts(): Promise<void> {
  isLoading.value = true
  errorMessage.value = null

  try {
    const response = await getProductsRequest(currentPage.value, limit.value)
    products.value = response.items
    total.value = response.total
  } catch (error) {
    errorMessage.value = 'Failed to load products'
  } finally {
    isLoading.value = false
  }
}

function onChangePage(page: number): void {
  currentPage.value = page
  loadProducts()

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function onAddToCart(productId: string): void {
  alert(productId)
}

onMounted(() => {
  loadProducts()
})
</script>

<template>
  <main class="catalog-page">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="errorMessage">{{ errorMessage }}</div>
    <CatalogContent
      v-else
      :products="products"
      :current-page="currentPage"
      :total-pages="totalPages"
      @add-to-cart="onAddToCart"
      @change-page="onChangePage"
    />
  </main>
</template>

<style scoped>
.catalog-page {
  padding: 40px;
}
</style>
