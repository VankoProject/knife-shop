import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  ScreenUiState,
  type UiState,
  UiStateType
} from '@/shared/model/ui-state/screen-ui-state'
import type { ApiError } from '@/shared/error'
import type { ProductUpdatedEvent } from '@/shared/ws'
import {
  DEFAULT_PRODUCT_FILTERS,
  getProductsRequest,
  type ProductFilters,
  type ProductsResponse
} from '@/entities/product'

export const useCatalogStore = defineStore('catalog', () => {
  const productsResult = ref<UiState<ProductsResponse, ApiError>>(
    ScreenUiState.idle()
  )

  const filters = ref<ProductFilters>({
    ...DEFAULT_PRODUCT_FILTERS
  })

  const totalPages = computed(() => {
    if (productsResult.value.type !== UiStateType.Success) {
      return 0
    }

    return Math.ceil(
      productsResult.value.data.total / productsResult.value.data.limit
    )
  })

  async function loadProducts(): Promise<void> {
    productsResult.value = ScreenUiState.loading()

    try {
      const response = await getProductsRequest(filters.value)
      if (response.items.length === 0) {
        productsResult.value = ScreenUiState.empty()
        return
      }

      productsResult.value = ScreenUiState.success(response)
    } catch (error) {
      productsResult.value = ScreenUiState.error(error as ApiError)
    }
  }

  function setFilters(newFilters: Partial<ProductFilters>): void {
    filters.value = {
      ...filters.value,
      ...newFilters,
      page: 1
    }

    loadProducts()
  }

  function setPage(page: number): void {
    filters.value = {
      ...filters.value,
      page
    }

    loadProducts()
  }

  function resetFilters(): void {
    filters.value = {
      ...DEFAULT_PRODUCT_FILTERS
    }

    loadProducts()
  }

  function applyProductLiveUpdate(
    productId: string,
    changes: ProductUpdatedEvent['data']['changes']
  ): void {
    if (productsResult.value.type !== UiStateType.Success) return

    productsResult.value = ScreenUiState.success({
      ...productsResult.value.data,
      items: productsResult.value.data.items.map((product) =>
        product.id === productId
          ? {
              ...product,
              ...changes
            }
          : product
      )
    })
  }

  return {
    productsResult,
    filters,
    totalPages,
    loadProducts,
    setFilters,
    setPage,
    resetFilters,
    applyProductLiveUpdate
  }
})
