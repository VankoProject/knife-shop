<script setup lang="ts">
import { useCartStore } from '@/entities/cart/model/store.ts'
import { onMounted } from 'vue'
import CartContent from '@/widgets/cart-content/ui/CartContent.vue'
import CartSummary from '@/widgets/cart-summary/ui/CartSummary.vue'
import { useRouter } from 'vue-router'

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
  router.push('/checkout')
}
</script>

<template>
  <main class="cart-page">
    <div v-if="cartStore.isLoading">Loading...</div>

    <div v-else-if="cartStore.errorMessage">
      {{ cartStore.errorMessage }}
    </div>

    <div v-else class="cart-page__layout">
      <CartContent
        :items="cartStore.items"
        @increase="onIncrease"
        @decrease="onDecrease"
        @remove="onRemove"
      />

      <CartSummary
        v-if="!cartStore.isEmpty"
        class="cart-page__summary"
        :subtotal="cartStore.subtotal"
        :currency="cartStore.currency"
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
