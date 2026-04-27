<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { UiStateType } from '@/shared/model'
import { ROUTES } from '@/shared/constants'
import {
  CartContent,
  CartEmptyState,
  CartErrorState,
  CartLoadingState,
  CartSummary
} from '@/widgets/cart-content'
import { useCartStore } from '@/features/cart'

const cartStore = useCartStore()
const router = useRouter()

onMounted(() => {
  cartStore.loadCart()
})

function onIncrease(productId: string, qty: number): void {
  cartStore.updateCartItem(productId, qty + 1)
}

function onDecrease(productId: string, qty: number): void {
  if (qty <= 1) {
    cartStore.removeCartItem(productId)
    return
  }

  cartStore.updateCartItem(productId, qty - 1)
}
function onRemove(productId: string): void {
  cartStore.removeCartItem(productId)
}

function onCheckout(): void {
  router.push({
    name: ROUTES.CHECKOUT
  })
}
</script>

<template>
  <main class="cart-page">
    <CartLoadingState
      v-if="
        cartStore.cartResult.type === UiStateType.Idle ||
        cartStore.cartResult.type === UiStateType.Loading
      "
    />

    <CartErrorState
      v-else-if="cartStore.cartResult.type === UiStateType.Error"
      :message="cartStore.cartResult.error.message ?? 'Failed to load cart'"
      @retry="cartStore.loadCart"
    />

    <CartEmptyState
      v-else-if="cartStore.cartResult.type === UiStateType.Empty"
    />

    <div
      v-else-if="cartStore.cartResult.type === UiStateType.Success"
      class="cart-page__layout"
    >
      <CartContent
        :items="cartStore.cartResult.data.items"
        @increase="onIncrease"
        @decrease="onDecrease"
        @remove="onRemove"
      />

      <CartSummary
        class="cart-page__summary"
        :subtotal="cartStore.cartResult.data.subtotal"
        :currency="cartStore.cartResult.data.currency"
        @checkout="onCheckout"
      />
    </div>
  </main>
</template>

<style scoped>
.cart-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
}

.cart-page__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
  align-items: start;
}

.cart-page__summary {
  position: sticky;
  top: 88px;
}
</style>
