<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plane, Shield, Heart, MapPin, DollarSign, Calendar as CalendarIcon, Search } from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

// Import destination images
import cebuImg from '@/assets/cebu.webp'
import davaoImg from '@/assets/davao.webp'
import singaporeImg from '@/assets/singapore.webp'
import hongkongImg from '@/assets/hongkong.webp'
import iloiloImg from '@/assets/iloilo.webp'
import tokyoImg from '@/assets/tokyo.webp'
import seoulImg from '@/assets/seoul.webp'
import bangkokImg from '@/assets/bangkok.webp'

// Mock data for airports
const airports = ref([
  { iataCode: 'MNL', city: 'Manila', country: 'Philippines' },
  { iataCode: 'CEB', city: 'Cebu', country: 'Philippines' },
  { iataCode: 'DVO', city: 'Davao', country: 'Philippines' },
  { iataCode: 'ILO', city: 'Iloilo', country: 'Philippines' },
  { iataCode: 'BCD', city: 'Bacolod', country: 'Philippines' },
  { iataCode: 'SIN', city: 'Singapore', country: 'Singapore' },
  { iataCode: 'HKG', city: 'Hong Kong', country: 'Hong Kong' },
  { iataCode: 'NRT', city: 'Tokyo', country: 'Japan' },
  { iataCode: 'ICN', city: 'Seoul', country: 'South Korea' },
  { iataCode: 'BKK', city: 'Bangkok', country: 'Thailand' }
])

const popularDestinations = ref([
  { 
    code: 'CEB', 
    city: 'Cebu', 
    country: 'Philippines', 
    price: 3500,
    originalPrice: 7000,
    savings: 50,
    badge: 'HOT DEAL',
    description: 'Queen City of the South',
    image: cebuImg
  },
  { 
    code: 'DVO', 
    city: 'Davao', 
    country: 'Philippines', 
    price: 4200,
    originalPrice: 8400,
    savings: 50,
    badge: 'POPULAR',
    description: 'Home of Mount Apo',
    image: davaoImg
  },
  { 
    code: 'SIN', 
    city: 'Singapore', 
    country: 'Singapore', 
    price: 8900,
    originalPrice: 15000,
    savings: 41,
    badge: 'INTERNATIONAL',
    description: 'Lion City',
    image: singaporeImg
  },
  { 
    code: 'HKG', 
    city: 'Hong Kong', 
    country: 'Hong Kong', 
    price: 12500,
    originalPrice: 22000,
    savings: 43,
    badge: 'INTERNATIONAL',
    description: 'Pearl of the Orient',
    image: hongkongImg
  },
  { 
    code: 'BKK', 
    city: 'Bangkok', 
    country: 'Thailand', 
    price: 15800,
    originalPrice: 25000,
    savings: 37,
    badge: 'TRENDING',
    description: 'City of Angels',
    image: bangkokImg
  },
  { 
    code: 'NRT', 
    city: 'Tokyo', 
    country: 'Japan', 
    price: 25000,
    originalPrice: 42000,
    savings: 40,
    badge: 'INTERNATIONAL',
    description: 'Land of the Rising Sun',
    image: tokyoImg
  },
  { 
    code: 'ICN', 
    city: 'Seoul', 
    country: 'South Korea', 
    price: 18500,
    originalPrice: 32000,
    savings: 42,
    badge: 'TRENDING',
    description: 'Heart of South Korea',
    image: seoulImg
  },
  { 
    code: 'ILO', 
    city: 'Iloilo', 
    country: 'Philippines', 
    price: 3800,
    originalPrice: 7200,
    savings: 47,
    badge: 'NEW ROUTE',
    description: 'City of Love',
    image: iloiloImg
  }
])

const tripType = ref('roundtrip')
const searchForm = ref({
  origin: '',
  destination: '',
  departureDate: '',
  returnDate: '',
  passengers: '1',
  class: 'Economy'
})

const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const isFormValid = computed(() => {
  return searchForm.value.origin &&
         searchForm.value.destination &&
         searchForm.value.departureDate &&
         (tripType.value === 'oneway' || searchForm.value.returnDate)
})

const searchFlights = () => {
  if (isFormValid.value) {
    // Here you would typically make an API call to search for flights
    console.log('Searching flights with:', searchForm.value)
    // For now, we'll just show an alert
    alert('Flight search functionality will be implemented with backend integration')
  }
}

const bookDestination = (destination: any) => {
  console.log('Booking destination:', destination)
  alert(`Booking ${destination.city} for ₱${destination.price.toLocaleString()}`)
}

onMounted(() => {
  // Set default departure date to tomorrow
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  searchForm.value.departureDate = tomorrow.toISOString().split('T')[0]

  // Set default return date to 7 days from departure
  const returnDate = new Date(tomorrow)
  returnDate.setDate(returnDate.getDate() + 7)
  searchForm.value.returnDate = returnDate.toISOString().split('T')[0]
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-32 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <div class="relative container mx-auto px-4 text-center z-10 pt-12">
        <div class="inline-flex items-center rounded-full px-4 py-2 mb-6" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
          <Plane class="w-4 h-4 mr-2 text-white" />
          <span class="font-semibold text-sm text-white">Book Your Flight</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Find Your Perfect Flight
        </h1>
        <p class="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto font-medium">
          Discover the best deals to your favorite destinations worldwide
        </p>
      </div>
    </section>

    <!-- Flight Search Form -->
    <div class="container mx-auto px-4 -mt-16 relative z-20 mb-16">
      <Card class="shadow-2xl bg-white/95 backdrop-blur-md border-0">
        <CardContent class="p-6 sm:p-8">
          <form @submit.prevent="searchFlights" class="space-y-6">
            <!-- Trip Type -->
            <div class="flex flex-wrap gap-2 mb-6">
              <button
                type="button"
                @click="tripType = 'roundtrip'"
                :class="[
                  'px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm shadow-lg transition-all duration-300 whitespace-nowrap',
                  tripType === 'roundtrip'
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-black border border-gray-300 hover:border-black'
                ]"
              >
                Round Trip
              </button>
              <button
                type="button"
                @click="tripType = 'oneway'"
                :class="[
                  'px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm shadow-lg transition-all duration-300 whitespace-nowrap',
                  tripType === 'oneway'
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-black border border-gray-300 hover:border-black'
                ]"
              >
                One Way
              </button>
            </div>

            <!-- Origin and Destination -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <Label for="origin" class="text-sm font-bold text-gray-700 uppercase tracking-wide">From</Label>
                <Select v-model="searchForm.origin">
                  <SelectTrigger class="h-14 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black">
                    <div class="flex items-center gap-2">
                      <MapPin class="w-4 h-4 text-gray-600" />
                    <SelectValue placeholder="Select departure city" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea class="h-60">
                    <SelectItem v-for="airport in airports" :key="airport.iataCode" :value="airport.iataCode">
                      {{ airport.city }} ({{ airport.iataCode }})
                    </SelectItem>
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>

              <div class="space-y-2">
                <Label for="destination" class="text-sm font-bold text-gray-700 uppercase tracking-wide">To</Label>
                <Select v-model="searchForm.destination">
                  <SelectTrigger class="h-14 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black">
                    <div class="flex items-center gap-2">
                      <MapPin class="w-4 h-4 text-gray-600" />
                    <SelectValue placeholder="Select destination city" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea class="h-60">
                    <SelectItem v-for="airport in airports" :key="airport.iataCode" :value="airport.iataCode">
                      {{ airport.city }} ({{ airport.iataCode }})
                    </SelectItem>
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <!-- Dates -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <Label for="departure" class="text-sm font-bold text-gray-700 uppercase tracking-wide">Departure Date</Label>
                <div class="relative">
                  <CalendarIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 z-10" />
                <Input
                  v-model="searchForm.departureDate"
                  type="date"
                    class="h-14 pl-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black"
                  :min="today"
                />
                </div>
              </div>

              <div class="space-y-2" v-if="tripType === 'roundtrip'">
                <Label for="return" class="text-sm font-bold text-gray-700 uppercase tracking-wide">Return Date</Label>
                <div class="relative">
                  <CalendarIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 z-10" />
                <Input
                  v-model="searchForm.returnDate"
                  type="date"
                    class="h-14 pl-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black"
                  :min="searchForm.departureDate"
                />
                </div>
              </div>
            </div>

            <!-- Passengers and Class -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <Label for="passengers" class="text-sm font-bold text-gray-700 uppercase tracking-wide">Passengers</Label>
                <Select v-model="searchForm.passengers">
                  <SelectTrigger class="h-14 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black">
                    <SelectValue placeholder="Select passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="i in 9" :key="i" :value="i.toString()">
                      {{ i }} {{ i === 1 ? 'Passenger' : 'Passengers' }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div class="space-y-2">
                <Label for="class" class="text-sm font-bold text-gray-700 uppercase tracking-wide">Class</Label>
                <Select v-model="searchForm.class">
                  <SelectTrigger class="h-14 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Economy">Economy</SelectItem>
                    <SelectItem value="Premium">Premium Economy</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <!-- Search Button -->
            <Button
              type="submit"
              class="w-full h-14 sm:h-16 text-lg font-bold bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
              :disabled="!isFormValid"
            >
              <Search class="h-5 w-5" />
              <span>Search Flights</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>

    <!-- Features Section -->
    <section class="py-16 bg-gradient-to-b from-white to-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-black mb-4">Why Choose Ticketing Airlines?</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience world-class service with every flight. We're committed to making air travel accessible and memorable.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center group">
            <div class="bg-white border-2 border-gray-300 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:border-blue-600 transition-all duration-300 shadow-lg">
              <DollarSign class="w-10 h-10 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-black mb-3">Best Prices</h3>
            <p class="text-gray-600">Unbeatable fares with no hidden fees. Save up to 50% on flights!</p>
          </div>

          <div class="text-center group">
            <div class="bg-white border-2 border-gray-300 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:border-blue-600 transition-all duration-300 shadow-lg">
              <MapPin class="w-10 h-10 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-black mb-3">Global Network</h3>
            <p class="text-gray-600">Extensive network covering major destinations worldwide.</p>
    </div>

          <div class="text-center group">
            <div class="bg-white border-2 border-gray-300 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:border-blue-600 transition-all duration-300 shadow-lg">
              <Shield class="w-10 h-10 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-black mb-3">Safety First</h3>
            <p class="text-gray-600">IATA certified with modern fleet and world-class safety standards.</p>
          </div>

          <div class="text-center group">
            <div class="bg-white border-2 border-gray-300 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:border-blue-600 transition-all duration-300 shadow-lg">
              <Heart class="w-10 h-10 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-black mb-3">24/7 Support</h3>
            <p class="text-gray-600">Dedicated customer service to assist you anytime, anywhere.</p>
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
            Explore Amazing
            <span class="block text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">Destinations</span>
          </h2>
          <p class="text-xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            From tropical beaches to bustling cities, discover the world with unbeatable prices
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            v-for="destination in popularDestinations"
            :key="destination.code"
            class="group overflow-hidden bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] rounded-3xl p-0 gap-0"
          >
            <div class="relative h-56 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
              <!-- Background Image -->
              <img
                :src="destination.image"
                :alt="destination.city"
                class="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-500"
              />
              
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              <!-- Badge -->
              <div class="absolute top-4 right-4 z-10">
                <span
                  :class="{
                    'bg-gradient-to-r from-red-500 to-pink-500 text-white': destination.badge === 'HOT DEAL',
                    'bg-gradient-to-r from-purple-500 to-indigo-500 text-white': destination.badge === 'POPULAR',
                    'bg-gradient-to-r from-green-500 to-emerald-500 text-white': destination.badge === 'NEW ROUTE',
                    'bg-gradient-to-r from-blue-500 to-cyan-500 text-white': destination.badge === 'INTERNATIONAL',
                    'bg-gradient-to-r from-orange-500 to-yellow-500 text-white': destination.badge === 'TRENDING',
                  }"
                  class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm"
                >
                  {{ destination.badge }}
                </span>
              </div>

              <!-- Decorative elements -->
              <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

              <!-- Content -->
              <div class="absolute bottom-4 left-4 right-4 z-10">
                <CardTitle class="text-2xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors duration-300">{{ destination.city }}</CardTitle>
                <CardDescription class="text-gray-200 font-medium text-sm">{{ destination.description }}</CardDescription>
              </div>
            </div>

            <CardContent class="p-6 bg-white">
              <div class="flex justify-between items-start mb-4">
                <div class="space-y-1">
                  <div class="flex items-baseline gap-2">
                    <span class="text-3xl font-bold text-gray-900">₱{{ destination.price.toLocaleString() }}</span>
                    <span class="text-sm text-gray-400 line-through font-medium">₱{{ destination.originalPrice.toLocaleString() }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-gray-600 font-medium">Round trip</span>
                    <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Save {{ destination.savings }}%</span>
                  </div>
                </div>
              </div>

              <Button
                @click="bookDestination(destination)"
                class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-12 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group-hover:scale-105"
              >
                <span class="flex items-center justify-center gap-2">
                  <Plane class="w-4 h-4" />
                  Book Now
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

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
