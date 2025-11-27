<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle,
  Plane,
  Calendar,
  MapPin,
  ArrowRight,
  Download,
  Mail,
  ArrowLeft
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const router = useRouter()

const bookingDetails = ref({
  bookingReference: 'SS123456789',
  flightNumber: 'SS101',
  departure: 'MNL',
  arrival: 'CEB',
  departureTime: '08:00',
  arrivalTime: '09:15',
  date: '2025-10-16',
  passengers: 1,
  totalAmount: 3249,
  currency: 'PHP'
})

const formatPrice = (price: number) => {
  return `₱${price.toLocaleString()}`
}

const downloadTicket = () => {
  // Simulate ticket download
  alert('Ticket download started!')
}

const sendEmail = () => {
  // Simulate email sending
  alert('Booking confirmation sent to your email!')
}

onMounted(() => {
  // Generate random booking reference
  bookingDetails.value.bookingReference = 'SS' + Math.random().toString(36).substr(2, 9).toUpperCase()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Success Section -->
    <section class="bg-gradient-to-br from-green-600 to-green-700 text-white py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle class="w-12 h-12 text-green-600" />
        </div>
        
        <h1 class="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">
          Booking Confirmed!
        </h1>
        <p class="text-xl text-green-100 font-bold mb-8">
          Your flight has been successfully booked
        </p>
        
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-4 border-white/20">
          <h2 class="text-2xl font-black text-white mb-4">Booking Reference</h2>
          <div class="text-4xl font-black text-white tracking-wider">
            {{ bookingDetails.bookingReference }}
          </div>
          <p class="text-green-100 font-bold mt-2">Save this reference for your records</p>
        </div>
      </div>
    </section>

    <!-- Booking Details -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Flight Details -->
          <Card class="border-4 border-gray-900 rounded-none">
            <CardContent class="p-6">
              <CardTitle class="text-2xl font-black text-gray-900 mb-6">Flight Details</CardTitle>
              
              <div class="space-y-6">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-blue-600 flex items-center justify-center">
                    <Plane class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 class="text-xl font-black text-gray-900">{{ bookingDetails.flightNumber }}</h3>
                    <p class="text-gray-600 font-bold">SunSkies Air</p>
                  </div>
                </div>
                
                <div class="flex items-center gap-8">
                  <div class="text-center">
                    <div class="text-2xl font-black text-gray-900">{{ bookingDetails.departureTime }}</div>
                    <div class="text-sm text-gray-600 font-bold">{{ bookingDetails.departure }}</div>
                    <div class="text-xs text-gray-500">Manila</div>
                  </div>
                  
                  <div class="flex-1 text-center">
                    <div class="text-sm text-gray-600 font-bold mb-1">1h 15m</div>
                    <div class="h-px bg-gray-300 relative">
                      <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rotate-45"></div>
                    </div>
                    <div class="text-xs text-gray-500 mt-1">Airbus A320-200</div>
                  </div>
                  
                  <div class="text-center">
                    <div class="text-2xl font-black text-gray-900">{{ bookingDetails.arrivalTime }}</div>
                    <div class="text-sm text-gray-600 font-bold">{{ bookingDetails.arrival }}</div>
                    <div class="text-xs text-gray-500">Cebu</div>
                  </div>
                </div>
                
                <div class="bg-gray-50 p-4 border-4 border-gray-200">
                  <div class="flex items-center gap-3">
                    <Calendar class="w-5 h-5 text-blue-600" />
                    <span class="font-black text-gray-900">Departure Date: {{ bookingDetails.date }}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Booking Summary -->
          <Card class="border-4 border-gray-900 rounded-none">
            <CardContent class="p-6">
              <CardTitle class="text-2xl font-black text-gray-900 mb-6">Booking Summary</CardTitle>
              
              <div class="space-y-4">
                <div class="flex justify-between">
                  <span class="text-gray-600 font-bold">Passengers</span>
                  <span class="font-black text-gray-900">{{ bookingDetails.passengers }} Adult</span>
                </div>
                
                <div class="flex justify-between">
                  <span class="text-gray-600 font-bold">Base Fare</span>
                  <span class="font-black text-gray-900">{{ formatPrice(2899) }}</span>
                </div>
                
                <div class="flex justify-between">
                  <span class="text-gray-600 font-bold">Taxes & Fees</span>
                  <span class="font-black text-gray-900">{{ formatPrice(350) }}</span>
                </div>
                
                <div class="border-t-2 border-gray-300 pt-4">
                  <div class="flex justify-between">
                    <span class="text-xl font-black text-gray-900">Total Paid</span>
                    <span class="text-xl font-black text-gray-900">{{ formatPrice(bookingDetails.totalAmount) }}</span>
                  </div>
                </div>
              </div>
              
              <div class="mt-6 space-y-3">
                <Button
                  @click="downloadTicket"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black py-3"
                >
                  <Download class="w-4 h-4 mr-2" />
                  Download E-Ticket
                </Button>
                
                <Button
                  @click="sendEmail"
                  variant="outline"
                  class="w-full border-4 border-gray-900 rounded-none font-black py-3"
                >
                  <Mail class="w-4 h-4 mr-2" />
                  Send to Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Important Information -->
        <Card class="border-4 border-yellow-300 bg-yellow-50 mt-8">
          <CardContent class="p-6">
            <h3 class="text-xl font-black text-yellow-800 mb-4">Important Information</h3>
            <div class="space-y-2 text-yellow-700 font-bold">
              <p>• Check-in opens 24 hours before departure</p>
              <p>• Arrive at the airport at least 2 hours before domestic flights</p>
              <p>• Bring a valid ID and your booking reference</p>
              <p>• Baggage allowance: 7kg carry-on included</p>
            </div>
          </CardContent>
        </Card>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            @click="router.push('/')"
            variant="outline"
            class="flex-1 border-4 border-gray-900 rounded-none font-black py-3"
          >
            <ArrowLeft class="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <Button
            @click="router.push('/manage-booking')"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black py-3"
          >
            Manage Booking
            <ArrowRight class="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
