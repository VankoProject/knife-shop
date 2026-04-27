import type { AuthRepository } from './authRepository'
import { loginRequest, logoutRequest } from '@/features/auth/api/authRequest'
import type {
  LoginRequest,
  LoginResponse
} from '@/features/auth/model/types'

export class AuthRepositoryImpl implements AuthRepository {
  async login(request: LoginRequest): Promise<LoginResponse> {
    return loginRequest(request)
  }

  async logout(): Promise<void> {
    return logoutRequest()
  }
}
