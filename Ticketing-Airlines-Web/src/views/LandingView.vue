<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import type { DateValue } from '@internationalized/date'
import { getLocalTimeZone } from '@internationalized/date'
import { Plane, MapPin, Shield, Heart, DollarSign, Search, Users, Calendar as CalendarIcon } from 'lucide-vue-next'

import type { DestinationCard, Airport, FlightSearchParams } from '@/interfaces/interfaces'
import { destinationCards, airports } from '@/data/mockData'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

// Reactive state
const departureDate = ref<DateValue>()
const returnDate = ref<DateValue>()
const selectedFrom = ref<string>('MNL')
const selectedTo = ref<string>('CEB')
const selectedPassengers = ref<string>('1')
const tripType = ref<'round-trip' | 'one-way' | 'multi-city'>('round-trip')

// Helper function to format DateValue
const formatDate = (date: DateValue | undefined): string => {
  if (!date) return ''
  return date.toDate(getLocalTimeZone()).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Helper function to get airport by code
const getAirportByCode = (code: string): Airport | undefined => {
  return airports.find(airport => airport.iataCode === code)
}

// Computed properties
const fromAirport = computed(() => getAirportByCode(selectedFrom.value))
const toAirport = computed(() => getAirportByCode(selectedTo.value))

// Flight search functionality
const searchFlights = () => {
  const searchParams: FlightSearchParams = {
    from: selectedFrom.value,
    to: selectedTo.value,
    departureDate: departureDate.value ? departureDate.value.toDate(getLocalTimeZone()) : null,
    returnDate: returnDate.value ? returnDate.value.toDate(getLocalTimeZone()) : null,
    passengers: parseInt(selectedPassengers.value),
    tripType: tripType.value
  }
  
  console.log('Searching flights with params:', searchParams)
  alert(`Searching flights from ${fromAirport.value?.city} to ${toAirport.value?.city}`)
}

// Trip type selection
const selectTripType = (type: 'round-trip' | 'one-way' | 'multi-city') => {
  tripType.value = type
}

// Destination booking
const bookDestination = (destination: DestinationCard) => {
  console.log('Booking destination:', destination)
  alert(`Booking ${destination.label} for ₱${destination.price.toLocaleString()}`)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-blue-900 py-8 lg:py-12">
      <div class="absolute inset-0" style="background: rgba(0, 0, 0, 0.1);"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div class="inline-flex items-center rounded-full px-4 py-2 mb-6" style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px);">
            <Plane class="w-4 h-4 mr-2" style="color: white;" />
            <span class="font-semibold text-sm" style="color: white;">Philippines' Favorite Airline</span>
          </div>
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight" style="color: white;">
            Fly Beyond Your Dreams
          </h1>
          <p class="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 font-medium" style="color: #d1d5db;">
            Experience the joy of flying with Ticketing Airlines. Affordable fares, reliable service, and unforgettable journeys await you.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
            <button class="inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-6 sm:px-8 rounded-2xl font-bold text-sm sm:text-base lg:text-lg shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-gray-100 w-full sm:w-auto whitespace-nowrap" style="background: white; color: black; border: 2px solid white;">
              <CalendarIcon class="w-5 h-5" />
              Book Now & Save 30%
            </button>
            <button class="inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-6 sm:px-8 rounded-2xl font-bold text-sm sm:text-base lg:text-lg shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-white hover:text-black w-full sm:w-auto whitespace-nowrap" style="background: transparent; color: white; border: 2px solid white;">
              <MapPin class="w-5 h-5" />
              View Destinations
            </button>
          </div>
        </div>

        <!-- Flight Search Form -->
        <div class="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-6xl mx-auto border-t-4 border-black">
          <div class="flex flex-wrap gap-2 mb-8">
            <button 
              @click="selectTripType('round-trip')"
              :class="[
                'px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm shadow-lg transition-all duration-300 whitespace-nowrap',
                tripType === 'round-trip' 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-black border border-gray-300 hover:border-black'
              ]"
            >
              Round Trip
            </button>
            <button 
              @click="selectTripType('one-way')"
              :class="[
                'px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm shadow-lg transition-all duration-300 whitespace-nowrap',
                tripType === 'one-way' 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-black border border-gray-300 hover:border-black'
              ]"
            >
              One Way
            </button>
            <button 
              @click="selectTripType('multi-city')"
              :class="[
                'px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm shadow-lg transition-all duration-300 whitespace-nowrap',
                tripType === 'multi-city' 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-black border border-gray-300 hover:border-black'
              ]"
            >
              Multi-city
            </button>
          </div>

          <div :class="`grid gap-4 mb-8 ${tripType === 'round-trip' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`">
            <div class="relative">
              <label class="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">From</label>
              <Select v-model="selectedFrom">
                <SelectTrigger size="lg" class="w-full px-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black text-gray-700">
                  <div class="flex items-center gap-2">
                    <MapPin class="w-4 h-4 text-gray-600" />
                    <SelectValue :placeholder="fromAirport ? `${fromAirport.city} (${fromAirport.iataCode})` : 'Select departure city'" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="airport in airports" :key="airport.iataCode" :value="airport.iataCode">
                    {{ airport.city }} ({{ airport.iataCode }})
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="relative">
              <label class="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">To</label>
              <Select v-model="selectedTo">
                <SelectTrigger size="lg" class="w-full px-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black text-gray-700">
                  <div class="flex items-center gap-2">
                    <MapPin class="w-4 h-4 text-gray-600" />
                    <SelectValue :placeholder="toAirport ? `${toAirport.city} (${toAirport.iataCode})` : 'Select destination city'" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="airport in airports" :key="airport.iataCode" :value="airport.iataCode">
                    {{ airport.city }} ({{ airport.iataCode }})
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Departure</label>
              <Popover>
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    class="w-full h-14 justify-start text-left border-2 border-gray-300 rounded-xl hover:border-black focus:ring-2 focus:ring-black focus:border-black text-gray-600 px-4"
                  >
                    <CalendarIcon class="mr-2 h-4 w-4 text-gray-600" />
                    <span class="text-sm">{{ departureDate ? formatDate(departureDate) : "Select departure date" }}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                  <Calendar v-model="departureDate" />
                </PopoverContent>
              </Popover>
            </div>

            <div v-if="tripType === 'round-trip'">
              <label class="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Return</label>
              <Popover>
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    class="w-full h-14 justify-start text-left border-2 border-gray-300 rounded-xl hover:border-black focus:ring-2 focus:ring-black focus:border-black text-gray-600 px-4"
                  >
                    <CalendarIcon class="mr-2 h-4 w-4 text-gray-600" />
                    <span class="text-sm">{{ returnDate ? formatDate(returnDate) : "Select return date" }}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                  <Calendar v-model="returnDate" />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Passengers</label>
              <Select v-model="selectedPassengers">
                <SelectTrigger size="lg" class="w-full px-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black text-gray-700">
                  <div class="flex items-center gap-2">
                    <Users class="w-4 h-4 text-gray-600" />
                    <SelectValue :placeholder="`${selectedPassengers} Adult${parseInt(selectedPassengers) > 1 ? 's' : ''}`" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Adult</SelectItem>
                  <SelectItem value="2">2 Adults</SelectItem>
                  <SelectItem value="3">3 Adults</SelectItem>
                  <SelectItem value="4">4 Adults</SelectItem>
                  <SelectItem value="5">5 Adults</SelectItem>
                  <SelectItem value="6">6+ Adults</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <button 
            @click="searchFlights"
            class="w-full h-12 sm:h-14 bg-black text-white rounded-xl font-bold text-sm sm:text-base lg:text-lg hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Search class="w-5 h-5" />
            <span>Search Flights</span>
          </button>
        </div>
      </div>

      <!-- Background decoration -->
      <div class="absolute top-0 right-0 -z-10 opacity-20">
        <svg width="404" height="784" fill="none" viewBox="0 0 404 784">
          <defs>
            <pattern id="56409614-3d62-4985-9a10-7ca758a8f4f0" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" class="text-blue-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="784" fill="url(#56409614-3d62-4985-9a10-7ca758a8f4f0)" />
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gradient-to-b from-white to-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-black mb-4">Why Choose Ticketing Airlines?</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the Filipino spirit of hospitality with every flight. We're committed to making air travel accessible, enjoyable, and memorable for everyone.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center group">
            <div class="bg-white border-2 border-gray-300 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:border-blue-600 transition-all duration-300 shadow-lg">
              <DollarSign class="w-10 h-10 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-black mb-3">Lowest Fares</h3>
            <p class="text-gray-600">Unbeatable prices with no hidden fees. Save up to 50% on domestic flights!</p>
          </div>

          <div class="text-center group">
            <div class="bg-white border-2 border-gray-300 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:border-blue-600 transition-all duration-300 shadow-lg">
              <MapPin class="w-10 h-10 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-black mb-3">7,641 Islands</h3>
            <p class="text-gray-600">Extensive network covering all major Philippine destinations and beyond.</p>
          </div>

          <div class="text-center group">
            <div class="bg-white border-2 border-gray-300 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:border-blue-600 transition-all duration-300 shadow-lg">
              <Shield class="w-10 h-10 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-black mb-3">Safety First</h3>
            <p class="text-gray-600">IATA certified with modern Airbus fleet and world-class safety standards.</p>
          </div>

          <div class="text-center group">
            <div class="bg-white border-2 border-gray-300 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:border-blue-600 transition-all duration-300 shadow-lg">
              <Heart class="w-10 h-10 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-black mb-3">Filipino Hospitality</h3>
            <p class="text-gray-600">Warm, friendly service that makes every passenger feel like family.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Destinations -->
    <section class="py-20 bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <div class="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <MapPin class="w-5 h-5 text-blue-400" />
            <span class="text-blue-300 font-semibold text-sm uppercase tracking-wider">Popular Destinations</span>
          </div>
          <h2 class="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Explore the Philippines
            <span class="block text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">& Beyond</span>
          </h2>
          <p class="text-xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            From pristine beaches to bustling cities, discover the beauty of the Philippines and exciting international destinations with unbeatable prices
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card 
            v-for="destination in destinationCards" 
            :key="destination.id"
            class="group overflow-hidden bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] rounded-3xl p-0 gap-0"
          >
            <div class="relative h-64 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
              <!-- Background Image -->
              <img 
                :src="destination.image" 
                :alt="destination.label"
                class="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <!-- Badge -->
              <div class="absolute top-6 right-6 z-10">
                <span 
                  :class="{
                    'bg-gradient-to-r from-red-500 to-pink-500 text-white': destination.badge === 'HOT DEAL',
                    'bg-gradient-to-r from-purple-500 to-indigo-500 text-white': destination.badge === 'POPULAR',
                    'bg-gradient-to-r from-green-500 to-emerald-500 text-white': destination.badge === 'NEW ROUTE',
                    'bg-gradient-to-r from-blue-500 to-cyan-500 text-white': destination.badge === 'INTERNATIONAL',
                    'bg-gradient-to-r from-orange-500 to-yellow-500 text-white': destination.badge === 'TRENDING', 
                  }"
                  class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm"
                >
                  {{ destination.badge }}
                </span>
              </div>
              
              <!-- Decorative elements -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              
              <!-- Content -->
              <div class="absolute bottom-6 left-6 right-6">
                <CardTitle class="text-3xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">{{ destination.label }}</CardTitle>
                <CardDescription class="text-gray-200 font-medium text-lg">{{ destination.description }}</CardDescription>
              </div>
            </div>
            
            <CardContent class="p-8 bg-white">
              <div class="flex justify-between items-start mb-6">
                <div class="space-y-1">
                  <div class="flex items-baseline gap-3">
                    <span class="text-4xl font-bold text-gray-900">₱{{ destination.price.toLocaleString() }}</span>
                    <span class="text-lg text-gray-400 line-through font-medium">₱{{ destination.originalPrice.toLocaleString() }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-600 font-medium">Round trip</span>
                    <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">Save {{ destination.savings }}%</span>
                  </div>
                </div>
              </div>
              
              <Button 
                @click="bookDestination(destination)"
                class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-14 rounded-2xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group-hover:scale-105"
              >
                <span class="flex items-center justify-center gap-2">
                  <Plane class="w-5 h-5" />
                  Book Now - Save {{ destination.savings }}%
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div class="text-center mt-16">
          <Button class="inline-flex items-center justify-center gap-3 h-16 px-10 rounded-2xl font-bold text-lg bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 hover:bg-white hover:text-gray-900 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 shadow-2xl hover:shadow-white/20">
            <span>View All Destinations</span>
            <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-20 bg-white relative overflow-hidden">
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="mb-6">
          <span class="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
            <Plane class="w-4 h-4" />
            Exclusive Deals
          </span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-black mb-4">Fly for Less, Dream for More!</h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-medium">
          Join over 2 million Filipinos who save up to 50% on flights. Get exclusive deals, seat sales alerts, and travel inspiration delivered to your inbox!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            size="lg"
            class="flex-1 px-6 rounded-2xl border-2 border-gray-300 focus:ring-4 focus:ring-blue-600 focus:ring-opacity-20 focus:border-blue-600 focus:outline-none text-gray-900 font-medium shadow-lg"
          />
          <Button class="bg-blue-600 text-white h-14 px-8 rounded-2xl font-bold hover:bg-blue-700 hover:text-white transition-all duration-300 shadow-lg transform hover:-translate-y-1">
            <Heart class="w-4 h-4 mr-2" />
            Get Deals
          </Button>
        </div>
        <p class="text-gray-500 text-sm mt-4">
          No spam, just amazing flight deals. Unsubscribe anytime.
        </p>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>