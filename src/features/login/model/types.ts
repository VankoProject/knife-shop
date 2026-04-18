import type { User } from '@/entities/user'

export interface LoginRequest {
  provider: 'mock'
  nickname: string
  avatar: string
}

export interface LoginResponse {
  token: string
  user: User
}
