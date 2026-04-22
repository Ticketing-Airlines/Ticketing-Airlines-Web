<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Luggage,
  Weight,
  Ruler,
  ShoppingBag,
  Briefcase,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
  Shield,
  Info,
  Package,
  Baby,
  Music,
  Camera,
  Heart,
  ArrowRight,
  Calculator,
  Plane
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

// Baggage Calculator State
const baggageWeight = ref(15)
const baggageCount = ref(1)
const flightType = ref<'domestic' | 'international'>('domestic')

// Pricing data
const baggagePricing = {
  domestic: [
    { weight: '15kg', price: 500 },
    { weight: '20kg', price: 700 },
    { weight: '25kg', price: 900 },
    { weight: '32kg', price: 1200 }
  ],
  international: [
    { weight: '20kg', price: 1500 },
    { weight: '25kg', price: 2000 },
    { weight: '30kg', price: 2500 },
    { weight: '40kg', price: 3500 }
  ]
}

// Computed properties
const totalPrice = computed(() => {
  const prices = baggagePricing[flightType.value]
  const weightIndex = Math.min(Math.floor((baggageWeight.value - 15) / 5), prices.length - 1)
  const basePrice = prices[Math.max(0, weightIndex)]?.price || 0
  return basePrice * baggageCount.value
})

const selectedWeightTier = computed(() => {
  const prices = baggagePricing[flightType.value]
  const weightIndex = Math.min(Math.floor((baggageWeight.value - 15) / 5), prices.length - 1)
  return prices[Math.max(0, weightIndex)]
})

// Methods
const incrementBags = () => {
  if (baggageCount.value < 5) baggageCount.value++
}

const decrementBags = () => {
  if (baggageCount.value > 1) baggageCount.value--
}

const purchaseBaggage = () => {
  console.log('Purchasing baggage:', { weight: baggageWeight.value, count: baggageCount.value, total: totalPrice.value })
  alert(`Added ${baggageCount.value} baggage(s) of ${selectedWeightTier.value.weight} to your booking!\nTotal: ₱${totalPrice.value.toLocaleString()}`)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white py-16 lg:py-20 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div class="relative container mx-auto px-4 text-center z-10 pt-8">
        <div class="inline-flex items-center rounded-full px-3 py-1.5 mb-4" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
          <Luggage class="w-3.5 h-3.5 mr-2 text-white" />
          <span class="font-semibold text-xs text-white">Baggage Information</span>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
          Baggage Allowance
        </h1>
        <p class="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto font-medium">
          Everything you need to know about your luggage
        </p>
      </div>
    </section>

    <!-- Baggage Calculator Section -->
    <div class="container mx-auto px-4 -mt-16 lg:-mt-20 relative z-20 mb-12">
      <div class="max-w-4xl mx-auto">
        <!-- Calculator Card -->
        <div class="bg-white shadow-2xl overflow-hidden">
          <!-- Header -->
          <div class="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 px-4 lg:px-6 py-4 relative overflow-hidden">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute top-0 left-0 right-0 h-px bg-white"></div>
              <div class="absolute bottom-0 left-0 right-0 h-px bg-white"></div>
            </div>

            <div class="relative flex items-center gap-3">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-lg flex items-center justify-center">
                <Calculator class="h-6 w-6 lg:h-7 lg:w-7 text-gray-900" />
              </div>
              <div>
                <h2 class="text-lg lg:text-base lg:text-lg font-black text-white tracking-tight uppercase">Baggage Calculator</h2>
                <p class="text-purple-300 text-sm font-semibold">Calculate your baggage cost</p>
              </div>
            </div>
          </div>

          <!-- Calculator Content -->
          <div class="p-4 lg:p-6">
            <!-- Flight Type Selector -->
            <div class="mb-5">
              <Label class="text-xs font-black text-gray-900 uppercase tracking-widest mb-4 block">
                Flight Type
              </Label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  @click="flightType = 'domestic'"
                  :class="[
                    'h-14 lg:h-16 font-black uppercase tracking-wide border-4 transition-all relative overflow-hidden group',
                    flightType === 'domestic'
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-gray-900 text-gray-900 hover:bg-gray-50'
                  ]"
                >
                  <span class="relative z-10">Domestic</span>
                  <div v-if="flightType === 'domestic'" class="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-t-white border-l-[30px] border-l-transparent"></div>
                </button>
                <button
                  @click="flightType = 'international'"
                  :class="[
                    'h-14 lg:h-16 font-black uppercase tracking-wide border-4 transition-all relative overflow-hidden',
                    flightType === 'international'
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'bg-white border-gray-900 text-gray-900 hover:bg-gray-50'
                  ]"
                >
                  <span class="relative z-10">International</span>
                  <div v-if="flightType === 'international'" class="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-t-white border-l-[30px] border-l-transparent"></div>
                </button>
              </div>
            </div>

            <!-- Weight Selector -->
            <div class="mb-5">
              <Label class="text-xs font-black text-gray-900 uppercase tracking-widest mb-3 block">
                Baggage Weight (per bag)
              </Label>
              <div class="bg-gray-50 p-4 lg:p-5 border-l-4" :class="flightType === 'domestic' ? 'border-blue-600' : 'border-purple-600'">
                <div class="flex items-center justify-between mb-3">
                  <div>
                    <div class="text-3xl lg:text-4xl font-black text-gray-900">{{ baggageWeight }}kg</div>
                    <div class="text-xs text-gray-600 font-semibold mt-0.5">Selected Weight</div>
                  </div>
                  <div class="text-right">
                    <div class="text-2xl lg:text-3xl font-black" :class="flightType === 'domestic' ? 'text-blue-600' : 'text-purple-600'">
                      ₱{{ selectedWeightTier.price.toLocaleString() }}
                    </div>
                    <div class="text-xs text-gray-600 font-semibold">per bag</div>
                  </div>
                </div>
                <input
                  v-model.number="baggageWeight"
                  type="range"
                  min="15"
                  :max="flightType === 'domestic' ? 32 : 40"
                  step="5"
                  class="w-full h-2.5 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  :class="flightType === 'domestic' ? 'accent-blue-600' : 'accent-purple-600'"
                />
              </div>
            </div>

            <!-- Number of Bags -->
            <div class="mb-5">
              <Label class="text-xs font-black text-gray-900 uppercase tracking-widest mb-3 block">
                Number of Bags
              </Label>
              <div class="flex items-center justify-center gap-4 lg:gap-6">
                <Button
                  @click="decrementBags"
                  :disabled="baggageCount <= 1"
                  class="w-12 h-12 lg:w-14 lg:h-14 bg-gray-900 hover:bg-gray-700 disabled:opacity-30"
                >
                  <Minus class="w-5 h-5" />
                </Button>
                <div class="text-center">
                  <div class="text-4xl lg:text-5xl font-black text-gray-900">{{ baggageCount }}</div>
                  <div class="text-xs text-gray-600 font-semibold uppercase tracking-wider">Bag(s)</div>
                </div>
                <Button
                  @click="incrementBags"
                  :disabled="baggageCount >= 5"
                  class="w-12 h-12 lg:w-14 lg:h-14 bg-gray-900 hover:bg-gray-700 disabled:opacity-30"
                >
                  <Plus class="w-5 h-5" />
                </Button>
              </div>
            </div>

            <!-- Total Price Display -->
            <div class="bg-gradient-to-br from-gray-900 to-blue-900 p-4 lg:p-5 mb-4 relative overflow-hidden">
              <div class="absolute inset-0 opacity-5">
                <div class="absolute top-0 left-0 right-0 h-px bg-white"></div>
                <div class="absolute bottom-0 left-0 right-0 h-px bg-white"></div>
              </div>

              <div class="relative flex items-center justify-between">
                <div>
                  <div class="text-xs text-white/70 font-black uppercase tracking-widest mb-1">Total Cost</div>
                  <div class="text-sm text-white/90 font-semibold">{{ baggageCount }} × {{ selectedWeightTier.weight }} ({{ flightType }})</div>
                </div>
                <div class="text-right">
                  <div class="text-3xl lg:text-4xl font-black text-white">₱{{ totalPrice.toLocaleString() }}</div>
                </div>
              </div>
            </div>

            <!-- Purchase Button -->
            <Button
              @click="purchaseBaggage"
              class="w-full h-14 lg:h-16 text-base lg:text-lg font-black text-white transition-all duration-300 uppercase tracking-widest relative overflow-hidden group"
              :class="flightType === 'domestic' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <div class="flex items-center justify-center gap-3 relative z-10">
                <ShoppingBag class="w-6 h-6" />
                <span>Add to Booking</span>
                <ArrowRight class="w-6 h-6" />
              </div>
            </Button>

            <!-- Info Strip -->
            <div class="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
              <Shield class="w-4 h-4 text-green-600" />
              <span class="font-bold">Save up to 50% when you add baggage now vs. at the airport</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Baggage Allowance Grid -->
    <section class="py-12 lg:py-16 bg-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, #000 35px, #000 36px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="flex items-center gap-3 mb-10">
          <div class="w-1.5 h-16 lg:h-14 lg:h-16 bg-gradient-to-b from-purple-600 to-gray-900"></div>
          <div>
            <h2 class="text-3xl lg:text-4xl font-black text-black mb-1 tracking-tight uppercase">Standard Allowance</h2>
            <p class="text-sm lg:text-base text-gray-600 font-semibold">What's included with your ticket</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
          <!-- Cabin Baggage -->
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-5 lg:p-6 border-l-6 border-blue-600 relative group hover:shadow-2xl transition-shadow">
            <!-- Corner Badge -->
            <div class="absolute -top-3 -right-3 w-10 h-10 lg:w-12 lg:h-12 lg:w-16 lg:h-16 bg-blue-600 flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform">
              <Briefcase class="w-7 h-7 lg:w-8 lg:h-8 text-white" />
            </div>

            <h3 class="text-2xl lg:text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Cabin Baggage</h3>

            <div class="space-y-4">
              <!-- Main Item -->
              <div class="bg-white p-4 border-t-3 border-blue-600">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 bg-blue-600 flex items-center justify-center">
                    <Briefcase class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 class="text-base lg:text-lg font-black text-gray-900 uppercase">Main Item</h4>
                    <p class="text-sm text-gray-600 font-semibold">Hand-carry baggage</p>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div class="flex items-start gap-3">
                    <Weight class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">Weight</div>
                      <div class="text-2xl font-black text-gray-900">7kg</div>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <Ruler class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">Size</div>
                      <div class="text-sm font-black text-gray-900">56×36×23cm</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Personal Item -->
              <div class="bg-white p-4 border-t-3 border-blue-400">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 bg-blue-400 flex items-center justify-center">
                    <ShoppingBag class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 class="text-base lg:text-lg font-black text-gray-900 uppercase">Personal Item</h4>
                    <p class="text-sm text-gray-600 font-semibold">Small bag or purse</p>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div class="flex items-start gap-3">
                    <Weight class="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">Weight</div>
                      <div class="text-2xl font-black text-gray-900">2kg</div>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <Ruler class="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">Size</div>
                      <div class="text-sm font-black text-gray-900">35×20×20cm</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Important Note -->
              <div class="bg-blue-600 p-4 flex items-start gap-3">
                <Info class="w-5 h-5 text-white flex-shrink-0 mt-1" />
                <p class="text-white font-bold text-sm">Must fit in overhead bin or under the seat in front of you</p>
              </div>
            </div>
          </div>

          <!-- Checked Baggage -->
          <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-4 lg:p-6 border-l-6 border-purple-600 relative group hover:shadow-2xl transition-shadow">
            <!-- Corner Badge -->
            <div class="absolute -top-4 -right-4 w-20 h-14 lg:h-16 bg-purple-600 flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform">
              <Luggage class="w-10 h-10 text-white" />
            </div>

            <h3 class="text-2xl lg:text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Checked Baggage</h3>

            <div class="space-y-4">
              <!-- Domestic -->
              <div class="bg-white p-4 border-t-3 border-purple-600">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 bg-purple-600 flex items-center justify-center">
                    <Plane class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 class="text-base lg:text-lg font-black text-gray-900 uppercase">Domestic Flights</h4>
                    <p class="text-sm text-gray-600 font-semibold">Philippines routes</p>
                  </div>
                </div>

                <div class="space-y-4">
                  <div class="flex justify-between items-center py-3 border-b border-gray-200">
                    <span class="text-sm font-bold text-gray-700 uppercase tracking-wide">Base Allowance</span>
                    <span class="text-lg font-black text-purple-600">NOT INCLUDED</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-200">
                    <span class="text-sm font-bold text-gray-700 uppercase tracking-wide">Maximum Weight</span>
                    <span class="text-lg font-black text-gray-900">32kg per bag</span>
                  </div>
                  <div class="flex justify-between items-center py-3">
                    <span class="text-sm font-bold text-gray-700 uppercase tracking-wide">Starting Price</span>
                    <span class="text-lg font-black text-green-600">₱500</span>
                  </div>
                </div>
              </div>

              <!-- International -->
              <div class="bg-white p-4 border-t-3 border-purple-400">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 bg-purple-400 flex items-center justify-center">
                    <Plane class="w-6 h-6 text-white transform rotate-45" />
                  </div>
                  <div>
                    <h4 class="text-base lg:text-lg font-black text-gray-900 uppercase">International</h4>
                    <p class="text-sm text-gray-600 font-semibold">Outside Philippines</p>
                  </div>
                </div>

                <div class="space-y-4">
                  <div class="flex justify-between items-center py-3 border-b border-gray-200">
                    <span class="text-sm font-bold text-gray-700 uppercase tracking-wide">Base Allowance</span>
                    <span class="text-lg font-black text-purple-600">NOT INCLUDED</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-200">
                    <span class="text-sm font-bold text-gray-700 uppercase tracking-wide">Maximum Weight</span>
                    <span class="text-lg font-black text-gray-900">40kg per bag</span>
                  </div>
                  <div class="flex justify-between items-center py-3">
                    <span class="text-sm font-bold text-gray-700 uppercase tracking-wide">Starting Price</span>
                    <span class="text-lg font-black text-green-600">₱1,500</span>
                  </div>
                </div>
              </div>

              <!-- Important Note -->
              <div class="bg-purple-600 p-4 flex items-start gap-3">
                <AlertCircle class="w-5 h-5 text-white flex-shrink-0 mt-1" />
                <p class="text-white font-bold text-sm">Pre-purchase online for the best rates! Airport rates are 50% higher.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Special Items Section -->
    <section class="py-12 lg:py-16 bg-gray-50 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header with Geometric Accent -->
        <div class="mb-10 text-center">
          <div class="inline-flex items-center gap-2 mb-3">
            <div class="w-3 h-3 bg-gray-900"></div>
            <div class="w-3 h-3 bg-green-600"></div>
            <div class="w-3 h-3 bg-gray-900"></div>
          </div>
          <h2 class="text-3xl lg:text-4xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Special Items</h2>
          <p class="text-base lg:text-sm lg:text-base text-gray-600 font-semibold">Items with special handling requirements</p>
        </div>

        <!-- Special Items Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          <!-- Sports Equipment -->
          <div class="bg-white p-4 lg:p-5 shadow-xl relative group cursor-pointer transform hover:-translate-y-2 transition-all overflow-hidden">
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-blue-600 border-l-[40px] border-l-transparent transition-all group-hover:border-t-[60px] group-hover:border-l-[60px]"></div>

            <div class="relative z-10">
              <div class="w-12 h-12 lg:w-14 lg:h-14 bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <Package class="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>

              <h3 class="text-base lg:text-lg font-black text-gray-900 mb-2 uppercase">Sports Equipment</h3>
              <p class="text-sm text-gray-600 font-semibold mb-4">Golf clubs, surfboards, diving gear</p>

              <div class="pt-4 border-t-2 border-gray-200 group-hover:border-blue-600 transition-colors">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-gray-500 uppercase tracking-widest">From</span>
                  <span class="text-base lg:text-lg font-black text-green-600">₱1,000</span>
                </div>
              </div>
            </div>

            <!-- Shadow Block -->
            <div class="absolute top-2 left-2 w-full h-full bg-blue-600 -z-10 group-hover:top-3 group-hover:left-3 transition-all"></div>
          </div>

          <!-- Musical Instruments -->
          <div class="bg-white p-4 lg:p-5 shadow-xl relative group cursor-pointer transform hover:-translate-y-2 transition-all overflow-hidden">
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-purple-600 border-l-[40px] border-l-transparent transition-all group-hover:border-t-[60px] group-hover:border-l-[60px]"></div>

            <div class="relative z-10">
              <div class="w-12 h-12 lg:w-14 lg:h-14 bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                <Music class="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
              </div>

              <h3 class="text-base lg:text-lg font-black text-gray-900 mb-2 uppercase">Musical Instruments</h3>
              <p class="text-sm text-gray-600 font-semibold mb-4">Guitars, violins, small instruments</p>

              <div class="pt-4 border-t-2 border-gray-200 group-hover:border-purple-600 transition-colors">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-gray-500 uppercase tracking-widest">From</span>
                  <span class="text-base lg:text-lg font-black text-green-600">₱800</span>
                </div>
              </div>
            </div>

            <div class="absolute top-2 left-2 w-full h-full bg-purple-600 -z-10 group-hover:top-3 group-hover:left-3 transition-all"></div>
          </div>

          <!-- Baby Equipment -->
          <div class="bg-white p-4 lg:p-5 shadow-xl relative group cursor-pointer transform hover:-translate-y-2 transition-all overflow-hidden">
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-pink-600 border-l-[40px] border-l-transparent transition-all group-hover:border-t-[60px] group-hover:border-l-[60px]"></div>

            <div class="relative z-10">
              <div class="w-12 h-12 lg:w-14 lg:h-14 bg-pink-100 flex items-center justify-center mb-4 group-hover:bg-pink-600 transition-colors">
                <Baby class="w-8 h-8 text-pink-600 group-hover:text-white transition-colors" />
              </div>

              <h3 class="text-base lg:text-lg font-black text-gray-900 mb-2 uppercase">Baby Equipment</h3>
              <p class="text-sm text-gray-600 font-semibold mb-4">Strollers, car seats, cribs</p>

              <div class="pt-4 border-t-2 border-gray-200 group-hover:border-pink-600 transition-colors">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-gray-500 uppercase tracking-widest">Status</span>
                  <span class="text-sm font-black text-blue-600 uppercase">Free</span>
                </div>
              </div>
            </div>

            <div class="absolute top-2 left-2 w-full h-full bg-pink-600 -z-10 group-hover:top-3 group-hover:left-3 transition-all"></div>
          </div>

          <!-- Camera Equipment -->
          <div class="bg-white p-4 lg:p-5 shadow-xl relative group cursor-pointer transform hover:-translate-y-2 transition-all overflow-hidden">
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-orange-600 border-l-[40px] border-l-transparent transition-all group-hover:border-t-[60px] group-hover:border-l-[60px]"></div>

            <div class="relative z-10">
              <div class="w-12 h-12 lg:w-14 lg:h-14 bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-600 transition-colors">
                <Camera class="w-8 h-8 text-orange-600 group-hover:text-white transition-colors" />
              </div>

              <h3 class="text-base lg:text-lg font-black text-gray-900 mb-2 uppercase">Photography Gear</h3>
              <p class="text-sm text-gray-600 font-semibold mb-4">Cameras, lenses, tripods</p>

              <div class="pt-4 border-t-2 border-gray-200 group-hover:border-orange-600 transition-colors">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-gray-500 uppercase tracking-widest">Note</span>
                  <span class="text-xs font-black text-gray-700 uppercase">Cabin Only</span>
                </div>
              </div>
            </div>

            <div class="absolute top-2 left-2 w-full h-full bg-orange-600 -z-10 group-hover:top-3 group-hover:left-3 transition-all"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Prohibited Items Section - Diagonal Split Design -->
    <section class="py-10 lg:py-12 bg-white relative overflow-hidden">
      <!-- Diagonal Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800" style="clip-path: polygon(0 0, 100% 0, 100% 60%, 0 75%);"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Header on Red Background -->
        <div class="mb-10 lg:mb-12 pt-6">
          <div class="flex items-start gap-3 lg:gap-4 mb-4">
            <div class="relative">
              <div class="w-20 h-20 lg:w-24 lg:h-24 bg-white flex items-center justify-center relative z-10">
                <XCircle class="w-10 h-10 lg:w-12 lg:h-12 text-red-600" />
              </div>
              <div class="absolute top-2 left-2 w-20 h-20 lg:w-24 lg:h-24 bg-black"></div>
            </div>
            <div class="flex-1">
              <div class="inline-block bg-black px-4 py-1.5 mb-3">
                <span class="text-white font-black text-xs uppercase tracking-widest">Safety First</span>
              </div>
              <h2 class="text-4xl lg:text-5xl font-black text-white mb-2 tracking-tighter uppercase leading-none">
                DON'T<br/>PACK<br/>THESE
              </h2>
            </div>
          </div>
          <div class="bg-white/10 backdrop-blur-md border-3 lg:border-4 border-white p-4 lg:p-5 max-w-2xl">
            <p class="text-white font-black text-sm lg:text-base uppercase tracking-wide">Serious consequences await those who ignore these rules</p>
          </div>
        </div>

        <!-- Items Grid - Mixed Layout -->
        <div class="grid grid-cols-12 gap-3 lg:gap-4">
          <!-- Large Featured Item 1 -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 bg-gray-900 p-4 lg:p-5 relative group cursor-pointer transform hover:scale-105 transition-transform">
            <!-- Danger Stripe -->
            <div class="absolute top-0 left-0 w-full h-8 bg-yellow-400 flex items-center justify-center">
              <div class="flex gap-2">
                <div class="w-4 h-0.5 bg-gray-900"></div>
                <div class="w-4 h-0.5 bg-gray-900"></div>
                <div class="w-4 h-0.5 bg-gray-900"></div>
              </div>
            </div>

            <div class="mt-6 lg:mt-8">
              <div class="text-5xl lg:text-6xl font-black text-red-600 mb-3 leading-none">01</div>
              <div class="h-1 w-16 bg-red-600 mb-3"></div>
              <h3 class="text-xl lg:text-2xl font-black text-white mb-2 uppercase tracking-tight">Explosives</h3>
              <p class="text-gray-400 font-bold uppercase text-xs tracking-wider">Fireworks • Flares • Ammunition</p>
            </div>

            <!-- Warning Icon -->
            <div class="absolute bottom-3 right-3 w-10 h-10 lg:w-12 lg:h-12 border-3 lg:border-4 border-red-600 flex items-center justify-center">
              <AlertCircle class="w-6 h-6 lg:w-7 lg:h-7 text-red-600" />
            </div>
          </div>

          <!-- Large Featured Item 2 -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 bg-gray-900 p-4 lg:p-5 relative group cursor-pointer transform hover:scale-105 transition-transform">
            <div class="absolute top-0 left-0 w-full h-6 lg:h-8 bg-yellow-400 flex items-center justify-center">
              <div class="flex gap-2">
                <div class="w-3 h-0.5 bg-gray-900"></div>
                <div class="w-3 h-0.5 bg-gray-900"></div>
                <div class="w-3 h-0.5 bg-gray-900"></div>
              </div>
            </div>

            <div class="mt-6 lg:mt-8">
              <div class="text-5xl lg:text-6xl font-black text-red-600 mb-3 leading-none">02</div>
              <div class="h-1 w-16 bg-red-600 mb-3"></div>
              <h3 class="text-xl lg:text-2xl font-black text-white mb-2 uppercase tracking-tight">Weapons</h3>
              <p class="text-gray-400 font-bold uppercase text-xs tracking-wider">Guns • Knives • Martial Arts Items</p>
            </div>

            <div class="absolute bottom-3 right-3 w-10 h-10 lg:w-12 lg:h-12 border-3 lg:border-4 border-red-600 flex items-center justify-center">
              <AlertCircle class="w-6 h-6 lg:w-7 lg:h-7 text-red-600" />
            </div>
          </div>

          <!-- Large Featured Item 3 -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 bg-gray-900 p-4 lg:p-5 relative group cursor-pointer transform hover:scale-105 transition-transform">
            <div class="absolute top-0 left-0 w-full h-6 lg:h-8 bg-yellow-400 flex items-center justify-center">
              <div class="flex gap-2">
                <div class="w-3 h-0.5 bg-gray-900"></div>
                <div class="w-3 h-0.5 bg-gray-900"></div>
                <div class="w-3 h-0.5 bg-gray-900"></div>
              </div>
            </div>

            <div class="mt-6 lg:mt-8">
              <div class="text-5xl lg:text-6xl font-black text-red-600 mb-3 leading-none">03</div>
              <div class="h-1 w-16 bg-red-600 mb-3"></div>
              <h3 class="text-xl lg:text-2xl font-black text-white mb-2 uppercase tracking-tight">Flammables</h3>
              <p class="text-gray-400 font-bold uppercase text-xs tracking-wider">Gas • Paint • Lighter Fluid</p>
            </div>

            <div class="absolute bottom-3 right-3 w-10 h-10 lg:w-12 lg:h-12 border-3 lg:border-4 border-red-600 flex items-center justify-center">
              <AlertCircle class="w-6 h-6 lg:w-7 lg:h-7 text-red-600" />
            </div>
          </div>

          <!-- Compact Items Row 1 -->
          <div class="col-span-6 md:col-span-3 bg-white border-4 lg:border-6 border-gray-900 p-4 lg:p-5">
            <div class="text-2xl lg:text-3xl font-black text-gray-900 mb-1.5">04</div>
            <h4 class="text-base lg:text-lg font-black text-gray-900 uppercase mb-1">Compressed Gases</h4>
            <p class="text-xs text-gray-600 font-bold uppercase">CO2 • Diving Tanks</p>
          </div>

          <div class="col-span-6 md:col-span-3 bg-white border-4 lg:border-6 border-gray-900 p-4 lg:p-5">
            <div class="text-2xl lg:text-3xl font-black text-gray-900 mb-1.5">05</div>
            <h4 class="text-base lg:text-lg font-black text-gray-900 uppercase mb-1">Toxins</h4>
            <p class="text-xs text-gray-600 font-bold uppercase">Poison • Chemicals</p>
          </div>

          <div class="col-span-6 md:col-span-3 bg-white border-4 lg:border-6 border-gray-900 p-4 lg:p-5">
            <div class="text-2xl lg:text-3xl font-black text-gray-900 mb-1.5">06</div>
            <h4 class="text-base lg:text-lg font-black text-gray-900 uppercase mb-1">Sharp Objects</h4>
            <p class="text-xs text-gray-600 font-bold uppercase">Scissors • Box Cutters</p>
          </div>

          <div class="col-span-6 md:col-span-3 bg-white border-4 lg:border-6 border-gray-900 p-4 lg:p-5">
            <div class="text-2xl lg:text-3xl font-black text-gray-900 mb-1.5">07</div>
            <h4 class="text-base lg:text-lg font-black text-gray-900 uppercase mb-1">Power Banks</h4>
            <p class="text-xs text-gray-600 font-bold uppercase">> 160Wh Capacity</p>
          </div>
        </div>

        <!-- Warning Banner -->
        <div class="mt-8 lg:mt-10 relative">
          <div class="bg-yellow-400 p-4 lg:p-5 relative overflow-hidden">
            <!-- Diagonal Stripes Pattern -->
            <div class="absolute inset-0 opacity-10" style="background: repeating-linear-gradient(45deg, #000, #000 10px, transparent 10px, transparent 20px);"></div>

            <div class="relative flex items-start gap-3 lg:gap-4">
              <div class="flex-shrink-0">
                <div class="w-16 h-12 lg:w-20 lg:h-14 bg-gray-900 flex items-center justify-center border-3 lg:border-4 border-red-600">
                  <AlertCircle class="w-8 h-8 lg:w-10 lg:h-10 text-red-600" />
                </div>
              </div>
              <div class="flex-1">
                <h3 class="text-xl lg:text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">Caught? Here's What Happens:</h3>
                <div class="grid md:grid-cols-3 gap-2 lg:gap-3">
                  <div class="bg-gray-900 p-3">
                    <div class="text-red-600 font-black text-base mb-0.5">CONFISCATION</div>
                    <p class="text-white text-xs font-semibold">Item seized immediately</p>
                  </div>
                  <div class="bg-gray-900 p-3">
                    <div class="text-red-600 font-black text-base mb-0.5">FINES</div>
                    <p class="text-white text-xs font-semibold">Up to ₱100,000 penalty</p>
                  </div>
                  <div class="bg-gray-900 p-3">
                    <div class="text-red-600 font-black text-base mb-0.5">LEGAL ACTION</div>
                    <p class="text-white text-xs font-semibold">Criminal prosecution possible</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Side Accent -->
          <div class="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-24 lg:w-8 lg:h-32 bg-red-600"></div>
        </div>
      </div>
    </section>

    <!-- Tips Section - Brutalist Cards -->
    <section class="py-12 lg:py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white overflow-hidden">
      <!-- Decorative Background -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #fff 20px, #fff 21px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-12">
          <div class="inline-flex items-center rounded-full px-4 py-2 mb-4" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
            <Heart class="w-4 h-4 mr-2 text-white" />
            <span class="font-semibold text-sm text-white">Packing Tips</span>
          </div>
          <h2 class="text-3xl lg:text-4xl font-black text-white mb-4 uppercase tracking-tighter">Travel Smart</h2>
          <p class="text-xl text-white/80 font-semibold">Expert tips for hassle-free packing</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 lg:p-6">
          <!-- Tip 1 -->
          <div class="bg-white/10 backdrop-blur-md border-2 border-white/20 p-4 lg:p-6 relative">
            <div class="absolute -top-5 -left-5 w-10 h-10 lg:w-12 lg:h-12 bg-blue-600 border-4 border-white flex items-center justify-center">
              <span class="text-lg lg:text-base lg:text-lg font-black text-white">1</span>
            </div>

            <div class="mt-4">
              <h3 class="text-lg lg:text-base lg:text-lg font-black text-white mb-4 uppercase tracking-tight">Weigh Before You Go</h3>
              <p class="text-white/90 font-semibold leading-relaxed">Use a luggage scale at home to avoid excess baggage fees at the airport. Every kilogram over the limit counts!</p>
            </div>

            <div class="mt-6 pt-6 border-t border-white/20">
              <div class="flex items-center gap-2 text-blue-300">
                <CheckCircle class="w-5 h-5" />
                <span class="font-bold text-sm uppercase tracking-wider">Pro Tip</span>
              </div>
            </div>
          </div>

          <!-- Tip 2 -->
          <div class="bg-white/10 backdrop-blur-md border-2 border-white/20 p-4 lg:p-6 relative">
            <div class="absolute -top-5 -left-5 w-10 h-10 lg:w-12 lg:h-12 bg-purple-600 border-4 border-white flex items-center justify-center">
              <span class="text-lg lg:text-base lg:text-lg font-black text-white">2</span>
            </div>

            <div class="mt-4">
              <h3 class="text-lg lg:text-base lg:text-lg font-black text-white mb-4 uppercase tracking-tight">Label Everything</h3>
              <p class="text-white/90 font-semibold leading-relaxed">Put your name, phone number, and email on luggage tags (inside and out) to help recover lost bags quickly.</p>
            </div>

            <div class="mt-6 pt-6 border-t border-white/20">
              <div class="flex items-center gap-2 text-purple-300">
                <CheckCircle class="w-5 h-5" />
                <span class="font-bold text-sm uppercase tracking-wider">Essential</span>
              </div>
            </div>
          </div>

          <!-- Tip 3 -->
          <div class="bg-white/10 backdrop-blur-md border-2 border-white/20 p-4 lg:p-6 relative">
            <div class="absolute -top-5 -left-5 w-10 h-10 lg:w-12 lg:h-12 bg-green-600 border-4 border-white flex items-center justify-center">
              <span class="text-lg lg:text-base lg:text-lg font-black text-white">3</span>
            </div>

            <div class="mt-4">
              <h3 class="text-lg lg:text-base lg:text-lg font-black text-white mb-4 uppercase tracking-tight">Pack Smart</h3>
              <p class="text-white/90 font-semibold leading-relaxed">Roll clothes to save space, use packing cubes for organization, and keep valuables in carry-on luggage always.</p>
            </div>

            <div class="mt-6 pt-6 border-t border-white/20">
              <div class="flex items-center gap-2 text-green-300">
                <CheckCircle class="w-5 h-5" />
                <span class="font-bold text-sm uppercase tracking-wider">Recommended</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section - Magazine Layout -->
    <section class="py-10 lg:py-12 bg-gray-50 relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-blue-600 to-purple-600 opacity-5"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Header - Magazine Style -->
        <div class="mb-8 lg:mb-10">
          <div class="flex items-end gap-2 lg:gap-4 mb-4">
            <div>
              <div class="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">Knowledge Base</div>
              <h2 class="text-4xl lg:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                FAQ
              </h2>
            </div>
            <div class="flex gap-2 mb-4">
              <div class="w-6 h-6 bg-blue-600"></div>
              <div class="w-6 h-6 bg-purple-600"></div>
              <div class="w-6 h-6 bg-gray-900"></div>
            </div>
          </div>
          <div class="h-1.5 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-transparent"></div>
        </div>

        <!-- FAQ Grid - Asymmetric Layout -->
        <div class="grid grid-cols-12 gap-4">
          <!-- FAQ 1 - Spans 7 columns -->
          <div class="col-span-12 lg:col-span-7 bg-gray-900 relative group">
            <!-- Number Badge -->
            <div class="absolute -top-3 -left-3 lg:-top-4 lg:-left-4 w-16 h-16 lg:w-18 lg:h-18 bg-blue-600 border-4 lg:border-6 border-gray-50 flex items-center justify-center z-10">
              <span class="text-2xl lg:text-3xl font-black text-white">1</span>
            </div>

            <div class="p-4 lg:p-5 pt-14 lg:pt-16">
              <div class="mb-3">
                <div class="inline-block bg-blue-600 px-3 py-1 mb-2">
                  <span class="text-white font-black text-xs uppercase tracking-widest">Pricing</span>
                </div>
                <h3 class="text-lg lg:text-xl font-black text-white uppercase tracking-tight leading-tight">
                  Can I buy baggage at the airport instead?
                </h3>
              </div>

              <div class="bg-white/10 backdrop-blur-sm p-3 lg:p-4 border-l-3 border-blue-600">
                <p class="text-white font-bold text-sm leading-relaxed">
                  Sure, but you'll pay <span class="text-blue-400 font-black">50% MORE</span> than online rates.
                  Airport baggage counters charge premium prices. Book online now to lock in the lowest rates.
                </p>
              </div>

              <!-- Highlight Box -->
              <div class="mt-3 flex items-center gap-2 bg-blue-600 p-3">
                <div class="text-3xl font-black text-white">50%</div>
                <div>
                  <div class="text-white font-black uppercase text-xs">Savings Online</div>
                  <div class="text-blue-200 text-xs font-semibold">vs. Airport Rates</div>
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ 2 - Spans 5 columns -->
          <div class="col-span-12 lg:col-span-5 bg-white border-4 lg:border-6 border-purple-600 relative group">
            <div class="absolute -top-3 -right-3 lg:-top-4 lg:-right-4 w-16 h-16 lg:w-18 lg:h-18 bg-purple-600 border-4 lg:border-6 border-gray-50 flex items-center justify-center z-10">
              <span class="text-2xl lg:text-3xl font-black text-white">2</span>
            </div>

            <div class="p-4 lg:p-5 pt-14 lg:pt-16">
              <div class="mb-3">
                <div class="inline-block bg-purple-600 px-3 py-1 mb-2">
                  <span class="text-white font-black text-xs uppercase tracking-widest">Weight</span>
                </div>
                <h3 class="text-lg lg:text-xl font-black text-gray-900 uppercase tracking-tight leading-tight">
                  Bag over the limit?
                </h3>
              </div>

              <p class="text-gray-700 font-bold text-sm leading-relaxed mb-3">
                Pay per kilogram overage. Rates depend on your route. Pro tip: Weigh bags at home or redistribute items between bags.
              </p>

              <div class="bg-purple-100 p-3 border-l-3 border-purple-600">
                <div class="flex items-center gap-2 text-purple-900">
                  <Weight class="w-4 h-4" />
                  <span class="font-black text-xs uppercase">Smart Packing = Savings</span>
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ 3 - Spans 5 columns -->
          <div class="col-span-12 lg:col-span-5 bg-white border-4 lg:border-6 border-green-600 relative group">
            <div class="absolute -top-3 -left-3 lg:-top-4 lg:-left-4 w-16 h-16 lg:w-18 lg:h-18 bg-green-600 border-4 lg:border-6 border-gray-50 flex items-center justify-center z-10">
              <span class="text-2xl lg:text-3xl font-black text-white">3</span>
            </div>

            <div class="p-4 lg:p-5 pt-14 lg:pt-16">
              <div class="mb-3">
                <div class="inline-block bg-green-600 px-3 py-1 mb-2">
                  <span class="text-white font-black text-xs uppercase tracking-widest">Liquids</span>
                </div>
                <h3 class="text-lg lg:text-xl font-black text-gray-900 uppercase tracking-tight leading-tight">
                  Can I carry liquids?
                </h3>
              </div>

              <p class="text-gray-700 font-bold text-sm leading-relaxed mb-3">
                Yes! Max 100ml per container, all in one clear 1L bag. One bag per person. Bigger bottles? Check them in.
              </p>

              <!-- Visual Guide -->
              <div class="grid grid-cols-2 gap-2">
                <div class="bg-green-100 p-2 border-2 border-green-600">
                  <div class="text-green-600 font-black text-xs uppercase mb-0.5">Allowed</div>
                  <div class="text-xl font-black text-gray-900">100ml</div>
                </div>
                <div class="bg-green-100 p-2 border-2 border-green-600">
                  <div class="text-green-600 font-black text-xs uppercase mb-0.5">Bag Size</div>
                  <div class="text-xl font-black text-gray-900">1 Liter</div>
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ 4 - Spans 7 columns -->
          <div class="col-span-12 lg:col-span-7 bg-gradient-to-br from-orange-500 to-red-600 relative group">
            <div class="absolute -top-3 -right-3 lg:-top-4 lg:-right-4 w-16 h-16 lg:w-18 lg:h-18 bg-gray-900 border-4 lg:border-6 border-gray-50 flex items-center justify-center z-10">
              <span class="text-2xl lg:text-3xl font-black text-white">4</span>
            </div>

            <div class="p-4 lg:p-5 pt-14 lg:pt-16">
              <div class="mb-3">
                <div class="inline-block bg-gray-900 px-3 py-1 mb-2">
                  <span class="text-white font-black text-xs uppercase tracking-widest">Sharing</span>
                </div>
                <h3 class="text-lg lg:text-xl font-black text-white uppercase tracking-tight leading-tight">
                  Share allowance with friends?
                </h3>
              </div>

              <div class="bg-white/10 backdrop-blur-sm p-3 lg:p-4 border-l-3 border-white">
                <p class="text-white font-bold text-sm leading-relaxed mb-3">
                  <span class="font-black text-xl">NOPE.</span> Baggage is personal and non-transferable.
                  Each traveler sticks to their own limit. But good news—you can always buy more for yourself anytime!
                </p>

                <div class="flex items-center gap-2 pt-3 border-t border-white/30">
                  <XCircle class="w-6 h-6 text-white" />
                  <span class="text-white font-black uppercase text-xs">No Pooling • No Sharing • No Exceptions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Help Card -->
        <div class="mt-8 bg-gray-900 p-5 lg:p-6 relative overflow-hidden">
          <!-- Corner Accent -->
          <div class="absolute bottom-0 right-0 w-32 h-32 lg:w-48 lg:h-48 border-4 lg:border-6 border-white/10"></div>

          <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex-1">
              <div class="text-blue-400 font-black text-xs uppercase tracking-widest mb-2">Still Confused?</div>
              <h3 class="text-2xl lg:text-3xl font-black text-white mb-2 uppercase tracking-tight">We're Here to Help</h3>
              <p class="text-gray-400 font-bold text-sm lg:text-base">
                Can't find what you're looking for? Our support team is standing by 24/7 to answer any baggage questions.
              </p>
            </div>
            <div class="flex gap-3">
              <Button class="h-10 lg:h-12 px-4 lg:px-6 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs lg:text-sm uppercase tracking-wider">
                Live Chat
              </Button>
              <Button class="h-10 lg:h-12 px-4 lg:px-6 bg-transparent border-3 lg:border-4 border-white text-white hover:bg-white hover:text-gray-900 font-black text-xs lg:text-sm uppercase tracking-wider transition-all">
                Call Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white py-12 lg:py-16 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div class="relative container mx-auto px-4 z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
            <Luggage class="w-10 h-10 lg:w-12 lg:h-12 text-white" />
          </div>

          <h2 class="text-3xl lg:text-4xl font-black text-white mb-4 uppercase tracking-tight">Ready to Travel?</h2>
          <p class="text-base lg:text-lg text-white/90 mb-8 font-semibold max-w-2xl mx-auto">
            Add baggage to your booking now and save up to 50% compared to airport rates. Don't wait until it's too late!
          </p>

          <div class="flex flex-col sm:flex-row gap-4 lg:gap-5 justify-center">
            <Button class="h-12 lg:h-14 px-6 lg:px-8 bg-white text-gray-900 hover:bg-gray-100 font-black text-lg uppercase tracking-wider shadow-2xl">
              <ShoppingBag class="w-6 h-6 mr-3" />
              Add Baggage Now
            </Button>
            <Button class="h-12 lg:h-14 px-6 lg:px-8 bg-transparent border-4 border-white text-white hover:bg-white/10 font-black text-lg uppercase tracking-wider transition-all">
              <Info class="w-6 h-6 mr-3" />
              Contact Support
            </Button>
          </div>

          <div class="mt-12 flex items-center justify-center gap-4 lg:gap-5 text-sm">
            <div class="flex items-center gap-2">
              <CheckCircle class="w-5 h-5 text-green-400" />
              <span class="font-bold text-white/90">Best Prices Online</span>
            </div>
            <div class="w-px h-6 bg-white/30"></div>
            <div class="flex items-center gap-2">
              <CheckCircle class="w-5 h-5 text-green-400" />
              <span class="font-bold text-white/90">24/7 Support</span>
            </div>
            <div class="w-px h-6 bg-white/30"></div>
            <div class="flex items-center gap-2">
              <CheckCircle class="w-5 h-5 text-green-400" />
              <span class="font-bold text-white/90">Instant Confirmation</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

