<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Plane, Menu } from 'lucide-vue-next'
</script>

<template>
  <nav class="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <div class="flex items-center space-x-3">
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
          <Button class="bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow-lg">
            Sign In
          </Button>
        </div>
        <!-- Mobile menu button -->
        <div class="lg:hidden">
          <Button variant="ghost" size="icon">
            <Menu class="w-6 h-6 text-black" />
          </Button>
        </div>
      </div>
    </div>
  </nav>
</template>