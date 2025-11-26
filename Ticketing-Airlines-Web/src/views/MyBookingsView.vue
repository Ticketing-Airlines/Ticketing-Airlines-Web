<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Plane,
  Calendar,
  Users,
  DollarSign,
  Search,
  Filter,
  Eye,
  Download,
  X as XIcon
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const authStore = useAuthStore()
const router = useRouter()
const { bookingHistory } = storeToRefs(userStore)

const filter = ref<'All' | 'Upcoming' | 'Completed' | 'Cancelled'>('All')
const searchQuery = ref('')

const filteredBookings = computed(() => {
  let filtered = bookingHistory.value

  if (filter.value !== 'All') {
    filtered = filtered.filter(b => b.status === filter.value)
  }

  if (searchQuery.value) {
    filtered = filtered.filter(b => 
      b.reference.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      b.from.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      b.to.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return filtered
})

onMounted(() => {
  if (authStore.user) {
    userStore.initializeUser(authStore.user.userId)
  }
})

const viewBooking = (reference: string) => {
  router.push(`/manage-booking?ref=${reference}`)
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Upcoming': return 'bg-blue-600'
    case 'Completed': return 'bg-green-600'
    case 'Cancelled': return 'bg-red-600'
    default: return 'bg-gray-600'
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <NavigationBar />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white py-20 overflow-hidden mt-16">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #fff 20px, #fff 21px);"></div>
      </div>
      
      <div class="relative container mx-auto px-4 z-10">
        <div class="inline-flex items-center rounded-full px-4 py-2 mb-4" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
          <Plane class="w-4 h-4 mr-2 text-white" />
          <span class="font-semibold text-sm text-white">MY TRIPS</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">My Bookings</h1>
        <p class="text-xl text-white/90 max-w-2xl font-medium">View and manage all your past and upcoming flights</p>
      </div>
    </section>

    <div class="container mx-auto px-4 -mt-8 relative z-20 pb-16">
      <!-- Filters & Search -->
      <div class="bg-white shadow-xl border-4 border-gray-900 p-6 mb-8">
        <div class="flex flex-col md:flex-row gap-4 justify-between items-center">
          <!-- Filter Buttons -->
          <div class="flex gap-2 flex-wrap">
            <Button
              @click="filter = 'All'"
              :class="[
                'font-black uppercase text-xs',
                filter === 'All' 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white text-gray-900 border-2 border-gray-900'
              ]"
            >
              All Trips
            </Button>
            <Button
              @click="filter = 'Upcoming'"
              :class="[
                'font-black uppercase text-xs',
                filter === 'Upcoming' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-blue-600 border-2 border-blue-600'
              ]"
            >
              Upcoming
            </Button>
            <Button
              @click="filter = 'Completed'"
              :class="[
                'font-black uppercase text-xs',
                filter === 'Completed' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-green-600 border-2 border-green-600'
              ]"
            >
              Completed
            </Button>
            <Button
              @click="filter = 'Cancelled'"
              :class="[
                'font-black uppercase text-xs',
                filter === 'Cancelled' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-red-600 border-2 border-red-600'
              ]"
            >
              Cancelled
            </Button>
          </div>

          <!-- Search -->
          <div class="relative w-full md:w-auto">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              v-model="searchQuery"
              placeholder="Search by PNR or destination"
              class="pl-10 h-12 border-2 border-gray-900 font-bold w-full md:w-64"
            />
          </div>
        </div>
      </div>

      <!-- Bookings List -->
      <div v-if="filteredBookings.length === 0" class="bg-white shadow-xl border-4 border-gray-900 p-12 text-center">
        <Plane class="w-24 h-24 mx-auto text-gray-300 mb-6" />
        <h3 class="text-2xl font-black uppercase text-gray-900 mb-2">No Bookings Found</h3>
        <p class="text-gray-600 font-semibold mb-6">
          {{ filter !== 'All' ? `No ${filter.toLowerCase()} bookings.` : 'Start booking your next adventure!' }}
        </p>
        <Button @click="router.push('/flights')" class="bg-gray-900 hover:bg-blue-600 font-black uppercase">
          <Search class="w-4 h-4 mr-2" />
          Search Flights
        </Button>
      </div>

      <div v-else class="space-y-6">
        <div
          v-for="booking in filteredBookings"
          :key="booking.id"
          class="bg-white shadow-xl border-4 border-gray-900 overflow-hidden"
        >
          <!-- Header -->
          <div class="bg-gray-900 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
            <div class="flex items-center gap-4">
              <div class="text-2xl font-black text-white">{{ booking.reference }}</div>
              <div :class="['px-3 py-1 font-black text-xs uppercase', getStatusColor(booking.status)]">
                {{ booking.status }}
              </div>
            </div>
            <div class="text-white/80 font-semibold text-sm">
              Booked: {{ booking.bookingDate }}
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <div class="grid md:grid-cols-12 gap-6 mb-6">
              <!-- Route -->
              <div class="md:col-span-6">
                <div class="flex items-center gap-4">
                  <div class="text-center">
                    <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">From</div>
                    <div class="text-3xl font-black text-gray-900">
                      {{ booking.from.split('(')[1]?.replace(')', '') || booking.from }}
                    </div>
                    <div class="text-sm text-gray-600 font-semibold">
                      {{ booking.from.split('(')[0]?.trim() || booking.from }}
                    </div>
                  </div>

                  <Plane class="w-8 h-8 text-blue-600" />

                  <div class="text-center">
                    <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">To</div>
                    <div class="text-3xl font-black text-gray-900">
                      {{ booking.to.split('(')[1]?.replace(')', '') || booking.to }}
                    </div>
                    <div class="text-sm text-gray-600 font-semibold">
                      {{ booking.to.split('(')[0]?.trim() || booking.to }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Details -->
              <div class="md:col-span-6 grid grid-cols-2 gap-4">
                <div>
                  <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Departure</div>
                  <div class="font-black text-gray-900">{{ booking.departureDate }}</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Passengers</div>
                  <div class="font-black text-gray-900">{{ booking.passengers }}</div>
                </div>
                <div class="col-span-2">
                  <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Total Paid</div>
                  <div class="text-2xl font-black text-gray-900">₱{{ booking.totalPrice.toLocaleString() }}</div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 flex-wrap">
              <Button
                @click="viewBooking(booking.reference)"
                class="bg-gray-900 hover:bg-blue-600 font-black uppercase text-xs"
              >
                <Eye class="w-4 h-4 mr-2" />
                View Details
              </Button>
              <Button
                v-if="booking.status === 'Upcoming'"
                @click="router.push('/check-in')"
                class="bg-green-600 hover:bg-green-700 font-black uppercase text-xs"
              >
                <Plane class="w-4 h-4 mr-2" />
                Check In
              </Button>
              <Button
                variant="outline"
                class="border-2 border-gray-900 font-black uppercase text-xs"
              >
                <Download class="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>
