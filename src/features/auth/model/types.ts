import type { User } from '@/entities/user'

export interface LoginResponse {
  token: string
  user: User
}

export interface LoginRequest {
  provider: 'mock'
  nickname: string
  avatar: string
}
