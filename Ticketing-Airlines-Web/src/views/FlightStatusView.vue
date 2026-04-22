<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Search,
  Plane,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowRight,
  Shield,
  Radio,
  Navigation,
  CloudRain,
  Thermometer
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useFlightStore } from '@/stores/flightStore'
import { storeToRefs } from 'pinia'

// Store
const flightStore = useFlightStore()
const { flightStatus, isSearchingStatus, statusError } = storeToRefs(flightStore)

// Reactive state
const currentTime = ref(new Date())

const searchForm = reactive({
  flightNumber: '',
  date: ''
})

// Update current time every minute
let timeInterval: ReturnType<typeof setInterval>

onMounted(() => {
  timeInterval = setInterval(() => {
    currentTime.value = new Date()
  }, 60000) // Update every minute
})

onUnmounted(() => {
  clearInterval(timeInterval)
})

// Computed properties
const statusColor = computed(() => {
  if (!flightStatus.value) return 'gray'
  switch (flightStatus.value.status.toLowerCase()) {
    case 'on time':
    case 'scheduled':
      return 'green'
    case 'delayed':
      return 'yellow'
    case 'cancelled':
      return 'red'
    case 'departed':
      return 'blue'
    case 'arrived':
      return 'green'
    default:
      return 'gray'
  }
})

const statusIcon = computed(() => {
  if (!flightStatus.value) return AlertCircle
  switch (flightStatus.value.status.toLowerCase()) {
    case 'on time':
    case 'scheduled':
    case 'arrived':
      return CheckCircle
    case 'delayed':
      return Clock
    case 'cancelled':
      return XCircle
    case 'departed':
      return Plane
    default:
      return AlertCircle
  }
})

const formattedCurrentTime = computed(() => {
  return currentTime.value.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
})

// Methods
const searchFlight = async () => {
  if (searchForm.flightNumber && searchForm.date) {
    await flightStore.searchFlightStatus(searchForm.flightNumber, searchForm.date)
  }
}

// Recent searches mock data (could be moved to store or local storage later)
const recentSearches = ref([
  { flightNumber: 'SS 101', date: 'Oct 16, 2025', status: 'Scheduled' },
  { flightNumber: 'SS 201', date: 'Oct 16, 2025', status: 'Delayed' },
  { flightNumber: 'SS 301', date: 'Oct 15, 2025', status: 'Arrived' }
])
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-16 lg:py-20 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div class="relative container mx-auto px-4 text-center z-10 pt-4">
        <div class="inline-flex items-center rounded-full px-3 py-1.5 mb-3" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
          <Radio class="w-3.5 h-3.5 mr-2 text-white" />
          <span class="font-semibold text-xs text-white">Real-time Updates</span>
        </div>
        <h1 class="text-3xl lg:text-4xl font-bold mb-3 leading-tight">
          Flight Status
        </h1>
        <p class="text-base lg:text-lg text-white/90 max-w-2xl mx-auto font-medium">
          Track your flight in real-time with live updates
        </p>

        <!-- Live Time Display -->
        <div class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20">
          <Clock class="w-4 h-4 text-green-400" />
          <span class="text-lg font-black tracking-wider">{{ formattedCurrentTime }}</span>
          <div class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>

    <div class="container mx-auto px-4 -mt-12 relative z-20 pb-12">
      <!-- Search Section - Split Design -->
      <div class="max-w-5xl mx-auto mb-12">
        <div class="grid lg:grid-cols-12 gap-0 shadow-2xl">
          <!-- Left Side - Dark Panel -->
          <div class="lg:col-span-4 bg-gray-900 p-6 relative overflow-hidden">
            <!-- Animated Background Pattern -->
            <div class="absolute inset-0 opacity-5">
              <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #fff 20px, #fff 21px);"></div>
            </div>

            <div class="relative z-10">
              <div class="w-12 h-12 bg-green-600 flex items-center justify-center mb-4">
                <Navigation class="w-6 h-6 text-white" />
              </div>
              <h2 class="text-2xl font-black text-white mb-3 uppercase tracking-tight">Track Flight</h2>
              <p class="text-gray-400 font-semibold mb-4 text-sm">Enter flight details to get real-time status</p>

              <!-- Status Indicators -->
              <div class="space-y-2 mt-6">
                <div class="flex items-center gap-2">
                  <div class="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                  <span class="text-gray-400 text-xs font-bold uppercase tracking-widest">On Time</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                  <span class="text-gray-400 text-xs font-bold uppercase tracking-widest">Delayed</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                  <span class="text-gray-400 text-xs font-bold uppercase tracking-widest">Departed</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                  <span class="text-gray-400 text-xs font-bold uppercase tracking-widest">Cancelled</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side - Form Panel -->
          <div class="lg:col-span-8 bg-white p-6">
            <form @submit.prevent="searchFlight" class="space-y-4">
              <div class="space-y-4">
                <!-- Flight Number -->
                <div>
                  <Label for="flightNumber" class="text-xs font-black text-gray-900 uppercase tracking-widest mb-2 block">
                    Flight Number
                  </Label>
                  <Input
                    id="flightNumber"
                    v-model="searchForm.flightNumber"
                    placeholder="SS 101"
                    class="h-12 text-lg font-bold border-0 border-b-4 border-gray-900 rounded-none bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-0 transition-all uppercase tracking-widest"
                    required
                  />
                </div>

                <!-- Date -->
                <div>
                  <Label for="date" class="text-xs font-black text-gray-900 uppercase tracking-widest mb-2 block">
                    Flight Date
                  </Label>
                  <Input
                    id="date"
                    v-model="searchForm.date"
                    type="date"
                    class="h-12 text-lg font-bold border-0 border-b-4 border-gray-900 rounded-none bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-0 transition-all uppercase"
                    required
                  />
                </div>
              </div>

              <!-- Search Button -->
              <Button type="submit" :disabled="isSearchingStatus" class="w-full h-14 text-base font-black bg-gray-900 text-white hover:bg-green-600 transition-all duration-300 uppercase tracking-widest relative overflow-hidden group disabled:opacity-50">
                <div class="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <div class="flex items-center justify-center gap-3 relative z-10">
                  <Search v-if="!isSearchingStatus" class="w-5 h-5" />
                  <div v-else class="flex gap-1">
                    <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                    <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                    <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                  </div>
                  <span>{{ isSearchingStatus ? 'Searching...' : 'Track Flight' }}</span>
                  <ArrowRight v-if="!isSearchingStatus" class="w-5 h-5" />
                </div>
              </Button>

              <!-- Error Message -->
              <div v-if="statusError" class="p-4 bg-red-50 border-l-4 border-red-600 text-red-700 font-bold flex items-center gap-3">
                <AlertCircle class="w-5 h-5" />
                {{ statusError }}
              </div>

              <!-- Info Strip -->
              <div class="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                <Shield class="w-4 h-4 text-green-600" />
                <span class="font-bold">Real-time flight tracking powered by live data</span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Flight Status Results -->
      <div v-if="flightStatus" class="max-w-6xl mx-auto space-y-6">
        <!-- Status Header -->
        <div class="bg-gradient-to-r from-gray-900 to-green-900 p-6 shadow-2xl relative overflow-hidden">
          <!-- Decorative Pattern -->
          <div class="absolute inset-0 opacity-5">
            <div class="absolute top-0 left-0 right-0 h-px bg-white"></div>
            <div class="absolute bottom-0 left-0 right-0 h-px bg-white"></div>
          </div>

          <div class="relative flex flex-wrap items-center justify-between gap-3">
            <div>
              <div class="text-xs text-green-300 font-black uppercase tracking-widest mb-1">Flight Information</div>
              <div class="flex items-center gap-3 flex-wrap">
                <h2 class="text-3xl font-black text-white tracking-tight">{{ flightStatus.flightNumber }}</h2>
                <div class="h-8 w-px bg-white/30"></div>
                <div class="text-white/80 text-base font-semibold">{{ flightStatus.date }}</div>
              </div>
              <div class="text-white/70 text-sm font-bold mt-1">{{ flightStatus.airline }} • {{ flightStatus.aircraft }}</div>
            </div>
            <div class="flex items-center gap-2">
              <component
                :is="statusIcon"
                class="w-6 h-6"
                :class="{
                  'text-green-400': statusColor === 'green',
                  'text-yellow-400': statusColor === 'yellow',
                  'text-red-400': statusColor === 'red',
                  'text-blue-400': statusColor === 'blue',
                  'text-gray-400': statusColor === 'gray'
                }"
              />
              <div
                class="px-4 py-2 font-black text-base uppercase tracking-wide"
                :class="{
                  'bg-green-500': statusColor === 'green',
                  'bg-yellow-500': statusColor === 'yellow',
                  'bg-red-500': statusColor === 'red',
                  'bg-blue-500': statusColor === 'blue',
                  'bg-gray-500': statusColor === 'gray'
                }"
              >
                {{ flightStatus.status }}
              </div>
            </div>
          </div>
        </div>

        <!-- Flight Timeline -->
        <div class="bg-white shadow-2xl p-4 lg:p-6 relative">
          <!-- Timeline Header -->
          <div class="mb-4">
            <h3 class="text-lg lg:text-xl font-black text-gray-900 uppercase tracking-tight mb-1">Flight Timeline</h3>
            <p class="text-gray-600 font-semibold text-xs lg:text-sm">Track your journey from departure to arrival</p>
          </div>

          <!-- Timeline Visual -->
          <div class="relative">
            <!-- Timeline Line -->
            <div class="absolute top-12 lg:top-16 left-0 right-0 h-1 lg:h-1.5 bg-gray-200">
              <div class="h-full bg-gradient-to-r from-blue-600 to-green-600" style="width: 65%;"></div>
            </div>

            <div class="grid lg:grid-cols-2 gap-6 lg:gap-8 relative">
              <!-- Departure -->
              <div class="relative">
                <!-- Connection Point -->
                <div class="absolute -top-2 left-0 w-6 h-6 lg:w-8 lg:h-8 bg-blue-600 border-4 border-white shadow-lg z-10"></div>

                <div class="pt-8 lg:pt-12">
                  <div class="mb-2 lg:mb-4">
                    <span class="text-xs font-black text-blue-600 uppercase tracking-widest">Departure</span>
                  </div>

                  <!-- Airport Info -->
                  <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-3 lg:p-6 mb-2 lg:mb-4 border-l-4 border-blue-600">
                    <div class="flex items-start justify-between mb-2 lg:mb-4">
                      <div>
                        <div class="text-3xl lg:text-5xl font-black text-gray-900 mb-1">{{ flightStatus.departure.code }}</div>
                        <div class="text-sm lg:text-lg font-bold text-gray-700">{{ flightStatus.departure.airport }}</div>
                      </div>
                      <Plane class="w-6 h-6 lg:w-10 lg:h-10 text-blue-600" />
                    </div>

                    <div class="space-y-1 lg:space-y-2">
                      <div class="flex justify-between items-center py-1 lg:py-2 border-t border-blue-200">
                        <span class="text-xs font-bold text-gray-600 uppercase tracking-widest">Terminal</span>
                        <span class="text-sm font-black text-gray-900">{{ flightStatus.departure.terminal }}</span>
                      </div>
                      <div class="flex justify-between items-center py-1 lg:py-2 border-t border-blue-200">
                        <span class="text-xs font-bold text-gray-600 uppercase tracking-widest">Gate</span>
                        <span class="text-sm font-black text-gray-900">{{ flightStatus.departure.gate }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Time Details -->
                  <div class="space-y-2 lg:space-y-3">
                    <div class="bg-white border-2 border-gray-900 p-2 lg:p-4">
                      <div class="text-xs font-black text-gray-600 uppercase tracking-widest mb-1 lg:mb-2">Scheduled</div>
                      <div class="text-2xl lg:text-3xl font-black text-gray-900">{{ flightStatus.departure.scheduledTime }}</div>
                    </div>
                    <div class="bg-blue-600 p-2 lg:p-4">
                      <div class="text-xs font-black text-blue-200 uppercase tracking-widest mb-1 lg:mb-2">Actual Departure</div>
                      <div class="text-2xl lg:text-3xl font-black text-white">{{ flightStatus.departure.actualTime || '--:--' }}</div>
                    </div>
                  </div>

                  <!-- Weather -->
                  <div class="mt-2 lg:mt-4 flex items-center gap-2 text-xs lg:text-sm text-gray-600 font-semibold">
                    <Thermometer class="w-3 h-3 lg:w-4 lg:h-4" />
                    <span>{{ flightStatus.weather.departure.temp }} • {{ flightStatus.weather.departure.condition }}</span>
                  </div>
                </div>
              </div>

              <!-- Arrival -->
              <div class="relative">
                <!-- Connection Point -->
                <div class="absolute -top-2 left-0 w-6 h-6 lg:w-8 lg:h-8 bg-green-600 border-4 border-white shadow-lg z-10"></div>

                <div class="pt-8 lg:pt-12">
                  <div class="mb-2 lg:mb-4">
                    <span class="text-xs font-black text-green-600 uppercase tracking-widest">Arrival</span>
                  </div>

                  <!-- Airport Info -->
                  <div class="bg-gradient-to-br from-green-50 to-green-100 p-3 lg:p-6 mb-2 lg:mb-4 border-l-4 border-green-600">
                    <div class="flex items-start justify-between mb-2 lg:mb-4">
                      <div>
                        <div class="text-3xl lg:text-5xl font-black text-gray-900 mb-1">{{ flightStatus.arrival.code }}</div>
                        <div class="text-sm lg:text-lg font-bold text-gray-700">{{ flightStatus.arrival.airport }}</div>
                      </div>
                      <MapPin class="w-6 h-6 lg:w-10 lg:h-10 text-green-600" />
                    </div>

                    <div class="space-y-1 lg:space-y-2">
                      <div class="flex justify-between items-center py-1 lg:py-2 border-t border-green-200">
                        <span class="text-xs font-bold text-gray-600 uppercase tracking-widest">Terminal</span>
                        <span class="text-sm font-black text-gray-900">{{ flightStatus.arrival.terminal }}</span>
                      </div>
                      <div class="flex justify-between items-center py-1 lg:py-2 border-t border-green-200">
                        <span class="text-xs font-bold text-gray-600 uppercase tracking-widest">Gate</span>
                        <span class="text-sm font-black text-gray-900">{{ flightStatus.arrival.gate }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Time Details -->
                  <div class="space-y-2 lg:space-y-3">
                    <div class="bg-white border-2 border-gray-900 p-2 lg:p-4">
                      <div class="text-xs font-black text-gray-600 uppercase tracking-widest mb-1 lg:mb-2">Scheduled</div>
                      <div class="text-2xl lg:text-3xl font-black text-gray-900">{{ flightStatus.arrival.scheduledTime }}</div>
                    </div>
                    <div class="bg-green-600 p-2 lg:p-4">
                      <div class="text-xs font-black text-green-200 uppercase tracking-widest mb-1 lg:mb-2">Estimated Arrival</div>
                      <div class="text-2xl lg:text-3xl font-black text-white">{{ flightStatus.arrival.estimatedTime }}</div>
                    </div>
                  </div>

                  <!-- Weather -->
                  <div class="mt-2 lg:mt-4 flex items-center gap-2 text-xs lg:text-sm text-gray-600 font-semibold">
                    <CloudRain class="w-3 h-3 lg:w-4 lg:h-4" />
                    <span>{{ flightStatus.weather.arrival.temp }} • {{ flightStatus.weather.arrival.condition }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Duration Badge -->
            <div class="absolute top-10 lg:top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div class="bg-gray-900 px-3 py-1.5 lg:px-6 lg:py-3 shadow-2xl">
                <div class="flex items-center gap-1.5 lg:gap-2">
                  <Clock class="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  <span class="text-white font-black text-sm lg:text-lg">{{ flightStatus.duration }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="grid md:grid-cols-3 gap-4">
          <!-- Aircraft Info -->
          <div class="bg-white shadow-xl p-4 border-t-4 border-blue-600">
            <div class="w-10 h-10 bg-blue-100 flex items-center justify-center mb-3">
              <Plane class="w-5 h-5 text-blue-600" />
            </div>
            <h4 class="text-xs font-black text-gray-600 uppercase tracking-widest mb-1">Aircraft</h4>
            <p class="text-lg font-black text-gray-900">{{ flightStatus.aircraft }}</p>
          </div>

          <!-- Flight Duration -->
          <div class="bg-white shadow-xl p-4 border-t-4 border-green-600">
            <div class="w-10 h-10 bg-green-100 flex items-center justify-center mb-3">
              <Clock class="w-5 h-5 text-green-600" />
            </div>
            <h4 class="text-xs font-black text-gray-600 uppercase tracking-widest mb-1">Duration</h4>
            <p class="text-lg font-black text-gray-900">{{ flightStatus.duration }}</p>
          </div>

          <!-- Status Update -->
          <div class="bg-white shadow-xl p-4 border-t-4 border-purple-600">
            <div class="w-10 h-10 bg-purple-100 flex items-center justify-center mb-3">
              <Radio class="w-5 h-5 text-purple-600" />
            </div>
            <h4 class="text-xs font-black text-gray-600 uppercase tracking-widest mb-1">Last Updated</h4>
            <p class="text-lg font-black text-gray-900">{{ formattedCurrentTime }}</p>
          </div>
        </div>
      </div>

      <!-- Recent Searches - Ticket Stub Style -->
      <div v-if="!flightStatus" class="max-w-6xl mx-auto">
        <div class="mb-8">
          <div class="flex items-center gap-3 mb-2">
            <div class="flex gap-1">
              <div class="w-2 h-2 bg-gray-900"></div>
              <div class="w-2 h-2 bg-green-600"></div>
              <div class="w-2 h-2 bg-gray-900"></div>
            </div>
            <h3 class="text-2xl lg:text-4xl font-black text-gray-900 uppercase tracking-tighter">Recent Searches</h3>
          </div>
          <div class="flex items-center gap-2 ml-6">
            <div class="h-px w-12 bg-gray-900"></div>
            <p class="text-gray-600 font-bold text-xs uppercase tracking-wide">Jump back to your tracked flights</p>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="(flight, index) in recentSearches"
            :key="index"
            class="relative group cursor-pointer"
          >
            <!-- Card Container with Ticket Perforation -->
            <div class="relative bg-white overflow-hidden transition-all duration-300 group-hover:-translate-y-2">
              <!-- Top Section - Color Coded -->
              <div
                class="p-6 relative"
                :class="{
                  'bg-gradient-to-br from-green-500 to-green-600': flight.status === 'On Time' || flight.status === 'Arrived' || flight.status === 'Scheduled',
                  'bg-gradient-to-br from-yellow-500 to-yellow-600': flight.status === 'Delayed',
                  'bg-gradient-to-br from-blue-500 to-blue-600': flight.status === 'Departed'
                }"
              >
                <!-- Corner Cut -->
                <div class="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-white border-l-[40px] border-l-transparent"></div>

                <!-- Flight Number Display -->
                <div class="relative">
                  <div class="text-xs font-black text-white/70 uppercase tracking-widest mb-1">Flight</div>
                  <div class="text-4xl font-black text-white tracking-tight mb-1" style="font-variant-numeric: tabular-nums;">
                    {{ flight.flightNumber }}
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="h-px flex-1 bg-white/30"></div>
                    <Plane class="w-5 h-5 text-white transform -rotate-45" />
                  </div>
                </div>
              </div>

              <!-- Perforation Line -->
              <div class="relative h-4 bg-gray-50">
                <div class="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-1">
                  <div v-for="i in 12" :key="i" class="w-1 h-1 bg-gray-300 rounded-full"></div>
                </div>
                <!-- Side Circles for Tear Effect -->
                <div class="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-100 rounded-full border-2 border-gray-50"></div>
                <div class="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-100 rounded-full border-2 border-gray-50"></div>
              </div>

              <!-- Bottom Section - Info -->
              <div class="p-6 bg-white">
                <!-- Date with Icon -->
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 bg-gray-900 flex items-center justify-center">
                    <Clock class="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div class="text-xs font-bold text-gray-500 uppercase tracking-widest">Date</div>
                    <div class="text-sm font-black text-gray-900">{{ flight.date }}</div>
                  </div>
                </div>

                <!-- Status Badge -->
                <div class="relative">
                  <div
                    class="inline-flex items-center gap-2 px-4 py-2 font-black text-xs uppercase tracking-widest transform -skew-x-6"
                    :class="{
                      'bg-green-600 text-white': flight.status === 'On Time' || flight.status === 'Arrived' || flight.status === 'Scheduled',
                      'bg-yellow-600 text-white': flight.status === 'Delayed',
                      'bg-blue-600 text-white': flight.status === 'Departed'
                    }"
                  >
                    <div class="w-2 h-2 bg-white rounded-full"></div>
                    <span>{{ flight.status }}</span>
                  </div>
                </div>

                <!-- Quick Action Hint -->
                <div class="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-xs">
                  <span class="text-gray-500 font-bold uppercase tracking-wider">Track Again</span>
                  <ArrowRight class="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>

            <!-- Shadow Layers -->
            <div
              class="absolute top-1 left-1 w-full h-full -z-10 transition-all duration-300 group-hover:top-2 group-hover:left-2"
              :class="{
                'bg-green-600': flight.status === 'On Time' || flight.status === 'Arrived' || flight.status === 'Scheduled',
                'bg-yellow-600': flight.status === 'Delayed',
                'bg-blue-600': flight.status === 'Departed'
              }"
            ></div>
            <div class="absolute top-2 left-2 w-full h-full bg-black -z-20"></div>

            <!-- Index Badge -->
            <div class="absolute -top-3 -left-3 w-8 h-8 bg-gray-900 border-4 border-gray-100 flex items-center justify-center z-10 transform rotate-12 group-hover:rotate-0 transition-transform">
              <span class="text-white font-black text-xs">{{ index + 1 }}</span>
            </div>
          </div>
        </div>

        <!-- Empty State Message -->
        <div class="mt-8 text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white">
            <Search class="w-4 h-4" />
            <span class="font-black text-xs lg:text-sm uppercase tracking-wider">Search for flights to build your history</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

