import { defineStore } from 'pinia'
import type { User } from '@/interfaces/interfaces'
import { users } from '@/data/mockData'

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  email: string
  password: string
  showPassword: boolean
  isLoading: boolean
  rememberMe: boolean
  isSignUp: boolean
  acceptTerms: boolean
  successMessage: string
  errorMessage: string
  emailError: string
  passwordError: string
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    email: '',
    password: '',
    showPassword: false,
    isLoading: false,
    rememberMe: false,
    isSignUp: false,
    acceptTerms: false,
    successMessage: '',
    errorMessage: '',
    emailError: '',
    passwordError: ''
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated && state.user !== null,
    currentUser: (state) => state.user,
    hasErrors: (state) => state.emailError !== '' || state.passwordError !== '',
    hasMessages: (state) => state.successMessage !== '' || state.errorMessage !== ''
  },

  actions: {
    clearMessages() {
      this.successMessage = ''
      this.errorMessage = ''
    },

    clearErrors() {
      this.emailError = ''
      this.passwordError = ''
    },

    clearForm() {
      this.email = ''
      this.password = ''
      this.rememberMe = false
      this.clearErrors()
      this.clearMessages()
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },

    validateEmail(emailValue: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(emailValue)
    },

    validateForm(): boolean {
      this.clearErrors()
      let isValid = true

      if (!this.email) {
        this.emailError = 'Email is required'
        isValid = false
      } else if (!this.validateEmail(this.email)) {
        this.emailError = 'Please enter a valid email address'
        isValid = false
      }

      if (!this.password) {
        this.passwordError = 'Password is required'
        isValid = false
      } else if (this.password.length < 6) {
        this.passwordError = 'Password must be at least 6 characters'
        isValid = false
      }

      return isValid
    },

    async login() {
      this.clearMessages()
      
      if (!this.validateForm()) {
        return false
      }

      this.isLoading = true
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Find user in mock data
        const foundUser = users.find(user => user.email === this.email)
        
        if (!foundUser) {
          this.errorMessage = 'Invalid email or password. Please try again.'
          return false
        }
        
        // For demo purposes, accept any password for existing users
        // In real app, you would verify password hash
        
        this.user = {
          userId: foundUser.userId,
          email: foundUser.email,
          name: foundUser.name,
          createdAt: foundUser.createdAt || new Date().toISOString()
        }
        this.isAuthenticated = true
        
        console.log('Login successful:', { 
          email: this.email, 
          rememberMe: this.rememberMe,
          user: this.user
        })
        
        this.successMessage = `Login successful! Welcome back, ${foundUser.name}.`
        
        // Store in localStorage if remember me is checked
        if (this.rememberMe) {
          localStorage.setItem('rememberedEmail', this.email)
          localStorage.setItem('authToken', `token-${foundUser.userId}`)
        } else {
          localStorage.removeItem('rememberedEmail')
          localStorage.setItem('authToken', `token-${foundUser.userId}`)
        }
        
        return true
      } catch (error) {
        console.error('Login failed:', error)
        this.errorMessage = 'Login failed. Please try again.'
        return false
      } finally {
        this.isLoading = false
      }
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      this.clearForm()
      localStorage.removeItem('authToken')
      localStorage.removeItem('rememberedEmail')
      this.successMessage = 'You have been logged out successfully.'
    },

    socialLogin(provider: string) {
      console.log(`Login with ${provider}`)
      this.successMessage = `${provider} login - Feature coming soon!`
    },

    forgotPassword() {
      if (!this.email) {
        this.emailError = 'Please enter your email address first'
        return
      }
      
      if (!this.validateEmail(this.email)) {
        this.emailError = 'Please enter a valid email address'
        return
      }
      this.successMessage = 'Password reset instructions will be sent to your email.'
    },

    async signUp(userData: { firstName: string; lastName: string; email: string; phone: string; password: string }) {
      this.clearMessages()
      this.isLoading = true
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Check if user already exists
        const existingUser = users.find(user => user.email === userData.email)
        
        if (existingUser) {
          this.errorMessage = 'An account with this email already exists. Please sign in instead.'
          return false
        }
        
        // Create new user (in real app, this would be sent to backend)
        const newUser = {
          userId: `user-${Date.now()}`,
          email: userData.email,
          name: `${userData.firstName} ${userData.lastName}`,
          createdAt: new Date().toISOString()
        }
        
        this.user = newUser
        this.isAuthenticated = true
        
        console.log('Sign up successful:', { 
          userData,
          user: this.user
        })
        
        this.successMessage = `Account created successfully! Welcome, ${userData.firstName}!`
        
        // Store auth token
        localStorage.setItem('authToken', `token-${newUser.userId}`)
        
        return true
      } catch (error) {
        console.error('Sign up failed:', error)
        this.errorMessage = 'Sign up failed. Please try again.'
        return false
      } finally {
        this.isLoading = false
      }
    },

    loadRememberedEmail() {
      const rememberedEmail = localStorage.getItem('rememberedEmail')
      if (rememberedEmail) {
        this.email = rememberedEmail
        this.rememberMe = true
      }
    },

    checkAuthStatus() {
      const token = localStorage.getItem('authToken')
      if (token) {
        // Extract user ID from token and find user
        const userId = token.replace('token-', '')
        const foundUser = users.find(user => user.userId === userId)
        
        if (foundUser) {
          this.user = {
            userId: foundUser.userId,
            email: foundUser.email,
            name: foundUser.name,
            createdAt: foundUser.createdAt || new Date().toISOString()
          }
          this.isAuthenticated = true
        } else {
          // Invalid token, clear it
          localStorage.removeItem('authToken')
        }
      }
    }
  }
})