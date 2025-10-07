<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-orange-500 to-red-600 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <div class="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
          🔥 LIMITED TIME OFFER
        </div>
        <h1 class="text-5xl font-bold mb-4">SEAT SALE</h1>
        <p class="text-2xl mb-6 opacity-90">Unbeatable deals to your dream destinations</p>
        <div class="flex justify-center items-center gap-4 text-lg">
          <Clock class="h-6 w-6" />
          <span>Sale ends in: {{ timeRemaining }}</span>
        </div>
      </div>
    </div>

    <!-- Filter Section -->
    <div class="container mx-auto px-4 -mt-8 relative z-10">
      <Card class="shadow-xl">
        <CardContent class="p-6">
          <div class="flex flex-wrap gap-4 items-center justify-between">
            <div class="flex gap-4 items-center">
              <Label class="font-medium">Filter by:</Label>
              <Select v-model="selectedDestination">
                <SelectTrigger class="w-48">
                  <SelectValue placeholder="All Destinations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Destinations</SelectItem>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
              
              <Select v-model="priceRange">
                <SelectTrigger class="w-48">
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
            
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600">{{ filteredDeals.length }} deals found</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Featured Deals -->
    <div class="container mx-auto px-4 py-12">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">Featured Deals</h2>
        <p class="text-xl text-gray-600">Don't miss these incredible offers!</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card 
          v-for="deal in filteredDeals" 
          :key="deal.id" 
          class="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          :class="deal.featured ? 'ring-2 ring-orange-400' : ''"
        >
          <!-- Deal Badge -->
          <div v-if="deal.featured" class="absolute top-4 left-4 z-10">
            <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
              ⭐ FEATURED
            </div>
          </div>
          
          <div v-if="deal.discount" class="absolute top-4 right-4 z-10">
            <div class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              {{ deal.discount }}% OFF
            </div>
          </div>

          <!-- Destination Image -->
          <div class="h-48 bg-gradient-to-br relative overflow-hidden" :style="{ background: deal.gradient }">
            <div class="absolute inset-0 bg-black bg-opacity-20"></div>
            <div class="absolute bottom-4 left-4 text-white">
              <h3 class="text-2xl font-bold">{{ deal.destination }}</h3>
              <p class="text-sm opacity-90">{{ deal.country }}</p>
            </div>
          </div>

          <CardContent class="p-6">
            <div class="space-y-4">
              <!-- Price Section -->
              <div class="text-center">
                <div class="flex items-center justify-center gap-2">
                  <span v-if="deal.originalPrice" class="text-lg text-gray-400 line-through">
                    ₱{{ deal.originalPrice.toLocaleString() }}
                  </span>
                  <span class="text-3xl font-bold text-orange-600">
                    ₱{{ deal.salePrice.toLocaleString() }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 mt-1">{{ deal.priceNote }}</p>
              </div>

              <!-- Deal Details -->
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Travel Period:</span>
                  <span class="font-medium">{{ deal.travelPeriod }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Booking Until:</span>
                  <span class="font-medium text-red-600">{{ deal.bookingDeadline }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Seats Left:</span>
                  <span class="font-medium" :class="deal.seatsLeft < 10 ? 'text-red-600' : 'text-green-600'">
                    {{ deal.seatsLeft }}
                  </span>
                </div>
              </div>

              <!-- Features -->
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <Check class="h-4 w-4 text-green-500" />
                  <span>{{ deal.features[0] }}</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <Check class="h-4 w-4 text-green-500" />
                  <span>{{ deal.features[1] }}</span>
                </div>
              </div>

              <!-- Book Button -->
              <Button 
                class="w-full h-12 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                @click="bookDeal(deal)"
              >
                <Plane class="mr-2 h-5 w-5" />
                Book Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Newsletter Signup -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">Never Miss a Deal!</h2>
        <p class="text-xl mb-8 opacity-90">Subscribe to get exclusive seat sale alerts</p>
        
        <div class="max-w-md mx-auto flex gap-4">
          <Input 
            v-model="email" 
            type="email" 
            placeholder="Enter your email" 
            class="flex-1 h-12 text-gray-900"
          />
          <Button 
            @click="subscribe" 
            class="h-12 px-8 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>

    <!-- Terms and Conditions -->
    <div class="bg-gray-100 py-8">
      <div class="container mx-auto px-4">
        <h3 class="text-lg font-semibold mb-4 text-center">Terms and Conditions</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
          <div class="text-center">
            <AlertCircle class="h-6 w-6 mx-auto mb-2 text-orange-500" />
            <p>Prices are subject to availability and may change without notice</p>
          </div>
          <div class="text-center">
            <Calendar class="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <p>Travel dates are fixed and non-changeable for promo fares</p>
          </div>
          <div class="text-center">
            <CreditCard class="h-6 w-6 mx-auto mb-2 text-green-500" />
            <p>Additional fees may apply for payment methods and services</p>
          </div>
          <div class="text-center">
            <Users class="h-6 w-6 mx-auto mb-2 text-purple-500" />
            <p>Limited seats available per flight on promo fares</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
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
  Users 
} from 'lucide-vue-next'

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
    features: ['7kg cabin baggage', 'Seat selection available']
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
    features: ['7kg cabin baggage', 'Online check-in']
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
    features: ['7kg cabin baggage', 'Meal included']
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
    features: ['7kg cabin baggage', 'Priority boarding']
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
    features: ['7kg cabin baggage', 'Flexible rebooking']
  },
  {
    id: 6,
    destination: 'Tokyo',
    country: 'Japan',
    type: 'international',
    originalPrice: 35000,
    salePrice: 19999,
    discount: 43,
    priceNote: 'Base fare, one way',
    travelPeriod: 'Jul 1 - Oct 31, 2024',
    bookingDeadline: 'Jun 1, 2024',
    seatsLeft: 5,
    featured: true,
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    features: ['7kg cabin baggage', 'Premium meal']
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
let timer: number

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
