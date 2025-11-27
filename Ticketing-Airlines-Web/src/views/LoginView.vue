<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FormControl, FormItem, FormLabel, FormMessage, FormField } from '@/components/ui/form'
import { Plane, Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Users, Chrome, Facebook, Zap, CheckCircle, Globe } from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import { useAuthStore } from '@/stores/authStore'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// Local state for form toggle
const isSignUp = ref(false)

// Use Pinia store
const authStore = useAuthStore()

// Define validation schemas
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

// Initialize forms with vee-validate
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

// Handle login form submission
const handleSubmit = loginForm.handleSubmit(async (values) => {
  // Update store values
  authStore.email = values.email
  authStore.password = values.password
  
  // Clear any previous errors
  authStore.clearErrors()
  authStore.clearMessages()
  
  await authStore.login()
})

// Handle sign up form submission
const handleSignUp = signUpForm.handleSubmit(async (values) => {
  // Clear any previous errors
  authStore.clearErrors()
  authStore.clearMessages()
  
  // Update store values
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

// Load remembered email on component mount
onMounted(() => {
  authStore.loadRememberedEmail()
  // Update form values when remembered email is loaded
  if (authStore.email) {
    loginForm.setFieldValue('email', authStore.email)
  }
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10" style="background: repeating-linear-gradient(45deg, transparent, transparent 20px, #fff 20px, #fff 21px);"></div>
      
      <!-- Corner Accents -->
      <div class="absolute top-0 right-0 w-0 h-0 border-t-[200px] border-t-blue-600 border-l-[200px] border-l-transparent"></div>
      <div class="absolute bottom-0 left-0 w-0 h-0 border-b-[150px] border-b-green-600 border-r-[150px] border-r-transparent"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left Side - Hero Content -->
          <div class="text-center lg:text-left">
            <!-- Badge -->
            <div class="inline-flex items-center px-6 py-3 mb-8 bg-white/20 backdrop-blur-md border-4 border-white/30">
              <Plane class="w-5 h-5 mr-3 text-white" />
              <span class="font-black text-sm text-white uppercase tracking-widest">Welcome Back</span>
            </div>
            
            <!-- Main Title -->
            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight text-white uppercase tracking-tight">
              Ready for Your Next<br/>
              <span class="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">Adventure?</span>
            </h1>
            
            <!-- Subtitle -->
            <p class="text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto lg:mx-0 mb-12 font-bold text-white/90 leading-relaxed">
              Sign in to your Airlines Ticketing account and discover amazing deals on flights to your favorite destinations.
            </p>
            
            <!-- Features Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto lg:mx-0">
              <div class="bg-white/10 backdrop-blur-md p-6 border-4 border-white/20 hover:border-blue-400 transition-all duration-300 group cursor-pointer">
                <div class="flex items-center gap-4 mb-4">
                  <div class="w-12 h-12 bg-blue-600 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                    <Shield class="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 class="text-white font-black text-sm uppercase tracking-wider">Secure Login</h3>
                    <p class="text-white/70 text-xs font-bold">Protected by encryption</p>
                  </div>
                </div>
                <div class="h-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
              </div>
              
              <div class="bg-white/10 backdrop-blur-md p-6 border-4 border-white/20 hover:border-green-400 transition-all duration-300 group cursor-pointer">
                <div class="flex items-center gap-4 mb-4">
                  <div class="w-12 h-12 bg-green-600 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                    <Users class="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 class="text-white font-black text-sm uppercase tracking-wider">Member Benefits</h3>
                    <p class="text-white/70 text-xs font-bold">Exclusive deals & rewards</p>
                  </div>
                </div>
                <div class="h-1 bg-gradient-to-r from-green-600 to-transparent"></div>
              </div>
            </div>
          </div>

          <!-- Right Side - Auth Forms -->
          <div class="flex justify-center">
            <div class="w-full max-w-4xl">

              <!-- Forms Container -->
              <div class="relative">
                <!-- Shadow Block -->
                <div class="absolute top-4 left-4 w-full h-full bg-blue-600 -z-10"></div>
                
                <!-- Main Card -->
                <Card class="bg-white border-4 border-gray-900 shadow-2xl rounded-none overflow-hidden">
                  <!-- Header -->
                  <CardHeader class="bg-gray-900 text-white p-8 relative">
                    <!-- Corner Accent -->
                    <div class="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-t-blue-600 border-l-[60px] border-l-transparent"></div>
                    
                    <div class="text-center relative z-10">
                    <!-- Logo -->
                    <div class="relative mx-auto mb-6 w-20 h-20">
                      <div class="w-20 h-20 bg-white flex items-center justify-center">
                        <Plane class="w-10 h-10 text-gray-900" />
                      </div>
                      <div class="absolute top-2 left-2 w-20 h-20 bg-blue-600 -z-10"></div>
                    </div>
                      
                      <CardTitle class="text-3xl font-black mb-3 uppercase tracking-tight">
                        {{ isSignUp ? 'Create Account' : 'Sign In' }}
                      </CardTitle>
                      <CardDescription class="text-gray-300 font-bold text-sm uppercase tracking-wider">
                        {{ isSignUp ? 'Join Airlines Ticketing' : 'Access Your Account' }}
                  </CardDescription>
                </div>
              </CardHeader>
              
                  <CardContent class="p-8">
                <!-- Success/Error Messages -->
                    <div v-if="authStore.successMessage" class="mb-6 p-4 bg-green-50 border-4 border-green-200 rounded-none">
                      <div class="flex items-center gap-3">
                        <CheckCircle class="w-5 h-5 text-green-600" />
                        <p class="text-green-700 text-sm font-black uppercase tracking-wide">{{ authStore.successMessage }}</p>
                      </div>
                    </div>
                    <div v-if="authStore.errorMessage" class="mb-6 p-4 bg-red-50 border-4 border-red-200 rounded-none">
                      <div class="flex items-center gap-3">
                        <Shield class="w-5 h-5 text-red-600" />
                        <p class="text-red-700 text-sm font-black uppercase tracking-wide">{{ authStore.errorMessage }}</p>
                 </div>
                 </div>

                    <!-- Sign In Form -->
                    <form v-if="!isSignUp" @submit="handleSubmit" class="space-y-6">
                      <!-- Horizontal Form Layout -->
                      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <!-- Email Field -->
                  <FormField v-slot="{ componentField, meta }" name="email">
                    <FormItem>
                            <FormLabel class="text-sm font-black text-gray-900 uppercase tracking-wider mb-3 block">Email Address</FormLabel>
                      <FormControl>
                        <div class="relative">
                                <Mail class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                          <Input
                            type="text"
                            placeholder="Enter your email"
                                  class="pl-12 h-14 border-4 border-gray-900 rounded-none focus:ring-0 bg-white font-bold text-gray-900"
                                  :class="{ 'border-red-600': !meta.valid && meta.touched }"
                            v-bind="componentField"
                          />
                        </div>
                      </FormControl>
                            <FormMessage class="text-gray-900 text-xs mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-1" />
                    </FormItem>
                  </FormField>

                  <!-- Password Field -->
                  <FormField v-slot="{ componentField, meta }" name="password">
                    <FormItem>
                            <FormLabel class="text-sm font-black text-gray-900 uppercase tracking-wider mb-3 block">Password</FormLabel>
                      <FormControl>
                        <div class="relative">
                                <Lock class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                          <Input
                            :type="authStore.showPassword ? 'text' : 'password'"
                            placeholder="Enter your password"
                                  class="pl-12 pr-12 h-14 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 bg-white font-bold text-gray-900"
                                  :class="{ 'border-red-600': !meta.valid && meta.touched }"
                            v-bind="componentField"
                          />
                                <button
                                  type="button"
                                  @click="authStore.togglePasswordVisibility"
                                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                                >
                                  <Eye v-if="!authStore.showPassword" class="w-5 h-5" />
                                  <EyeOff v-else class="w-5 h-5" />
                          </button>
                        </div>
                      </FormControl>
                            <FormMessage class="text-gray-900 text-xs mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-1" />
                    </FormItem>
                  </FormField>
                      </div>

                  <!-- Remember Me & Forgot Password -->
                  <div class="flex items-center justify-between">
                        <label class="flex items-center gap-3 cursor-pointer">
                          <input
                            v-model="authStore.rememberMe"
                            type="checkbox"
                            class="w-5 h-5 text-blue-600 border-4 border-gray-900 rounded-none focus:ring-0"
                          />
                          <span class="text-sm text-gray-900 font-black uppercase tracking-wide">Remember me</span>
                        </label>
                    <button
                       type="button"
                          class="text-sm text-gray-900 font-black uppercase tracking-wide"
                       @click="authStore.forgotPassword"
                     >
                       Forgot password?
                     </button>
                  </div>

                  <!-- Login Button -->
                  <Button
                    type="submit"
                    :disabled="authStore.isLoading"
                        class="w-full h-16 bg-gray-900 text-white rounded-none font-black text-lg uppercase tracking-wider flex items-center justify-center gap-3 border-4 border-gray-900"
                  >
                        <Zap v-if="!authStore.isLoading" class="w-5 h-5" />
                    <span v-if="!authStore.isLoading">Sign In</span>
                    <span v-else>Signing In...</span>
                        <ArrowRight v-if="!authStore.isLoading" class="w-5 h-5" />
                        <div v-else class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </Button>

                  <!-- Divider -->
                      <div class="relative my-8">
                    <div class="absolute inset-0 flex items-center">
                          <div class="w-full border-t-4 border-gray-900"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                          <span class="px-6 bg-white text-gray-900 font-black uppercase tracking-wider">Or continue with</span>
                    </div>
                  </div>

                  <!-- Social Login Buttons -->
                      <div class="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      @click="authStore.socialLogin('Google')"
                          class="h-14 border-4 border-gray-900 rounded-none focus:ring-0 font-black uppercase tracking-wide"
                    >
                          <Chrome class="w-5 h-5 mr-2" />
                      Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      @click="authStore.socialLogin('Facebook')"
                          class="h-14 border-4 border-gray-900 rounded-none hover:border-green-600 hover:bg-green-600 hover:text-white focus:ring-0 transition-all duration-300 font-black uppercase tracking-wide"
                    >
                          <Facebook class="w-5 h-5 mr-2" />
                      Facebook
                        </Button>
                      </div>

                      <!-- Sign Up Link -->
                      <div class="text-center pt-6 border-t-4 border-gray-900">
                        <p class="text-sm text-gray-900 font-bold">
                          Don't have an account?
                          <button
                            type="button"
                            class="text-blue-600 font-black uppercase tracking-wide ml-2"
                            @click="isSignUp = true"
                          >
                            Sign Up
                          </button>
                        </p>
                      </div>
                    </form>

                    <!-- Sign Up Form -->
                    <form v-else @submit="handleSignUp" class="space-y-6">
                      <!-- Horizontal Form Layout -->
                      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- First Name Field -->
                        <FormField v-slot="{ componentField, meta }" name="firstName">
                          <FormItem>
                            <FormLabel class="text-sm font-black text-gray-900 uppercase tracking-wider mb-3 block">First Name</FormLabel>
                            <FormControl>
                              <div class="relative">
                                <Users class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                                <Input
                                  type="text"
                                  placeholder="Enter your first name"
                                  class="pl-12 h-14 border-4 border-gray-900 rounded-none focus:ring-0 bg-white font-bold text-gray-900"
                                  :class="{ 'border-red-600': !meta.valid && meta.touched }"
                                  v-bind="componentField"
                                />
                              </div>
                            </FormControl>
                            <FormMessage class="text-gray-900 text-xs mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-1" />
                          </FormItem>
                        </FormField>

                        <!-- Last Name Field -->
                        <FormField v-slot="{ componentField, meta }" name="lastName">
                          <FormItem>
                            <FormLabel class="text-sm font-black text-gray-900 uppercase tracking-wider mb-3 block">Last Name</FormLabel>
                            <FormControl>
                              <div class="relative">
                                <Users class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                                <Input
                                  type="text"
                                  placeholder="Enter your last name"
                                  class="pl-12 h-14 border-4 border-gray-900 rounded-none focus:ring-0 bg-white font-bold text-gray-900"
                                  :class="{ 'border-red-600': !meta.valid && meta.touched }"
                                  v-bind="componentField"
                                />
                              </div>
                            </FormControl>
                            <FormMessage class="text-gray-900 text-xs mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-1" />
                          </FormItem>
                        </FormField>

                        <!-- Email Field -->
                        <FormField v-slot="{ componentField, meta }" name="email">
                          <FormItem>
                            <FormLabel class="text-sm font-black text-gray-900 uppercase tracking-wider mb-3 block">Email Address</FormLabel>
                            <FormControl>
                              <div class="relative">
                                <Mail class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                                <Input
                                  type="email"
                                  placeholder="Enter your email"
                                  class="pl-12 h-14 border-4 border-gray-900 rounded-none focus:ring-0 bg-white font-bold text-gray-900"
                                  :class="{ 'border-red-600': !meta.valid && meta.touched }"
                                  v-bind="componentField"
                                />
                              </div>
                            </FormControl>
                            <FormMessage class="text-gray-900 text-xs mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-1" />
                          </FormItem>
                        </FormField>

                        <!-- Phone Field -->
                        <FormField v-slot="{ componentField, meta }" name="phone">
                          <FormItem>
                            <FormLabel class="text-sm font-black text-gray-900 uppercase tracking-wider mb-3 block">Phone Number</FormLabel>
                            <FormControl>
                              <div class="relative">
                                <Globe class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                                <Input
                                  type="tel"
                                  placeholder="Enter your phone number"
                                  class="pl-12 h-14 border-4 border-gray-900 rounded-none focus:ring-0 bg-white font-bold text-gray-900"
                                  :class="{ 'border-red-600': !meta.valid && meta.touched }"
                                  v-bind="componentField"
                                />
                              </div>
                            </FormControl>
                            <FormMessage class="text-gray-900 text-xs mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-1" />
                          </FormItem>
                        </FormField>

                        <!-- Password Field -->
                        <FormField v-slot="{ componentField, meta }" name="password">
                          <FormItem>
                            <FormLabel class="text-sm font-black text-gray-900 uppercase tracking-wider mb-3 block">Password</FormLabel>
                            <FormControl>
                              <div class="relative">
                                <Lock class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                                <Input
                                  :type="authStore.showPassword ? 'text' : 'password'"
                                  placeholder="Create a password"
                                  class="pl-12 pr-12 h-14 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 bg-white font-bold text-gray-900"
                                  :class="{ 'border-red-600': !meta.valid && meta.touched }"
                                  v-bind="componentField"
                                />
                                <button
                                  type="button"
                                  @click="authStore.togglePasswordVisibility"
                                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                                >
                                  <Eye v-if="!authStore.showPassword" class="w-5 h-5" />
                                  <EyeOff v-else class="w-5 h-5" />
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage class="text-gray-900 text-xs mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-1" />
                          </FormItem>
                        </FormField>

                        <!-- Confirm Password Field -->
                        <FormField v-slot="{ componentField, meta }" name="confirmPassword">
                          <FormItem>
                            <FormLabel class="text-sm font-black text-gray-900 uppercase tracking-wider mb-3 block">Confirm Password</FormLabel>
                            <FormControl>
                              <div class="relative">
                                <Lock class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                                <Input
                                  :type="authStore.showPassword ? 'text' : 'password'"
                                  placeholder="Confirm your password"
                                  class="pl-12 h-14 border-4 border-gray-900 rounded-none focus:ring-0 bg-white font-bold text-gray-900"
                                  :class="{ 'border-red-600': !meta.valid && meta.touched }"
                                  v-bind="componentField"
                                />
                              </div>
                            </FormControl>
                            <FormMessage class="text-gray-900 text-xs mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-1" />
                          </FormItem>
                        </FormField>
                      </div>

                      <!-- Terms & Conditions -->
                      <div class="flex items-start gap-3">
                        <input
                          type="checkbox"
                          class="w-5 h-5 text-blue-600 border-4 border-gray-900 rounded-none focus:ring-0 focus:ring-blue-600 mt-1"
                        />
                        <p class="text-sm text-gray-900 font-bold">
                          I agree to the 
                          <button type="button" class="text-blue-600 font-black uppercase tracking-wide">
                            Terms & Conditions
                          </button>
                          and 
                          <button type="button" class="text-blue-600 font-black uppercase tracking-wide">
                            Privacy Policy
                          </button>
                    </p>
                  </div>

                      <!-- Sign Up Button -->
                      <Button
                        type="submit"
                        :disabled="authStore.isLoading"
                        class="w-full h-16 bg-gray-900 text-white rounded-none font-black text-lg uppercase tracking-wider flex items-center justify-center gap-3 border-4 border-gray-900"
                      >
                        <Zap v-if="!authStore.isLoading" class="w-5 h-5" />
                        <span v-if="!authStore.isLoading">Create Account</span>
                        <span v-else>Creating Account...</span>
                        <ArrowRight v-if="!authStore.isLoading" class="w-5 h-5" />
                        <div v-else class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </Button>

                      <!-- Divider -->
                      <div class="relative my-8">
                        <div class="absolute inset-0 flex items-center">
                          <div class="w-full border-t-4 border-gray-900"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                          <span class="px-6 bg-white text-gray-900 font-black uppercase tracking-wider">Or continue with</span>
                        </div>
                      </div>

                      <!-- Social Sign Up Buttons -->
                      <div class="grid grid-cols-2 gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          @click="authStore.socialLogin('Google')"
                          class="h-14 border-4 border-gray-900 rounded-none focus:ring-0 font-black uppercase tracking-wide"
                        >
                          <Chrome class="w-5 h-5 mr-2" />
                          Google
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          @click="authStore.socialLogin('Facebook')"
                          class="h-14 border-4 border-gray-900 rounded-none hover:border-green-600 hover:bg-green-600 hover:text-white focus:ring-0 transition-all duration-300 font-black uppercase tracking-wide"
                        >
                          <Facebook class="w-5 h-5 mr-2" />
                          Facebook
                        </Button>
                      </div>

                      <!-- Sign In Link -->
                      <div class="text-center pt-6 border-t-4 border-gray-900">
                        <p class="text-sm text-gray-900 font-bold">
                          Already have an account?
                          <button
                            type="button"
                            class="text-blue-600 font-black uppercase tracking-wide ml-2"
                            @click="isSignUp = false"
                          >
                            Sign In
                          </button>
                        </p>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Section -->
    <section class="bg-gray-100 py-16 border-t-4 border-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Trusted by Millions</h2>
          <div class="h-1 w-24 bg-blue-600 mx-auto"></div>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div class="text-center p-6 bg-white border-4 border-gray-900 hover:border-blue-600 transition-all duration-300 group cursor-pointer">
            <div class="w-16 h-16 bg-blue-600 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
              <Globe class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">Global Reach</h3>
            <p class="text-gray-600 font-bold text-sm">Connecting destinations worldwide</p>
          </div>
          
          <div class="text-center p-6 bg-white border-4 border-gray-900 hover:border-green-600 transition-all duration-300 group cursor-pointer">
            <div class="w-16 h-16 bg-green-600 mx-auto mb-4 flex items-center justify-center group-hover:bg-green-500 transition-colors">
              <Shield class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">Safe & Secure</h3>
            <p class="text-gray-600 font-bold text-sm">Your data is protected</p>
          </div>
          
          <div class="text-center p-6 bg-white border-4 border-gray-900 hover:border-purple-600 transition-all duration-300 group cursor-pointer">
            <div class="w-16 h-16 bg-purple-600 mx-auto mb-4 flex items-center justify-center group-hover:bg-purple-500 transition-colors">
              <Users class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">24/7 Support</h3>
            <p class="text-gray-600 font-bold text-sm">Always here to help</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Custom animations */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Brutalist checkbox styling */
input[type="checkbox"] {
  appearance: none;
  background-color: white;
  border: 4px solid #1f2937;
  width: 20px;
  height: 20px;
  position: relative;
}

input[type="checkbox"]:checked {
  background-color: #2563eb;
  border-color: #2563eb;
}

input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  left: 2px;
  top: -2px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

input[type="checkbox"]:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2);
}

/* Brutalist input focus */
input:focus {
  outline: none;
  box-shadow: none;
}

/* Custom scrollbar */
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