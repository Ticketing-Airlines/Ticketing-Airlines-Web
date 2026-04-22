
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Search, 
  Plane, 
  MapPin, 
  Luggage, 
  Edit, 
  X, 
  Clock, 
  Phone,
  ArrowRight,
  CheckCircle,
  Users,
  Receipt,
  Shield,
  AlertCircle
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useBookingStore } from '@/stores/bookingStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useValidation, rules } from '@/composables/useValidation'

// Store
const bookingStore = useBookingStore()
const { retrievedBooking, isSearchingBooking, bookingError } = storeToRefs(bookingStore)
const router = useRouter()

// Reactive state
const searchForm = reactive({
  bookingReference: '',
  lastName: ''
})

// Validation
const { validate, errors, isValid } = useValidation(searchForm, {
  bookingReference: [rules.required('Booking reference is required')],
  lastName: [rules.required('Last name is required')]
})

// Methods
const searchBooking = async () => {
  if (!validate()) return
  
  await bookingStore.retrieveBooking(searchForm.bookingReference, searchForm.lastName)
}

const checkIn = () => {
  // Navigate to check-in page with query params if booking is retrieved
  if (retrievedBooking.value) {
    router.push({ 
      path: '/check-in', 
      query: { 
        ref: retrievedBooking.value.reference, 
        lastName: searchForm.lastName 
      } 
    })
  } else {
    router.push('/check-in')
  }
}

const selectSeats = () => {
  console.log('Opening seat selection...')
}

const addBaggage = () => {
  console.log('Opening baggage options...')
}

const modifyBooking = () => {
  console.log('Opening booking modification...')
}

const cancelBooking = () => {
  console.log('Opening cancellation process...')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-32 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <div class="relative container mx-auto px-4 text-center z-10 pt-12">
        <div class="inline-flex items-center rounded-full px-4 py-2 mb-6" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
          <Receipt class="w-4 h-4 mr-2 text-white" />
          <span class="font-semibold text-sm text-white">Manage Booking</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Your Reservations
        </h1>
        <p class="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto font-medium">
          View, modify, or manage your flight bookings
        </p>
      </div>
    </section>

    <div class="container mx-auto px-4 -mt-16 relative z-20 pb-16">
      <!-- Search Section - Split Design -->
      <div class="max-w-5xl mx-auto mb-16">
        <div class="grid md:grid-cols-12 gap-0 shadow-2xl">
          <!-- Left Side - Dark Panel -->
          <div class="md:col-span-4 bg-gray-900 p-8 relative overflow-hidden">
            <!-- Decorative Pattern -->
            <div class="absolute inset-0 opacity-5">
              <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 10px, #fff 10px, #fff 11px);"></div>
            </div>
            
            <div class="relative z-10">
              <div class="w-16 h-16 bg-blue-600 flex items-center justify-center mb-6">
                <Search class="w-8 h-8 text-white" />
              </div>
              <h2 class="text-3xl font-black text-white mb-4 uppercase tracking-tight">Find Booking</h2>
              <p class="text-gray-400 font-semibold mb-6">Enter your details to retrieve your reservation</p>
              
              <!-- Decorative Elements -->
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <div class="w-1 h-1 bg-blue-600"></div>
                  <span class="uppercase tracking-widest text-xs">Quick Access</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <div class="w-1 h-1 bg-blue-600"></div>
                  <span class="uppercase tracking-widest text-xs">Secure Portal</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <div class="w-1 h-1 bg-blue-600"></div>
                  <span class="uppercase tracking-widest text-xs">24/7 Available</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side - Form Panel -->
          <div class="md:col-span-8 bg-white p-8">
            <form @submit.prevent="searchBooking" class="space-y-6">
              <div class="space-y-4">
                <!-- Booking Reference -->
                <div>
                  <Label for="bookingRef" class="text-xs font-black text-gray-900 uppercase tracking-widest mb-3 block">
                    Booking Reference / PNR
                  </Label>
                  <Input
                    id="bookingRef"
                    v-model="searchForm.bookingReference"
                    placeholder="ABC123"
                    class="h-14 text-xl font-bold border-0 border-b-4 border-gray-900 rounded-none bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-0 transition-all uppercase tracking-widest"
                    :class="{ 'border-red-600': errors.bookingReference }"
                    required
                  />
                  <span v-if="errors.bookingReference" class="text-red-600 text-xs font-bold mt-1 block">{{ errors.bookingReference }}</span>
                </div>

                <!-- Last Name -->
                <div>
                  <Label for="lastName" class="text-xs font-black text-gray-900 uppercase tracking-widest mb-3 block">
                    Passenger Last Name
                  </Label>
                  <Input
                    id="lastName"
                    v-model="searchForm.lastName"
                    placeholder="SURNAME"
                    class="h-14 text-xl font-bold border-0 border-b-4 border-gray-900 rounded-none bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-0 transition-all uppercase tracking-wide"
                    :class="{ 'border-red-600': errors.lastName }"
                    required
                  />
                  <span v-if="errors.lastName" class="text-red-600 text-xs font-bold mt-1 block">{{ errors.lastName }}</span>
                </div>
              </div>

              <!-- Search Button -->
              <Button type="submit" :disabled="isSearchingBooking" class="w-full h-16 text-lg font-black bg-gray-900 text-white hover:bg-blue-600 transition-all duration-300 uppercase tracking-widest relative overflow-hidden group">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <div class="flex items-center justify-center gap-3 relative z-10">
                  <Search v-if="!isSearchingBooking" class="w-5 h-5" />
                  <div v-else class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{{ isSearchingBooking ? 'Searching...' : 'Retrieve Booking' }}</span>
                  <ArrowRight v-if="!isSearchingBooking" class="w-5 h-5" />
                </div>
              </Button>

              <!-- Error Message -->
              <div v-if="bookingError" class="p-4 bg-red-50 border-l-4 border-red-600 text-red-700 font-bold flex items-center gap-3">
                <AlertCircle class="w-5 h-5" />
                {{ bookingError }}
              </div>

              <!-- Info Strip -->
              <div class="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                <Shield class="w-4 h-4 text-blue-600" />
                <span class="font-bold">Your data is secure and encrypted</span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Booking Details Section - Itinerary Style -->
      <div v-if="retrievedBooking" class="max-w-6xl mx-auto space-y-8">
        <!-- Header Strip -->
        <div class="bg-gradient-to-r from-gray-900 to-blue-900 p-6 relative overflow-hidden">
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 left-0 right-0 h-px bg-white"></div>
            <div class="absolute bottom-0 left-0 right-0 h-px bg-white"></div>
          </div>
          
          <div class="relative flex flex-wrap items-center justify-between gap-4">
            <div>
              <div class="text-xs text-blue-300 font-black uppercase tracking-widest mb-1">Booking Confirmation</div>
              <div class="flex items-center gap-4">
                <h2 class="text-3xl font-black text-white tracking-tight">{{ retrievedBooking.reference }}</h2>
                <div class="h-8 w-px bg-white/30"></div>
                <div class="text-white/80 text-sm font-semibold">{{ retrievedBooking.bookingDate }}</div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="px-4 py-2 bg-green-500 font-black text-sm uppercase tracking-wide">
                {{ retrievedBooking.status }}
              </div>
              <CheckCircle class="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <!-- Flight Information - Ticket Style -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Outbound Flight -->
          <div class="bg-white shadow-2xl relative">
            <!-- Top Bar -->
            <div class="bg-blue-600 px-6 py-3 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <Plane class="w-5 h-5 text-white" />
                <span class="font-black text-white uppercase tracking-wide text-sm">Outbound</span>
              </div>
              <div class="text-white font-bold text-sm">{{ retrievedBooking.outbound.flightNumber }}</div>
            </div>

            <!-- Flight Route -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">From</div>
                  <div class="text-3xl font-black text-gray-900">{{ retrievedBooking.outbound.from.split(' ')[1].replace(/[()]/g, '') }}</div>
                  <div class="text-sm text-gray-600 font-semibold">{{ retrievedBooking.outbound.from.split(' ')[0] }}</div>
                </div>
                
                <div class="flex-1 mx-4 flex flex-col items-center">
                  <div class="w-full h-px bg-gray-900 relative">
                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <ArrowRight class="w-6 h-6 text-gray-900 bg-white" />
                    </div>
                  </div>
                  <div class="text-xs text-gray-500 font-bold mt-1">{{ retrievedBooking.outbound.duration }}</div>
                </div>

                <div class="text-right">
                  <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">To</div>
                  <div class="text-3xl font-black text-gray-900">{{ retrievedBooking.outbound.to.split(' ')[1].replace(/[()]/g, '') }}</div>
                  <div class="text-sm text-gray-600 font-semibold">{{ retrievedBooking.outbound.to.split(' ')[0] }}</div>
                </div>
              </div>

              <!-- Date & Time -->
              <div class="bg-gray-50 p-4 border-t-4 border-blue-600">
                <div class="flex justify-between items-center">
                  <div>
                    <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">Date</div>
                    <div class="font-black text-gray-900">{{ retrievedBooking.outbound.date }}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">Time</div>
                    <div class="font-black text-gray-900">{{ retrievedBooking.outbound.time }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Return Flight (if exists) -->
          <div v-if="retrievedBooking.return" class="bg-white shadow-2xl relative">
            <!-- Top Bar -->
            <div class="bg-green-600 px-6 py-3 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <Plane class="w-5 h-5 text-white transform rotate-180" />
                <span class="font-black text-white uppercase tracking-wide text-sm">Return</span>
              </div>
              <div class="text-white font-bold text-sm">{{ retrievedBooking.return.flightNumber }}</div>
            </div>

            <!-- Flight Route -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">From</div>
                  <div class="text-3xl font-black text-gray-900">{{ retrievedBooking.return.from.split(' ')[1].replace(/[()]/g, '') }}</div>
                  <div class="text-sm text-gray-600 font-semibold">{{ retrievedBooking.return.from.split(' ')[0] }}</div>
                </div>
                
                <div class="flex-1 mx-4 flex flex-col items-center">
                  <div class="w-full h-px bg-gray-900 relative">
                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <ArrowRight class="w-6 h-6 text-gray-900 bg-white" />
                    </div>
                  </div>
                  <div class="text-xs text-gray-500 font-bold mt-1">{{ retrievedBooking.return.duration }}</div>
                </div>

                <div class="text-right">
                  <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">To</div>
                  <div class="text-3xl font-black text-gray-900">{{ retrievedBooking.return.to.split(' ')[1].replace(/[()]/g, '') }}</div>
                  <div class="text-sm text-gray-600 font-semibold">{{ retrievedBooking.return.to.split(' ')[0] }}</div>
                </div>
              </div>

              <!-- Date & Time -->
              <div class="bg-gray-50 p-4 border-t-4 border-green-600">
                <div class="flex justify-between items-center">
                  <div>
                    <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">Date</div>
                    <div class="font-black text-gray-900">{{ retrievedBooking.return.date }}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">Time</div>
                    <div class="font-black text-gray-900">{{ retrievedBooking.return.time }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Combined: Passengers & Pricing -->
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Passenger Information -->
          <div class="md:col-span-2 bg-white shadow-xl p-6">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 bg-blue-100 flex items-center justify-center">
                <Users class="w-6 h-6 text-blue-600" />
              </div>
              <h3 class="text-2xl font-black text-gray-900 uppercase tracking-tight">Passengers</h3>
            </div>

            <div class="space-y-4">
              <div v-for="passenger in retrievedBooking.passengers" :key="passenger.id" 
                   class="bg-gray-50 p-5 border-l-4 border-gray-900 relative">
                <!-- Passenger Number Badge -->
                <div class="absolute -left-2 top-5 w-6 h-6 bg-gray-900 flex items-center justify-center">
                  <span class="text-xs font-black text-white">{{ passenger.id }}</span>
                </div>
                
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h4 class="font-black text-lg text-gray-900 uppercase">{{ passenger.name }}</h4>
                    <span class="text-xs text-gray-500 font-bold uppercase tracking-widest">{{ passenger.type }}</span>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">Seat</div>
                    <div class="font-black text-gray-900">{{ passenger.seat || 'Not selected' }}</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">Meal</div>
                    <div class="font-black text-gray-900">{{ passenger.meal || 'Standard' }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Booking Summary -->
          <div class="bg-gradient-to-br from-gray-900 to-blue-900 p-6 shadow-xl relative overflow-hidden">
            <!-- Decorative Pattern -->
            <div class="absolute inset-0 opacity-5">
              <div class="absolute top-0 left-0 right-0 h-px bg-white"></div>
              <div class="absolute top-4 left-0 right-0 h-px bg-white"></div>
              <div class="absolute bottom-0 left-0 right-0 h-px bg-white"></div>
              <div class="absolute bottom-4 left-0 right-0 h-px bg-white"></div>
            </div>

            <div class="relative z-10">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-12 h-12 bg-white/10 flex items-center justify-center">
                  <Receipt class="w-6 h-6 text-white" />
                </div>
                <h3 class="text-xl font-black text-white uppercase tracking-tight">Pricing</h3>
              </div>

              <div class="space-y-4">
                <div class="flex justify-between items-center pb-3 border-b border-white/20">
                  <span class="text-white/80 font-semibold uppercase text-xs tracking-widest">Base Fare</span>
                  <span class="text-white font-bold">₱{{ retrievedBooking.pricing.baseFare.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between items-center pb-3 border-b border-white/20">
                  <span class="text-white/80 font-semibold uppercase text-xs tracking-widest">Taxes & Fees</span>
                  <span class="text-white font-bold">₱{{ retrievedBooking.pricing.taxes.toLocaleString() }}</span>
                </div>
                <div v-if="retrievedBooking.pricing.addOns > 0" class="flex justify-between items-center pb-3 border-b border-white/20">
                  <span class="text-white/80 font-semibold uppercase text-xs tracking-widest">Add-ons</span>
                  <span class="text-white font-bold">₱{{ retrievedBooking.pricing.addOns.toLocaleString() }}</span>
                </div>
                
                <div class="bg-white/10 backdrop-blur-sm p-4 border-2 border-white/30 mt-6">
                  <div class="flex justify-between items-center">
                    <span class="text-white font-black uppercase text-sm tracking-widest">Total</span>
                    <span class="text-3xl font-black text-white">₱{{ retrievedBooking.pricing.total.toLocaleString() }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons - Grid Layout -->
        <div class="bg-white p-6 shadow-xl">
          <div class="mb-6">
            <h3 class="text-2xl font-black text-gray-900 uppercase tracking-tight mb-2">Manage Your Trip</h3>
            <p class="text-gray-600 font-semibold">Select an option to modify or manage your booking</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            <!-- Check In Button -->
            <Button @click="checkIn" class="h-auto py-6 bg-green-600 hover:bg-green-700 flex-col gap-3 group relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-green-500 to-green-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Plane class="w-8 h-8 relative z-10" />
              <span class="font-black uppercase text-xs relative z-10">Check In</span>
            </Button>

            <!-- Select Seats -->
            <Button @click="selectSeats" variant="outline" class="h-auto py-6 border-2 border-gray-900 hover:bg-gray-900 hover:text-white flex-col gap-3 transition-all">
              <MapPin class="w-8 h-8" />
              <span class="font-black uppercase text-xs">Select Seats</span>
            </Button>

            <!-- Add Baggage -->
            <Button @click="addBaggage" variant="outline" class="h-auto py-6 border-2 border-gray-900 hover:bg-gray-900 hover:text-white flex-col gap-3 transition-all">
              <Luggage class="w-8 h-8" />
              <span class="font-black uppercase text-xs">Add Baggage</span>
            </Button>

            <!-- Modify Booking -->
            <Button @click="modifyBooking" variant="outline" class="h-auto py-6 border-2 border-gray-900 hover:bg-gray-900 hover:text-white flex-col gap-3 transition-all">
              <Edit class="w-8 h-8" />
              <span class="font-black uppercase text-xs">Modify</span>
            </Button>

            <!-- Cancel Booking -->
            <Button @click="cancelBooking" class="h-auto py-6 bg-red-600 hover:bg-red-700 flex-col gap-3 group relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <X class="w-8 h-8 relative z-10" />
              <span class="font-black uppercase text-xs relative z-10">Cancel</span>
            </Button>
          </div>
        </div>
      </div>

      <!-- Quick Actions - Brutalist Cards -->
      <div class="container mx-auto px-4 py-16">
        <div class="mb-12">
          <div class="flex items-end gap-4 mb-2">
            <h2 class="text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none">Quick</h2>
            <div class="w-3 h-3 bg-blue-600 mb-2"></div>
            <h2 class="text-5xl font-black text-blue-600 uppercase tracking-tighter leading-none">Services</h2>
          </div>
          <div class="flex items-center gap-2">
            <div class="h-1 w-24 bg-gray-900"></div>
            <p class="text-gray-600 font-bold text-sm uppercase tracking-wider">Essential travel utilities</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-6xl mx-auto">
          <!-- Online Check-in - Offset Design -->
          <div class="relative group cursor-pointer transform md:translate-y-8">
            <!-- Main Card -->
            <div class="bg-blue-600 p-8 relative overflow-hidden transition-all duration-300 group-hover:-translate-y-2">
              <!-- Background Pattern -->
              <div class="absolute top-0 right-0 w-32 h-32 border-4 border-white/10 transform rotate-12"></div>
              <div class="absolute bottom-0 left-0 w-24 h-24 border-4 border-white/10 transform -rotate-12"></div>
              
              <div class="relative z-10">
                <!-- Icon Container -->
                <div class="mb-6 relative">
                  <div class="w-16 h-16 bg-white border-4 border-black flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                    <Plane class="w-8 h-8 text-blue-600" />
                  </div>
                  <div class="absolute top-1 left-1 w-16 h-16 border-4 border-black -z-10"></div>
                </div>
                
                <div class="space-y-3">
                  <h3 class="text-2xl font-black text-white uppercase tracking-tight leading-tight">
                    Online<br/>Check-in
                  </h3>
                  <div class="h-1 w-12 bg-white"></div>
                  <p class="text-white/90 font-bold text-sm leading-relaxed">
                    Skip the queue. Get your boarding pass in seconds.
                  </p>
                </div>
                
                <!-- Arrow Indicator -->
                <div class="mt-6 flex items-center gap-2 text-white font-black text-xs uppercase tracking-wider">
                  <span>Access Now</span>
                  <ArrowRight class="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
            <!-- Shadow Block -->
            <div class="absolute top-2 left-2 w-full h-full bg-black -z-10"></div>
          </div>
          
          <!-- Flight Status - Bold Design -->
          <div class="relative group cursor-pointer">
            <!-- Main Card -->
            <div class="bg-white border-8 border-black p-8 relative overflow-hidden transition-all duration-300 group-hover:border-green-600">
              <!-- Corner Accents -->
              <div class="absolute top-0 left-0 w-0 h-0 border-t-[30px] border-t-green-600 border-r-[30px] border-r-transparent"></div>
              <div class="absolute bottom-0 right-0 w-0 h-0 border-b-[30px] border-b-green-600 border-l-[30px] border-l-transparent"></div>
              
              <div class="relative z-10">
                <!-- Icon with Circle Background -->
                <div class="mb-6 relative inline-block">
                  <div class="w-20 h-20 border-4 border-black bg-green-100 flex items-center justify-center relative z-10">
                    <Clock class="w-10 h-10 text-green-600 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div class="absolute -top-2 -right-2 w-8 h-8 bg-green-600"></div>
                </div>
                
                <div class="space-y-3">
                  <h3 class="text-2xl font-black text-gray-900 uppercase tracking-tight leading-tight">
                    Flight<br/>Status
                  </h3>
                  <div class="flex gap-1">
                    <div class="w-3 h-1 bg-gray-900"></div>
                    <div class="w-3 h-1 bg-green-600"></div>
                    <div class="w-3 h-1 bg-gray-900"></div>
                  </div>
                  <p class="text-gray-700 font-bold text-sm leading-relaxed">
                    Real-time updates. Live tracking. Zero surprises.
                  </p>
                </div>
                
                <!-- Status Indicator -->
                <div class="mt-6 inline-flex items-center gap-2 bg-green-600 px-4 py-2">
                  <div class="w-2 h-2 bg-white animate-pulse"></div>
                  <span class="text-white font-black text-xs uppercase tracking-wider">Live Now</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Customer Support - Layered Design -->
          <div class="relative group cursor-pointer transform md:translate-y-8">
            <!-- Main Card -->
            <div class="bg-gray-900 p-8 relative overflow-hidden transition-all duration-300 group-hover:bg-purple-900">
              <!-- Striped Pattern -->
              <div class="absolute inset-0 opacity-5" style="background: repeating-linear-gradient(45deg, transparent, transparent 10px, #fff 10px, #fff 20px);"></div>
              
              <div class="relative z-10">
                <!-- Icon Container -->
                <div class="mb-6 relative">
                  <div class="w-16 h-16 bg-purple-600 flex items-center justify-center">
                    <Phone class="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div class="absolute -bottom-2 -right-2 w-16 h-16 border-4 border-purple-600"></div>
                </div>
                
                <div class="space-y-3">
                  <div class="flex items-center gap-2">
                    <h3 class="text-2xl font-black text-white uppercase tracking-tight leading-tight">
                      Support
                    </h3>
                    <div class="w-2 h-2 bg-purple-600"></div>
                  </div>
                  <div class="bg-white h-1 w-full relative">
                    <div class="absolute top-0 left-0 h-full bg-purple-600 w-3/4"></div>
                  </div>
                  <p class="text-white/90 font-bold text-sm leading-relaxed">
                    Human help. Instant answers. Always available.
                  </p>
                </div>
                
                <!-- Badge -->
                <div class="mt-6 inline-block">
                  <div class="bg-purple-600 px-4 py-2 relative">
                    <span class="text-white font-black text-xs uppercase tracking-wider">24/7</span>
                    <div class="absolute -top-1 -right-1 w-4 h-4 bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Multiple Shadow Layers -->
            <div class="absolute top-1 left-1 w-full h-full bg-purple-600 -z-10"></div>
            <div class="absolute top-2 left-2 w-full h-full bg-black -z-20"></div>
          </div>
        </div>
      </div>

      <!-- Help Section -->
      <div class="bg-gradient-to-br from-gray-900 via-blue-900 to-black py-20 relative overflow-hidden">
        <!-- Blur decorations -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>

        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-5xl mx-auto">
            <div class="text-center mb-12">
              <div class="inline-flex items-center rounded-full px-4 py-2 mb-4" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
                <Shield class="w-4 h-4 mr-2 text-white" />
                <span class="font-semibold text-sm text-white">24/7 Support</span>
              </div>
              <h2 class="text-4xl font-black text-white mb-3 uppercase tracking-tight">Need Help?</h2>
              <p class="text-white/80 font-semibold text-lg">We're here to assist you</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- FAQ Section -->
              <div class="bg-white/10 backdrop-blur-md p-8 border border-white/20">
                <h3 class="text-xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                  <div class="w-10 h-10 bg-blue-600 flex items-center justify-center">
                    <AlertCircle class="w-5 h-5 text-white" />
                  </div>
                  Frequently Asked Questions
                </h3>
                <ul class="space-y-4">
                  <li><a href="#" class="text-white/90 hover:text-white font-semibold flex items-center gap-2 group">
                    <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    How to change my flight?
                  </a></li>
                  <li><a href="#" class="text-white/90 hover:text-white font-semibold flex items-center gap-2 group">
                    <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Cancellation policy
                  </a></li>
                  <li><a href="#" class="text-white/90 hover:text-white font-semibold flex items-center gap-2 group">
                    <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Baggage allowance
                  </a></li>
                  <li><a href="#" class="text-white/90 hover:text-white font-semibold flex items-center gap-2 group">
                    <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Check-in requirements
                  </a></li>
                </ul>
              </div>

              <!-- Contact Information -->
              <div class="bg-white/10 backdrop-blur-md p-8 border border-white/20">
                <h3 class="text-xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                  <div class="w-10 h-10 bg-green-600 flex items-center justify-center">
                    <Phone class="w-5 h-5 text-white" />
                  </div>
                  Contact Information
                </h3>
                <div class="space-y-4">
                  <div class="flex items-start gap-3">
                    <Phone class="w-5 h-5 text-blue-400 mt-1" />
                    <div>
                      <div class="text-xs text-white/60 font-bold uppercase tracking-widest">Hotline</div>
                      <div class="text-white font-black text-lg">+63 2 8702 0888</div>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <Receipt class="w-5 h-5 text-blue-400 mt-1" />
                    <div>
                      <div class="text-xs text-white/60 font-bold uppercase tracking-widest">Email</div>
                      <div class="text-white font-black text-lg">support@airline.com</div>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <Clock class="w-5 h-5 text-blue-400 mt-1" />
                    <div>
                      <div class="text-xs text-white/60 font-bold uppercase tracking-widest">Hours</div>
                      <div class="text-white font-black text-lg">24/7 Customer Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>