import type { AxiosError } from 'axios'

export interface ApiErrorResponse {
  error: string
  message: string
  details?: string[]
}

export function isApiError(error: unknown): error is AxiosError<ApiErrorResponse> {
  return Boolean(
    error
    && typeof error === 'object'
    && 'isAxiosError' in error
    && (error as AxiosError).isAxiosError === true,
  )
}

export function getApiErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    const data = error.response?.data
    if (data && typeof data === 'object' && 'message' in data) {
      return (data as ApiErrorResponse).message
    }
    if (error.response?.status === 401) {
      return 'Session expired. Please log in again.'
    }
    if (error.response?.status === 403) {
      return 'You do not have permission to perform this action.'
    }
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
      return 'Unable to connect to the server. Please check your connection.'
    }
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred.'
}

export function isNetworkError(error: unknown): boolean {
  if (isApiError(error)) {
    return error.code === 'ERR_NETWORK' || !error.response
  }
  return false
}