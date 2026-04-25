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

import singaporeImg from '@/assets/singapore.webp'
import tokyoImg from '@/assets/tokyo.webp'
import bangkokImg from '@/assets/bangkok.webp'
import seoulImg from '@/assets/seoul.webp'

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
  <div class="min-h-screen bg-white">
    <NavigationBar />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-16 lg:py-20 overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>

      <div class="relative max-w-7xl mx-auto px-4 text-center z-10 pt-16">
        <div class="inline-flex items-center px-3 py-1.5 mb-3 bg-white/10 backdrop-blur-md border-2 border-white/30">
          <AlertTriangle class="w-3.5 h-3.5 mr-1.5 text-white" />
          <span class="font-black text-xs text-white uppercase tracking-widest">Travel Advisories</span>
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 leading-tight uppercase tracking-tight">
          Stay Informed
        </h1>
        <p class="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto font-bold">
          Essential travel information and safety updates for your journey
        </p>
      </div>
    </section>

    <!-- Active Alerts Section -->
    <section class="py-8 bg-gray-50 relative overflow-hidden">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #000 20px, #000 21px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-6">
          <div class="flex items-center justify-center gap-2 mb-2">
            <div class="w-1.5 h-1.5 bg-red-600"></div>
            <div class="w-1.5 h-1.5 bg-orange-600"></div>
            <div class="w-1.5 h-1.5 bg-yellow-600"></div>
          </div>
          <h2 class="text-2xl md:text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Active Alerts</h2>
          <div class="flex items-center justify-center gap-2">
            <div class="h-0.5 w-12 bg-gray-900"></div>
            <p class="text-xs text-gray-600 font-bold uppercase tracking-wider">Current Advisories & Warnings</p>
            <div class="h-0.5 w-12 bg-gray-900"></div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <!-- High Severity Alerts -->
          <div>
            <div class="bg-white border-4 border-red-600 relative group hover:shadow-xl transition-shadow">
              <div class="absolute -top-2 -right-2 w-10 h-10 bg-red-600 flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform">
                <AlertTriangle class="w-5 h-5 text-white" />
              </div>

              <div class="bg-red-600 px-3 py-2">
                <h3 class="text-sm font-black text-white uppercase tracking-wider">High Priority</h3>
              </div>

              <div class="p-3 space-y-3">
                <div v-for="alert in highSeverityAlerts" :key="alert.id" class="bg-red-50 border-l-4 border-red-600 p-3">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-8 h-8 bg-red-600 flex items-center justify-center flex-shrink-0">
                      <component :is="alert.icon" class="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 class="text-xs font-black text-gray-900 uppercase">{{ alert.title }}</h4>
                      <p class="text-[10px] text-gray-600 font-bold">Valid until {{ alert.validUntil }}</p>
                    </div>
                  </div>

                  <p class="text-xs text-gray-700 font-bold leading-relaxed mb-2">{{ alert.description }}</p>

                  <div>
                    <div class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Affected Routes</div>
                    <div class="flex flex-wrap gap-1">
                      <span v-for="route in alert.affectedRoutes" :key="route" class="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-wider">
                        {{ route }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="absolute top-1 left-1 w-full h-full bg-red-600 -z-10 group-hover:top-1.5 group-hover:left-1.5 transition-all duration-300"></div>
            </div>
          </div>

          <!-- Medium Severity Alerts -->
          <div>
            <div class="bg-white border-4 border-orange-600 relative group hover:shadow-xl transition-shadow">
              <div class="absolute -top-2 -right-2 w-10 h-10 bg-orange-600 flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform">
                <Shield class="w-5 h-5 text-white" />
              </div>

              <div class="bg-orange-600 px-3 py-2">
                <h3 class="text-sm font-black text-white uppercase tracking-wider">Medium Priority</h3>
              </div>

              <div class="p-3 space-y-3">
                <div v-for="alert in mediumSeverityAlerts" :key="alert.id" class="bg-orange-50 border-l-4 border-orange-600 p-3">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-8 h-8 bg-orange-600 flex items-center justify-center flex-shrink-0">
                      <component :is="alert.icon" class="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 class="text-xs font-black text-gray-900 uppercase">{{ alert.title }}</h4>
                      <p class="text-[10px] text-gray-600 font-bold">Valid until {{ alert.validUntil }}</p>
                    </div>
                  </div>

                  <p class="text-xs text-gray-700 font-bold leading-relaxed mb-2">{{ alert.description }}</p>

                  <div>
                    <div class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Affected Routes</div>
                    <div class="flex flex-wrap gap-1">
                      <span v-for="route in alert.affectedRoutes" :key="route" class="px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-black uppercase tracking-wider">
                        {{ route }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="absolute top-1 left-1 w-full h-full bg-orange-600 -z-10 group-hover:top-1.5 group-hover:left-1.5 transition-all duration-300"></div>
            </div>
          </div>

          <!-- Low Severity Alerts -->
          <div>
            <div class="bg-white border-4 border-green-600 relative group hover:shadow-xl transition-shadow">
              <div class="absolute -top-2 -right-2 w-10 h-10 bg-green-600 flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform">
                <Info class="w-5 h-5 text-white" />
              </div>

              <div class="bg-green-600 px-3 py-2">
                <h3 class="text-sm font-black text-white uppercase tracking-wider">Low Priority</h3>
              </div>

              <div class="p-3 space-y-3">
                <div v-for="alert in lowSeverityAlerts" :key="alert.id" class="bg-green-50 border-l-4 border-green-600 p-3">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-8 h-8 bg-green-600 flex items-center justify-center flex-shrink-0">
                      <component :is="alert.icon" class="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 class="text-xs font-black text-gray-900 uppercase">{{ alert.title }}</h4>
                      <p class="text-[10px] text-gray-600 font-bold">Valid until {{ alert.validUntil }}</p>
                    </div>
                  </div>

                  <p class="text-xs text-gray-700 font-bold leading-relaxed mb-2">{{ alert.description }}</p>

                  <div>
                    <div class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Affected Routes</div>
                    <div class="flex flex-wrap gap-1">
                      <span v-for="route in alert.affectedRoutes" :key="route" class="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-wider">
                        {{ route }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="absolute top-1 left-1 w-full h-full bg-green-600 -z-10 group-hover:top-1.5 group-hover:left-1.5 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Destination Advisories Section -->
    <section class="py-8 bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white overflow-hidden relative">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #fff 20px, #fff 21px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-6">
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-none mb-4 border-2 border-white/20">
            <Globe class="w-3.5 h-3.5 text-blue-400" />
            <span class="text-xs font-black text-blue-300 uppercase tracking-widest">Destination Status</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tighter">
            Destination Status
          </h2>
          <p class="text-xs text-gray-300 max-w-2xl mx-auto font-bold">
            Current travel status for our destinations
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Card
            v-for="destination in destinationAdvisories"
            :key="destination.id"
            class="group overflow-hidden bg-white border-4 border-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-0 gap-0 relative"
          >
            <div class="relative h-40 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
              <img
                :src="destination.image"
                :alt="destination.destination"
                class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-300"
              />

              <div class="absolute top-2 right-2 z-10">
                <span
                  :class="getStatusColor(destination.status)"
                  class="px-2 py-0.5 font-black text-[10px] uppercase tracking-wider border-2 border-white/30"
                >
                  {{ destination.status.toUpperCase() }}
                </span>
              </div>

              <div class="absolute top-2 left-2 z-10">
                <div class="w-8 h-8 bg-white/90 backdrop-blur-sm border-2 border-white flex items-center justify-center">
                  <span :class="getRiskLevelColor(destination.riskLevel)" class="text-xs font-black">
                    {{ destination.riskLevel === 'low' ? 'L' : destination.riskLevel === 'medium' ? 'M' : 'H' }}
                  </span>
                </div>
              </div>

              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div class="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full -translate-y-8 translate-x-8"></div>

              <div class="absolute bottom-2 left-2 right-2">
                <CardTitle class="text-lg font-black text-white mb-0.5 group-hover:text-blue-300 transition-colors duration-300">
                  {{ destination.destination }}
                </CardTitle>
                <CardDescription class="text-gray-200 font-bold text-xs">
                  {{ destination.code }} • Updated {{ destination.lastUpdated }}
                </CardDescription>
              </div>
            </div>

            <CardContent class="p-3 bg-white">
              <div class="mb-3">
                <div class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1.5">Requirements</div>
                <div class="space-y-1">
                  <div v-for="requirement in destination.requirements" :key="requirement" class="flex items-center gap-1.5">
                    <CheckCircle class="w-3 h-3 text-green-600 flex-shrink-0" />
                    <span class="text-xs font-bold text-gray-700">{{ requirement }}</span>
                  </div>
                </div>
              </div>

              <div v-if="destination.restrictions.length > 0" class="mb-3">
                <div class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1.5">Restrictions</div>
                <div class="space-y-1">
                  <div v-for="restriction in destination.restrictions" :key="restriction" class="flex items-center gap-1.5">
                    <XCircle class="w-3 h-3 text-red-600 flex-shrink-0" />
                    <span class="text-xs font-bold text-gray-700">{{ restriction }}</span>
                  </div>
                </div>
              </div>

              <Button
                class="w-full h-9 text-xs font-black bg-blue-600 hover:bg-blue-700 text-white rounded-none uppercase tracking-wider transition-all duration-300 border-4 border-gray-900 transform hover:-translate-y-1"
              >
                <span class="flex items-center justify-center gap-1.5">
                  <Globe class="w-3.5 h-3.5" />
                  View Details
                </span>
              </Button>
            </CardContent>

            <div class="absolute top-1 left-1 w-full h-full bg-gray-900 -z-10 group-hover:top-1.5 group-hover:left-1.5 transition-all duration-300"></div>
          </Card>
        </div>
      </div>
    </section>

    <!-- Health & Safety Guidelines Section -->
    <section class="py-8 bg-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #000 20px, #000 21px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-6">
          <div class="flex items-center justify-center gap-2 mb-2">
            <div class="w-1.5 h-1.5 bg-green-600"></div>
            <div class="w-1.5 h-1.5 bg-blue-600"></div>
            <div class="w-1.5 h-1.5 bg-purple-600"></div>
          </div>
          <h2 class="text-2xl md:text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Health & Safety</h2>
          <div class="flex items-center justify-center gap-2">
            <div class="h-0.5 w-12 bg-gray-900"></div>
            <p class="text-xs text-gray-600 font-bold uppercase tracking-wider">Essential Guidelines</p>
            <div class="h-0.5 w-12 bg-gray-900"></div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="guideline in healthGuidelines"
            :key="guideline.title"
            class="bg-white p-4 border-4 border-gray-900 relative group cursor-pointer transform hover:-translate-y-2 transition-all overflow-hidden"
            :class="{
              'hover:bg-green-600': guideline.title === 'COVID-19 Vaccination',
              'hover:bg-blue-600': guideline.title === 'Health Declaration',
              'hover:bg-purple-600': guideline.title === 'Face Masks',
              'hover:bg-orange-600': guideline.title === 'Social Distancing',
            }"
          >
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[25px] border-t-blue-600 border-r-[25px] border-r-transparent"></div>

            <div class="w-10 h-10 bg-blue-100 flex items-center justify-center mb-3 group-hover:bg-white transition-colors duration-300">
              <component :is="guideline.icon" class="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </div>

            <h3 class="text-sm font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-white transition-colors">
              {{ guideline.title }}
            </h3>
            <p class="text-xs text-gray-600 font-bold leading-relaxed group-hover:text-white transition-colors">
              {{ guideline.description }}
            </p>

            <div v-if="guideline.mandatory" class="mt-2 inline-block px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-wider group-hover:bg-red-600 group-hover:text-white transition-colors">
              Mandatory
            </div>

            <div class="absolute top-1 left-1 w-full h-full bg-blue-600 -z-10 group-hover:top-1.5 group-hover:left-1.5 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Weather Advisories Section -->
    <section class="py-8 bg-gray-50 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-6">
          <div class="inline-flex items-center gap-2 bg-gray-900 text-white px-3 py-1.5 border-4 border-gray-900 mb-4">
            <Thermometer class="w-3.5 h-3.5" />
            <span class="font-black text-xs uppercase tracking-widest">Weather Updates</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Seasonal Advisories</h2>
          <div class="flex items-center justify-center gap-2">
            <div class="h-0.5 w-12 bg-gray-900"></div>
            <p class="text-xs text-gray-600 font-bold uppercase tracking-wider">Weather Conditions Affecting Travel</p>
            <div class="h-0.5 w-12 bg-gray-900"></div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            v-for="weather in weatherAdvisories"
            :key="weather.region"
            class="bg-white border-4 border-gray-900 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
          >
            <div
              :class="{
                'bg-red-600': weather.severity === 'high',
                'bg-orange-600': weather.severity === 'medium',
                'bg-green-600': weather.severity === 'low'
              }"
              class="px-3 py-2 flex items-center justify-between"
            >
              <h3 class="text-sm font-black text-white uppercase tracking-tight">{{ weather.region }}</h3>
              <Thermometer class="w-4 h-4 text-white" />
            </div>

            <div class="p-4">
              <div class="mb-2">
                <span
                  :class="{
                    'bg-red-100 text-red-700': weather.severity === 'high',
                    'bg-orange-100 text-orange-700': weather.severity === 'medium',
                    'bg-green-100 text-green-700': weather.severity === 'low'
                  }"
                  class="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"
                >
                  {{ weather.condition }} • {{ weather.severity.toUpperCase() }} RISK
                </span>
              </div>
              <p class="text-xs text-gray-700 font-bold leading-relaxed mb-2">{{ weather.description }}</p>
              <p class="text-xs text-blue-600 font-black mb-1">{{ weather.travelImpact }}</p>
              <p class="text-[10px] text-gray-500 font-bold">{{ weather.period }}</p>
            </div>

            <div class="absolute top-1 left-1 w-full h-full bg-gray-900 -z-10 group-hover:top-1.5 group-hover:left-1.5 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white py-8 overflow-hidden">
      <div class="absolute top-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div class="relative max-w-4xl mx-auto px-4 text-center z-10">
        <div class="mb-3">
          <span class="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1.5 border-2 border-white/30">
            <Bell class="w-3.5 h-3.5" />
            <span class="text-xs font-black uppercase tracking-widest">Stay Updated</span>
          </span>
        </div>
        <h2 class="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight">Get Travel Alerts</h2>
        <p class="text-xs text-white/80 mb-6 max-w-lg mx-auto font-bold leading-relaxed">
          Get real-time travel advisories and safety updates delivered to your inbox. Never miss important travel information!
        </p>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            @click="subscribeToAlerts"
            class="h-10 px-5 bg-white text-gray-900 hover:bg-gray-100 font-black text-xs uppercase tracking-wider border-4 border-gray-900 shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            <Bell class="w-3.5 h-3.5 mr-1.5" />
            Subscribe to Alerts
          </Button>
          <Button 
            @click="contactSupport"
            class="h-10 px-5 bg-transparent border-4 border-white text-white hover:bg-white/10 font-black text-xs uppercase tracking-wider transition-all"
          >
            <Phone class="w-3.5 h-3.5 mr-1.5" />
            Contact Support
          </Button>
        </div>

        <div class="mt-6 flex items-center justify-center gap-4 text-xs">
          <div class="flex items-center gap-1.5">
            <CheckCircle class="w-3.5 h-3.5 text-green-400" />
            <span class="font-bold text-white/90">Real-time Updates</span>
          </div>
          <div class="w-px h-4 bg-white/30"></div>
          <div class="flex items-center gap-1.5">
            <CheckCircle class="w-3.5 h-3.5 text-green-400" />
            <span class="font-bold text-white/90">24/7 Support</span>
          </div>
          <div class="w-px h-4 bg-white/30"></div>
          <div class="flex items-center gap-1.5">
            <CheckCircle class="w-3.5 h-3.5 text-green-400" />
            <span class="font-bold text-white/90">Expert Guidance</span>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>