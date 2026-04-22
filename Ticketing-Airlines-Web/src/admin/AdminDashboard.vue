<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plane, Users, Ticket, DollarSign, TrendingUp, TrendingDown } from 'lucide-vue-next'
import { flights, bookings, users, flightInstances } from '@/data/mockData'
import type { FlightStatus, BookingStatus } from '@/interfaces/interfaces'

interface StatCard {
  title: string
  value: string | number
  change: string
  changeType: 'increase' | 'decrease'
  icon: any
  bgColor: string
}

const stats = ref<StatCard[]>([])
const recentBookings = ref<any[]>([])
const flightStatusCounts = ref<{ status: FlightStatus; count: number }[]>([])

const calculateStats = () => {
  // Total Flights
  const totalFlights = flightInstances.length

  // Total Users
  const totalUsers = users.length

  // Total Bookings
  const totalBookings = bookings.length

  // Total Revenue
  const totalRevenue = bookings
    .filter((b) => b.bookingStatus === 'Paid' || b.bookingStatus === 'Ticketed')
    .reduce((sum, b) => sum + b.totalAmount, 0)

  stats.value = [
    {
      title: 'Total Flights',
      value: totalFlights,
      change: '+12%',
      changeType: 'increase',
      icon: Plane,
      bgColor: 'bg-blue-500'
    },
    {
      title: 'Total Users',
      value: totalUsers,
      change: '+8%',
      changeType: 'increase',
      icon: Users,
      bgColor: 'bg-green-500'
    },
    {
      title: 'Total Bookings',
      value: totalBookings,
      change: '+15%',
      changeType: 'increase',
      icon: Ticket,
      bgColor: 'bg-purple-500'
    },
    {
      title: 'Revenue',
      value: `₱${totalRevenue.toLocaleString()}`,
      change: '-3%',
      changeType: 'decrease',
      icon: DollarSign,
      bgColor: 'bg-orange-500'
    }
  ]

  // Recent bookings
  recentBookings.value = bookings.slice(0, 5).map((booking) => ({
    pnr: booking.pnrCode,
    email: booking.contactEmail,
    amount: booking.totalAmount,
    status: booking.bookingStatus,
    date: new Date(booking.bookingDate).toLocaleDateString()
  }))

  // Flight status counts
  const statusMap = new Map<FlightStatus, number>()
  flightInstances.forEach((flight) => {
    const count = statusMap.get(flight.flightStatus) || 0
    statusMap.set(flight.flightStatus, count + 1)
  })

  flightStatusCounts.value = Array.from(statusMap.entries()).map(([status, count]) => ({
    status,
    count
  }))
}

const getStatusColor = (status: BookingStatus | FlightStatus) => {
  const colors: Record<string, string> = {
    Paid: 'text-green-600 bg-green-50',
    Ticketed: 'text-green-600 bg-green-50',
    Pending: 'text-yellow-600 bg-yellow-50',
    Cancelled: 'text-red-600 bg-red-50',
    Scheduled: 'text-blue-600 bg-blue-50',
    Departed: 'text-purple-600 bg-purple-50',
    Delayed: 'text-orange-600 bg-orange-50',
    Arrived: 'text-green-600 bg-green-50'
  }
  return colors[status] || 'text-gray-600 bg-gray-50'
}

onMounted(() => {
  calculateStats()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="mt-2 text-sm text-gray-600">
        Welcome to your admin dashboard. Here's what's happening today.
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card v-for="stat in stats" :key="stat.title">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">{{ stat.title }}</p>
              <p class="mt-2 text-3xl font-bold text-gray-900">{{ stat.value }}</p>
              <div class="mt-2 flex items-center text-sm">
                <component
                  :is="stat.changeType === 'increase' ? TrendingUp : TrendingDown"
                  :class="[
                    'w-4 h-4 mr-1',
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  ]"
                />
                <span
                  :class="stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'"
                >
                  {{ stat.change }}
                </span>
                <span class="text-gray-600 ml-1">from last month</span>
              </div>
            </div>
            <div :class="[stat.bgColor, 'p-3 rounded-lg']">
              <component :is="stat.icon" class="w-8 h-8 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Two Column Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Bookings -->
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="booking in recentBookings"
              :key="booking.pnr"
              class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div>
                <p class="text-sm font-medium text-gray-900">{{ booking.pnr }}</p>
                <p class="text-xs text-gray-500">{{ booking.email }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ booking.date }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-gray-900">
                  ₱{{ booking.amount.toLocaleString() }}
                </p>
                <span
                  :class="[
                    'inline-block px-2 py-1 mt-1 text-xs font-medium rounded-full',
                    getStatusColor(booking.status)
                  ]"
                >
                  {{ booking.status }}
                </span>
              </div>
            </div>

            <div v-if="recentBookings.length === 0" class="text-center py-8 text-gray-500">
              No recent bookings
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Flight Status Overview -->
      <Card>
        <CardHeader>
          <CardTitle>Flight Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="statusCount in flightStatusCounts"
              :key="statusCount.status"
              class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div class="flex items-center space-x-3">
                <span
                  :class="[
                    'inline-block w-3 h-3 rounded-full',
                    getStatusColor(statusCount.status).includes('green')
                      ? 'bg-green-500'
                      : getStatusColor(statusCount.status).includes('blue')
                        ? 'bg-blue-500'
                        : getStatusColor(statusCount.status).includes('yellow')
                          ? 'bg-yellow-500'
                          : getStatusColor(statusCount.status).includes('orange')
                            ? 'bg-orange-500'
                            : 'bg-gray-500'
                  ]"
                ></span>
                <p class="text-sm font-medium text-gray-900">{{ statusCount.status }}</p>
              </div>
              <div class="flex items-center space-x-4">
                <span class="text-sm font-semibold text-gray-900">{{ statusCount.count }}</span>
              </div>
            </div>

            <div v-if="flightStatusCounts.length === 0" class="text-center py-8 text-gray-500">
              No flights available
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Quick Actions -->
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            @click="$router.push('/admin/flights')"
            class="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
          >
            <Plane class="w-6 h-6 text-blue-600 mb-2" />
            <p class="font-medium text-gray-900">Add New Flight</p>
            <p class="text-sm text-gray-500">Create flight schedules</p>
          </button>

          <button
            @click="$router.push('/admin/users')"
            class="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left"
          >
            <Users class="w-6 h-6 text-green-600 mb-2" />
            <p class="font-medium text-gray-900">Manage Users</p>
            <p class="text-sm text-gray-500">Add or edit user roles</p>
          </button>

          <button
            @click="$router.push('/admin/bookings')"
            class="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-left"
          >
            <Ticket class="w-6 h-6 text-purple-600 mb-2" />
            <p class="font-medium text-gray-900">View Bookings</p>
            <p class="text-sm text-gray-500">Search and manage bookings</p>
          </button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
