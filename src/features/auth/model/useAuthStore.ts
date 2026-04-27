import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { User } from '@/entities/user'
import type { AuthRepository } from './authRepository'
import { AuthRepositoryImpl } from '@/features/auth/model/AuthRepositoryImpl'
import type {
  LoginRequest,
  LoginResponse
} from '@/features/auth/model/types.ts'
import { ScreenUiState, type UiState } from '@/shared/model'
import type { ApiError } from '@/shared/error'

export const useAuthStore = defineStore('login', () => {
  const token = ref<string | null>(null)
  const user = ref<User | null>(null)

  const authRepository: AuthRepository = new AuthRepositoryImpl()

  const loginResult = ref<UiState<User, ApiError>>(ScreenUiState.idle())

  const isAuthenticated = computed(() => token.value !== null)

  async function login(request: LoginRequest): Promise<void> {
    loginResult.value = ScreenUiState.loading()

    try {
      const response: LoginResponse = await authRepository.login(request)

      token.value = response.token
      user.value = response.user
      loginResult.value = ScreenUiState.success(response.user)
    } catch {
      loginResult.value = ScreenUiState.error({
        error: 'LOGIN_FAILED',
        message: 'Failed to login'
      })
    }
  }

  async function logout(): Promise<void> {
    loginResult.value = ScreenUiState.loading()

    try {
      await authRepository.logout()

      token.value = null
      user.value = null
      loginResult.value = ScreenUiState.idle()
    } catch {
      loginResult.value = ScreenUiState.error({
        error: 'LOGOUT_FAILED',
        message: 'Failed to logout'
      })
    }
  }

  return {
    token,
    user,
    loginResult,
    isAuthenticated,
    login,
    logout
  }
})
