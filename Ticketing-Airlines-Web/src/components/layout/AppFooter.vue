<script setup lang="ts">
import { Plane, MapPin, Clock, Shield, Heart, DollarSign, Search, Users, Calendar as CalendarIcon } from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="lg:col-span-2">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
              <Plane class="w-7 h-7 text-black" />
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white">Ticketing Airlines</h3>
              <p class="text-gray-400 text-sm font-medium">Philippines' Favorite Airline</p>
            </div>
          </div>
          <p class="text-gray-300 mb-6 max-w-md leading-relaxed">
            Connecting the beautiful islands of the Philippines and beyond with affordable flights, warm Filipino hospitality, and world-class safety standards. Your journey starts with us!
          </p>
        </div>

        <div>
          <h4 class="text-lg font-bold mb-6 text-white">Quick Links</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"><Shield class="w-4 h-4 mr-2" /> About Us</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"><MapPin class="w-4 h-4 mr-2" /> Destinations</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"><Search class="w-4 h-4 mr-2" /> Flight Status</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"><Clock class="w-4 h-4 mr-2" /> Online Check-in</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"><CalendarIcon class="w-4 h-4 mr-2" /> Manage Booking</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"><DollarSign class="w-4 h-4 mr-2" /> Seat Sale</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-bold mb-6 text-white">Customer Care</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"><Heart class="w-4 h-4 mr-2" /> Help Center</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"><Users class="w-4 h-4 mr-2" /> Contact Us</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"><Shield class="w-4 h-4 mr-2" /> Baggage Info</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"><Shield class="w-4 h-4 mr-2" /> Travel Guidelines</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"><Shield class="w-4 h-4 mr-2" /> Terms & Conditions</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"><Shield class="w-4 h-4 mr-2" /> Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-12 pt-8">
        <div class="flex flex-col md:flex-row justify-center items-center">
          <div class="text-center mb-4 md:mb-0">
            <p class="text-gray-400 text-sm">
              © 2025 Airlines Ticketing. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>