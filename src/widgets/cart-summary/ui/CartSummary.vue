<script setup lang="ts">
import { formatPrice } from '@/shared/lib/formatPrice.ts'

interface Props {
  subtotal: number
  currency: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'checkout'): void
}>()

function onCheckout(): void {
  emit('checkout')
}
</script>

<template>
  <section class="cart-summary">
    <div class="cart-summary__info">
      <p class="cart-summary__row">
        <span class="cart-summary__label">Subtotal:</span>
        <span class="cart-summary__value">{{ formatPrice(props.subtotal, props.currency) }}</span>
      </p>


    </div>

    <button
      class="cart-summary__checkout-button"
      type="button"
      @click="onCheckout"
    >
      Proceed to checkout
    </button>
  </section>
</template>

<style scoped>
.cart-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  padding: 20px;
  border-radius: 18px;
  border: 1px solid rgba(180, 214, 120, 0.5);
  background: var(--bg-surface);
}

.cart-summary__info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cart-summary__row {
  margin: 0;
}

.cart-summary__label {
  margin-right: 6px;
  color: var(--text-secondary);
}

.cart-summary__value {
  font-weight: 600;
}

.cart-summary__checkout-button {
  border: none;
  border-radius: 12px;
  background: var(--accent);
  padding: 12px 18px;
  cursor: pointer;
}
</style>
