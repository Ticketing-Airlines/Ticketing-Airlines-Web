import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/interfaces/interfaces'
import { authService } from '@/services/authService'
import { isNetworkError, getApiErrorMessage } from '@/types/api'
import { users } from '@/data/mockData'

const ENABLE_MOCK_FALLBACK = import.meta.env.VITE_ENABLE_MOCK_FALLBACK === 'true'

export const useAuthStore = defineStore('auth', () => {
  // --- state ---
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const rememberMe = ref(false)
  const showPassword = ref(false)
  const successMessage = ref('')
  const errorMessage = ref('')
  const emailError = ref('')
  const passwordError = ref('')

  // --- getters ---
  const isLoggedIn = computed(() => isAuthenticated.value && user.value !== null)
  const currentUser = computed(() => user.value)
  const hasErrors = computed(() => emailError.value !== '' || passwordError.value !== '')
  const hasMessages = computed(() => successMessage.value !== '' || errorMessage.value !== '')

  // --- helpers ---
  function clearMessages() {
    successMessage.value = ''
    errorMessage.value = ''
  }

  function clearErrors() {
    emailError.value = ''
    passwordError.value = ''
  }

  function clearForm() {
    clearErrors()
    clearMessages()
  }

  function togglePasswordVisibility() {
    showPassword.value = !showPassword.value
  }

  function validateEmail(emailValue: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(emailValue)
  }

  // --- actions ---
  async function login(email: string, password: string): Promise<boolean> {
    clearMessages()
    isLoading.value = true

    try {
      const result = await authService.login(email, password)
      user.value = result.user
      isAuthenticated.value = true
      successMessage.value = `Login successful! Welcome back, ${result.user.name}.`

      if (rememberMe.value) {
        localStorage.setItem('rememberedEmail', email)
      } else {
        localStorage.removeItem('rememberedEmail')
      }

      return true
    } catch (error: unknown) {
      const apiMessage = getApiErrorMessage(error)

      if (ENABLE_MOCK_FALLBACK && isNetworkError(error)) {
        const foundUser = users.find(u => u.email === email)
        if (foundUser) {
          user.value = {
            userId: foundUser.userId,
            email: foundUser.email,
            name: foundUser.name,
            createdAt: foundUser.createdAt ?? new Date().toISOString(),
          }
          isAuthenticated.value = true
          localStorage.setItem('authToken', `mock-token-${foundUser.userId}`)
          successMessage.value = `Login successful! Welcome back, ${foundUser.name}.`
          if (rememberMe.value) {
            localStorage.setItem('rememberedEmail', email)
          }
          return true
        }
      }

      errorMessage.value = apiMessage
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function signUp(data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
    dateOfBirth: string
  }): Promise<boolean> {
    clearMessages()
    isLoading.value = true

    try {
      await authService.register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        dateOfBirth: data.dateOfBirth,
      })

      successMessage.value = 'Account created successfully! Please sign in.'
      return true
    } catch (error: unknown) {
      const apiMessage = getApiErrorMessage(error)

      if (ENABLE_MOCK_FALLBACK && isNetworkError(error)) {
        const existingUser = users.find(u => u.email === data.email)
        if (existingUser) {
          errorMessage.value = 'An account with this email already exists.'
          return false
        }
        const newUser: User = {
          userId: `user-${Date.now()}`,
          email: data.email,
          name: `${data.firstName} ${data.lastName}`,
          createdAt: new Date().toISOString(),
        }
        user.value = newUser
        isAuthenticated.value = true
        localStorage.setItem('authToken', `mock-token-${newUser.userId}`)
        successMessage.value = `Account created successfully! Welcome, ${data.firstName}!`
        return true
      }

      errorMessage.value = apiMessage
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    try {
      await authService.logout()
    } catch {
      // Swallow — local state is cleared regardless
    }
    user.value = null
    isAuthenticated.value = false
    clearForm()
    successMessage.value = 'You have been logged out successfully.'
  }

  function forgotPassword(email: string) {
    clearMessages()
    if (!email) {
      emailError.value = 'Please enter your email address first'
      return
    }
    if (!validateEmail(email)) {
      emailError.value = 'Please enter a valid email address'
      return
    }

    if (ENABLE_MOCK_FALLBACK) {
      successMessage.value = 'Password reset instructions will be sent to your email. (Demo mode)'
      return
    }

    authService.forgotPassword(email).then((sent) => {
      if (sent) {
        successMessage.value = 'Password reset instructions will be sent to your email.'
      } else {
        errorMessage.value = 'No account found with that email address.'
      }
    })
  }

  async function checkAuthStatus() {
    const token = localStorage.getItem('authToken')
    if (!token) return

    const userId = localStorage.getItem('userId')
    if (userId && !token.startsWith('mock-token-')) {
      try {
        const result = await authService.getCurrentUser(userId)
        if (result) {
          user.value = result.user
          isAuthenticated.value = true
          return
        }
      } catch {
        // Fall through to token parsing
      }
    }

    // Fallback: parse mock tokens
    if (token.startsWith('mock-token-')) {
      const mockUserId = token.replace('mock-token-', '')
      const foundUser = users.find(u => u.userId === mockUserId)
      if (foundUser) {
        user.value = {
          userId: foundUser.userId,
          email: foundUser.email,
          name: foundUser.name,
          createdAt: foundUser.createdAt ?? new Date().toISOString(),
        }
        isAuthenticated.value = true
        return
      }
    }

    // Invalid token
    localStorage.removeItem('authToken')
  }

  function loadRememberedEmail() {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    if (rememberedEmail) {
      return rememberedEmail
    }
    return ''
  }

  return {
    // state
    user,
    isAuthenticated,
    isLoading,
    rememberMe,
    showPassword,
    successMessage,
    errorMessage,
    emailError,
    passwordError,
    // getters
    isLoggedIn,
    currentUser,
    hasErrors,
    hasMessages,
    // actions
    clearMessages,
    clearErrors,
    clearForm,
    togglePasswordVisibility,
    login,
    signUp,
    logout,
    forgotPassword,
    checkAuthStatus,
    loadRememberedEmail,
  }
})