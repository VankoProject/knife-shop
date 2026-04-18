<script setup lang="ts">
interface Props {
  label: string
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}

const { label, loading, disabled, type, ariaLabel } = withDefaults(
  defineProps<Props>(),
  {
    loading: false,
    disabled: false,
    type: 'button',
    ariaLabel: ''
  }
)
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
  min-width: 160px;
  min-height: 44px;
  padding: 0 16px;
  border: none;
  border-radius: 16px;
  background: #d6ff9c;
  color: #000000;
  font-size: 32px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.action-button:hover {
  opacity: 0.9;
}

.action-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loader {
  width: 36px;
  height: 36px;
  border: 2px solid white;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
