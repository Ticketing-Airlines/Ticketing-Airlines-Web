<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { 
  Plane, 
  Star, 
  Camera, 
  Waves, 
  Mountain, 
  Building, 
  Sun, 
  Compass, 
  Clock, 
  Calendar,
  CheckCircle,
  Globe
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

// Import destination images
import singaporeImg from '@/assets/singapore.webp'
import tokyoImg from '@/assets/tokyo.webp'
import bangkokImg from '@/assets/bangkok.webp'
import seoulImg from '@/assets/seoul.webp'
import hongkongImg from '@/assets/hongkong.webp'
import dubaiImg from '@/assets/dubai.webp'

// Featured International Destinations Data
const featuredDestinations = ref([
  {
    id: 1,
    name: "Singapore",
    country: "Singapore",
    description: "Modern city-state with diverse cultures and world-class attractions",
    image: singaporeImg,
    rating: 4.8,
    price: 12000,
    originalPrice: 18000,
    savings: 33,
    badge: "CITY PARADISE",
    features: ["Marina Bay Sands", "Gardens by the Bay", "Sentosa Island", "Chinatown"],
    bestTime: "Feb - Apr",
    flightTime: "3h 30m",
    visaStatus: "Visa-Free"
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    description: "Blend of traditional culture and cutting-edge technology",
    image: tokyoImg,
    rating: 4.9,
    price: 25000,
    originalPrice: 35000,
    savings: 29,
    badge: "CULTURAL GEM",
    features: ["Sensoji Temple", "Tokyo Skytree", "Shibuya Crossing", "Tsukiji Market"],
    bestTime: "Mar - May",
    flightTime: "4h 15m",
    visaStatus: "Visa Required"
  },
  {
    id: 3,
    name: "Bangkok",
    country: "Thailand",
    description: "Vibrant capital with temples, markets, and modern attractions",
    image: bangkokImg,
    rating: 4.7,
    price: 8500,
    originalPrice: 12000,
    savings: 29,
    badge: "BUDGET FRIENDLY",
    features: ["Grand Palace", "Chatuchak Market", "Wat Pho", "Floating Markets"],
    bestTime: "Nov - Mar",
    flightTime: "3h 45m",
    visaStatus: "Visa-Free"
  }
])

// Regional Destinations
const regionalDestinations = ref([
  {
    id: 1,
    region: "Asia",
    description: "Diverse cultures, ancient traditions, and modern metropolises",
    destinations: [
      { name: "Singapore", code: "SIN", type: "City State", icon: Building, visa: "Visa-Free" },
      { name: "Tokyo", code: "NRT", type: "Capital City", icon: Building, visa: "Visa Required" },
      { name: "Seoul", code: "ICN", type: "Capital City", icon: Building, visa: "K-ETA" },
      { name: "Hong Kong", code: "HKG", type: "Special Region", icon: Building, visa: "Visa-Free" }
    ],
    color: "blue"
  },
  {
    id: 2,
    region: "Middle East",
    description: "Ancient history meets modern luxury and architectural marvels",
    destinations: [
      { name: "Dubai", code: "DXB", type: "Modern City", icon: Building, visa: "Visa-Free" },
      { name: "Abu Dhabi", code: "AUH", type: "Capital City", icon: Building, visa: "Visa-Free" },
      { name: "Doha", code: "DOH", type: "Capital City", icon: Building, visa: "Visa-Free" },
      { name: "Kuwait City", code: "KWI", type: "Capital City", icon: Building, visa: "Visa-Free" }
    ],
    color: "green"
  },
  {
    id: 3,
    region: "Oceania",
    description: "Pristine beaches, unique wildlife, and island paradises",
    destinations: [
      { name: "Sydney", code: "SYD", type: "Harbor City", icon: Waves, visa: "Visa Required" },
      { name: "Melbourne", code: "MEL", type: "Cultural Hub", icon: Camera, visa: "Visa Required" },
      { name: "Auckland", code: "AKL", type: "City of Sails", icon: Waves, visa: "Visa Required" },
      { name: "Fiji", code: "NAN", type: "Island Paradise", icon: Waves, visa: "Visa-Free" }
    ],
    color: "purple"
  }
])

// City Destinations
const cityDestinations = ref([
  {
    id: 1,
    name: "Seoul",
    location: "South Korea",
    description: "Dynamic capital blending ancient palaces with modern skyscrapers",
    image: seoulImg,
    activities: ["Gyeongbokgung Palace", "Myeongdong shopping", "N Seoul Tower", "Han River cruise"],
    bestTime: "Apr - Jun",
    difficulty: "Easy",
    visaStatus: "K-ETA Required"
  },
  {
    id: 2,
    name: "Hong Kong",
    location: "Hong Kong SAR",
    description: "Fusion of East and West with stunning skyline and vibrant culture",
    image: hongkongImg,
    activities: ["Victoria Peak", "Star Ferry", "Temple Street Night Market", "Disneyland"],
    bestTime: "Oct - Dec",
    difficulty: "Easy",
    visaStatus: "Visa-Free"
  },
  {
    id: 3,
    name: "Dubai",
    location: "UAE",
    description: "Ultra-modern city with luxury shopping and architectural wonders",
    image: dubaiImg,
    activities: ["Burj Khalifa", "Dubai Mall", "Desert safari", "Palm Jumeirah"],
    bestTime: "Nov - Mar",
    difficulty: "Easy",
    visaStatus: "Visa-Free"
  }
])

// Beach Destinations
const beachDestinations = ref([
  {
    id: 1,
    name: "Bali",
    location: "Indonesia",
    description: "Island paradise with temples, beaches, and lush landscapes",
    icon: Waves,
    features: ["Ubud rice terraces", "Tanah Lot temple", "Seminyak beach", "Mount Batur"],
    bestTime: "Apr - Oct",
    visaStatus: "Visa-Free"
  },
  {
    id: 2,
    name: "Phuket",
    location: "Thailand",
    description: "Tropical paradise with crystal-clear waters and vibrant nightlife",
    icon: Waves,
    features: ["Phi Phi Islands", "Big Buddha", "Old Town", "Floating markets"],
    bestTime: "Nov - Apr",
    visaStatus: "Visa-Free"
  },
  {
    id: 3,
    name: "Maldives",
    location: "Maldives",
    description: "Luxury overwater bungalows and pristine coral reefs",
    icon: Waves,
    features: ["Overwater villas", "Snorkeling", "Spa treatments", "Sunset cruises"],
    bestTime: "Nov - Apr",
    visaStatus: "Visa-Free"
  }
])

// Cultural Destinations
const culturalDestinations = ref([
  {
    id: 1,
    name: "Kyoto",
    location: "Japan",
    description: "Ancient capital with temples, gardens, and traditional culture",
    icon: Camera,
    features: ["Fushimi Inari Shrine", "Arashiyama Bamboo Grove", "Gion District", "Kiyomizu Temple"],
    bestTime: "Mar - May",
    visaStatus: "Visa Required"
  },
  {
    id: 2,
    name: "Angkor Wat",
    location: "Cambodia",
    description: "Magnificent temple complex and ancient Khmer civilization",
    icon: Camera,
    features: ["Angkor Wat temple", "Bayon temple", "Ta Prohm", "Sunrise tours"],
    bestTime: "Nov - Mar",
    visaStatus: "Visa Required"
  },
  {
    id: 3,
    name: "Petra",
    location: "Jordan",
    description: "Ancient Nabatean city carved into rose-red sandstone cliffs",
    icon: Mountain,
    features: ["The Treasury", "Monastery", "Siq canyon", "Camel rides"],
    bestTime: "Mar - May",
    visaStatus: "Visa Required"
  }
])

// Adventure Destinations
const adventureDestinations = ref([
  {
    id: 1,
    name: "Nepal",
    location: "Nepal",
    description: "Himalayan kingdom with world's highest peaks and trekking",
    icon: Mountain,
    difficulty: "Challenging",
    duration: "7-14 days",
    features: ["Everest Base Camp", "Annapurna Circuit", "Kathmandu Valley", "Wildlife safari"],
    visaStatus: "Visa Required"
  },
  {
    id: 2,
    name: "New Zealand",
    location: "New Zealand",
    description: "Adventure capital with fjords, glaciers, and extreme sports",
    icon: Mountain,
    difficulty: "Moderate",
    duration: "10-14 days",
    features: ["Milford Sound", "Queenstown", "Hobbiton", "Glacier hiking"],
    visaStatus: "Visa Required"
  },
  {
    id: 3,
    name: "Bhutan",
    location: "Bhutan",
    description: "Himalayan kingdom focused on happiness and sustainable tourism",
    icon: Mountain,
    difficulty: "Moderate",
    duration: "7-10 days",
    features: ["Tiger's Nest Monastery", "Paro Valley", "Thimphu", "Cultural festivals"],
    visaStatus: "Visa Required"
  }
])

// Methods
const getVisaStatusColor = (status: string) => {
  switch (status) {
    case 'Visa-Free': return 'text-green-600 bg-green-100'
    case 'Visa Required': return 'text-orange-600 bg-orange-100'
    case 'K-ETA Required': return 'text-blue-600 bg-blue-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy': return 'text-green-600 bg-green-100'
    case 'Moderate': return 'text-orange-600 bg-orange-100'
    case 'Challenging': return 'text-red-600 bg-red-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

const bookDestination = (destination: { name: string; price: number }) => {
  console.log('Booking destination:', destination)
  alert(`Booking ${destination.name} for ₱${destination.price.toLocaleString()}`)
}

const exploreRegion = (region: string) => {
  console.log('Exploring region:', region)
  alert(`Exploring ${region} destinations...`)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white py-32 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <div class="relative container mx-auto px-4 text-center z-10 pt-12">
        <div class="inline-flex items-center rounded-full px-4 py-2 mb-6" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
          <Globe class="w-4 h-4 mr-2 text-white" />
          <span class="font-semibold text-sm text-white">International Destinations</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Explore the World
        </h1>
        <p class="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto font-medium">
          Discover amazing destinations across Asia, Middle East, and Oceania
        </p>
      </div>
    </section>

    <!-- Featured Destinations Section -->
    <section class="py-20 bg-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, #000 35px, #000 36px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="flex items-center gap-6 mb-16">
          <div class="w-2 h-24 bg-gradient-to-b from-purple-600 to-blue-600"></div>
          <div>
            <h2 class="text-5xl font-black text-black mb-2 tracking-tight uppercase">Featured Destinations</h2>
            <p class="text-lg text-gray-600 font-semibold">Top-rated international destinations you can't miss</p>
          </div>
        </div>

        <!-- Featured Destinations Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card
            v-for="destination in featuredDestinations"
            :key="destination.id"
            class="group overflow-hidden bg-white border-4 border-gray-900 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] rounded-none p-0 gap-0"
          >
            <div class="relative h-80 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
              <!-- Background Image -->
              <img
                :src="destination.image"
                :alt="destination.name"
                class="absolute inset-0 w-full h-full object-cover opacity-70"
              />
              
              <!-- Badge -->
              <div class="absolute top-6 right-6 z-10">
                <span class="px-4 py-2 bg-gradient-to-r from-purple-400 to-blue-500 text-white font-black text-xs uppercase tracking-wider shadow-lg">
                  {{ destination.badge }}
                </span>
              </div>

              <!-- Rating -->
              <div class="absolute top-6 left-6 z-10">
                <div class="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Star class="w-4 h-4 text-yellow-500 fill-current" />
                  <span class="text-sm font-black text-gray-900">{{ destination.rating }}</span>
                </div>
              </div>

              <!-- Visa Status -->
              <div class="absolute top-20 left-6 z-10">
                <span
                  :class="getVisaStatusColor(destination.visaStatus)"
                  class="px-3 py-1 font-black text-xs uppercase tracking-wider"
                >
                  {{ destination.visaStatus }}
                </span>
              </div>

              <!-- Decorative elements -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

              <!-- Content -->
              <div class="absolute bottom-6 left-6 right-6">
                <CardTitle class="text-4xl font-black text-white mb-2 group-hover:text-white transition-colors duration-300">
                  {{ destination.name }}
                </CardTitle>
                <CardDescription class="text-gray-200 font-bold text-lg mb-2 group-hover:text-white transition-colors duration-300">
                  {{ destination.country }}
                </CardDescription>
                <p class="text-white/90 font-semibold text-sm group-hover:text-white transition-colors duration-300">
                  {{ destination.description }}
                </p>
              </div>
            </div>

            <CardContent class="p-8 bg-white">
              <!-- Features -->
              <div class="mb-6">
                <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-3">Must-Visit Attractions</div>
                <div class="grid grid-cols-2 gap-2">
                  <div v-for="feature in destination.features" :key="feature" class="flex items-center gap-2">
                    <CheckCircle class="w-3 h-3 text-purple-600 flex-shrink-0" />
                    <span class="text-xs font-bold text-gray-700">{{ feature }}</span>
                  </div>
                </div>
              </div>

              <!-- Travel Info -->
              <div class="mb-6 grid grid-cols-2 gap-4">
                <div class="flex items-center gap-2">
                  <Calendar class="w-4 h-4 text-purple-600" />
                  <div>
                    <div class="text-xs text-gray-500 font-bold uppercase">Best Time</div>
                    <div class="text-sm font-black text-gray-900">{{ destination.bestTime }}</div>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <Clock class="w-4 h-4 text-blue-600" />
                  <div>
                    <div class="text-xs text-gray-500 font-bold uppercase">Flight Time</div>
                    <div class="text-sm font-black text-gray-900">{{ destination.flightTime }}</div>
                  </div>
                </div>
              </div>

              <!-- Pricing -->
              <div class="flex justify-between items-center mb-6">
                <div>
                  <div class="flex items-baseline gap-2">
                    <span class="text-3xl font-black text-gray-900">₱{{ destination.price.toLocaleString() }}</span>
                    <span class="text-lg text-gray-400 line-through font-bold">₱{{ destination.originalPrice.toLocaleString() }}</span>
                  </div>
                  <div class="text-sm text-green-600 font-black uppercase">Save {{ destination.savings }}%</div>
                </div>
              </div>

              <Button
                @click="bookDestination(destination)"
                class="w-full bg-gradient-to-r from-purple-600 to-blue-700 hover:from-purple-700 hover:to-blue-800 text-white h-14 font-black text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group-hover:scale-105 rounded-none"
              >
                <span class="flex items-center justify-center gap-2">
                  <Plane class="w-5 h-5" />
                  Book Now - Save {{ destination.savings }}%
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Regional Destinations Section -->
    <section class="py-20 bg-gray-50 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-3 mb-4">
            <div class="w-4 h-4 bg-purple-600"></div>
            <div class="w-4 h-4 bg-green-600"></div>
            <div class="w-4 h-4 bg-blue-600"></div>
          </div>
          <h2 class="text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Explore by Region</h2>
          <p class="text-xl text-gray-600 font-semibold">Discover the unique character of each region</p>
        </div>

        <!-- Regional Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div
            v-for="region in regionalDestinations"
            :key="region.id"
            class="bg-white p-8 border-4 border-gray-900 relative group cursor-pointer transform hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full flex flex-col"
          >
            <!-- Corner Accent -->
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-t-purple-600 border-r-[50px] border-r-transparent"></div>
            
            <div class="flex-1 flex flex-col">
              <div class="mb-6">
                <h3 class="text-3xl font-black text-gray-900 group-hover:text-white mb-2 uppercase tracking-tight transition-colors duration-300">
                  {{ region.region }}
                </h3>
                <p class="text-gray-600 group-hover:text-white font-bold leading-relaxed transition-colors duration-300">
                  {{ region.description }}
                </p>
              </div>
              
              <!-- Destinations List -->
              <div class="space-y-4 mb-8">
                <div v-for="dest in region.destinations" :key="dest.code" class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gray-100 flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
                    <component :is="dest.icon" class="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div class="flex-1">
                    <div class="font-black text-gray-900 group-hover:text-white uppercase tracking-tight transition-colors duration-300">{{ dest.name }}</div>
                    <div class="text-sm text-gray-600 group-hover:text-white font-semibold transition-colors duration-300">{{ dest.type }}</div>
                  </div>
                  <div class="flex flex-col items-end">
                    <div class="text-xs font-black text-gray-500 group-hover:text-white uppercase tracking-wider transition-colors duration-300">{{ dest.code }}</div>
                    <span
                      :class="getVisaStatusColor(dest.visa)"
                      class="text-xs font-bold px-2 py-1 rounded"
                    >
                      {{ dest.visa }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="mt-auto">
                <Button
                  @click="exploreRegion(region.region)"
                  class="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white h-12 font-black text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 rounded-none"
                >
                  <span class="flex items-center justify-center gap-2">
                    <Compass class="w-4 h-4" />
                    Explore {{ region.region }}
                  </span>
                </Button>
              </div>
            </div>
            
            <!-- Shadow Block -->
            <div class="absolute top-2 left-2 w-full h-full bg-purple-600 -z-10 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- City Destinations Section -->
    <section class="py-20 bg-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, #000 35px, #000 36px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="flex items-center gap-6 mb-16">
          <div class="w-2 h-24 bg-gradient-to-b from-blue-600 to-purple-600"></div>
          <div>
            <h2 class="text-5xl font-black text-black mb-2 tracking-tight uppercase">City Destinations</h2>
            <p class="text-lg text-gray-600 font-semibold">Vibrant metropolises and cultural capitals</p>
          </div>
        </div>

        <!-- City Destinations Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            v-for="city in cityDestinations"
            :key="city.id"
            class="group overflow-hidden bg-white border-4 border-gray-900 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] rounded-none p-0 gap-0 h-full flex flex-col"
          >
            <div class="relative h-64 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
              <!-- Background Image -->
              <img
                :src="city.image"
                :alt="city.name"
                class="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              
              <!-- Visa Status Badge -->
              <div class="absolute top-6 right-6 z-10">
                <span
                  :class="getVisaStatusColor(city.visaStatus)"
                  class="px-3 py-1 font-black text-xs uppercase tracking-wider"
                >
                  {{ city.visaStatus }}
                </span>
              </div>

              <!-- Decorative elements -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

              <!-- Content -->
              <div class="absolute bottom-6 left-6 right-6">
                <CardTitle class="text-3xl font-black text-white mb-2 group-hover:text-white transition-colors duration-300">
                  {{ city.name }}
                </CardTitle>
                <CardDescription class="text-gray-200 font-bold text-lg group-hover:text-white transition-colors duration-300">
                  {{ city.location }}
                </CardDescription>
              </div>
            </div>

            <CardContent class="p-8 bg-white flex-1 flex flex-col">
              <p class="text-gray-600 font-bold leading-relaxed mb-6 flex-1">
                {{ city.description }}
              </p>
              
              <!-- Activities -->
              <div class="mb-6">
                <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-3">Top Activities</div>
                <div class="grid grid-cols-2 gap-2">
                  <div v-for="activity in city.activities" :key="activity" class="flex items-center gap-2">
                    <Building class="w-3 h-3 text-blue-600 flex-shrink-0" />
                    <span class="text-xs font-bold text-gray-700">{{ activity }}</span>
                  </div>
                </div>
              </div>

              <!-- Best Time -->
              <div class="mb-6">
                <div class="flex items-center gap-2">
                  <Sun class="w-4 h-4 text-yellow-600" />
                  <div>
                    <div class="text-xs text-gray-500 font-bold uppercase">Best Time to Visit</div>
                    <div class="text-sm font-black text-gray-900">{{ city.bestTime }}</div>
                  </div>
                </div>
              </div>

              <div class="mt-auto">
                <Button
                  class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-14 font-black text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 rounded-none"
                >
                  <span class="flex items-center justify-center gap-2">
                    <Building class="w-5 h-5" />
                    Explore City
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Beach Destinations Section -->
    <section class="py-20 bg-gray-50 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-3 mb-4">
            <div class="w-4 h-4 bg-cyan-600"></div>
            <div class="w-4 h-4 bg-blue-600"></div>
            <div class="w-4 h-4 bg-teal-600"></div>
          </div>
          <h2 class="text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Beach Paradise</h2>
          <p class="text-xl text-gray-600 font-semibold">Tropical beaches and island getaways</p>
        </div>

        <!-- Beach Destinations Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="beach in beachDestinations"
            :key="beach.id"
            class="bg-white p-8 border-4 border-gray-900 relative group cursor-pointer transform hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full flex flex-col"
          >
            <!-- Corner Accent -->
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-t-cyan-600 border-r-[50px] border-r-transparent"></div>
            
            <div class="w-16 h-16 bg-cyan-100 flex items-center justify-center mb-6 group-hover:bg-cyan-600 transition-colors duration-300">
              <component :is="beach.icon" class="w-8 h-8 text-cyan-600 group-hover:text-white transition-colors duration-300" />
            </div>
            
            <div class="flex-1 flex flex-col">
              <h3 class="text-2xl font-black text-gray-900 group-hover:text-white mb-2 uppercase tracking-tight transition-colors duration-300">
                {{ beach.name }}
              </h3>
              <p class="text-gray-600 group-hover:text-white font-bold leading-relaxed mb-4 flex-1 transition-colors duration-300">
                {{ beach.description }}
              </p>
              
              <!-- Features -->
              <div class="mb-6">
                <div class="text-xs text-gray-500 group-hover:text-white font-bold uppercase tracking-widest mb-3 transition-colors duration-300">Highlights</div>
                <div class="space-y-2">
                  <div v-for="feature in beach.features" :key="feature" class="flex items-center gap-2">
                    <CheckCircle class="w-3 h-3 text-cyan-600 group-hover:text-white flex-shrink-0 transition-colors duration-300" />
                    <span class="text-sm font-bold text-gray-700 group-hover:text-white transition-colors duration-300">{{ feature }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Best Time -->
              <div class="mb-6">
                <div class="flex items-center gap-2">
                  <Calendar class="w-4 h-4 text-cyan-600 group-hover:text-white transition-colors duration-300" />
                  <div>
                    <div class="text-xs text-gray-500 group-hover:text-white font-bold uppercase transition-colors duration-300">Best Time</div>
                    <div class="text-sm font-black text-gray-900 group-hover:text-white transition-colors duration-300">{{ beach.bestTime }}</div>
                  </div>
                </div>
              </div>
              
              <div class="mt-auto">
                <Button
                  class="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white h-12 font-black text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 rounded-none"
                >
                  <span class="flex items-center justify-center gap-2">
                    <Waves class="w-4 h-4" />
                    Explore Beach
                  </span>
                </Button>
              </div>
            </div>
            
            <!-- Shadow Block -->
            <div class="absolute top-2 left-2 w-full h-full bg-cyan-600 -z-10 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cultural Destinations Section -->
    <section class="py-20 bg-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, #000 35px, #000 36px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="flex items-center gap-6 mb-16">
          <div class="w-2 h-24 bg-gradient-to-b from-orange-600 to-red-600"></div>
          <div>
            <h2 class="text-5xl font-black text-black mb-2 tracking-tight uppercase">Cultural Heritage</h2>
            <p class="text-lg text-gray-600 font-semibold">Ancient wonders and cultural treasures</p>
          </div>
        </div>

        <!-- Cultural Destinations Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="cultural in culturalDestinations"
            :key="cultural.id"
            class="bg-white p-8 border-4 border-gray-900 relative group cursor-pointer transform hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full flex flex-col"
          >
            <!-- Corner Accent -->
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-t-orange-600 border-r-[50px] border-r-transparent"></div>
            
            <div class="w-16 h-16 bg-orange-100 flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors duration-300">
              <component :is="cultural.icon" class="w-8 h-8 text-orange-600 group-hover:text-white transition-colors duration-300" />
            </div>
            
            <div class="flex-1 flex flex-col">
              <h3 class="text-2xl font-black text-gray-900 group-hover:text-white mb-2 uppercase tracking-tight transition-colors duration-300">
                {{ cultural.name }}
              </h3>
              <p class="text-gray-600 group-hover:text-white font-bold leading-relaxed mb-4 flex-1 transition-colors duration-300">
                {{ cultural.description }}
              </p>
              
              <!-- Features -->
              <div class="mb-6">
                <div class="text-xs text-gray-500 group-hover:text-white font-bold uppercase tracking-widest mb-3 transition-colors duration-300">Highlights</div>
                <div class="space-y-2">
                  <div v-for="feature in cultural.features" :key="feature" class="flex items-center gap-2">
                    <CheckCircle class="w-3 h-3 text-orange-600 group-hover:text-white flex-shrink-0 transition-colors duration-300" />
                    <span class="text-sm font-bold text-gray-700 group-hover:text-white transition-colors duration-300">{{ feature }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Best Time -->
              <div class="mb-6">
                <div class="flex items-center gap-2">
                  <Calendar class="w-4 h-4 text-orange-600 group-hover:text-white transition-colors duration-300" />
                  <div>
                    <div class="text-xs text-gray-500 group-hover:text-white font-bold uppercase transition-colors duration-300">Best Time</div>
                    <div class="text-sm font-black text-gray-900 group-hover:text-white transition-colors duration-300">{{ cultural.bestTime }}</div>
                  </div>
                </div>
              </div>
              
              <div class="mt-auto">
                <Button
                  class="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white h-12 font-black text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 rounded-none"
                >
                  <span class="flex items-center justify-center gap-2">
                    <Camera class="w-4 h-4" />
                    Explore Heritage
                  </span>
                </Button>
              </div>
            </div>
            
            <!-- Shadow Block -->
            <div class="absolute top-2 left-2 w-full h-full bg-orange-600 -z-10 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Adventure Destinations Section -->
    <section class="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white overflow-hidden relative">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #fff 20px, #fff 21px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center rounded-full px-4 py-2 mb-6" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
            <Mountain class="w-4 h-4 mr-2 text-white" />
            <span class="font-semibold text-sm text-white">Adventure Awaits</span>
          </div>
          <h2 class="text-5xl font-black text-white mb-4 uppercase tracking-tighter">Extreme Adventures</h2>
          <p class="text-xl text-white/80 font-semibold">Adventure destinations for thrill seekers</p>
        </div>

        <!-- Adventure Destinations Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="adventure in adventureDestinations"
            :key="adventure.id"
            class="bg-white/10 backdrop-blur-md border-2 border-white/20 p-8 relative group h-full flex flex-col"
          >
            <div class="w-16 h-16 bg-white/20 flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors duration-300">
              <component :is="adventure.icon" class="w-8 h-8 text-white" />
            </div>
            
            <div class="flex-1 flex flex-col">
              <h3 class="text-2xl font-black text-white mb-2 uppercase tracking-tight">
                {{ adventure.name }}
              </h3>
              <p class="text-white/90 font-semibold leading-relaxed mb-4 flex-1">
                {{ adventure.description }}
              </p>
              
              <!-- Adventure Info -->
              <div class="mb-6 space-y-3">
                <div class="flex items-center gap-2">
                  <span
                    :class="getDifficultyColor(adventure.difficulty)"
                    class="px-3 py-1 font-black text-xs uppercase tracking-wider"
                  >
                    {{ adventure.difficulty }}
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <Clock class="w-4 h-4 text-white/70" />
                  <span class="text-white/90 font-semibold text-sm">{{ adventure.duration }}</span>
                </div>
              </div>
              
              <!-- Features -->
              <div class="mb-6">
                <div class="text-xs text-white/70 font-bold uppercase tracking-widest mb-3">Activities</div>
                <div class="space-y-2">
                  <div v-for="feature in adventure.features" :key="feature" class="flex items-center gap-2">
                    <CheckCircle class="w-3 h-3 text-green-400 flex-shrink-0" />
                    <span class="text-white/90 font-semibold text-sm">{{ feature }}</span>
                  </div>
                </div>
              </div>
              
              <div class="mt-auto">
                <Button
                  class="w-full h-12 font-black text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 rounded-none bg-white/20 hover:bg-white/30 text-white border-2 border-white/30"
                >
                  <span class="flex items-center justify-center gap-2">
                    <Mountain class="w-4 h-4" />
                    Start Adventure
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-20 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <div class="relative container mx-auto px-4 z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl mb-8">
            <Globe class="w-12 h-12 text-white" />
          </div>
          
          <h2 class="text-5xl font-black text-white mb-6 uppercase tracking-tight">Ready to Explore the World?</h2>
          <p class="text-xl text-white/90 mb-12 font-semibold max-w-2xl mx-auto">
            Discover amazing destinations across Asia, Middle East, and Oceania with our exclusive deals and packages. Book your international adventure today!
          </p>
          
          <div class="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              class="h-16 px-10 bg-white text-gray-900 hover:bg-gray-100 font-black text-lg uppercase tracking-wider shadow-2xl"
            >
              <Plane class="w-6 h-6 mr-3" />
              Book International Flight
            </Button>
            <Button 
              class="h-16 px-10 bg-transparent border-4 border-white text-white hover:bg-white/10 font-black text-lg uppercase tracking-wider transition-all"
            >
              <Globe class="w-6 h-6 mr-3" />
              View All Destinations
            </Button>
          </div>

          <div class="mt-12 flex items-center justify-center gap-6 text-sm">
            <div class="flex items-center gap-2">
              <CheckCircle class="w-5 h-5 text-green-400" />
              <span class="font-bold text-white/90">Best Prices</span>
            </div>
            <div class="w-px h-6 bg-white/30"></div>
            <div class="flex items-center gap-2">
              <CheckCircle class="w-5 h-5 text-green-400" />
              <span class="font-bold text-white/90">24/7 Support</span>
            </div>
            <div class="w-px h-6 bg-white/30"></div>
            <div class="flex items-center gap-2">
              <CheckCircle class="w-5 h-5 text-green-400" />
              <span class="font-bold text-white/90">Flexible Booking</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
