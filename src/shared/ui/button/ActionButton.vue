<script setup lang="ts">
interface Props {
  label: string
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}

const {
  label,
  loading = false,
  disabled = false,
  type = 'button',
  ariaLabel = ''
} = defineProps<Props>()
</script>

<template>
  <button
    class="action-button"
    :type="type"
    :disabled="disabled || loading"
    :aria-label="ariaLabel || label"
    @click="$emit('click')"
  >
    <span v-if="loading" class="loader" />
    <span v-else>{{ label }}</span>
  </button>
</template>

<style scoped>
.action-button {
  width: 100%;
  height: 56px; /* фиксируем высоту */

  padding: 0 16px;

  border: none;
  border-radius: 16px;

  background: var(--accent);
  color: var(--text-on-accent);

  font-size: 24px;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button:hover {
  background: var(--accent-hover);
}

.action-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loader {
  width: 20px;
  height: 20px;
  border: 2px solid var(--text-on-accent);
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
