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
    travelPeriod: 'Mar 1 - May 31, 2024',
    bookingDeadline: 'Feb 28, 2024',
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
    travelPeriod: 'Mar 15 - Jun 15, 2024',
    bookingDeadline: 'Mar 1, 2024',
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
    travelPeriod: 'Apr 1 - Jul 31, 2024',
    bookingDeadline: 'Mar 15, 2024',
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
    travelPeriod: 'May 1 - Aug 31, 2024',
    bookingDeadline: 'Apr 1, 2024',
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
    travelPeriod: 'Jun 1 - Sep 30, 2024',
    bookingDeadline: 'May 1, 2024',
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
    travelPeriod: 'Jul 1 - Oct 31, 2024',
    bookingDeadline: 'Jun 1, 2024',
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
  const saleEndDate = new Date('2024-02-28T23:59:59')
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
  // Here you would typically navigate to the booking page with the deal details
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
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-32 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
      
      <div class="relative container mx-auto px-4 text-center z-10 pt-12">
        <div class="inline-flex items-center rounded-full px-4 py-2 mb-6 bg-gradient-to-r from-red-500 to-orange-500 animate-pulse">
          <Tag class="w-4 h-4 mr-2 text-white" />
          <span class="font-bold text-sm text-white">LIMITED TIME OFFER</span>
        </div>
        <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
          SEAT SALE
        </h1>
        <p class="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto font-medium mb-8">
          Unbeatable deals to your dream destinations
        </p>
        <div class="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
          <Clock class="h-6 w-6 text-white" />
          <span class="text-lg font-semibold">Sale ends in: {{ timeRemaining }}</span>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <div class="container mx-auto px-4 -mt-16 relative z-20 mb-16">
      <Card class="shadow-2xl bg-white/95 backdrop-blur-md border-0">
        <CardContent class="p-6">
          <div class="flex flex-wrap gap-4 items-center justify-between">
            <div class="flex flex-wrap gap-4 items-center">
              <Label class="font-bold text-gray-700 uppercase tracking-wide">Filter by:</Label>
              <Select v-model="selectedDestination">
                <SelectTrigger class="w-48 h-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black">
                  <SelectValue placeholder="All Destinations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Destinations</SelectItem>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
              
              <Select v-model="priceRange">
                <SelectTrigger class="w-48 h-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under5k">Under ₱5,000</SelectItem>
                  <SelectItem value="5k-10k">₱5,000 - ₱10,000</SelectItem>
                  <SelectItem value="10k-20k">₱10,000 - ₱20,000</SelectItem>
                  <SelectItem value="over20k">Over ₱20,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div class="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full">
              <TrendingDown class="h-4 w-4" />
              <span class="text-sm font-bold">{{ filteredDeals.length }} deals found</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Featured Deals -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full mb-6">
            <Tag class="w-5 h-5" />
            <span class="font-bold text-sm uppercase tracking-wider">Hot Deals</span>
          </div>
          <h2 class="text-5xl font-bold text-black mb-4">Featured Deals</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't miss these incredible offers! Limited seats available.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card 
            v-for="deal in filteredDeals" 
            :key="deal.id" 
            class="group overflow-hidden bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] rounded-3xl p-0 gap-0"
            :class="deal.featured ? 'ring-2 ring-gradient-to-r from-red-500 to-orange-500' : ''"
          >
            <!-- Destination Image with Badges -->
            <div class="relative h-56 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
              <!-- Background Image -->
              <img
                :src="deal.image"
                :alt="deal.destination"
                class="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-500"
              />
              
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

              <!-- Featured Badge -->
              <div v-if="deal.featured" class="absolute top-4 left-4 z-10">
                <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                  ⭐ FEATURED
                </div>
              </div>
              
              <!-- Discount Badge -->
              <div class="absolute top-4 right-4 z-10">
                <div class="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                  {{ deal.discount }}% OFF
                </div>
              </div>

              <!-- Decorative elements -->
              <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

              <!-- Content -->
              <div class="absolute bottom-4 left-4 right-4 z-10">
                <CardTitle class="text-2xl font-bold text-white mb-1 group-hover:text-orange-300 transition-colors duration-300">{{ deal.destination }}</CardTitle>
                <CardDescription class="text-gray-200 font-medium text-sm">{{ deal.description }}</CardDescription>
              </div>
            </div>

            <CardContent class="p-6 bg-white">
              <div class="space-y-4">
                <!-- Price Section -->
                <div class="text-center border-b border-gray-200 pb-4">
                  <div class="flex items-center justify-center gap-2 mb-1">
                    <span class="text-lg text-gray-400 line-through font-medium">
                      ₱{{ deal.originalPrice.toLocaleString() }}
                    </span>
                    <span class="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                      ₱{{ deal.salePrice.toLocaleString() }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 font-medium">{{ deal.priceNote }}</p>
                </div>

                <!-- Deal Details -->
                <div class="space-y-2 text-sm">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600 font-medium">Travel Period:</span>
                    <span class="font-bold text-gray-900">{{ deal.travelPeriod }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600 font-medium">Booking Until:</span>
                    <span class="font-bold text-red-600">{{ deal.bookingDeadline }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600 font-medium">Seats Left:</span>
                    <span class="font-bold" :class="deal.seatsLeft < 10 ? 'text-red-600' : 'text-green-600'">
                      {{ deal.seatsLeft }}
                    </span>
                  </div>
                </div>

                <!-- Features -->
                <div class="space-y-2 border-t border-gray-200 pt-4">
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <Check class="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span class="font-medium">{{ deal.features[0] }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <Check class="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span class="font-medium">{{ deal.features[1] }}</span>
                  </div>
                </div>

                <!-- Book Button -->
                <Button 
                  class="w-full h-14 text-lg font-bold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group-hover:scale-105"
                  @click="bookDeal(deal)"
                >
                  <Plane class="mr-2 h-5 w-5" />
                  Book Now - Save {{ deal.discount }}%
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-20 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div class="mb-6">
          <span class="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
            <Tag class="w-4 h-4" />
            Exclusive Deals
          </span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Never Miss a Deal!</h2>
        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-medium">
          Subscribe to get exclusive seat sale alerts and be the first to know about our latest offers!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <Input 
            v-model="email" 
            type="email" 
            placeholder="Enter your email address" 
            class="flex-1 h-14 px-6 rounded-2xl border-2 border-gray-300 focus:ring-4 focus:ring-orange-600 focus:ring-opacity-20 focus:border-orange-600 focus:outline-none text-gray-900 font-medium shadow-lg"
          />
          <Button 
            @click="subscribe" 
            class="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white h-14 px-8 rounded-2xl font-bold transition-all duration-300 shadow-lg transform hover:-translate-y-1"
          >
            <MapPin class="w-4 h-4 mr-2" />
            Subscribe
          </Button>
        </div>
        <p class="text-gray-400 text-sm mt-4">
          No spam, just amazing flight deals. Unsubscribe anytime.
        </p>
      </div>
    </section>

    <!-- Terms and Conditions -->
    <section class="bg-gradient-to-b from-white to-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="text-3xl font-bold mb-8 text-center text-black">Terms & Conditions</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center group">
            <div class="bg-white border-2 border-gray-300 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:border-orange-500 transition-all duration-300 shadow-lg">
              <AlertCircle class="h-8 w-8 text-orange-500" />
            </div>
            <p class="text-gray-700 font-medium">Prices are subject to availability and may change without notice</p>
          </div>
          <div class="text-center group">
            <div class="bg-white border-2 border-gray-300 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:border-blue-500 transition-all duration-300 shadow-lg">
              <Calendar class="h-8 w-8 text-blue-500" />
            </div>
            <p class="text-gray-700 font-medium">Travel dates are fixed and non-changeable for promo fares</p>
          </div>
          <div class="text-center group">
            <div class="bg-white border-2 border-gray-300 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:border-green-500 transition-all duration-300 shadow-lg">
              <CreditCard class="h-8 w-8 text-green-500" />
            </div>
            <p class="text-gray-700 font-medium">Additional fees may apply for payment methods and services</p>
          </div>
          <div class="text-center group">
            <div class="bg-white border-2 border-gray-300 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:border-purple-500 transition-all duration-300 shadow-lg">
              <Users class="h-8 w-8 text-purple-500" />
            </div>
            <p class="text-gray-700 font-medium">Limited seats available per flight on promo fares</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>