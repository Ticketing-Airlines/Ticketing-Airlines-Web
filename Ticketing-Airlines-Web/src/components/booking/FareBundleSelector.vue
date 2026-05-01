<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Check, 
  Luggage,
  Armchair,
  RotateCcw,
  Wallet,
  Star,
  Package,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-vue-next'
import type { FareBundleType } from '@/interfaces/interfaces'
import type { FlightBundle } from '@/types/flightBundle'
import { flightBundleService } from '@/services/flightBundleService'

interface Props {
  basePrice: number
  selectedBundle?: FareBundleType
}

const props = withDefaults(defineProps<Props>(), {
  selectedBundle: 'SKYPLUS'
})

const emit = defineEmits<{
  (e: 'select', bundle: FareBundleType): void
}>()

// State
const bundles = ref<FlightBundle[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// Load bundles from API
const loadBundles = async () => {
  try {
    isLoading.value = true
    error.value = null
    bundles.value = await flightBundleService.getAll()
    
    if (bundles.value.length === 0) {
      error.value = 'No fare bundles are currently available. Please contact support for assistance.'
    }
  } catch (err) {
    console.error('Failed to load flight bundles:', err)
    error.value = 'We couldn\'t load the fare options. Please try again or contact support if the problem persists.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadBundles()
})

const formatPrice = (price: number) => {
  return `₱${price.toLocaleString()}`
}

const getBundlePrice = (bundle: FlightBundle) => {
  return props.basePrice + bundle.priceIncrement
}

const getBundleColor = (bundleType: string) => {
  switch (bundleType) {
    case 'SKYLITE':
      return 'bg-white'
    case 'SKYPLUS':
      return 'bg-blue-50'
    case 'SKYFLEX':
      return 'bg-green-50'
    default:
      return 'bg-white'
  }
}

const getBundleBorderColor = (bundleType: string) => {
  switch (bundleType) {
    case 'SKYPLUS':
      return 'border-blue-600'
    case 'SKYFLEX':
      return 'border-green-600'
    default:
      return 'border-gray-300'
  }
}

const isRecommended = (bundleType: string) => {
  return bundleType === 'SKYPLUS'
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-2xl font-black text-gray-900 mb-2">Choose Your Fare Bundle</h3>
      <p class="text-gray-600 font-bold">Select the bundle that best fits your travel needs</p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-16">
      <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <Loader2 class="w-8 h-8 animate-spin text-blue-600" />
      </div>
      <h4 class="text-lg font-black text-gray-900 mb-2">Loading Fare Options</h4>
      <p class="text-sm text-gray-600 font-bold">Please wait while we prepare your fare bundles...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border-4 border-red-600 p-8 text-center">
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle class="w-8 h-8 text-red-600" />
      </div>
      <h4 class="text-xl font-black text-gray-900 mb-3">Unable to Load Fare Options</h4>
      <p class="text-sm text-gray-600 font-bold mb-6">{{ error }}</p>
      <Button
        @click="loadBundles"
        class="bg-blue-600 hover:bg-blue-700 text-white rounded-none font-black px-6 py-3 text-sm"
      >
        <RefreshCw class="w-4 h-4 mr-2" />
        Try Again
      </Button>
      <p class="text-xs text-gray-500 font-bold mt-4">
        If the problem continues, please contact our support team
      </p>
    </div>

    <!-- Bundles Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card
        v-for="bundle in bundles"
        :key="bundle.id"
        @click="emit('select', bundle.type as FareBundleType)"
        :class="[
          'border-4 rounded-none cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative',
          props.selectedBundle === bundle.type ? getBundleBorderColor(bundle.type) : 'border-gray-900',
          getBundleColor(bundle.type)
        ]"
      >
        <!-- Recommended Badge -->
        <div
          v-if="isRecommended(bundle.type)"
          class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 font-black text-xs uppercase tracking-wider"
        >
          <Star class="w-3 h-3 inline mr-1" />
          Recommended
        </div>

        <CardContent class="p-6">
          <!-- Header -->
          <div class="text-center mb-6">
            <h4 class="text-2xl font-black text-gray-900 mb-2">{{ bundle.name }}</h4>
            <p class="text-sm text-gray-600 font-bold mb-4">{{ bundle.description }}</p>
            <div class="text-3xl font-black text-gray-900">
              {{ formatPrice(getBundlePrice(bundle)) }}
            </div>
            <div class="text-xs text-gray-500 font-bold mt-1">per passenger</div>
          </div>

          <!-- Features List -->
          <div class="space-y-3 mb-6">
            <!-- Hand Carry -->
            <div class="flex items-start gap-3">
              <Package class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div class="flex-1">
                <div class="font-bold text-gray-900 text-sm">Hand-carry baggage</div>
                <div class="text-xs text-gray-600">{{ bundle.features.handCarryBag }}</div>
              </div>
            </div>

            <!-- Checked Baggage -->
            <div class="flex items-start gap-3">
              <Luggage :class="[
                'w-5 h-5 mt-0.5 flex-shrink-0',
                bundle.features.checkedBaggage ? 'text-green-600' : 'text-gray-300'
              ]" />
              <div class="flex-1">
                <div class="font-bold text-gray-900 text-sm">Checked baggage</div>
                <div class="text-xs text-gray-600">
                  {{ bundle.features.checkedBaggage || 'Not included' }}
                </div>
              </div>
            </div>

            <!-- Seat Selection -->
            <div class="flex items-start gap-3">
              <Armchair :class="[
                'w-5 h-5 mt-0.5 flex-shrink-0',
                bundle.features.seatSelection !== 'none' ? 'text-green-600' : 'text-gray-300'
              ]" />
              <div class="flex-1">
                <div class="font-bold text-gray-900 text-sm">Seat selection</div>
                <div class="text-xs text-gray-600">
                  {{ bundle.features.seatSelection === 'standard' ? 'Standard seats' : 
                     bundle.features.seatSelection === 'any' ? 'Any available seat' : 
                     'Not included' }}
                </div>
              </div>
            </div>

            <!-- Rebooking -->
            <div class="flex items-start gap-3">
              <RotateCcw :class="[
                'w-5 h-5 mt-0.5 flex-shrink-0',
                bundle.features.rebooking ? 'text-green-600' : 'text-gray-300'
              ]" />
              <div class="flex-1">
                <div class="font-bold text-gray-900 text-sm">Flexible rebooking</div>
                <div class="text-xs text-gray-600">
                  {{ bundle.features.rebooking ? 'Rebook anytime' : 'Not included' }}
                </div>
              </div>
            </div>

            <!-- Travel Funds -->
            <div class="flex items-start gap-3">
              <Wallet :class="[
                'w-5 h-5 mt-0.5 flex-shrink-0',
                bundle.features.travelFundsConversion ? 'text-green-600' : 'text-gray-300'
              ]" />
              <div class="flex-1">
                <div class="font-bold text-gray-900 text-sm">Travel funds</div>
                <div class="text-xs text-gray-600">
                  {{ bundle.features.travelFundsConversion ? 'Convert to credits' : 'Not included' }}
                </div>
              </div>
            </div>
          </div>

          <!-- Select Button -->
          <Button
            :class="[
              'w-full rounded-none font-black uppercase tracking-wider transition-all duration-300',
              props.selectedBundle === bundle.type
                ? bundle.type === 'SKYPLUS' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : bundle.type === 'SKYFLEX'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-900 hover:bg-gray-800 text-white'
                : 'bg-white hover:bg-gray-50 text-gray-900 border-4 border-gray-900'
            ]"
          >
            <Check v-if="props.selectedBundle === bundle.type" class="w-4 h-4 mr-2" />
            {{ props.selectedBundle === bundle.type ? 'Selected' : 'Select' }}
          </Button>
        </CardContent>
      </Card>
    </div>

    <!-- Feature Comparison Note -->
    <div v-if="!isLoading && !error" class="bg-gray-100 p-4 border-4 border-gray-900">
      <p class="text-sm text-gray-700 font-bold text-center">
        <Check class="w-4 h-4 inline text-green-600" /> 
        All fares include complimentary snacks and beverages during your flight
      </p>
    </div>
  </div>
</template>
