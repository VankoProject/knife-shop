<script setup lang="ts">
interface Props {
  tags: string[]
}

defineProps<Props>()
</script>

<template>
  <div class="product-tags">
    <span v-for="tag in tags" :key="tag" class="product-tags__item">
      {{ tag }}
    </span>
  </div>
</template>

<style scoped>
.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.product-tags__item {
  padding: 4px 12px;
  border-radius: 4px;

  background: var(--accent);
  color: var(--text-primary);

  font-size: 12px;
  font-weight: 400;
  line-height: 1;
}
</style>
