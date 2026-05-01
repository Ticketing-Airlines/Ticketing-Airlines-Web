<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type Component } from 'vue'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Plane,
  Clock,
  Check,
  AlertCircle,
  Calendar,
  CreditCard,
  Users,
  MapPin,
  Tag,
  TrendingDown,
  Loader2
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { seatSaleService } from '@/services/seatSaleService'
import type { SeatSale, SeatSaleConfig } from '@/types/seatSale'
import { getApiErrorMessage } from '@/types/api'
import { useToast } from '@/composables/useToast'

const { showToast } = useToast()

// State
const seatSaleDeals = ref<SeatSale[]>([])
const seatSaleConfig = ref<SeatSaleConfig | null>(null)
const selectedDestination = ref('all')
const priceRange = ref('all')
const email = ref('')
const timeRemaining = ref('')
const loading = ref(true)
const error = ref<string | null>(null)

// Icon mapping for terms and conditions
const getIconComponent = (iconName: string) => {
  const icons: Record<string, Component> = {
    'AlertCircle': AlertCircle,
    'Calendar': Calendar,
    'CreditCard': CreditCard,
    'Users': Users,
    'Clock': Clock,
    'Check': Check,
    'Plane': Plane,
    'MapPin': MapPin,
    'Tag': Tag
  }
  return icons[iconName] || AlertCircle
}

// Color mapping for terms and conditions
const getColorClasses = (color: string) => {
  const colorMap: Record<string, { bg: string, bgLight: string, text: string, hover: string }> = {
    'orange': { bg: 'bg-orange-600', bgLight: 'bg-orange-100', text: 'text-orange-600', hover: 'hover:bg-orange-600' },
    'blue': { bg: 'bg-blue-600', bgLight: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:bg-blue-600' },
    'green': { bg: 'bg-green-600', bgLight: 'bg-green-100', text: 'text-green-600', hover: 'hover:bg-green-600' },
    'purple': { bg: 'bg-purple-600', bgLight: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-600' },
    'red': { bg: 'bg-red-600', bgLight: 'bg-red-100', text: 'text-red-600', hover: 'hover:bg-red-600' },
    'yellow': { bg: 'bg-yellow-600', bgLight: 'bg-yellow-100', text: 'text-yellow-600', hover: 'hover:bg-yellow-600' }
  }
  return colorMap[color] || colorMap['orange']
}

// Helper function to format date range
const formatDateRange = (start: string, end: string): string => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
  return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`
}

// Helper function to format single date
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

// Computed property for filtered deals
const filteredDeals = computed(() => {
  let filtered = seatSaleDeals.value

  // Filter by destination type
  if (selectedDestination.value !== 'all') {
    filtered = filtered.filter(deal => deal.type === selectedDestination.value)
  }

  // Filter by price range
  if (priceRange.value !== 'all') {
    filtered = filtered.filter(deal => {
      const price = deal.pricing.salePrice
      switch (priceRange.value) {
        case 'under5k': return price < 5000
        case '5k-10k': return price >= 5000 && price <= 10000
        case '10k-20k': return price >= 10000 && price <= 20000
        case 'over20k': return price > 20000
        default: return true
      }
    })
  }

  // Sort featured deals first
  return filtered.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })
})

// Load seat sale data
const loadSeatSales = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Load deals and config in parallel
    const [dealsResult, config] = await Promise.all([
      seatSaleService.getActiveDeals(),
      seatSaleService.getConfig()
    ])
    
    seatSaleDeals.value = dealsResult.deals
    seatSaleConfig.value = config
  } catch (err: unknown) {
    console.error('Failed to load seat sales:', err)
    error.value = getApiErrorMessage(err)
    showToast('Failed to load seat sale deals', 'error')
  } finally {
    loading.value = false
  }
}

// Timer for countdown
let timer: ReturnType<typeof setInterval>

const updateCountdown = () => {
  if (!seatSaleConfig.value) return
  
  const saleEndDate = new Date(seatSaleConfig.value.saleEndDate)
  const now = new Date()
  const diff = saleEndDate.getTime() - now.getTime()

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    timeRemaining.value = `${days}d ${hours}h ${minutes}m ${seconds}s`
  } else {
    timeRemaining.value = 'Sale Ended'
  }
}

const bookDeal = (deal: SeatSale) => {
  console.log('Booking deal:', deal)
  showToast(`Booking ${deal.destination} for ₱${deal.pricing.salePrice.toLocaleString()}!`, 'info')
  // TODO: Redirect to booking page with deal information
}

const subscribe = () => {
  if (email.value) {
    console.log('Subscribing email:', email.value)
    showToast('Thank you for subscribing! You will receive exclusive seat sale alerts.', 'success')
    email.value = ''
  }
}

onMounted(async () => {
  await loadSeatSales()
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-16 lg:py-20 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl"></div>

      <div class="relative max-w-7xl mx-auto px-4 text-center z-10 pt-16">
        <div class="inline-flex items-center px-3 py-1.5 mb-3 bg-gradient-to-r from-red-500 to-orange-500 animate-pulse border-2 border-white/30">
          <Tag class="w-3.5 h-3.5 mr-1.5 text-white" />
          <span class="font-black text-xs text-white uppercase tracking-widest">Limited Time Offer</span>
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 leading-tight uppercase tracking-tight">
          {{ seatSaleConfig?.saleTitle || 'SEAT SALE' }}
        </h1>
        <p class="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto font-bold mb-4">
          {{ seatSaleConfig?.saleSubtitle || 'Unbeatable deals to your dream destinations' }}
        </p>
        <div v-if="seatSaleConfig" class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 border-2 border-white/30">
          <Clock class="h-4 w-4 text-white" />
          <span class="text-sm font-black uppercase tracking-wider">Sale ends in: {{ timeRemaining }}</span>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <div class="max-w-7xl mx-auto px-4 -mt-8 relative z-20 mb-8">
      <Card class="shadow-2xl bg-white border-4 border-gray-900">
        <CardContent class="p-3">
          <div class="flex flex-wrap gap-2 items-center justify-between">
            <div class="flex flex-wrap gap-2 items-center">
              <Label class="font-black text-gray-900 uppercase tracking-widest text-xs">Filter:</Label>
              <Select v-model="selectedDestination">
                <SelectTrigger class="w-40 h-10 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 font-bold text-xs">
                  <SelectValue placeholder="All Destinations" />
                </SelectTrigger>
                <SelectContent class="border-4 border-gray-900 rounded-none">
                  <SelectItem value="all">All Destinations</SelectItem>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>

              <Select v-model="priceRange">
                <SelectTrigger class="w-40 h-10 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 font-bold text-xs">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent class="border-4 border-gray-900 rounded-none">
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under5k">Under ₱5,000</SelectItem>
                  <SelectItem value="5k-10k">₱5,000 - ₱10,000</SelectItem>
                  <SelectItem value="10k-20k">₱10,000 - ₱20,000</SelectItem>
                  <SelectItem value="over20k">Over ₱20,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="flex items-center gap-1.5 bg-gray-900 text-white px-3 py-1.5 border-2 border-gray-900">
              <TrendingDown class="h-3.5 w-3.5" />
              <span class="text-xs font-black uppercase tracking-wider">{{ filteredDeals.length }} deals</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Featured Deals -->
    <section class="py-8 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-6">
          <div class="flex items-center justify-center gap-2 mb-2">
            <div class="w-1.5 h-1.5 bg-red-600"></div>
            <div class="w-1.5 h-1.5 bg-orange-600"></div>
            <div class="w-1.5 h-1.5 bg-yellow-600"></div>
          </div>
          <h2 class="text-2xl md:text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Featured Deals</h2>
          <div class="flex items-center justify-center gap-2">
            <div class="h-0.5 w-12 bg-gray-900"></div>
            <p class="text-xs text-gray-600 font-bold uppercase tracking-wider">Limited Seats Available</p>
            <div class="h-0.5 w-12 bg-gray-900"></div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-20">
          <Loader2 class="h-12 w-12 animate-spin text-blue-600" />
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20">
          <AlertCircle class="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h3 class="text-xl font-bold text-gray-900 mb-2">Failed to Load Deals</h3>
          <p class="text-gray-600 mb-4">{{ error }}</p>
          <Button @click="loadSeatSales" class="bg-blue-600 hover:bg-blue-700 text-white">
            Try Again
          </Button>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredDeals.length === 0" class="text-center py-20">
          <Tag class="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-xl font-bold text-gray-900 mb-2">No Deals Available</h3>
          <p class="text-gray-600">Check back later for amazing seat sale deals!</p>
        </div>

        <!-- Deals Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            v-for="deal in filteredDeals"
            :key="deal.id"
            class="group overflow-hidden bg-white border-4 border-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-0 gap-0 relative"
            :class="deal.featured ? 'ring-4 ring-orange-500 ring-offset-2' : ''"
          >
            <!-- Header with Badges -->
            <div class="relative bg-gray-900 p-3 border-b-4 border-gray-900">
              <!-- Featured Badge -->
              <div v-if="deal.featured" class="absolute top-2 left-2 z-10">
                <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 border-2 border-black">
                  <span class="text-xs font-black uppercase tracking-wider">⭐ Featured</span>
                </div>
              </div>

              <!-- Discount Badge -->
              <div class="absolute top-2 right-2 z-10">
                <div class="bg-red-600 text-white px-2 py-1 border-2 border-white">
                  <span class="text-xs font-black uppercase tracking-wider">{{ deal.pricing.discount }}% OFF</span>
                </div>
              </div>

              <!-- Destination Info -->
              <div class="pt-8">
                <CardTitle class="text-lg font-black text-white mb-0.5 uppercase tracking-tight">{{ deal.destination }}</CardTitle>
                <CardDescription class="text-gray-300 font-bold text-xs">{{ deal.description }}</CardDescription>
              </div>
            </div>

            <CardContent class="p-3 bg-white">
              <div class="space-y-2">
                <!-- Price Section -->
                <div class="text-center border-b-2 border-gray-900 pb-2">
                  <div class="flex items-center justify-center gap-1.5 mb-0.5">
                    <span class="text-sm text-gray-400 line-through font-bold">
                      ₱{{ deal.pricing.originalPrice.toLocaleString() }}
                    </span>
                    <span class="text-2xl font-black text-red-600">
                      ₱{{ deal.pricing.salePrice.toLocaleString() }}
                    </span>
                  </div>
                  <p class="text-xs text-gray-600 font-bold">{{ deal.pricing.priceNote }}</p>
                </div>

                <!-- Deal Details -->
                <div class="space-y-1 text-xs">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600 font-bold">Travel:</span>
                    <span class="font-black text-gray-900">{{ formatDateRange(deal.validity.travelPeriodStart, deal.validity.travelPeriodEnd) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600 font-bold">Book by:</span>
                    <span class="font-black text-red-600">{{ formatDate(deal.validity.bookingDeadline) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600 font-bold">Seats:</span>
                    <span class="font-black" :class="deal.availability.isLowAvailability ? 'text-red-600' : 'text-green-600'">
                      {{ deal.availability.seatsLeft }} left
                    </span>
                  </div>
                </div>

                <!-- Features -->
                <div class="space-y-1 border-t-2 border-gray-900 pt-2">
                  <div v-for="(feature, index) in deal.features.slice(0, 2)" :key="index" class="flex items-center gap-1.5 text-xs text-gray-700">
                    <Check class="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                    <span class="font-bold">{{ feature }}</span>
                  </div>
                </div>

                <!-- Book Button -->
                <Button
                  class="w-full h-10 text-xs font-black bg-blue-600 hover:bg-blue-700 text-white rounded-none uppercase tracking-wider transition-all duration-300 border-4 border-gray-900 transform hover:-translate-y-1"
                  @click="bookDeal(deal)"
                >
                  <Plane class="mr-1.5 h-3.5 w-3.5" />
                  Book Now - Save {{ deal.pricing.discount }}%
                </Button>
              </div>
            </CardContent>

            <!-- Shadow Block -->
            <div class="absolute top-1.5 left-1.5 w-full h-full bg-gray-900 -z-10 group-hover:top-2 group-hover:left-2 transition-all duration-300"></div>
          </Card>
        </div>
      </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-8 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>

      <div class="relative max-w-4xl mx-auto px-4 text-center z-10">
        <div class="mb-3">
          <span class="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 border-2 border-white/30">
            <Tag class="w-3.5 h-3.5" />
            <span class="text-xs font-black uppercase tracking-widest">Exclusive Deals</span>
          </span>
        </div>
        <h2 class="text-2xl md:text-3xl font-black mb-2 uppercase tracking-tight">Never Miss a Deal!</h2>
        <p class="text-sm text-gray-300 mb-4 max-w-2xl mx-auto font-bold">
          Subscribe to get exclusive seat sale alerts and be the first to know!
        </p>
        <div class="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
          <Input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="flex-1 h-10 px-3 border-4 border-gray-900 rounded-none focus:ring-0 focus:border-blue-600 text-gray-900 font-bold text-xs"
          />
          <Button
            @click="subscribe"
            class="bg-blue-600 hover:bg-blue-700 text-white h-10 px-4 rounded-none font-black text-xs uppercase tracking-wider transition-all duration-300 border-4 border-gray-900 transform hover:-translate-y-1"
          >
            <MapPin class="w-3.5 h-3.5 mr-1.5" />
            Subscribe
          </Button>
        </div>
        <p class="text-gray-400 text-xs mt-2 font-bold">
          No spam, just amazing deals. Unsubscribe anytime.
        </p>
      </div>
    </section>

    <!-- Terms and Conditions -->
    <section class="bg-white py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="text-2xl font-black mb-4 text-center text-gray-900 uppercase tracking-tight">Terms & Conditions</h3>
        
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-8">
          <Loader2 class="h-8 w-8 animate-spin text-blue-600" />
        </div>
        
        <!-- Terms Grid -->
        <div v-else-if="seatSaleConfig?.termsAndConditions && seatSaleConfig.termsAndConditions.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div 
            v-for="term in seatSaleConfig.termsAndConditions" 
            :key="term.id"
            class="text-center group bg-gray-50 p-4 border-4 border-gray-900 relative transform hover:-translate-y-1 transition-all duration-300"
            :class="getColorClasses(term.color).hover"
          >
            <div 
              class="w-12 h-12 flex items-center justify-center mx-auto mb-2 group-hover:bg-white transition-colors duration-300"
              :class="getColorClasses(term.color).bgLight"
            >
              <component :is="getIconComponent(term.icon)" class="h-6 w-6 transition-colors duration-300" :class="getColorClasses(term.color).text" />
            </div>
            <p class="text-xs text-gray-700 font-bold group-hover:text-white transition-colors duration-300">{{ term.description }}</p>
            <div 
              class="absolute top-1 left-1 w-full h-full -z-10 group-hover:top-1.5 group-hover:left-1.5 transition-all duration-300"
              :class="getColorClasses(term.color).bg"
            ></div>
          </div>
        </div>
        
        <!-- Default Terms (Fallback) -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div class="text-center group bg-gray-50 p-4 border-4 border-gray-900 relative transform hover:-translate-y-1 transition-all duration-300 hover:bg-orange-600">
            <div class="w-12 h-12 bg-orange-100 flex items-center justify-center mx-auto mb-2 group-hover:bg-white transition-colors duration-300">
              <AlertCircle class="h-6 w-6 text-orange-600 transition-colors duration-300" />
            </div>
            <p class="text-xs text-gray-700 font-bold group-hover:text-white transition-colors duration-300">Prices subject to availability and may change without notice</p>
            <div class="absolute top-1 left-1 w-full h-full bg-orange-600 -z-10 group-hover:top-1.5 group-hover:left-1.5 transition-all duration-300"></div>
          </div>
          <div class="text-center group bg-gray-50 p-4 border-4 border-gray-900 relative transform hover:-translate-y-1 transition-all duration-300 hover:bg-blue-600">
            <div class="w-12 h-12 bg-blue-100 flex items-center justify-center mx-auto mb-2 group-hover:bg-white transition-colors duration-300">
              <Calendar class="h-6 w-6 text-blue-600 transition-colors duration-300" />
            </div>
            <p class="text-xs text-gray-700 font-bold group-hover:text-white transition-colors duration-300">Travel dates are fixed and non-changeable for promo fares</p>
            <div class="absolute top-1 left-1 w-full h-full bg-blue-600 -z-10 group-hover:top-1.5 group-hover:left-1.5 transition-all duration-300"></div>
          </div>
          <div class="text-center group bg-gray-50 p-4 border-4 border-gray-900 relative transform hover:-translate-y-1 transition-all duration-300 hover:bg-green-600">
            <div class="w-12 h-12 bg-green-100 flex items-center justify-center mx-auto mb-2 group-hover:bg-white transition-colors duration-300">
              <CreditCard class="h-6 w-6 text-green-600 transition-colors duration-300" />
            </div>
            <p class="text-xs text-gray-700 font-bold group-hover:text-white transition-colors duration-300">Additional fees may apply for payment methods and services</p>
            <div class="absolute top-1 left-1 w-full h-full bg-green-600 -z-10 group-hover:top-1.5 group-hover:left-1.5 transition-all duration-300"></div>
          </div>
          <div class="text-center group bg-gray-50 p-4 border-4 border-gray-900 relative transform hover:-translate-y-1 transition-all duration-300 hover:bg-purple-600">
            <div class="w-12 h-12 bg-purple-100 flex items-center justify-center mx-auto mb-2 group-hover:bg-white transition-colors duration-300">
              <Users class="h-6 w-6 text-purple-600 transition-colors duration-300" />
            </div>
            <p class="text-xs text-gray-700 font-bold group-hover:text-white transition-colors duration-300">Limited seats available per flight on promo fares</p>
            <div class="absolute top-1 left-1 w-full h-full bg-purple-600 -z-10 group-hover:top-1.5 group-hover:left-1.5 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
