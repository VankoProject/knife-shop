import type { AuthRepository } from '../api/authRepository'
import type { LoginRequest, LoginResponse } from '../model/types'

export class MockAuthRepository implements AuthRepository {
  async login(request: LoginRequest): Promise<LoginResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: 'fake-jwt-token',
          user: {
            id: 'user_1',
            nickname: request.nickname,
            avatar: request.avatar
          }
        })
      }, 700)
    })
  }

  logout(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 300)
    })
  }
}
