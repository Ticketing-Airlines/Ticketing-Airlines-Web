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
import { Plane, Menu, X, ArrowRight, Zap } from 'lucide-vue-next'
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
  <nav class="fixed top-0 left-0 right-0 z-50">
    <!-- Main Navigation Bar -->
    <div class="bg-white/95 backdrop-blur-md border-b-4 border-gray-900 shadow-2xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <!-- Logo Section -->
          <div class="flex items-center space-x-3 cursor-pointer group" @click="handleLogoClick">
            <!-- Logo Icon with Brutalist Design -->
            <div class="relative">
              <div class="w-12 h-12 bg-gray-900 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                <Plane class="w-6 h-6 text-white" />
              </div>
              <!-- Shadow Block -->
              <div class="absolute top-1 left-1 w-12 h-12 bg-blue-600 -z-10 group-hover:top-2 group-hover:left-2 transition-all duration-300"></div>
            </div>
            
            <!-- Brand Text -->
            <div class="hidden sm:block">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xl font-black text-gray-900 uppercase tracking-tight">AIRLINES</span>
                <div class="w-1.5 h-1.5 bg-blue-600"></div>
              </div>
              <div class="flex items-center gap-2">
                <div class="h-0.5 w-6 bg-gray-900"></div>
                <span class="text-xs font-bold text-gray-600 uppercase tracking-widest">TICKETING</span>
              </div>
            </div>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center space-x-2">
            <NavigationMenu :viewport="false">
              <NavigationMenuList class="flex space-x-2">
                <!-- Book Menu -->
                <NavigationMenuItem>
                  <NavigationMenuTrigger class="h-12 px-6 font-black text-sm uppercase tracking-wider bg-gray-900 text-white hover:bg-blue-600 data-[state=open]:bg-blue-600 border-0 rounded-none transition-all duration-300">
                    Book
                  </NavigationMenuTrigger>
                  <NavigationMenuContent class="bg-white border-4 border-gray-900 shadow-2xl rounded-none p-6 min-w-[280px] z-50">
                    <div class="space-y-3">
                      <NavigationMenuLink as-child>
                        <router-link to="/flights" class="block px-4 py-3 text-gray-900 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-blue-600">
                          <div class="flex items-center justify-between">
                            <span>Flights</span>
                            <ArrowRight class="w-4 h-4" />
                          </div>
                        </router-link>
                      </NavigationMenuLink>
                      <NavigationMenuLink as-child>
                        <router-link to="/seat-sale" class="block px-4 py-3 text-gray-900 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-blue-600">
                          <div class="flex items-center justify-between">
                            <span>Seat Sale</span>
                            <ArrowRight class="w-4 h-4" />
                          </div>
                        </router-link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <!-- Manage Menu -->
                <NavigationMenuItem>
                  <NavigationMenuTrigger class="h-12 px-6 font-black text-sm uppercase tracking-wider bg-gray-900 text-white hover:bg-green-600 data-[state=open]:bg-green-600 border-0 rounded-none transition-all duration-300">
                    Manage
                  </NavigationMenuTrigger>
                  <NavigationMenuContent class="bg-white border-4 border-gray-900 shadow-2xl rounded-none p-6 min-w-[280px] z-50">
                    <div class="space-y-3">
                      <NavigationMenuLink as-child>
                        <router-link to="/check-in" class="block px-4 py-3 text-gray-900 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-green-600">
                          <div class="flex items-center justify-between">
                            <span>Check In</span>
                            <ArrowRight class="w-4 h-4" />
                          </div>
                        </router-link>
                      </NavigationMenuLink>
                      <NavigationMenuLink as-child>
                        <router-link to="/manage-booking" class="block px-4 py-3 text-gray-900 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-green-600">
                          <div class="flex items-center justify-between">
                            <span>Manage Booking</span>
                            <ArrowRight class="w-4 h-4" />
                          </div>
                        </router-link>
                      </NavigationMenuLink>
                      <NavigationMenuLink as-child>
                        <router-link to="/flight-status" class="block px-4 py-3 text-gray-900 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-green-600">
                          <div class="flex items-center justify-between">
                            <span>Flight Status</span>
                            <ArrowRight class="w-4 h-4" />
                          </div>
                        </router-link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <!-- Travel Info Menu -->
                <NavigationMenuItem>
                  <NavigationMenuTrigger class="h-12 px-6 font-black text-sm uppercase tracking-wider bg-gray-900 text-white hover:bg-purple-600 data-[state=open]:bg-purple-600 border-0 rounded-none transition-all duration-300">
                    Travel Info
                  </NavigationMenuTrigger>
                  <NavigationMenuContent class="bg-white border-4 border-gray-900 shadow-2xl rounded-none p-6 min-w-[280px] z-50">
                    <div class="space-y-3">
                      <NavigationMenuLink as-child>
                        <router-link to="/baggage-information" class="block px-4 py-3 text-gray-900 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-purple-600">
                          <div class="flex items-center justify-between">
                            <span>Baggage Information</span>
                            <ArrowRight class="w-4 h-4" />
                          </div>
                        </router-link>
                      </NavigationMenuLink>
                      <NavigationMenuLink as-child>
                        <router-link to="/payment-options" class="block px-4 py-3 text-gray-900 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-purple-600">
                          <div class="flex items-center justify-between">
                            <span>Payment Options</span>
                            <ArrowRight class="w-4 h-4" />
                          </div>
                        </router-link>
                      </NavigationMenuLink>
                      <NavigationMenuLink as-child>
                        <router-link to="/travel-advisories" class="block px-4 py-3 text-gray-900 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-purple-600">
                          <div class="flex items-center justify-between">
                            <span>Travel Advisories</span>
                            <ArrowRight class="w-4 h-4" />
                          </div>
                        </router-link>
                      </NavigationMenuLink>
                      <NavigationMenuLink as-child>
                        <router-link to="/travel-documents" class="block px-4 py-3 text-gray-900 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-purple-600">
                          <div class="flex items-center justify-between">
                            <span>Travel Documents</span>
                            <ArrowRight class="w-4 h-4" />
                          </div>
                        </router-link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <!-- Explore Menu -->
                <NavigationMenuItem>
                  <NavigationMenuTrigger class="h-12 px-6 font-black text-sm uppercase tracking-wider bg-gray-900 text-white hover:bg-orange-600 data-[state=open]:bg-orange-600 border-0 rounded-none transition-all duration-300">
                    Explore
                  </NavigationMenuTrigger>
                  <NavigationMenuContent class="bg-white border-4 border-gray-900 shadow-2xl rounded-none p-6 min-w-[280px] z-50">
                    <div class="space-y-3">
                      <NavigationMenuLink as-child>
                        <router-link to="/philippine-destinations" class="block px-4 py-3 text-gray-900 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-orange-600">
                          <div class="flex items-center justify-between">
                            <span>Philippine Destinations</span>
                            <ArrowRight class="w-4 h-4" />
                          </div>
                        </router-link>
                      </NavigationMenuLink>
                      <NavigationMenuLink as-child>
                        <router-link to="/international-destinations" class="block px-4 py-3 text-gray-900 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-orange-600">
                          <div class="flex items-center justify-between">
                            <span>International Destinations</span>
                            <ArrowRight class="w-4 h-4" />
                          </div>
                        </router-link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <!-- Sign In Button -->
            <Button
              @click="handleSignIn"
              class="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-wider border-0 rounded-none transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <span class="flex items-center gap-2">
                <Zap class="w-4 h-4" />
                Sign In
              </span>
            </Button>
          </div>

          <!-- Mobile Menu Button -->
          <div class="lg:hidden">
            <Button 
              @click="toggleMobileMenu" 
              class="w-12 h-12 bg-gray-900 hover:bg-blue-600 text-white border-0 rounded-none transition-all duration-300"
            >
              <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
              <X v-else class="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 transform -translate-y-4"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-4"
    >
      <div v-if="isMobileMenuOpen" class="lg:hidden absolute top-full left-0 right-0 bg-white border-b-4 border-gray-900 shadow-2xl z-50">
        <div class="px-6 py-8 space-y-8">
          <!-- Book Section -->
          <div class="border-l-4 border-blue-600 pl-6">
            <h3 class="text-lg font-black text-gray-900 uppercase tracking-wider mb-4">Book</h3>
            <div class="space-y-3">
              <router-link to="/flights" @click="closeMobileMenu" class="block px-4 py-3 text-gray-700 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-blue-600">
                <div class="flex items-center justify-between">
                  <span>Flights</span>
                  <ArrowRight class="w-4 h-4" />
                </div>
              </router-link>
              <router-link to="/seat-sale" @click="closeMobileMenu" class="block px-4 py-3 text-gray-700 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-blue-600">
                <div class="flex items-center justify-between">
                  <span>Seat Sale</span>
                  <ArrowRight class="w-4 h-4" />
                </div>
              </router-link>
            </div>
          </div>

          <!-- Manage Section -->
          <div class="border-l-4 border-green-600 pl-6">
            <h3 class="text-lg font-black text-gray-900 uppercase tracking-wider mb-4">Manage</h3>
            <div class="space-y-3">
              <router-link to="/check-in" @click="closeMobileMenu" class="block px-4 py-3 text-gray-700 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-green-600">
                <div class="flex items-center justify-between">
                  <span>Check In</span>
                  <ArrowRight class="w-4 h-4" />
                </div>
              </router-link>
              <router-link to="/manage-booking" @click="closeMobileMenu" class="block px-4 py-3 text-gray-700 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-green-600">
                <div class="flex items-center justify-between">
                  <span>Manage Booking</span>
                  <ArrowRight class="w-4 h-4" />
                </div>
              </router-link>
              <router-link to="/flight-status" @click="closeMobileMenu" class="block px-4 py-3 text-gray-700 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-green-600">
                <div class="flex items-center justify-between">
                  <span>Flight Status</span>
                  <ArrowRight class="w-4 h-4" />
                </div>
              </router-link>
            </div>
          </div>

          <!-- Travel Info Section -->
          <div class="border-l-4 border-purple-600 pl-6">
            <h3 class="text-lg font-black text-gray-900 uppercase tracking-wider mb-4">Travel Info</h3>
            <div class="space-y-3">
              <router-link to="/baggage-information" @click="closeMobileMenu" class="block px-4 py-3 text-gray-700 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-purple-600">
                <div class="flex items-center justify-between">
                  <span>Baggage Information</span>
                  <ArrowRight class="w-4 h-4" />
                </div>
              </router-link>
              <router-link to="/payment-options" @click="closeMobileMenu" class="block px-4 py-3 text-gray-700 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-purple-600">
                <div class="flex items-center justify-between">
                  <span>Payment Options</span>
                  <ArrowRight class="w-4 h-4" />
                </div>
              </router-link>
              <router-link to="/travel-advisories" @click="closeMobileMenu" class="block px-4 py-3 text-gray-700 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-purple-600">
                <div class="flex items-center justify-between">
                  <span>Travel Advisories</span>
                  <ArrowRight class="w-4 h-4" />
                </div>
              </router-link>
              <router-link to="/travel-documents" @click="closeMobileMenu" class="block px-4 py-3 text-gray-700 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-purple-600">
                <div class="flex items-center justify-between">
                  <span>Travel Documents</span>
                  <ArrowRight class="w-4 h-4" />
                </div>
              </router-link>
            </div>
          </div>

          <!-- Explore Section -->
          <div class="border-l-4 border-orange-600 pl-6">
            <h3 class="text-lg font-black text-gray-900 uppercase tracking-wider mb-4">Explore</h3>
            <div class="space-y-3">
              <router-link to="/philippine-destinations" @click="closeMobileMenu" class="block px-4 py-3 text-gray-700 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-orange-600">
                <div class="flex items-center justify-between">
                  <span>Philippine Destinations</span>
                  <ArrowRight class="w-4 h-4" />
                </div>
              </router-link>
              <router-link to="/international-destinations" @click="closeMobileMenu" class="block px-4 py-3 text-gray-700 hover:bg-gray-900 hover:text-white font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-orange-600">
                <div class="flex items-center justify-between">
                  <span>International Destinations</span>
                  <ArrowRight class="w-4 h-4" />
                </div>
              </router-link>
            </div>
          </div>

          <!-- Sign In Button -->
          <div class="pt-6 border-t-4 border-gray-900">
            <Button
              @click="handleSignIn"
              class="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-wider border-0 rounded-none transition-all duration-300 transform hover:-translate-y-1"
            >
              <span class="flex items-center justify-center gap-3">
                <Zap class="w-5 h-5" />
                Sign In
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>