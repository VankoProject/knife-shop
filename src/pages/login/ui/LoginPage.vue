<!-- <script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/features/login/model/store'

const router = useRouter()
const loginStore = useLoginStore()

const nickname = ref('')
const avatar = ref('/avatars/ui.png')

async function handleLogin() {
  await loginStore.login({
    provider: 'mock',
    nickname: nickname.value.trim() || 'User',
    avatar: avatar.value
  })

  if(loginStore.isAuthenticated) {
    router.push({ name: 'catalog' })
  }
}
</script>

<template>
  <section class="flex min-h-screen items-center justify-center">
    <div class="w-full max-w-md rounded-xl border p-6 shadow-sm">
      <h1 class="mb-4 text-2xl font-semibold">
        Login
      </h1>

      <label class="mb-2 block text-sm font-medium" for="nickname">
        Nickname
      </label>

      <input
        id="nickname"
        v-model="nickname"
        type="text"
        class="mb-4 w-full rounded-md border px-3 py-2"
        placeholder="Enter nickname"
      >

      <button
        class="w-full rounded-md border px-4 py-2"
        :disabled="loginStore.isLoading"
        @click="handleLogin"
      >
        {{ loginStore.isLoading ? 'Loading...' : 'Login' }}
      </button>

      <p
        v-if="loginStore.errorMessage"
        class="mt-3 text-sm text-red-600"
      >
        {{ loginStore.errorMessage }}
      </p>
    </div>
  </section>

  <div>Login page</div>

</template> -->

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const nickname = ref('')
</script>

<template>
  <section class="flex min-h-screen items-center justify-center">
  <div class="w-full max-w-md rounded-xl border p-6 shadow-sm">
    <h1 class="mb-4 text-2xl font-semibold">
      Login
    </h1>

    <label class="mb-2 block text-sm font-medium" for="nickname">
      Nickname
    </label>

    <input
      id="nickname"
      v-model="nickname"
      type="text"
      class="mb-4 w-full rounded-md border px-3 py-2"
      placeholder="Enter nickname"
    >
  </div>
</section>

<div>Login page</div>
</template>
