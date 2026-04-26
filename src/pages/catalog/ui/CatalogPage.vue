<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  CatalogContent,
  CatalogEmptyState,
  CatalogErrorState,
  CatalogLoadingState
} from '@/widgets/catalog-content'
import { UiStateType } from '@/shared/model'
import { showSuccess } from '@/shared/lib'
import { ROUTES } from '@/shared/constants'
import { CatalogFilterPanel, useCatalogStore } from '@/features/catalog'
import { useCartStore } from '@/features/cart'

const router = useRouter()
const cartStore = useCartStore()
const catalogStore = useCatalogStore()

function onChangePage(page: number): void {
  catalogStore.setPage(page)

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function onAddToCart(productId: string): void {
  cartStore.addToCart(productId, 1)
  showSuccess('Added to cart')
}

function onOpenDetails(productId: string): void {
  router.push({
    name: ROUTES.PRODUCT,
    params: { id: productId }
  })
}
onMounted(() => {
  catalogStore.loadProducts()
})
</script>

<template>
  <main class="catalog-page">
    <CatalogFilterPanel
      :filters="catalogStore.filters"
      @change="catalogStore.setFilters"
      @reset="catalogStore.resetFilters"
    />
    <CatalogLoadingState
      v-if="catalogStore.productsResult.type === UiStateType.Loading"
    />
    <CatalogErrorState
      v-else-if="catalogStore.productsResult.type === UiStateType.Error"
      :message="
        catalogStore.productsResult.error.message ?? 'Failed to load products.'
      "
      @retry="catalogStore.loadProducts"
    />
    <CatalogEmptyState
      v-else-if="catalogStore.productsResult.type === UiStateType.Empty"
      @reset="catalogStore.resetFilters"
    />
    <CatalogContent
      v-else-if="catalogStore.productsResult.type === UiStateType.Success"
      :products="catalogStore.productsResult.data.items"
      :current-page="catalogStore.filters.page"
      :total-pages="catalogStore.totalPages"
      @add-to-cart="onAddToCart"
      @change-page="onChangePage"
      @open-details="onOpenDetails"
    />
  </main>
</template>

<style scoped>
.catalog-page {
  padding: 40px;
}
</style>
