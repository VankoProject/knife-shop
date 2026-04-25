import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useCartStore } from '@/entities/cart/model/store.ts'
import { checkoutApi } from '@/features/checkout/cloud/checkoutApi.ts'
import type {
  CheckoutRequest,
  CheckoutResponse
} from '@/features/checkout/model/types.ts'
import {
  type CheckoutErrorResponse,
  isErrorCode
} from '@/shared/error/types.ts'
import {
  ScreenUiState,
  type UiState,
  UiStateType
} from '@/shared/model/ui-state/screen-ui-state.ts'

export const useCheckoutStore = defineStore('checkout', () => {
  const name = ref('')
  const comment = ref('')

  const checkoutResult = ref<UiState<CheckoutResponse, CheckoutErrorResponse>>(
    ScreenUiState.idle()
  )

  const cartStore = useCartStore()

  const isFormValid = computed(() => {
    return name.value.trim().length > 0
  })

  const canSubmit = computed(() => {
    return (
      isFormValid.value &&
      cartStore.cartResult.type === UiStateType.Success &&
      cartStore.cartResult.data.items.length > 0 &&
      checkoutResult.value.type !== UiStateType.Loading
    )
  })

  function setName(value: string): void {
    name.value = value
  }

  function setComment(value: string): void {
    comment.value = value
  }

  function resetForm(): void {
    name.value = ''
    comment.value = ''
  }

  function resetCheckoutResult(): void {
    checkoutResult.value = ScreenUiState.idle()
  }

  async function submitOrder(): Promise<void> {
    if (!isFormValid.value) {
      checkoutResult.value = ScreenUiState.error({
        error: 'INVALID_CUSTOMER',
        message: 'Please enter your name'
      })
      return
    }

    if (cartStore.cartResult.type !== UiStateType.Success) {
      return
    }

    checkoutResult.value = ScreenUiState.loading()

    const request: CheckoutRequest = {
      customer: {
        name: name.value.trim(),
        comment: comment.value.trim() || undefined
      },
      cart: cartStore.cartResult.data
    }

    try {
      const response = await checkoutApi(request)

      checkoutResult.value = ScreenUiState.success(response)

      cartStore.clearCart()
      resetForm()
    } catch (error) {
      const checkoutError = error as CheckoutErrorResponse

      if (
        isErrorCode(checkoutError, 'CART_OUTDATED') &&
        checkoutError.serverCart
      ) {
        cartStore.replaceCart(checkoutError.serverCart)
      }

      checkoutResult.value = ScreenUiState.error(checkoutError)
    }
  }

  return {
    name,
    comment,
    checkoutResult,
    isFormValid,
    canSubmit,
    setName,
    setComment,
    resetForm,
    resetCheckoutResult,
    submitOrder
  }
})
