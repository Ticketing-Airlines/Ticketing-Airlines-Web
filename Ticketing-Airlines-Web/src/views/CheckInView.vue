<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold mb-4">Online Check-In</h1>
        <p class="text-xl opacity-90">Check in online and save time at the airport</p>
      </div>
    </div>

    <!-- Check-in Form -->
    <div class="container mx-auto px-4 -mt-8 relative z-10">
      <Card class="shadow-2xl max-w-2xl mx-auto">
        <CardContent class="p-8">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plane class="h-8 w-8 text-green-600" />
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Check In Online</h2>
            <p class="text-gray-600">Enter your booking details to check in</p>
          </div>

          <form @submit.prevent="checkIn" class="space-y-6">
            <!-- Booking Reference -->
            <div class="space-y-2">
              <Label for="bookingRef" class="text-sm font-medium text-gray-700">
                Booking Reference / PNR
              </Label>
              <Input 
                id="bookingRef"
                v-model="checkInForm.bookingReference" 
                type="text" 
                placeholder="Enter 6-character booking reference"
                class="h-12 text-lg"
                maxlength="6"
                @input="formatBookingRef"
                required
              />
              <p class="text-xs text-gray-500">Example: ABC123</p>
            </div>

            <!-- Last Name -->
            <div class="space-y-2">
              <Label for="lastName" class="text-sm font-medium text-gray-700">
                Last Name
              </Label>
              <Input 
                id="lastName"
                v-model="checkInForm.lastName" 
                type="text" 
                placeholder="Enter passenger's last name"
                class="h-12 text-lg"
                required
              />
            </div>

            <!-- Check-in Button -->
            <Button 
              type="submit" 
              class="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              :disabled="!isFormValid || isLoading"
            >
              <div v-if="isLoading" class="flex items-center">
                <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Checking In...
              </div>
              <div v-else class="flex items-center">
                <CheckCircle class="mr-2 h-5 w-5" />
                Check In
              </div>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>

    <!-- Check-in Success Modal -->
    <div v-if="showSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card class="max-w-md w-full">
        <CardContent class="p-8 text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle class="h-8 w-8 text-green-600" />
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Check-in Successful!</h3>
          <p class="text-gray-600 mb-6">You have successfully checked in for your flight.</p>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h4 class="font-semibold mb-2">Flight Details:</h4>
            <div class="space-y-1 text-sm">
              <div class="flex justify-between">
                <span>Flight:</span>
                <span class="font-medium">{{ mockFlightData.flightNumber }}</span>
              </div>
              <div class="flex justify-between">
                <span>Route:</span>
                <span class="font-medium">{{ mockFlightData.route }}</span>
              </div>
              <div class="flex justify-between">
                <span>Date:</span>
                <span class="font-medium">{{ mockFlightData.date }}</span>
              </div>
              <div class="flex justify-between">
                <span>Seat:</span>
                <span class="font-medium">{{ mockFlightData.seat }}</span>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <Button class="w-full" @click="downloadBoardingPass">
              <Download class="mr-2 h-4 w-4" />
              Download Boarding Pass
            </Button>
            <Button variant="outline" class="w-full" @click="closeSuccess">
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Check-in Information -->
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">Check-in Information</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Check-in Timeline -->
          <Card>
            <CardContent class="p-6">
              <h3 class="text-xl font-semibold mb-4 flex items-center">
                <Clock class="mr-2 h-5 w-5 text-blue-600" />
                Check-in Timeline
              </h3>
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p class="font-medium">Online Check-in Opens</p>
                    <p class="text-sm text-gray-600">24 hours before departure</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p class="font-medium">Online Check-in Closes</p>
                    <p class="text-sm text-gray-600">2 hours before departure (International)</p>
                    <p class="text-sm text-gray-600">1 hour before departure (Domestic)</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p class="font-medium">Airport Check-in Required</p>
                    <p class="text-sm text-gray-600">After online check-in closes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Requirements -->
          <Card>
            <CardContent class="p-6">
              <h3 class="text-xl font-semibold mb-4 flex items-center">
                <FileText class="mr-2 h-5 w-5 text-green-600" />
                Requirements
              </h3>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <Check class="h-4 w-4 text-green-500" />
                  <span class="text-sm">Valid booking reference (PNR)</span>
                </div>
                <div class="flex items-center gap-3">
                  <Check class="h-4 w-4 text-green-500" />
                  <span class="text-sm">Passenger's last name</span>
                </div>
                <div class="flex items-center gap-3">
                  <Check class="h-4 w-4 text-green-500" />
                  <span class="text-sm">Valid travel documents</span>
                </div>
                <div class="flex items-center gap-3">
                  <Check class="h-4 w-4 text-green-500" />
                  <span class="text-sm">Completed advance passenger information</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    <!-- Benefits Section -->
    <div class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">Benefits of Online Check-in</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock class="h-8 w-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Save Time</h3>
            <p class="text-gray-600">Skip the check-in queues and go straight to security</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone class="h-8 w-8 text-green-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Mobile Boarding Pass</h3>
            <p class="text-gray-600">Get your boarding pass on your mobile device</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin class="h-8 w-8 text-purple-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Choose Your Seat</h3>
            <p class="text-gray-600">Select your preferred seat during check-in</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Help Section -->
    <div class="container mx-auto px-4 py-16">
      <Card class="max-w-2xl mx-auto">
        <CardContent class="p-8 text-center">
          <h3 class="text-2xl font-bold mb-4">Need Help?</h3>
          <p class="text-gray-600 mb-6">
            If you're having trouble checking in online, our customer service team is here to help.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" class="flex items-center">
              <Phone class="mr-2 h-4 w-4" />
              Call Support
            </Button>
            <Button variant="outline" class="flex items-center">
              <MessageCircle class="mr-2 h-4 w-4" />
              Live Chat
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Plane, 
  CheckCircle, 
  Clock, 
  FileText, 
  Check, 
  Download,
  Smartphone,
  MapPin,
  Phone,
  MessageCircle
} from 'lucide-vue-next'

const checkInForm = ref({
  bookingReference: '',
  lastName: ''
})

const isLoading = ref(false)
const showSuccess = ref(false)

// Mock flight data for successful check-in
const mockFlightData = ref({
  flightNumber: 'CP 123',
  route: 'Manila (MNL) → Cebu (CEB)',
  date: 'March 15, 2024',
  seat: '12A'
})

const isFormValid = computed(() => {
  return checkInForm.value.bookingReference.length === 6 && 
         checkInForm.value.lastName.trim().length > 0
})

const formatBookingRef = (event: Event) => {
  const target = event.target as HTMLInputElement
  target.value = target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
  checkInForm.value.bookingReference = target.value
}

const checkIn = async () => {
  if (!isFormValid.value) return
  
  isLoading.value = true
  
  // Simulate API call
  setTimeout(() => {
    isLoading.value = false
    showSuccess.value = true
  }, 2000)
}

const downloadBoardingPass = () => {
  // In a real application, this would generate and download the boarding pass
  alert('Boarding pass download started! Check your downloads folder.')
}

const closeSuccess = () => {
  showSuccess.value = false
  // Reset form
  checkInForm.value = {
    bookingReference: '',
    lastName: ''
  }
}
</script>