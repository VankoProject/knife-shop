<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/features/login/model/store.ts'
import { computed, watch } from 'vue'
import LoginCard from '@/features/login/ui/LoginCard.vue'
import type { ButtonState } from '@/shared/ui/button/buttonState.ts'

const router = useRouter()
const loginStore = useLoginStore()

const buttonState = computed<ButtonState>(()=>{
  return loginStore.isLoading ? 'loading' : 'idle'
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
      await router.push('/catalog')
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