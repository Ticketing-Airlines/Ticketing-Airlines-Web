<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
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
  <nav class="bg-transparent border-b border-gray-200/20 top-0 z-50 backdrop-blur-sm fixed w-full">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <div class="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity" @click="handleLogoClick">
          <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Plane class="w-7 h-7 text-black" />
          </div>
          <div>
            <span class="text-2xl font-bold text-white">Airlines Ticketing</span>
            <p class="text-xs text-white/80 font-medium">Your Journey Begins Here</p>
          </div>
        </div>
        <div class="hidden lg:flex items-center space-x-4">
          <NavigationMenu :viewport="false">
            <NavigationMenuList class="flex space-x-4">
              <!-- Book Menu -->
              <NavigationMenuItem>
                <NavigationMenuTrigger class="text-white hover:text-white/80 bg-transparent hover:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white focus:bg-white/10 focus:text-white data-[state=open]:hover:bg-white/10 data-[state=open]:hover:text-white" style="color: white !important; background-color: transparent !important;">
                  Book
                </NavigationMenuTrigger>
                <NavigationMenuContent class="absolute top-full left-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-md p-4 min-w-[200px] z-50">
                  <div class="grid gap-2">
                    <NavigationMenuLink href="#" class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      Flights
                    </NavigationMenuLink>
                    <NavigationMenuLink href="#" class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      Seat Sale
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <!-- Manage Menu -->
              <NavigationMenuItem>
                <NavigationMenuTrigger class="text-white hover:text-white/80 bg-transparent hover:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white focus:bg-white/10 focus:text-white data-[state=open]:hover:bg-white/10 data-[state=open]:hover:text-white" style="color: white !important; background-color: transparent !important;">
                  Manage
                </NavigationMenuTrigger>
                <NavigationMenuContent class="bg-white border border-gray-200 shadow-lg rounded-md p-4 min-w-[200px]">
                  <div class="grid gap-2">
                    <NavigationMenuLink href="#" class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      Check in
                    </NavigationMenuLink>
                    <NavigationMenuLink href="#" class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      Manage Booking
                    </NavigationMenuLink>
                    <NavigationMenuLink href="#" class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      Flight Status
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <!-- Travel Info Menu -->
              <NavigationMenuItem>
                <NavigationMenuTrigger class="text-white hover:text-white/80 bg-transparent hover:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white focus:bg-white/10 focus:text-white data-[state=open]:hover:bg-white/10 data-[state=open]:hover:text-white" style="color: white !important; background-color: transparent !important;">
                  Travel Info
                </NavigationMenuTrigger>
                <NavigationMenuContent class="bg-white border border-gray-200 shadow-lg rounded-md p-4 min-w-[220px]">
                  <div class="grid gap-2">
                    <NavigationMenuLink href="#" class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      Baggage Information
                    </NavigationMenuLink>
                    <NavigationMenuLink href="#" class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      Payment Options
                    </NavigationMenuLink>
                    <NavigationMenuLink href="#" class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      Travel Advisories
                    </NavigationMenuLink>
                    <NavigationMenuLink href="#" class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      Travel Documents
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <!-- Explore Menu -->
              <NavigationMenuItem>
                <NavigationMenuTrigger class="text-white hover:text-white/80 bg-transparent hover:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white focus:bg-white/10 focus:text-white data-[state=open]:hover:bg-white/10 data-[state=open]:hover:text-white" style="color: white !important; background-color: transparent !important;">
                  Explore
                </NavigationMenuTrigger>
                <NavigationMenuContent class="bg-white border border-gray-200 shadow-lg rounded-md p-4 min-w-[220px]">
                  <div class="grid gap-2">
                    <NavigationMenuLink href="#" class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      Philippine Destinations
                    </NavigationMenuLink>
                    <NavigationMenuLink href="#" class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      International Destinations
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button
            @click="handleSignIn"
            class="bg-white text-black hover:bg-white/80 font-semibold shadow-lg ml-4"
          >
            Sign In
          </Button>
        </div>
        <!-- Mobile menu button -->
        <div class="lg:hidden">
          <Button variant="ghost" size="icon" @click="toggleMobileMenu" class="text-white border-white/20">
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6 text-white" />
            <X v-else class="w-6 h-6 text-white" />
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
        <div class="px-4 py-6 space-y-6">
          <!-- Book Section -->
          <div>
            <h3 class="font-semibold text-gray-900 mb-2">Book</h3>
            <div class="pl-4 space-y-2">
              <a href="#" @click="closeMobileMenu" class="block text-gray-600 hover:text-black transition-colors py-1">Flights</a>
              <a href="#" @click="closeMobileMenu" class="block text-gray-600 hover:text-black transition-colors py-1">Seat Sale</a>
            </div>
          </div>

          <!-- Manage Section -->
          <div>
            <h3 class="font-semibold text-gray-900 mb-2">Manage</h3>
            <div class="pl-4 space-y-2">
              <a href="#" @click="closeMobileMenu" class="block text-gray-600 hover:text-black transition-colors py-1">Check in</a>
              <a href="#" @click="closeMobileMenu" class="block text-gray-600 hover:text-black transition-colors py-1">Manage Booking</a>
              <a href="#" @click="closeMobileMenu" class="block text-gray-600 hover:text-black transition-colors py-1">Flight Status</a>
            </div>
          </div>

          <!-- Travel Info Section -->
          <div>
            <h3 class="font-semibold text-gray-900 mb-2">Travel Info</h3>
            <div class="pl-4 space-y-2">
              <a href="#" @click="closeMobileMenu" class="block text-gray-600 hover:text-black transition-colors py-1">Baggage Information</a>
              <a href="#" @click="closeMobileMenu" class="block text-gray-600 hover:text-black transition-colors py-1">Payment Options</a>
              <a href="#" @click="closeMobileMenu" class="block text-gray-600 hover:text-black transition-colors py-1">Travel Advisories</a>
              <a href="#" @click="closeMobileMenu" class="block text-gray-600 hover:text-black transition-colors py-1">Travel Documents</a>
            </div>
          </div>

          <!-- Explore Section -->
          <div>
            <h3 class="font-semibold text-gray-900 mb-2">Explore</h3>
            <div class="pl-4 space-y-2">
              <a href="#" @click="closeMobileMenu" class="block text-gray-600 hover:text-black transition-colors py-1">Philippine Destinations</a>
              <a href="#" @click="closeMobileMenu" class="block text-gray-600 hover:text-black transition-colors py-1">International Destinations</a>
            </div>
          </div>

          <Button
            @click="handleSignIn"
            class="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow-lg mt-6"
          >
            Sign In
          </Button>
        </div>
      </div>
    </Transition>
  </nav>
</template>
