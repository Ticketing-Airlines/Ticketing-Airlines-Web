import type { User } from '@/interfaces/interfaces'

// ============================================================
// Backend response types — mirror ASP.NET DTOs exactly
// ============================================================

// POST /api/auth/login
export interface AuthLoginRequest {
  email: string
  password: string
}

// Response from AuthController login
export interface AuthLoginResponse {
  userId: number
  email: string
  firstName: string | null
  middleName: string | null
  lastName: string | null
  role: string | null
  sessionToken: string | null
  sessionExpiry: string | null
  fullName: string
}

// POST /api/users/register
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

// Response from UsersController register
export interface RegisterResponse {
  id: number
  message: string
}

// POST /api/auth/forgot-password
export interface ForgotPasswordRequest {
  email: string
}

// POST /api/auth/reset-password
export interface ResetPasswordRequest {
  resetToken: string
  newPassword: string
}

// GET /api/users/{id}
export interface UserResponse {
  id: number
  fullName: string
  email: string
  phoneNumber: string | null
  role: string
  dateOfBirth: string
  gender: string | null
  createdAt: string
}

// ============================================================
// Frontend auth result types — what the store receives
// ============================================================

export interface AuthResult {
  user: User
  token: string
  role: string
}

export function mapAuthLoginToUser(auth: AuthLoginResponse): User {
  return {
    userId: String(auth.userId),
    email: auth.email,
    name: auth.fullName,
    createdAt: new Date().toISOString(),
  }
}

export function mapUserResponseToUser(user: UserResponse): User {
  return {
    userId: String(user.id),
    email: user.email,
    name: user.fullName,
    phone: user.phoneNumber ?? undefined,
    createdAt: user.createdAt,
  }
}