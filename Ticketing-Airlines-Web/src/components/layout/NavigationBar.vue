<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Plane, Menu, X } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMobileMenuOpen = ref(false)

const handleSignIn = () => {
  router.push('/login')
  isMobileMenuOpen.value = false
}

const handleLogoClick = () => {
  router.push('/')
  isMobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <nav class="bg-white border-b border-gray-200 top-0 z-50 backdrop-blur-sm shadow-sm relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <div class="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity" @click="handleLogoClick">
          <div class="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg">
            <Plane class="w-7 h-7 text-white" />
          </div>
          <div>
            <span class="text-2xl font-bold text-black">Airlines Ticketing</span>
            <p class="text-xs text-gray-600 font-medium">Your Journey Begins Here</p>
          </div>
        </div>
        <div class="hidden lg:flex items-center space-x-8">
          <a href="#" class="text-gray-600 hover:text-black transition-colors font-medium">Book Flight</a>
          <a href="#" class="text-gray-600 hover:text-black transition-colors font-medium">Manage Booking</a>
          <a href="#" class="text-gray-600 hover:text-black transition-colors font-medium">Check-in</a>
          <a href="#" class="text-gray-600 hover:text-black transition-colors font-medium">Flight Status</a>
          <Button 
            @click="handleSignIn"
            class="bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow-lg"
          >
            Sign In
          </Button>
        </div>
        <!-- Mobile menu button -->
        <div class="lg:hidden">
          <Button variant="ghost" size="icon" @click="toggleMobileMenu">
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6 text-black" />
            <X v-else class="w-6 h-6 text-black" />
          </Button>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu overlay -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 transform -translate-y-4"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-4"
    >
      <div v-if="isMobileMenuOpen" class="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div class="px-4 py-6 space-y-4">
          <a href="#" @click="closeMobileMenu" class="block text-gray-600 hover:text-black transition-colors font-medium py-2">Book Flight</a>
          <a href="#" @click="closeMobileMenu" class="block text-gray-600 hover:text-black transition-colors font-medium py-2">Manage Booking</a>
          <a href="#" @click="closeMobileMenu" class="block text-gray-600 hover:text-black transition-colors font-medium py-2">Check-in</a>
          <a href="#" @click="closeMobileMenu" class="block text-gray-600 hover:text-black transition-colors font-medium py-2">Flight Status</a>
          <Button 
            @click="handleSignIn"
            class="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow-lg mt-4"
          >
            Sign In
          </Button>
        </div>
      </div>
    </Transition>
  </nav>
</template>