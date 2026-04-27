<script setup lang="ts">
import ActionButton from '@/shared/ui/button/ActionButton.vue'

const emit = defineEmits<{
  (event: 'reset'): void
}>()
</script>

<template>
  <section class="catalog-state">
    <p class="catalog-state__title">No products found</p>

    <p class="catalog-state__message">Try changing filters or search query</p>

    <ActionButton label="Reset filters" size="medium" @click="emit('reset')" />
  </section>
</template>

<style scoped>
.catalog-state {
  padding: 40px;
  border-radius: 16px;
  background: var(--bg-primary);
  text-align: center;
}

.catalog-state__title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
}

.catalog-state__message {
  margin: 0 0 16px;
}
</style>
