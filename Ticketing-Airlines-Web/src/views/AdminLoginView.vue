<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FormControl, FormItem, FormLabel, FormMessage, FormField } from '@/components/ui/form'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield, AlertCircle } from 'lucide-vue-next'
import { useAdminStore } from '@/stores/adminStore'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const router = useRouter()
const adminStore = useAdminStore()

const showPassword = ref(false)

// Define validation schema
const loginSchema = toTypedSchema(z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
}))

// Initialize form with vee-validate
const form = useForm({
  validationSchema: loginSchema,
  initialValues: {
    email: '',
    password: ''
  }
})

// Handle login form submission
const handleSubmit = form.handleSubmit(async (values) => {
  const success = await adminStore.adminLogin(values.email, values.password)
  
  if (success) {
    router.push('/admin')
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10" style="background: repeating-linear-gradient(45deg, transparent, transparent 20px, #fff 20px, #fff 21px);"></div>
    
    <!-- Corner Accents -->
    <div class="absolute top-0 right-0 w-0 h-0 border-t-[300px] border-t-red-600 border-l-[300px] border-l-transparent"></div>
    <div class="absolute bottom-0 left-0 w-0 h-0 border-b-[250px] border-b-orange-600 border-r-[250px] border-r-transparent"></div>

    <!-- Login Card -->
    <div class="w-full max-w-md relative z-10">
      <!-- Shadow Block -->
      <div class="absolute top-4 left-4 w-full h-full bg-red-600 -z-10"></div>
      
      <!-- Main Card -->
      <Card class="bg-white border-4 border-gray-900 shadow-2xl rounded-none overflow-hidden">
        <!-- Header -->
        <CardHeader class="bg-gray-900 text-white p-8 relative">
          <!-- Corner Accent -->
          <div class="absolute top-0 right-0 w-0 h-0 border-t-[80px] border-t-red-600 border-l-[80px] border-l-transparent"></div>
          
          <div class="text-center relative z-10">
            <!-- Logo -->
            <div class="relative mx-auto mb-6 w-24 h-24">
              <div class="w-24 h-24 bg-white flex items-center justify-center">
                <Shield class="w-12 h-12 text-gray-900" />
              </div>
              <div class="absolute top-2 left-2 w-24 h-24 bg-red-600 -z-10"></div>
            </div>
            
            <CardTitle class="text-4xl font-black mb-3 uppercase tracking-tight">
              Admin Access
            </CardTitle>
            <CardDescription class="text-gray-300 font-bold text-sm uppercase tracking-wider">
              Authorized Personnel Only
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent class="p-8">
          <!-- Security Warning -->
          <div class="mb-6 p-4 bg-red-50 border-4 border-red-200 rounded-none">
            <div class="flex items-start gap-3">
              <AlertCircle class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p class="text-red-700 text-xs font-black uppercase tracking-wide mb-1">Security Notice</p>
                <p class="text-red-600 text-xs font-bold">This area is restricted to authorized administrators only. All access attempts are logged.</p>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="adminStore.errorMessage" class="mb-6 p-4 bg-red-50 border-4 border-red-200 rounded-none">
            <div class="flex items-center gap-3">
              <Shield class="w-5 h-5 text-red-600" />
              <p class="text-red-700 text-sm font-black uppercase tracking-wide">{{ adminStore.errorMessage }}</p>
            </div>
          </div>

          <!-- Login Form -->
          <form @submit="handleSubmit" class="space-y-6">
            <!-- Email Field -->
            <FormField v-slot="{ componentField, meta }" name="email">
              <FormItem>
                <FormLabel class="text-sm font-black text-gray-900 uppercase tracking-wider mb-3 block">Admin Email</FormLabel>
                <FormControl>
                  <div class="relative">
                    <Mail class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                    <Input
                      type="email"
                      placeholder="Enter admin email"
                      class="pl-12 h-14 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-red-600 bg-white font-bold text-gray-900"
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
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="Enter password"
                      class="pl-12 pr-12 h-14 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-red-600 bg-white font-bold text-gray-900"
                      :class="{ 'border-red-600': !meta.valid && meta.touched }"
                      v-bind="componentField"
                    />
                    <button
                      type="button"
                      @click="showPassword = !showPassword"
                      class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                    >
                      <Eye v-if="!showPassword" class="w-5 h-5" />
                      <EyeOff v-else class="w-5 h-5" />
                    </button>
                  </div>
                </FormControl>
                <FormMessage class="text-gray-900 text-xs mt-1 font-black uppercase tracking-wider bg-red-100 border-2 border-red-600 px-2 py-1" />
              </FormItem>
            </FormField>

            <!-- Login Button -->
            <Button
              type="submit"
              :disabled="adminStore.isLoading"
              class="w-full h-16 bg-red-600 hover:bg-red-700 text-white rounded-none font-black text-lg uppercase tracking-wider flex items-center justify-center gap-3 border-4 border-gray-900"
            >
              <Shield v-if="!adminStore.isLoading" class="w-5 h-5" />
              <span v-if="!adminStore.isLoading">Admin Sign In</span>
              <span v-else>Authenticating...</span>
              <ArrowRight v-if="!adminStore.isLoading" class="w-5 h-5" />
              <div v-else class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </Button>
          </form>

          <!-- Back to Home -->
          <div class="text-center pt-6 border-t-4 border-gray-900 mt-6">
            <button
              type="button"
              class="text-sm text-gray-600 hover:text-gray-900 font-bold transition-colors"
              @click="router.push('/')"
            >
              ← Back to Homepage
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
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
</style>
