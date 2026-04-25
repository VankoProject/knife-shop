<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { getProductByIdRequest } from '@/entities/product/api/getProductById.ts'
import { useCartStore } from '@/entities/cart/model/store.ts'
import {
  ScreenUiState,
  type UiState,
  UiStateType
} from '@/shared/model/ui-state/screen-ui-state.ts'
import type { Product } from '@/entities/product/model/types.ts'
import type { ApiError } from '@/shared/api/api-error.ts'
import ProductContent from '@/widgets/product-content/product-screen-state/ProductContent.vue'
import ProductErrorState from '@/widgets/product-content/product-screen-state/ProductErrorState.vue'
import ProductLoadingState from '@/widgets/product-content/product-screen-state/ProductLoadingState.vue'

const route = useRoute()
const cartState = useCartStore()
const productId = computed(() => String(route.params.id))

const productResult = ref<UiState<Product, ApiError>>(ScreenUiState.idle())

async function loadProduct(): Promise<void> {
  productResult.value = ScreenUiState.loading()

  try {
    const product = await getProductByIdRequest(productId.value)
    productResult.value = ScreenUiState.success(product)
  } catch (error) {
    productResult.value = ScreenUiState.error(error as ApiError)
  }
}

function onAddToCart(productId: string): void {
  cartState.addToCart(productId, 1)
}

onMounted(() => {
  loadProduct()
})
</script>

<template>
  <main class="product-page">
    <ProductLoadingState v-if="productResult.type === UiStateType.Loading" />
    <ProductErrorState
      v-else-if="productResult.type === UiStateType.Error"
      :message="productResult.error.message ?? 'Failed to load product'"
      @retry="loadProduct"
    />
    <ProductContent
      v-else-if="productResult.type === UiStateType.Success"
      :product="productResult.data"
      @add-to-cart="onAddToCart"
    />
  </main>
</template>

<style scoped>
.product-page {
  padding: 40px;
}
</style>
