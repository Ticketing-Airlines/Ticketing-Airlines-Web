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
  Wallet,
  Building2,
  Smartphone,
  Globe,
  Banknote,
  Landmark,
  Lock,
  AlertCircle
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useBookingStore } from '@/stores/bookingStore'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'
import AddOnsSelection from '@/components/booking/AddOnsSelection.vue'
import { getBundleByType } from '@/data/fareBundles'

import { useValidation } from '@/composables/useValidation'
import { paymentMethodService } from '@/services/paymentMethodService'
import { bookingService } from '@/services/bookingService'
import { mapBookingPassengerToRequest } from '@/types/booking'

import { watch, ref } from 'vue'

const router = useRouter()
const bookingStore = useBookingStore()
const authStore = useAuthStore()
const userStore = useUserStore()

// Store state
const { 
  currentStep, 
  selectedFlight, 
  passengers, 
  contactInfo, 
  selectedPaymentMethod,
  isProcessing,
  error: bookingError,
  totalPrice,
  baseFare,
  taxes,
  fees,
  selectedBundle,
  flightIds,
  paymentMethods
} = storeToRefs(bookingStore)

// Local state for payment methods loading
const isLoadingPaymentMethods = ref(false)
const paymentMethodsError = ref<string | null>(null)

// Fetch payment methods on mount
onMounted(async () => {
  if (!selectedFlight.value) {
    router.push('/flights')
    return
  }
  
  // Prefill first passenger with logged-in user data
  if (authStore.isAuthenticated && passengers.value.length > 0) {
    try {
      // Try to load user profile if not already loaded
      if (!userStore.profile && authStore.user?.userId) {
        await userStore.initializeUser(authStore.user.userId)
      }
      
      // Prefill first passenger
      if (userStore.profile) {
        const nameParts = userStore.profile.name.split(' ')
        const firstName = nameParts[0] || ''
        const lastName = nameParts.slice(1).join(' ') || ''
        
        // Map gender string to code
        let genderCode: 'M' | 'F' | 'O' = 'M'
        if (userStore.profile.gender) {
          const genderLower = userStore.profile.gender.toLowerCase()
          if (genderLower === 'male' || genderLower === 'm') {
            genderCode = 'M'
          } else if (genderLower === 'female' || genderLower === 'f') {
            genderCode = 'F'
          } else {
            genderCode = 'O'
          }
        }
        
        // Format date of birth to YYYY-MM-DD for HTML date input
        let formattedDob: string | null = null
        if (userStore.profile.dateOfBirth) {
          try {
            // Handle both ISO string and YYYY-MM-DD formats
            const dobDate = new Date(userStore.profile.dateOfBirth)
            if (!isNaN(dobDate.getTime())) {
              formattedDob = dobDate.toISOString().split('T')[0]
            }
          } catch (error) {
            console.error('Failed to parse date of birth:', error)
          }
        }
        
        passengers.value[0] = {
          ...passengers.value[0],
          firstName,
          lastName,
          dateOfBirth: formattedDob,
          gender: genderCode,
        }
        
        // Also prefill contact info
        contactInfo.value.email = userStore.profile.email
        contactInfo.value.phone = userStore.profile.phone
      }
    } catch (error) {
      console.error('Failed to load user profile for prefill:', error)
      // Continue without prefilling - not a critical error
    }
  }
  
  // Fetch payment methods
  try {
    isLoadingPaymentMethods.value = true
    const methods = await paymentMethodService.getActive()
    bookingStore.setPaymentMethods(methods)
  } catch (err) {
    const error = err as Error
    paymentMethodsError.value = error.message || 'Failed to load payment methods'
  } finally {
    isLoadingPaymentMethods.value = false
  }
})

// Get current bundle details
const currentBundle = computed(() => getBundleByType(selectedBundle.value))

// Validation Rules
const { rules } = useValidation({}, {})

// Passenger Validation
const passengerValidators = ref<ReturnType<typeof useValidation>[]>([])

const createPassengerValidator = (passenger: typeof passengers.value[0]) => {
  return useValidation(passenger, {
    firstName: [rules.required('First name is required')],
    lastName: [rules.required('Last name is required')],
    dateOfBirth: [rules.required('Date of birth is required')],
    gender: [rules.required('Gender is required')],
    passengerType: [rules.required('Passenger type is required')],
    nationality: [rules.required('Nationality is required')]
  })
}

// Sync validators with passengers
watch(passengers, (newPassengers) => {
  if (newPassengers && newPassengers.length > 0) {
    passengerValidators.value = newPassengers.map(p => createPassengerValidator(p))
  }
}, { immediate: true, deep: true })

// Contact Info Validation
const contactValidation = useValidation(contactInfo.value, {
  email: [rules.required('Email is required'), rules.email('Invalid email format')],
  phone: [rules.required('Phone number is required')]
})

// Get icon component for payment method
const getPaymentIcon = (methodCode: string) => {
  if (methodCode.includes('card') || methodCode.includes('visa') || methodCode.includes('mastercard')) {
    return CreditCard
  } else if (methodCode.includes('gcash') || methodCode.includes('paymaya') || methodCode.includes('maya')) {
    return Wallet
  } else if (methodCode.includes('bank')) {
    return Building2
  } else if (methodCode.includes('grab')) {
    return Smartphone
  } else if (methodCode.includes('paypal')) {
    return Globe
  } else if (methodCode.includes('otc') || methodCode.includes('7eleven') || methodCode.includes('bayad')) {
    return Banknote
  }
  return Landmark
}

const totalSteps = 5

const progressPercentage = computed(() => {
  return (currentStep.value / totalSteps) * 100
})

const stepTitles = [
  'Flight Details',
  'Passenger Information', 
  'Add-ons',
  'Contact & Billing',
  'Payment & Confirmation'
]

const formatPrice = (price: number) => {
  return `₱${price.toLocaleString()}`
}

const nextStep = () => {
  let isValid = false

  switch (currentStep.value) {
    case 1:
      isValid = selectedFlight.value !== null
      break
    case 2:
      // Validate all passengers
      if (passengerValidators.value.length === 0) {
        console.error('Validators not initialized')
        return
      }
      
      isValid = passengerValidators.value.every(v => {
        if (!v || !v.validate) {
          console.error('Invalid validator:', v)
          return false
        }
        return v.validate()
      })
      
      // Debug: Log validation results
      if (!isValid) {
        console.log('Passenger validation failed')
        passengerValidators.value.forEach((validator, index) => {
          if (validator && validator.errors) {
            console.log(`Passenger ${index + 1} errors:`, validator.errors.value)
          } else {
            console.log(`Passenger ${index + 1} validator is invalid:`, validator)
          }
        })
      }
      break
    case 3:
      isValid = true // Add-ons are optional
      break
    case 4:
      isValid = contactValidation.validate()
      break
    case 5:
      isValid = !!selectedPaymentMethod.value
      break
    default:
      isValid = false
  }

  if (isValid && currentStep.value < totalSteps) {
    bookingStore.setStep(currentStep.value + 1)
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    bookingStore.setStep(currentStep.value - 1)
  }
}

const handlePayment = async () => {
  // Validate payment method is selected
  if (!selectedPaymentMethod.value) {
    bookingStore.setError('Please select a payment method')
    return
  }

  bookingStore.setProcessing(true)
  bookingStore.setError(null)

  try {
    // Step 1: Prepare booking request
    const bookingRequest = {
      flightIds: flightIds.value,
      flightBundleId: 1, // TODO: Get actual bundle ID from selected bundle
      contactEmail: contactInfo.value.email,
      contactPhone: contactInfo.value.phone,
      passengers: passengers.value.map(p => mapBookingPassengerToRequest(p))
    }

    // Step 2: Create booking
    const bookingResponse = await bookingService.create(bookingRequest)
    bookingStore.setBookingResult(bookingResponse.pnr, bookingResponse.bookingId)

    // Step 3: Confirm payment
    const paymentRequest = {
      paymentMethod: selectedPaymentMethod.value,
      paymentReference: `PAY-${Date.now()}` // Generate reference
    }
    
    await bookingService.confirmPayment(bookingResponse.pnr, paymentRequest)

    // Step 4: Redirect to confirmation page
    router.push(`/booking-confirmation?pnr=${bookingResponse.pnr}`)
  } catch (err) {
    const error = err as Error
    bookingStore.setError(error.message || 'Failed to process booking. Please try again.')
  } finally {
    bookingStore.setProcessing(false)
  }
}

const retryLoadPaymentMethods = async () => {
  try {
    isLoadingPaymentMethods.value = true
    paymentMethodsError.value = null
    const methods = await paymentMethodService.getActive()
    bookingStore.setPaymentMethods(methods)
  } catch (err) {
    const error = err as Error
    paymentMethodsError.value = error.message || 'Failed to load payment methods'
  } finally {
    isLoadingPaymentMethods.value = false
  }
}

const getFlightProperty = (property: string): string | number => {
  if (!selectedFlight.value) return ''
  
  const flight = selectedFlight.value as Record<string, unknown>
  
  if ('price' in flight) {
    // Single flight result
    return (flight[property] as string | number) || ''
  } else if ('outbound' in flight) {
    // Round trip result
    const outbound = flight.outbound as Record<string, unknown>
    return (outbound[property] as string | number) || ''
  } else if ('segments' in flight) {
    // Multi-city result
    const segments = flight.segments as Array<Record<string, unknown>>
    return (segments[0]?.[property] as string | number) || ''
  }
  return ''
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Progress Bar -->
    <div class="bg-white border-b-4 border-gray-900 sticky top-16 z-40">
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
                      <span class="ml-2 font-black text-gray-900">{{ currentBundle ? currentBundle.name : 'Standard' }}</span>
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
                     <div class="flex items-center gap-3">
                       <h4 class="text-lg font-black text-gray-900">Passenger {{ index + 1 }}</h4>
                       <span 
                         v-if="index === 0 && authStore.isAuthenticated && passenger.firstName"
                         class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded"
                       >
                         Your Info
                       </span>
                     </div>
                   </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">First Name *</Label>
                      <Input
                        v-model="passenger.firstName"
                        placeholder="Enter first name"
                        class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                        :class="{ 'border-red-500': passengerValidators[index]?.errors?.value?.firstName }"
                      />
                      <span v-if="passengerValidators[index]?.errors?.value?.firstName" class="text-red-500 text-xs font-bold mt-1">{{ passengerValidators[index].errors.value.firstName }}</span>
                    </div>
                    
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Last Name *</Label>
                      <Input
                        v-model="passenger.lastName"
                        placeholder="Enter last name"
                        class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                        :class="{ 'border-red-500': passengerValidators[index]?.errors?.value?.lastName }"
                      />
                      <span v-if="passengerValidators[index]?.errors?.value?.lastName" class="text-red-500 text-xs font-bold mt-1">{{ passengerValidators[index].errors.value.lastName }}</span>
                    </div>
                    
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Middle Name</Label>
                      <Input
                        v-model="passenger.middleName"
                        placeholder="Enter middle name (optional)"
                        class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                      />
                    </div>
                    
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Date of Birth *</Label>
                      <Input
                        v-model="passenger.dateOfBirth"
                        type="date"
                        class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                        :class="{ 'border-red-500': passengerValidators[index]?.errors?.value?.dateOfBirth }"
                      />
                      <span v-if="passengerValidators[index]?.errors?.value?.dateOfBirth" class="text-red-500 text-xs font-bold mt-1">{{ passengerValidators[index].errors.value.dateOfBirth }}</span>
                    </div>
                    
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Gender *</Label>
                      <Select v-model="passenger.gender">
                        <SelectTrigger class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent class="border-4 border-gray-900 rounded-none">
                          <SelectItem value="M">Male</SelectItem>
                          <SelectItem value="F">Female</SelectItem>
                          <SelectItem value="O">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <span v-if="passengerValidators[index]?.errors?.value?.gender" class="text-red-500 text-xs font-bold mt-1">{{ passengerValidators[index].errors.value.gender }}</span>
                    </div>
                    
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Passenger Type *</Label>
                      <Select v-model="passenger.passengerType">
                        <SelectTrigger class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent class="border-4 border-gray-900 rounded-none">
                          <SelectItem value="ADT">Adult (12+ years)</SelectItem>
                          <SelectItem value="CHD">Child (2-11 years)</SelectItem>
                          <SelectItem value="INFANT">Infant (0-2 years)</SelectItem>
                          <SelectItem value="SENIOR">Senior (60+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                      <span v-if="passengerValidators[index]?.errors?.value?.passengerType" class="text-red-500 text-xs font-bold mt-1">{{ passengerValidators[index].errors.value.passengerType }}</span>
                    </div>
                    
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Nationality *</Label>
                      <Select v-model="passenger.nationality">
                        <SelectTrigger class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600">
                          <SelectValue placeholder="Select nationality" />
                        </SelectTrigger>
                        <SelectContent class="border-4 border-gray-900 rounded-none">
                          <SelectItem value="PH">Philippines</SelectItem>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="SG">Singapore</SelectItem>
                          <SelectItem value="HK">Hong Kong</SelectItem>
                          <SelectItem value="JP">Japan</SelectItem>
                          <SelectItem value="KR">South Korea</SelectItem>
                          <SelectItem value="CN">China</SelectItem>
                          <SelectItem value="AU">Australia</SelectItem>
                          <SelectItem value="GB">United Kingdom</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                        </SelectContent>
                      </Select>
                      <span v-if="passengerValidators[index]?.errors?.value?.nationality" class="text-red-500 text-xs font-bold mt-1">{{ passengerValidators[index].errors.value.nationality }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Step 3: Add-ons -->
          <Card v-if="currentStep === 3" class="border-4 border-gray-900 rounded-none mb-6">
            <CardContent class="p-6">
              <CardTitle class="text-2xl font-black text-gray-900 mb-6">Add-ons</CardTitle>
              <AddOnsSelection />
            </CardContent>
          </Card>

          <!-- Step 4: Contact & Billing -->
          <Card v-if="currentStep === 4" class="border-4 border-gray-900 rounded-none mb-6">
            <CardContent class="p-6">
              <CardTitle class="text-2xl font-black text-gray-900 mb-6">Contact Information</CardTitle>
              
              <div class="space-y-6">
                <!-- Contact Information -->
                <div class="bg-gray-50 p-6 border-4 border-gray-200">
                  <h4 class="text-lg font-black text-gray-900 mb-4">Booking Contact Details</h4>
                  <p class="text-sm text-gray-600 font-bold mb-4">
                    We'll send your booking confirmation and flight updates to these contact details.
                  </p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Email Address *</Label>
                      <Input
                        v-model="contactInfo.email"
                        type="email"
                        placeholder="Enter email address"
                        class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                        :class="{ 'border-red-500': contactValidation?.errors?.value?.email }"
                      />
                      <span v-if="contactValidation?.errors?.value?.email" class="text-red-500 text-xs font-bold mt-1">{{ contactValidation.errors.value.email }}</span>
                    </div>
                    
                    <div>
                      <Label class="text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Phone Number *</Label>
                      <Input
                        v-model="contactInfo.phone"
                        placeholder="Enter phone number"
                        class="border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600"
                        :class="{ 'border-red-500': contactValidation?.errors?.value?.phone }"
                      />
                      <span v-if="contactValidation?.errors?.value?.phone" class="text-red-500 text-xs font-bold mt-1">{{ contactValidation.errors.value.phone }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Step 5: Payment & Confirmation -->
          <Card v-if="currentStep === 5" class="border-4 border-gray-900 rounded-none mb-6">
            <CardContent class="p-6">
              <CardTitle class="text-2xl font-black text-gray-900 mb-6">Payment Information</CardTitle>
              
              <!-- Loading State -->
              <div v-if="isLoadingPaymentMethods" class="flex flex-col items-center justify-center py-12">
                <Loader2 class="w-12 h-12 text-blue-600 animate-spin mb-4" />
                <p class="text-gray-600 font-bold">Loading payment methods...</p>
              </div>

              <!-- Error State -->
              <div v-else-if="paymentMethodsError" class="bg-red-50 border-4 border-red-200 p-6">
                <div class="flex items-start gap-4">
                  <AlertCircle class="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div class="flex-1">
                    <h4 class="font-black text-red-800 mb-2">Unable to Load Payment Methods</h4>
                    <p class="text-red-700 font-bold mb-4">{{ paymentMethodsError }}</p>
                    <Button
                      @click="retryLoadPaymentMethods"
                      class="bg-red-600 hover:bg-red-700 text-white rounded-none font-black"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              </div>

              <!-- Payment Methods -->
              <div v-else class="space-y-6">
                <!-- Booking Error Display -->
                <div v-if="bookingError" class="bg-red-50 border-4 border-red-200 p-4">
                  <div class="flex items-start gap-3">
                    <AlertCircle class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 class="font-black text-red-800">Booking Error</h4>
                      <p class="text-sm text-red-700 font-bold mt-1">{{ bookingError }}</p>
                    </div>
                  </div>
                </div>

                <!-- Payment Method Selection -->
                <div class="bg-gray-50 p-6 border-4 border-gray-200">
                  <h4 class="text-lg font-black text-gray-900 mb-4">Choose Payment Method</h4>
                  <p class="text-sm text-gray-600 font-bold mb-4">
                    Select your preferred payment method to complete your booking.
                  </p>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      v-for="method in paymentMethods"
                      :key="method.methodCode"
                      @click="bookingStore.setPaymentMethod(method.methodCode)"
                      :class="[
                        'p-4 border-4 rounded-none cursor-pointer transition-all duration-300 transform hover:-translate-y-1',
                        selectedPaymentMethod === method.methodCode
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 bg-white hover:border-gray-400'
                      ]"
                    >
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-blue-100 flex items-center justify-center">
                          <component 
                            :is="getPaymentIcon(method.methodCode)"
                            class="w-6 h-6 text-blue-600"
                          />
                        </div>
                        
                        <div class="flex-1">
                          <h5 class="font-black text-gray-900 text-lg">{{ method.name }}</h5>
                          <p class="text-sm text-gray-600 font-bold">{{ method.category }}</p>
                          <div class="flex items-center gap-4 mt-2">
                            <span 
                              v-if="method.processingTime"
                              class="text-xs text-gray-500 font-bold"
                            >
                              {{ method.processingTime }}
                            </span>
                            <span 
                              :class="[
                                'text-xs font-bold',
                                method.feeAmount === 0 ? 'text-green-600' : 'text-gray-600'
                              ]"
                            >
                              {{ method.feeAmount === 0 ? 'No Fee' : formatPrice(method.feeAmount) }}
                            </span>
                          </div>
                        </div>
                        
                        <div 
                          v-if="selectedPaymentMethod === method.methodCode"
                          class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center"
                        >
                          <CheckCircle class="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Payment Instructions (if method selected) -->
                <div v-if="selectedPaymentMethod" class="bg-blue-50 p-6 border-4 border-blue-200">
                  <h4 class="text-lg font-black text-blue-900 mb-3">Next Steps</h4>
                  <p class="text-sm text-blue-800 font-bold">
                    After clicking "Complete Booking", you will receive a booking confirmation with your PNR (booking reference number). 
                    Payment instructions will be sent to your email.
                  </p>
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
              class="bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black px-8 py-3"
            >
              Continue
              <ArrowRight class="w-4 h-4 ml-2" />
            </Button>
            
            <Button
              v-else
              @click="handlePayment"
              :disabled="isProcessing"
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
                  <span class="text-gray-600 font-bold">Fare Bundle</span>
                  <span class="font-black text-gray-900">{{ currentBundle ? currentBundle.name : 'Standard' }}</span>
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
