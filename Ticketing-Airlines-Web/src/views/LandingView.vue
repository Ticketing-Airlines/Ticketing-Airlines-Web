<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Calendar } from '@/components/ui/calendar'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import type { DateValue } from '@internationalized/date'
import { getLocalTimeZone, parseDate } from '@internationalized/date'
import {
  Plane,
  MapPin,
  Shield,
  Heart,
  DollarSign,
  Search,
  Calendar as CalendarIcon,
  ArrowRight,
  Zap
} from 'lucide-vue-next'
import Autoplay from 'embla-carousel-autoplay'

import type { DestinationCard, Airport } from '@/interfaces/interfaces'
import { destinationCards, airports } from '@/data/mockData'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import { useRouter } from 'vue-router'
import { useFlightStore } from '@/stores/flightStore'
import { storeToRefs } from 'pinia'

// Import hero images
import boracayImg from '@/assets/boracay.webp'
import cebuImg from '@/assets/cebu.webp'
import davaoImg from '@/assets/davao.webp'
import singaporeImg from '@/assets/singapore.webp'
import palawanImg from '@/assets/palawan.webp'
import hongkongImg from '@/assets/hongkong.webp'

// Router & Store
const router = useRouter()
const flightStore = useFlightStore()
const { searchParams } = storeToRefs(flightStore)

// Loading state
const isLoading = ref(true)

// Helper function to format DateValue
const formatDate = (date: DateValue | undefined | null): string => {
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
const fromAirport = computed(() => getAirportByCode(searchParams.value.from))
const toAirport = computed(() => getAirportByCode(searchParams.value.to))

// Helper to convert Date to string in YYYY-MM-DD format
const dateToString = (date: Date | null): string => {
  if (!date) return ''
  return date.toISOString().split('T')[0]
}

// Date handling for Calendar component (needs DateValue)
const departureDateValue = computed({
  get: () => {
    const dateStr = dateToString(searchParams.value.departureDate)
    return dateStr ? parseDate(dateStr) : undefined
  },
  set: (val: DateValue | undefined) => {
    if (val) {
      searchParams.value.departureDate = new Date(val.toString())
    }
  }
})

const returnDateValue = computed({
  get: () => {
    const dateStr = dateToString(searchParams.value.returnDate)
    return dateStr ? parseDate(dateStr) : undefined
  },
  set: (val: DateValue | undefined) => {
    if (val) {
      searchParams.value.returnDate = new Date(val.toString())
    }
  }
})

// Flight search functionality
const searchFlights = () => {
  console.log('Searching flights with params:', searchParams.value)

  // Navigate to flights page with search parameters
  router.push({
    path: '/flights',
    query: {
      from: searchParams.value.from,
      to: searchParams.value.to,
      departure: dateToString(searchParams.value.departureDate),
      return: dateToString(searchParams.value.returnDate),
      passengers: searchParams.value.passengers.toString(),
      type: searchParams.value.tripType
    }
  })
}

// Trip type selection
const selectTripType = (type: 'round-trip' | 'one-way' | 'multi-city') => {
  searchParams.value.tripType = type
}

// Loading screen handlers
const handleLoadingFinished = () => {
  isLoading.value = false
}

// Book destination function
const bookDestination = (destination: DestinationCard) => {
  console.log('Booking destination:', destination)
  // Pre-fill search params based on destination
  searchParams.value.to = 'MPH' // Example: Boracay (Caticlan)
  if (destination.label.includes('Cebu')) searchParams.value.to = 'CEB'
  if (destination.label.includes('Davao')) searchParams.value.to = 'DVO'
  if (destination.label.includes('Palawan')) searchParams.value.to = 'PPS'

  // Navigate to search results
  searchFlights()
}

// Initialize loading on component mount
onMounted(() => {
  isLoading.value = true
})
</script>

<template>
  <!-- Loading Screen -->
  <LoadingScreen :is-visible="isLoading" @finished="handleLoadingFinished" />

  <div v-show="!isLoading" class="min-h-screen bg-white">
    <!-- Hero Section with Carousel -->
    <section class="relative overflow-hidden h-screen">
      <!-- Navigation overlaid on carousel -->
      <NavigationBar />

      <!-- Full-width Carousel with auto-rotation -->
      <Carousel class="w-full h-full" :opts="{ loop: true }" :plugins="[Autoplay({ delay: 4000 })]">
        <CarouselContent>
          <!-- Boracay -->
          <CarouselItem class="h-full">
            <div class="relative w-full h-full">
              <img :src="boracayImg" alt="Boracay" class="w-full h-full object-cover object-center" style="aspect-ratio: 16/9;" />
              <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>

              <!-- Hero Content -->
              <div class="absolute inset-0 flex flex-col items-center justify-start text-center px-4 pt-16 lg:pt-20">
                <!-- Badge -->
                <div class="inline-flex items-center px-3 py-1.5 mb-3 bg-white/20 backdrop-blur-md border-2 border-white/30">
                  <Plane class="w-3.5 h-3.5 mr-1.5 text-white" />
                  <span class="font-black text-xs text-white uppercase tracking-widest">Discover Boracay</span>
                </div>

                <!-- Main Title -->
                <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 leading-tight text-white uppercase tracking-tight">
                  Paradise<br/>
                  <span class="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">Awaits</span>
                </h1>

                <!-- Subtitle -->
                <p class="text-xs sm:text-sm lg:text-base max-w-2xl mx-auto mb-4 font-bold text-white/90 leading-relaxed">
                  Pristine white beaches and crystal clear waters.
                </p>

                <!-- CTA Button -->
                <Button class="h-9 px-5 bg-white text-gray-900 hover:bg-gray-100 font-black text-xs uppercase tracking-wider shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <span class="flex items-center gap-2">
                    <Zap class="w-3.5 h-3.5" />
                    Book Now
                    <ArrowRight class="w-3.5 h-3.5" />
                  </span>
                </Button>
              </div>
            </div>
          </CarouselItem>

          <!-- Cebu -->
          <CarouselItem class="h-full">
            <div class="relative w-full h-full">
              <img :src="cebuImg" alt="Cebu" class="w-full h-full object-cover object-center" style="aspect-ratio: 16/9;" />
              <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>

              <div class="absolute inset-0 flex flex-col items-center justify-start text-center px-4 pt-16 lg:pt-20">
                <div class="inline-flex items-center px-3 py-1.5 mb-3 bg-white/20 backdrop-blur-md border-2 border-white/30">
                  <Plane class="w-3.5 h-3.5 mr-1.5 text-white" />
                  <span class="font-black text-xs text-white uppercase tracking-widest">Explore Cebu</span>
                </div>

                <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 leading-tight text-white uppercase tracking-tight">
                  Queen City<br/>
                  <span class="text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">of the South</span>
                </h1>

                <p class="text-xs sm:text-sm lg:text-base max-w-2xl mx-auto mb-4 font-bold text-white/90 leading-relaxed">
                  Discover the rich history, vibrant culture, and natural wonders of Cebu.
                </p>

                <Button class="h-9 px-5 bg-white text-gray-900 hover:bg-gray-100 font-black text-xs uppercase tracking-wider shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <span class="flex items-center gap-2">
                    <Zap class="w-3.5 h-3.5" />
                    Book Now
                    <ArrowRight class="w-3.5 h-3.5" />
                  </span>
                </Button>
              </div>
            </div>
          </CarouselItem>

          <!-- Palawan -->
          <CarouselItem class="h-full">
            <div class="relative w-full h-full">
              <img :src="palawanImg" alt="Palawan" class="w-full h-full object-cover object-center" style="aspect-ratio: 16/9;" />
              <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>

              <div class="absolute inset-0 flex flex-col items-center justify-start text-center px-4 pt-16 lg:pt-20">
                <div class="inline-flex items-center px-3 py-1.5 mb-3 bg-white/20 backdrop-blur-md border-2 border-white/30">
                  <Plane class="w-3.5 h-3.5 mr-1.5 text-white" />
                  <span class="font-black text-xs text-white uppercase tracking-widest">Discover Palawan</span>
                </div>

                <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 leading-tight text-white uppercase tracking-tight">
                  The Last<br/>
                  <span class="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">Frontier</span>
                </h1>

                <p class="text-xs sm:text-sm lg:text-base max-w-2xl mx-auto mb-4 font-bold text-white/90 leading-relaxed">
                  Breathtaking landscapes and pristine waters.
                </p>

                <Button class="h-9 px-5 bg-white text-gray-900 hover:bg-gray-100 font-black text-xs uppercase tracking-wider shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <span class="flex items-center gap-2">
                    <Zap class="w-3.5 h-3.5" />
                    Book Now
                    <ArrowRight class="w-3.5 h-3.5" />
                  </span>
                </Button>
              </div>
            </div>
          </CarouselItem>

          <!-- Davao -->
          <CarouselItem class="h-full">
            <div class="relative w-full h-full">
              <img :src="davaoImg" alt="Davao" class="w-full h-full object-cover object-center" style="aspect-ratio: 16/9;" />
              <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>

              <div class="absolute inset-0 flex flex-col items-center justify-start text-center px-4 pt-16 lg:pt-20">
                <div class="inline-flex items-center px-3 py-1.5 mb-3 bg-white/20 backdrop-blur-md border-2 border-white/30">
                  <Plane class="w-3.5 h-3.5 mr-1.5 text-white" />
                  <span class="font-black text-xs text-white uppercase tracking-widest">Explore Davao</span>
                </div>

                <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 leading-tight text-white uppercase tracking-tight">
                  Durian<br/>
                  <span class="text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text">Capital</span>
                </h1>

                <p class="text-xs sm:text-sm lg:text-base max-w-2xl mx-auto mb-4 font-bold text-white/90 leading-relaxed">
                  Experience the natural wonders and cultural diversity of Davao City.
                </p>

                <Button class="h-9 px-5 bg-white text-gray-900 hover:bg-gray-100 font-black text-xs uppercase tracking-wider shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <span class="flex items-center gap-2">
                    <Zap class="w-3.5 h-3.5" />
                    Book Now
                    <ArrowRight class="w-3.5 h-3.5" />
                  </span>
                </Button>
              </div>
            </div>
          </CarouselItem>

          <!-- Singapore -->
          <CarouselItem class="h-full">
            <div class="relative w-full h-full">
              <img :src="singaporeImg" alt="Singapore" class="w-full h-full object-cover object-center" style="aspect-ratio: 16/9;" />
              <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>

              <div class="absolute inset-0 flex flex-col items-center justify-start text-center px-4 pt-16 lg:pt-20">
                <div class="inline-flex items-center px-3 py-1.5 mb-3 bg-white/20 backdrop-blur-md border-2 border-white/30">
                  <Plane class="w-3.5 h-3.5 mr-1.5 text-white" />
                  <span class="font-black text-xs text-white uppercase tracking-widest">Visit Singapore</span>
                </div>

                <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 leading-tight text-white uppercase tracking-tight">
                  Lion<br/>
                  <span class="text-transparent bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text">City</span>
                </h1>

                <p class="text-xs sm:text-sm lg:text-base max-w-2xl mx-auto mb-4 font-bold text-white/90 leading-relaxed">
                  Discover the modern marvels and cultural heritage of Singapore.
                </p>

                <Button class="h-9 px-5 bg-white text-gray-900 hover:bg-gray-100 font-black text-xs uppercase tracking-wider shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <span class="flex items-center gap-2">
                    <Zap class="w-3.5 h-3.5" />
                    Book Now
                    <ArrowRight class="w-3.5 h-3.5" />
                  </span>
                </Button>
              </div>
            </div>
          </CarouselItem>

          <!-- Hong Kong -->
          <CarouselItem class="h-full">
            <div class="relative w-full h-full">
              <img :src="hongkongImg" alt="Hong Kong" class="w-full h-full object-cover object-center" style="aspect-ratio: 16/9;" />
              <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>

              <div class="absolute inset-0 flex flex-col items-center justify-start text-center px-4 pt-16 lg:pt-20">
                <div class="inline-flex items-center px-3 py-1.5 mb-3 bg-white/20 backdrop-blur-md border-2 border-white/30">
                  <Plane class="w-3.5 h-3.5 mr-1.5 text-white" />
                  <span class="font-black text-xs text-white uppercase tracking-widest">Explore Hong Kong</span>
                </div>

                <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 leading-tight text-white uppercase tracking-tight">
                  Pearl of<br/>
                  <span class="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">the Orient</span>
                </h1>

                <p class="text-xs sm:text-sm lg:text-base max-w-2xl mx-auto mb-4 font-bold text-white/90 leading-relaxed">
                  Experience the vibrant city and stunning skyline of Hong Kong.
                </p>

                <Button class="h-9 px-5 bg-white text-gray-900 hover:bg-gray-100 font-black text-xs uppercase tracking-wider shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <span class="flex items-center gap-2">
                    <Zap class="w-3.5 h-3.5" />
                    Book Now
                    <ArrowRight class="w-3.5 h-3.5" />
                  </span>
                </Button>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>

        <!-- Carousel Controls -->
        <CarouselPrevious class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-transparent border-none hover:bg-transparent text-white/50 hover:text-white w-16 h-16" />
        <CarouselNext class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-transparent border-none hover:bg-transparent text-white/50 hover:text-white w-16 h-16" />
      </Carousel>

      <!-- Search Form Overlay -->
      <div class="absolute bottom-0 left-0 right-0 z-10 pointer-events-auto">
        <div class="w-full max-w-4xl mx-auto px-3 pb-3">
          <!-- Flight Search Form -->
          <Card class="bg-white shadow-2xl border-4 border-gray-900 overflow-hidden">
            <CardContent class="p-3">
              <!-- Trip Type Buttons -->
              <div class="flex flex-wrap gap-2 mb-3">
                <button
                  @click="selectTripType('round-trip')"
                  :class="[
                    'px-3 py-1.5 font-black text-xs uppercase tracking-wider border-4 transition-all duration-300 whitespace-nowrap',
                    searchParams.tripType === 'round-trip'
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-900 border-gray-900 hover:bg-gray-50'
                  ]"
                >
                  Round Trip
                </button>
                <button
                  @click="selectTripType('one-way')"
                  :class="[
                    'px-3 py-1.5 font-black text-xs uppercase tracking-wider border-4 transition-all duration-300 whitespace-nowrap',
                    searchParams.tripType === 'one-way'
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-900 border-gray-900 hover:bg-gray-50'
                  ]"
                >
                  One Way
                </button>
                <button
                  @click="selectTripType('multi-city')"
                  :class="[
                    'px-3 py-1.5 font-black text-xs uppercase tracking-wider border-4 transition-all duration-300 whitespace-nowrap',
                    searchParams.tripType === 'multi-city'
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-900 border-gray-900 hover:bg-gray-50'
                  ]"
                >
                  Multi-city
                </button>
              </div>

              <!-- Search Form Grid -->
              <div :class="`grid gap-2 mb-3 ${searchParams.tripType === 'round-trip' ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 lg:grid-cols-3'}`">
                <!-- From -->
                <div class="relative">
                  <label class="block text-xs font-black text-gray-900 mb-1.5 uppercase tracking-widest">From</label>
                  <Select v-model="searchParams.from">
                    <SelectTrigger class="h-10 px-2.5 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 text-gray-900 font-bold text-xs">
                      <div class="flex items-center gap-1.5">
                        <MapPin class="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                        <SelectValue :placeholder="fromAirport ? `${fromAirport.city} (${fromAirport.iataCode})` : 'Select departure city'" />
                      </div>
                    </SelectTrigger>
                    <SelectContent class="border-4 border-gray-900 rounded-none">
                      <ScrollArea class="h-60">
                        <SelectItem v-for="airport in airports" :key="airport.iataCode" :value="airport.iataCode" class="font-bold">
                          {{ airport.city }} ({{ airport.iataCode }})
                        </SelectItem>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </div>

                <!-- To -->
                <div class="relative">
                  <label class="block text-xs font-black text-gray-900 mb-1.5 uppercase tracking-widest">To</label>
                  <Select v-model="searchParams.to">
                    <SelectTrigger class="h-10 px-2.5 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 text-gray-900 font-bold text-xs">
                      <div class="flex items-center gap-1.5">
                        <MapPin class="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                        <SelectValue :placeholder="toAirport ? `${toAirport.city} (${toAirport.iataCode})` : 'Select destination city'" />
                      </div>
                    </SelectTrigger>
                    <SelectContent class="border-4 border-gray-900 rounded-none">
                      <ScrollArea class="h-60">
                        <SelectItem v-for="airport in airports" :key="airport.iataCode" :value="airport.iataCode" class="font-bold">
                          {{ airport.city }} ({{ airport.iataCode }})
                        </SelectItem>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </div>

                <!-- Departure Date -->
                <div>
                  <label class="block text-xs font-black text-gray-900 mb-1.5 uppercase tracking-widest">Departure</label>
                  <Popover>
                    <PopoverTrigger as-child>
                      <Button
                        variant="outline"
                        class="w-full h-10 justify-start text-left border-4 border-gray-900 rounded-none hover:border-blue-600 focus:ring-0 focus:border-blue-600 text-gray-900 font-bold px-2.5 text-xs"
                      >
                        <CalendarIcon class="mr-1.5 h-3.5 w-3.5 text-gray-600 flex-shrink-0" />
                        <span class="text-xs truncate">{{ departureDateValue ? formatDate(departureDateValue) : "Apr 22, 2026" }}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent class="w-auto p-0 border-4 border-gray-900 rounded-none">
                      <Calendar v-model="departureDateValue" />
                    </PopoverContent>
                  </Popover>
                </div>

                <!-- Return Date -->
                <div v-if="searchParams.tripType === 'round-trip'">
                  <label class="block text-xs font-black text-gray-900 mb-1.5 uppercase tracking-widest">Return</label>
                  <Popover>
                    <PopoverTrigger as-child>
                      <Button
                        variant="outline"
                        class="w-full h-10 justify-start text-left border-4 border-gray-900 rounded-none hover:border-blue-600 focus:ring-0 focus:border-blue-600 text-gray-900 font-bold px-2.5 text-xs"
                      >
                        <CalendarIcon class="mr-1.5 h-3.5 w-3.5 text-gray-600 flex-shrink-0" />
                        <span class="text-xs truncate">{{ returnDateValue ? formatDate(returnDateValue) : "Return date" }}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent class="w-auto p-0 border-4 border-gray-900 rounded-none">
                      <Calendar v-model="returnDateValue" />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <!-- Search Button -->
              <Button
                @click="searchFlights"
                class="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Search class="w-4 h-4" />
                <span>Search Flights</span>
                <ArrowRight class="w-3.5 h-3.5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-8 bg-gray-50 relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #000 20px, #000 21px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-6">
          <div class="flex items-center justify-center gap-2 mb-2">
            <div class="w-1.5 h-1.5 bg-blue-600"></div>
            <div class="w-1.5 h-1.5 bg-green-600"></div>
            <div class="w-1.5 h-1.5 bg-purple-600"></div>
            <div class="w-1.5 h-1.5 bg-orange-600"></div>
          </div>
          <h2 class="text-2xl md:text-3xl font-black text-gray-900 mb-3 uppercase tracking-tighter">Why Choose Us?</h2>
          <div class="flex items-center justify-center gap-2 mb-2">
            <div class="h-0.5 w-12 bg-gray-900"></div>
            <p class="text-xs text-gray-600 font-bold uppercase tracking-wider">Experience Excellence</p>
            <div class="h-0.5 w-12 bg-gray-900"></div>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <!-- Feature 1 -->
          <div class="bg-white p-4 border-4 border-gray-900 relative group cursor-pointer transform hover:-translate-y-2 transition-all duration-300 group-hover:bg-blue-600">
            <!-- Corner Accent -->
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[25px] border-t-blue-600 border-r-[25px] border-r-transparent"></div>

            <div class="w-12 h-12 bg-blue-100 flex items-center justify-center mb-3 group-hover:bg-white transition-colors duration-300">
              <DollarSign class="w-6 h-6 text-blue-600 group-hover:text-blue-600 transition-colors duration-300" />
            </div>

            <h3 class="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-white transition-colors">Lowest Fares</h3>
            <p class="text-sm text-gray-600 font-bold leading-relaxed group-hover:text-white transition-colors">Unbeatable prices with no hidden fees. Save up to 50% on domestic flights!</p>

            <!-- Shadow Block -->
            <div class="absolute top-1.5 left-1.5 w-full h-full bg-blue-600 -z-10 group-hover:top-2 group-hover:left-2 transition-all duration-300"></div>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white p-4 border-4 border-gray-900 relative group cursor-pointer transform hover:-translate-y-2 transition-all duration-300 group-hover:bg-green-600">
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[25px] border-t-green-600 border-r-[25px] border-r-transparent"></div>

            <div class="w-12 h-12 bg-green-100 flex items-center justify-center mb-3 group-hover:bg-white transition-colors duration-300">
              <MapPin class="w-6 h-6 text-green-600 group-hover:text-green-600 transition-colors duration-300" />
            </div>

            <h3 class="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-white transition-colors">7,641 Islands</h3>
            <p class="text-sm text-gray-600 font-bold leading-relaxed group-hover:text-white transition-colors">Extensive network covering all major Philippine destinations and beyond.</p>

            <div class="absolute top-1.5 left-1.5 w-full h-full bg-green-600 -z-10 group-hover:top-2 group-hover:left-2 transition-all duration-300"></div>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white p-4 border-4 border-gray-900 relative group cursor-pointer transform hover:-translate-y-2 transition-all duration-300 group-hover:bg-purple-600">
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[25px] border-t-purple-600 border-r-[25px] border-r-transparent"></div>

            <div class="w-12 h-12 bg-purple-100 flex items-center justify-center mb-3 group-hover:bg-white transition-colors duration-300">
              <Shield class="w-6 h-6 text-purple-600 group-hover:text-purple-600 transition-colors duration-300" />
            </div>

            <h3 class="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-white transition-colors">Safety First</h3>
            <p class="text-sm text-gray-600 font-bold leading-relaxed group-hover:text-white transition-colors">IATA certified with modern Airbus fleet and world-class safety standards.</p>

            <div class="absolute top-1.5 left-1.5 w-full h-full bg-purple-600 -z-10 group-hover:top-2 group-hover:left-2 transition-all duration-300"></div>
          </div>

          <!-- Feature 4 -->
          <div class="bg-white p-4 border-4 border-gray-900 relative group cursor-pointer transform hover:-translate-y-2 transition-all duration-300 group-hover:bg-orange-600">
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[25px] border-t-orange-600 border-r-[25px] border-r-transparent"></div>

            <div class="w-12 h-12 bg-orange-100 flex items-center justify-center mb-3 group-hover:bg-white transition-colors duration-300">
              <Heart class="w-6 h-6 text-orange-600 group-hover:text-orange-600 transition-colors duration-300" />
            </div>

            <h3 class="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-white transition-colors">Filipino Hospitality</h3>
            <p class="text-sm text-gray-600 font-bold leading-relaxed group-hover:text-white transition-colors">Warm, friendly service that makes every passenger feel like family.</p>

            <div class="absolute top-1.5 left-1.5 w-full h-full bg-orange-600 -z-10 group-hover:top-2 group-hover:left-2 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Destinations -->
    <section class="py-8 bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white overflow-hidden relative">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #fff 20px, #fff 21px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-6">
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-none mb-4 border-4 border-white/20">
            <MapPin class="w-4 h-4 text-blue-400" />
            <span class="text-blue-300 font-black text-xs uppercase tracking-widest">Popular Destinations</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-black text-white mb-3 leading-tight uppercase tracking-tighter">
            Explore the Philippines
            <span class="block text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">& Beyond</span>
          </h2>
          <p class="text-sm text-gray-300 max-w-4xl mx-auto font-bold leading-relaxed">
            From pristine beaches to bustling cities, discover the beauty of the Philippines and exciting international destinations with unbeatable prices
          </p>
        </div>

        <!-- Destinations Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <Card
            v-for="destination in destinationCards"
            :key="destination.id"
            class="group overflow-hidden bg-white border-4 border-gray-900 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] rounded-none p-0 gap-0"
          >
            <div class="relative h-48 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
              <!-- Background Image -->
              <img
                :src="destination.image"
                :alt="destination.label"
                class="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <!-- Badge -->
              <div class="absolute top-3 right-3 z-10">
                <span
                  :class="{
                    'bg-gradient-to-r from-red-500 to-pink-500 text-white': destination.badge === 'HOT DEAL',
                    'bg-gradient-to-r from-purple-500 to-indigo-500 text-white': destination.badge === 'POPULAR',
                    'bg-gradient-to-r from-green-500 to-emerald-500 text-white': destination.badge === 'NEW ROUTE',
                    'bg-gradient-to-r from-blue-500 to-cyan-500 text-white': destination.badge === 'INTERNATIONAL',
                    'bg-gradient-to-r from-orange-500 to-yellow-500 text-white': destination.badge === 'TRENDING',
                  }"
                  class="px-3 py-1 font-black text-[10px] uppercase tracking-wider shadow-lg backdrop-blur-sm border-2 border-white/30"
                >
                  {{ destination.badge }}
                </span>
              </div>

              <!-- Decorative elements -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div class="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-12 translate-x-12"></div>
              <div class="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>

              <!-- Content -->
              <div class="absolute bottom-3 left-3 right-3">
                <CardTitle class="text-xl font-black text-white mb-1 group-hover:text-blue-300 transition-colors duration-300">{{ destination.label }}</CardTitle>
                <CardDescription class="text-gray-200 font-bold text-sm">{{ destination.description }}</CardDescription>
              </div>
            </div>

            <CardContent class="p-4 bg-white">
              <div class="flex justify-between items-start mb-4">
                <div class="space-y-0.5">
                  <div class="flex items-baseline gap-2">
                    <span class="text-2xl font-black text-gray-900">₱{{ destination.price.toLocaleString() }}</span>
                    <span class="text-sm text-gray-400 line-through font-bold">₱{{ destination.originalPrice.toLocaleString() }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-gray-600 font-bold">Round trip</span>
                    <span class="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 font-black uppercase tracking-wider">Save {{ destination.savings }}%</span>
                  </div>
                </div>
              </div>

              <Button
                @click="bookDestination(destination)"
                class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-10 font-black text-xs transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group-hover:scale-105 rounded-none"
              >
                <span class="flex items-center justify-center gap-1.5">
                  <Plane class="w-3.5 h-3.5" />
                  Book Now - Save {{ destination.savings }}%
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>

        <!-- CTA Button -->
        <div class="text-center mt-8">
          <Button class="inline-flex items-center justify-center gap-2 h-10 px-6 font-black text-sm bg-white/10 backdrop-blur-sm text-white border-4 border-white/20 hover:bg-white hover:text-gray-900 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 shadow-2xl hover:shadow-white/20 rounded-none">
            <span>View All Destinations</span>
            <ArrowRight class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-8 bg-white relative overflow-hidden">
      <div class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="mb-4">
          <span class="inline-flex items-center gap-1.5 bg-gray-900 text-white px-4 py-2 font-black text-xs uppercase tracking-wider border-4 border-gray-900">
            <Plane class="w-3.5 h-3.5" />
            Exclusive Deals
          </span>
        </div>
        <h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-3 uppercase tracking-tighter">Fly for Less, Dream for More!</h2>
        <p class="text-xs text-gray-600 mb-6 max-w-2xl mx-auto font-bold leading-relaxed">
          Join over 2 million Filipinos who save up to 50% on flights. Get exclusive deals, seat sales alerts, and travel inspiration delivered to your inbox!
        </p>
        <div class="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            class="flex-1 px-4 h-10 border-4 border-gray-900 focus:ring-0 focus:border-blue-600 focus:outline-none text-gray-900 font-bold rounded-none text-sm"
          />
          <Button class="bg-blue-600 text-white h-10 px-5 font-black hover:bg-blue-700 hover:text-white transition-all duration-300 shadow-lg transform hover:-translate-y-1 rounded-none text-xs">
            <Heart class="w-3.5 h-3.5 mr-1.5" />
            Get Deals
          </Button>
        </div>
        <p class="text-gray-500 text-xs mt-4 font-bold">
          No spam, just amazing flight deals. Unsubscribe anytime.
        </p>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

















