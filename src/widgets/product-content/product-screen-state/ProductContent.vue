<script setup lang="ts">
import type { Product } from '@/entities/product/model/types.ts'
import ActionButton from '@/shared/ui/button/ActionButton.vue'
import type { ButtonState } from '@/shared/ui/button/buttonState.ts'
import { computed } from 'vue'
import { formatPrice } from '@/shared/lib'

interface Props {
  product: Product
  buttonState?: ButtonState
}
const props = withDefaults(defineProps<Props>(), {
  buttonState: 'idle'
})
const emit = defineEmits<{
  (event: 'addToCart', productId: string): void
}>()

const actionButtonState = computed<ButtonState>(() => {
  if (!props.product.inStock) {
    return 'disabled'
  }

  return props.buttonState
})

function onAddToCart(): void {
  emit('addToCart', props.product.id)
}
</script>

<template>
  <section class="product-content">
    <div class="product-content__layout">
      <div class="product-content__image">
        <img
          :src="props.product.image"
          :alt="props.product.name"
          class="product-content__image-item"
        />
      </div>
      <div class="product-content__info">
        <h1 class="product-content__title">
          {{ props.product.name }}
        </h1>
        <p class="product-content__price">
          {{ formatPrice(props.product.price) }}
        </p>
        <p class="product-content__rarity">
          {{ props.product.rarity }}
        </p>
        <p
          class="product-content__stock"
          :class="{
            'product-content__stock--available': props.product.inStock,
            'product-content__stock--unavailable': !props.product.inStock
          }"
        >
          {{ props.product.inStock ? 'In stock' : 'Out of stock' }}
        </p>
        <ul class="product-content__tags">
          <li
            v-for="tag in props.product.tags"
            :key="tag"
            class="product-content__tag"
          >
            {{ tag }}
          </li>
        </ul>
        <ActionButton
          label="Add to cart"
          size="medium"
          @press="onAddToCart"
          :state="actionButtonState"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.product-content__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}
.product-content__image-item {
  width: 100%;
  height: auto;
  border-radius: 12px;
  display: block;

  border: 1px solid var(--border-strong);
}
.product-content__info {
  display: flex;
  flex-direction: column;
  gap: 16px;

  align-items: flex-start;
  justify-content: center;
}
.product-content__title {
  font-size: 36px;
  font-weight: 600;
  line-height: 1.2;
}
.product-content__rarity {
  font-size: 24px;
  font-weight: 400;
}
.product-content__price {
  font-size: 32px;
  font-weight: 700;
  color: var(--success);
}

.product-content__stock--available {
  color: var(--success);
}

.product-content__stock--unavailable {
  color: var(--error);
}

.product-content__stock {
  font-size: 22px;
  font-weight: 500;
}
.product-content__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;

  list-style: none;
  padding: 0;
}
.product-content__tag {
  padding: 4px 10px;
  border-radius: 12px;
  background: var(--bg-surface-secondary);
  font-size: 12px;
}
</style>
