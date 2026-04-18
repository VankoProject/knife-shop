<script setup lang="ts">
import ActionButton from '@/shared/ui/button/ActionButton.vue'

interface Props {
  loading?: boolean
}

const { loading = false } = defineProps<Props>()

defineEmits<{
  (event: 'submit'): void
}>()
</script>

<template>
  <section class="login-card">
    <p class="login-card_title">Добро пожаловать</p>
    <div class="spacer" />

    <ActionButton
      label="Войти"
      :loading="loading"
      :disabled="loading"
      @click="$emit('submit')"
    />
  </section>
</template>

<style scoped>
.login-card {
  width: 100%;
  max-width: 440px;
  padding: 32px;
  border-radius: 16px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);

  display: flex;
  flex-direction: column;
  gap: 24px;
}

.login-card_title {
  margin: 0 0 24px;
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  color: var(--text-primary);
}

.spacer {
  flex: 1;
}
</style>
