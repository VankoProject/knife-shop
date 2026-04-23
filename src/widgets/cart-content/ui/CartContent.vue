<script setup lang="ts">
import type { CartItem } from '@/entities/cart/model/types.ts'
import CartItemCard from '@/entities/cart/ui/CartItemCard.vue'

interface Props {
  items: CartItem[]
}
defineProps<Props>()

const emit = defineEmits<{
  (event: 'increase', productId: string, qty: number): void
  (event: 'decrease', productId: string, qty: number): void
  (event: 'remove', productId: string): void
}>()

function onIncrease(productId: string, qty: number): void {
  emit('increase', productId, qty)
}

function onDecrease(productId: string, qty: number): void {
  emit('decrease', productId, qty)
}

function onRemove(productId: string): void {
  emit('remove', productId)
}
</script>

<template>
  <section class="cart-content">
    <div v-if="items.length === 0" class="cart-content__empty">
      Cart is empty
    </div>

    <div v-else class="cart-content__list">
      <CartItemCard
        v-for="item in items"
        :key="item.productId"
        :product-id="item.productId"
        :name="item.name"
        :price="item.price"
        :qty="item.qty"
        :image="item.image"
        :in-stock="item.inStock"
        @increase="onIncrease"
        @decrease="onDecrease"
        @remove="onRemove"
      />
    </div>
  </section>
</template>

<style scoped>
.cart-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-content__empty {
  padding: 24px;
  border-radius: 16px;
  background: var(--bg-surface);
}

.cart-content__list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
