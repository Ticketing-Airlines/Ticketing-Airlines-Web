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

      console.log('Login successful:', { userId: result.user.userId, token: result.token })
      return true
    } catch (error: unknown) {
      console.error('Login error:', error)
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
          localStorage.setItem('userId', foundUser.userId)
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
      const result = await authService.register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        dateOfBirth: data.dateOfBirth,
      })

      console.log('Registration successful:', result)
      successMessage.value = 'Account created successfully! Please sign in.'
      return true
    } catch (error: unknown) {
      console.error('Registration error:', error)
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
        localStorage.setItem('userId', newUser.userId)
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
    const userId = localStorage.getItem('userId')
    
    console.log('checkAuthStatus called:', { token: token?.substring(0, 20) + '...', userId })

    if (!token) {
      console.log('No token found, user not authenticated')
      isAuthenticated.value = false
      user.value = null
      return
    }

    // Handle mock tokens
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
        console.log('Mock user authenticated:', foundUser.name)
        return
      }
      // Invalid mock token
      console.log('Invalid mock token')
      localStorage.removeItem('authToken')
      localStorage.removeItem('userId')
      isAuthenticated.value = false
      user.value = null
      return
    }

    // Handle real backend tokens
    if (!userId || userId === 'undefined' || userId === 'null') {
      // Token exists but no userId - clear everything
      console.log('Token exists but userId is invalid:', userId)
      localStorage.removeItem('authToken')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userId')
      isAuthenticated.value = false
      user.value = null
      return
    }

    try {
      console.log('Fetching user data for userId:', userId)
      const result = await authService.getCurrentUser(userId)
      if (result) {
        user.value = result.user
        isAuthenticated.value = true
        console.log('User authenticated:', result.user.name)
      } else {
        // Failed to get user - clear auth
        console.log('Failed to get user data, clearing auth')
        localStorage.removeItem('authToken')
        localStorage.removeItem('userId')
        localStorage.removeItem('userRole')
        isAuthenticated.value = false
        user.value = null
      }
    } catch (error) {
      console.error('Failed to check auth status:', error)
      // On error, clear auth state
      localStorage.removeItem('authToken')
      localStorage.removeItem('userId')
      localStorage.removeItem('userRole')
      isAuthenticated.value = false
      user.value = null
    }
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