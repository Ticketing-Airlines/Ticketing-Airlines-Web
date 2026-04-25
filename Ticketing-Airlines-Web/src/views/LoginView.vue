<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FormControl, FormItem, FormLabel, FormMessage, FormField } from '@/components/ui/form'
import { Plane, Mail, Lock, Eye, EyeOff, ArrowRight, Zap, CheckCircle, Shield } from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import { useAuthStore } from '@/stores/authStore'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const isSignUp = ref(false)

const authStore = useAuthStore()

const loginSchema = toTypedSchema(z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
}))

const signUpSchema = toTypedSchema(z.object({
  firstName: z.string().min(1, 'First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z.string().min(1, 'Phone number is required').min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}))

const loginForm = useForm({
  validationSchema: loginSchema,
  initialValues: {
    email: authStore.email,
    password: authStore.password
  }
})

const signUpForm = useForm({
  validationSchema: signUpSchema,
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  }
})

const handleSubmit = loginForm.handleSubmit(async (values) => {
  authStore.email = values.email
  authStore.password = values.password
  authStore.clearErrors()
  authStore.clearMessages()
  await authStore.login()
})

const handleSignUp = signUpForm.handleSubmit(async (values) => {
  authStore.clearErrors()
  authStore.clearMessages()
  authStore.email = values.email
  authStore.password = values.password
  await authStore.signUp({
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    phone: values.phone,
    password: values.password
  })
})

onMounted(() => {
  authStore.loadRememberedEmail()
  if (authStore.email) {
    loginForm.setFieldValue('email', authStore.email)
  }
})
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
                <div class="p-5">
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
                  <form v-if="!isSignUp" @submit="handleSubmit" class="space-y-4">
                    <!-- Email -->
                    <FormField v-slot="{ componentField, meta }" name="email">
                      <FormItem>
                        <FormLabel class="text-xs font-black text-gray-900 uppercase tracking-wider mb-1.5 block">Email Address</FormLabel>
                        <FormControl>
                          <div class="relative">
                            <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                            <Input
                              type="text"
                              placeholder="Enter your email"
                              class="pl-9 h-10 border-2 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 bg-white font-bold text-gray-900 text-sm"
                              :class="{ 'border-red-600': !meta.valid && meta.touched }"
                              v-bind="componentField"
                            />
                          </div>
                        </FormControl>
                        <FormMessage class="text-gray-900 text-[10px] mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-0.5" />
                      </FormItem>
                    </FormField>

                    <!-- Password -->
                    <FormField v-slot="{ componentField, meta }" name="password">
                      <FormItem>
                        <FormLabel class="text-xs font-black text-gray-900 uppercase tracking-wider mb-1.5 block">Password</FormLabel>
                        <FormControl>
                          <div class="relative">
                            <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                            <Input
                              :type="authStore.showPassword ? 'text' : 'password'"
                              placeholder="Enter your password"
                              class="pl-9 pr-9 h-10 border-2 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 bg-white font-bold text-gray-900 text-sm"
                              :class="{ 'border-red-600': !meta.valid && meta.touched }"
                              v-bind="componentField"
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
                        </FormControl>
                        <FormMessage class="text-gray-900 text-[10px] mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-0.5" />
                      </FormItem>
                    </FormField>

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
                        @click="authStore.forgotPassword"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <!-- Login Button -->
                    <Button
                      type="submit"
                      :disabled="authStore.isLoading"
                      class="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-blue-600"
                    >
                      <Zap v-if="!authStore.isLoading" class="w-4 h-4" />
                      <span v-if="!authStore.isLoading">Sign In</span>
                      <span v-else>Signing In...</span>
                      <ArrowRight v-if="!authStore.isLoading" class="w-4 h-4" />
                      <div v-else class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </Button>
                  </form>

                  <!-- Sign Up Form -->
                  <form v-else @submit="handleSignUp" class="space-y-3">
                    <!-- Name Row -->
                    <div class="grid grid-cols-2 gap-3">
                      <FormField v-slot="{ componentField, meta }" name="firstName">
                        <FormItem>
                          <FormLabel class="text-xs font-black text-gray-900 uppercase tracking-wider mb-1 block">First Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="First name"
                              class="h-9 border-2 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 bg-white font-bold text-gray-900 text-sm"
                              :class="{ 'border-red-600': !meta.valid && meta.touched }"
                              v-bind="componentField"
                            />
                          </FormControl>
                          <FormMessage class="text-gray-900 text-[10px] mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-0.5" />
                        </FormItem>
                      </FormField>

                      <FormField v-slot="{ componentField, meta }" name="lastName">
                        <FormItem>
                          <FormLabel class="text-xs font-black text-gray-900 uppercase tracking-wider mb-1 block">Last Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Last name"
                              class="h-9 border-2 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 bg-white font-bold text-gray-900 text-sm"
                              :class="{ 'border-red-600': !meta.valid && meta.touched }"
                              v-bind="componentField"
                            />
                          </FormControl>
                          <FormMessage class="text-gray-900 text-[10px] mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-0.5" />
                        </FormItem>
                      </FormField>
                    </div>

                    <!-- Email + Phone Row -->
                    <div class="grid grid-cols-2 gap-3">
                      <FormField v-slot="{ componentField, meta }" name="email">
                        <FormItem>
                          <FormLabel class="text-xs font-black text-gray-900 uppercase tracking-wider mb-1 block">Email Address</FormLabel>
                          <FormControl>
                            <div class="relative">
                              <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                              <Input
                                type="email"
                                placeholder="Email"
                                class="pl-9 h-9 border-2 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 bg-white font-bold text-gray-900 text-sm"
                                :class="{ 'border-red-600': !meta.valid && meta.touched }"
                                v-bind="componentField"
                              />
                            </div>
                          </FormControl>
                          <FormMessage class="text-gray-900 text-[10px] mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-0.5" />
                        </FormItem>
                      </FormField>

                      <FormField v-slot="{ componentField, meta }" name="phone">
                        <FormItem>
                          <FormLabel class="text-xs font-black text-gray-900 uppercase tracking-wider mb-1 block">Phone</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Phone number"
                              class="h-9 border-2 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 bg-white font-bold text-gray-900 text-sm"
                              :class="{ 'border-red-600': !meta.valid && meta.touched }"
                              v-bind="componentField"
                            />
                          </FormControl>
                          <FormMessage class="text-gray-900 text-[10px] mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-0.5" />
                        </FormItem>
                      </FormField>
                    </div>

                    <!-- Password Row -->
                    <div class="grid grid-cols-2 gap-3">
                      <FormField v-slot="{ componentField, meta }" name="password">
                        <FormItem>
                          <FormLabel class="text-xs font-black text-gray-900 uppercase tracking-wider mb-1 block">Password</FormLabel>
                          <FormControl>
                            <div class="relative">
                              <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                              <Input
                                :type="authStore.showPassword ? 'text' : 'password'"
                                placeholder="Password"
                                class="pl-9 pr-9 h-9 border-2 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 bg-white font-bold text-gray-900 text-sm"
                                :class="{ 'border-red-600': !meta.valid && meta.touched }"
                                v-bind="componentField"
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
                          </FormControl>
                          <FormMessage class="text-gray-900 text-[10px] mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-0.5" />
                        </FormItem>
                      </FormField>

                      <FormField v-slot="{ componentField, meta }" name="confirmPassword">
                        <FormItem>
                          <FormLabel class="text-xs font-black text-gray-900 uppercase tracking-wider mb-1 block">Confirm</FormLabel>
                          <FormControl>
                            <div class="relative">
                              <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                              <Input
                                :type="authStore.showPassword ? 'text' : 'password'"
                                placeholder="Confirm"
                                class="pl-9 h-9 border-2 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 bg-white font-bold text-gray-900 text-sm"
                                :class="{ 'border-red-600': !meta.valid && meta.touched }"
                                v-bind="componentField"
                              />
                            </div>
                          </FormControl>
                          <FormMessage class="text-gray-900 text-[10px] mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-0.5" />
                        </FormItem>
                      </FormField>
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
                    <Button
                      type="submit"
                      :disabled="authStore.isLoading"
                      class="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-blue-600"
                    >
                      <Zap v-if="!authStore.isLoading" class="w-4 h-4" />
                      <span v-if="!authStore.isLoading">Create Account</span>
                      <span v-else>Creating Account...</span>
                      <ArrowRight v-if="!authStore.isLoading" class="w-4 h-4" />
                      <div v-else class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </Button>
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
                      @click="isSignUp = !isSignUp"
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