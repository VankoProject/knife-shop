<script setup lang="ts">
import { formatPrice } from '@/shared/lib/formatPrice.ts'

interface Props {
  productId: string
  name: string
  price: number
  qty: number
  image: string
  inStock: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'increase', productId: string, qty: number): void
  (event: 'decrease', productId: string, qty: number): void
  (event: 'remove', productId: string): void
}>()

function onIncrease(): void {
  emit('increase', props.productId, props.qty)
}

function onDecrease(): void {
  emit('decrease', props.productId, props.qty)
}

function onRemove(): void {
  emit('remove', props.productId)
}
</script>

<template>
  <article class="cart-item-card">
    <div class="cart-item-card__media">
      <img class="cart-item-card__image" :src="props.image" :alt="props.name" />
    </div>

    <div class="cart-item-card__info">
      <h3 class="cart-item-card__title">{{ props.name }}</h3>

      <p class="cart-item-card__price">
        <span class="cart-item-card__label">Price:</span>
        <span class="cart-item-card__value">
          {{ formatPrice(props.price) }}
        </span>
      </p>

      <p class="cart-item-card__total">
        <span class="cart-item-card__label">Total:</span>
        <span class="cart-item-card__value">
          {{ formatPrice(props.price * props.qty) }}
        </span>
      </p>

      <p v-if="!props.inStock" class="cart-item-card__stock">Out of stock</p>
    </div>

    <div class="cart-item-card__actions">
      <div class="cart-item-card__controls">
        <button
          class="cart-item-card__control-button"
          type="button"
          :disabled="props.qty === 1"
          @click="onDecrease"
        >
          -
        </button>

        <span class="cart-item-card__qty">
          {{ props.qty }}
        </span>

        <button
          class="cart-item-card__control-button"
          type="button"
          @click="onIncrease"
        >
          +
        </button>
      </div>

      <button
        class="cart-item-card__remove-button"
        type="button"
        @click="onRemove"
      >
        Remove
      </button>
    </div>
  </article>
</template>

<style scoped>
.cart-item-card {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  align-items: center;
  gap: 20px;

  padding: 20px;
  border-radius: 18px;
  border: 1px solid rgba(180, 214, 120, 0.5);
  background: var(--bg-surface);
}

.cart-item-card__media {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-item-card__image {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.cart-item-card__info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cart-item-card__title {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.2;
}

.cart-item-card__price,
.cart-item-card__total,
.cart-item-card__stock {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.cart-item-card__label {
  color: var(--text-secondary);
  margin-right: 6px;
}

.cart-item-card__value {
  font-weight: 500;
}

.cart-item-card__actions {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cart-item-card__controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-item-card__control-button,
.cart-item-card__remove-button {
  border: none;
  border-radius: 12px;
  background: var(--accent);
  padding: 10px 14px;
  cursor: pointer;
}

.cart-item-card__control-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cart-item-card__qty {
  min-width: 20px;
  text-align: center;
  font-weight: 600;
}

.cart-item-card__remove-button {
  background: transparent;
  border: 1px solid var(--accent);
}

.cart-item-card__stock {
  color: var(--error);
  font-weight: 500;
}

.cart-item-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}
</style>
