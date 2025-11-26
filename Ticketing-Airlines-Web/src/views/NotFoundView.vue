<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Home, Search, ArrowLeft } from 'lucide-vue-next'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center relative overflow-hidden">
    <!-- Decorative Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #000 20px, #000 21px);"></div>
    </div>

    <!-- 404 Content -->
    <div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
      <!-- Large 404 -->
      <div class="relative mb-12">
        <!-- Shadow layers -->
        <div class="absolute top-4 left-4 w-full">
          <h1 class="text-[200px] md:text-[300px] font-black text-black opacity-10 leading-none">404</h1>
        </div>
        <div class="absolute top-2 left-2 w-full">
          <h1 class="text-[200px] md:text-[300px] font-black text-blue-600 opacity-20 leading-none">404</h1>
        </div>
        <!-- Main text -->
        <div class="relative">
          <h1 class="text-[200px] md:text-[300px] font-black text-gray-900 leading-none tracking-tighter">404</h1>
        </div>
      </div>

      <!-- Error Message Card -->
      <div class="bg-white border-8 border-gray-900 p-8 md:p-12 mb-8 relative">
        <!-- Corner accents -->
        <div class="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-t-blue-600 border-r-[40px] border-r-transparent"></div>
        <div class="absolute bottom-0 right-0 w-0 h-0 border-b-[40px] border-b-blue-600 border-l-[40px] border-l-transparent"></div>

        <div class="relative z-10">
          <!-- Icon -->
          <div class="mb-6 inline-block">
            <div class="w-24 h-24 bg-gray-900 flex items-center justify-center relative">
              <Search class="w-12 h-12 text-white" />
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 flex items-center justify-center">
                <span class="text-white font-black text-xs">!</span>
              </div>
            </div>
          </div>

          <!-- Message -->
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-4">
            Page Not Found
          </h2>
          <div class="h-2 w-32 bg-gray-900 mx-auto mb-6"></div>
          <p class="text-lg text-gray-600 font-bold mb-8 max-w-2xl mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Please check the URL or return to the homepage.
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              @click="goHome"
              class="h-16 px-8 bg-gray-900 text-white hover:bg-blue-600 text-lg font-black uppercase tracking-widest border-4 border-gray-900 hover:border-blue-600 transition-all group relative overflow-hidden"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <div class="flex items-center gap-3 relative z-10">
                <Home class="w-5 h-5" />
                <span>Go Home</span>
              </div>
            </Button>

            <Button 
              @click="goBack"
              variant="outline"
              class="h-16 px-8 border-4 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white text-lg font-black uppercase tracking-widest transition-all"
            >
              <div class="flex items-center gap-3">
                <ArrowLeft class="w-5 h-5" />
                <span>Go Back</span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <!-- Popular Links -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        <button 
          @click="router.push('/flights')"
          class="bg-white border-4 border-gray-900 p-4 hover:bg-gray-900 hover:text-white transition-all group"
        >
          <div class="text-xs font-black uppercase tracking-widest">Search Flights</div>
        </button>
        <button 
          @click="router.push('/manage-booking')"
          class="bg-white border-4 border-gray-900 p-4 hover:bg-gray-900 hover:text-white transition-all group"
        >
          <div class="text-xs font-black uppercase tracking-widest">Manage Booking</div>
        </button>
        <button 
          @click="router.push('/check-in')"
          class="bg-white border-4 border-gray-900 p-4 hover:bg-gray-900 hover:text-white transition-all group"
        >
          <div class="text-xs font-black uppercase tracking-widest">Check In</div>
        </button>
        <button 
          @click="router.push('/flight-status')"
          class="bg-white border-4 border-gray-900 p-4 hover:bg-gray-900 hover:text-white transition-all group"
        >
          <div class="text-xs font-black uppercase tracking-widest">Flight Status</div>
        </button>
      </div>
    </div>
  </div>
</template>
