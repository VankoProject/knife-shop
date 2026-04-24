<script setup lang="ts">
import Loader from '@/shared/ui/loader/Loader.vue'
</script>

<template>
  <section class="catalog-loading">
    <Loader />
  </section>
</template>

<style scoped>
.catalog-loading {
  padding: 80px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
