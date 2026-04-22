import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Cart } from '@/entities/cart/model/types.ts'
import { getCartApi } from '@/entities/cart/api/cartApi.ts'

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
    loadCart
  }
})
