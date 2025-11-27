<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Eye, XCircle, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { RecentBooking } from '@/stores/adminStore'

interface Props {
  bookings: RecentBooking[]
  onCancel?: (bookingId: string) => void
  onView?: (reference: string) => void
}

const props = defineProps<Props>()

const searchQuery = ref('')
const statusFilter = ref('All')
const currentPage = ref(1)
const itemsPerPage = 10

const filteredBookings = computed(() => {
  let result = props.bookings

  // Apply status filter
  if (statusFilter.value !== 'All') {
    result = result.filter(b => b.status === statusFilter.value)
  }

  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(b =>
      b.reference.toLowerCase().includes(query) ||
      b.passenger.toLowerCase().includes(query) ||
      b.route.toLowerCase().includes(query)
    )
  }

  return result
})

const paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredBookings.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredBookings.value.length / itemsPerPage))

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Confirmed': return 'bg-green-600 text-white'
    case 'Pending': return 'bg-yellow-600 text-white'
    case 'Cancelled': return 'bg-red-600 text-white'
    default: return 'bg-gray-600 text-white'
  }
}

const handleView = (reference: string) => {
  if (props.onView) {
    props.onView(reference)
  }
}

const handleCancel = (bookingId: string) => {
  if (confirm('Are you sure you want to cancel this booking?')) {
    if (props.onCancel) {
      props.onCancel(bookingId)
    }
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Search and Filter Bar -->
    <div class="flex flex-col md:flex-row gap-4">
      <!-- Search -->
      <div class="flex-1 relative">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          v-model="searchQuery"
          placeholder="Search by PNR, passenger, or route..."
          class="pl-10 h-12 border-2 border-gray-900 font-bold"
        />
      </div>

      <!-- Status Filter -->
      <select
        v-model="statusFilter"
        class="h-12 px-4 border-2 border-gray-900 font-black uppercase text-sm bg-white"
      >
        <option value="All">All Status</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Pending">Pending</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto border-4 border-gray-900">
      <table class="w-full">
        <thead class="bg-gray-900 text-white">
          <tr>
            <th class="px-4 py-3 text-left font-black uppercase text-xs tracking-widest">PNR</th>
            <th class="px-4 py-3 text-left font-black uppercase text-xs tracking-widest">Passenger</th>
            <th class="px-4 py-3 text-left font-black uppercase text-xs tracking-widest">Route</th>
            <th class="px-4 py-3 text-left font-black uppercase text-xs tracking-widest">Date</th>
            <th class="px-4 py-3 text-right font-black uppercase text-xs tracking-widest">Amount</th>
            <th class="px-4 py-3 text-center font-black uppercase text-xs tracking-widest">Status</th>
            <th class="px-4 py-3 text-center font-black uppercase text-xs tracking-widest">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="booking in paginatedBookings"
            :key="booking.id"
            class="border-b-2 border-gray-900 hover:bg-gray-50 transition-colors"
          >
            <td class="px-4 py-4 font-black text-gray-900">{{ booking.reference }}</td>
            <td class="px-4 py-4 font-semibold text-gray-900">{{ booking.passenger }}</td>
            <td class="px-4 py-4 font-semibold text-gray-600">{{ booking.route }}</td>
            <td class="px-4 py-4 font-semibold text-gray-600">{{ booking.date }}</td>
            <td class="px-4 py-4 font-black text-gray-900 text-right">₱{{ booking.amount.toLocaleString() }}</td>
            <td class="px-4 py-4 text-center">
              <span :class="['px-3 py-1 text-xs font-black uppercase', getStatusColor(booking.status)]">
                {{ booking.status }}
              </span>
            </td>
            <td class="px-4 py-4">
              <div class="flex items-center justify-center gap-2">
                <Button
                  @click="handleView(booking.reference)"
                  size="sm"
                  class="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs"
                >
                  <Eye class="w-4 h-4" />
                </Button>
                <Button
                  v-if="booking.status !== 'Cancelled'"
                  @click="handleCancel(booking.id)"
                  size="sm"
                  variant="outline"
                  class="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-black uppercase text-xs"
                >
                  <XCircle class="w-4 h-4" />
                </Button>
              </div>
            </td>
          </tr>
          <tr v-if="paginatedBookings.length === 0">
            <td colspan="7" class="px-4 py-12 text-center">
              <p class="text-gray-500 font-bold uppercase">No bookings found</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex items-center justify-between">
      <p class="text-sm font-bold text-gray-600">
        Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredBookings.length) }} of {{ filteredBookings.length }} bookings
      </p>
      <div class="flex gap-2">
        <Button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="bg-gray-900 hover:bg-gray-700 text-white font-black uppercase"
          size="sm"
        >
          <ChevronLeft class="w-4 h-4" />
          Prev
        </Button>
        <Button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="bg-gray-900 hover:bg-gray-700 text-white font-black uppercase"
          size="sm"
        >
          Next
          <ChevronRight class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
