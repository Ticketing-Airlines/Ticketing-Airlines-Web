<script setup lang="ts">
import { onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FormControl, FormItem, FormLabel, FormMessage, FormField } from '@/components/ui/form'
import { Plane, Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Users, Chrome, Facebook } from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import { useAuthStore } from '@/stores/authStore'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// Use Pinia store
const authStore = useAuthStore()

// Define validation schema
const formSchema = toTypedSchema(z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
}))

// Initialize form with vee-validate
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: authStore.email,
    password: authStore.password
  }
})

// Handle form submission
const handleSubmit = form.handleSubmit(async (values) => {
  // Update store values
  authStore.email = values.email
  authStore.password = values.password
  
  // Clear any previous errors
  authStore.clearErrors()
  authStore.clearMessages()
  
  await authStore.login()
})

// Load remembered email on component mount
onMounted(() => {
  authStore.loadRememberedEmail()
  // Update form values when remembered email is loaded
  if (authStore.email) {
    form.setFieldValue('email', authStore.email)
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-blue-900">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Login Section -->
    <section class="relative flex-1 overflow-auto bg-gradient-to-br from-black via-gray-900 to-blue-900 py-4 lg:py-8">
      <div class="absolute inset-0" style="background: rgba(0, 0, 0, 0.1);"></div>
      
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 -z-10 opacity-20">
        <svg width="404" height="784" fill="none" viewBox="0 0 404 784">
          <defs>
            <pattern id="login-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" class="text-blue-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="784" fill="url(#login-pattern)" />
        </svg>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-full py-8">
          <!-- Left Side - Welcome Content -->
          <div class="hidden lg:block text-center lg:text-left">
            <div class="inline-flex items-center rounded-full px-4 py-2 mb-6" style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px);">
              <Plane class="w-4 h-4 mr-2" style="color: white;" />
              <span class="font-semibold text-sm" style="color: white;">Welcome Back</span>
            </div>
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style="color: white;">
              Ready for Your Next
              <span class="block text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">Adventure?</span>
            </h1>
            <p class="text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto lg:mx-0 mb-8 font-medium" style="color: #d1d5db;">
              Sign in to your Ticketing Airlines account and discover amazing deals on flights to your favorite destinations.
            </p>
            
            <!-- Features -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto lg:mx-0">
              <div class="flex items-center gap-3">
                <div class="bg-white/10 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center">
                  <Shield class="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p class="text-white font-semibold text-sm">Secure Login</p>
                  <p class="text-gray-300 text-xs">Protected by encryption</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="bg-white/10 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center">
                  <Users class="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p class="text-white font-semibold text-sm">Member Benefits</p>
                  <p class="text-gray-300 text-xs">Exclusive deals & rewards</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side - Login Form -->
          <div class="flex justify-center">
            <Card class="w-full max-w-md bg-white border-0 shadow-2xl rounded-3xl overflow-hidden p-0 gap-0">
              <CardHeader class="bg-gradient-to-r from-black to-gray-800 text-white p-8">
                <div class="text-center">
                  <div class="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Plane class="w-8 h-8 text-white" />
                  </div>
                  <CardTitle class="text-2xl font-bold mb-2">Sign In</CardTitle>
                  <CardDescription class="text-gray-300">
                    Access your Ticketing Airlines account
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent class="p-6">
                <!-- Success/Error Messages -->
                 <div v-if="authStore.successMessage" class="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                   <p class="text-green-700 text-sm font-medium">{{ authStore.successMessage }}</p>
                 </div>
                 <div v-if="authStore.errorMessage" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                   <p class="text-red-700 text-sm font-medium">{{ authStore.errorMessage }}</p>
                 </div>

                 <form @submit="handleSubmit" class="space-y-4">
                  <!-- Email Field -->
                  <FormField v-slot="{ componentField, meta }" name="email">
                    <FormItem>
                      <FormLabel class="text-sm font-bold text-gray-700 uppercase tracking-wide">Email Address</FormLabel>
                      <FormControl>
                        <div class="relative">
                          <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            type="text"
                            placeholder="Enter your email"
                            class="pl-10 h-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black"
                            :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': !meta.valid && meta.touched }"
                            v-bind="componentField"
                          />
                        </div>
                      </FormControl>
                      <FormMessage class="text-red-500 text-sm mt-1" />
                    </FormItem>
                  </FormField>

                  <!-- Password Field -->
                  <FormField v-slot="{ componentField, meta }" name="password">
                    <FormItem>
                      <FormLabel class="text-sm font-bold text-gray-700 uppercase tracking-wide">Password</FormLabel>
                      <FormControl>
                        <div class="relative">
                          <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            :type="authStore.showPassword ? 'text' : 'password'"
                            placeholder="Enter your password"
                            class="pl-10 pr-10 h-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black"
                            :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': !meta.valid && meta.touched }"
                            v-bind="componentField"
                          />
                          <button
                            type="button"
                            @click="authStore.togglePasswordVisibility"
                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <Eye v-if="!authStore.showPassword" class="w-4 h-4" />
                            <EyeOff v-else class="w-4 h-4" />
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage class="text-red-500 text-sm mt-1" />
                    </FormItem>
                  </FormField>

                  <!-- Remember Me & Forgot Password -->
                  <div class="flex items-center justify-between">
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input
                        v-model="authStore.rememberMe"
                        type="checkbox"
                        class="w-4 h-4 text-black border-2 border-gray-300 rounded focus:ring-black focus:ring-2"
                      />
                      <span class="text-sm text-gray-600 font-medium">Remember me</span>
                    </label>
                    <button
                       type="button"
                       class="text-sm text-black hover:text-gray-700 font-semibold transition-colors"
                       @click="authStore.forgotPassword"
                     >
                       Forgot password?
                     </button>
                  </div>

                  <!-- Login Button -->
                  <Button
                    type="submit"
                    :disabled="authStore.isLoading"
                    class="w-full h-12 bg-black text-white rounded-xl font-bold text-base hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span v-if="!authStore.isLoading">Sign In</span>
                    <span v-else>Signing In...</span>
                    <ArrowRight v-if="!authStore.isLoading" class="w-4 h-4" />
                    <div v-else class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </Button>

                  <!-- Divider -->
                  <div class="relative my-6">
                    <div class="absolute inset-0 flex items-center">
                      <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                      <span class="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                    </div>
                  </div>

                  <!-- Social Login Buttons -->
                  <div class="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      @click="authStore.socialLogin('Google')"
                      class="h-12 border-2 border-gray-300 rounded-xl hover:border-black focus:ring-2 focus:ring-black transition-all duration-300"
                    >
                      <Chrome class="w-5 h-5 mr-2 text-blue-600" />
                      Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      @click="authStore.socialLogin('Facebook')"
                      class="h-12 border-2 border-gray-300 rounded-xl hover:border-black focus:ring-2 focus:ring-black transition-all duration-300"
                    >
                      <Facebook class="w-5 h-5 mr-2 text-blue-600" />
                      Facebook
                    </Button>
                  </div>

                  <!-- Sign Up Link -->
                  <div class="text-center pt-4">
                    <p class="text-sm text-gray-600">
                      Don't have an account?
                      <button
                         type="button"
                         class="text-black hover:text-gray-700 font-semibold transition-colors ml-1"
                         @click="authStore.signUp"
                       >
                         Sign up here
                       </button>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
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

/* Custom checkbox styling */
input[type="checkbox"]:checked {
  background-color: #000;
  border-color: #000;
}

input[type="checkbox"]:focus {
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
}
</style>