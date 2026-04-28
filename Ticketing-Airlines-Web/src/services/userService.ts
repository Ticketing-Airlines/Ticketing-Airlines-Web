import api from '@/lib/axios'

export interface UserProfileResponse {
  id: string
  fullName: string
  email: string
  phoneNumber: string | null
  role: string
  dateOfBirth: string
  gender: string | null
  createdAt: string
}

export interface UpdateUserRequest {
  firstName?: string
  middleName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  gender?: string
  dateOfBirth?: string
}

export interface UserProfileUpdateData {
  name: string
  phone: string
  address?: string
  city?: string
  country?: string
  dateOfBirth: string
  nationality?: string
}

async function getUserById(userId: string): Promise<UserProfileResponse | null> {
  try {
    const response = await api.get<UserProfileResponse>(`/api/users/${userId}`)
    return response.data
  } catch {
    return null
  }
}

async function updateUser(userId: string, data: UpdateUserRequest): Promise<UserProfileResponse | null> {
  try {
    const response = await api.put<UserProfileResponse>(`/api/users/${userId}`, data)
    return response.data
  } catch {
    return null
  }
}

export const userService = {
  getUserById,
  updateUser,
}