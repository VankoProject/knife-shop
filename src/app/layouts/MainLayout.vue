<script setup lang="ts">
import AppHeader from '@/widgets/header/AppHeader.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <main class="main-layout">
    <AppHeader v-if="!route.meta.hideHeader" />

    <div class="page-container">
      <router-view />
    </div>
  </main>
</template>

<style scoped>
.main-layout {
  min-height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
}

.page-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
  flex: 1;
}
</style>
