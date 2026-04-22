<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Plane,
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Clock,
  X
} from 'lucide-vue-next'
import { flightSchedules, flightInstances, airports } from '@/data/mockData'
import type { FlightSchedule, FlightInstance, FlightStatus } from '@/interfaces/interfaces'

const searchQuery = ref('')
const selectedStatus = ref<FlightStatus | 'All'>('All')
const isCreateModalOpen = ref(false)
const isEditModalOpen = ref(false)
const selectedFlight = ref<FlightInstance | null>(null)

// Form data
const formData = ref({
  flightNumber: '',
  originAirportId: '',
  destinationAirportId: '',
  departureDate: '',
  departureTime: '',
  arrivalTime: '',
  flightStatus: 'Scheduled' as FlightStatus
})

const flightStatuses: FlightStatus[] = [
  'Scheduled',
  'Delayed',
  'Departed',
  'Arrived',
  'Cancelled'
]

const filteredFlights = computed(() => {
  let filtered = flightInstances

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (flight) =>
        flight.flightNumber.toLowerCase().includes(query) ||
        airports
          .find((a) => a.airportId === flight.originAirportId)
          ?.city.toLowerCase()
          .includes(query) ||
        airports
          .find((a) => a.airportId === flight.destinationAirportId)
          ?.city.toLowerCase()
          .includes(query)
    )
  }

  if (selectedStatus.value !== 'All') {
    filtered = filtered.filter((flight) => flight.flightStatus === selectedStatus.value)
  }

  return filtered
})

const openCreateModal = () => {
  formData.value = {
    flightNumber: '',
    originAirportId: '',
    destinationAirportId: '',
    departureDate: '',
    departureTime: '',
    arrivalTime: '',
    flightStatus: 'Scheduled'
  }
  isCreateModalOpen.value = true
}

const openEditModal = (flight: FlightInstance) => {
  selectedFlight.value = flight
  const departureDate = new Date(flight.scheduledDepartureUtc)
  const arrivalDate = new Date(flight.scheduledArrivalUtc)

  formData.value = {
    flightNumber: flight.flightNumber,
    originAirportId: flight.originAirportId,
    destinationAirportId: flight.destinationAirportId,
    departureDate: departureDate.toISOString().split('T')[0],
    departureTime: departureDate.toTimeString().slice(0, 5),
    arrivalTime: arrivalDate.toTimeString().slice(0, 5),
    flightStatus: flight.flightStatus
  }
  isEditModalOpen.value = true
}

const closeModal = () => {
  isCreateModalOpen.value = false
  isEditModalOpen.value = false
  selectedFlight.value = null
}

const handleCreate = () => {
  console.log('Creating flight:', formData.value)
  // TODO: Implement actual create logic
  closeModal()
}

const handleUpdate = () => {
  console.log('Updating flight:', selectedFlight.value?.flightInstanceId, formData.value)
  // TODO: Implement actual update logic
  closeModal()
}

const handleDelete = (flightId: number) => {
  if (confirm('Are you sure you want to cancel this flight?')) {
    console.log('Cancelling flight:', flightId)
    // TODO: Implement actual delete/cancel logic
  }
}

const getAirportInfo = (airportId: number) => {
  return airports.find((a) => a.airportId === airportId)
}

const getStatusColor = (status: FlightStatus) => {
  const colors: Record<FlightStatus, string> = {
    Scheduled: 'text-blue-600 bg-blue-50',
    Delayed: 'text-orange-600 bg-orange-50',
    Departed: 'text-purple-600 bg-purple-50',
    Arrived: 'text-green-600 bg-green-50',
    Cancelled: 'text-red-600 bg-red-50'
  }
  return colors[status]
}

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }
}

onMounted(() => {
  console.log('Flights Manager loaded')
})
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Flights Management</h1>
        <p class="mt-2 text-sm text-gray-600">
          Create, edit, and manage flight schedules and instances
        </p>
      </div>
      <Button @click="openCreateModal" class="flex items-center space-x-2">
        <Plus class="w-4 h-4" />
        <span>Add Flight</span>
      </Button>
    </div>

    <!-- Filters -->
    <Card>
      <CardContent class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              v-model="searchQuery"
              placeholder="Search by flight number, origin, or destination..."
              class="pl-10"
            />
          </div>
          <Select v-model="selectedStatus">
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem v-for="status in flightStatuses" :key="status" :value="status">
                {{ status }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>

    <!-- Flights Table -->
    <Card>
      <CardContent class="p-0">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Flight
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departure
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Arrival
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="flight in filteredFlights" :key="flight.flightInstanceId" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <Plane class="w-4 h-4 text-blue-600 mr-2" />
                    <span class="text-sm font-medium text-gray-900">{{ flight.flightNumber }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center space-x-2 text-sm text-gray-900">
                    <span>{{ getAirportInfo(flight.originAirportId)?.iataCode }}</span>
                    <MapPin class="w-3 h-3 text-gray-400" />
                    <span>{{ getAirportInfo(flight.destinationAirportId)?.iataCode }}</span>
                  </div>
                  <div class="text-xs text-gray-500 mt-1">
                    {{ getAirportInfo(flight.originAirportId)?.city }} →
                    {{ getAirportInfo(flight.destinationAirportId)?.city }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ formatDateTime(flight.scheduledDepartureUtc).date }}
                  </div>
                  <div class="flex items-center text-xs text-gray-500 mt-1">
                    <Clock class="w-3 h-3 mr-1" />
                    {{ formatDateTime(flight.scheduledDepartureUtc).time }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ formatDateTime(flight.scheduledArrivalUtc).date }}
                  </div>
                  <div class="flex items-center text-xs text-gray-500 mt-1">
                    <Clock class="w-3 h-3 mr-1" />
                    {{ formatDateTime(flight.scheduledArrivalUtc).time }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      getStatusColor(flight.flightStatus)
                    ]"
                  >
                    {{ flight.flightStatus }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="openEditModal(flight)"
                    class="text-blue-600 hover:text-blue-900 mr-3"
                    title="Edit"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button
                    @click="handleDelete(flight.flightInstanceId)"
                    class="text-red-600 hover:text-red-900"
                    title="Cancel"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="filteredFlights.length === 0" class="text-center py-12 text-gray-500">
            <Plane class="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No flights found</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Create/Edit Modal -->
    <div
      v-if="isCreateModalOpen || isEditModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      @click.self="closeModal"
    >
      <Card class="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader class="flex flex-row items-center justify-between">
          <CardTitle>{{ isCreateModalOpen ? 'Create New Flight' : 'Edit Flight' }}</CardTitle>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <X class="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="flightNumber">Flight Number</Label>
              <Input
                id="flightNumber"
                v-model="formData.flightNumber"
                placeholder="e.g., SS101"
              />
            </div>
            <div class="space-y-2">
              <Label for="status">Status</Label>
              <Select v-model="formData.flightStatus">
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="status in flightStatuses" :key="status" :value="status">
                    {{ status }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="origin">Origin Airport</Label>
              <Select v-model="formData.originAirportId">
                <SelectTrigger id="origin">
                  <SelectValue placeholder="Select origin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="airport in airports"
                    :key="airport.airportId"
                    :value="airport.airportId.toString()"
                  >
                    {{ airport.iataCode }} - {{ airport.city }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="space-y-2">
              <Label for="destination">Destination Airport</Label>
              <Select v-model="formData.destinationAirportId">
                <SelectTrigger id="destination">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="airport in airports"
                    :key="airport.airportId"
                    :value="airport.airportId.toString()"
                  >
                    {{ airport.iataCode }} - {{ airport.city }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="space-y-2">
            <Label for="departureDate">Departure Date</Label>
            <Input id="departureDate" v-model="formData.departureDate" type="date" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="departureTime">Departure Time</Label>
              <Input id="departureTime" v-model="formData.departureTime" type="time" />
            </div>
            <div class="space-y-2">
              <Label for="arrivalTime">Arrival Time</Label>
              <Input id="arrivalTime" v-model="formData.arrivalTime" type="time" />
            </div>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <Button variant="outline" @click="closeModal">Cancel</Button>
            <Button @click="isCreateModalOpen ? handleCreate() : handleUpdate()">
              {{ isCreateModalOpen ? 'Create Flight' : 'Update Flight' }}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
