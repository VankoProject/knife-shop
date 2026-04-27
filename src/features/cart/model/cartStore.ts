import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { ScreenUiState, type UiState, UiStateType } from '@/shared/model'
import type { ApiError } from '@/shared/error'
import {
  addToCartApi,
  type Cart,
  getCartApi,
  removeCartItemApi,
  updateCartItemApi
} from '@/entities/cart'

export const useCartStore = defineStore('cart', () => {
  const cartResult = ref<UiState<Cart, ApiError>>(ScreenUiState.idle())
  let cartMutationRequestId = 0

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

  function getCartSubtotal(cart: Cart): number {
    return cart.items.reduce((sum, item) => sum + item.price * item.qty, 0)
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
    const requestId = ++cartMutationRequestId
    const previousCartResult = cartResult.value

    if (cartResult.value.type === UiStateType.Success) {
      const existingItem = cartResult.value.data.items.find(
        (item) => item.productId === productId
      )

      if (existingItem) {
        const optimisticCart: Cart = {
          ...cartResult.value.data,
          items: cartResult.value.data.items.map((item) =>
            item.productId === productId
              ? {
                  ...item,
                  qty: item.qty + qty
                }
              : item
          )
        }

        replaceCart({
          ...optimisticCart,
          subtotal: getCartSubtotal(optimisticCart)
        })
      }
    }

    try {
      const response = await addToCartApi({ productId, qty })
      if (requestId === cartMutationRequestId) {
        replaceCart(response)
      }
    } catch {
      if (requestId === cartMutationRequestId) {
        cartResult.value = previousCartResult
      }
    }
  }

  async function updateCartItem(productId: string, qty: number): Promise<void> {
    const requestId = ++cartMutationRequestId
    const previousCartResult = cartResult.value

    if (cartResult.value.type === UiStateType.Success) {
      const optimisticCart: Cart = {
        ...cartResult.value.data,
        items: cartResult.value.data.items.map((item) =>
          item.productId === productId
            ? {
                ...item,
                qty
              }
            : item
        )
      }

      replaceCart({
        ...optimisticCart,
        subtotal: getCartSubtotal(optimisticCart)
      })
    }

    try {
      const response = await updateCartItemApi({ productId, qty })
      if (requestId === cartMutationRequestId) {
        replaceCart(response)
      }
    } catch {
      if (requestId === cartMutationRequestId) {
        cartResult.value = previousCartResult
      }
    }
  }

  async function removeCartItem(productId: string): Promise<void> {
    const requestId = ++cartMutationRequestId
    const previousCartResult = cartResult.value

    if (cartResult.value.type === UiStateType.Success) {
      const optimisticCart: Cart = {
        ...cartResult.value.data,
        items: cartResult.value.data.items.filter(
          (item) => item.productId !== productId
        )
      }

      replaceCart({
        ...optimisticCart,
        subtotal: getCartSubtotal(optimisticCart)
      })
    }

    try {
      const response = await removeCartItemApi({ productId })
      if (requestId === cartMutationRequestId) {
        replaceCart(response)
      }
    } catch {
      if (requestId === cartMutationRequestId) {
        cartResult.value = previousCartResult
      }
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
