import type { LoginRequest, LoginResponse } from './types.ts'

export interface AuthRepository {
  login(request: LoginRequest): Promise<LoginResponse>

  logout(): Promise<void>
}
