<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-32 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <div class="relative container mx-auto px-4 text-center z-10 pt-12">
        <div class="inline-flex items-center rounded-full px-4 py-2 mb-6" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
          <CheckCircle class="w-4 h-4 mr-2 text-white" />
          <span class="font-semibold text-sm text-white">Online Check-In</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Check In Online
        </h1>
        <p class="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto font-medium">
          Save time at the airport with our convenient online check-in service
        </p>
      </div>
    </section>

    <!-- Check-in Form - Boarding Pass Style -->
    <div class="container mx-auto px-4 -mt-24 relative z-20 mb-16">
      <div class="max-w-4xl mx-auto">
        <!-- Boarding Pass Inspired Card -->
        <div class="relative">
          <!-- Top Section - Airline Header -->
          <div class="bg-white shadow-2xl overflow-hidden" style="clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), 50% 100%, 0 calc(100% - 30px));">
            <div class="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 px-8 py-6 relative overflow-hidden">
              <!-- Decorative Lines Pattern -->
              <div class="absolute inset-0 opacity-10">
                <div class="absolute top-0 left-0 right-0 h-px bg-white"></div>
                <div class="absolute top-4 left-0 right-0 h-px bg-white"></div>
                <div class="absolute bottom-0 left-0 right-0 h-px bg-white"></div>
                <div class="absolute bottom-4 left-0 right-0 h-px bg-white"></div>
    </div>

              <div class="relative flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 bg-white rounded-lg flex items-center justify-center">
                    <Plane class="h-8 w-8 text-gray-900" />
                  </div>
                  <div>
                    <h2 class="text-2xl font-black text-white tracking-tight">ONLINE CHECK-IN</h2>
                    <p class="text-blue-300 text-sm font-semibold">Airlines Ticketing</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-white/60 text-xs font-bold uppercase tracking-widest">System</div>
                  <div class="text-white text-lg font-black">WEB</div>
                </div>
              </div>
          </div>

            <!-- Main Form Section -->
            <div class="px-8 py-10 bg-white">
              <form @submit.prevent="checkIn" class="space-y-8">
                <div class="grid md:grid-cols-2 gap-6">
            <!-- Booking Reference -->
                  <div class="space-y-3">
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
                      class="h-16 text-2xl font-bold border-0 border-b-4 border-gray-900 rounded-none bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-0 transition-all uppercase tracking-widest text-center"
                maxlength="6"
                @input="formatBookingRef"
                required
              />
                    <div class="h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            <!-- Last Name -->
                  <div class="space-y-3">
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
                      class="h-16 text-2xl font-bold border-0 border-b-4 border-gray-900 rounded-none bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-0 transition-all uppercase tracking-wide text-center"
                required
              />
                    <div class="h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  </div>
                </div>

                <!-- Decorative Divider -->
                <div class="relative py-4">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t-2 border-dashed border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center">
                    <div class="flex items-center gap-2 bg-white px-4">
                      <div class="w-3 h-3 rounded-full bg-gray-900"></div>
                      <div class="w-3 h-3 rounded-full bg-blue-600"></div>
                      <div class="w-3 h-3 rounded-full bg-gray-900"></div>
                    </div>
                  </div>
            </div>

            <!-- Check-in Button -->
            <Button 
              type="submit" 
                  class="w-full h-20 text-xl font-black bg-gray-900 text-white hover:bg-blue-600 transition-all duration-300 uppercase tracking-widest relative overflow-hidden group"
              :disabled="!isFormValid || isLoading"
            >
                  <!-- Animated Background -->
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  
                  <div v-if="isLoading" class="flex items-center justify-center relative z-10">
                    <div class="flex gap-2">
                      <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                      <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                      <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                    </div>
                    <span class="ml-3">Processing</span>
                  </div>
                  <div v-else class="flex items-center justify-center gap-3 relative z-10">
                    <CheckCircle class="h-6 w-6" />
                    <span>Complete Check-In</span>
                    <div class="flex gap-1">
                      <div class="w-1 h-6 bg-white/50"></div>
                      <div class="w-1 h-6 bg-white"></div>
              </div>
              </div>
            </Button>

              <!-- Error Message -->
              <div v-if="error" class="p-4 bg-red-50 border-l-4 border-red-600 text-red-700 font-bold flex items-center gap-3 mt-4">
                <AlertCircle class="w-5 h-5" />
                {{ error }}
              </div>

                <!-- Info Strip -->
                <div class="bg-gradient-to-r from-gray-50 via-blue-50 to-gray-50 -mx-8 px-8 py-4 border-t-2 border-dashed border-gray-200">
                  <div class="flex items-center justify-between text-xs text-gray-600">
                    <div class="flex items-center gap-2">
                      <Shield class="w-4 h-4 text-blue-600" />
                      <span class="font-bold">Secure Connection</span>
                    </div>
                    <div class="hidden sm:flex items-center gap-4">
                      <span>•</span>
                      <span class="font-semibold">24h Before Departure</span>
                      <span>•</span>
                      <span class="font-semibold">Fast & Easy</span>
                    </div>
                  </div>
                </div>
          </form>
            </div>
          </div>

          <!-- Perforated Edge Effect (circles on sides) -->
          <div class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <div class="w-8 h-8 bg-gray-50 rounded-full border-4 border-white shadow-lg"></div>
          </div>
          <div class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
            <div class="w-8 h-8 bg-gray-50 rounded-full border-4 border-white shadow-lg"></div>
          </div>
        </div>
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

    <!-- Check-in Information - Asymmetric Layout -->
    <section class="py-20 bg-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, #000 35px, #000 36px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header with Line -->
        <div class="flex items-center gap-6 mb-16">
          <div class="w-2 h-24 bg-gradient-to-b from-blue-600 to-gray-900"></div>
          <div>
            <h2 class="text-5xl font-black text-black mb-2 tracking-tight">Check-in Information</h2>
            <p class="text-lg text-gray-600 font-semibold">Everything you need to know</p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Timeline - Takes 7 columns -->
          <div class="lg:col-span-7">
            <div class="bg-gray-900 p-8 relative" style="clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%);">
              <!-- Corner Cut Effect -->
              <div class="absolute bottom-0 right-0 w-10 h-10 bg-white"></div>
              
              <div class="flex items-center gap-4 mb-8">
                <div class="w-16 h-16 bg-blue-600 flex items-center justify-center">
                  <Clock class="h-8 w-8 text-white" />
                </div>
                <h3 class="text-3xl font-black text-white tracking-tight">TIMELINE</h3>
              </div>

              <div class="space-y-6">
                <!-- Timeline Item 1 -->
                <div class="flex gap-4 items-start">
                  <div class="flex flex-col items-center">
                    <div class="w-6 h-6 bg-green-500 flex items-center justify-center font-black text-xs">1</div>
                    <div class="w-0.5 h-full bg-green-500 mt-2"></div>
                  </div>
                  <div class="bg-white/10 backdrop-blur-sm p-5 flex-1 border-l-4 border-green-500">
                    <p class="text-white font-black text-lg mb-1 uppercase tracking-wide">Opens</p>
                    <p class="text-green-300 font-semibold">24 hours before departure</p>
                  </div>
                </div>

                <!-- Timeline Item 2 -->
                <div class="flex gap-4 items-start">
                  <div class="flex flex-col items-center">
                    <div class="w-6 h-6 bg-yellow-500 flex items-center justify-center font-black text-xs">2</div>
                    <div class="w-0.5 h-full bg-yellow-500 mt-2"></div>
                  </div>
                  <div class="bg-white/10 backdrop-blur-sm p-5 flex-1 border-l-4 border-yellow-500">
                    <p class="text-white font-black text-lg mb-1 uppercase tracking-wide">Closes</p>
                    <p class="text-yellow-300 font-semibold">2h (International) • 1h (Domestic)</p>
                  </div>
                </div>

                <!-- Timeline Item 3 -->
                <div class="flex gap-4 items-start">
                  <div class="flex flex-col items-center">
                    <div class="w-6 h-6 bg-red-500 flex items-center justify-center font-black text-xs">3</div>
                  </div>
                  <div class="bg-white/10 backdrop-blur-sm p-5 flex-1 border-l-4 border-red-500">
                    <p class="text-white font-black text-lg mb-1 uppercase tracking-wide">Airport Required</p>
                    <p class="text-red-300 font-semibold">After online check-in closes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Requirements - Takes 5 columns -->
          <div class="lg:col-span-5">
            <div class="bg-gradient-to-br from-blue-600 to-blue-700 p-8 h-full">
              <div class="flex items-center gap-4 mb-8">
                <div class="w-16 h-16 bg-white flex items-center justify-center">
                  <FileText class="h-8 w-8 text-blue-600" />
                </div>
                <h3 class="text-3xl font-black text-white tracking-tight">REQUIRED</h3>
              </div>

              <div class="space-y-4">
                <div class="flex items-start gap-3 bg-white/20 backdrop-blur-sm p-4 border-l-4 border-white">
                  <div class="w-6 h-6 bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check class="h-4 w-4 text-blue-600" />
                  </div>
                  <span class="text-white font-bold uppercase text-sm tracking-wide">Valid PNR</span>
                </div>

                <div class="flex items-start gap-3 bg-white/20 backdrop-blur-sm p-4 border-l-4 border-white">
                  <div class="w-6 h-6 bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check class="h-4 w-4 text-blue-600" />
                  </div>
                  <span class="text-white font-bold uppercase text-sm tracking-wide">Last Name</span>
                </div>

                <div class="flex items-start gap-3 bg-white/20 backdrop-blur-sm p-4 border-l-4 border-white">
                  <div class="w-6 h-6 bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check class="h-4 w-4 text-blue-600" />
                  </div>
                  <span class="text-white font-bold uppercase text-sm tracking-wide">Travel Docs</span>
                </div>

                <div class="flex items-start gap-3 bg-white/20 backdrop-blur-sm p-4 border-l-4 border-white">
                  <div class="w-6 h-6 bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check class="h-4 w-4 text-blue-600" />
                  </div>
                  <span class="text-white font-bold uppercase text-sm tracking-wide">Passenger Info</span>
                </div>
              </div>

              <!-- Decorative Element -->
              <div class="mt-8 pt-8 border-t-2 border-white/30">
                <div class="flex justify-between items-center text-white">
                  <span class="text-xs font-black uppercase tracking-widest">Ready?</span>
                  <div class="flex gap-1">
                    <div class="w-3 h-3 bg-white"></div>
                    <div class="w-3 h-3 bg-white/60"></div>
                    <div class="w-3 h-3 bg-white/30"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section - Diagonal Split Layout -->
    <section class="py-20 bg-gray-50 relative overflow-hidden">
      <!-- Diagonal Split Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700" style="clip-path: polygon(0 0, 100% 0, 100% 35%, 0 45%);"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Header on Diagonal -->
        <div class="mb-20 pt-8">
          <h2 class="text-6xl font-black text-white mb-3 tracking-tighter">WHY CHECK-IN ONLINE?</h2>
          <div class="flex items-center gap-4">
            <div class="w-24 h-1 bg-white"></div>
            <p class="text-xl text-white font-semibold">Three powerful reasons</p>
          </div>
        </div>

        <!-- Benefits Cards - Staggered Layout -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Benefit 1 - Raised -->
          <div class="transform md:-translate-y-12">
            <div class="bg-white p-8 shadow-2xl relative">
              <!-- Number Badge -->
              <div class="absolute -top-6 -left-6 w-16 h-16 bg-gray-900 flex items-center justify-center">
                <span class="text-3xl font-black text-white">1</span>
    </div>

              <!-- Corner Cut -->
              <div class="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-blue-600 border-l-[40px] border-l-transparent"></div>
              
              <div class="mt-8">
                <div class="w-16 h-16 bg-blue-50 flex items-center justify-center mb-6">
                  <Zap class="w-10 h-10 text-blue-600" />
                </div>
                <h3 class="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Lightning Fast</h3>
                <p class="text-gray-600 font-semibold leading-relaxed">Skip long queues and head straight to security. Save precious time at the airport.</p>
              </div>

              <!-- Decorative Bottom Line -->
              <div class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-blue-400"></div>
            </div>
          </div>

          <!-- Benefit 2 - Normal Position -->
          <div class="transform md:translate-y-0">
            <div class="bg-white p-8 shadow-2xl relative">
              <!-- Number Badge -->
              <div class="absolute -top-6 -left-6 w-16 h-16 bg-gray-900 flex items-center justify-center">
                <span class="text-3xl font-black text-white">2</span>
              </div>
              
              <!-- Corner Cut -->
              <div class="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-green-600 border-l-[40px] border-l-transparent"></div>
              
              <div class="mt-8">
                <div class="w-16 h-16 bg-green-50 flex items-center justify-center mb-6">
                  <Smartphone class="w-10 h-10 text-green-600" />
                </div>
                <h3 class="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">100% Digital</h3>
                <p class="text-gray-600 font-semibold leading-relaxed">Get your boarding pass instantly on your phone. No printing required.</p>
              </div>

              <!-- Decorative Bottom Line -->
              <div class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-600 to-green-400"></div>
            </div>
          </div>

          <!-- Benefit 3 - Raised -->
          <div class="transform md:-translate-y-12">
            <div class="bg-white p-8 shadow-2xl relative">
              <!-- Number Badge -->
              <div class="absolute -top-6 -left-6 w-16 h-16 bg-gray-900 flex items-center justify-center">
                <span class="text-3xl font-black text-white">3</span>
              </div>
              
              <!-- Corner Cut -->
              <div class="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-purple-600 border-l-[40px] border-l-transparent"></div>
              
              <div class="mt-8">
                <div class="w-16 h-16 bg-purple-50 flex items-center justify-center mb-6">
                  <MapPin class="w-10 h-10 text-purple-600" />
                </div>
                <h3 class="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Your Choice</h3>
                <p class="text-gray-600 font-semibold leading-relaxed">Pick your preferred seat and enjoy your flight exactly how you want it.</p>
              </div>

              <!-- Decorative Bottom Line -->
              <div class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-600 to-purple-400"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Help Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-20 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      
      <div class="relative container mx-auto px-4 z-10">
        <Card class="max-w-3xl mx-auto bg-white/10 backdrop-blur-md border-0 shadow-2xl rounded-3xl">
          <CardContent class="p-10 text-center">
            <div class="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield class="h-10 w-10 text-white" />
            </div>
            <h3 class="text-4xl font-bold mb-4 text-white">Need Help?</h3>
            <p class="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              If you're having trouble checking in online, our customer service team is here to help 24/7.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <Button class="bg-white text-black hover:bg-gray-100 h-14 px-8 rounded-2xl font-bold text-base shadow-lg">
                <Phone class="mr-2 h-5 w-5" />
              Call Support
            </Button>
              <Button variant="outline" class="border-2 border-white text-black bg-white hover:bg-white/10 hover:text-white h-14 px-8 rounded-2xl font-bold text-base transition-all duration-300">
                <MessageCircle class="mr-2 h-5 w-5" />
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