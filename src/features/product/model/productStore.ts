import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ScreenUiState, type UiState } from '@/shared/model'
import type { ApiError } from '@/shared/error'
import { getProductByIdRequest, type Product } from '@/entities/product'

export const useProductStore = defineStore('product', () => {
  const productResult = ref<UiState<Product, ApiError>>(ScreenUiState.idle())

  async function loadProduct(productId: string): Promise<void> {
    productResult.value = ScreenUiState.loading()

    try {
      const product = await getProductByIdRequest(productId)
      productResult.value = ScreenUiState.success(product)
    } catch (error) {
      productResult.value = ScreenUiState.error(error as ApiError)
    }
  }

  return {
    productResult,
    loadProduct
  }
})
