<script setup lang="ts">
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
      <div class="py-16">
        <!-- Top Section -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          <!-- Brand Section -->
          <div class="lg:col-span-2">
            <!-- Logo -->
            <div class="flex items-center space-x-4 mb-6 group cursor-pointer">
              <div class="relative">
                <div class="w-12 h-12 bg-gray-900 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                  <Plane class="w-6 h-6 text-white" />
                </div>
                <!-- Shadow Block -->
                <div class="absolute top-1 left-1 w-12 h-12 bg-blue-600 -z-10 group-hover:top-2 group-hover:left-2 transition-all duration-300"></div>
              </div>
              
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-2xl font-black text-gray-900 uppercase tracking-tight">AIRLINES</span>
                  <div class="w-1.5 h-1.5 bg-blue-600"></div>
                </div>
                <div class="flex items-center gap-2">
                  <div class="h-0.5 w-6 bg-gray-900"></div>
                  <span class="text-xs font-bold text-gray-600 uppercase tracking-widest">TICKETING</span>
                </div>
              </div>
            </div>

            <!-- Description -->
            <p class="text-gray-600 font-bold leading-relaxed mb-6 max-w-md">
              Connecting the beautiful islands of the Philippines and beyond with affordable flights, warm Filipino hospitality, and world-class safety standards.
            </p>

            <!-- Trust Badge -->
            <div class="flex items-center gap-3 p-3 bg-gray-50 border-2 border-gray-900 w-fit">
              <Shield class="w-5 h-5 text-green-600" />
              <span class="font-black text-sm text-gray-900 uppercase tracking-wider">IATA Certified</span>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-lg font-black text-gray-900 mb-6 uppercase tracking-wider">Quick Links</h4>
            <div class="space-y-3">
              <a href="#" class="group flex items-center justify-between p-3 bg-white hover:bg-gray-900 border-2 border-gray-900 hover:border-blue-600 transition-all duration-300">
                <div class="flex items-center gap-3">
                  <Search class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                  <span class="font-bold text-gray-900 group-hover:text-white transition-colors">Flight Search</span>
                </div>
                <ArrowRight class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
              </a>
              
              <a href="#" class="group flex items-center justify-between p-3 bg-white hover:bg-gray-900 border-2 border-gray-900 hover:border-green-600 transition-all duration-300">
                <div class="flex items-center gap-3">
                  <MapPin class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                  <span class="font-bold text-gray-900 group-hover:text-white transition-colors">Destinations</span>
                </div>
                <ArrowRight class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
              </a>
              
              <a href="#" class="group flex items-center justify-between p-3 bg-white hover:bg-gray-900 border-2 border-gray-900 hover:border-purple-600 transition-all duration-300">
                <div class="flex items-center gap-3">
                  <CalendarIcon class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                  <span class="font-bold text-gray-900 group-hover:text-white transition-colors">Manage Booking</span>
                </div>
                <ArrowRight class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
              </a>
              
              <a href="#" class="group flex items-center justify-between p-3 bg-white hover:bg-gray-900 border-2 border-gray-900 hover:border-orange-600 transition-all duration-300">
                <div class="flex items-center gap-3">
                  <DollarSign class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                  <span class="font-bold text-gray-900 group-hover:text-white transition-colors">Seat Sale</span>
                </div>
                <ArrowRight class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          <!-- Customer Care -->
          <div>
            <h4 class="text-lg font-black text-gray-900 mb-6 uppercase tracking-wider">Customer Care</h4>
            <div class="space-y-3">
              <a href="#" class="group flex items-center justify-between p-3 bg-white hover:bg-gray-900 border-2 border-gray-900 hover:border-red-600 transition-all duration-300">
                <div class="flex items-center gap-3">
                  <Heart class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                  <span class="font-bold text-gray-900 group-hover:text-white transition-colors">Help Center</span>
                </div>
                <ArrowRight class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
              </a>
              
              <a href="#" class="group flex items-center justify-between p-3 bg-white hover:bg-gray-900 border-2 border-gray-900 hover:border-blue-600 transition-all duration-300">
                <div class="flex items-center gap-3">
                  <Phone class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                  <span class="font-bold text-gray-900 group-hover:text-white transition-colors">Contact Us</span>
                </div>
                <ArrowRight class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
              </a>
              
              <a href="#" class="group flex items-center justify-between p-3 bg-white hover:bg-gray-900 border-2 border-gray-900 hover:border-purple-600 transition-all duration-300">
                <div class="flex items-center gap-3">
                  <Shield class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                  <span class="font-bold text-gray-900 group-hover:text-white transition-colors">Baggage Info</span>
                </div>
                <ArrowRight class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
              </a>
              
              <a href="#" class="group flex items-center justify-between p-3 bg-white hover:bg-gray-900 border-2 border-gray-900 hover:border-green-600 transition-all duration-300">
                <div class="flex items-center gap-3">
                  <Globe class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                  <span class="font-bold text-gray-900 group-hover:text-white transition-colors">Travel Guidelines</span>
                </div>
                <ArrowRight class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <!-- Social Media -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
          <div>
            <h4 class="text-lg font-black text-gray-900 mb-4 uppercase tracking-wider">Follow Us</h4>
            <div class="flex gap-3">
              <a href="#" class="group p-3 bg-white hover:bg-blue-600 border-2 border-gray-900 hover:border-blue-600 transition-all duration-300">
                <Facebook class="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
              </a>
              <a href="#" class="group p-3 bg-white hover:bg-blue-400 border-2 border-gray-900 hover:border-blue-400 transition-all duration-300">
                <Twitter class="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
              </a>
              <a href="#" class="group p-3 bg-white hover:bg-pink-600 border-2 border-gray-900 hover:border-pink-600 transition-all duration-300">
                <Instagram class="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
              </a>
              <a href="#" class="group p-3 bg-white hover:bg-red-600 border-2 border-gray-900 hover:border-red-600 transition-all duration-300">
                <Youtube class="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="text-center sm:text-right">
            <div class="space-y-2">
              <div class="flex items-center justify-center sm:justify-end gap-2">
                <Phone class="w-4 h-4 text-green-600" />
                <span class="font-bold text-gray-900">+63 2 8888 8888</span>
              </div>
              <div class="flex items-center justify-center sm:justify-end gap-2">
                <Mail class="w-4 h-4 text-blue-600" />
                <span class="font-bold text-gray-900">info@airlinesticketing.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t-4 border-gray-900 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <!-- Copyright -->
          <div class="text-center md:text-left">
            <p class="text-gray-600 font-bold text-sm uppercase tracking-wider">
              © 2025 Airlines Ticketing. All rights reserved.
            </p>
          </div>

          <!-- Legal Links -->
          <div class="flex flex-wrap justify-center gap-4">
            <a href="#" class="text-gray-600 hover:text-gray-900 font-bold text-sm uppercase tracking-wider transition-colors duration-300">
              Terms & Conditions
            </a>
            <a href="#" class="text-gray-600 hover:text-gray-900 font-bold text-sm uppercase tracking-wider transition-colors duration-300">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>