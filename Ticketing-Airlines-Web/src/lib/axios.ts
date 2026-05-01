import axios from 'axios'

// Helper to convert PascalCase to camelCase
function toCamelCase(obj: unknown): unknown {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(toCamelCase)
  }

  return Object.keys(obj).reduce((acc: Record<string, unknown>, key: string) => {
    const camelKey = key.charAt(0).toLowerCase() + key.slice(1)
    acc[camelKey] = toCamelCase((obj as Record<string, unknown>)[key])
    return acc
  }, {})
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5241',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token && !token.startsWith('mock-token-')) {
      // For real backend tokens, use them directly
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => {
    // Transform PascalCase to camelCase
    if (response.data) {
      response.data = toCamelCase(response.data)
    }
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userId')
      localStorage.removeItem('rememberedEmail')
      // Optionally redirect to login
      // window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default api