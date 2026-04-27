<template>
  <div class="loader" />
</template>

<style scoped>
.loader {
  width: 40px;
  height: 40px;
  border: 4px solid var(--bg-surface-secondary);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
