<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { 
  AlertTriangle, 
  Shield, 
  Globe, 
  FileText, 
  Thermometer, 
  Phone, 
  CheckCircle, 
  XCircle, 
  Info,
  Users,
  Bell
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

// Import destination images
import singaporeImg from '@/assets/singapore.webp'
import tokyoImg from '@/assets/tokyo.webp'
import bangkokImg from '@/assets/bangkok.webp'
import seoulImg from '@/assets/seoul.webp'

// Travel Advisory Data
const activeAlerts = ref([
  {
    id: 1,
    title: "Typhoon Warning - Northern Luzon",
    severity: "high",
    description: "Typhoon approaching Northern Luzon. Flights may be delayed or cancelled.",
    affectedRoutes: ["MNL-BAG", "MNL-LAO", "MNL-TUG"],
    validUntil: "2025-10-15",
    icon: AlertTriangle
  },
  {
    id: 2,
    title: "Enhanced Security Screening",
    severity: "medium",
    description: "Additional security measures at all airports. Arrive 3 hours early for international flights.",
    affectedRoutes: ["All International Routes"],
    validUntil: "2025-11-01",
    icon: Shield
  },
  {
    id: 3,
    title: "Health Declaration Required",
    severity: "low",
    description: "All passengers must complete health declaration forms before boarding.",
    affectedRoutes: ["All Routes"],
    validUntil: "2025-12-01",
    icon: FileText
  }
])

const destinationAdvisories = ref([
  {
    id: 1,
    destination: "Singapore",
    code: "SIN",
    status: "open",
    requirements: ["Visa-free for 30 days", "COVID vaccination proof", "Travel insurance"],
    restrictions: [],
    lastUpdated: "2025-10-10",
    riskLevel: "low",
    image: singaporeImg
  },
  {
    id: 2,
    destination: "Japan",
    code: "NRT",
    status: "restricted",
    requirements: ["Visa required", "PCR test within 72 hours", "Quarantine 14 days"],
    restrictions: ["Tourist visa suspended", "Business travel only"],
    lastUpdated: "2025-10-08",
    riskLevel: "medium",
    image: tokyoImg
  },
  {
    id: 3,
    destination: "Thailand",
    code: "BKK",
    status: "open",
    requirements: ["Visa-free for 30 days", "Health declaration", "Travel insurance"],
    restrictions: [],
    lastUpdated: "2025-10-12",
    riskLevel: "low",
    image: bangkokImg
  },
  {
    id: 4,
    destination: "South Korea",
    code: "ICN",
    status: "caution",
    requirements: ["K-ETA required", "Health screening", "Contact tracing app"],
    restrictions: ["Enhanced screening procedures"],
    lastUpdated: "2025-10-09",
    riskLevel: "medium",
    image: seoulImg
  }
])

const healthGuidelines = ref([
  {
    title: "COVID-19 Vaccination",
    description: "Proof of vaccination may be required for international travel",
    icon: Shield,
    mandatory: true
  },
  {
    title: "Health Declaration",
    description: "Complete health declaration forms before departure",
    icon: FileText,
    mandatory: true
  },
  {
    title: "Face Masks",
    description: "Face masks required in airports and during flights",
    icon: Users,
    mandatory: true
  },
  {
    title: "Social Distancing",
    description: "Maintain safe distance in airport terminals",
    icon: Users,
    mandatory: false
  }
])

const weatherAdvisories = ref([
  {
    region: "Northern Luzon",
    condition: "Typhoon Season",
    severity: "high",
    description: "Heavy rains and strong winds expected",
    travelImpact: "Flight delays possible",
    period: "January - March 2025"
  },
  {
    region: "Visayas",
    condition: "Monsoon Season",
    severity: "medium",
    description: "Occasional heavy rainfall",
    travelImpact: "Minor delays possible",
    period: "June - November 2025"
  },
  {
    region: "Mindanao",
    condition: "Dry Season",
    severity: "low",
    description: "Generally clear weather",
    travelImpact: "Normal operations",
    period: "December - May 2025"
  }
])

// Computed properties
const highSeverityAlerts = computed(() => activeAlerts.value.filter(alert => alert.severity === 'high'))
const mediumSeverityAlerts = computed(() => activeAlerts.value.filter(alert => alert.severity === 'medium'))
const lowSeverityAlerts = computed(() => activeAlerts.value.filter(alert => alert.severity === 'low'))

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return 'text-green-600 bg-green-100 border-green-600'
    case 'restricted': return 'text-red-600 bg-red-100 border-red-600'
    case 'caution': return 'text-yellow-600 bg-yellow-100 border-yellow-600'
    default: return 'text-gray-600 bg-gray-100 border-gray-600'
  }
}

const getRiskLevelColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'low': return 'text-green-600'
    case 'medium': return 'text-orange-600'
    case 'high': return 'text-red-600'
    default: return 'text-gray-600'
  }
}

const contactSupport = () => {
  console.log('Contacting support...')
  alert('Redirecting to support...')
}

const subscribeToAlerts = () => {
  console.log('Subscribing to alerts...')
  alert('You will receive travel advisory updates via email!')
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
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <div class="relative container mx-auto px-4 text-center z-10 pt-12">
        <div class="inline-flex items-center rounded-full px-4 py-2 mb-6" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
          <AlertTriangle class="w-4 h-4 mr-2 text-white" />
          <span class="font-semibold text-sm text-white">Travel Advisories</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Stay Informed
        </h1>
        <p class="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto font-medium">
          Essential travel information and safety updates for your journey
        </p>
      </div>
    </section>

    <!-- Active Alerts Section -->
    <section class="py-20 bg-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, #000 35px, #000 36px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="flex items-center gap-6 mb-16">
          <div class="w-2 h-24 bg-gradient-to-b from-red-600 to-orange-600"></div>
          <div>
            <h2 class="text-5xl font-black text-black mb-2 tracking-tight uppercase">Active Alerts</h2>
            <p class="text-lg text-gray-600 font-semibold">Current travel advisories and warnings</p>
          </div>
        </div>

        <!-- Alerts Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- High Severity Alerts -->
          <div class="lg:col-span-1">
            <div class="bg-gradient-to-br from-red-50 to-red-100 p-8 border-l-8 border-red-600 relative group hover:shadow-2xl transition-shadow">
              <!-- Corner Badge -->
              <div class="absolute -top-4 -right-4 w-20 h-20 bg-red-600 flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform">
                <AlertTriangle class="w-10 h-10 text-white" />
              </div>

              <h3 class="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">High Priority</h3>
              
              <div class="space-y-6">
                <div v-for="alert in highSeverityAlerts" :key="alert.id" class="bg-white p-6 border-t-4 border-red-600">
                  <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 bg-red-600 flex items-center justify-center">
                      <component :is="alert.icon" class="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 class="text-xl font-black text-gray-900 uppercase">{{ alert.title }}</h4>
                      <p class="text-sm text-gray-600 font-semibold">Valid until {{ alert.validUntil }}</p>
                    </div>
                  </div>
                  
                  <p class="text-gray-700 font-bold leading-relaxed mb-4">{{ alert.description }}</p>
                  
                  <div class="space-y-2">
                    <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">Affected Routes</div>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="route in alert.affectedRoutes" :key="route" class="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
                        {{ route }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Medium Severity Alerts -->
          <div class="lg:col-span-1">
            <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-8 border-l-8 border-orange-600 relative group hover:shadow-2xl transition-shadow">
              <div class="absolute -top-4 -right-4 w-20 h-20 bg-orange-600 flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform">
                <Shield class="w-10 h-10 text-white" />
              </div>

              <h3 class="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Medium Priority</h3>
              
              <div class="space-y-6">
                <div v-for="alert in mediumSeverityAlerts" :key="alert.id" class="bg-white p-6 border-t-4 border-orange-600">
                  <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 bg-orange-600 flex items-center justify-center">
                      <component :is="alert.icon" class="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 class="text-xl font-black text-gray-900 uppercase">{{ alert.title }}</h4>
                      <p class="text-sm text-gray-600 font-semibold">Valid until {{ alert.validUntil }}</p>
                    </div>
                  </div>
                  
                  <p class="text-gray-700 font-bold leading-relaxed mb-4">{{ alert.description }}</p>
                  
                  <div class="space-y-2">
                    <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">Affected Routes</div>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="route in alert.affectedRoutes" :key="route" class="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
                        {{ route }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Low Severity Alerts -->
          <div class="lg:col-span-1">
            <div class="bg-gradient-to-br from-green-50 to-green-100 p-8 border-l-8 border-green-600 relative group hover:shadow-2xl transition-shadow">
              <div class="absolute -top-4 -right-4 w-20 h-20 bg-green-600 flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform">
                <Info class="w-10 h-10 text-white" />
              </div>

              <h3 class="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Low Priority</h3>
              
              <div class="space-y-6">
                <div v-for="alert in lowSeverityAlerts" :key="alert.id" class="bg-white p-6 border-t-4 border-green-600">
                  <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 bg-green-600 flex items-center justify-center">
                      <component :is="alert.icon" class="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 class="text-xl font-black text-gray-900 uppercase">{{ alert.title }}</h4>
                      <p class="text-sm text-gray-600 font-semibold">Valid until {{ alert.validUntil }}</p>
                    </div>
                  </div>
                  
                  <p class="text-gray-700 font-bold leading-relaxed mb-4">{{ alert.description }}</p>
                  
                  <div class="space-y-2">
                    <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">Affected Routes</div>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="route in alert.affectedRoutes" :key="route" class="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
                        {{ route }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Destination Advisories Section -->
    <section class="py-20 bg-gray-50 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-3 mb-4">
            <div class="w-4 h-4 bg-blue-600"></div>
            <div class="w-4 h-4 bg-green-600"></div>
            <div class="w-4 h-4 bg-orange-600"></div>
          </div>
          <h2 class="text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Destination Status</h2>
          <p class="text-xl text-gray-600 font-semibold">Current travel status for our destinations</p>
        </div>

        <!-- Destinations Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            v-for="destination in destinationAdvisories"
            :key="destination.id"
            class="group overflow-hidden bg-white border-4 border-gray-900 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] rounded-none p-0 gap-0"
          >
            <div class="relative h-64 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
              <!-- Background Image -->
              <img
                :src="destination.image"
                :alt="destination.destination"
                class="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              
              <!-- Status Badge -->
              <div class="absolute top-6 right-6 z-10">
                <span
                  :class="getStatusColor(destination.status)"
                  class="px-4 py-2 font-black text-xs uppercase tracking-wider shadow-lg backdrop-blur-sm border-2 border-white/30"
                >
                  {{ destination.status.toUpperCase() }}
                </span>
              </div>

              <!-- Risk Level Indicator -->
              <div class="absolute top-6 left-6 z-10">
                <div class="w-12 h-12 bg-white/90 backdrop-blur-sm border-2 border-white shadow-lg flex items-center justify-center">
                  <span :class="getRiskLevelColor(destination.riskLevel)" class="text-2xl font-black">
                    {{ destination.riskLevel === 'low' ? 'L' : destination.riskLevel === 'medium' ? 'M' : 'H' }}
                  </span>
                </div>
              </div>

              <!-- Decorative elements -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

              <!-- Content -->
              <div class="absolute bottom-6 left-6 right-6">
                <CardTitle class="text-3xl font-black text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {{ destination.destination }}
                </CardTitle>
                <CardDescription class="text-gray-200 font-bold text-lg">
                  {{ destination.code }} • Updated {{ destination.lastUpdated }}
                </CardDescription>
              </div>
            </div>

            <CardContent class="p-8 bg-white">
              <!-- Requirements -->
              <div class="mb-6">
                <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-3">Requirements</div>
                <div class="space-y-2">
                  <div v-for="requirement in destination.requirements" :key="requirement" class="flex items-center gap-2">
                    <CheckCircle class="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span class="text-sm font-bold text-gray-700">{{ requirement }}</span>
                  </div>
                </div>
              </div>

              <!-- Restrictions -->
              <div v-if="destination.restrictions.length > 0" class="mb-6">
                <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-3">Restrictions</div>
                <div class="space-y-2">
                  <div v-for="restriction in destination.restrictions" :key="restriction" class="flex items-center gap-2">
                    <XCircle class="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span class="text-sm font-bold text-gray-700">{{ restriction }}</span>
                  </div>
                </div>
              </div>

              <Button
                class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-14 font-black text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group-hover:scale-105 rounded-none"
              >
                <span class="flex items-center justify-center gap-2">
                  <Globe class="w-5 h-5" />
                  View Details
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Health & Safety Guidelines Section -->
    <section class="py-20 bg-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, #000 35px, #000 36px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="flex items-center gap-6 mb-16">
          <div class="w-2 h-24 bg-gradient-to-b from-green-600 to-blue-600"></div>
          <div>
            <h2 class="text-5xl font-black text-black mb-2 tracking-tight uppercase">Health & Safety</h2>
            <p class="text-lg text-gray-600 font-semibold">Essential guidelines for safe travel</p>
          </div>
        </div>

        <!-- Guidelines Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="guideline in healthGuidelines"
            :key="guideline.title"
            class="bg-white p-8 border-4 border-gray-900 relative group cursor-pointer transform hover:-translate-y-2 transition-all overflow-hidden"
          >
            <!-- Corner Accent -->
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-t-blue-600 border-r-[50px] border-r-transparent"></div>
            
            <div class="w-16 h-16 bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
              <component :is="guideline.icon" class="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </div>
            
            <h3 class="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight group-hover:text-gray-900 transition-colors">
              {{ guideline.title }}
            </h3>
            <p class="text-gray-600 font-bold leading-relaxed group-hover:text-gray-700 transition-colors">
              {{ guideline.description }}
            </p>
            
            <!-- Mandatory Badge -->
            <div v-if="guideline.mandatory" class="mt-4 inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-black uppercase tracking-wider">
              Mandatory
            </div>
            
            <!-- Shadow Block -->
            <div class="absolute top-2 left-2 w-full h-full bg-blue-600 -z-10 group-hover:top-3 group-hover:left-3 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Weather Advisories Section -->
    <section class="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white overflow-hidden relative">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #fff 20px, #fff 21px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center rounded-full px-4 py-2 mb-6" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
            <Thermometer class="w-4 h-4 mr-2 text-white" />
            <span class="font-semibold text-sm text-white">Weather Updates</span>
          </div>
          <h2 class="text-5xl font-black text-white mb-4 uppercase tracking-tighter">Seasonal Advisories</h2>
          <p class="text-xl text-white/80 font-semibold">Weather conditions affecting travel</p>
        </div>

        <!-- Weather Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="weather in weatherAdvisories"
            :key="weather.region"
            class="bg-white/10 backdrop-blur-md border-2 border-white/20 p-8 relative"
          >
            <div class="absolute -top-5 -left-5 w-14 h-14 bg-blue-600 border-4 border-white flex items-center justify-center">
              <Thermometer class="w-8 h-8 text-white" />
            </div>
            
            <div class="mt-4">
              <h3 class="text-2xl font-black text-white mb-4 uppercase tracking-tight">{{ weather.region }}</h3>
              <div class="mb-4">
                <span
                  :class="{
                    'bg-red-600': weather.severity === 'high',
                    'bg-orange-600': weather.severity === 'medium',
                    'bg-green-600': weather.severity === 'low'
                  }"
                  class="px-3 py-1 text-white text-xs font-black uppercase tracking-wider"
                >
                  {{ weather.severity.toUpperCase() }} RISK
                </span>
              </div>
              <p class="text-white/90 font-semibold leading-relaxed mb-4">{{ weather.description }}</p>
              <p class="text-blue-300 font-bold text-sm mb-4">{{ weather.travelImpact }}</p>
              <p class="text-white/70 text-sm font-semibold">{{ weather.period }}</p>
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
            <Bell class="w-12 h-12 text-white" />
          </div>
          
          <h2 class="text-5xl font-black text-white mb-6 uppercase tracking-tight">Stay Updated</h2>
          <p class="text-xl text-white/90 mb-12 font-semibold max-w-2xl mx-auto">
            Get real-time travel advisories and safety updates delivered to your inbox. Never miss important travel information!
          </p>
          
          <div class="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              @click="subscribeToAlerts"
              class="h-16 px-10 bg-white text-gray-900 hover:bg-gray-100 font-black text-lg uppercase tracking-wider shadow-2xl"
            >
              <Bell class="w-6 h-6 mr-3" />
              Subscribe to Alerts
            </Button>
            <Button 
              @click="contactSupport"
              class="h-16 px-10 bg-transparent border-4 border-white text-white hover:bg-white/10 font-black text-lg uppercase tracking-wider transition-all"
            >
              <Phone class="w-6 h-6 mr-3" />
              Contact Support
            </Button>
          </div>

          <div class="mt-12 flex items-center justify-center gap-6 text-sm">
            <div class="flex items-center gap-2">
              <CheckCircle class="w-5 h-5 text-green-400" />
              <span class="font-bold text-white/90">Real-time Updates</span>
            </div>
            <div class="w-px h-6 bg-white/30"></div>
            <div class="flex items-center gap-2">
              <CheckCircle class="w-5 h-5 text-green-400" />
              <span class="font-bold text-white/90">24/7 Support</span>
            </div>
            <div class="w-px h-6 bg-white/30"></div>
            <div class="flex items-center gap-2">
              <CheckCircle class="w-5 h-5 text-green-400" />
              <span class="font-bold text-white/90">Expert Guidance</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
