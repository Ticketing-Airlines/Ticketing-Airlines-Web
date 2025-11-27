<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  Users,
  Plane,
  DollarSign,
  TrendingUp,
  Clock,
  Table2,
  Download
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AdminBookingsTable from '@/components/admin/AdminBookingsTable.vue'
import AdminFlightsTable from '@/components/admin/AdminFlightsTable.vue'
import { useAdminStore } from '@/stores/adminStore'
import { storeToRefs } from 'pinia'

const router = useRouter()
const adminStore = useAdminStore()
const { stats, allBookings, allFlights } = storeToRefs(adminStore)

const activeTab = ref<'bookings' | 'flights'>('bookings')

onMounted(() => {
  adminStore.getDashboardStats()
})

const handleCancelBooking = (bookingId: string) => {
  const success = adminStore.cancelBooking(bookingId)
  if (success) {
    alert('Booking cancelled successfully')
  }
}

const handleViewBooking = (reference: string) => {
  router.push(`/manage-booking?ref=${reference}`)
}

const handleUpdateFlightStatus = (flightId: string, status: 'On Time' | 'Delayed' | 'Cancelled') => {
  adminStore.updateFlightStatus(flightId, status)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <NavigationBar />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-red-900 text-white py-20 overflow-hidden mt-16">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 12px, #fff 12px, #fff 13px), repeating-linear-gradient(90deg, transparent, transparent 12px, #fff 12px, #fff 13px);"></div>
      </div>
      
      <div class="relative container mx-auto px-4 z-10">
        <div class="flex justify-between items-start mb-6">
          <div>
            <div class="inline-flex items-center rounded-full px-4 py-2 mb-4" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
              <BarChart3 class="w-4 h-4 mr-2 text-white" />
              <span class="font-semibold text-sm text-white">ADMIN PANEL</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">Dashboard</h1>
            <p class="text-xl text-white/90 max-w-2xl font-medium">Monitor and manage your airline operations</p>
          </div>
          
          <!-- Admin Info & Logout -->
          <div class="flex items-center gap-4">
            <div class="text-right">
              <div class="text-xs font-bold text-white/60 uppercase">Logged in as</div>
              <div class="text-sm font-black text-white">{{ adminStore.adminEmail }}</div>
            </div>
            <Button
              @click="() => { adminStore.logout(); $router.push('/admin/login'); }"
              class="bg-red-600 hover:bg-red-700 text-white border-4 border-white rounded-none font-black uppercase tracking-wider"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </section>

    <div class="container mx-auto px-4 -mt-8 relative z-20 pb-16">
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <!-- Total Bookings -->
        <div class="bg-white shadow-xl border-4 border-gray-900 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>
          <div class="p-6 relative z-10">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-blue-600 flex items-center justify-center">
                <Plane class="w-6 h-6 text-white" />
              </div>
              <TrendingUp class="w-8 h-8 text-blue-600" />
            </div>
            <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Total Bookings</div>
            <div class="text-4xl font-black text-gray-900">{{ stats.totalBookings.toLocaleString() }}</div>
          </div>
        </div>

        <!-- Revenue -->
        <div class="bg-white shadow-xl border-4 border-gray-900 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-green-600/10 rounded-full blur-2xl"></div>
          <div class="p-6 relative z-10">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-green-600 flex items-center justify-center">
                <DollarSign class="w-6 h-6 text-white" />
              </div>
              <TrendingUp class="w-8 h-8 text-green-600" />
            </div>
            <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Total Revenue</div>
            <div class="text-4xl font-black text-gray-900">₱{{ (stats.totalRevenue / 1000000).toFixed(1) }}M</div>
          </div>
        </div>

        <!-- Active Flights -->
        <div class="bg-white shadow-xl border-4 border-gray-900 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl"></div>
          <div class="p-6 relative z-10">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-purple-600 flex items-center justify-center">
                <Plane class="w-6 h-6 text-white" />
              </div>
              <Clock class="w-8 h-8 text-purple-600" />
            </div>
            <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Active Flights</div>
            <div class="text-4xl font-black text-gray-900">{{ stats.activeFlights }}</div>
          </div>
        </div>

        <!-- Total Users -->
        <div class="bg-white shadow-xl border-4 border-gray-900 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl"></div>
          <div class="p-6 relative z-10">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-red-600 flex items-center justify-center">
                <Users class="w-6 h-6 text-white" />
              </div>
              <TrendingUp class="w-8 h-8 text-red-600" />
            </div>
            <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Total Users</div>
            <div class="text-4xl font-black text-gray-900">{{ stats.totalUsers.toLocaleString() }}</div>
          </div>
        </div>
      </div>

      <!-- Tabbed Management Interface -->
      <div class="bg-white shadow-xl border-4 border-gray-900 overflow-hidden">
        <!-- Tab Navigation -->
        <div class="bg-gray-900 px-6 py-4 flex gap-2">
          <Button
            @click="activeTab = 'bookings'"
            :class="[
              'font-black uppercase text-xs tracking-widest',
              activeTab === 'bookings' 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-white text-gray-900 hover:bg-gray-100'
            ]"
          >
            <Table2 class="w-4 h-4 mr-2" />
            Bookings Management
          </Button>
          <Button
            @click="activeTab = 'flights'"
            :class="[
              'font-black uppercase text-xs tracking-widest',
              activeTab === 'flights' 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-white text-gray-900 hover:bg-gray-100'
            ]"
          >
            <Plane class="w-4 h-4 mr-2" />
            Flights Management
          </Button>
        </div>

        <!-- Tab Content -->
        <div class="p-6">
          <AdminBookingsTable
            v-if="activeTab === 'bookings'"
            :bookings="allBookings"
            :on-cancel="handleCancelBooking"
            :on-view="handleViewBooking"
          />
          <AdminFlightsTable
            v-if="activeTab === 'flights'"
            :flights="allFlights"
            :on-status-update="handleUpdateFlightStatus"
          />
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>
