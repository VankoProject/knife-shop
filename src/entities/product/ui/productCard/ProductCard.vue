<script setup lang="ts">
import { computed } from 'vue'
import ActionButton from '@/shared/ui/button/ActionButton.vue'
import ProductCardMedia from './ProductCardMedia.vue'
import ProductTags from './ProductTags.vue'

import type { Product } from '@/entities/product/model/types'
import type { ButtonState } from '@/shared/ui/button/buttonState'
import { formatPrice } from '@/shared/lib/formatPrice.ts'

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

const stockLabel = computed(() => {
  return props.product.inStock ? 'In stock' : 'Out of stock'
})

const actionButtonState = computed<ButtonState>(() => {
  if (!props.product.inStock) {
    return 'disabled'
  }

  return props.buttonState
})

const formattedPrice = computed(() => {
  return formatPrice(props.product.price)
})

function onAddToCart(): void {
  emit('addToCart', props.product.id)
}
</script>

<template>
  <article class="product-card">
    <ProductCardMedia
      :image="props.product.image"
      :name="props.product.name"
      :rarity="props.product.rarity"
    />

    <div class="product-card__content">
      <h3 class="product-card__title">
        {{ props.product.name }}
      </h3>

      <ProductTags :tags="props.product.tags" />

      <p class="product-card__price">{{ formattedPrice }}</p>

      <p
        class="product-card__stock"
        :class="{
          'product-card__stock--available': props.product.inStock,
          'product-card__stock--unavailable': !props.product.inStock
        }"
      >
        {{ stockLabel }}
      </p>

      <ActionButton
        label="Add to cart"
        size="xsmall"
        :state="actionButtonState"
        @press="onAddToCart"
      />
    </div>
  </article>
</template>

<style scoped>
.product-card {
  width: 100%;
  max-width: 240px;
  padding: 8px;
  border-radius: 14px;
  background: var(--bg-primary);

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product-card__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.product-card__title {
  margin: 0;

  color: var(--text-primary);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
}

.product-card__price {
  margin: 0;

  color: var(--success);
  font-size: 22px;
  font-weight: 500;
  line-height: 1.1;
}

.product-card__stock {
  margin: 0;

  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
}

.product-card__stock--available {
  color: green;
}

.product-card__stock--unavailable {
  color: red;
}
</style>
