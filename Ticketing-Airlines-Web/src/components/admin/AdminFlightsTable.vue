<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, RefreshCw } from 'lucide-vue-next'
import type { Flight } from '@/stores/adminStore'

interface Props {
  flights: Flight[]
  onStatusUpdate?: (flightId: string, status: 'On Time' | 'Delayed' | 'Cancelled') => void
}

const props = defineProps<Props>()

const searchQuery = ref('')
const statusFilter = ref('All')

const filteredFlights = computed(() => {
  let result = props.flights

  // Apply status filter
  if (statusFilter.value !== 'All') {
    result = result.filter(f => f.status === statusFilter.value)
  }

  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(f =>
      f.flightNumber.toLowerCase().includes(query) ||
      f.from.toLowerCase().includes(query) ||
      f.to.toLowerCase().includes(query) ||
      `${f.from} → ${f.to}`.toLowerCase().includes(query)
    )
  }

  return result
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'On Time': return 'bg-green-600 border-green-600 text-white'
    case 'Delayed': return 'bg-yellow-600 border-yellow-600 text-white'
    case 'Cancelled': return 'bg-red-600 border-red-600 text-white'
    default: return 'bg-gray-600 border-gray-600 text-white'
  }
}

const getOccupancyColor = (percentage: number) => {
  if (percentage >= 90) return 'bg-red-600'
  if (percentage >= 70) return 'bg-yellow-600'
  return 'bg-green-600'
}

const handleStatusUpdate = (flightId: string, event: Event) => {
  const newStatus = (event.target as HTMLSelectElement).value as 'On Time' | 'Delayed' | 'Cancelled'
  if (props.onStatusUpdate) {
    props.onStatusUpdate(flightId, newStatus)
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
          placeholder="Search by flight number or route..."
          class="pl-10 h-12 border-2 border-gray-900 font-bold"
        />
      </div>

      <!-- Status Filter -->
      <select
        v-model="statusFilter"
        class="h-12 px-4 border-2 border-gray-900 font-black uppercase text-sm bg-white"
      >
        <option value="All">All Status</option>
        <option value="On Time">On Time</option>
        <option value="Delayed">Delayed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto border-4 border-gray-900">
      <table class="w-full">
        <thead class="bg-gray-900 text-white">
          <tr>
            <th class="px-4 py-3 text-left font-black uppercase text-xs tracking-widest">Flight #</th>
            <th class="px-4 py-3 text-left font-black uppercase text-xs tracking-widest">Route</th>
            <th class="px-4 py-3 text-left font-black uppercase text-xs tracking-widest">Departure</th>
            <th class="px-4 py-3 text-left font-black uppercase text-xs tracking-widest">Arrival</th>
            <th class="px-4 py-3 text-center font-black uppercase text-xs tracking-widest">Occupancy</th>
            <th class="px-4 py-3 text-center font-black uppercase text-xs tracking-widest">Status</th>
            <th class="px-4 py-3 text-center font-black uppercase text-xs tracking-widest">Update</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="flight in filteredFlights"
            :key="flight.id"
            class="border-b-2 border-gray-900 hover:bg-gray-50 transition-colors"
          >
            <td class="px-4 py-4 font-black text-gray-900">{{ flight.flightNumber }}</td>
            <td class="px-4 py-4">
              <div class="font-semibold text-gray-600">
                {{ flight.from }} → {{ flight.to }}
              </div>
            </td>
            <td class="px-4 py-4 font-semibold text-gray-900">{{ flight.departure }}</td>
            <td class="px-4 py-4 font-semibold text-gray-900">{{ flight.arrival }}</td>
            <td class="px-4 py-4">
              <div class="space-y-1">
                <div class="text-xs font-bold text-center text-gray-900">
                  {{ flight.booked }}/{{ flight.capacity }} ({{ Math.round((flight.booked / flight.capacity) * 100) }}%)
                </div>
                <div class="w-full h-2 bg-gray-200 border border-gray-900">
                  <div
                    :class="['h-full', getOccupancyColor((flight.booked / flight.capacity) * 100)]"
                    :style="{ width: `${(flight.booked / flight.capacity) * 100}%` }"
                  ></div>
                </div>
              </div>
            </td>
            <td class="px-4 py-4 text-center">
              <span :class="['px-3 py-1 text-xs font-black uppercase border-2', getStatusColor(flight.status)]">
                {{ flight.status }}
              </span>
            </td>
            <td class="px-4 py-4">
              <div class="flex items-center justify-center">
                <select
                  :value="flight.status"
                  @change="handleStatusUpdate(flight.id, $event)"
                  class="px-3 py-2 border-2 border-gray-900 font-bold text-xs bg-white uppercase"
                >
                  <option value="On Time">On Time</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </td>
          </tr>
          <tr v-if="filteredFlights.length === 0">
            <td colspan="7" class="px-4 py-12 text-center">
              <p class="text-gray-500 font-bold uppercase">No flights found</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Summary -->
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-green-50 border-2 border-green-600 p-4">
        <div class="text-xs font-black text-green-900 uppercase tracking-widest mb-1">On Time</div>
        <div class="text-2xl font-black text-green-900">
          {{ filteredFlights.filter(f => f.status === 'On Time').length }}
        </div>
      </div>
      <div class="bg-yellow-50 border-2 border-yellow-600 p-4">
        <div class="text-xs font-black text-yellow-900 uppercase tracking-widest mb-1">Delayed</div>
        <div class="text-2xl font-black text-yellow-900">
          {{ filteredFlights.filter(f => f.status === 'Delayed').length }}
        </div>
      </div>
      <div class="bg-red-50 border-2 border-red-600 p-4">
        <div class="text-xs font-black text-red-900 uppercase tracking-widest mb-1">Cancelled</div>
        <div class="text-2xl font-black text-red-900">
          {{ filteredFlights.filter(f => f.status === 'Cancelled').length }}
        </div>
      </div>
    </div>
  </div>
</template>
