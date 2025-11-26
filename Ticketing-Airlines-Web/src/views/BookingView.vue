<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Plane, 
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Shield,
  CheckCircle,
  Loader2,
  CreditCard as CardIcon,
  Eye,
  EyeOff,
  Wallet,
  Building2,
  Smartphone,
  Globe,
  Banknote,
  Landmark
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import { useBookingStore } from '@/stores/bookingStore'

const router = useRouter()
const bookingStore = useBookingStore()

// Store state
const { 
  currentStep, 
  selectedFlight, 
  passengers, 
  contactInfo, 
  paymentInfo, 
  isProcessing,
  totalPrice,
  baseFare,
  taxes,
  fees
} = storeToRefs(bookingStore)

const showPassword = computed(() => false) // Simplified for now, or add local state if needed

// Payment methods data
const paymentMethods = [
  {
    id: 1,
    category: 'Cards',
    name: 'Credit/Debit Cards',
    icon: 'CreditCard',
    description: 'Visa, Mastercard, JCB, American Express',
    processingTime: 'Instant',
    fee: 'No Fee',
    color: 'blue',
    featured: true,
    providers: ['Visa', 'Mastercard', 'JCB', 'Amex']
  },
  {
    id: 2,
    category: 'E-Wallets',
    name: 'GCash',
    icon: 'Wallet',
    description: 'Pay with your GCash wallet',
    processingTime: 'Instant',
    fee: 'No Fee',
    color: 'blue',
    featured: true,
    providers: ['GCash']
  },
  {
    id: 3,
    category: 'E-Wallets',
    name: 'PayMaya',
    icon: 'Wallet',
    description: 'Pay securely with PayMaya',
    processingTime: 'Instant',
    fee: 'No Fee',
    color: 'green',
    featured: true,
    providers: ['PayMaya']
  },
  {
    id: 4,
    category: 'E-Wallets',
    name: 'GrabPay',
    icon: 'Smartphone',
    description: 'Pay using your Grab wallet',
    processingTime: 'Instant',
    fee: 'No Fee',
    color: 'green',
    featured: false,
    providers: ['GrabPay']
  },
  {
    id: 5,
    category: 'Bank Transfer',
    name: 'Online Banking',
    icon: 'Building2',
    description: 'BDO, BPI, Metrobank, UnionBank & more',
    processingTime: '1-2 hours',
    fee: 'No Fee',
    color: 'purple',
    featured: false,
    providers: ['BDO', 'BPI', 'Metrobank', 'UnionBank']
  },
  {
    id: 6,
    category: 'Over the Counter',
    name: '7-Eleven',
    icon: 'Banknote',
    description: 'Pay at any 7-Eleven branch',
    processingTime: '30 minutes',
    fee: '₱25',
    color: 'orange',
    featured: false,
    providers: ['7-Eleven']
  },
  {
    id: 7,
    category: 'Over the Counter',
    name: 'Bayad Center',
    icon: 'Landmark',
    description: 'Pay at Bayad Center outlets',
    processingTime: '30 minutes',
    fee: '₱25',
    color: 'orange',
    featured: false,
    providers: ['Bayad Center']
  },
  {
    id: 8,
    category: 'International',
    name: 'PayPal',
    icon: 'Globe',
    description: 'International payment gateway',
    processingTime: 'Instant',
    fee: '3.9% + ₱15',
    color: 'blue',
    featured: false,
    providers: ['PayPal']
  }
]

const totalSteps = 4

const progressPercentage = computed(() => {
  return (currentStep.value / totalSteps) * 100
})

const stepTitles = [
  'Flight Details',
  'Passenger Information', 
  'Contact & Billing',
  'Payment & Confirmation'
]

const isStepValid = computed(() => {
  switch (currentStep.value) {
    case 1:
      return selectedFlight.value !== null
    case 2:
      return passengers.value.every(p => 
        p.firstName && p.lastName && p.email && p.phone && p.dateOfBirth
      )
    case 3:
      return contactInfo.value.email && contactInfo.value.phone && contactInfo.value.address
    case 4:
      return paymentInfo.value.method !== '' && (
        paymentInfo.value.method === 'Credit/Debit Cards' 
          ? paymentInfo.value.cardNumber && paymentInfo.value.expiryDate && 
            paymentInfo.value.cvv && paymentInfo.value.cardholderName
          : true
      )
    default:
      return false
  }
})

const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: any } = {
    'CreditCard': CreditCard,
    'Wallet': Wallet,
    'Building2': Building2,
    'Smartphone': Smartphone,
    'Globe': Globe,
    'Banknote': Banknote,
    'Landmark': Landmark
  }
  return iconMap[iconName] || CreditCard
}

const formatPrice = (price: number) => {
  return `₱${price.toLocaleString()}`
}

const nextStep = () => {
  if (isStepValid.value && currentStep.value < totalSteps) {
    bookingStore.setStep(currentStep.value + 1)
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    bookingStore.setStep(currentStep.value - 1)
  }
}

const handlePayment = async () => {
  const success = await bookingStore.processPayment()
  if (success) {
    router.push('/booking-confirmation')
  }
}

const getFlightProperty = (property: string) => {
  if (!selectedFlight.value) return ''
  
  if ('price' in selectedFlight.value) {
    // Single flight result
    return (selectedFlight.value as any)[property]
  } else if ('outbound' in selectedFlight.value) {
    // Round trip result
    return (selectedFlight.value.outbound as any)[property]
  } else if ('segments' in selectedFlight.value) {
    // Multi-city result
    return (selectedFlight.value.segments[0] as any)[property]
  }
  return ''
}

onMounted(() => {
  if (!selectedFlight.value) {
    router.push('/flights')
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Progress Bar -->
    <div class="bg-white border-b-4 border-gray-900 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center justify-between mb-4">
          <Button
            @click="router.push('/')"
            variant="ghost"
            class="text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-bold"
          >
            <ArrowLeft class="w-4 h-4 mr-2" />
            Back to Search
          </Button>
          <div class="text-sm font-bold text-gray-600">
            Step {{ currentStep }} of {{ totalSteps }}
          </div>
        </div>
        
        <!-- Progress Steps -->
        <div class="flex items-center justify-between mb-4">
          <div
            v-for="(title, index) in stepTitles"
            :key="index"
            class="flex items-center"
          >
            <div
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-black border-4',
                currentStep > index + 1
                  ? 'bg-blue-600 text-white border-blue-600'
                  : currentStep === index + 1
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-300'
              ]"
            >
              <CheckCircle v-if="currentStep > index + 1" class="w-4 h-4" />
              <span v-else>{{ index + 1 }}</span>
            </div>
            <span
              :class="[
                'ml-2 text-sm font-bold',
                currentStep >= index + 1 ? 'text-gray-900' : 'text-gray-500'
              ]"
            >
              {{ title }}
            </span>
            <ArrowRight v-if="index < stepTitles.length - 1" class="w-4 h-4 mx-4 text-gray-400" />
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 h-2 rounded-full">
          <div
            class="bg-blue-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Booking Steps -->
        <div class="lg:col-span-2">
          <!-- Step 1: Flight Details -->
          <Card v-if="currentStep === 1" class="border-4 border-gray-900 rounded-none mb-6">
            <CardContent class="p-6">
              <CardTitle class="text-2xl font-black text-gray-900 mb-6">Flight Details</CardTitle>
              
              <div v-if="selectedFlight" class="space-y-6">
                <!-- Flight Information -->
                <div class="bg-gray-50 p-6 border-4 border-gray-200">
                  <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 bg-blue-600 flex items-center justify-center">
                      <Plane class="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 class="text-xl font-black text-gray-900">{{ getFlightProperty('flightNumber') }}</h3>
                      <p class="text-gray-600 font-bold">{{ getFlightProperty('airline')?.name }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-8">
                    <div class="text-center">
                      <div class="text-2xl font-black text-gray-900">{{ getFlightProperty('departureTime') }}</div>
                      <div class="text-sm text-gray-600 font-bold">{{ getFlightProperty('originAirport')?.iataCode }}</div>
                      <div class="text-xs text-gray-500">{{ getFlightProperty('originAirport')?.city }}</div>
                    </div>
                    
                    <div class="flex-1 text-center">
                      <div class="text-sm text-gray-600 font-bold mb-1">{{ getFlightProperty('duration') }}</div>
                      <div class="h-px bg-gray-300 relative">
                        <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rotate-45"></div>
                      </div>
                      <div class="text-xs text-gray-500 mt-1">{{ getFlightProperty('aircraft')?.model }}</div>
                    </div>
                    
                    <div class="text-center">
                      <div class="text-2xl font-black text-gray-900">{{ getFlightProperty('arrivalTime') }}</div>
                      <div class="text-sm text-gray-600 font-bold">{{ getFlightProperty('destinationAirport')?.iataCode }}</div>
                      <div class="text-xs text-gray-500">{{ getFlightProperty('destinationAirport')?.city }}</div>
                    </div>
                  </div>
                </div>

                <!-- Fare Information -->
                <div class="bg-blue-50 p-6 border-4 border-blue-200">
                  <h4 class="text-lg font-black text-gray-900 mb-4">Fare Details</h4>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <span class="text-sm text-gray-600 font-bold">Fare Type:</span>
                      <span class="ml-2 font-black text-gray-900">{{ 'fareCode' in selectedFlight ? selectedFlight.fareCode : 'Y' }} Fare</span>
                    </div>
                    <div>
                      <span class="text-sm text-gray-600 font-bold">Price:</span>
                      <span class="ml-2 font-black text-gray-900">{{ formatPrice('price' in selectedFlight ? selectedFlight.price : selectedFlight.totalPrice) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Step 2: Passenger Information -->
          <Card v-if="currentStep === 2" class="border-4 border-gray-900 rounded-none mb-6">
            <CardContent class="p-6">
               <div class="flex justify-between items-center mb-6">
                 <CardTitle class="text-2xl font-black text-gray-900">Passenger Information</CardTitle>
               </div>
              
              <div class="space-y-6">
                <div
                  v-for="(passenger, index) in passengers"
                  :key="passenger.id"
                  class="bg-gray-50 p-6 border-4 border-gray-200"
                >
                   <div class="flex justify-between items-center mb-4">
                     <h4 class="text-lg font-black text-gray-900">Passenger {{ index + 1 }}</h4>
                   </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">First Name</Label>
                      <Input
                        v-model="passenger.firstName"
                        placeholder="Enter first name"
                        class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                      />
                    </div>
                    
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Last Name</Label>
                      <Input
                        v-model="passenger.lastName"
                        placeholder="Enter last name"
                        class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                      />
                    </div>
                    
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Email</Label>
                      <Input
                        v-model="passenger.email"
                        type="email"
                        placeholder="Enter email address"
                        class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                      />
                    </div>
                    
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Phone</Label>
                      <Input
                        v-model="passenger.phone"
                        placeholder="Enter phone number"
                        class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                      />
                    </div>
                    
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Date of Birth</Label>
                      <Input
                        v-model="passenger.dateOfBirth"
                        type="date"
                        class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                      />
                    </div>
                    
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Nationality</Label>
                      <Select v-model="passenger.nationality">
                        <SelectTrigger class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent class="border-4 border-gray-900 rounded-none">
                          <SelectItem value="PH">Philippines</SelectItem>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="SG">Singapore</SelectItem>
                          <SelectItem value="HK">Hong Kong</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Step 3: Contact & Billing -->
          <Card v-if="currentStep === 3" class="border-4 border-gray-900 rounded-none mb-6">
            <CardContent class="p-6">
              <CardTitle class="text-2xl font-black text-gray-900 mb-6">Contact & Billing Information</CardTitle>
              
              <div class="space-y-6">
                <!-- Contact Information -->
                <div class="bg-gray-50 p-6 border-4 border-gray-200">
                  <h4 class="text-lg font-black text-gray-900 mb-4">Contact Information</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Email Address</Label>
                      <Input
                        v-model="contactInfo.email"
                        type="email"
                        placeholder="Enter email address"
                        class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                      />
                    </div>
                    
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Phone Number</Label>
                      <Input
                        v-model="contactInfo.phone"
                        placeholder="Enter phone number"
                        class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                      />
                    </div>
                    
                    <div class="md:col-span-2">
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Address</Label>
                      <Input
                        v-model="contactInfo.address"
                        placeholder="Enter complete address"
                        class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                      />
                    </div>
                    
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">City</Label>
                      <Input
                        v-model="contactInfo.city"
                        placeholder="Enter city"
                        class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                      />
                    </div>
                    
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Postal Code</Label>
                      <Input
                        v-model="contactInfo.postalCode"
                        placeholder="Enter postal code"
                        class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Step 4: Payment & Confirmation -->
          <Card v-if="currentStep === 4" class="border-4 border-gray-900 rounded-none mb-6">
            <CardContent class="p-6">
              <CardTitle class="text-2xl font-black text-gray-900 mb-6">Payment Information</CardTitle>
              
              <div class="space-y-6">
                <!-- Payment Method Selection -->
                <div class="bg-gray-50 p-6 border-4 border-gray-200">
                  <h4 class="text-lg font-black text-gray-900 mb-4">Choose Payment Method</h4>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      v-for="method in paymentMethods"
                      :key="method.id"
                      @click="paymentInfo.method = method.name"
                      :class="[
                        'p-4 border-4 rounded-none cursor-pointer transition-all duration-300 transform hover:-translate-y-1',
                        paymentInfo.method === method.name
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 bg-white hover:border-gray-400'
                      ]"
                    >
                      <div class="flex items-center gap-4">
                        <div 
                          :class="[
                            'w-12 h-12 flex items-center justify-center',
                            method.color === 'blue' ? 'bg-blue-100' :
                            method.color === 'green' ? 'bg-green-100' :
                            method.color === 'purple' ? 'bg-purple-100' :
                            'bg-orange-100'
                          ]"
                        >
                          <component 
                            :is="getIconComponent(method.icon)"
                            :class="[
                              'w-6 h-6',
                              method.color === 'blue' ? 'text-blue-600' :
                              method.color === 'green' ? 'text-green-600' :
                              method.color === 'purple' ? 'text-purple-600' :
                              'text-orange-600'
                            ]"
                          />
                        </div>
                        
                        <div class="flex-1">
                          <h5 class="font-black text-gray-900 text-lg">{{ method.name }}</h5>
                          <p class="text-sm text-gray-600 font-bold">{{ method.description }}</p>
                          <div class="flex items-center gap-4 mt-2">
                            <span class="text-xs text-gray-500 font-bold">{{ method.processingTime }}</span>
                            <span 
                              :class="[
                                'text-xs font-bold',
                                method.fee === 'No Fee' ? 'text-green-600' : 'text-gray-600'
                              ]"
                            >
                              {{ method.fee }}
                            </span>
                          </div>
                        </div>
                        
                        <div 
                          v-if="paymentInfo.method === method.name"
                          class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center"
                        >
                          <CheckCircle class="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Credit Card Form (only show if Credit/Debit Cards is selected) -->
                <div v-if="paymentInfo.method === 'Credit/Debit Cards'" class="bg-gray-50 p-6 border-4 border-gray-200">
                  <h4 class="text-lg font-black text-gray-900 mb-4">Card Details</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-2">
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Card Number</Label>
                      <div class="relative">
                        <CardIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          v-model="paymentInfo.cardNumber"
                          placeholder="1234 5678 9012 3456"
                          class="pl-12 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Expiry Date</Label>
                      <Input
                        v-model="paymentInfo.expiryDate"
                        placeholder="MM/YY"
                        class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                      />
                    </div>
                    
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">CVV</Label>
                      <div class="relative">
                        <Input
                          v-model="paymentInfo.cvv"
                          type="password"
                          placeholder="123"
                          class="pr-12 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                        />
                        <button
                          @click="showPassword = !showPassword"
                          class="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          <Eye v-if="!showPassword" class="w-4 h-4 text-gray-400" />
                          <EyeOff v-else class="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    
                    <div class="md:col-span-2">
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Cardholder Name</Label>
                      <Input
                        v-model="paymentInfo.cardholderName"
                        placeholder="Enter cardholder name"
                        class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>

                <!-- Security Notice -->
                <div class="bg-green-50 p-4 border-4 border-green-200">
                  <div class="flex items-center gap-3">
                    <Shield class="w-6 h-6 text-green-600" />
                    <div>
                      <h5 class="font-black text-green-800">Secure Payment</h5>
                      <p class="text-sm text-green-700 font-bold">Your payment information is encrypted and secure.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Navigation Buttons -->
          <div class="flex justify-between">
            <Button
              v-if="currentStep > 1"
              @click="prevStep"
              variant="outline"
              class="border-4 border-gray-900 rounded-none font-black px-8 py-3"
            >
              <ArrowLeft class="w-4 h-4 mr-2" />
              Previous
            </Button>
            <div v-else></div>
            
            <Button
              v-if="currentStep < totalSteps"
              @click="nextStep"
              :disabled="!isStepValid"
              class="bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black px-8 py-3"
            >
              Continue
              <ArrowRight class="w-4 h-4 ml-2" />
            </Button>
            
            <Button
              v-else
              @click="handlePayment"
              :disabled="!isStepValid || isProcessing"
              class="bg-green-600 hover:bg-green-700 text-white rounded-none font-black px-8 py-3"
            >
              <Loader2 v-if="isProcessing" class="w-4 h-4 mr-2 animate-spin" />
              <CreditCard v-else class="w-4 h-4 mr-2" />
              {{ isProcessing ? 'Processing...' : 'Complete Booking' }}
            </Button>
          </div>
        </div>

        <!-- Right Column - Booking Summary -->
        <div class="lg:col-span-1">
          <Card class="border-4 border-gray-900 rounded-none sticky top-32">
            <CardContent class="p-6">
              <CardTitle class="text-xl font-black text-gray-900 mb-6">Booking Summary</CardTitle>
              
              <!-- Flight Details -->
              <div v-if="selectedFlight" class="mb-6">
                <div class="flex items-center gap-3 mb-3">
                  <Plane class="w-5 h-5 text-blue-600" />
                  <span class="font-black text-gray-900">{{ getFlightProperty('flightNumber') }}</span>
                </div>
                <div class="text-sm text-gray-600 font-bold">
                  {{ getFlightProperty('originAirport')?.iataCode }} → {{ getFlightProperty('destinationAirport')?.iataCode }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ getFlightProperty('departureTime') }} - {{ getFlightProperty('arrivalTime') }}
                </div>
              </div>
              
              <!-- Price Breakdown -->
              <div class="space-y-3 mb-6">
                <div class="flex justify-between">
                  <span class="text-gray-600 font-bold">Passengers</span>
                  <span class="font-black text-gray-900">{{ passengers.length }} Passenger{{ passengers.length > 1 ? 's' : '' }}</span>
                </div>
                
                <div class="flex justify-between">
                  <span class="text-gray-600 font-bold">Base Fare</span>
                  <span class="font-black text-gray-900">{{ formatPrice(baseFare * passengers.length) }}</span>
                </div>
                
                <div class="flex justify-between">
                  <span class="text-gray-600 font-bold">Taxes & Fees</span>
                  <span class="font-black text-gray-900">{{ formatPrice((taxes + fees) * passengers.length) }}</span>
                </div>
                
                <div class="border-t-2 border-gray-300 pt-4">
                  <div class="flex justify-between">
                    <span class="text-xl font-black text-gray-900">Total</span>
                    <span class="text-xl font-black text-gray-900">{{ formatPrice(totalPrice) }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Security Badge -->
              <div class="bg-blue-50 p-4 border-4 border-blue-200">
                <div class="flex items-center gap-2">
                  <Lock class="w-4 h-4 text-blue-600" />
                  <span class="text-sm font-black text-blue-800">Secure Booking</span>
                </div>
                <p class="text-xs text-blue-700 font-bold mt-1">
                  Your booking is protected with SSL encryption
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
