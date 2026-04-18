import type { LoginRequest, LoginResponse } from '../model/types'

export interface AuthRepository {
  login(request: LoginRequest): Promise<LoginResponse>

  logout(): Promise<void>
}
