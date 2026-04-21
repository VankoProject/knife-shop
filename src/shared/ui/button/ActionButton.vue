<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonState } from '@/shared/ui/button/buttonState.ts'

interface Props {
  label: string
  state?: ButtonState
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
  size?: 'xsmall' | 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  ariaLabel: '',
  size: 'medium',
  state: 'idle'
})

const emit = defineEmits<{
  (e: 'press'): void
}>()

const isLoading = computed(() => props.state === 'loading')
const isDisabled = computed(() => props.state === 'disabled')
const isIdle = computed(() => props.state === 'idle')

function handleClick(): void {
  if (!isIdle.value) return
  emit('press')
}
</script>

<template>
  <button
    class="action-button"
    :class="[`action-button--${props.size}`, `action-button--${props.state}`]"
    :type="props.type"
    :disabled="isDisabled"
    :aria-label="props.ariaLabel || props.label"
    :aria-busy="isLoading"
    :aria-disabled="isDisabled || isLoading"
    @click="handleClick"
  >
    <span v-if="isLoading" class="loader" />
    <span v-else>{{ props.label }}</span>
  </button>
</template>

<style scoped>
.action-button {
  width: 100%;
  padding: 0 16px;
  border: none;
  border-radius: 16px;
  background: var(--accent);
  color: var(--text-on-accent);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button--xsmall {
  height: 36px;
  font-size: 14px;
  padding: 0 12px;
  border-radius: 12px;
}

.action-button--small {
  height: 40px;
  font-size: 16px;
}

.action-button--medium {
  height: 56px;
  font-size: 18px;
}

.action-button--large {
  height: 64px;
  font-size: 24px;
}

.action-button:hover {
  background: var(--accent-hover);
}

.action-button:disabled {
  background: var(--bg-surface-secondary);
  cursor: not-allowed;
}

.action-button:disabled:hover {
  background: var(--bg-surface-secondary);
}

.action-button--loading {
  cursor: progress;
}

.action-button--loading:hover {
  background: var(--accent);
}

.loader {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-strong);
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
