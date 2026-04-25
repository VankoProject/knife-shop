<script setup lang="ts">
import { useCartStore } from '@/entities/cart/model/store.ts'
import { onMounted, ref } from 'vue'
import CartContent from '@/widgets/cart-content/cart-screen-state/CartContent.vue'
import CartSummary from '@/widgets/cart-content/CartSummary.vue'
import { useRouter } from 'vue-router'
import {
  ScreenUiState,
  type UiState,
  UiStateType
} from '@/shared/model/ui-state/screen-ui-state.ts'
import CartLoadingState from '@/widgets/cart-content/cart-screen-state/CartLoadingState.vue'
import type { ApiError } from '@/shared/api/api-error.ts'
import type { CartItem } from '@/entities/cart/model/types.ts'
import CartErrorState from '@/widgets/cart-content/cart-screen-state/CartErrorState.vue'
import CartEmptyState from '@/widgets/cart-content/cart-screen-state/CartEmptyState.vue'

const cartStore = useCartStore()
const router = useRouter()
const cartResult = ref<UiState<CartItem, ApiError>>(ScreenUiState.idle())

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
  router.push('/checkout')
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
