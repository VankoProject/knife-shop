<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/features/login/model/useAuthStore.ts'
import { computed, watch } from 'vue'
import LoginCard from '@/features/login/ui/LoginCard.vue'
import {
  UiStateType
} from '@/shared/model/ui-state/screen-ui-state.ts'

const router = useRouter()
const loginStore = useAuthStore()

const buttonState = computed(() => {
  if (loginStore.loginResult.type === UiStateType.Loading) return 'loading'
  return 'idle'
})

async function onSubmit(): Promise<void> {
  await loginStore.login({
    provider: 'mock',
    nickname: 'User',
    avatar: 'https://avatars1.githubusercontent.com/u/554?v=4'
  })
}

watch(
  () => loginStore.isAuthenticated,
  async (isAuthenticated: boolean) => {
    if (isAuthenticated) {
      await router.replace('/catalog')
    }
  }
)
</script>

<template>
  <main class="login-page">
    <LoginCard :button-state="buttonState" @submit="onSubmit" />
  </main>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
