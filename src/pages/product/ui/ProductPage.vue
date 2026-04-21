<script setup lang="ts">
import ProductContent from '@/widgets/product-content/ProductContent.vue'
import { useRoute } from 'vue-router'
import type { Product } from '@/entities/product/model/types.ts'
import { computed, onMounted, ref } from 'vue'
import { getProductByIdRequest } from '@/entities/product/api/getProductById.ts'

type ProductPageState = 'loading' | 'error' | 'success'

const route = useRoute()

const product = ref<Product | null>(null)
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

const productId = computed(() => String(route.params.id))

const pageState = computed<ProductPageState>(() => {
  if (isLoading.value) return 'loading'
  if (errorMessage.value) return 'error'
  return 'success'
})

async function loadProduct(): Promise<void> {
  isLoading.value = true
  errorMessage.value = null

  try {
    product.value = await getProductByIdRequest(productId.value)
  } catch {
    errorMessage.value = 'Product not found'
  } finally {
    isLoading.value = false
  }
}

function onAddToCart(productId: string): void {
  alert(productId)
}

onMounted(() => {
  loadProduct()
})
</script>

<template>
  <main class="product-page">
    <div v-if="pageState === 'loading'">Loading...</div>
    <div v-else-if="pageState === 'error'">
      {{ errorMessage }}
    </div>
    <ProductContent
      v-else-if="pageState === 'success' && product"
      :product="product"
      @add-to-cart="onAddToCart"
    />
  </main>
</template>

<style scoped>
.product-page {
  padding: 40px;
}
</style>
