import type { User } from '@/interfaces/interfaces'
export interface AuthLoginRequest {
  email: string
  password: string
}

export interface AuthLoginResponse {
  userId: string
  email: string
  firstName: string | null
  middleName: string | null
  lastName: string | null
  role: string | null
  sessionToken: string | null
  sessionExpiry: string | null
  name: string
}

export interface AlternativeLoginResponse extends Omit<AuthLoginResponse, 'sessionToken'> {
  token: string | null
}

export type LoginResponse = AuthLoginResponse | AlternativeLoginResponse

export interface RegisterRequest {
  firstName: string
  middleName: string | null
  lastName: string
  email: string
  phoneNumber: string
  password: string
  dateOfBirth: string
  gender: string | null
}
export interface RegisterResponse {
  id: string
  message: string
}
export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  resetToken: string
  newPassword: string
}

export interface UserResponse {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  role: string
  dateOfBirth: string
  gender: string | null
  createdAt: string
}

export interface AuthResult {
  user: User
  token: string
  role: string
}

export function mapAuthLoginToUser(auth: LoginResponse): User {
  const nameFromParts = [auth.firstName, auth.middleName, auth.lastName]
    .filter(n => n && n.trim() !== '')
    .join(' ')
  
  return {
    userId: String(auth.userId),
    email: auth.email,
    name: auth.name || nameFromParts || auth.email,
    createdAt: new Date().toISOString(),
  }
}

export function mapUserResponseToUser(user: UserResponse): User {
  return {
    userId: user.id,
    email: user.email,
    name: user.fullName,
    phone: user.phoneNumber ?? undefined,
    createdAt: user.createdAt,
  }
}