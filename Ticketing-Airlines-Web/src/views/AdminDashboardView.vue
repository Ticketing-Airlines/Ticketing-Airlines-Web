<script setup lang="ts">
import { onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  Users,
  Plane,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useAdminStore } from '@/stores/adminStore'
import { storeToRefs } from 'pinia'

const adminStore = useAdminStore()
const { stats, recentBookings, flights } = storeToRefs(adminStore)

onMounted(() => {
  adminStore.getDashboardStats()
  adminStore.getRecentBookings()
  adminStore.getFlights()
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'On Time': return 'text-green-600 bg-green-50 border-green-600'
    case 'Delayed': return 'text-yellow-600 bg-yellow-50 border-yellow-600'
    case 'Cancelled': return 'text-red-600 bg-red-50 border-red-600'
    default: return 'text-gray-600 bg-gray-50 border-gray-600'
  }
}

const getOccupancyColor = (percentage: number) => {
  if (percentage >= 90) return 'bg-red-600'
  if (percentage >= 70) return 'bg-yellow-600'
  return 'bg-green-600'
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
        <div class="inline-flex items-center rounded-full px-4 py-2 mb-4" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
          <BarChart3 class="w-4 h-4 mr-2 text-white" />
          <span class="font-semibold text-sm text-white">ADMIN PANEL</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">Dashboard</h1>
        <p class="text-xl text-white/90 max-w-2xl font-medium">Monitor and manage your airline operations</p>
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

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Recent Bookings -->
        <div class="bg-white shadow-xl border-4 border-gray-900">
          <div class="bg-gray-900 px-6 py-4">
            <h2 class="font-black text-white uppercase tracking-widest">Recent Bookings</h2>
          </div>

          <div class="p-6">
            <div class="space-y-4">
              <div
                v-for="booking in recentBookings"
                :key="booking.id"
                class="bg-gray-50 p-4 border-l-4 border-gray-900"
              >
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <div class="font-black text-lg text-gray-900">{{ booking.reference }}</div>
                    <div class="text-sm font-semibold text-gray-600">{{ booking.passenger }}</div>
                  </div>
                  <div class="px-3 py-1 bg-green-600 text-white text-xs font-black uppercase">
                    {{ booking.status }}
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div class="text-xs text-gray-500 font-bold uppercase">Route</div>
                    <div class="font-black text-gray-900">{{ booking.route }}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-xs text-gray-500 font-bold uppercase">Amount</div>
                    <div class="font-black text-gray-900">₱{{ booking.amount.toLocaleString() }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Flight Management -->
        <div class="bg-white shadow-xl border-4 border-gray-900">
          <div class="bg-blue-600 px-6 py-4">
            <h2 class="font-black text-white uppercase tracking-widest">Flight Status</h2>
          </div>

          <div class="p-6">
            <div class="space-y-4">
              <div
                v-for="flight in flights"
                :key="flight.id"
                class="border-4 border-gray-900 p-4"
              >
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <div class="font-black text-xl text-gray-900">{{ flight.flightNumber }}</div>
                    <div class="text-sm font-semibold text-gray-600">{{ flight.from }} → {{ flight.to }}</div>
                  </div>
                  <div :class="['px-3 py-1 text-xs font-black uppercase border-2', getStatusColor(flight.status)]">
                    {{ flight.status }}
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <div class="text-xs text-gray-500 font-bold uppercase">Departure</div>
                    <div class="font-black text-gray-900">{{ flight.departure }}</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 font-bold uppercase">Arrival</div>
                    <div class="font-black text-gray-900">{{ flight.arrival }}</div>
                  </div>
                </div>

                <!-- Occupancy Bar -->
                <div>
                  <div class="flex justify-between text-xs font-bold uppercase mb-1">
                    <span>Occupancy</span>
                    <span>{{ flight.booked }}/{{ flight.capacity }} ({{ Math.round((flight.booked / flight.capacity) * 100) }}%)</span>
                  </div>
                  <div class="w-full h-3 bg-gray-200 border-2 border-gray-900">
                    <div
                      :class="['h-full', getOccupancyColor((flight.booked / flight.capacity) * 100)]"
                      :style="{ width: `${(flight.booked / flight.capacity) * 100}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>
