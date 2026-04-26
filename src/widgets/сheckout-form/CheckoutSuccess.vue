<script setup lang="ts">
import { ActionButton } from '@/shared/ui'

interface Props {
  orderId: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'backToCatalog'): void
}>()

function onBack(): void {
  emit('backToCatalog')
}
</script>

<template>
  <div class="checkout-success">
    <p class="checkout-success__title">Order placed successfully</p>
    <p class="checkout-success__order">Order number: {{ props.orderId }}</p>

    <ActionButton
      class="checkout-success__button"
      label="Back to catalog"
      type="button"
      @press="onBack"
    />
  </div>
</template>

<style scoped>
.checkout-success {
  max-width: 420px;
  margin: 0 auto;
  padding: 24px;
  border-radius: 16px;
  background: var(--bg-primary);

  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;

  /* опционально */
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.checkout-success__title {
  font-size: 18px;
  font-weight: 600;
}

.checkout-success__order {
  font-size: 14px;
  font-weight: 500;
  color: var(--success);
}

.checkout-success__button {
  width: 100%;
}
</style>
