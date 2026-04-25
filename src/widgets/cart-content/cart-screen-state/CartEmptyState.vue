<script setup lang="ts"></script>

<template>
  <section class="cart-empty-state">
    <p class="cart-empty-state__title">Your cart is empty</p>
  </section>
</template>

<style scoped>
.cart-empty-state {
  padding: 40px;
  border-radius: 16px;
  background: var(--bg-primary);
  text-align: center;
}

.cart-empty-state__title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}
</style>
