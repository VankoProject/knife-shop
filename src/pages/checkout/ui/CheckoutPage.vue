<script setup lang="ts">
import { useCheckoutStore } from '@/features/checkout/model/store.ts'
import type { ButtonState } from '@/shared/ui/button/buttonState.ts'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import CheckoutForm from '@/widgets/сheckout-form/ui/CheckoutForm.vue'
import { router } from '@/app/router'

const checkoutStore = useCheckoutStore()

const { name, comment, isLoading, errorMessage, orderId, canSubmit } =
  storeToRefs(checkoutStore)

const buttonState = computed<ButtonState>(() => {
  if (isLoading.value) {
    return 'loading'
  }

  if (!canSubmit.value) {
    return 'disabled'
  }

  return 'idle'
})

function onSubmit(): void {
  checkoutStore.submitOrder()
}

function onBackToCatalog(): void {
  checkoutStore.clearSuccess()
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
