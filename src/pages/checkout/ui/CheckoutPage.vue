<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { CheckoutForm, CheckoutSuccess } from '@/widgets/сheckout-form'
import { router } from '@/app/router'
import { UiStateType } from '@/shared/model'
import { ROUTES } from '@/shared/constants'
import { useCheckoutStore } from '@/features/checkout'

const checkoutStore = useCheckoutStore()

const { name, comment, checkoutResult, canSubmit } = storeToRefs(checkoutStore)

const buttonState = computed(() => {
  if (checkoutResult.value.type === UiStateType.Loading) return 'loading'
  if (!canSubmit.value) return 'disabled'
  return 'idle'
})

const errorMessage = computed(() => {
  if (checkoutResult.value.type === UiStateType.Error) {
    return checkoutResult.value.error.message ?? 'Failed to submit order'
  }

  return null
})

const orderId = computed(() => {
  if (checkoutResult.value.type === UiStateType.Success) {
    return checkoutResult.value.data.orderId
  }

  return null
})

function onSubmit(): void {
  checkoutStore.submitOrder()
}

function onBackToCatalog(): void {
  checkoutStore.finishCheckout()
  router.replace({
    name: ROUTES.CATALOG
  })
}
</script>

<template>
  <main class="checkout-page">
    <CheckoutSuccess
      v-if="orderId"
      :order-id="orderId"
      @back-to-catalog="onBackToCatalog"
    />
    <CheckoutForm
      v-else
      :name="name"
      :comment="comment"
      :error-message="errorMessage"
      :button-state="buttonState"
      @update:name="checkoutStore.setName"
      @update:comment="checkoutStore.setComment"
      @submit="onSubmit"
    />
  </main>
</template>

<style scoped>
.checkout-page {
  width: 100%;
  padding: 40px 24px;
  box-sizing: border-box;
}
</style>
