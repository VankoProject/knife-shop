import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useCartStore } from '@/entities/cart/model/store.ts'
import type { Cart } from '@/entities/cart/model/types.ts'
import { checkoutApi } from '@/features/checkout/cloud/checkoutApi.ts'
import type { CheckoutRequest } from '@/features/checkout/model/types.ts'

export const useCheckoutStore = defineStore('checkout', () => {
  const name = ref('')
  const comment = ref('')

  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)
  const orderId = ref<string | null>(null)

  const cartStore = useCartStore()

  const isFormValid = computed(() => {
    return name.value.trim().length > 0
  })

  const canSubmit = computed(() => {
    return isFormValid.value && !cartStore.isEmpty && !isLoading.value
  })

  function setName(value: string): void {
    name.value = value
  }

  function setComment(value: string): void {
    comment.value = value
  }

  function clearError(): void {
    errorMessage.value = null
  }

  function clearSuccess(): void {
    orderId.value = null
  }

  function resetForm(): void {
    name.value = ''
    comment.value = ''
  }

  async function submitOrder(): Promise<void> {
    if (!cartStore.cart) {
      errorMessage.value = 'Cart is empty'
      return
    }

    if (!isFormValid.value) {
      errorMessage.value = 'Please enter your name'
      return
    }

    isLoading.value = true
    errorMessage.value = null
    orderId.value = null

    const request: CheckoutRequest = {
      customer: {
        name: name.value.trim(),
        comment: comment.value.trim() || undefined
      },
      cart: cartStore.cart
    }

    try {
      const response = await checkoutApi(request)

      orderId.value = response.orderId
      cartStore.clearCart()
      resetForm()
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'error' in error) {
        const checkoutError = error as {
          error: string
          serverCart?: Cart
        }

        if (
          checkoutError.error === 'CART_OUTDATED' &&
          checkoutError.serverCart
        ) {
          cartStore.replaceCart(checkoutError.serverCart)
          errorMessage.value = 'Cart was updated. Please review your order.'
        } else if (checkoutError.error === 'INVALID_CUSTOMER') {
          errorMessage.value = 'Please enter valid customer name.'
        } else {
          errorMessage.value = checkoutError.error
        }

        return
      }

      errorMessage.value = 'Failed to submit order'
    } finally {
      isLoading.value = false
    }
  }

  return {
    name,
    comment,
    isLoading,
    errorMessage,
    orderId,
    isFormValid,
    canSubmit,
    setName,
    setComment,
    clearError,
    clearSuccess,
    resetForm,
    submitOrder
  }
})
