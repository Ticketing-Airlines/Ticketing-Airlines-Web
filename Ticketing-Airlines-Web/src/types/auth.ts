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
  id: string
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
  id: string
  fullName: string
  email: string
  phoneNumber: string
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