<script setup lang="ts">
import CatalogContent from '@/widgets/catalog-content/catalog-screen-state/content/CatalogContent.vue'
import { computed, onMounted, ref } from 'vue'
import { getProductsRequest } from '@/entities/product/api/getProducts.ts'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/entities/cart/model/store.ts'
import type { ProductsResponse } from '@/entities/product/model/api-types.ts'
import type { ApiError } from '@/shared/api/api-error.ts'
import CatalogLoadingState from '@/widgets/catalog-content/catalog-screen-state/CatalogLoadingState.vue'
import CatalogErrorState from '@/widgets/catalog-content/catalog-screen-state/CatalogErrorState.vue'
import CatalogEmptyState from '@/widgets/catalog-content/catalog-screen-state/CatalogEmptyState.vue'
import {
  ScreenUiState,
  type UiState,
  UiStateType
} from '@/shared/model/ui-state/screen-ui-state.ts'
import { RouteNames } from '@/shared/router/routes.ts'

const router = useRouter()
const cartStore = useCartStore()

const productsResult = ref<UiState<ProductsResponse, ApiError>>(
  ScreenUiState.idle()
)

const currentPage = ref(1)
const limit = ref(20)
const total = ref(0)

const totalPages = computed(() => {
  return Math.ceil(total.value / limit.value)
})

async function loadProducts(): Promise<void> {
  productsResult.value = ScreenUiState.loading()

  try {
    const response = await getProductsRequest(currentPage.value, limit.value)
    total.value = response.total

    if (response.items.length === 0) {
      productsResult.value = ScreenUiState.empty()
      return
    }

    productsResult.value = ScreenUiState.success(response)
  } catch (error) {
    productsResult.value = ScreenUiState.error(error as ApiError)
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
  cartStore.addToCart(productId, 1)
}

function onOpenDetails(productId: string): void {
  router.push({
    name: RouteNames.PRODUCT,
    params: { id: productId }
  })
}

//todo: for future filters panel
function onResetFilters(): void {
  currentPage.value = 1
  loadProducts()
}
onMounted(() => {
  loadProducts()
})
</script>

<template>
  <main class="catalog-page">
    <CatalogLoadingState v-if="productsResult.type === UiStateType.Loading" />
    <CatalogErrorState
      v-else-if="productsResult.type === UiStateType.Error"
      :message="productsResult.error.message ?? 'Failed to load products.'"
      @retry="loadProducts"
    />
    <CatalogEmptyState
      v-else-if="productsResult.type === UiStateType.Empty"
      @reset="onResetFilters"
    />
    <CatalogContent
      v-else-if="productsResult.type === UiStateType.Success"
      :products="productsResult.data.items"
      :current-page="currentPage"
      :total-pages="totalPages"
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
