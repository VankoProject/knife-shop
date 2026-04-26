import type {
  LoginRequest,
  LoginResponse
} from '@/features/auth/model/types.ts'

export async function loginRequest(
  request: LoginRequest
): Promise<LoginResponse> {
  const response = await fetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(request)
  })

  return (await response.json()) as LoginResponse
}

export async function logoutRequest(): Promise<void> {
  await fetch('/auth/logout', {
    method: 'POST',
    body: JSON.stringify({})
  })
}
