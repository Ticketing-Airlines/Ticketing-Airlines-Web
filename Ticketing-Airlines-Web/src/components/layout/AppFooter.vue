<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  Plane,
  MapPin,
  Clock,
  Shield,
  Heart,
  DollarSign,
  Search,
  Users,
  Calendar as CalendarIcon,
  ArrowRight,
  Globe,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-white border-t-4 border-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Content -->
      <div class="py-8">
        <!-- Top Section -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <!-- Brand Section -->
          <div class="lg:col-span-2">
            <!-- Logo -->
            <div class="flex items-center space-x-3 mb-4 group cursor-pointer">
              <div class="relative">
                <div class="w-9 h-9 bg-gray-900 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                  <Plane class="w-5 h-5 text-white" />
                </div>
                <!-- Shadow Block -->
                <div class="absolute top-0.5 left-0.5 w-9 h-9 bg-blue-600 -z-10 group-hover:top-1 group-hover:left-1 transition-all duration-300"></div>
              </div>

              <div>
                <div class="flex items-center gap-1.5 mb-0.5">
                  <span class="text-base font-black text-gray-900 uppercase tracking-tight">AIRLINES</span>
                  <div class="w-1 h-1 bg-blue-600"></div>
                </div>
                <div class="flex items-center gap-1.5">
                  <div class="h-0.5 w-4 bg-gray-900"></div>
                  <span class="text-[10px] font-bold text-gray-600 uppercase tracking-widest">TICKETING</span>
                </div>
              </div>
            </div>

            <!-- Description -->
            <p class="text-sm text-gray-600 font-bold leading-relaxed mb-4 max-w-md">
              Connecting the beautiful islands of the Philippines and beyond with affordable flights, warm Filipino hospitality, and world-class safety standards.
            </p>

            <!-- Trust Badge -->
            <div class="flex items-center gap-2 p-2 bg-gray-50 border-2 border-gray-900 w-fit">
              <Shield class="w-4 h-4 text-green-600" />
              <span class="font-black text-xs text-gray-900 uppercase tracking-wider">IATA Certified</span>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">Quick Links</h4>
            <div class="space-y-2">
              <RouterLink to="/flights" class="group flex items-center justify-between p-2 bg-white hover:bg-gray-900 border-2 border-gray-900 hover:border-blue-600 transition-all duration-300">
                <div class="flex items-center gap-2">
                  <Search class="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
                  <span class="font-bold text-xs text-gray-900 group-hover:text-white transition-colors">Flight Search</span>
                </div>
                <ArrowRight class="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
              </RouterLink>

              <RouterLink to="/philippine-destinations" class="group flex items-center justify-between p-2 bg-white hover:bg-gray-900 border-2 border-gray-900 hover:border-green-600 transition-all duration-300">
                <div class="flex items-center gap-2">
                  <MapPin class="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
                  <span class="font-bold text-xs text-gray-900 group-hover:text-white transition-colors">Destinations</span>
                </div>
                <ArrowRight class="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
              </RouterLink>

              <RouterLink to="/manage-booking" class="group flex items-center justify-between p-2 bg-white hover:bg-gray-900 border-2 border-gray-900 hover:border-purple-600 transition-all duration-300">
                <div class="flex items-center gap-2">
                  <CalendarIcon class="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
                  <span class="font-bold text-xs text-gray-900 group-hover:text-white transition-colors">Manage Booking</span>
                </div>
                <ArrowRight class="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
              </RouterLink>

              <RouterLink to="/seat-sale" class="group flex items-center justify-between p-2 bg-white hover:bg-gray-900 border-2 border-gray-900 hover:border-orange-600 transition-all duration-300">
                <div class="flex items-center gap-2">
                  <DollarSign class="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
                  <span class="font-bold text-xs text-gray-900 group-hover:text-white transition-colors">Seat Sale</span>
                </div>
                <ArrowRight class="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
              </RouterLink>
            </div>
          </div>

          <!-- Customer Care -->
          <div>
            <h4 class="text-sm font-black text-gray-900 mb-3 uppercase tracking-wider">Customer Care</h4>
            <div class="space-y-2">
              <RouterLink to="/support" class="group flex items-center justify-between p-2 bg-white hover:bg-gray-900 border-2 border-gray-900 hover:border-red-600 transition-all duration-300">
                <div class="flex items-center gap-2">
                  <Heart class="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
                  <span class="font-bold text-xs text-gray-900 group-hover:text-white transition-colors">Help Center</span>
                </div>
                <ArrowRight class="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
              </RouterLink>

              <RouterLink to="/support" class="group flex items-center justify-between p-2 bg-white hover:bg-gray-900 border-2 border-gray-900 hover:border-blue-600 transition-all duration-300">
                <div class="flex items-center gap-2">
                  <Phone class="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
                  <span class="font-bold text-xs text-gray-900 group-hover:text-white transition-colors">Contact Us</span>
                </div>
                <ArrowRight class="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
              </RouterLink>

              <RouterLink to="/baggage-information" class="group flex items-center justify-between p-2 bg-white hover:bg-gray-900 border-2 border-gray-900 hover:border-purple-600 transition-all duration-300">
                <div class="flex items-center gap-2">
                  <Shield class="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
                  <span class="font-bold text-xs text-gray-900 group-hover:text-white transition-colors">Baggage Info</span>
                </div>
                <ArrowRight class="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
              </RouterLink>

              <RouterLink to="/travel-advisories" class="group flex items-center justify-between p-2 bg-white hover:bg-gray-900 border-2 border-gray-900 hover:border-green-600 transition-all duration-300">
                <div class="flex items-center gap-2">
                  <Globe class="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
                  <span class="font-bold text-xs text-gray-900 group-hover:text-white transition-colors">Travel Guidelines</span>
                </div>
                <ArrowRight class="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Social Media -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <div>
            <h4 class="text-sm font-black text-gray-900 mb-2 uppercase tracking-wider">Follow Us</h4>
            <div class="flex gap-2">
              <a href="#" class="group p-2 bg-white hover:bg-blue-600 border-2 border-gray-900 hover:border-blue-600 transition-all duration-300">
                <Facebook class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
              </a>
              <a href="#" class="group p-2 bg-white hover:bg-blue-400 border-2 border-gray-900 hover:border-blue-400 transition-all duration-300">
                <Twitter class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
              </a>
              <a href="#" class="group p-2 bg-white hover:bg-pink-600 border-2 border-gray-900 hover:border-pink-600 transition-all duration-300">
                <Instagram class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
              </a>
              <a href="#" class="group p-2 bg-white hover:bg-red-600 border-2 border-gray-900 hover:border-red-600 transition-all duration-300">
                <Youtube class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="text-center sm:text-right">
            <div class="space-y-1">
              <div class="flex items-center justify-center sm:justify-end gap-1.5">
                <Phone class="w-3 h-3 text-green-600" />
                <span class="font-bold text-xs text-gray-900">+63 2 8888 8888</span>
              </div>
              <div class="flex items-center justify-center sm:justify-end gap-1.5">
                <Mail class="w-3 h-3 text-blue-600" />
                <span class="font-bold text-xs text-gray-900">info@airlinesticketing.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t-4 border-gray-900 py-4">
        <div class="flex flex-col md:flex-row justify-between items-center gap-3">
          <!-- Copyright -->
          <div class="text-center md:text-left">
            <p class="text-gray-600 font-bold text-xs uppercase tracking-wider">
              © 2025 Airlines Ticketing. All rights reserved.
            </p>
          </div>

          <!-- Legal Links -->
          <div class="flex flex-wrap justify-center gap-3">
            <a href="#" class="text-gray-600 hover:text-gray-900 font-bold text-xs uppercase tracking-wider transition-colors duration-300">
              Terms & Conditions
            </a>
            <a href="#" class="text-gray-600 hover:text-gray-900 font-bold text-xs uppercase tracking-wider transition-colors duration-300">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
