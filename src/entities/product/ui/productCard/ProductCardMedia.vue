<script setup lang="ts">
interface Props {
  image: string
  name: string
  rarity: string
}

defineProps<Props>()
</script>

<template>
  <div class="product-card-media">
    <div class="product-card-media__badge">
      {{ rarity }}
    </div>

    <img class="product-card-media__image" :src="image" :alt="name" />
  </div>
</template>

<style scoped>
.product-card-media {
  position: relative;
  width: 100%;
  min-height: 160px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.product-card-media__badge {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  padding: 4px;
  border-radius: 0 0 8px 0;

  background: #ff6b86;
  color: var(--bg-surface);

  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
}

.product-card-media__image {
  width: 100%;
  height: auto;

  display: block;
  object-fit: cover;
}
</style>
