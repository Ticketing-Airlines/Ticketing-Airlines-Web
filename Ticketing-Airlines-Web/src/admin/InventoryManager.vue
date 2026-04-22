<script setup lang="ts">
import { ref, computed } from 'vue'
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
import { Package, Search, Edit, X, Plane } from 'lucide-vue-next'
import { fareBuckets, flightInstances, flightSchedules, airports } from '@/data/mockData'
import type { FareBucket, FareCode } from '@/interfaces/interfaces'

const searchQuery = ref('')
const selectedFareCode = ref<FareCode | 'All'>('All')
const isEditModalOpen = ref(false)
const selectedBucket = ref<FareBucket | null>(null)

// Form data
const formData = ref({
  total: 0,
  held: 0,
  sold: 0,
  price: 0
})

const fareCodes: FareCode[] = ['Y', 'M', 'B']

const filteredBuckets = computed(() => {
  let filtered = fareBuckets

  // Filter by search query (flight number)
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(bucket => {
      const flightInstance = getFlightInstance(bucket.flightInstanceId)
      if (!flightInstance) return false
      const schedule = getFlightSchedule(flightInstance.flightScheduleId)
      return schedule?.flightNumber.toLowerCase().includes(query)
    })
  }

  // Filter by fare code
  if (selectedFareCode.value !== 'All') {
    filtered = filtered.filter(bucket => bucket.code === selectedFareCode.value)
  }

  return filtered
})

const getFlightInstance = (flightInstanceId: string) => {
  return flightInstances.find(f => f.flightInstanceId === flightInstanceId)
}

const getFlightSchedule = (flightScheduleId: number) => {
  return flightSchedules.find(s => s.flightScheduleId === flightScheduleId)
}

const getFlightNumber = (bucket: FareBucket) => {
  const instance = getFlightInstance(bucket.flightInstanceId)
  if (!instance) return 'N/A'
  const schedule = getFlightSchedule(instance.flightScheduleId)
  return schedule?.flightNumber || 'N/A'
}

const getFlightRoute = (bucket: FareBucket) => {
  const instance = getFlightInstance(bucket.flightInstanceId)
  if (!instance) return ''
  const schedule = getFlightSchedule(instance.flightScheduleId)
  if (!schedule) return ''

  const origin = airports.find(a => a.airportId === schedule.originAirportId)
  const destination = airports.find(a => a.airportId === schedule.destinationAirportId)

  return `${origin?.iataCode || '???'} → ${destination?.iataCode || '???'}`
}

const getAvailable = (bucket: FareBucket) => {
  return bucket.total - bucket.held - bucket.sold
}

const getFareCodeLabel = (code: FareCode) => {
  const labels: Record<FareCode, string> = {
    Y: 'Economy',
    M: 'Premium',
    B: 'Business'
  }
  return labels[code]
}

const getFareCodeColor = (code: FareCode) => {
  const colors: Record<FareCode, string> = {
    Y: 'text-blue-600 bg-blue-50',
    M: 'text-purple-600 bg-purple-50',
    B: 'text-green-600 bg-green-50'
  }
  return colors[code]
}

const openEditModal = (bucket: FareBucket) => {
  selectedBucket.value = bucket
  formData.value = {
    total: bucket.total,
    held: bucket.held,
    sold: bucket.sold,
    price: bucket.price
  }
  isEditModalOpen.value = true
}

const closeModal = () => {
  isEditModalOpen.value = false
  selectedBucket.value = null
}

const handleUpdate = () => {
  console.log('Updating inventory:', {
    bucketId: selectedBucket.value?.fareBucketId,
    formData: formData.value
  })
  // TODO: Implement actual update logic
  closeModal()
}

const getUtilization = (bucket: FareBucket) => {
  const used = bucket.held + bucket.sold
  const percentage = (used / bucket.total) * 100
  return Math.round(percentage)
}

const getUtilizationColor = (percentage: number) => {
  if (percentage >= 90) return 'bg-red-500'
  if (percentage >= 70) return 'bg-yellow-500'
  return 'bg-green-500'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Inventory Management</h1>
      <p class="mt-2 text-sm text-gray-600">
        Manage fare buckets and seat inventory for all flights
      </p>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Capacity</p>
              <p class="mt-2 text-3xl font-bold text-gray-900">
                {{ fareBuckets.reduce((sum, b) => sum + b.total, 0) }}
              </p>
            </div>
            <div class="p-3 bg-blue-50 rounded-lg">
              <Package class="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Seats Sold</p>
              <p class="mt-2 text-3xl font-bold text-gray-900">
                {{ fareBuckets.reduce((sum, b) => sum + b.sold, 0) }}
              </p>
            </div>
            <div class="p-3 bg-green-50 rounded-lg">
              <Plane class="w-8 h-8 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Available</p>
              <p class="mt-2 text-3xl font-bold text-gray-900">
                {{ fareBuckets.reduce((sum, b) => sum + (b.total - b.held - b.sold), 0) }}
              </p>
            </div>
            <div class="p-3 bg-purple-50 rounded-lg">
              <Package class="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Filters -->
    <Card>
      <CardContent class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              v-model="searchQuery"
              placeholder="Search by flight number..."
              class="pl-10"
            />
          </div>
          <Select v-model="selectedFareCode">
            <SelectTrigger>
              <SelectValue placeholder="Filter by fare class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Fare Classes</SelectItem>
              <SelectItem value="Y">Economy (Y)</SelectItem>
              <SelectItem value="M">Premium (M)</SelectItem>
              <SelectItem value="B">Business (B)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>

    <!-- Inventory Table -->
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
                  Fare Class
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Held
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sold
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Available
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilization
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="bucket in filteredBuckets" :key="bucket.fareBucketId" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <Plane class="w-4 h-4 text-blue-600 mr-2" />
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ getFlightNumber(bucket) }}</div>
                      <div class="text-xs text-gray-500">{{ getFlightRoute(bucket) }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      getFareCodeColor(bucket.code)
                    ]"
                  >
                    {{ getFareCodeLabel(bucket.code) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  {{ bucket.currency }} {{ bucket.price.toLocaleString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ bucket.total }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-medium">{{ bucket.held }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">{{ bucket.sold }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                  {{ getAvailable(bucket) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center space-x-2">
                    <div class="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        :class="[
                          'h-2 rounded-full transition-all',
                          getUtilizationColor(getUtilization(bucket))
                        ]"
                        :style="{ width: `${getUtilization(bucket)}%` }"
                      ></div>
                    </div>
                    <span class="text-xs text-gray-600 font-medium">{{ getUtilization(bucket) }}%</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="openEditModal(bucket)"
                    class="text-blue-600 hover:text-blue-900"
                    title="Edit Inventory"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="filteredBuckets.length === 0" class="text-center py-12 text-gray-500">
            <Package class="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No inventory found</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Edit Modal -->
    <div
      v-if="isEditModalOpen && selectedBucket"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      @click.self="closeModal"
    >
      <Card class="w-full max-w-lg">
        <CardHeader class="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Edit Inventory</CardTitle>
            <p class="text-sm text-gray-500 mt-1">
              {{ getFlightNumber(selectedBucket) }} - {{ getFareCodeLabel(selectedBucket.code) }}
            </p>
          </div>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <X class="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="total">Total Capacity</Label>
              <Input
                id="total"
                v-model.number="formData.total"
                type="number"
                min="0"
              />
            </div>
            <div class="space-y-2">
              <Label for="price">Price ({{ selectedBucket.currency }})</Label>
              <Input
                id="price"
                v-model.number="formData.price"
                type="number"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="held">Held Seats</Label>
              <Input
                id="held"
                v-model.number="formData.held"
                type="number"
                min="0"
              />
            </div>
            <div class="space-y-2">
              <Label for="sold">Sold Seats</Label>
              <Input
                id="sold"
                v-model.number="formData.sold"
                type="number"
                min="0"
              />
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Available Seats:</span>
              <span class="font-semibold text-blue-700">
                {{ formData.total - formData.held - formData.sold }}
              </span>
            </div>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <Button variant="outline" @click="closeModal">Cancel</Button>
            <Button @click="handleUpdate">Update Inventory</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
