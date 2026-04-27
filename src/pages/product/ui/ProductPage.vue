<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import {
  ProductContent,
  ProductErrorState,
  ProductLoadingState
} from '@/widgets/product-content'
import { UiStateType } from '@/shared/model'
import { showSuccess } from '@/shared/lib'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/features/cart'
import { useProductStore } from '@/features/product'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const productId = computed(() => String(route.params.id))

const { productResult } = storeToRefs(productStore)

function onAddToCart(productId: string): void {
  cartStore.addToCart(productId, 1)
  showSuccess('Added to cart')
}

function loadProduct(): void {
  productStore.loadProduct(productId.value)
}

onMounted(loadProduct)
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
