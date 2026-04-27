<script setup lang="ts">
import type { ButtonState } from '@/shared/ui/button/buttonState.ts'
import ActionButton from '@/shared/ui/button/ActionButton.vue'

interface Props {
  message: string
  buttonState?: ButtonState
}
withDefaults(defineProps<Props>(), {
  buttonState: 'idle'
})

const emit = defineEmits<{
  (event: 'retry'): void
}>()
</script>

<template>
  <section class="app-error-state" role="alert">
    <p class="app-error-state__title">Something went wrong</p>
    <p class="app-error-state__message">{{ message }}</p>

    <ActionButton
      label="Try again"
      :state="buttonState"
      size="medium"
      @click="emit('retry')"
    />
  </section>
</template>

<style scoped>
.app-error-state {
  padding: 40px;
  border-radius: 16px;
  background: var(--bg-primary);
  text-align: center;
}

.app-error-state__title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
}

.app-error-state__message {
  margin: 0 0 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--error);
}
</style>
