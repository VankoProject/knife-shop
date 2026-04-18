import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { User } from '@/entities/user'
import {
  authRepository,
  type LoginRequest,
  type LoginResponse
} from '@/features/login'

export const useLoginStore = defineStore('login', () => {
  const token = ref<string | null>(null)
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => token.value !== null)

  async function login(request: LoginRequest): Promise<void> {
    isLoading.value = true
    error.value = null

    try {
      const response: LoginResponse = await authRepository.login(request)

      token.value = response.token
      user.value = response.user
    } catch (e) {
      error.value = 'Failed to login'
    } finally {
      isLoading.value = false
    }
  }

  async function logout(): Promise<void> {
    isLoading.value = true

    try {
      await authRepository.logout()

      token.value = null
      user.value = null
    } catch (e) {
      error.value = 'Failed to logout'
    } finally {
      isLoading.value = false
    }
  }

  return {
    token,
    user,
    isLoading,
    error,

    isAuthenticated,

    login,
    logout
  }
})
