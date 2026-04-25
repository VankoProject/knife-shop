import type { AuthRepository } from './authRepository.ts'
import type { LoginRequest, LoginResponse } from './types.ts'
import {
  loginRequest,
  logoutRequest
} from '@/features/login/api/authRequest.ts'

export class AuthRepositoryImpl implements AuthRepository {
  async login(request: LoginRequest): Promise<LoginResponse> {
    return loginRequest(request)
  }

  async logout(): Promise<void> {
    return logoutRequest()
  }
}
