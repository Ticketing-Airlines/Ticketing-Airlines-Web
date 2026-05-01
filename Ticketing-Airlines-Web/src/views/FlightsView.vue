<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Plane,
  MapPin,
  Search,
  ArrowLeft,
  ArrowRight,
  Filter,
  SortAsc,
  SortDesc,
  X,
  AlertCircle,
  Loader2
} from 'lucide-vue-next'
import AppFooter from '@/components/layout/AppFooter.vue'
import FareBundleSelector from '@/components/booking/FareBundleSelector.vue'
import type {
  FlightSearchParams,
  FlightSearchResult,
  RoundTripResult,
  MultiCityResult,
  Airport,
  FareBundleType
} from '@/interfaces/interfaces'
import { airports } from '@/data/mockData'
import { useFlightStore } from '@/stores/flightStore'
import { useBookingStore } from '@/stores/bookingStore'
import { useValidation, rules } from '@/composables/useValidation'

const route = useRoute()
const router = useRouter()
const flightStore = useFlightStore()
const bookingStore = useBookingStore()

// Store state
const { searchParams, searchResults, totalResults, isSearching } = storeToRefs(flightStore)

// Local UI state
const showFilters = ref(false)
const sortOrder = ref<'asc' | 'desc'>('asc')
const showBundleModal = ref(false)
const selectedFlightForBundle = ref<FlightSearchResult | RoundTripResult | MultiCityResult | null>(null)
const selectedBundle = ref<FareBundleType>('SKYPLUS')

// Filter state
const filters = ref({
  priceRange: [0, 50000],
  airlines: [] as string[],
  departureTime: [] as string[],
  duration: [] as string[]
})

const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

// Validation
const { isValid: isFormValid, errors } = useValidation(searchParams.value, {
  from: [rules.required('Origin is required')],
  to: [rules.required('Destination is required')],
  departureDate: [rules.required('Departure date is required')],
  // Conditional validation for return date
  returnDate: [
    (value: Date | null) => {
      if (searchParams.value.tripType === 'round-trip' && !value) {
        return 'Return date is required'
      }
      return true
    }
  ]
})

// Computed properties to handle Date <-> String conversion for date inputs
const departureDateString = computed({
  get: () => {
    if (!searchParams.value.departureDate) return ''
    if (searchParams.value.departureDate instanceof Date) {
      return searchParams.value.departureDate.toISOString().split('T')[0]
    }
    return searchParams.value.departureDate
  },
  set: (value: string) => {
    searchParams.value.departureDate = value ? new Date(value) : null
  }
})

const returnDateString = computed({
  get: () => {
    if (!searchParams.value.returnDate) return ''
    if (searchParams.value.returnDate instanceof Date) {
      return searchParams.value.returnDate.toISOString().split('T')[0]
    }
    return searchParams.value.returnDate
  },
  set: (value: string) => {
    searchParams.value.returnDate = value ? new Date(value) : null
  }
})

const filteredResults = computed(() => {
  let results = [...searchResults.value]

  // Apply sorting
  if (Array.isArray(results) && results.length > 0) {
    results = results.sort((a, b) => {
      const aVal = 'price' in a ? a.price : 'totalPrice' in a ? a.totalPrice : 0
      const bVal = 'price' in b ? b.price : 'totalPrice' in b ? b.totalPrice : 0
      return sortOrder.value === 'asc' ? aVal - bVal : bVal - aVal
    })
  }

  return results
})

// Initialize search from route params
onMounted(async () => {
  const { from, to, departure, return: returnDate, passengers, type } = route.query

  if (from && to && departure) {
    const params: FlightSearchParams = {
      from: from as string,
      to: to as string,
      departureDate: new Date(departure as string),
      returnDate: returnDate ? new Date(returnDate as string) : null,
      passengers: parseInt(passengers as string || '1'),
      tripType: (type as 'one-way' | 'round-trip') || 'round-trip'
    }

    flightStore.setSearchParams(params)

    // Auto-search - always trigger if we have URL params
    // The backend will validate and return appropriate errors if needed
    try {
      await flightStore.searchFlights()
    } catch (error) {
      console.error('Auto-search failed:', error)
    }
  }
})

const handleSearch = async () => {
  if (!isFormValid.value) return

  await flightStore.searchFlights()

  // Update URL with search params
  const query = {
    from: searchParams.value.from,
    to: searchParams.value.to,
    departure: searchParams.value.departureDate instanceof Date
      ? searchParams.value.departureDate.toISOString().split('T')[0]
      : searchParams.value.departureDate,
    return: searchParams.value.returnDate instanceof Date
      ? searchParams.value.returnDate.toISOString().split('T')[0]
      : searchParams.value.returnDate,
    passengers: searchParams.value.passengers.toString(),
    type: searchParams.value.tripType
  }

  router.push({ path: '/flights', query })
}

const selectFlight = (result: FlightSearchResult | RoundTripResult | MultiCityResult) => {
  selectedFlightForBundle.value = result
  selectedBundle.value = 'SKYPLUS' // Reset to recommended
  showBundleModal.value = true
}

const handleBundleSelection = (bundle: FareBundleType) => {
  selectedBundle.value = bundle
}

const proceedWithBundle = () => {
  if (!selectedFlightForBundle.value) return

  console.log('Selected flight with bundle:', selectedFlightForBundle.value, selectedBundle.value)
  bookingStore.initBooking(selectedFlightForBundle.value, searchParams.value.passengers, selectedBundle.value)
  showBundleModal.value = false
  router.push('/booking')
}

const formatPrice = (price: number) => {
  return `₱${price.toLocaleString()}`
}

const getAirportByCode = (code: string): Airport | undefined => {
  return airports.find(airport => airport.iataCode === code)
}

const clearFilters = () => {
  filters.value = {
    priceRange: [0, 50000],
    airlines: [],
    departureTime: [],
    duration: []
  }
}

const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Search Form Section -->
    <section class="bg-white border-b-4 border-gray-900">
      <div class="max-w-7xl mx-auto px-3 py-3">
        <!-- Back Button -->
        <Button
          @click="router.push('/')"
          variant="ghost"
          class="mb-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-bold h-8 px-2 text-xs"
        >
          <ArrowLeft class="w-3.5 h-3.5 mr-1.5" />
          Back to Home
        </Button>
        <!-- Trip Type Selection -->
        <div class="flex flex-wrap gap-2 mb-3">
          <button
            v-for="type in (['round-trip', 'one-way'] as const)"
            :key="type"
            @click="searchParams.tripType = type"
            :class="[
              'px-3 py-1.5 font-black text-xs uppercase tracking-wider border-4 transition-all duration-300 whitespace-nowrap',
              searchParams.tripType === type
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-900 border-gray-900 hover:bg-gray-50'
            ]"
          >
            {{ type.replace('-', ' ') }}
          </button>
        </div>

        <!-- Search Form -->
        <div :class="`grid gap-2 mb-3 ${searchParams.tripType === 'round-trip' ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 lg:grid-cols-3'}`">
          <!-- From -->
          <div class="relative">
            <label class="block text-xs font-black text-gray-900 mb-1.5 uppercase tracking-widest">From</label>
            <Select v-model="searchParams.from">
              <SelectTrigger
                class="h-10 px-2.5 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 text-gray-900 font-bold text-xs"
                :class="{ 'border-red-500': errors.from }"
              >
                <div class="flex items-center gap-1.5">
                  <MapPin class="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                  <SelectValue>
                    <template v-if="searchParams.from">
                      {{ getAirportByCode(searchParams.from)?.city || searchParams.from }} ({{ searchParams.from }})
                    </template>
                    <template v-else>
                      Select departure city
                    </template>
                  </SelectValue>
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
            <span v-if="errors.from" class="text-red-500 text-xs font-bold mt-1 block">{{ errors.from }}</span>
          </div>

          <!-- To -->
          <div class="relative">
            <label class="block text-xs font-black text-gray-900 mb-1.5 uppercase tracking-widest">To</label>
            <Select v-model="searchParams.to">
              <SelectTrigger
                class="h-10 px-2.5 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 text-gray-900 font-bold text-xs"
                :class="{ 'border-red-500': errors.to }"
              >
                <div class="flex items-center gap-1.5">
                  <MapPin class="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                  <SelectValue>
                    <template v-if="searchParams.to">
                      {{ getAirportByCode(searchParams.to)?.city || searchParams.to }} ({{ searchParams.to }})
                    </template>
                    <template v-else>
                      Select destination city
                    </template>
                  </SelectValue>
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
            <span v-if="errors.to" class="text-red-500 text-xs font-bold mt-1 block">{{ errors.to }}</span>
          </div>

          <!-- Departure Date -->
          <div>
            <label class="block text-xs font-black text-gray-900 mb-1.5 uppercase tracking-widest">Departure</label>
            <Input
              v-model="departureDateString"
              type="date"
              class="h-10 px-2.5 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 text-gray-900 font-bold text-xs"
              :class="{ 'border-red-500': errors.departureDate }"
              :min="today"
            />
            <span v-if="errors.departureDate" class="text-red-500 text-xs font-bold mt-1 block">{{ errors.departureDate }}</span>
          </div>

          <!-- Return Date -->
          <div v-if="searchParams.tripType === 'round-trip'">
            <label class="block text-xs font-black text-gray-900 mb-1.5 uppercase tracking-widest">Return</label>
            <Input
              v-model="returnDateString"
              type="date"
              class="h-10 px-2.5 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 text-gray-900 font-bold text-xs"
              :class="{ 'border-red-500': errors.returnDate }"
              :min="departureDateString"
            />
            <span v-if="errors.returnDate" class="text-red-500 text-xs font-bold mt-1 block">{{ errors.returnDate }}</span>
          </div>

          <!-- Passengers -->
          <div v-if="searchParams.tripType !== 'round-trip'">
            <label class="block text-xs font-black text-gray-900 mb-1.5 uppercase tracking-widest">Passengers</label>
            <Select v-model="searchParams.passengers">
              <SelectTrigger class="h-10 px-2.5 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 text-gray-900 font-bold text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent class="border-4 border-gray-900 rounded-none">
                <SelectItem v-for="i in 9" :key="i" :value="i.toString()" class="font-bold">
                  {{ i }} {{ i === 1 ? 'Passenger' : 'Passengers' }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Search Button -->
        <Button
          @click="handleSearch"
          :disabled="isSearching"
          class="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Loader2 v-if="isSearching" class="w-4 h-4 animate-spin" />
          <Search v-else class="w-4 h-4" />
          <span>{{ isSearching ? 'Searching...' : 'Search Flights' }}</span>
          <ArrowRight v-if="!isSearching" class="w-3.5 h-3.5" />
        </Button>
      </div>
    </section>

    <!-- Loading State -->
    <section v-if="isSearching" class="py-12">
      <div class="max-w-4xl mx-auto px-3 text-center">
        <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Loader2 class="w-10 h-10 text-blue-600 animate-spin" />
        </div>
        <h2 class="text-2xl md:text-3xl font-black text-gray-900 mb-3">Searching for Flights</h2>
        <p class="text-base text-gray-600 font-bold mb-2">
          We're finding the best flights for your journey...
        </p>
        <p class="text-sm text-gray-500 font-bold">
          This usually takes just a few seconds
        </p>
      </div>
    </section>

    <!-- Error State -->
    <section v-else-if="flightStore.error" class="py-12">
      <div class="max-w-4xl mx-auto px-3 text-center">
        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle class="w-10 h-10 text-red-600" />
        </div>
        <h2 class="text-2xl md:text-3xl font-black text-gray-900 mb-3">Unable to Search Flights</h2>
        <p class="text-base text-gray-600 font-bold mb-6">
          {{ flightStore.error }}
        </p>
        <div class="space-y-3">
          <Button
            @click="handleSearch"
            class="bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black px-6 py-3 text-sm"
          >
            <Search class="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <div class="text-xs text-gray-500 font-bold space-y-1">
            <p>• Check your internet connection</p>
            <p>• Make sure all fields are filled correctly</p>
            <p>• Try different dates or destinations</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Results Section -->
    <section v-else-if="searchResults.length > 0" class="py-4">
      <div class="max-w-7xl mx-auto px-3">
        <!-- Results Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h2 class="text-xl md:text-2xl font-black text-gray-900 mb-1">
              {{ totalResults }} Flight{{ totalResults !== 1 ? 's' : '' }} Found
            </h2>
            <p class="text-gray-600 font-bold text-xs">
              {{ getAirportByCode(searchParams.from)?.city }} → {{ getAirportByCode(searchParams.to)?.city }}
            </p>
          </div>

          <div class="flex gap-2 mt-3 sm:mt-0">
            <Button
              @click="showFilters = !showFilters"
              variant="outline"
              class="border-4 border-gray-900 rounded-none font-black h-9 px-3 text-xs"
            >
              <Filter class="w-3.5 h-3.5 mr-1.5" />
              Filters
            </Button>

            <Button
              @click="toggleSort"
              variant="outline"
              class="border-4 border-gray-900 rounded-none font-black h-9 px-3 text-xs"
            >
              <SortAsc v-if="sortOrder === 'asc'" class="w-3.5 h-3.5 mr-1.5" />
              <SortDesc v-else class="w-3.5 h-3.5 mr-1.5" />
              Sort
            </Button>
          </div>
        </div>

        <!-- Filters Panel -->
        <div v-if="showFilters" class="bg-white border-4 border-gray-900 p-3 mb-4">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-base font-black text-gray-900 uppercase tracking-tight">Filters</h3>
            <Button @click="clearFilters" variant="ghost" class="text-gray-600 hover:text-gray-900 h-8 px-2 text-xs">
              <X class="w-3.5 h-3.5 mr-1.5" />
              Clear All
            </Button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <!-- Price Range -->
            <div>
              <label class="block text-xs font-black text-gray-900 mb-1.5 uppercase tracking-widest">Price Range</label>
              <div class="flex gap-2">
                <Input
                  v-model.number="filters.priceRange[0]"
                  type="number"
                  placeholder="Min"
                  class="h-9 px-2 border-4 border-gray-900 rounded-none text-xs font-bold"
                />
                <Input
                  v-model.number="filters.priceRange[1]"
                  type="number"
                  placeholder="Max"
                  class="h-9 px-2 border-4 border-gray-900 rounded-none text-xs font-bold"
                />
              </div>
            </div>

            <!-- Departure Time -->
            <div>
              <label class="block text-xs font-black text-gray-900 mb-1.5 uppercase tracking-widest">Departure Time</label>
              <div class="space-y-1.5">
                <label v-for="time in ['Morning', 'Afternoon', 'Evening', 'Night']" :key="time" class="flex items-center">
                  <input type="checkbox" class="mr-2" />
                  <span class="font-bold text-xs">{{ time }}</span>
                </label>
              </div>
            </div>

            <!-- Duration -->
            <div>
              <label class="block text-xs font-black text-gray-900 mb-1.5 uppercase tracking-widest">Duration</label>
              <div class="space-y-1.5">
                <label v-for="duration in ['Under 2h', '2-4h', '4-6h', 'Over 6h']" :key="duration" class="flex items-center">
                  <input type="checkbox" class="mr-2" />
                  <span class="font-bold text-xs">{{ duration }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Flight Results -->
        <div class="space-y-3">
          <!-- One-way Results -->
          <div v-if="searchParams.tripType === 'one-way'">
            <Card
              v-for="flight in filteredResults as FlightSearchResult[]"
              :key="flight.flightInstanceId"
              class="border-4 border-gray-900 rounded-none hover:shadow-lg transition-all duration-300"
            >
              <CardContent class="p-3">
                <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <!-- Flight Info -->
                  <div class="flex-1 w-full">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-10 h-10 bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <Plane class="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 class="text-base font-black text-gray-900">{{ flight.flightNumber }}</h3>
                        <p class="text-gray-600 font-bold text-xs">{{ flight.airline.name }}</p>
                      </div>
                    </div>

                    <div class="flex items-center gap-4">
                      <div class="text-center">
                        <div class="text-lg font-black text-gray-900">{{ flight.departureTime }}</div>
                        <div class="text-xs text-gray-600 font-bold">{{ flight.originAirport.iataCode }}</div>
                        <div class="text-xs text-gray-500 hidden sm:block">{{ flight.originAirport.city }}</div>
                      </div>

                      <div class="flex-1 text-center">
                        <div class="text-xs text-gray-600 font-bold mb-1">{{ flight.duration }}</div>
                        <div class="h-px bg-gray-300 relative">
                          <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-600 rotate-45"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1 hidden sm:block">{{ flight.aircraft.model }}</div>
                      </div>

                      <div class="text-center">
                        <div class="text-lg font-black text-gray-900">{{ flight.arrivalTime }}</div>
                        <div class="text-xs text-gray-600 font-bold">{{ flight.destinationAirport.iataCode }}</div>
                        <div class="text-xs text-gray-500 hidden sm:block">{{ flight.destinationAirport.city }}</div>
                      </div>
                    </div>
                  </div>

                  <!-- Price and Actions -->
                  <div class="text-center lg:text-right w-full lg:w-auto">
                    <div class="text-2xl font-black text-gray-900 mb-1">{{ formatPrice(flight.price) }}</div>
                    <div class="text-xs text-gray-600 font-bold mb-3">{{ flight.fareCode }} Fare</div>
                    <Button
                      @click="selectFlight(flight)"
                      class="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black px-6 py-2 text-xs"
                    >
                      Choose Fare
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Round-trip Results -->
          <div v-else-if="searchParams.tripType === 'round-trip'">
            <Card
              v-for="trip in filteredResults as RoundTripResult[]"
              :key="`${trip.outbound.flightInstanceId}-${trip.return?.flightInstanceId}`"
              class="border-4 border-gray-900 rounded-none hover:shadow-lg transition-all duration-300"
            >
              <CardContent class="p-3">
                <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <!-- Outbound Flight -->
                  <div class="flex-1 w-full">
                    <div class="mb-3">
                      <h4 class="text-sm font-black text-gray-900 mb-2 uppercase tracking-tight">Outbound</h4>
                      <div class="flex items-center gap-3 mb-2">
                        <div class="w-8 h-8 bg-blue-600 flex items-center justify-center flex-shrink-0">
                          <Plane class="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div class="font-black text-gray-900 text-sm">{{ trip.outbound.flightNumber }}</div>
                          <div class="text-xs text-gray-600 font-bold">{{ trip.outbound.airline.name }}</div>
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center gap-3 mb-4">
                      <div class="text-center">
                        <div class="text-base font-black text-gray-900">{{ trip.outbound.departureTime }}</div>
                        <div class="text-xs text-gray-600 font-bold">{{ trip.outbound.originAirport.iataCode }}</div>
                      </div>

                      <div class="flex-1 text-center">
                        <div class="text-xs text-gray-600 font-bold mb-1">{{ trip.outbound.duration }}</div>
                        <div class="h-px bg-gray-300 relative">
                          <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-600 rotate-45"></div>
                        </div>
                      </div>

                      <div class="text-center">
                        <div class="text-base font-black text-gray-900">{{ trip.outbound.arrivalTime }}</div>
                        <div class="text-xs text-gray-600 font-bold">{{ trip.outbound.destinationAirport.iataCode }}</div>
                      </div>
                    </div>

                    <!-- Return Flight -->
                    <div v-if="trip.return">
                      <h4 class="text-sm font-black text-gray-900 mb-2 uppercase tracking-tight">Return</h4>
                      <div class="flex items-center gap-3 mb-2">
                        <div class="w-8 h-8 bg-green-600 flex items-center justify-center flex-shrink-0">
                          <ArrowLeft class="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div class="font-black text-gray-900 text-sm">{{ trip.return.flightNumber }}</div>
                          <div class="text-xs text-gray-600 font-bold">{{ trip.return.airline.name }}</div>
                        </div>
                      </div>

                      <div class="flex items-center gap-3">
                        <div class="text-center">
                          <div class="text-base font-black text-gray-900">{{ trip.return.departureTime }}</div>
                          <div class="text-xs text-gray-600 font-bold">{{ trip.return.originAirport.iataCode }}</div>
                        </div>

                        <div class="flex-1 text-center">
                          <div class="text-xs text-gray-600 font-bold mb-1">{{ trip.return.duration }}</div>
                          <div class="h-px bg-gray-300 relative">
                            <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-green-600 rotate-45"></div>
                          </div>
                        </div>

                        <div class="text-center">
                          <div class="text-base font-black text-gray-900">{{ trip.return.arrivalTime }}</div>
                          <div class="text-xs text-gray-600 font-bold">{{ trip.return.destinationAirport.iataCode }}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Price and Actions -->
                  <div class="text-center lg:text-right w-full lg:w-auto">
                    <div class="text-2xl font-black text-gray-900 mb-1">{{ formatPrice(trip.totalPrice) }}</div>
                    <div class="text-xs text-gray-600 font-bold mb-3">Total Price</div>
                    <Button
                      @click="selectFlight(trip)"
                      class="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black px-6 py-2 text-xs"
                    >
                      Select Trip
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>

    <!-- Empty State (Initial or No Results) -->
    <section v-else class="py-12">
      <div class="max-w-4xl mx-auto px-3 text-center">
        <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Plane class="w-10 h-10 text-blue-600" />
        </div>

        <h2 class="text-2xl md:text-3xl font-black text-gray-900 mb-3">
          {{ totalResults === 0 && !isSearching ? 'No Flights Available' : 'Ready to Search' }}
        </h2>
        <p class="text-base text-gray-600 font-bold mb-6">
          {{ totalResults === 0 && !isSearching 
            ? 'We couldn\'t find any flights for your selected route and dates. Please try different options.' 
            : 'Enter your travel details above and click "Search Flights" to find available options.' 
          }}
        </p>

        <div v-if="totalResults === 0 && !isSearching" class="space-y-3">
          <div class="text-sm text-gray-500 font-bold space-y-2 max-w-md mx-auto">
            <p class="flex items-center justify-center gap-2">
              <span class="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              Try selecting different travel dates
            </p>
            <p class="flex items-center justify-center gap-2">
              <span class="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              Check if the route is available
            </p>
            <p class="flex items-center justify-center gap-2">
              <span class="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              Consider nearby airports
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />

    <!-- Bundle Selector Modal -->
    <div
      v-if="showBundleModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-3"
      @click.self="showBundleModal = false"
    >
      <div class="bg-white border-4 border-gray-900 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b-4 border-gray-900 p-3 flex justify-between items-start z-10">
          <div>
            <h2 class="text-xl md:text-2xl font-black text-gray-900">Choose Your Fare Bundle</h2>
            <p class="text-gray-600 font-bold mt-1 text-xs">Select the best option for your journey</p>
          </div>
          <button
            @click="showBundleModal = false"
            class="w-9 h-9 bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center transition-colors flex-shrink-0"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <div class="p-3">
          <FareBundleSelector
            :basePrice="selectedFlightForBundle && 'price' in selectedFlightForBundle ? selectedFlightForBundle.price : selectedFlightForBundle?.totalPrice || 0"
            :selectedBundle="selectedBundle"
            @select="handleBundleSelection"
          />

          <div class="mt-6 flex justify-end gap-3">
            <Button
              @click="showBundleModal = false"
              variant="outline"
              class="border-4 border-gray-900 rounded-none font-black h-10 px-6 text-xs"
            >
              Cancel
            </Button>
            <Button
              @click="proceedWithBundle"
              class="bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black h-10 px-6 text-xs"
            >
              Continue to Booking
              <ArrowRight class="w-3.5 h-3.5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
