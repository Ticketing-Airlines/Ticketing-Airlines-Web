<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold mb-4">Manage Your Booking</h1>
        <p class="text-xl opacity-90">View, modify, or cancel your flight reservations</p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <!-- Search Section -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-6">Find Your Booking</h2>
        <form @submit.prevent="searchBooking" class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label for="bookingRef">Booking Reference</Label>
            <Input
              id="bookingRef"
              v-model="searchForm.bookingReference"
              placeholder="Enter booking reference"
              class="mt-1"
              required
            />
          </div>
          <div>
            <Label for="lastName">Last Name</Label>
            <Input
              id="lastName"
              v-model="searchForm.lastName"
              placeholder="Enter last name"
              class="mt-1"
              required
            />
          </div>
          <div class="flex items-end">
            <Button type="submit" class="w-full bg-blue-600 hover:bg-blue-700">
              <Search class="w-4 h-4 mr-2" />
              Search Booking
            </Button>
          </div>
        </form>
      </div>

      <!-- Booking Details Section -->
      <div v-if="bookingFound" class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h2 class="text-2xl font-semibold">Booking Details</h2>
            <p class="text-gray-600">Reference: {{ currentBooking.reference }}</p>
          </div>
          <div class="text-right">
            <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                 :class="getStatusClass(currentBooking.status)">
              {{ currentBooking.status }}
            </div>
          </div>
        </div>

        <!-- Flight Information -->
        <div class="border rounded-lg p-4 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">Flight Information</h3>
            <div class="text-sm text-gray-600">{{ currentBooking.bookingDate }}</div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Outbound Flight -->
            <div class="border-l-4 border-blue-500 pl-4">
              <h4 class="font-semibold text-blue-600 mb-2">Outbound Flight</h4>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="font-medium">{{ currentBooking.outbound.from }} → {{ currentBooking.outbound.to }}</span>
                  <span class="text-gray-600">{{ currentBooking.outbound.flightNumber }}</span>
                </div>
                <div class="flex justify-between">
                  <span>{{ currentBooking.outbound.date }}</span>
                  <span>{{ currentBooking.outbound.time }}</span>
                </div>
                <div class="text-sm text-gray-600">
                  Duration: {{ currentBooking.outbound.duration }}
                </div>
              </div>
            </div>

            <!-- Return Flight (if exists) -->
            <div v-if="currentBooking.return" class="border-l-4 border-green-500 pl-4">
              <h4 class="font-semibold text-green-600 mb-2">Return Flight</h4>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="font-medium">{{ currentBooking.return.from }} → {{ currentBooking.return.to }}</span>
                  <span class="text-gray-600">{{ currentBooking.return.flightNumber }}</span>
                </div>
                <div class="flex justify-between">
                  <span>{{ currentBooking.return.date }}</span>
                  <span>{{ currentBooking.return.time }}</span>
                </div>
                <div class="text-sm text-gray-600">
                  Duration: {{ currentBooking.return.duration }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Passenger Information -->
        <div class="border rounded-lg p-4 mb-6">
          <h3 class="text-lg font-semibold mb-4">Passenger Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="passenger in currentBooking.passengers" :key="passenger.id" 
                 class="border rounded p-3">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-medium">{{ passenger.name }}</h4>
                <span class="text-sm text-gray-600">{{ passenger.type }}</span>
              </div>
              <div class="text-sm text-gray-600">
                <p>Seat: {{ passenger.seat || 'Not selected' }}</p>
                <p>Meal: {{ passenger.meal || 'Standard' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Booking Summary -->
        <div class="border rounded-lg p-4 mb-6">
          <h3 class="text-lg font-semibold mb-4">Booking Summary</h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>Base Fare</span>
              <span>₱{{ currentBooking.pricing.baseFare.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between">
              <span>Taxes & Fees</span>
              <span>₱{{ currentBooking.pricing.taxes.toLocaleString() }}</span>
            </div>
            <div v-if="currentBooking.pricing.addOns > 0" class="flex justify-between">
              <span>Add-ons</span>
              <span>₱{{ currentBooking.pricing.addOns.toLocaleString() }}</span>
            </div>
            <hr class="my-2">
            <div class="flex justify-between font-semibold text-lg">
              <span>Total Amount</span>
              <span>₱{{ currentBooking.pricing.total.toLocaleString() }}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-4">
          <Button @click="checkIn" class="bg-green-600 hover:bg-green-700">
            <Plane class="w-4 h-4 mr-2" />
            Check In
          </Button>
          <Button @click="selectSeats" variant="outline">
            <MapPin class="w-4 h-4 mr-2" />
            Select Seats
          </Button>
          <Button @click="addBaggage" variant="outline">
            <Luggage class="w-4 h-4 mr-2" />
            Add Baggage
          </Button>
          <Button @click="modifyBooking" variant="outline">
            <Edit class="w-4 h-4 mr-2" />
            Modify Booking
          </Button>
          <Button @click="cancelBooking" variant="destructive">
            <X class="w-4 h-4 mr-2" />
            Cancel Booking
          </Button>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card class="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <Plane class="w-12 h-12 mx-auto mb-4 text-blue-600" />
          <h3 class="text-lg font-semibold mb-2">Online Check-in</h3>
          <p class="text-gray-600 text-sm">Check in online and get your boarding pass</p>
        </Card>
        
        <Card class="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <Clock class="w-12 h-12 mx-auto mb-4 text-green-600" />
          <h3 class="text-lg font-semibold mb-2">Flight Status</h3>
          <p class="text-gray-600 text-sm">Check real-time flight information</p>
        </Card>
        
        <Card class="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <Phone class="w-12 h-12 mx-auto mb-4 text-purple-600" />
          <h3 class="text-lg font-semibold mb-2">Customer Support</h3>
          <p class="text-gray-600 text-sm">Get help with your booking</p>
        </Card>
      </div>

      <!-- Help Section -->
      <div class="bg-blue-50 rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Need Help?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-semibold mb-2">Frequently Asked Questions</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="text-blue-600 hover:underline">How to change my flight?</a></li>
              <li><a href="#" class="text-blue-600 hover:underline">Cancellation policy</a></li>
              <li><a href="#" class="text-blue-600 hover:underline">Baggage allowance</a></li>
              <li><a href="#" class="text-blue-600 hover:underline">Check-in requirements</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-2">Contact Information</h3>
            <div class="space-y-2 text-sm">
              <p><strong>Hotline:</strong> +63 2 8702 0888</p>
              <p><strong>Email:</strong> support@airline.com</p>
              <p><strong>Hours:</strong> 24/7 Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { 
  Search, 
  Plane, 
  MapPin, 
  Luggage, 
  Edit, 
  X, 
  Clock, 
  Phone 
} from 'lucide-vue-next'

// Reactive state
const bookingFound = ref(false)
const searchForm = reactive({
  bookingReference: '',
  lastName: ''
})

// Mock booking data
const currentBooking = ref({
  reference: 'ABC123',
  status: 'Confirmed',
  bookingDate: 'January 15, 2024',
  outbound: {
    from: 'Manila (MNL)',
    to: 'Cebu (CEB)',
    flightNumber: '5J 561',
    date: 'February 15, 2024',
    time: '06:00 - 07:25',
    duration: '1h 25m'
  },
  return: {
    from: 'Cebu (CEB)',
    to: 'Manila (MNL)',
    flightNumber: '5J 562',
    date: 'February 18, 2024',
    time: '08:00 - 09:25',
    duration: '1h 25m'
  },
  passengers: [
    {
      id: 1,
      name: 'John Doe',
      type: 'Adult',
      seat: '12A',
      meal: 'Standard'
    },
    {
      id: 2,
      name: 'Jane Doe',
      type: 'Adult',
      seat: '12B',
      meal: 'Vegetarian'
    }
  ],
  pricing: {
    baseFare: 8500,
    taxes: 1200,
    addOns: 500,
    total: 10200
  }
})

// Methods
const searchBooking = () => {
  if (searchForm.bookingReference && searchForm.lastName) {
    bookingFound.value = true
  }
}

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const checkIn = () => {
  // Navigate to check-in page
  console.log('Navigating to check-in...')
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