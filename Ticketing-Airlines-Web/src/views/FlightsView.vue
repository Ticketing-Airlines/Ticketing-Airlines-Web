<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Plane,  
  MapPin,  
  Search,
  ArrowLeft,
  Filter,
  SortAsc,
  SortDesc,
  X,
  AlertCircle,
  Loader2
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import type { 
  FlightSearchParams, 
  FlightSearchResult, 
  RoundTripResult, 
  MultiCityResult,
  Airport 
} from '@/interfaces/interfaces'
import { airports } from '@/data/mockData'
import { useFlightStore } from '@/stores/flightStore'
import { useBookingStore } from '@/stores/bookingStore'

const route = useRoute()
const router = useRouter()
const flightStore = useFlightStore()
const bookingStore = useBookingStore()

// Store state
const { searchParams, searchResults, totalResults, isSearching } = storeToRefs(flightStore)

// Local UI state
const showFilters = ref(false)
const sortOrder = ref<'asc' | 'desc'>('asc')

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

const isFormValid = computed(() => {
  return searchParams.value.from &&
         searchParams.value.to &&
         searchParams.value.departureDate &&
         (searchParams.value.tripType === 'one-way' || searchParams.value.returnDate)
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
onMounted(() => {
  const { from, to, departure, return: returnDate, passengers, type } = route.query
  
  if (from && to && departure) {
    const params: FlightSearchParams = {
      from: from as string,
      to: to as string,
      departureDate: new Date(departure as string),
      returnDate: returnDate ? new Date(returnDate as string) : null,
      passengers: parseInt(passengers as string || '1'),
      tripType: (type as 'one-way' | 'round-trip' | 'multi-city') || 'round-trip'
    }
    
    flightStore.setSearchParams(params)
    
    // Auto-search if we have the required params
    if (isFormValid.value) {
      flightStore.searchFlights()
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
  console.log('Selected flight:', result)
  bookingStore.initBooking(result, searchParams.value.passengers)
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
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Search Form Section -->
    <section class="bg-white border-b-4 border-gray-900 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- Back Button -->
        <Button
          @click="router.push('/')"
          variant="ghost"
          class="mb-6 text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-bold"
        >
          <ArrowLeft class="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <!-- Trip Type Selection -->
        <div class="flex flex-wrap gap-3 mb-6">
          <button
            v-for="type in ['round-trip', 'one-way', 'multi-city']"
            :key="type"
            @click="searchParams.tripType = type as any"
            :class="[
              'px-6 py-3 font-black text-sm uppercase tracking-wider border-4 transition-all duration-300 whitespace-nowrap',
              searchParams.tripType === type
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-900 border-gray-900 hover:bg-gray-50'
            ]"
          >
            {{ type.replace('-', ' ') }}
          </button>
        </div>

        <!-- Search Form -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <!-- From -->
          <div>
            <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">From</Label>
            <Select v-model="searchParams.from">
              <SelectTrigger class="h-12 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600">
                <div class="flex items-center gap-2">
                  <MapPin class="w-4 h-4 text-gray-600" />
                  <SelectValue placeholder="Select departure city" />
                </div>
              </SelectTrigger>
              <SelectContent class="border-4 border-gray-900 rounded-none">
                <ScrollArea class="h-60">
                  <SelectItem v-for="airport in airports" :key="airport.iataCode" :value="airport.iataCode">
                    {{ airport.city }} ({{ airport.iataCode }})
                  </SelectItem>
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>

          <!-- To -->
          <div>
            <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">To</Label>
            <Select v-model="searchParams.to">
              <SelectTrigger class="h-12 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600">
                <div class="flex items-center gap-2">
                  <MapPin class="w-4 h-4 text-gray-600" />
                  <SelectValue placeholder="Select destination city" />
                </div>
              </SelectTrigger>
              <SelectContent class="border-4 border-gray-900 rounded-none">
                <ScrollArea class="h-60">
                  <SelectItem v-for="airport in airports" :key="airport.iataCode" :value="airport.iataCode">
                    {{ airport.city }} ({{ airport.iataCode }})
                  </SelectItem>
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>

          <!-- Departure Date -->
          <div>
            <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Departure</Label>
            <Input
              v-model="departureDateString"
              type="date"
              class="h-12 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
              :min="today"
            />
          </div>

          <!-- Return Date -->
          <div v-if="searchParams.tripType === 'round-trip'">
            <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Return</Label>
            <Input
              v-model="returnDateString"
              type="date"
              class="h-12 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
              :min="departureDateString"
            />
          </div>

          <!-- Passengers -->
          <div v-if="searchParams.tripType !== 'round-trip'">
            <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Passengers</Label>
            <Select v-model="searchParams.passengers">
              <SelectTrigger class="h-12 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent class="border-4 border-gray-900 rounded-none">
                <SelectItem v-for="i in 9" :key="i" :value="i.toString()">
                  {{ i }} {{ i === 1 ? 'Passenger' : 'Passengers' }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Search Button -->
        <Button
          @click="handleSearch"
          :disabled="!isFormValid || isSearching"
          class="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black text-lg uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3"
        >
          <Loader2 v-if="isSearching" class="w-5 h-5 animate-spin" />
          <Search v-else class="w-5 h-5" />
          <span>{{ isSearching ? 'Searching...' : 'Search Flights' }}</span>
        </Button>
      </div>
    </section>

    <!-- Results Section -->
    <section v-if="searchResults.length > 0" class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Results Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 class="text-3xl font-black text-gray-900 mb-2">
              {{ totalResults }} Flight{{ totalResults !== 1 ? 's' : '' }} Found
            </h2>
            <p class="text-gray-600 font-bold">
              {{ getAirportByCode(searchParams.from)?.city }} → {{ getAirportByCode(searchParams.to)?.city }}
            </p>
          </div>
          
          <div class="flex gap-3 mt-4 sm:mt-0">
            <Button
              @click="showFilters = !showFilters"
              variant="outline"
              class="border-4 border-gray-900 rounded-none font-black"
            >
              <Filter class="w-4 h-4 mr-2" />
              Filters
            </Button>
            
            <Button
              @click="toggleSort"
              variant="outline"
              class="border-4 border-gray-900 rounded-none font-black"
            >
              <SortAsc v-if="sortOrder === 'asc'" class="w-4 h-4 mr-2" />
              <SortDesc v-else class="w-4 h-4 mr-2" />
              Sort by Price
            </Button>
          </div>
        </div>

        <!-- Filters Panel -->
        <div v-if="showFilters" class="bg-white border-4 border-gray-900 p-6 mb-8">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-black text-gray-900">Filters</h3>
            <Button @click="clearFilters" variant="ghost" class="text-gray-600 hover:text-gray-900">
              <X class="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Price Range -->
            <div>
              <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Price Range</Label>
              <div class="flex gap-2">
                <Input
                  v-model.number="filters.priceRange[0]"
                  type="number"
                  placeholder="Min"
                  class="border-4 border-gray-900 rounded-none"
                />
                <Input
                  v-model.number="filters.priceRange[1]"
                  type="number"
                  placeholder="Max"
                  class="border-4 border-gray-900 rounded-none"
                />
              </div>
            </div>
            
            <!-- Departure Time -->
            <div>
              <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Departure Time</Label>
              <div class="space-y-2">
                <label v-for="time in ['Morning', 'Afternoon', 'Evening', 'Night']" :key="time" class="flex items-center">
                  <input type="checkbox" class="mr-2" />
                  <span class="font-bold">{{ time }}</span>
                </label>
              </div>
            </div>
            
            <!-- Duration -->
            <div>
              <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Duration</Label>
              <div class="space-y-2">
                <label v-for="duration in ['Under 2h', '2-4h', '4-6h', 'Over 6h']" :key="duration" class="flex items-center">
                  <input type="checkbox" class="mr-2" />
                  <span class="font-bold">{{ duration }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Flight Results -->
        <div class="space-y-4">
          <!-- One-way Results -->
          <div v-if="searchParams.tripType === 'one-way'">
            <Card
              v-for="flight in filteredResults as FlightSearchResult[]"
              :key="flight.flightInstanceId"
              class="border-4 border-gray-900 rounded-none hover:shadow-lg transition-all duration-300"
            >
              <CardContent class="p-6">
                <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  <!-- Flight Info -->
                  <div class="flex-1">
                    <div class="flex items-center gap-4 mb-4">
                      <div class="w-12 h-12 bg-blue-600 flex items-center justify-center">
                        <Plane class="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 class="text-xl font-black text-gray-900">{{ flight.flightNumber }}</h3>
                        <p class="text-gray-600 font-bold">{{ flight.airline.name }}</p>
                      </div>
                    </div>
                    
                    <div class="flex items-center gap-8">
                      <div class="text-center">
                        <div class="text-2xl font-black text-gray-900">{{ flight.departureTime }}</div>
                        <div class="text-sm text-gray-600 font-bold">{{ flight.originAirport.iataCode }}</div>
                        <div class="text-xs text-gray-500">{{ flight.originAirport.city }}</div>
                      </div>
                      
                      <div class="flex-1 text-center">
                        <div class="text-sm text-gray-600 font-bold mb-1">{{ flight.duration }}</div>
                        <div class="h-px bg-gray-300 relative">
                          <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rotate-45"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">{{ flight.aircraft.model }}</div>
                      </div>
                      
                      <div class="text-center">
                        <div class="text-2xl font-black text-gray-900">{{ flight.arrivalTime }}</div>
                        <div class="text-sm text-gray-600 font-bold">{{ flight.destinationAirport.iataCode }}</div>
                        <div class="text-xs text-gray-500">{{ flight.destinationAirport.city }}</div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Price and Actions -->
                  <div class="text-center lg:text-right">
                    <div class="text-3xl font-black text-gray-900 mb-2">{{ formatPrice(flight.price) }}</div>
                    <div class="text-sm text-gray-600 font-bold mb-4">{{ flight.fareCode }} Fare</div>
                    <Button
                      @click="selectFlight(flight)"
                      class="bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black px-8 py-3"
                    >
                      Select Flight
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
              <CardContent class="p-6">
                <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  <!-- Outbound Flight -->
                  <div class="flex-1">
                    <div class="mb-4">
                      <h4 class="text-lg font-black text-gray-900 mb-2">Outbound Flight</h4>
                      <div class="flex items-center gap-4">
                        <div class="w-10 h-10 bg-blue-600 flex items-center justify-center">
                          <Plane class="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div class="font-black text-gray-900">{{ trip.outbound.flightNumber }}</div>
                          <div class="text-sm text-gray-600 font-bold">{{ trip.outbound.airline.name }}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="flex items-center gap-6">
                      <div class="text-center">
                        <div class="text-xl font-black text-gray-900">{{ trip.outbound.departureTime }}</div>
                        <div class="text-sm text-gray-600 font-bold">{{ trip.outbound.originAirport.iataCode }}</div>
                      </div>
                      
                      <div class="flex-1 text-center">
                        <div class="text-sm text-gray-600 font-bold mb-1">{{ trip.outbound.duration }}</div>
                        <div class="h-px bg-gray-300 relative">
                          <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rotate-45"></div>
                        </div>
                      </div>
                      
                      <div class="text-center">
                        <div class="text-xl font-black text-gray-900">{{ trip.outbound.arrivalTime }}</div>
                        <div class="text-sm text-gray-600 font-bold">{{ trip.outbound.destinationAirport.iataCode }}</div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Return Flight -->
                  <div v-if="trip.return" class="flex-1">
                    <div class="mb-4">
                      <h4 class="text-lg font-black text-gray-900 mb-2">Return Flight</h4>
                      <div class="flex items-center gap-4">
                        <div class="w-10 h-10 bg-green-600 flex items-center justify-center">
                          <ArrowLeft class="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div class="font-black text-gray-900">{{ trip.return.flightNumber }}</div>
                          <div class="text-sm text-gray-600 font-bold">{{ trip.return.airline.name }}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="flex items-center gap-6">
                      <div class="text-center">
                        <div class="text-xl font-black text-gray-900">{{ trip.return.departureTime }}</div>
                        <div class="text-sm text-gray-600 font-bold">{{ trip.return.originAirport.iataCode }}</div>
                      </div>
                      
                      <div class="flex-1 text-center">
                        <div class="text-sm text-gray-600 font-bold mb-1">{{ trip.return.duration }}</div>
                        <div class="h-px bg-gray-300 relative">
                          <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-600 rotate-45"></div>
                        </div>
                      </div>
                      
                      <div class="text-center">
                        <div class="text-xl font-black text-gray-900">{{ trip.return.arrivalTime }}</div>
                        <div class="text-sm text-gray-600 font-bold">{{ trip.return.destinationAirport.iataCode }}</div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Price and Actions -->
                  <div class="text-center lg:text-right">
                    <div class="text-3xl font-black text-gray-900 mb-2">{{ formatPrice(trip.totalPrice) }}</div>
                    <div class="text-sm text-gray-600 font-bold mb-4">Total Price</div>
                    <Button
                      @click="selectFlight(trip)"
                      class="bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black px-8 py-3"
                    >
                      Select Trip
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Multi-city Results -->
          <div v-else-if="searchParams.tripType === 'multi-city'">
            <Card
              v-for="trip in filteredResults as MultiCityResult[]"
              :key="trip.segments.map(s => s.flightInstanceId).join('-')"
              class="border-4 border-gray-900 rounded-none hover:shadow-lg transition-all duration-300"
            >
              <CardContent class="p-6">
                <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  <!-- Segments -->
                  <div class="flex-1">
                    <h4 class="text-lg font-black text-gray-900 mb-4">Multi-City Trip</h4>
                    <div class="space-y-4">
                      <div
                        v-for="(segment, index) in trip.segments"
                        :key="segment.flightInstanceId"
                        class="flex items-center gap-4"
                      >
                        <div class="w-8 h-8 bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                          {{ index + 1 }}
                        </div>
                        <div class="flex-1">
                          <div class="font-black text-gray-900">{{ segment.flightNumber }}</div>
                          <div class="text-sm text-gray-600 font-bold">{{ segment.originAirport.iataCode }} → {{ segment.destinationAirport.iataCode }}</div>
                          <div class="text-xs text-gray-500">{{ segment.departureTime }} - {{ segment.arrivalTime }} ({{ segment.duration }})</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Price and Actions -->
                  <div class="text-center lg:text-right">
                    <div class="text-3xl font-black text-gray-900 mb-2">{{ formatPrice(trip.totalPrice) }}</div>
                    <div class="text-sm text-gray-600 font-bold mb-4">Total Price</div>
                    <Button
                      @click="selectFlight(trip)"
                      class="bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black px-8 py-3"
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

    <!-- Empty State -->
    <section v-else-if="!isSearching && searchResults.length === 0" class="py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
          <AlertCircle class="w-12 h-12 text-gray-400" />
        </div>
        
        <h2 class="text-4xl font-black text-gray-900 mb-4">No Flights Found</h2>
        <p class="text-xl text-gray-600 font-bold mb-8">
          We couldn't find any flights matching your search criteria. Try adjusting your search parameters.
        </p>
        
        <div class="space-y-4">
          <Button
            @click="handleSearch"
            class="bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black px-8 py-3"
          >
            <Search class="w-5 h-5 mr-2" />
            Try Different Dates
          </Button>
          
          <div class="text-sm text-gray-500 font-bold">
            <p>• Try searching for nearby airports</p>
            <p>• Check different departure dates</p>
            <p>• Consider flexible travel dates</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>