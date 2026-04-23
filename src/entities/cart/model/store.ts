import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Cart } from '@/entities/cart/model/types.ts'
import {
  addToCartApi,
  getCartApi,
  removeCartItemApi,
  updateCartItemApi
} from '@/entities/cart/api/cartApi.ts'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Cart | null>(null)

  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)

  const items = computed(() => cart.value?.items ?? [])
  const subtotal = computed(() => cart.value?.subtotal ?? 0)
  const currency = computed(() => cart.value?.currency ?? 'USD')
  const isEmpty = computed(() => items.value.length === 0)

  function setCart(newCart: Cart): void {
    cart.value = newCart
  }

  function setLoading(value: boolean): void {
    isLoading.value = value
  }

  function setError(message: string | null): void {
    errorMessage.value = message
  }

  function clearCart(): void {
    cart.value = null
  }

  function clearError(): void {
    errorMessage.value = null
  }

  async function loadCart(): Promise<void> {
    setLoading(true)
    clearError()

    try {
      const response = await getCartApi()
      setCart(response)
    } catch {
      setError('Failed to load cart')
    } finally {
      setLoading(false)
    }
  }

  async function addToCart(productId: string, qty: number = 1): Promise<void> {
    clearError()

    try {
      const response = await addToCartApi({ productId, qty })
      setCart(response)
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'error' in error) {
        setError(String(error.error))
        return
      }

      setError('Failed to add product to cart')
    }
  }

  async function updateCartItem(productId: string, qty: number): Promise<void> {
    clearError()

    try {
      const response = await updateCartItemApi({ productId, qty })
      setCart(response)
    } catch (error) {
      if (typeof error == 'object' && error !== null && 'error' in error) {
        setError(String(error.error))
        return
      }
      setError('Failed to update cart item')
    }
  }

  async function removeCartItem(productId: string): Promise<void> {
    clearError()

    try {
      const response = await removeCartItemApi({ productId })
      setCart(response)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
        return
      }

      setError('Failed to remove cart item')
    }
  }

  return {
    cart,
    isLoading,
    errorMessage,
    items,
    subtotal,
    currency,
    isEmpty,
    setCart,
    setLoading,
    setError,
    clearCart,
    clearError,
    loadCart,
    addToCart,
    updateCartItem,
    removeCartItem
  }
})
