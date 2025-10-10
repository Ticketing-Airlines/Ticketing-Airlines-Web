<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { 
  MapPin, 
  Plane, 
  Heart, 
  Star, 
  Camera, 
  Waves, 
  Mountain, 
  Building, 
  TreePine, 
  Sun, 
  Compass, 
  Clock, 
  Calendar,
  CheckCircle
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

// Import destination images
import boracayImg from '@/assets/boracay.webp'
import cebuImg from '@/assets/cebu.webp'
import davaoImg from '@/assets/davao.webp'
import palawanImg from '@/assets/palawan.webp'

// Featured Destinations Data
const featuredDestinations = ref([
  {
    id: 1,
    name: "Boracay",
    region: "Western Visayas",
    description: "World-famous white sand beaches and crystal clear waters",
    image: boracayImg,
    rating: 4.8,
    price: 8500,
    originalPrice: 12000,
    savings: 29,
    badge: "BEST BEACH",
    features: ["White sand beaches", "Water sports", "Nightlife", "Sunset views"],
    bestTime: "Nov - May",
    flightTime: "1h 15m"
  },
  {
    id: 2,
    name: "Palawan",
    region: "MIMAROPA",
    description: "The Last Frontier with pristine nature and underground rivers",
    image: palawanImg,
    rating: 4.9,
    price: 12000,
    originalPrice: 18000,
    savings: 33,
    badge: "NATURE'S BEST",
    features: ["Underground River", "El Nido lagoons", "Wildlife", "Diving"],
    bestTime: "Dec - May",
    flightTime: "1h 30m"
  },
  {
    id: 3,
    name: "Cebu",
    region: "Central Visayas",
    description: "Queen City of the South with rich history and modern attractions",
    image: cebuImg,
    rating: 4.7,
    price: 6500,
    originalPrice: 9000,
    savings: 28,
    badge: "CULTURAL HUB",
    features: ["Magellan's Cross", "Temple of Leah", "Beaches", "Shopping"],
    bestTime: "Dec - May",
    flightTime: "1h 20m"
  }
])

// Regional Destinations
const regionalDestinations = ref([
  {
    id: 1,
    region: "Luzon",
    description: "The largest island with diverse landscapes and rich culture",
    destinations: [
      { name: "Manila", code: "MNL", type: "Capital City", icon: Building },
      { name: "Baguio", code: "BAG", type: "Mountain City", icon: Mountain },
      { name: "Vigan", code: "VIG", type: "Heritage City", icon: Camera },
      { name: "Batanes", code: "BTN", type: "Northern Paradise", icon: Compass }
    ],
    color: "blue"
  },
  {
    id: 2,
    region: "Visayas",
    description: "Central islands known for pristine beaches and vibrant festivals",
    destinations: [
      { name: "Cebu", code: "CEB", type: "Queen City", icon: Building },
      { name: "Boracay", code: "BOR", type: "Beach Paradise", icon: Waves },
      { name: "Iloilo", code: "ILO", type: "Food Capital", icon: Heart },
      { name: "Bohol", code: "TAG", type: "Chocolate Hills", icon: TreePine }
    ],
    color: "green"
  },
  {
    id: 3,
    region: "Mindanao",
    description: "Southern paradise with diverse cultures and natural wonders",
    destinations: [
      { name: "Davao", code: "DVO", type: "Durian Capital", icon: TreePine },
      { name: "Cagayan de Oro", code: "CGY", type: "Adventure City", icon: Mountain },
      { name: "Zamboanga", code: "ZAM", type: "Asia's Latin City", icon: Camera },
      { name: "Siargao", code: "SIA", type: "Surfing Capital", icon: Waves }
    ],
    color: "purple"
  }
])

// Beach Destinations
const beachDestinations = ref([
  {
    id: 1,
    name: "El Nido",
    location: "Palawan",
    description: "Dramatic limestone cliffs and crystal-clear lagoons",
    image: palawanImg,
    activities: ["Island hopping", "Snorkeling", "Kayaking", "Sunset cruise"],
    bestTime: "Dec - May",
    difficulty: "Easy"
  },
  {
    id: 2,
    name: "Siargao",
    location: "Surigao del Norte",
    description: "Surfing paradise with laid-back island vibes",
    image: davaoImg,
    activities: ["Surfing", "Island hopping", "Mangrove tour", "Rock pools"],
    bestTime: "Mar - Nov",
    difficulty: "Moderate"
  },
  {
    id: 3,
    name: "Coron",
    location: "Palawan",
    description: "World-class diving with WWII shipwrecks",
    image: palawanImg,
    activities: ["Diving", "Snorkeling", "Kayangan Lake", "Twin Lagoon"],
    bestTime: "Dec - May",
    difficulty: "Moderate"
  }
])

// Cultural Destinations
const culturalDestinations = ref([
  {
    id: 1,
    name: "Vigan",
    location: "Ilocos Sur",
    description: "Spanish colonial architecture and heritage sites",
    icon: Camera,
    features: ["Calle Crisologo", "Bantay Bell Tower", "Pottery making", "Kalesa rides"],
    bestTime: "Nov - Feb"
  },
  {
    id: 2,
    name: "Banaue Rice Terraces",
    location: "Ifugao",
    description: "Ancient engineering marvel carved into mountains",
    icon: Mountain,
    features: ["Rice terraces", "Cultural shows", "Hiking", "Local crafts"],
    bestTime: "Mar - May"
  },
  {
    id: 3,
    name: "Intramuros",
    location: "Manila",
    description: "Historic walled city from Spanish colonial period",
    icon: Building,
    features: ["Fort Santiago", "San Agustin Church", "Museums", "Bamboo bikes"],
    bestTime: "Dec - Feb"
  }
])

// Adventure Destinations
const adventureDestinations = ref([
  {
    id: 1,
    name: "Mount Apo",
    location: "Davao",
    description: "Philippines' highest peak and biodiversity hotspot",
    icon: Mountain,
    difficulty: "Challenging",
    duration: "3-4 days",
    features: ["Summit climb", "Wildlife viewing", "Hot springs", "Camping"]
  },
  {
    id: 2,
    name: "Chocolate Hills",
    location: "Bohol",
    description: "Unique geological formation of 1,268 hills",
    icon: TreePine,
    difficulty: "Easy",
    duration: "1 day",
    features: ["Viewing deck", "ATV rides", "Tarsier sanctuary", "Loboc River"]
  },
  {
    id: 3,
    name: "Mayon Volcano",
    location: "Albay",
    description: "Perfect cone-shaped active volcano",
    icon: Mountain,
    difficulty: "Moderate",
    duration: "2 days",
    features: ["Volcano trek", "ATV adventure", "Cagsawa ruins", "Lava wall"]
  }
])

// Methods
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
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-32 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"></div>
      
      <div class="relative container mx-auto px-4 text-center z-10 pt-12">
        <div class="inline-flex items-center rounded-full px-4 py-2 mb-6" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
          <MapPin class="w-4 h-4 mr-2 text-white" />
          <span class="font-semibold text-sm text-white">Philippine Destinations</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Discover the Philippines
        </h1>
        <p class="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto font-medium">
          7,641 islands of paradise waiting to be explored
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
          <div class="w-2 h-24 bg-gradient-to-b from-blue-600 to-green-600"></div>
          <div>
            <h2 class="text-5xl font-black text-black mb-2 tracking-tight uppercase">Featured Destinations</h2>
            <p class="text-lg text-gray-600 font-semibold">Top-rated destinations you can't miss</p>
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
                <span class="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black text-xs uppercase tracking-wider shadow-lg">
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
                  {{ destination.region }}
                </CardDescription>
                <p class="text-white/90 font-semibold text-sm group-hover:text-white transition-colors duration-300">
                  {{ destination.description }}
                </p>
              </div>
            </div>

            <CardContent class="p-8 bg-white">
              <!-- Features -->
              <div class="mb-6">
                <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-3">What to Experience</div>
                <div class="grid grid-cols-2 gap-2">
                  <div v-for="feature in destination.features" :key="feature" class="flex items-center gap-2">
                    <CheckCircle class="w-3 h-3 text-green-600 flex-shrink-0" />
                    <span class="text-xs font-bold text-gray-700">{{ feature }}</span>
                  </div>
                </div>
              </div>

              <!-- Travel Info -->
              <div class="mb-6 grid grid-cols-2 gap-4">
                <div class="flex items-center gap-2">
                  <Calendar class="w-4 h-4 text-blue-600" />
                  <div>
                    <div class="text-xs text-gray-500 font-bold uppercase">Best Time</div>
                    <div class="text-sm font-black text-gray-900">{{ destination.bestTime }}</div>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <Clock class="w-4 h-4 text-green-600" />
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
                class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-14 font-black text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group-hover:scale-105 rounded-none"
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
            <div class="w-4 h-4 bg-blue-600"></div>
            <div class="w-4 h-4 bg-green-600"></div>
            <div class="w-4 h-4 bg-purple-600"></div>
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
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-t-blue-600 border-r-[50px] border-r-transparent"></div>
            
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
                  <div class="w-10 h-10 bg-gray-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <component :is="dest.icon" class="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div class="flex-1">
                    <div class="font-black text-gray-900 group-hover:text-white uppercase tracking-tight transition-colors duration-300">{{ dest.name }}</div>
                    <div class="text-sm text-gray-600 group-hover:text-white font-semibold transition-colors duration-300">{{ dest.type }}</div>
                  </div>
                  <div class="text-xs font-black text-gray-500 group-hover:text-white uppercase tracking-wider transition-colors duration-300">{{ dest.code }}</div>
                </div>
              </div>
              
              <div class="mt-auto">
                <Button
                  @click="exploreRegion(region.region)"
                  class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-12 font-black text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 rounded-none"
                >
                  <span class="flex items-center justify-center gap-2">
                    <Compass class="w-4 h-4" />
                    Explore {{ region.region }}
                  </span>
                </Button>
              </div>
            </div>
            
            <!-- Shadow Block -->
            <div class="absolute top-2 left-2 w-full h-full bg-blue-600 -z-10 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Beach Destinations Section -->
    <section class="py-20 bg-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, #000 35px, #000 36px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="flex items-center gap-6 mb-16">
          <div class="w-2 h-24 bg-gradient-to-b from-blue-600 to-cyan-600"></div>
          <div>
            <h2 class="text-5xl font-black text-black mb-2 tracking-tight uppercase">Beach Paradise</h2>
            <p class="text-lg text-gray-600 font-semibold">World-class beaches and island destinations</p>
          </div>
        </div>

        <!-- Beach Destinations Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            v-for="beach in beachDestinations"
            :key="beach.id"
            class="group overflow-hidden bg-white border-4 border-gray-900 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] rounded-none p-0 gap-0 h-full flex flex-col"
          >
            <div class="relative h-64 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
              <!-- Background Image -->
              <img
                :src="beach.image"
                :alt="beach.name"
                class="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              
              <!-- Difficulty Badge -->
              <div class="absolute top-6 right-6 z-10">
                <span
                  :class="getDifficultyColor(beach.difficulty)"
                  class="px-3 py-1 font-black text-xs uppercase tracking-wider"
                >
                  {{ beach.difficulty }}
                </span>
              </div>

              <!-- Decorative elements -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

              <!-- Content -->
              <div class="absolute bottom-6 left-6 right-6">
                <CardTitle class="text-3xl font-black text-white mb-2 group-hover:text-white transition-colors duration-300">
                  {{ beach.name }}
                </CardTitle>
                <CardDescription class="text-gray-200 font-bold text-lg group-hover:text-white transition-colors duration-300">
                  {{ beach.location }}
                </CardDescription>
              </div>
            </div>

            <CardContent class="p-8 bg-white flex-1 flex flex-col">
              <p class="text-gray-600 font-bold leading-relaxed mb-6 flex-1">
                {{ beach.description }}
              </p>
              
              <!-- Activities -->
              <div class="mb-6">
                <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-3">Activities</div>
                <div class="grid grid-cols-2 gap-2">
                  <div v-for="activity in beach.activities" :key="activity" class="flex items-center gap-2">
                    <Waves class="w-3 h-3 text-blue-600 flex-shrink-0" />
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
                    <div class="text-sm font-black text-gray-900">{{ beach.bestTime }}</div>
                  </div>
                </div>
              </div>

              <div class="mt-auto">
                <Button
                  class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-14 font-black text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 rounded-none"
                >
                  <span class="flex items-center justify-center gap-2">
                    <Waves class="w-5 h-5" />
                    Explore Beach
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Cultural Destinations Section -->
    <section class="py-20 bg-gray-50 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-3 mb-4">
            <div class="w-4 h-4 bg-orange-600"></div>
            <div class="w-4 h-4 bg-red-600"></div>
            <div class="w-4 h-4 bg-yellow-600"></div>
          </div>
          <h2 class="text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Cultural Heritage</h2>
          <p class="text-xl text-gray-600 font-semibold">Rich history and cultural treasures</p>
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
    <section class="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white overflow-hidden relative">
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
          <h2 class="text-5xl font-black text-white mb-4 uppercase tracking-tighter">Thrill Seekers</h2>
          <p class="text-xl text-white/80 font-semibold">Adventure destinations for the bold</p>
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
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white py-20 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <div class="relative container mx-auto px-4 z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl mb-8">
            <Plane class="w-12 h-12 text-white" />
          </div>
          
          <h2 class="text-5xl font-black text-white mb-6 uppercase tracking-tight">Ready to Explore?</h2>
          <p class="text-xl text-white/90 mb-12 font-semibold max-w-2xl mx-auto">
            Discover the beauty of the Philippines with our exclusive deals and packages. Book your adventure today!
          </p>
          
          <div class="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              class="h-16 px-10 bg-white text-gray-900 hover:bg-gray-100 font-black text-lg uppercase tracking-wider shadow-2xl"
            >
              <Plane class="w-6 h-6 mr-3" />
              Book Your Flight
            </Button>
            <Button 
              class="h-16 px-10 bg-transparent border-4 border-white text-white hover:bg-white/10 font-black text-lg uppercase tracking-wider transition-all"
            >
              <MapPin class="w-6 h-6 mr-3" />
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
