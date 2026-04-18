<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/features/login/model/store.ts'
import { watch } from 'vue'
import LoginCard from '@/features/login/ui/LoginCard.vue'

const router = useRouter()
const loginStore = useLoginStore()

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
    <LoginCard :loading="loginStore.isLoading" @submit="onSubmit" />
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
