import api from '@/lib/axios'
import type {
  AuthLoginRequest,
  AuthLoginResponse,
  RegisterRequest,
  RegisterResponse,
  ForgotPasswordRequest,
  UserResponse,
  AuthResult,
} from '@/types/auth'
import { mapAuthLoginToUser, mapUserResponseToUser } from '@/types/auth'

async function login(email: string, password: string): Promise<AuthResult> {
  const request: AuthLoginRequest = { email, password }
  const response = await api.post<AuthLoginResponse>('/api/auth/login', request)
  const auth = response.data

  console.log('Login response from backend:', auth)

  const token = auth.sessionToken ?? ''
  const role = auth.role ?? 'Customer'
  const userId = String(auth.userId)

  if (!userId || userId === 'undefined' || userId === 'null') {
    throw new Error('Invalid userId received from server')
  }

  localStorage.setItem('authToken', token)
  localStorage.setItem('userRole', role)
  localStorage.setItem('userId', userId)

  console.log('Stored in localStorage:', { userId, token: token.substring(0, 10) + '...', role })

  return {
    user: mapAuthLoginToUser(auth),
    token,
    role,
  }
}

async function register(data: {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  dateOfBirth: string
  gender?: string
}): Promise<{ userId: string; message: string }> {
  const request: RegisterRequest = {
    firstName: data.firstName,
    middleName: null,
    lastName: data.lastName,
    email: data.email,
    phoneNumber: data.phone,
    password: data.password,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender ?? null,
  }
  const response = await api.post<RegisterResponse>('/api/users/register', request)
  return { userId: response.data.id, message: response.data.message }
}

async function forgotPassword(email: string): Promise<boolean> {
  try {
    const request: ForgotPasswordRequest = { email }
    await api.post('/api/auth/forgot-password', request)
    return true
  } catch {
    return false
  }
}

async function getCurrentUser(userId: string): Promise<AuthResult | null> {
  try {
    const response = await api.get<UserResponse>(`/api/users/${userId}`)
    const user = mapUserResponseToUser(response.data)
    const token = localStorage.getItem('authToken') ?? ''
    const role = localStorage.getItem('userRole') ?? 'Customer'
    return { user, token, role }
  } catch {
    return null
  }
}

async function logout(): Promise<void> {
  const token = localStorage.getItem('authToken')
  try {
    if (token) {
      await api.post('/api/auth/logout', null, {
        headers: { sessionToken: token },
      })
    }
  } catch {
    // Swallow logout errors - clear local state regardless
  } finally {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userId')
  }
}

export const authService = {
  login,
  register,
  forgotPassword,
  getCurrentUser,
  logout,
}
