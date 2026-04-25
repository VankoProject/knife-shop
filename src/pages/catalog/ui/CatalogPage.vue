<script setup lang="ts">
import CatalogContent from '@/widgets/catalog-content/catalog-screen-state/content/CatalogContent.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/entities/cart/model/store.ts'
import CatalogLoadingState from '@/widgets/catalog-content/catalog-screen-state/CatalogLoadingState.vue'
import CatalogErrorState from '@/widgets/catalog-content/catalog-screen-state/CatalogErrorState.vue'
import CatalogEmptyState from '@/widgets/catalog-content/catalog-screen-state/CatalogEmptyState.vue'
import { UiStateType } from '@/shared/model/ui-state/screen-ui-state.ts'
import { RouteNames } from '@/shared/router/routes.ts'
import { useCatalogStore } from '@/features/catalog/model/store.ts'
import CatalogFilterPanel from '@/features/catalog/ui/CatalogFilterPanel.vue'

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
}

function onOpenDetails(productId: string): void {
  router.push({
    name: RouteNames.PRODUCT,
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
