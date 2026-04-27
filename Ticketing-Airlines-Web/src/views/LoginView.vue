<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Plane, Mail, Lock, Eye, EyeOff, ArrowRight, Zap, CheckCircle, Shield } from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import { useAuthStore } from '@/stores/authStore'

const isSignUp = ref(false)
const router = useRouter()
const authStore = useAuthStore()

// Login form fields
const loginEmail = ref('')
const loginPassword = ref('')

// Signup form fields
const signUpFirstName = ref('')
const signUpLastName = ref('')
const signUpEmail = ref('')
const signUpPhone = ref('')
const signUpPassword = ref('')
const signUpConfirmPassword = ref('')
const signUpDateOfBirth = ref('')

// Validation errors
const errors = ref<Record<string, string>>({})

onMounted(() => {
  const rememberedEmail = authStore.loadRememberedEmail()
  if (rememberedEmail) {
    loginEmail.value = rememberedEmail
  }
})

function validateLogin(): boolean {
  errors.value = {}
  let valid = true

  if (!loginEmail.value) {
    errors.value.email = 'Email is required'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail.value)) {
    errors.value.email = 'Please enter a valid email address'
    valid = false
  }

  if (!loginPassword.value) {
    errors.value.password = 'Password is required'
    valid = false
  } else if (loginPassword.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
    valid = false
  }

  return valid
}

function validateSignUp(): boolean {
  errors.value = {}
  let valid = true

  if (!signUpFirstName.value || signUpFirstName.value.length < 2) {
    errors.value.firstName = 'First name must be at least 2 characters'
    valid = false
  }

  if (!signUpLastName.value || signUpLastName.value.length < 2) {
    errors.value.lastName = 'Last name must be at least 2 characters'
    valid = false
  }

  if (!signUpEmail.value) {
    errors.value.signUpEmail = 'Email is required'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpEmail.value)) {
    errors.value.signUpEmail = 'Please enter a valid email address'
    valid = false
  }

  if (!signUpPhone.value || signUpPhone.value.length < 10) {
    errors.value.phone = 'Phone number must be at least 10 digits'
    valid = false
  }

  if (!signUpPassword.value || signUpPassword.value.length < 6) {
    errors.value.signUpPassword = 'Password must be at least 6 characters'
    valid = false
  }

  if (signUpPassword.value !== signUpConfirmPassword.value) {
    errors.value.confirmPassword = "Passwords don't match"
    valid = false
  }

  if (!signUpDateOfBirth.value) {
    errors.value.dateOfBirth = 'Date of birth is required'
    valid = false
  }

  return valid
}

async function handleLoginSubmit() {
  if (!validateLogin()) return
  authStore.clearErrors()
  authStore.clearMessages()
  const success = await authStore.login(loginEmail.value, loginPassword.value)
  if (success) {
    router.push('/')
  }
}

async function handleSignUpSubmit() {
  if (!validateSignUp()) return
  authStore.clearErrors()
  authStore.clearMessages()
  const success = await authStore.signUp({
    firstName: signUpFirstName.value,
    lastName: signUpLastName.value,
    email: signUpEmail.value,
    phone: signUpPhone.value,
    password: signUpPassword.value,
    dateOfBirth: signUpDateOfBirth.value,
  })
  if (success) {
    router.push('/')
  }
}

function handleForgotPassword() {
  if (!loginEmail.value) {
    errors.value.email = 'Please enter your email address first'
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail.value)) {
    errors.value.email = 'Please enter a valid email address'
    return
  }
  authStore.forgotPassword(loginEmail.value)
}
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
    <NavigationBar />

    <section class="bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-16 pb-6 xl:pt-20 xl:pb-10 flex-1 flex items-center">
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 xl:grid-cols-5 gap-6 xl:gap-10 items-center">
          <!-- Left Side - Hero Content -->
          <div class="text-center xl:text-left xl:col-span-2">
            <div class="inline-flex items-center px-3 py-1.5 mb-3 bg-white/10 backdrop-blur-md border-2 border-white/20">
              <Plane class="w-3.5 h-3.5 mr-1.5 text-white" />
              <span class="font-black text-xs text-white uppercase tracking-widest">Airlines Ticketing</span>
            </div>

            <h1 class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black mb-2 leading-tight text-white uppercase tracking-tight">
              Ready for Your Next<br/>
              <span class="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">Adventure?</span>
            </h1>

            <p class="text-sm max-w-md mx-auto xl:mx-0 font-bold text-white/70 leading-relaxed">
              Sign in to access exclusive deals, manage bookings, and discover flights to your favorite destinations.
            </p>
          </div>

          <!-- Right Side - Auth Forms -->
          <div class="xl:col-span-3 flex justify-center">
            <div class="w-full max-w-md">
              <div class="bg-white border-4 border-gray-900 shadow-[6px_6px_0px_0px_#1f2937]">
                <!-- Card Header -->
                <div class="bg-gray-900 px-5 py-3 flex items-center justify-between border-b-4 border-gray-900">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-blue-600 flex items-center justify-center">
                      <Plane class="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 class="text-white font-black text-sm uppercase tracking-wider leading-none">{{ isSignUp ? 'Create Account' : 'Sign In' }}</h2>
                      <p class="text-gray-400 font-bold text-[10px] uppercase tracking-wider mt-0.5">{{ isSignUp ? 'Join Airlines Ticketing' : 'Access Your Account' }}</p>
                    </div>
                  </div>
                  <div class="h-2 w-2 bg-blue-600"></div>
                </div>

                <!-- Card Body -->
                <div class="p-5 relative">
                  <!-- Loading Overlay -->
                  <div
                    v-if="authStore.isLoading"
                    class="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-sm"
                  >
                    <div class="flex flex-col items-center gap-3">
                      <div class="w-8 h-8 border-[3px] border-gray-900 border-t-blue-600 rounded-full animate-spin"></div>
                      <span class="text-xs font-black uppercase tracking-widest text-gray-900">{{ isSignUp ? 'Creating Account...' : 'Signing In...' }}</span>
                    </div>
                  </div>

                  <!-- Success/Error Messages -->
                  <div v-if="authStore.successMessage" class="mb-4 p-3 bg-green-50 border-2 border-green-600">
                    <div class="flex items-center gap-2">
                      <CheckCircle class="w-4 h-4 text-green-600" />
                      <p class="text-green-700 text-xs font-black uppercase tracking-wide">{{ authStore.successMessage }}</p>
                    </div>
                  </div>
                  <div v-if="authStore.errorMessage" class="mb-4 p-3 bg-red-50 border-2 border-red-600">
                    <div class="flex items-center gap-2">
                      <Shield class="w-4 h-4 text-red-600" />
                      <p class="text-red-700 text-xs font-black uppercase tracking-wide">{{ authStore.errorMessage }}</p>
                    </div>
                  </div>

                  <!-- Sign In Form -->
                  <form v-if="!isSignUp" @submit.prevent="handleLoginSubmit" class="space-y-4">
                    <!-- Email -->
                    <div>
                      <label class="text-xs font-black text-gray-900 uppercase tracking-wider mb-1.5 block">Email Address</label>
                      <div class="relative">
                        <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                        <input
                          v-model="loginEmail"
                          type="text"
                          placeholder="Enter your email"
                          class="w-full pl-9 h-10 border-2 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 bg-white font-bold text-gray-900 text-sm"
                          :class="{ 'border-red-600': errors.email }"
                        />
                      </div>
                      <p v-if="errors.email" class="text-gray-900 text-[10px] mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-0.5">{{ errors.email }}</p>
                    </div>

                    <!-- Password -->
                    <div>
                      <label class="text-xs font-black text-gray-900 uppercase tracking-wider mb-1.5 block">Password</label>
                      <div class="relative">
                        <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                        <input
                          v-model="loginPassword"
                          :type="authStore.showPassword ? 'text' : 'password'"
                          placeholder="Enter your password"
                          class="w-full pl-9 pr-9 h-10 border-2 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 bg-white font-bold text-gray-900 text-sm"
                          :class="{ 'border-red-600': errors.password }"
                        />
                        <button
                          type="button"
                          @click="authStore.togglePasswordVisibility"
                          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                          <Eye v-if="!authStore.showPassword" class="w-3.5 h-3.5" />
                          <EyeOff v-else class="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p v-if="errors.password" class="text-gray-900 text-[10px] mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-0.5">{{ errors.password }}</p>
                    </div>

                    <!-- Remember Me & Forgot Password -->
                    <div class="flex items-center justify-between">
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input
                          v-model="authStore.rememberMe"
                          type="checkbox"
                          class="w-4 h-4 text-blue-600 border-2 border-gray-900 rounded-none focus:ring-0"
                        />
                        <span class="text-xs text-gray-900 font-black uppercase tracking-wide">Remember me</span>
                      </label>
                      <button
                        type="button"
                        class="text-xs text-blue-600 font-black uppercase tracking-wide hover:underline"
                        @click="handleForgotPassword"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <!-- Login Button -->
                    <button
                      type="submit"
                      :disabled="authStore.isLoading"
                      class="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Zap v-if="!authStore.isLoading" class="w-4 h-4" />
                      <span v-if="!authStore.isLoading">Sign In</span>
                      <span v-else>Signing In...</span>
                      <ArrowRight v-if="!authStore.isLoading" class="w-4 h-4" />
                      <div v-else class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </button>
                  </form>

                  <!-- Sign Up Form -->
                  <form v-else @submit.prevent="handleSignUpSubmit" class="space-y-3">
                    <!-- Name Row -->
                    <div class="grid grid-cols-2 gap-3">
                      <div>
                        <label class="text-xs font-black text-gray-900 uppercase tracking-wider mb-1 block">First Name</label>
                        <input
                          v-model="signUpFirstName"
                          type="text"
                          placeholder="First name"
                          class="w-full h-9 border-2 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 bg-white font-bold text-gray-900 text-sm"
                          :class="{ 'border-red-600': errors.firstName }"
                        />
                        <p v-if="errors.firstName" class="text-gray-900 text-[10px] mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-0.5">{{ errors.firstName }}</p>
                      </div>
                      <div>
                        <label class="text-xs font-black text-gray-900 uppercase tracking-wider mb-1 block">Last Name</label>
                        <input
                          v-model="signUpLastName"
                          type="text"
                          placeholder="Last name"
                          class="w-full h-9 border-2 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 bg-white font-bold text-gray-900 text-sm"
                          :class="{ 'border-red-600': errors.lastName }"
                        />
                        <p v-if="errors.lastName" class="text-gray-900 text-[10px] mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-0.5">{{ errors.lastName }}</p>
                      </div>
                    </div>

                    <!-- Email + Phone Row -->
                    <div class="grid grid-cols-2 gap-3">
                      <div>
                        <label class="text-xs font-black text-gray-900 uppercase tracking-wider mb-1 block">Email Address</label>
                        <div class="relative">
                          <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                          <input
                            v-model="signUpEmail"
                            type="email"
                            placeholder="Email"
                            class="w-full pl-9 h-9 border-2 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 bg-white font-bold text-gray-900 text-sm"
                            :class="{ 'border-red-600': errors.signUpEmail }"
                          />
                        </div>
                        <p v-if="errors.signUpEmail" class="text-gray-900 text-[10px] mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-0.5">{{ errors.signUpEmail }}</p>
                      </div>
                      <div>
                        <label class="text-xs font-black text-gray-900 uppercase tracking-wider mb-1 block">Phone</label>
                        <input
                          v-model="signUpPhone"
                          type="tel"
                          placeholder="Phone number"
                          class="w-full h-9 border-2 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 bg-white font-bold text-gray-900 text-sm"
                          :class="{ 'border-red-600': errors.phone }"
                        />
                        <p v-if="errors.phone" class="text-gray-900 text-[10px] mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-0.5">{{ errors.phone }}</p>
                      </div>
                      <div>
                        <label class="text-xs font-black text-gray-900 uppercase tracking-wider mb-1 block">Date of Birth</label>
                        <input
                          v-model="signUpDateOfBirth"
                          type="date"
                          class="w-full h-9 border-2 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 bg-white font-bold text-gray-900 text-sm"
                          :class="{ 'border-red-600': errors.dateOfBirth }"
                        />
                        <p v-if="errors.dateOfBirth" class="text-gray-900 text-[10px] mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-0.5">{{ errors.dateOfBirth }}</p>
                      </div>
                    </div>

                    <!-- Password Row -->
                    <div class="grid grid-cols-2 gap-3">
                      <div>
                        <label class="text-xs font-black text-gray-900 uppercase tracking-wider mb-1 block">Password</label>
                        <div class="relative">
                          <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                          <input
                            v-model="signUpPassword"
                            :type="authStore.showPassword ? 'text' : 'password'"
                            placeholder="Password"
                            class="w-full pl-9 pr-9 h-9 border-2 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 bg-white font-bold text-gray-900 text-sm"
                            :class="{ 'border-red-600': errors.signUpPassword }"
                          />
                          <button
                            type="button"
                            @click="authStore.togglePasswordVisibility"
                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >
                            <Eye v-if="!authStore.showPassword" class="w-3.5 h-3.5" />
                            <EyeOff v-else class="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p v-if="errors.signUpPassword" class="text-gray-900 text-[10px] mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-0.5">{{ errors.signUpPassword }}</p>
                      </div>
                      <div>
                        <label class="text-xs font-black text-gray-900 uppercase tracking-wider mb-1 block">Confirm</label>
                        <div class="relative">
                          <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                          <input
                            v-model="signUpConfirmPassword"
                            :type="authStore.showPassword ? 'text' : 'password'"
                            placeholder="Confirm"
                            class="w-full pl-9 h-9 border-2 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 bg-white font-bold text-gray-900 text-sm"
                            :class="{ 'border-red-600': errors.confirmPassword }"
                          />
                        </div>
                        <p v-if="errors.confirmPassword" class="text-gray-900 text-[10px] mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-0.5">{{ errors.confirmPassword }}</p>
                      </div>
                    </div>

                    <!-- Terms -->
                    <div class="flex items-start gap-2">
                      <input
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 border-2 border-gray-900 rounded-none focus:ring-0 focus:ring-blue-600 mt-0.5"
                      />
                      <p class="text-xs text-gray-900 font-bold">
                        I agree to the
                        <button type="button" class="text-blue-600 font-black uppercase tracking-wide">Terms & Conditions</button>
                        and
                        <button type="button" class="text-blue-600 font-black uppercase tracking-wide">Privacy Policy</button>
                      </p>
                    </div>

                    <!-- Sign Up Button -->
                    <button
                      type="submit"
                      :disabled="authStore.isLoading"
                      class="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Zap v-if="!authStore.isLoading" class="w-4 h-4" />
                      <span v-if="!authStore.isLoading">Create Account</span>
                      <span v-else>Creating Account...</span>
                      <ArrowRight v-if="!authStore.isLoading" class="w-4 h-4" />
                      <div v-else class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </button>
                  </form>
                </div>

                <!-- Card Footer - Toggle -->
                <div class="px-5 py-3 bg-gray-50 border-t-2 border-gray-900 text-center">
                  <p class="text-xs text-gray-900 font-bold">
                    <span v-if="!isSignUp">Don't have an account?</span>
                    <span v-else>Already have an account?</span>
                    <button
                      type="button"
                      class="text-blue-600 font-black uppercase tracking-wide ml-1 hover:underline"
                      @click="isSignUp = !isSignUp; errors = {}"
                    >
                      {{ isSignUp ? 'Sign In' : 'Sign Up' }}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

input[type="checkbox"] {
  appearance: none;
  background-color: white;
  border: 2px solid #1f2937;
  width: 16px;
  height: 16px;
  position: relative;
}

input[type="checkbox"]:checked {
  background-color: #2563eb;
  border-color: #2563eb;
}

input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  left: 3px;
  top: 0px;
  width: 5px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

input[type="checkbox"]:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

input:focus {
  outline: none;
  box-shadow: none;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #1f2937;
  border-radius: 0;
}

::-webkit-scrollbar-thumb:hover {
  background: #374151;
}
</style>