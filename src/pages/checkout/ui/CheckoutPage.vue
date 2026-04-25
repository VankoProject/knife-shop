<script setup lang="ts">
import { useCheckoutStore } from '@/features/checkout/model/store.ts'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import CheckoutForm from '@/widgets/сheckout-form/CheckoutForm.vue'
import { router } from '@/app/router'
import { UiStateType } from '@/shared/model/ui-state/screen-ui-state.ts'

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
  checkoutStore.resetCheckoutResult()
  router.push('/catalog')
}
</script>

<template>
  <main class="checkout-page">
    <CheckoutForm
      :name="name"
      :comment="comment"
      :error-message="errorMessage"
      :order-id="orderId"
      :button-state="buttonState"
      @update:name="checkoutStore.setName"
      @update:comment="checkoutStore.setComment"
      @submit="onSubmit"
      @back-to-catalog="onBackToCatalog"
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
