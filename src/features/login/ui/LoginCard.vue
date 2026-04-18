<script setup lang="ts">
import ActionButton from '@/shared/ui/button/ActionButton.vue'

interface Props {
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false
})

defineEmits<{
  (event: 'submit'): void
}>()
</script>

<template>
  <section class="login-card">
    <h1 class="login-card_title">Вход</h1>
    <p class="login-card_subtitle">Подтвердите вход</p>

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
  max-width: 420px;
  padding: 32px 32px;
  border-radius: 16px;
  background: white;
}

.login-card_title {
  margin: 0 0 24px;
  text-align: center;
}

.login-card_subtitle {
  margin: 0 0 24px;
  text-align: center;
}
</style>