<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  image: string
  name: string
  rarity: string
}

const props = defineProps<Props>()

const rarityClass = computed(() => {
  return `product-card-media__badge--${props.rarity}`
})

function onImageError(event: Event): void {
  const target = event.target

  if (target instanceof HTMLImageElement) {
    target.src = '/images/fallback.png'
  }
}
</script>

<template>
  <div class="product-card-media">
    <div class="product-card-media__badge" :class="rarityClass">
      {{ props.rarity }}
    </div>

    <img
      class="product-card-media__image"
      :src="image || '/images/placeholder.png'"
      :alt="name"
      @error="onImageError"
    />
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

.product-card-media__badge--consumer {
  background: #9e9e9e;
}
.product-card-media__badge--industrial {
  background: #4caf50;
}
.product-card-media__badge--mil-spec {
  background: #2196f3;
}
.product-card-media__badge--restricted {
  background: #9c27b0;
}
.product-card-media__badge--classified {
  background: #e91e63;
}
.product-card-media__badge--covert {
  background: #f44336;
}
</style>
