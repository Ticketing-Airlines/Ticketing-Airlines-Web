<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plane, Shield, Clock, Heart } from 'lucide-vue-next'

// Mock data for airports
const airports = ref([
  { iataCode: 'MNL', city: 'Manila', country: 'Philippines' },
  { iataCode: 'CEB', city: 'Cebu', country: 'Philippines' },
  { iataCode: 'DVO', city: 'Davao', country: 'Philippines' },
  { iataCode: 'ILO', city: 'Iloilo', country: 'Philippines' },
  { iataCode: 'BCD', city: 'Bacolod', country: 'Philippines' },
  { iataCode: 'SIN', city: 'Singapore', country: 'Singapore' },
  { iataCode: 'HKG', city: 'Hong Kong', country: 'Hong Kong' },
  { iataCode: 'NRT', city: 'Tokyo', country: 'Japan' },
  { iataCode: 'ICN', city: 'Seoul', country: 'South Korea' },
  { iataCode: 'BKK', city: 'Bangkok', country: 'Thailand' }
])

const popularDestinations = ref([
  { code: 'CEB', city: 'Cebu', country: 'Philippines', price: 3500 },
  { code: 'DVO', city: 'Davao', country: 'Philippines', price: 4200 },
  { code: 'SIN', city: 'Singapore', country: 'Singapore', price: 8900 },
  { code: 'HKG', city: 'Hong Kong', country: 'Hong Kong', price: 12500 },
  { code: 'BKK', city: 'Bangkok', country: 'Thailand', price: 15800 },
  { code: 'NRT', city: 'Tokyo', country: 'Japan', price: 25000 },
  { code: 'ICN', city: 'Seoul', country: 'South Korea', price: 18500 },
  { code: 'ILO', city: 'Iloilo', country: 'Philippines', price: 3800 }
])

const tripType = ref('roundtrip')
const searchForm = ref({
  origin: '',
  destination: '',
  departureDate: '',
  returnDate: '',
  passengers: '1',
  class: 'Economy'
})

const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const isFormValid = computed(() => {
  return searchForm.value.origin &&
         searchForm.value.destination &&
         searchForm.value.departureDate &&
         (tripType.value === 'oneway' || searchForm.value.returnDate)
})

const searchFlights = () => {
  if (isFormValid.value) {
    // Here you would typically make an API call to search for flights
    console.log('Searching flights with:', searchForm.value)
    // For now, we'll just show an alert
    alert('Flight search functionality will be implemented with backend integration')
  }
}

onMounted(() => {
  // Set default departure date to tomorrow
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  searchForm.value.departureDate = tomorrow.toISOString().split('T')[0]

  // Set default return date to 7 days from departure
  const returnDate = new Date(tomorrow)
  returnDate.setDate(returnDate.getDate() + 7)
  searchForm.value.returnDate = returnDate.toISOString().split('T')[0]
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold mb-4">Book Your Flight</h1>
        <p class="text-xl opacity-90">Find the best deals on flights to your favorite destinations</p>
      </div>
    </div>

    <!-- Flight Search Form -->
    <div class="container mx-auto px-4 -mt-8 relative z-10">
      <Card class="shadow-2xl">
        <CardContent class="p-8">
          <form @submit.prevent="searchFlights" class="space-y-6">
            <!-- Trip Type -->
            <div class="flex gap-4 mb-6">
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="tripType"
                  type="radio"
                  value="roundtrip"
                  class="mr-2 text-blue-600"
                >
                <span class="font-medium">Round Trip</span>
              </label>
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="tripType"
                  type="radio"
                  value="oneway"
                  class="mr-2 text-blue-600"
                >
                <span class="font-medium">One Way</span>
              </label>
            </div>

            <!-- Origin and Destination -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <Label for="origin" class="text-sm font-medium text-gray-700">From</Label>
                <Select v-model="searchForm.origin">
                  <SelectTrigger class="h-12">
                    <SelectValue placeholder="Select departure city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="airport in airports" :key="airport.iataCode" :value="airport.iataCode">
                      {{ airport.city }} ({{ airport.iataCode }})
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div class="space-y-2">
                <Label for="destination" class="text-sm font-medium text-gray-700">To</Label>
                <Select v-model="searchForm.destination">
                  <SelectTrigger class="h-12">
                    <SelectValue placeholder="Select destination city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="airport in airports" :key="airport.iataCode" :value="airport.iataCode">
                      {{ airport.city }} ({{ airport.iataCode }})
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <!-- Dates -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <Label for="departure" class="text-sm font-medium text-gray-700">Departure Date</Label>
                <Input
                  v-model="searchForm.departureDate"
                  type="date"
                  class="h-12"
                  :min="today"
                />
              </div>

              <div class="space-y-2" v-if="tripType === 'roundtrip'">
                <Label for="return" class="text-sm font-medium text-gray-700">Return Date</Label>
                <Input
                  v-model="searchForm.returnDate"
                  type="date"
                  class="h-12"
                  :min="searchForm.departureDate"
                />
              </div>
            </div>

            <!-- Passengers and Class -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <Label for="passengers" class="text-sm font-medium text-gray-700">Passengers</Label>
                <Select v-model="searchForm.passengers">
                  <SelectTrigger class="h-12">
                    <SelectValue placeholder="Select passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="i in 9" :key="i" :value="i.toString()">
                      {{ i }} {{ i === 1 ? 'Passenger' : 'Passengers' }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div class="space-y-2">
                <Label for="class" class="text-sm font-medium text-gray-700">Class</Label>
                <Select v-model="searchForm.class">
                  <SelectTrigger class="h-12">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Economy">Economy</SelectItem>
                    <SelectItem value="Premium">Premium Economy</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <!-- Search Button -->
            <Button
              type="submit"
              class="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              :disabled="!isFormValid"
            >
              <Plane class="mr-2 h-5 w-5" />
              Search Flights
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>

    <!-- Popular Destinations -->
    <div class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">Popular Destinations</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card v-for="destination in popularDestinations" :key="destination.code" class="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
          <div class="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 relative">
            <div class="absolute inset-0 bg-black bg-opacity-20"></div>
            <div class="absolute bottom-4 left-4 text-white">
              <h3 class="text-xl font-bold">{{ destination.city }}</h3>
              <p class="text-sm opacity-90">{{ destination.country }}</p>
            </div>
          </div>
          <CardContent class="p-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">From</span>
              <span class="text-lg font-bold text-blue-600">₱{{ destination.price.toLocaleString() }}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Features Section -->
    <div class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Us</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield class="h-8 w-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Safe & Secure</h3>
            <p class="text-gray-600">Your safety is our priority with world-class security measures</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock class="h-8 w-8 text-green-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">On-Time Performance</h3>
            <p class="text-gray-600">Reliable schedules with excellent on-time performance record</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart class="h-8 w-8 text-purple-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Customer Care</h3>
            <p class="text-gray-600">24/7 customer support to assist you throughout your journey</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
