<script setup lang="ts"></script>

<template>
  <main class="main-layout">
    <router-view />
  </main>
</template>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background: white;
}
</style>
