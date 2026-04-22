<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Hero Section - Compact -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-16 lg:py-20 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 pt-8">
        <div class="inline-flex items-center px-3 py-1.5 mb-3 bg-white/20 backdrop-blur-md border-2 border-white/30">
          <CheckCircle class="w-3.5 h-3.5 mr-1.5 text-white" />
          <span class="font-black text-xs text-white uppercase tracking-widest">Online Check-In</span>
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 leading-tight uppercase tracking-tight">
          Check In Online
        </h1>
        <p class="text-xs sm:text-sm lg:text-base max-w-2xl mx-auto mb-4 font-bold text-white/90 leading-relaxed">
          Save time at the airport with our convenient online check-in service
        </p>
      </div>
    </section>

    <!-- Check-in Form - Compact Boarding Pass Style -->
    <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 -mt-12 relative z-20 mb-8">
      <div class="max-w-3xl mx-auto">
        <!-- Boarding Pass Inspired Card -->
        <Card class="bg-white shadow-2xl border-4 border-gray-900 overflow-hidden">
          <CardContent class="p-0">
            <!-- Airline Header - Compact -->
            <div class="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 px-4 py-3 relative overflow-hidden">
              <div class="relative flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-10 h-10 bg-white flex items-center justify-center">
                    <Plane class="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h2 class="text-lg font-black text-white tracking-tight uppercase">Online Check-In</h2>
                    <p class="text-blue-300 text-xs font-bold">Airlines Ticketing</p>
                  </div>
                </div>
                <div class="text-right hidden sm:block">
                  <div class="text-white/60 text-xs font-black uppercase tracking-widest">System</div>
                  <div class="text-white text-sm font-black">WEB</div>
                </div>
              </div>
            </div>

            <!-- Main Form Section - Compact -->
            <div class="px-4 py-6 bg-white">
              <form @submit.prevent="checkIn" class="space-y-4">
                <div class="grid sm:grid-cols-2 gap-4">
                  <!-- Booking Reference -->
                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <Label for="bookingRef" class="text-xs font-black text-gray-900 uppercase tracking-widest">
                        Booking Reference
                      </Label>
                      <div class="flex items-center gap-1 text-xs text-gray-500">
                        <FileText class="w-3 h-3" />
                        <span>PNR</span>
                      </div>
                    </div>
                    <Input
                      id="bookingRef"
                      v-model="checkInForm.bookingReference"
                      type="text"
                      placeholder="ABC123"
                      class="h-12 text-lg font-bold border-0 border-b-4 border-gray-900 rounded-none bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-0 transition-all uppercase tracking-widest text-center"
                      maxlength="6"
                      @input="formatBookingRef"
                      required
                    />
                  </div>

                  <!-- Last Name -->
                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <Label for="lastName" class="text-xs font-black text-gray-900 uppercase tracking-widest">
                        Passenger Name
                      </Label>
                      <div class="text-xs text-gray-500">Last Name</div>
                    </div>
                    <Input
                      id="lastName"
                      v-model="checkInForm.lastName"
                      type="text"
                      placeholder="SURNAME"
                      class="h-12 text-lg font-bold border-0 border-b-4 border-gray-900 rounded-none bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-0 transition-all uppercase tracking-wide text-center"
                      required
                    />
                  </div>
                </div>

                <!-- Decorative Divider -->
                <div class="relative py-2">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t-2 border-dashed border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center">
                    <div class="flex items-center gap-1.5 bg-white px-3">
                      <div class="w-2 h-2 rounded-full bg-gray-900"></div>
                      <div class="w-2 h-2 rounded-full bg-blue-600"></div>
                      <div class="w-2 h-2 rounded-full bg-gray-900"></div>
                    </div>
                  </div>
                </div>

                <!-- Check-in Button -->
                <Button
                  type="submit"
                  class="w-full h-14 text-base font-black bg-gray-900 text-white hover:bg-blue-600 transition-all duration-300 uppercase tracking-widest relative overflow-hidden group rounded-none"
                  :disabled="!isFormValid || isLoading"
                >
                  <!-- Animated Background -->
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>

                  <div v-if="isLoading" class="flex items-center justify-center relative z-10">
                    <div class="flex gap-1.5">
                      <div class="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                      <div class="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                      <div class="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                    </div>
                    <span class="ml-2 text-sm">Processing</span>
                  </div>
                  <div v-else class="flex items-center justify-center gap-2 relative z-10">
                    <CheckCircle class="h-4 w-4" />
                    <span>Complete Check-In</span>
                    <div class="flex gap-0.5">
                      <div class="w-0.5 h-4 bg-white/50"></div>
                      <div class="w-0.5 h-4 bg-white"></div>
                    </div>
                  </div>
                </Button>

                <!-- Error Message -->
                <div v-if="error" class="p-3 bg-red-50 border-l-4 border-red-600 text-red-700 font-bold flex items-center gap-2 text-sm">
                  <AlertCircle class="w-4 h-4 flex-shrink-0" />
                  {{ error }}
                </div>

                <!-- Info Strip -->
                <div class="bg-gradient-to-r from-gray-50 via-blue-50 to-gray-50 -mx-4 px-4 py-3 border-t-2 border-dashed border-gray-200">
                  <div class="flex items-center justify-between text-xs text-gray-600">
                    <div class="flex items-center gap-1.5">
                      <Shield class="w-3.5 h-3.5 text-blue-600" />
                      <span class="font-bold">Secure Connection</span>
                    </div>
                    <div class="hidden sm:flex items-center gap-3 text-xs">
                      <span>•</span>
                      <span class="font-semibold">24h Before Departure</span>
                      <span>•</span>
                      <span class="font-semibold">Fast & Easy</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Check-in Success Modal -->
    <div v-if="showSuccess" class="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <Card class="max-w-md w-full shadow-2xl border-0 rounded-3xl overflow-hidden animate-in zoom-in duration-300">
        <CardContent class="p-8 sm:p-10 text-center bg-gradient-to-br from-white to-gray-50">
          <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <CheckCircle class="h-10 w-10 text-white" />
          </div>
          <h3 class="text-3xl font-bold text-black mb-3">Check-in Successful!</h3>
          <p class="text-gray-600 mb-8 text-lg">You're all set for your flight</p>

          <div v-if="retrievedBooking" class="bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl p-6 mb-8 text-left">
            <h4 class="font-bold mb-4 text-white text-lg flex items-center">
              <Plane class="w-5 h-5 mr-2" />
              Flight Details
            </h4>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between items-center">
                <span class="text-gray-300">Flight:</span>
                <span class="font-bold text-white">{{ retrievedBooking.outbound.flightNumber }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-300">Route:</span>
                <span class="font-bold text-white">{{ retrievedBooking.outbound.from.split(' ')[0] }} → {{ retrievedBooking.outbound.to.split(' ')[0] }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-300">Date:</span>
                <span class="font-bold text-white">{{ retrievedBooking.outbound.date }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-300">Passenger:</span>
                <span class="font-bold text-white">{{ retrievedBooking.passengers[0].name }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-300">Seat:</span>
                <span class="font-bold text-blue-400 text-lg">{{ retrievedBooking.passengers[0].seat }}</span>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <Button class="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-base rounded-2xl shadow-lg" @click="downloadBoardingPass">
              <Download class="mr-2 h-5 w-5" />
              Download Boarding Pass
            </Button>
            <Button variant="outline" class="w-full h-12 border-2 border-gray-300 hover:border-black hover:bg-gray-50 font-bold rounded-2xl" @click="closeSuccess">
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Check-in Information - Compact Layout -->
    <section class="py-8 bg-gray-50 relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #000 20px, #000 21px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
        <!-- Section Header - Compact -->
        <div class="text-center mb-6">
          <div class="flex items-center justify-center gap-2 mb-2">
            <div class="w-1.5 h-1.5 bg-blue-600"></div>
            <div class="w-1.5 h-1.5 bg-green-600"></div>
            <div class="w-1.5 h-1.5 bg-purple-600"></div>
          </div>
          <h2 class="text-2xl md:text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Check-in Information</h2>
          <div class="flex items-center justify-center gap-2">
            <div class="h-0.5 w-12 bg-gray-900"></div>
            <p class="text-xs text-gray-600 font-bold uppercase tracking-wider">Everything You Need</p>
            <div class="h-0.5 w-12 bg-gray-900"></div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Timeline - Compact -->
          <div class="bg-gray-900 p-4 border-4 border-gray-900 relative">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-10 h-10 bg-blue-600 flex items-center justify-center">
                <Clock class="h-5 w-5 text-white" />
              </div>
              <h3 class="text-lg font-black text-white tracking-tight uppercase">Timeline</h3>
            </div>

            <div class="space-y-3">
              <!-- Timeline Item 1 -->
              <div class="flex gap-2 items-start">
                <div class="flex flex-col items-center">
                  <div class="w-5 h-5 bg-green-500 flex items-center justify-center font-black text-xs">1</div>
                  <div class="w-0.5 h-full bg-green-500 mt-1"></div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm p-3 flex-1 border-l-4 border-green-500">
                  <p class="text-white font-black text-sm mb-0.5 uppercase tracking-wide">Opens</p>
                  <p class="text-green-300 font-semibold text-xs">24 hours before departure</p>
                </div>
              </div>

              <!-- Timeline Item 2 -->
              <div class="flex gap-2 items-start">
                <div class="flex flex-col items-center">
                  <div class="w-5 h-5 bg-yellow-500 flex items-center justify-center font-black text-xs">2</div>
                  <div class="w-0.5 h-full bg-yellow-500 mt-1"></div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm p-3 flex-1 border-l-4 border-yellow-500">
                  <p class="text-white font-black text-sm mb-0.5 uppercase tracking-wide">Closes</p>
                  <p class="text-yellow-300 font-semibold text-xs">2h (International) • 1h (Domestic)</p>
                </div>
              </div>

              <!-- Timeline Item 3 -->
              <div class="flex gap-2 items-start">
                <div class="flex flex-col items-center">
                  <div class="w-5 h-5 bg-red-500 flex items-center justify-center font-black text-xs">3</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm p-3 flex-1 border-l-4 border-red-500">
                  <p class="text-white font-black text-sm mb-0.5 uppercase tracking-wide">Airport Required</p>
                  <p class="text-red-300 font-semibold text-xs">After online check-in closes</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Requirements - Compact -->
          <div class="bg-gradient-to-br from-blue-600 to-blue-700 p-4 border-4 border-gray-900">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-10 h-10 bg-white flex items-center justify-center">
                <FileText class="h-5 w-5 text-blue-600" />
              </div>
              <h3 class="text-lg font-black text-white tracking-tight uppercase">Required</h3>
            </div>

            <div class="space-y-2">
              <div class="flex items-start gap-2 bg-white/20 backdrop-blur-sm p-3 border-l-4 border-white">
                <div class="w-5 h-5 bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check class="h-3 w-3 text-blue-600" />
                </div>
                <span class="text-white font-bold uppercase text-xs tracking-wide">Valid PNR</span>
              </div>

              <div class="flex items-start gap-2 bg-white/20 backdrop-blur-sm p-3 border-l-4 border-white">
                <div class="w-5 h-5 bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check class="h-3 w-3 text-blue-600" />
                </div>
                <span class="text-white font-bold uppercase text-xs tracking-wide">Last Name</span>
              </div>

              <div class="flex items-start gap-2 bg-white/20 backdrop-blur-sm p-3 border-l-4 border-white">
                <div class="w-5 h-5 bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check class="h-3 w-3 text-blue-600" />
                </div>
                <span class="text-white font-bold uppercase text-xs tracking-wide">Travel Docs</span>
              </div>

              <div class="flex items-start gap-2 bg-white/20 backdrop-blur-sm p-3 border-l-4 border-white">
                <div class="w-5 h-5 bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check class="h-3 w-3 text-blue-600" />
                </div>
                <span class="text-white font-bold uppercase text-xs tracking-wide">Passenger Info</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section - Compact Grid Layout -->
    <section class="py-8 bg-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #000 20px, #000 21px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
        <!-- Header - Compact -->
        <div class="text-center mb-6">
          <div class="flex items-center justify-center gap-2 mb-2">
            <div class="w-1.5 h-1.5 bg-blue-600"></div>
            <div class="w-1.5 h-1.5 bg-green-600"></div>
            <div class="w-1.5 h-1.5 bg-purple-600"></div>
          </div>
          <h2 class="text-2xl md:text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Why Check-In Online?</h2>
          <div class="flex items-center justify-center gap-2">
            <div class="h-0.5 w-12 bg-gray-900"></div>
            <p class="text-xs text-gray-600 font-bold uppercase tracking-wider">Three Powerful Reasons</p>
            <div class="h-0.5 w-12 bg-gray-900"></div>
          </div>
        </div>

        <!-- Benefits Cards - Compact Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <!-- Benefit 1 -->
          <div class="bg-white p-4 border-4 border-gray-900 relative group cursor-pointer transform hover:-translate-y-2 transition-all duration-300 group-hover:bg-blue-600">
            <!-- Corner Accent -->
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[25px] border-t-blue-600 border-r-[25px] border-r-transparent"></div>

            <div class="w-12 h-12 bg-blue-100 flex items-center justify-center mb-3 group-hover:bg-white transition-colors duration-300">
              <Zap class="w-6 h-6 text-blue-600 transition-colors duration-300" />
            </div>

            <h3 class="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-white transition-colors duration-300">Lightning Fast</h3>
            <p class="text-sm text-gray-600 font-bold leading-relaxed group-hover:text-white transition-colors duration-300">Skip long queues and head straight to security. Save precious time at the airport.</p>

            <!-- Shadow Block -->
            <div class="absolute top-1.5 left-1.5 w-full h-full bg-blue-600 -z-10 group-hover:top-2 group-hover:left-2 transition-all duration-300"></div>
          </div>

          <!-- Benefit 2 -->
          <div class="bg-white p-4 border-4 border-gray-900 relative group cursor-pointer transform hover:-translate-y-2 transition-all duration-300 group-hover:bg-green-600">
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[25px] border-t-green-600 border-r-[25px] border-r-transparent"></div>

            <div class="w-12 h-12 bg-green-100 flex items-center justify-center mb-3 group-hover:bg-white transition-colors duration-300">
              <Smartphone class="w-6 h-6 text-green-600 transition-colors duration-300" />
            </div>

            <h3 class="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-white transition-colors duration-300">100% Digital</h3>
            <p class="text-sm text-gray-600 font-bold leading-relaxed group-hover:text-white transition-colors duration-300">Get your boarding pass instantly on your phone. No printing required.</p>

            <div class="absolute top-1.5 left-1.5 w-full h-full bg-green-600 -z-10 group-hover:top-2 group-hover:left-2 transition-all duration-300"></div>
          </div>

          <!-- Benefit 3 -->
          <div class="bg-white p-4 border-4 border-gray-900 relative group cursor-pointer transform hover:-translate-y-2 transition-all duration-300 group-hover:bg-purple-600">
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[25px] border-t-purple-600 border-r-[25px] border-r-transparent"></div>

            <div class="w-12 h-12 bg-purple-100 flex items-center justify-center mb-3 group-hover:bg-white transition-colors duration-300">
              <MapPin class="w-6 h-6 text-purple-600 transition-colors duration-300" />
            </div>

            <h3 class="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-white transition-colors duration-300">Your Choice</h3>
            <p class="text-sm text-gray-600 font-bold leading-relaxed group-hover:text-white transition-colors duration-300">Pick your preferred seat and enjoy your flight exactly how you want it.</p>

            <div class="absolute top-1.5 left-1.5 w-full h-full bg-purple-600 -z-10 group-hover:top-2 group-hover:left-2 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Help Section - Compact -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-8 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>

      <div class="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 z-10">
        <Card class="max-w-3xl mx-auto bg-white/10 backdrop-blur-md border-2 border-white/30 shadow-2xl">
          <CardContent class="p-6 text-center">
            <div class="w-14 h-14 bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
              <Shield class="h-7 w-7 text-white" />
            </div>
            <h3 class="text-2xl font-black mb-2 text-white uppercase tracking-tight">Need Help?</h3>
            <p class="text-gray-300 mb-6 text-sm max-w-2xl mx-auto font-bold">
              If you're having trouble checking in online, our customer service team is here to help 24/7.
            </p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <Button class="bg-white text-gray-900 hover:bg-gray-100 h-10 px-6 rounded-none font-black text-xs uppercase tracking-wider shadow-lg border-4 border-white">
                <Phone class="mr-1.5 h-4 w-4" />
                Call Support
              </Button>
              <Button variant="outline" class="border-4 border-white text-white bg-transparent hover:bg-white hover:text-gray-900 h-10 px-6 rounded-none font-black text-xs uppercase tracking-wider transition-all duration-300">
                <MessageCircle class="mr-1.5 h-4 w-4" />
                Live Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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
  MessageCircle,
  Shield,
  Zap,
  AlertCircle
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useBookingStore } from '@/stores/bookingStore'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const route = useRoute()
const bookingStore = useBookingStore()
const { retrievedBooking } = storeToRefs(bookingStore)

const checkInForm = ref({
  bookingReference: '',
  lastName: ''
})

const isLoading = ref(false)
const showSuccess = ref(false)
const error = ref('')

const isFormValid = computed(() => {
  return checkInForm.value.bookingReference.length === 6 &&
         checkInForm.value.lastName.trim().length > 0
})

const formatBookingRef = (event: Event) => {
  const target = event.target as HTMLInputElement
  target.value = target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
  checkInForm.value.bookingReference = target.value
}

onMounted(() => {
  if (route.query.ref) {
    checkInForm.value.bookingReference = route.query.ref as string
  }
  if (route.query.lastName) {
    checkInForm.value.lastName = route.query.lastName as string
  }
})

const checkIn = async () => {
  if (!isFormValid.value) return

  isLoading.value = true
  error.value = ''

  try {
    const success = await bookingStore.retrieveBooking(
      checkInForm.value.bookingReference,
      checkInForm.value.lastName
    )

    if (success && retrievedBooking.value) {
      showSuccess.value = true
    } else {
      error.value = bookingStore.bookingError || 'Booking not found. Please check your details.'
    }
  } catch (e) {
    error.value = 'An error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const downloadBoardingPass = () => {
  if (!retrievedBooking.value) return

  // Navigate to boarding pass view with booking data
  const booking = retrievedBooking.value
  const passenger = booking.passengers[0] // First passenger

  window.open(`/boarding-pass/${booking.bookingReference}?` +
    `name=${encodeURIComponent(passenger.name)}&` +
    `from=${encodeURIComponent(booking.outbound.from.split(' ')[0])}&` +
    `to=${encodeURIComponent(booking.outbound.to.split(' ')[0])}&` +
    `flight=${booking.outbound.flightNumber}&` +
    `date=${encodeURIComponent(booking.outbound.date)}&` +
    `boarding=${encodeURIComponent(booking.outbound.time.split(' - ')[0])}&` +
    `gate=${passenger.gate || 'G5'}&` +
    `seat=${passenger.seat}&` +
    `class=${booking.fareClass || 'Economy'}`,
    '_blank'
  )
}

const closeSuccess = () => {
  showSuccess.value = false
  // Reset form
  checkInForm.value = {
    bookingReference: '',
    lastName: ''
  }
  error.value = ''
}
</script>
