<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { ShieldAlert, Home, LogOut } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const router = useRouter()
const authStore = useAuthStore()

const goHome = () => {
  router.push('/')
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <Card class="w-full max-w-md">
      <CardContent class="p-8">
        <div class="text-center">
          <div class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <ShieldAlert class="w-8 h-8 text-red-600" />
          </div>

          <h1 class="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>

          <p class="text-gray-600 mb-6">
            You don't have permission to access this page. This area is restricted to administrators only.
          </p>

          <div class="space-y-3">
            <Button @click="goHome" variant="outline" class="w-full flex items-center justify-center space-x-2">
              <Home class="w-4 h-4" />
              <span>Go to Home</span>
            </Button>

            <Button @click="handleLogout" class="w-full flex items-center justify-center space-x-2">
              <LogOut class="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-200">
            <p class="text-sm text-gray-500">
              If you believe this is an error, please contact your system administrator.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
