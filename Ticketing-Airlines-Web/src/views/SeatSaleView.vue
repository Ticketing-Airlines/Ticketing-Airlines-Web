<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
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
  TrendingDown
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

// Import destination images
import cebuImg from '@/assets/cebu.webp'
import davaoImg from '@/assets/davao.webp'
import singaporeImg from '@/assets/singapore.webp'
import hongkongImg from '@/assets/hongkong.webp'
import bangkokImg from '@/assets/bangkok.webp'
import palawanImg from '@/assets/palawan.webp'

// Interface for seat sale deal
interface SeatSaleDeal {
  id: number
  destination: string
  country: string
  type: string
  originalPrice: number
  salePrice: number
  discount: number
  priceNote: string
  travelPeriod: string
  bookingDeadline: string
  seatsLeft: number
  featured: boolean
  gradient: string
  features: string[]
  image: string
  description: string
}

// Mock seat sale deals data
const seatSaleDeals = ref<SeatSaleDeal[]>([
  {
    id: 1,
    destination: 'Cebu',
    country: 'Philippines',
    type: 'domestic',
    originalPrice: 8500,
    salePrice: 2999,
    discount: 65,
    priceNote: 'Base fare, one way',
    travelPeriod: 'May 1 - Aug 31, 2026',
    bookingDeadline: 'May 31, 2026',
    seatsLeft: 45,
    featured: true,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    features: ['7kg cabin baggage', 'Seat selection available'],
    image: cebuImg,
    description: 'Queen City of the South'
  },
  {
    id: 2,
    destination: 'Davao',
    country: 'Philippines',
    type: 'domestic',
    originalPrice: 9200,
    salePrice: 3499,
    discount: 62,
    priceNote: 'Base fare, one way',
    travelPeriod: 'May 15 - Aug 15, 2026',
    bookingDeadline: 'May 31, 2026',
    seatsLeft: 23,
    featured: false,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    features: ['7kg cabin baggage', 'Online check-in'],
    image: davaoImg,
    description: 'Home of Mount Apo'
  },
  {
    id: 3,
    destination: 'Singapore',
    country: 'Singapore',
    type: 'international',
    originalPrice: 15800,
    salePrice: 7999,
    discount: 49,
    priceNote: 'Base fare, one way',
    travelPeriod: 'Jun 1 - Sep 30, 2026',
    bookingDeadline: 'May 31, 2026',
    seatsLeft: 8,
    featured: true,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    features: ['7kg cabin baggage', 'Meal included'],
    image: singaporeImg,
    description: 'Lion City'
  },
  {
    id: 4,
    destination: 'Bangkok',
    country: 'Thailand',
    type: 'international',
    originalPrice: 18500,
    salePrice: 9999,
    discount: 46,
    priceNote: 'Base fare, one way',
    travelPeriod: 'Jun 1 - Sep 30, 2026',
    bookingDeadline: 'May 31, 2026',
    seatsLeft: 15,
    featured: false,
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    features: ['7kg cabin baggage', 'Priority boarding'],
    image: bangkokImg,
    description: 'City of Angels'
  },
  {
    id: 5,
    destination: 'Hong Kong',
    country: 'Hong Kong',
    type: 'international',
    originalPrice: 22000,
    salePrice: 12999,
    discount: 41,
    priceNote: 'Base fare, one way',
    travelPeriod: 'Jul 1 - Oct 31, 2026',
    bookingDeadline: 'May 31, 2026',
    seatsLeft: 32,
    featured: false,
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    features: ['7kg cabin baggage', 'Flexible rebooking'],
    image: hongkongImg,
    description: 'Pearl of the Orient'
  },
  {
    id: 6,
    destination: 'Palawan',
    country: 'Philippines',
    type: 'domestic',
    originalPrice: 35000,
    salePrice: 19999,
    discount: 43,
    priceNote: 'Base fare, one way',
    travelPeriod: 'Aug 1 - Nov 30, 2026',
    bookingDeadline: 'May 31, 2026',
    seatsLeft: 5,
    featured: true,
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    features: ['7kg cabin baggage', 'Premium meal'],
    image: palawanImg,
    description: 'The Last Frontier'
  }
])

const selectedDestination = ref('all')
const priceRange = ref('all')
const email = ref('')
const timeRemaining = ref('')

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
      const price = deal.salePrice
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

// Timer for countdown
let timer: ReturnType<typeof setInterval>

const updateCountdown = () => {
  const saleEndDate = new Date('2026-05-31T23:59:59')
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

const bookDeal = (deal: SeatSaleDeal) => {
  console.log('Booking deal:', deal)
  alert(`Booking ${deal.destination} for ₱${deal.salePrice.toLocaleString()}!\nThis will redirect to the booking page.`)
}

const subscribe = () => {
  if (email.value) {
    console.log('Subscribing email:', email.value)
    alert('Thank you for subscribing! You will receive exclusive seat sale alerts.')
    email.value = ''
  }
}

onMounted(() => {
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
          SEAT SALE
        </h1>
        <p class="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto font-bold mb-4">
          Unbeatable deals to your dream destinations
        </p>
        <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 border-2 border-white/30">
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

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            v-for="deal in filteredDeals"
            :key="deal.id"
            class="group overflow-hidden bg-white border-4 border-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-0 gap-0 relative"
            :class="deal.featured ? 'ring-4 ring-orange-500 ring-offset-2' : ''"
          >
            <!-- Destination Image with Badges -->
            <div class="relative h-40 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
              <!-- Background Image -->
              <img
                :src="deal.image"
                :alt="deal.destination"
                class="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-300"
              />

              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

              <!-- Featured Badge -->
              <div v-if="deal.featured" class="absolute top-2 left-2 z-10">
                <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 border-2 border-black">
                  <span class="text-xs font-black uppercase tracking-wider">⭐ Featured</span>
                </div>
              </div>

              <!-- Discount Badge -->
              <div class="absolute top-2 right-2 z-10">
                <div class="bg-red-600 text-white px-2 py-1 border-2 border-white">
                  <span class="text-xs font-black uppercase tracking-wider">{{ deal.discount }}% OFF</span>
                </div>
              </div>

              <!-- Content -->
              <div class="absolute bottom-2 left-2 right-2 z-10">
                <CardTitle class="text-lg font-black text-white mb-0.5 uppercase tracking-tight">{{ deal.destination }}</CardTitle>
                <CardDescription class="text-gray-200 font-bold text-xs">{{ deal.description }}</CardDescription>
              </div>
            </div>

            <CardContent class="p-3 bg-white">
              <div class="space-y-2">
                <!-- Price Section -->
                <div class="text-center border-b-2 border-gray-900 pb-2">
                  <div class="flex items-center justify-center gap-1.5 mb-0.5">
                    <span class="text-sm text-gray-400 line-through font-bold">
                      ₱{{ deal.originalPrice.toLocaleString() }}
                    </span>
                    <span class="text-2xl font-black text-red-600">
                      ₱{{ deal.salePrice.toLocaleString() }}
                    </span>
                  </div>
                  <p class="text-xs text-gray-600 font-bold">{{ deal.priceNote }}</p>
                </div>

                <!-- Deal Details -->
                <div class="space-y-1 text-xs">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600 font-bold">Travel:</span>
                    <span class="font-black text-gray-900">{{ deal.travelPeriod }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600 font-bold">Book by:</span>
                    <span class="font-black text-red-600">{{ deal.bookingDeadline }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600 font-bold">Seats:</span>
                    <span class="font-black" :class="deal.seatsLeft < 10 ? 'text-red-600' : 'text-green-600'">
                      {{ deal.seatsLeft }} left
                    </span>
                  </div>
                </div>

                <!-- Features -->
                <div class="space-y-1 border-t-2 border-gray-900 pt-2">
                  <div class="flex items-center gap-1.5 text-xs text-gray-700">
                    <Check class="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                    <span class="font-bold">{{ deal.features[0] }}</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-xs text-gray-700">
                    <Check class="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                    <span class="font-bold">{{ deal.features[1] }}</span>
                  </div>
                </div>

                <!-- Book Button -->
                <Button
                  class="w-full h-10 text-xs font-black bg-blue-600 hover:bg-blue-700 text-white rounded-none uppercase tracking-wider transition-all duration-300 border-4 border-gray-900 transform hover:-translate-y-1"
                  @click="bookDeal(deal)"
                >
                  <Plane class="mr-1.5 h-3.5 w-3.5" />
                  Book Now - Save {{ deal.discount }}%
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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
