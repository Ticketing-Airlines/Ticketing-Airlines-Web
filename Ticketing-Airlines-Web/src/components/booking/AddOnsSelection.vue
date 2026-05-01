<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookingStore } from '@/stores/bookingStore'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { 
  Luggage, 
  Utensils, 
  Armchair, 
  CheckCircle, 
  Shield, 
  Loader2, 
  AlertCircle,
  Package 
} from 'lucide-vue-next'
import { flightAddOnService } from '@/services/flightAddOnService'
import { addOnPriceService } from '@/services/addOnPriceService'
import type { FlightAddOn, AddOnCategory } from '@/types/flightAddOn'
import type { AddOnPrice } from '@/types/addOnPrice'

const bookingStore = useBookingStore()
const { passengers, flightIds, availableAddOns, addOnPrices } = storeToRefs(bookingStore)

const isLoading = ref(false)
const error = ref<string | null>(null)

// Icon mapping
const iconComponents: Record<string, typeof Luggage> = {
  'Luggage': Luggage,
  'Armchair': Armchair,
  'UtensilsCrossed': Utensils,
  'Utensils': Utensils,
  'Shield': Shield,
  'Package': Package
}

// Fetch add-ons and prices on mount
onMounted(async () => {
  isLoading.value = true
  error.value = null
  
  try {
    // Fetch all available add-ons
    const addOns = await flightAddOnService.getAll()
    console.log('Fetched add-ons:', addOns)
    bookingStore.setAvailableAddOns(addOns)
    
    // Fetch prices for selected flights
    if (flightIds.value.length > 0) {
      console.log('Fetching prices for flight IDs:', flightIds.value)
      const pricesMap = await addOnPriceService.getByMultipleFlights(flightIds.value)
      console.log('Fetched prices map:', pricesMap)
      
      // Flatten the map into a single array of prices
      const allPrices: AddOnPrice[] = []
      pricesMap.forEach((prices) => {
        allPrices.push(...prices)
      })
      
      console.log('Flattened prices:', allPrices)
      bookingStore.setAddOnPrices(allPrices)
      console.log('Stored prices in store:', addOnPrices.value)
    }
  } catch (err) {
    console.error('Error loading add-ons:', err)
    error.value = (err as Error).message || 'Failed to load add-ons. Please try again.'
  } finally {
    isLoading.value = false
  }
})

// Group add-ons by category
const addOnsByCategory = computed(() => {
  const grouped: Record<AddOnCategory, FlightAddOn[]> = {
    1: [], // Baggage
    2: [], // Seat
    3: [], // Meal
    4: [], // Insurance
    99: [] // Other
  }
  
  // Create a Set to track which add-ons we've already added
  const addedAddOnIds = new Set<number>()
  
  availableAddOns.value.forEach(addOn => {
    // Only include add-ons that have prices available and haven't been added yet
    const hasPrice = addOnPrices.value.some(price => price.addOnId === addOn.id)
    if (hasPrice && !addedAddOnIds.has(addOn.id)) {
      grouped[addOn.category].push(addOn)
      addedAddOnIds.add(addOn.id)
    }
  })
  
  return grouped
})

// Get price for a specific add-on (returns the first/cheapest price if multiple exist)
const getPriceForAddOn = (addOnId: number): number => {
  // Find all prices for this add-on
  const prices = addOnPrices.value.filter(p => p.addOnId === addOnId)
  if (prices.length === 0) return 0
  
  // Return the cheapest price
  return Math.min(...prices.map(p => p.priceAmount))
}

// Check if passenger has selected an add-on
const isAddOnSelected = (passengerIndex: number, addOnId: number): boolean => {
  const passenger = passengers.value[passengerIndex]
  if (!passenger) return false
  
  // Find the AddOnPrice ID for this add-on
  const addOnPrice = addOnPrices.value.find(p => p.addOnId === addOnId)
  if (!addOnPrice) return false
  
  return passenger.selectedAddOns.includes(addOnPrice.id)
}

// Toggle add-on selection for a passenger
const toggleAddOn = (passengerIndex: number, addOnId: number) => {
  const addOnPrice = addOnPrices.value.find(p => p.addOnId === addOnId)
  if (!addOnPrice) return
  
  bookingStore.toggleAddOnForPassenger(passengerIndex, addOnPrice.id)
}

// Get icon component for category
const getCategoryIcon = (category: AddOnCategory) => {
  switch (category) {
    case 1: return Luggage
    case 2: return Armchair
    case 3: return Utensils
    case 4: return Shield
    default: return CheckCircle
  }
}

// Get category color
const getCategoryColor = (category: AddOnCategory) => {
  switch (category) {
    case 1: return 'blue'
    case 2: return 'purple'
    case 3: return 'orange'
    case 4: return 'green'
    default: return 'gray'
  }
}

// Get category name
const getCategoryName = (category: AddOnCategory): string => {
  switch (category) {
    case 1: return 'Baggage'
    case 2: return 'Seat Selection'
    case 3: return 'Meals'
    case 4: return 'Insurance'
    default: return 'Other Services'
  }
}

const formatPrice = (price: number) => `₱${price.toLocaleString()}`

const retryLoad = () => {
  onMounted(async () => {
    isLoading.value = true
    error.value = null
    
    try {
      const addOns = await flightAddOnService.getAll()
      bookingStore.setAvailableAddOns(addOns)
      
      if (flightIds.value.length > 0) {
        const prices = await addOnPriceService.getByMultipleFlights(flightIds.value)
        bookingStore.setAddOnPrices(prices)
      }
    } catch (err) {
      error.value = (err as Error).message || 'Failed to load add-ons. Please try again.'
    } finally {
      isLoading.value = false
    }
  })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
      <Loader2 class="w-12 h-12 text-blue-600 animate-spin mb-4" />
      <p class="text-gray-600 font-bold">Loading available add-ons...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border-4 border-red-200 p-6">
      <div class="flex items-start gap-4">
        <AlertCircle class="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
        <div class="flex-1">
          <h4 class="font-black text-red-800 mb-2">Unable to Load Add-ons</h4>
          <p class="text-red-700 font-bold mb-4">{{ error }}</p>
          <Button
            @click="retryLoad"
            class="bg-red-600 hover:bg-red-700 text-white rounded-none font-black"
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>

    <!-- Add-ons by Category -->
    <div v-else class="space-y-8">
      <!-- Info Banner -->
      <div class="bg-blue-50 border-4 border-blue-200 p-4">
        <div class="flex items-start gap-3">
          <CheckCircle class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 class="font-black text-blue-800">Enhance Your Journey</h4>
            <p class="text-sm text-blue-700 font-bold">
              Select add-ons for each passenger to customize your travel experience. All add-ons are optional.
            </p>
          </div>
        </div>
      </div>

      <!-- Render each category that has add-ons -->
      <div 
        v-for="category in [1, 3, 4, 99] as AddOnCategory[]" 
        :key="category"
        v-show="addOnsByCategory[category].length > 0"
        class="space-y-4"
      >
        <div class="flex items-center gap-3 mb-4">
          <component 
            :is="getCategoryIcon(category)" 
            :class="[
              'w-6 h-6',
              getCategoryColor(category) === 'blue' ? 'text-blue-600' :
              getCategoryColor(category) === 'purple' ? 'text-purple-600' :
              getCategoryColor(category) === 'orange' ? 'text-orange-600' :
              getCategoryColor(category) === 'green' ? 'text-green-600' :
              'text-gray-600'
            ]"
          />
          <h3 class="text-xl font-black text-gray-900 uppercase tracking-wider">
            {{ getCategoryName(category) }}
          </h3>
        </div>

        <!-- Add-ons in this category -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            v-for="addOn in addOnsByCategory[category]" 
            :key="addOn.id"
            class="border-4 border-gray-900 rounded-none hover:shadow-lg transition-shadow"
          >
            <CardContent class="p-0">
              <!-- Header Section -->
              <div 
                :class="[
                  'p-6 border-b-4 border-gray-200',
                  getCategoryColor(category) === 'blue' ? 'bg-blue-50' :
                  getCategoryColor(category) === 'purple' ? 'bg-purple-50' :
                  getCategoryColor(category) === 'orange' ? 'bg-orange-50' :
                  getCategoryColor(category) === 'green' ? 'bg-green-50' :
                  'bg-gray-50'
                ]"
              >
                <div class="flex items-start gap-4">
                  <div 
                    :class="[
                      'w-16 h-16 flex items-center justify-center flex-shrink-0 border-4 border-gray-900',
                      getCategoryColor(category) === 'blue' ? 'bg-blue-600' :
                      getCategoryColor(category) === 'purple' ? 'bg-purple-600' :
                      getCategoryColor(category) === 'orange' ? 'bg-orange-600' :
                      getCategoryColor(category) === 'green' ? 'bg-green-600' :
                      'bg-gray-600'
                    ]"
                  >
                    <component 
                      :is="iconComponents[addOn.icon] || Package" 
                      class="w-8 h-8 text-white"
                    />
                  </div>
                  <div class="flex-1">
                    <h4 class="font-black text-gray-900 text-xl mb-2">{{ addOn.name }}</h4>
                    <p class="text-sm text-gray-700 font-bold leading-relaxed">{{ addOn.description }}</p>
                  </div>
                </div>
                
                <!-- Price Badge -->
                <div class="mt-4 inline-block bg-white border-4 border-gray-900 px-4 py-2">
                  <div class="flex items-baseline gap-2">
                    <span class="text-2xl font-black text-blue-600">
                      {{ formatPrice(getPriceForAddOn(addOn.id)) }}
                    </span>
                    <span class="text-sm text-gray-600 font-bold">per passenger</span>
                  </div>
                </div>
              </div>

              <!-- Passenger Selection Section -->
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <Label class="text-sm font-black text-gray-900 uppercase tracking-wider">
                    Select Passengers
                  </Label>
                  <span class="text-xs text-gray-500 font-bold">
                    {{ passengers.filter((p, i) => isAddOnSelected(i, addOn.id)).length }} / {{ passengers.length }} selected
                  </span>
                </div>
                
                <div class="space-y-2">
                  <div
                    v-for="(passenger, index) in passengers"
                    :key="passenger.id"
                    @click="toggleAddOn(index, addOn.id)"
                    :class="[
                      'p-4 border-4 cursor-pointer transition-all duration-200 hover:scale-[1.02]',
                      isAddOnSelected(index, addOn.id)
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
                    ]"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3 flex-1">
                        <div 
                          :class="[
                            'w-10 h-10 rounded-full flex items-center justify-center font-black text-white border-2',
                            isAddOnSelected(index, addOn.id)
                              ? 'bg-blue-600 border-blue-700'
                              : 'bg-gray-400 border-gray-500'
                          ]"
                        >
                          {{ index + 1 }}
                        </div>
                        <div class="flex-1">
                          <div class="font-black text-gray-900">
                            {{ passenger.firstName || 'Passenger' }} {{ passenger.lastName || (index + 1) }}
                          </div>
                          <div class="text-xs text-gray-600 font-bold mt-0.5">
                            {{ passenger.passengerType === 'ADT' ? 'Adult' : passenger.passengerType === 'CHD' ? 'Child' : passenger.passengerType === 'SENIOR' ? 'Senior' : 'Infant' }}
                          </div>
                        </div>
                      </div>
                      
                      <div class="flex items-center gap-3">
                        <span 
                          v-if="isAddOnSelected(index, addOn.id)"
                          class="text-sm font-black text-blue-600"
                        >
                          {{ formatPrice(getPriceForAddOn(addOn.id)) }}
                        </span>
                        <div 
                          :class="[
                            'w-6 h-6 rounded-full border-4 flex items-center justify-center transition-all',
                            isAddOnSelected(index, addOn.id)
                              ? 'bg-blue-600 border-blue-600'
                              : 'border-gray-300'
                          ]"
                        >
                          <CheckCircle 
                            v-if="isAddOnSelected(index, addOn.id)"
                            class="w-4 h-4 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- No Add-ons Available -->
      <div 
        v-if="availableAddOns.length === 0 || addOnPrices.length === 0"
        class="bg-gray-50 border-4 border-gray-200 p-8 text-center"
      >
        <p class="text-gray-600 font-bold mb-2">
          {{ availableAddOns.length === 0 ? 'No add-ons are currently available for this flight.' : 'No pricing information available for add-ons on this flight.' }}
        </p>
        <p class="text-sm text-gray-500">
          You can continue with your booking without add-ons.
        </p>
      </div>
    </div>
  </div>
</template>
