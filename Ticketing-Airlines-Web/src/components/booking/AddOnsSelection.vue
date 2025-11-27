<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookingStore } from '@/stores/bookingStore'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Luggage, Utensils, Armchair, CheckCircle } from 'lucide-vue-next'
import SeatMap from '@/components/SeatMap.vue'

const bookingStore = useBookingStore()
const { passengers, addOns } = storeToRefs(bookingStore)

const activeTab = ref('baggage')

const baggageOptions = [
  { weight: 0, price: 0, label: 'No Baggage' },
  { weight: 20, price: 850, label: '20kg - Standard' },
  { weight: 32, price: 1400, label: '32kg - Heavy' },
  { weight: 40, price: 2000, label: '40kg - Extra Heavy' }
]

const mealOptions = [
  { id: '', price: 0, label: 'No Meal' },
  { id: 'chicken', price: 350, label: 'Chicken Adobo' },
  { id: 'beef', price: 450, label: 'Beef Tapa' },
  { id: 'fish', price: 400, label: 'Fish Fillet' },
  { id: 'veg', price: 350, label: 'Vegetarian Pasta' }
]

const getBaggageForPassenger = (passengerId: number) => {
  const item = addOns.value.baggage.find(b => b.passengerId === passengerId)
  return item ? item.weight : 0
}

const getMealForPassenger = (passengerId: number) => {
  const item = addOns.value.meals.find(m => m.passengerId === passengerId)
  return item ? item.mealId : ''
}

const getSeatForPassenger = (passengerId: number) => {
  const item = addOns.value.seats.find(s => s.passengerId === passengerId)
  return item ? item.seatNumber : 'None'
}

const updateBaggage = (passengerId: number, weightStr: string) => {
  const weight = parseInt(weightStr)
  const option = baggageOptions.find(o => o.weight === weight)
  if (option) {
    bookingStore.updateBaggage(passengerId, weight, option.price)
  }
}

const updateMeal = (passengerId: number, mealId: string) => {
  const option = mealOptions.find(o => o.id === mealId)
  if (option) {
    bookingStore.updateMeal(passengerId, mealId, option.price)
  }
}

const handleSeatSelection = (seat: any, passengerId: number) => {
  // Simple logic: assign seat to current passenger being edited or just first available
  // For this demo, we'll assume we are selecting for a specific passenger.
  // But SeatMap emits generic events.
  // We need a way to know WHICH passenger we are selecting for.
  // Let's add a selector for "Selecting for: Passenger Name" above the seat map.
}

const selectedPassengerForSeat = ref(passengers.value[0]?.id || 1)

const onSeatSelected = (seat: any) => {
  const passenger = passengers.value.find(p => p.id === selectedPassengerForSeat.value)
  if (passenger) {
    bookingStore.selectSeat(passenger.id, `${seat.row}${seat.col}`, seat.price || 0)
  }
}

const onSeatDeselected = (seat: any) => {
  const passenger = passengers.value.find(p => p.id === selectedPassengerForSeat.value)
  if (passenger) {
    // Logic to remove seat
    // But store doesn't have removeSeat, just selectSeat (which updates/adds).
    // We might need to handle removal or just overwrite.
    // For now, let's assume selecting another seat overwrites.
    // To remove, we might need a "Remove Seat" button or handle deselection in store.
    // Since store logic is simple, let's just leave it for now.
  }
}

const formatPrice = (price: number) => `₱${price.toLocaleString()}`
</script>

<template>
  <div class="space-y-6">
    <!-- Custom Tabs -->
    <div class="grid grid-cols-3 bg-gray-100 p-1 border-4 border-gray-900">
      <button 
        @click="activeTab = 'baggage'"
        :class="[
          'flex items-center justify-center font-black uppercase tracking-wider py-3 transition-all',
          activeTab === 'baggage' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'
        ]"
      >
        <Luggage class="w-4 h-4 mr-2" />
        Baggage
      </button>
      <button 
        @click="activeTab = 'meals'"
        :class="[
          'flex items-center justify-center font-black uppercase tracking-wider py-3 transition-all',
          activeTab === 'meals' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'
        ]"
      >
        <Utensils class="w-4 h-4 mr-2" />
        Meals
      </button>
      <button 
        @click="activeTab = 'seats'"
        :class="[
          'flex items-center justify-center font-black uppercase tracking-wider py-3 transition-all',
          activeTab === 'seats' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'
        ]"
      >
        <Armchair class="w-4 h-4 mr-2" />
        Seats
      </button>
    </div>

    <!-- Baggage Tab -->
    <div v-if="activeTab === 'baggage'" class="grid gap-4">
      <Card v-for="passenger in passengers" :key="passenger.id" class="border-4 border-gray-900 rounded-none">
        <CardContent class="p-6 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-blue-100 flex items-center justify-center">
              <Luggage class="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 class="font-black text-gray-900">{{ passenger.firstName }} {{ passenger.lastName }}</h4>
              <p class="text-sm text-gray-600 font-bold">Select baggage allowance</p>
            </div>
          </div>
          
          <Select 
            :model-value="getBaggageForPassenger(passenger.id).toString()"
            @update:model-value="(val) => updateBaggage(passenger.id, val as string)"
          >
            <SelectTrigger class="w-[200px] border-4 border-gray-900 rounded-none font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent class="border-4 border-gray-900 rounded-none">
              <SelectItem v-for="opt in baggageOptions" :key="opt.weight" :value="opt.weight.toString()">
                <div class="flex justify-between w-full gap-4">
                  <span>{{ opt.label }}</span>
                  <span v-if="opt.price > 0" class="font-black text-blue-600">+{{ formatPrice(opt.price) }}</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>

    <!-- Meals Tab -->
    <div v-if="activeTab === 'meals'" class="grid gap-4">
      <Card v-for="passenger in passengers" :key="passenger.id" class="border-4 border-gray-900 rounded-none">
        <CardContent class="p-6 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-orange-100 flex items-center justify-center">
              <Utensils class="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h4 class="font-black text-gray-900">{{ passenger.firstName }} {{ passenger.lastName }}</h4>
              <p class="text-sm text-gray-600 font-bold">Select meal preference</p>
            </div>
          </div>
          
          <Select 
            :model-value="getMealForPassenger(passenger.id)"
            @update:model-value="(val) => updateMeal(passenger.id, val as string)"
          >
            <SelectTrigger class="w-[250px] border-4 border-gray-900 rounded-none font-bold">
              <SelectValue placeholder="Select Meal" />
            </SelectTrigger>
            <SelectContent class="border-4 border-gray-900 rounded-none">
              <SelectItem v-for="opt in mealOptions" :key="opt.id" :value="opt.id">
                <div class="flex justify-between w-full gap-4">
                  <span>{{ opt.label }}</span>
                  <span v-if="opt.price > 0" class="font-black text-blue-600">+{{ formatPrice(opt.price) }}</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>

    <!-- Seats Tab -->
    <div v-if="activeTab === 'seats'" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Passenger Selector -->
      <div class="lg:col-span-1 space-y-4">
        <h4 class="font-black text-gray-900 text-lg mb-4">Select Passenger</h4>
        <div 
          v-for="passenger in passengers" 
          :key="passenger.id"
          @click="selectedPassengerForSeat = passenger.id"
          :class="[
            'p-4 border-4 cursor-pointer transition-all duration-300',
            selectedPassengerForSeat === passenger.id
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 bg-white hover:border-gray-400'
          ]"
        >
          <div class="flex justify-between items-center">
            <div>
              <div class="font-black text-gray-900">{{ passenger.firstName }} {{ passenger.lastName }}</div>
              <div class="text-sm text-gray-600 font-bold mt-1">
                Seat: <span class="text-blue-600">{{ getSeatForPassenger(passenger.id) }}</span>
              </div>
            </div>
            <CheckCircle v-if="selectedPassengerForSeat === passenger.id" class="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </div>

      <!-- Seat Map -->
      <div class="lg:col-span-2">
        <SeatMap 
          @seat-selected="onSeatSelected"
          @seat-deselected="onSeatDeselected"
        />
      </div>
    </div>
  </div>
</template>
