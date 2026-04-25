import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Cart } from '@/entities/cart/model/types.ts'
import {
  addToCartApi,
  getCartApi,
  removeCartItemApi,
  updateCartItemApi
} from '@/entities/cart/api/cartApi.ts'
import type { ApiError } from '@/shared/api/api-error.ts'
import {
  ScreenUiState,
  type UiState,
  UiStateType
} from '@/shared/model/ui-state/screen-ui-state.ts'

export const useCartStore = defineStore('cart', () => {
  const cartResult = ref<UiState<Cart, ApiError>>(ScreenUiState.idle())

  const cart = computed(() => {
    return cartResult.value.type === UiStateType.Success
      ? cartResult.value.data
      : null
  })

  const items = computed(() => cart.value?.items ?? [])
  const subtotal = computed(() => cart.value?.subtotal ?? 0)
  const currency = computed(() => cart.value?.currency ?? 'USD')

  function replaceCart(newCart: Cart): void {
    cartResult.value =
      newCart.items.length === 0
        ? ScreenUiState.empty()
        : ScreenUiState.success(newCart)
  }

  function setError(error: ApiError): void {
    cartResult.value = ScreenUiState.error(error)
  }

  function clearCart(): void {
    cartResult.value = ScreenUiState.empty()
  }

  async function loadCart(): Promise<void> {
    cartResult.value = ScreenUiState.loading()

    try {
      const response = await getCartApi()
      replaceCart(response)
    } catch (error) {
      setError(error as ApiError)
    }
  }

  async function addToCart(productId: string, qty: number = 1): Promise<void> {
    try {
      const response = await addToCartApi({ productId, qty })
      replaceCart(response)
    } catch (error) {
      setError(error as ApiError)
    }
  }

  async function updateCartItem(productId: string, qty: number): Promise<void> {
    try {
      const response = await updateCartItemApi({ productId, qty })
      replaceCart(response)
    } catch (error) {
      setError(error as ApiError)
    }
  }

  async function removeCartItem(productId: string): Promise<void> {
    try {
      const response = await removeCartItemApi({ productId })
      replaceCart(response)
    } catch (error) {
      setError(error as ApiError)
    }
  }

  return {
    cartResult,
    cart,
    items,
    subtotal,
    currency,
    replaceCart,
    clearCart,
    loadCart,
    addToCart,
    updateCartItem,
    removeCartItem
  }
})
