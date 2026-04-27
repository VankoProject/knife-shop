import type { LoginRequest, LoginResponse } from '@/features/auth'

export class AuthMockDatabase {
  public login(request: LoginRequest): LoginResponse {
    return {
      token: 'fake-jwt-token',
      user: {
        id: 'user_1',
        nickname: request.nickname,
        avatar: request.avatar
      }
    }
  }

  public logout(): void {}
}
