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

// Reactive state
const flightFound = ref(false)
const isSearching = ref(false)
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

// Mock flight status data
const flightStatus = ref({
  flightNumber: '5J 561',
  airline: 'Cebu Pacific',
  date: 'February 15, 2024',
  status: 'On Time',
  departure: {
    airport: 'Manila',
    code: 'MNL',
    terminal: 'Terminal 3',
    gate: 'Gate 24',
    scheduledTime: '06:00',
    estimatedTime: '06:00',
    actualTime: '06:05'
  },
  arrival: {
    airport: 'Cebu',
    code: 'CEB',
    terminal: 'Terminal 1',
    gate: 'Gate 8',
    scheduledTime: '07:25',
    estimatedTime: '07:30',
    actualTime: null
  },
  aircraft: 'Airbus A320',
  duration: '1h 25m',
  weather: {
    departure: { temp: '28°C', condition: 'Sunny' },
    arrival: { temp: '26°C', condition: 'Cloudy' }
  }
})

// Computed properties
const statusColor = computed(() => {
  switch (flightStatus.value.status.toLowerCase()) {
    case 'on time':
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
  switch (flightStatus.value.status.toLowerCase()) {
    case 'on time':
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
const searchFlight = () => {
  if (searchForm.flightNumber && searchForm.date) {
    isSearching.value = true
    // Simulate API call
    setTimeout(() => {
      flightFound.value = true
      isSearching.value = false
    }, 1000)
  }
}

// Recent searches mock data
const recentSearches = ref([
  { flightNumber: '5J 561', date: 'Feb 15, 2024', status: 'On Time' },
  { flightNumber: '5J 562', date: 'Feb 15, 2024', status: 'Delayed' },
  { flightNumber: '5J 325', date: 'Feb 14, 2024', status: 'Arrived' }
])
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-32 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <div class="relative container mx-auto px-4 text-center z-10 pt-12">
        <div class="inline-flex items-center rounded-full px-4 py-2 mb-6" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
          <Radio class="w-4 h-4 mr-2 text-white" />
          <span class="font-semibold text-sm text-white">Real-time Updates</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Flight Status
        </h1>
        <p class="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto font-medium">
          Track your flight in real-time with live updates
        </p>
        
        <!-- Live Time Display -->
        <div class="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20">
          <Clock class="w-5 h-5 text-green-400" />
          <span class="text-2xl font-black tracking-wider">{{ formattedCurrentTime }}</span>
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>

    <div class="container mx-auto px-4 -mt-16 relative z-20 pb-16">
      <!-- Search Section - Split Design -->
      <div class="max-w-5xl mx-auto mb-16">
        <div class="grid md:grid-cols-12 gap-0 shadow-2xl">
          <!-- Left Side - Dark Panel -->
          <div class="md:col-span-4 bg-gray-900 p-8 relative overflow-hidden">
            <!-- Animated Background Pattern -->
            <div class="absolute inset-0 opacity-5">
              <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #fff 20px, #fff 21px);"></div>
            </div>
            
            <div class="relative z-10">
              <div class="w-16 h-16 bg-green-600 flex items-center justify-center mb-6">
                <Navigation class="w-8 h-8 text-white" />
              </div>
              <h2 class="text-3xl font-black text-white mb-4 uppercase tracking-tight">Track Flight</h2>
              <p class="text-gray-400 font-semibold mb-6">Enter flight details to get real-time status</p>
              
              <!-- Status Indicators -->
              <div class="space-y-3 mt-8">
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="text-gray-400 text-xs font-bold uppercase tracking-widest">On Time</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span class="text-gray-400 text-xs font-bold uppercase tracking-widest">Delayed</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span class="text-gray-400 text-xs font-bold uppercase tracking-widest">Departed</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span class="text-gray-400 text-xs font-bold uppercase tracking-widest">Cancelled</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side - Form Panel -->
          <div class="md:col-span-8 bg-white p-8">
            <form @submit.prevent="searchFlight" class="space-y-6">
              <div class="space-y-4">
                <!-- Flight Number -->
                <div>
                  <Label for="flightNumber" class="text-xs font-black text-gray-900 uppercase tracking-widest mb-3 block">
                    Flight Number
                  </Label>
                  <Input
                    id="flightNumber"
                    v-model="searchForm.flightNumber"
                    placeholder="5J 561"
                    class="h-14 text-xl font-bold border-0 border-b-4 border-gray-900 rounded-none bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-0 transition-all uppercase tracking-widest"
                    required
                  />
                </div>

                <!-- Date -->
                <div>
                  <Label for="date" class="text-xs font-black text-gray-900 uppercase tracking-widest mb-3 block">
                    Flight Date
                  </Label>
                  <Input
                    id="date"
                    v-model="searchForm.date"
                    type="date"
                    class="h-14 text-xl font-bold border-0 border-b-4 border-gray-900 rounded-none bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-0 transition-all uppercase"
                    required
                  />
                </div>
              </div>

              <!-- Search Button -->
              <Button type="submit" :disabled="isSearching" class="w-full h-16 text-lg font-black bg-gray-900 text-white hover:bg-green-600 transition-all duration-300 uppercase tracking-widest relative overflow-hidden group disabled:opacity-50">
                <div class="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <div class="flex items-center justify-center gap-3 relative z-10">
                  <Search v-if="!isSearching" class="w-5 h-5" />
                  <div v-else class="flex gap-1">
                    <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                    <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                    <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                  </div>
                  <span>{{ isSearching ? 'Searching...' : 'Track Flight' }}</span>
                  <ArrowRight v-if="!isSearching" class="w-5 h-5" />
                </div>
              </Button>

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
      <div v-if="flightFound" class="max-w-6xl mx-auto space-y-8">
        <!-- Status Header -->
        <div class="bg-gradient-to-r from-gray-900 to-green-900 p-8 shadow-2xl relative overflow-hidden">
          <!-- Decorative Pattern -->
          <div class="absolute inset-0 opacity-5">
            <div class="absolute top-0 left-0 right-0 h-px bg-white"></div>
            <div class="absolute bottom-0 left-0 right-0 h-px bg-white"></div>
          </div>
          
          <div class="relative flex flex-wrap items-center justify-between gap-4">
            <div>
              <div class="text-xs text-green-300 font-black uppercase tracking-widest mb-2">Flight Information</div>
              <div class="flex items-center gap-4 flex-wrap">
                <h2 class="text-4xl font-black text-white tracking-tight">{{ flightStatus.flightNumber }}</h2>
                <div class="h-10 w-px bg-white/30"></div>
                <div class="text-white/80 text-lg font-semibold">{{ flightStatus.date }}</div>
              </div>
              <div class="text-white/70 text-sm font-bold mt-2">{{ flightStatus.airline }} • {{ flightStatus.aircraft }}</div>
            </div>
            <div class="flex items-center gap-3">
              <component 
                :is="statusIcon" 
                class="w-8 h-8"
                :class="{
                  'text-green-400': statusColor === 'green',
                  'text-yellow-400': statusColor === 'yellow',
                  'text-red-400': statusColor === 'red',
                  'text-blue-400': statusColor === 'blue',
                  'text-gray-400': statusColor === 'gray'
                }"
              />
              <div 
                class="px-6 py-3 font-black text-lg uppercase tracking-wide"
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
        <div class="bg-white shadow-2xl p-8 relative">
          <!-- Timeline Header -->
          <div class="mb-8">
            <h3 class="text-2xl font-black text-gray-900 uppercase tracking-tight mb-2">Flight Timeline</h3>
            <p class="text-gray-600 font-semibold">Track your journey from departure to arrival</p>
          </div>

          <!-- Timeline Visual -->
          <div class="relative">
            <!-- Timeline Line -->
            <div class="absolute top-20 left-0 right-0 h-2 bg-gray-200">
              <div class="h-full bg-gradient-to-r from-blue-600 to-green-600" style="width: 65%;"></div>
            </div>

            <div class="grid md:grid-cols-2 gap-12 relative">
              <!-- Departure -->
              <div class="relative">
                <!-- Connection Point -->
                <div class="absolute -top-3 left-0 w-8 h-8 bg-blue-600 border-4 border-white shadow-lg z-10"></div>
                
                <div class="pt-12">
                  <div class="mb-4">
                    <span class="text-xs font-black text-blue-600 uppercase tracking-widest">Departure</span>
                  </div>
                  
                  <!-- Airport Info -->
                  <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 mb-4 border-l-4 border-blue-600">
                    <div class="flex items-start justify-between mb-4">
                      <div>
                        <div class="text-5xl font-black text-gray-900 mb-1">{{ flightStatus.departure.code }}</div>
                        <div class="text-lg font-bold text-gray-700">{{ flightStatus.departure.airport }}</div>
                      </div>
                      <Plane class="w-10 h-10 text-blue-600" />
                    </div>
                    
                    <div class="space-y-2">
                      <div class="flex justify-between items-center py-2 border-t border-blue-200">
                        <span class="text-xs font-bold text-gray-600 uppercase tracking-widest">Terminal</span>
                        <span class="text-sm font-black text-gray-900">{{ flightStatus.departure.terminal }}</span>
                      </div>
                      <div class="flex justify-between items-center py-2 border-t border-blue-200">
                        <span class="text-xs font-bold text-gray-600 uppercase tracking-widest">Gate</span>
                        <span class="text-sm font-black text-gray-900">{{ flightStatus.departure.gate }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Time Details -->
                  <div class="space-y-3">
                    <div class="bg-white border-2 border-gray-900 p-4">
                      <div class="text-xs font-black text-gray-600 uppercase tracking-widest mb-2">Scheduled</div>
                      <div class="text-3xl font-black text-gray-900">{{ flightStatus.departure.scheduledTime }}</div>
                    </div>
                    <div class="bg-blue-600 p-4">
                      <div class="text-xs font-black text-blue-200 uppercase tracking-widest mb-2">Actual Departure</div>
                      <div class="text-3xl font-black text-white">{{ flightStatus.departure.actualTime }}</div>
                    </div>
                  </div>

                  <!-- Weather -->
                  <div class="mt-4 flex items-center gap-3 text-sm text-gray-600 font-semibold">
                    <Thermometer class="w-4 h-4" />
                    <span>{{ flightStatus.weather.departure.temp }} • {{ flightStatus.weather.departure.condition }}</span>
                  </div>
                </div>
              </div>

              <!-- Arrival -->
              <div class="relative">
                <!-- Connection Point -->
                <div class="absolute -top-3 left-0 w-8 h-8 bg-green-600 border-4 border-white shadow-lg z-10"></div>
                
                <div class="pt-12">
                  <div class="mb-4">
                    <span class="text-xs font-black text-green-600 uppercase tracking-widest">Arrival</span>
                  </div>
                  
                  <!-- Airport Info -->
                  <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 mb-4 border-l-4 border-green-600">
                    <div class="flex items-start justify-between mb-4">
                      <div>
                        <div class="text-5xl font-black text-gray-900 mb-1">{{ flightStatus.arrival.code }}</div>
                        <div class="text-lg font-bold text-gray-700">{{ flightStatus.arrival.airport }}</div>
                      </div>
                      <MapPin class="w-10 h-10 text-green-600" />
                    </div>
                    
                    <div class="space-y-2">
                      <div class="flex justify-between items-center py-2 border-t border-green-200">
                        <span class="text-xs font-bold text-gray-600 uppercase tracking-widest">Terminal</span>
                        <span class="text-sm font-black text-gray-900">{{ flightStatus.arrival.terminal }}</span>
                      </div>
                      <div class="flex justify-between items-center py-2 border-t border-green-200">
                        <span class="text-xs font-bold text-gray-600 uppercase tracking-widest">Gate</span>
                        <span class="text-sm font-black text-gray-900">{{ flightStatus.arrival.gate }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Time Details -->
                  <div class="space-y-3">
                    <div class="bg-white border-2 border-gray-900 p-4">
                      <div class="text-xs font-black text-gray-600 uppercase tracking-widest mb-2">Scheduled</div>
                      <div class="text-3xl font-black text-gray-900">{{ flightStatus.arrival.scheduledTime }}</div>
                    </div>
                    <div class="bg-green-600 p-4">
                      <div class="text-xs font-black text-green-200 uppercase tracking-widest mb-2">Estimated Arrival</div>
                      <div class="text-3xl font-black text-white">{{ flightStatus.arrival.estimatedTime }}</div>
                    </div>
                  </div>

                  <!-- Weather -->
                  <div class="mt-4 flex items-center gap-3 text-sm text-gray-600 font-semibold">
                    <CloudRain class="w-4 h-4" />
                    <span>{{ flightStatus.weather.arrival.temp }} • {{ flightStatus.weather.arrival.condition }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Duration Badge -->
            <div class="absolute top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div class="bg-gray-900 px-6 py-3 shadow-2xl">
                <div class="flex items-center gap-2">
                  <Clock class="w-5 h-5 text-white" />
                  <span class="text-white font-black text-lg">{{ flightStatus.duration }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Aircraft Info -->
          <div class="bg-white shadow-xl p-6 border-t-4 border-blue-600">
            <div class="w-12 h-12 bg-blue-100 flex items-center justify-center mb-4">
              <Plane class="w-6 h-6 text-blue-600" />
            </div>
            <h4 class="text-xs font-black text-gray-600 uppercase tracking-widest mb-2">Aircraft</h4>
            <p class="text-xl font-black text-gray-900">{{ flightStatus.aircraft }}</p>
          </div>

          <!-- Flight Duration -->
          <div class="bg-white shadow-xl p-6 border-t-4 border-green-600">
            <div class="w-12 h-12 bg-green-100 flex items-center justify-center mb-4">
              <Clock class="w-6 h-6 text-green-600" />
            </div>
            <h4 class="text-xs font-black text-gray-600 uppercase tracking-widest mb-2">Duration</h4>
            <p class="text-xl font-black text-gray-900">{{ flightStatus.duration }}</p>
          </div>

          <!-- Status Update -->
          <div class="bg-white shadow-xl p-6 border-t-4 border-purple-600">
            <div class="w-12 h-12 bg-purple-100 flex items-center justify-center mb-4">
              <Radio class="w-6 h-6 text-purple-600" />
            </div>
            <h4 class="text-xs font-black text-gray-600 uppercase tracking-widest mb-2">Last Updated</h4>
            <p class="text-xl font-black text-gray-900">{{ formattedCurrentTime }}</p>
          </div>
        </div>
      </div>

      <!-- Recent Searches - Ticket Stub Style -->
      <div v-if="!flightFound" class="max-w-6xl mx-auto">
        <div class="mb-12">
          <div class="flex items-center gap-4 mb-3">
            <div class="flex gap-1">
              <div class="w-2 h-2 bg-gray-900"></div>
              <div class="w-2 h-2 bg-green-600"></div>
              <div class="w-2 h-2 bg-gray-900"></div>
            </div>
            <h3 class="text-4xl font-black text-gray-900 uppercase tracking-tighter">Recent Searches</h3>
          </div>
          <div class="flex items-center gap-3 ml-8">
            <div class="h-px w-16 bg-gray-900"></div>
            <p class="text-gray-600 font-bold text-sm uppercase tracking-wide">Jump back to your tracked flights</p>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
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
                  'bg-gradient-to-br from-green-500 to-green-600': flight.status === 'On Time' || flight.status === 'Arrived',
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
                      'bg-green-600 text-white': flight.status === 'On Time' || flight.status === 'Arrived',
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
                'bg-green-600': flight.status === 'On Time' || flight.status === 'Arrived',
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
        <div class="mt-12 text-center">
          <div class="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 text-white">
            <Search class="w-5 h-5" />
            <span class="font-black text-sm uppercase tracking-wider">Search for flights to build your history</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

