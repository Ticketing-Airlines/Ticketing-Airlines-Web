<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { 
  FileText, 
  Shield, 
  Globe, 
  CheckCircle, 
  Calendar,
  Download,
  CreditCard,
  FileCheck,
  HelpCircle
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

import singaporeImg from '@/assets/singapore.webp'
import tokyoImg from '@/assets/tokyo.webp'
import bangkokImg from '@/assets/bangkok.webp'
import seoulImg from '@/assets/seoul.webp'

const passportRequirements = ref([
  {
    id: 1,
    title: "Passport Validity",
    description: "Must be valid for at least 6 months from departure date",
    icon: Calendar,
    mandatory: true,
    details: "Most countries require 6 months validity, some require 3 months"
  },
  {
    id: 2,
    title: "Blank Pages",
    description: "At least 2-4 blank pages for visa stamps",
    icon: FileText,
    mandatory: true,
    details: "Required for visa stamps and entry/exit stamps"
  },
  {
    id: 3,
    title: "Good Condition",
    description: "Passport must be in good physical condition",
    icon: Shield,
    mandatory: true,
    details: "No water damage, tears, or significant wear"
  }
])

const visaRequirements = ref([
  {
    id: 1,
    country: "Singapore",
    code: "SIN",
    visaRequired: false,
    validity: "30 days",
    requirements: ["Passport valid 6 months", "Return ticket", "Sufficient funds"],
    processingTime: "Not applicable",
    cost: "Free",
    status: "visa-free",
    image: singaporeImg
  },
  {
    id: 2,
    country: "Japan",
    code: "NRT",
    visaRequired: true,
    validity: "90 days",
    requirements: ["Passport valid 6 months", "Completed application", "Photo 45x45mm", "Bank statement", "Itinerary"],
    processingTime: "5-7 business days",
    cost: "₱1,200",
    status: "visa-required",
    image: tokyoImg
  },
  {
    id: 3,
    country: "Thailand",
    code: "BKK",
    visaRequired: false,
    validity: "30 days",
    requirements: ["Passport valid 6 months", "Return ticket", "Hotel booking"],
    processingTime: "Not applicable",
    cost: "Free",
    status: "visa-free",
    image: bangkokImg
  },
  {
    id: 4,
    country: "South Korea",
    code: "ICN",
    visaRequired: false,
    validity: "90 days",
    requirements: ["Passport valid 6 months", "K-ETA application", "Return ticket"],
    processingTime: "K-ETA: 24-72 hours",
    cost: "K-ETA: ₱1,000",
    status: "eta-required",
    image: seoulImg
  }
])

const healthCertificates = ref([
  {
    id: 1,
    title: "COVID-19 Vaccination",
    description: "Proof of vaccination may be required",
    icon: Shield,
    mandatory: false,
    details: "Digital or physical vaccination certificate"
  },
  {
    id: 2,
    title: "Yellow Fever Certificate",
    description: "Required for certain African countries",
    icon: FileCheck,
    mandatory: false,
    details: "Valid for 10 years from vaccination date"
  },
  {
    id: 3,
    title: "Health Declaration",
    description: "Complete health forms before travel",
    icon: FileText,
    mandatory: true,
    details: "Usually completed online or at airport"
  }
])

const travelInsurance = ref([
  {
    id: 1,
    type: "Basic Coverage",
    price: "₱500",
    coverage: "Medical emergencies, trip cancellation",
    features: ["Up to ₱500,000 medical", "Trip cancellation", "Baggage loss"],
    recommended: false
  },
  {
    id: 2,
    type: "Comprehensive",
    price: "₱1,200",
    coverage: "Full protection including COVID-19",
    features: ["Up to ₱2,000,000 medical", "COVID-19 coverage", "Trip delay", "Emergency evacuation"],
    recommended: true
  },
  {
    id: 3,
    type: "Premium Coverage",
    price: "₱2,500",
    coverage: "Maximum protection for business travel",
    features: ["Up to ₱5,000,000 medical", "Business equipment", "Rental car coverage", "24/7 concierge"],
    recommended: false
  }
])

const documentChecklist = ref([
  { id: 1, item: "Valid Passport (6+ months)", completed: false, mandatory: true },
  { id: 2, item: "Visa (if required)", completed: false, mandatory: false },
  { id: 3, item: "Travel Insurance", completed: false, mandatory: false },
  { id: 4, item: "Flight Tickets", completed: false, mandatory: true },
  { id: 5, item: "Hotel Bookings", completed: false, mandatory: false },
  { id: 6, item: "Health Certificates", completed: false, mandatory: false },
  { id: 7, item: "Emergency Contacts", completed: false, mandatory: true },
  { id: 8, item: "Copies of Documents", completed: false, mandatory: true }
])

const completedItems = computed(() => documentChecklist.value.filter(item => item.completed).length)
const totalItems = computed(() => documentChecklist.value.length)
const progressPercentage = computed(() => Math.round((completedItems.value / totalItems.value) * 100))

const toggleChecklistItem = (id: number) => {
  const item = documentChecklist.value.find(item => item.id === id)
  if (item) {
    item.completed = !item.completed
  }
}

const getVisaStatusColor = (status: string) => {
  switch (status) {
    case 'visa-free': return 'text-green-600 bg-green-100 border-green-600'
    case 'visa-required': return 'text-red-600 bg-red-100 border-red-600'
    case 'eta-required': return 'text-orange-600 bg-orange-100 border-orange-600'
    default: return 'text-gray-600 bg-gray-100 border-gray-600'
  }
}

const getVisaStatusText = (status: string) => {
  switch (status) {
    case 'visa-free': return 'VISA-FREE'
    case 'visa-required': return 'VISA REQUIRED'
    case 'eta-required': return 'ETA REQUIRED'
    default: return 'CHECK REQUIREMENTS'
  }
}

const downloadChecklist = () => {
  console.log('Downloading checklist...')
  alert('Checklist downloaded! Print and check off items as you prepare.')
}

const contactSupport = () => {
  console.log('Contacting support...')
  alert('Redirecting to travel documents support...')
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
          <FileText class="w-3.5 h-3.5 mr-1.5 text-white" />
          <span class="font-black text-xs text-white uppercase tracking-widest">Travel Documents</span>
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 leading-tight uppercase tracking-tight">
          Travel Ready
        </h1>
        <p class="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto font-bold">
          Everything you need to know about travel documents and requirements
        </p>
      </div>
    </section>

    <!-- Passport Requirements Section -->
    <section class="py-8 bg-gray-50 relative overflow-hidden">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #000 20px, #000 21px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-6">
          <div class="flex items-center justify-center gap-2 mb-2">
            <div class="w-1.5 h-1.5 bg-blue-600"></div>
            <div class="w-1.5 h-1.5 bg-purple-600"></div>
            <div class="w-1.5 h-1.5 bg-green-600"></div>
          </div>
          <h2 class="text-2xl md:text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Passport Requirements</h2>
          <div class="flex items-center justify-center gap-2">
            <div class="h-0.5 w-12 bg-gray-900"></div>
            <p class="text-xs text-gray-600 font-bold uppercase tracking-wider">Essential Passport Info</p>
            <div class="h-0.5 w-12 bg-gray-900"></div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            v-for="requirement in passportRequirements"
            :key="requirement.id"
            class="bg-white p-4 border-4 border-gray-900 relative group cursor-pointer transform hover:-translate-y-2 transition-all hover:bg-blue-600"
          >
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[25px] border-t-blue-600 border-r-[25px] border-r-transparent"></div>

            <div class="w-10 h-10 bg-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-600 transition-colors duration-300">
              <component :is="requirement.icon" class="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </div>

            <h3 class="text-sm font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-white transition-colors">
              {{ requirement.title }}
            </h3>
            <p class="text-xs text-gray-600 font-bold leading-relaxed mb-2 group-hover:text-white transition-colors">
              {{ requirement.description }}
            </p>
            <p class="text-[10px] text-gray-500 font-semibold group-hover:text-white transition-colors">
              {{ requirement.details }}
            </p>

            <div v-if="requirement.mandatory" class="mt-2 inline-block px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-wider group-hover:bg-red-600 group-hover:text-white transition-colors">
              Mandatory
            </div>

            <div class="absolute top-1 left-1 w-full h-full bg-blue-600 -z-10 group-hover:top-1.5 group-hover:left-1.5 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Visa Requirements Section -->
    <section class="py-8 bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white overflow-hidden relative">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #fff 20px, #fff 21px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-6">
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-none mb-4 border-2 border-white/20">
            <Globe class="w-3.5 h-3.5 text-blue-400" />
            <span class="text-xs font-black text-blue-300 uppercase tracking-widest">Visa Information</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tighter">
            Visa Requirements
          </h2>
          <p class="text-xs text-gray-300 max-w-2xl mx-auto font-bold">
            Country-specific visa information and requirements
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="visa in visaRequirements"
            :key="visa.id"
            class="group overflow-hidden bg-white border-4 border-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative flex flex-col"
          >
            <div class="relative h-40 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden flex-shrink-0">
              <img
                :src="visa.image"
                :alt="visa.country"
                class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-300"
              />

              <div class="absolute top-2 right-2 z-10">
                <span
                  :class="getVisaStatusColor(visa.status)"
                  class="px-2 py-0.5 font-black text-[10px] uppercase tracking-wider border-2 border-white/30"
                >
                  {{ getVisaStatusText(visa.status) }}
                </span>
              </div>

              <div class="absolute top-2 left-2 z-10">
                <div class="w-8 h-8 bg-white/90 backdrop-blur-sm border-2 border-white flex items-center justify-center">
                  <span class="text-blue-600 text-xs font-black">{{ visa.code }}</span>
                </div>
              </div>

              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div class="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full -translate-y-8 translate-x-8"></div>

              <div class="absolute bottom-2 left-2 right-2">
                <CardTitle class="text-lg font-black text-white mb-0.5 group-hover:text-blue-300 transition-colors duration-300">
                  {{ visa.country }}
                </CardTitle>
                <CardDescription class="text-gray-200 font-bold text-xs">
                  {{ visa.validity }} stay &bull; {{ visa.cost }}
                </CardDescription>
              </div>
            </div>

            <div class="p-3 bg-white flex flex-col flex-1">
              <!-- Requirements (grows to fill space) -->
              <div class="flex-1 mb-3">
                <div class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1.5">Requirements</div>
                <div class="space-y-1">
                  <div v-for="requirement in visa.requirements" :key="requirement" class="flex items-center gap-1.5">
                    <CheckCircle class="w-3 h-3 text-green-600 flex-shrink-0" />
                    <span class="text-xs font-bold text-gray-700">{{ requirement }}</span>
                  </div>
                </div>
              </div>

              <!-- Processing Info (fixed, always aligned) -->
              <div class="space-y-1 border-t-2 border-gray-900 pt-2 mb-3">
                <div class="flex justify-between items-center">
                  <span class="text-[10px] text-gray-500 font-black uppercase tracking-widest">Processing</span>
                  <span class="text-xs font-black text-gray-900">{{ visa.processingTime }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-[10px] text-gray-500 font-black uppercase tracking-widest">Cost</span>
                  <span class="text-xs font-black text-green-600">{{ visa.cost }}</span>
                </div>
              </div>

              <!-- Button pinned to bottom -->
              <div class="mt-auto">
                <Button
                  class="w-full h-9 text-xs font-black bg-blue-600 hover:bg-blue-700 text-white rounded-none uppercase tracking-wider transition-all duration-300 border-4 border-gray-900 transform hover:-translate-y-1"
                >
                  <span class="flex items-center justify-center gap-1.5">
                    <Globe class="w-3.5 h-3.5" />
                    View Details
                  </span>
                </Button>
              </div>
            </div>

            <div class="absolute top-1 left-1 w-full h-full bg-gray-900 -z-10 group-hover:top-1.5 group-hover:left-1.5 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Travel Checklist Section -->
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
          <h2 class="text-2xl md:text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Travel Checklist</h2>
          <div class="flex items-center justify-center gap-2">
            <div class="h-0.5 w-12 bg-gray-900"></div>
            <p class="text-xs text-gray-600 font-bold uppercase tracking-wider">Make Sure You Have Everything</p>
            <div class="h-0.5 w-12 bg-gray-900"></div>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="bg-white p-4 border-4 border-gray-900 mb-4 relative overflow-hidden">
          <div class="flex items-center justify-between mb-3">
            <div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight">Progress</h3>
              <p class="text-[10px] text-gray-600 font-bold">{{ completedItems }} of {{ totalItems }} items completed</p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-black text-blue-600">{{ progressPercentage }}%</div>
            </div>
          </div>

          <div class="w-full bg-gray-200 h-6 border-4 border-gray-900 relative overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-500 ease-out"
              :style="{ width: `${progressPercentage}%` }"
            ></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-white font-black text-[10px] uppercase tracking-wider drop-shadow">
                {{ progressPercentage }}% Complete
              </span>
            </div>
          </div>
        </div>

        <!-- Checklist Items -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div
            v-for="item in documentChecklist"
            :key="item.id"
            @click="toggleChecklistItem(item.id)"
            class="p-3 border-4 cursor-pointer transform hover:-translate-y-1 transition-all duration-300 relative group"
            :class="item.completed ? 'bg-green-50 border-green-600 hover:bg-green-600' : 'bg-white border-gray-900 hover:bg-blue-600'"
          >
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 border-4 flex items-center justify-center transition-all duration-300 flex-shrink-0"
                   :class="item.completed ? 'bg-green-600 border-green-600' : 'border-gray-900 group-hover:border-white'">
                <CheckCircle v-if="item.completed" class="w-4 h-4 text-white" />
                <div v-else class="w-2 h-2 bg-transparent group-hover:bg-white transition-colors duration-300"></div>
              </div>

              <div class="flex-1 min-w-0">
                <h4 class="text-xs font-black uppercase tracking-tight truncate group-hover:text-white transition-colors duration-300"
                    :class="item.completed ? 'line-through text-green-700' : 'text-gray-900'">
                  {{ item.item }}
                </h4>
                <div class="flex items-center gap-1.5 mt-0.5">
                  <span v-if="item.mandatory" class="px-1.5 py-0.5 bg-red-100 text-red-700 text-[9px] font-black uppercase tracking-wider group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                    Mandatory
                  </span>
                  <span v-else class="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[9px] font-black uppercase tracking-wider group-hover:bg-gray-500 group-hover:text-white transition-colors duration-300">
                    Optional
                  </span>
                </div>
              </div>
            </div>

            <div class="absolute top-1 left-1 w-full h-full -z-10 transition-all duration-300"
                 :class="item.completed ? 'bg-green-600' : 'bg-blue-600'"></div>
          </div>
        </div>

        <!-- Download Button -->
        <div class="text-center mt-6">
          <Button
            @click="downloadChecklist"
            class="inline-flex items-center justify-center gap-2 h-10 px-5 font-black text-xs bg-blue-600 hover:bg-blue-700 text-white border-4 border-gray-900 rounded-none transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
          >
            <Download class="w-4 h-4" />
            Download Checklist
          </Button>
        </div>
      </div>
    </section>

    <!-- Travel Insurance Section -->
    <section class="py-8 bg-gray-50 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-6">
          <div class="inline-flex items-center gap-2 bg-gray-900 text-white px-3 py-1.5 border-4 border-gray-900 mb-4">
            <Shield class="w-3.5 h-3.5" />
            <span class="font-black text-xs uppercase tracking-widest">Travel Protection</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Travel Insurance</h2>
          <div class="flex items-center justify-center gap-2">
            <div class="h-0.5 w-12 bg-gray-900"></div>
            <p class="text-xs text-gray-600 font-bold uppercase tracking-wider">Protect Your Journey</p>
            <div class="h-0.5 w-12 bg-gray-900"></div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            v-for="plan in travelInsurance"
            :key="plan.id"
            class="bg-white border-4 border-gray-900 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 flex flex-col"
            :class="[
              plan.recommended ? 'ring-4 ring-green-500 ring-offset-2 hover:bg-green-600' : 'hover:bg-blue-600'
            ]"
          >
            <!-- Recommended Badge -->
            <div v-if="plan.recommended" class="bg-green-600 px-3 py-1.5 flex items-center justify-center flex-shrink-0">
              <span class="text-xs font-black text-white uppercase tracking-wider">Recommended</span>
            </div>

            <div class="p-4 flex flex-col flex-1">
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-1 group-hover:text-white transition-colors">{{ plan.type }}</h3>
              <div class="text-2xl font-black text-gray-900 mb-0.5 group-hover:text-white transition-colors">{{ plan.price }}</div>
              <p class="text-[10px] text-gray-500 font-bold mb-3 group-hover:text-white transition-colors">per person</p>

              <p class="text-xs text-gray-600 font-bold leading-relaxed mb-3 group-hover:text-white transition-colors">{{ plan.coverage }}</p>

              <!-- Features (grows to fill space) -->
              <div class="space-y-1.5 mb-4 flex-1">
                <div v-for="feature in plan.features" :key="feature" class="flex items-center gap-1.5">
                  <CheckCircle class="w-3 h-3 text-green-600 group-hover:text-green-300 flex-shrink-0 transition-colors" />
                  <span class="text-xs font-bold text-gray-700 group-hover:text-white transition-colors">{{ feature }}</span>
                </div>
              </div>

              <!-- Button pinned to bottom -->
              <div class="mt-auto">
                <Button
                  class="w-full h-9 text-xs font-black uppercase tracking-wider transition-all duration-300 border-4 border-gray-900 transform hover:-translate-y-1 rounded-none group-hover:border-white"
                  :class="plan.recommended ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-white text-gray-900 hover:bg-gray-100'"
                >
                  <span class="flex items-center justify-center gap-1.5">
                    <CreditCard class="w-3.5 h-3.5" />
                    Get Coverage
                  </span>
                </Button>
              </div>
            </div>

            <div class="absolute top-1 left-1 w-full h-full bg-gray-900 -z-10 group-hover:top-1.5 group-hover:left-1.5 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Health Certificates Section -->
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
          <h2 class="text-2xl md:text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Health Certificates</h2>
          <div class="flex items-center justify-center gap-2">
            <div class="h-0.5 w-12 bg-gray-900"></div>
            <p class="text-xs text-gray-600 font-bold uppercase tracking-wider">Health Documentation Requirements</p>
            <div class="h-0.5 w-12 bg-gray-900"></div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            v-for="certificate in healthCertificates"
            :key="certificate.id"
            class="bg-white p-4 border-4 border-gray-900 relative group cursor-pointer transform hover:-translate-y-2 transition-all hover:bg-green-600"
          >
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[25px] border-t-green-600 border-r-[25px] border-r-transparent"></div>

            <div class="w-10 h-10 bg-green-100 flex items-center justify-center mb-3 group-hover:bg-green-600 transition-colors duration-300">
              <component :is="certificate.icon" class="w-5 h-5 text-green-600 group-hover:text-white transition-colors duration-300" />
            </div>

            <h3 class="text-sm font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-white transition-colors">
              {{ certificate.title }}
            </h3>
            <p class="text-xs text-gray-600 font-bold leading-relaxed mb-2 group-hover:text-white transition-colors">
              {{ certificate.description }}
            </p>
            <p class="text-[10px] text-gray-500 font-semibold group-hover:text-white transition-colors">
              {{ certificate.details }}
            </p>

            <div class="mt-2">
              <div v-if="certificate.mandatory" class="inline-block px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-wider group-hover:bg-red-600 group-hover:text-white transition-colors">
                Mandatory
              </div>
              <div v-else class="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-black uppercase tracking-wider group-hover:bg-gray-500 group-hover:text-white transition-colors">
                Optional
              </div>
            </div>

            <div class="absolute top-1 left-1 w-full h-full bg-green-600 -z-10 group-hover:top-1.5 group-hover:left-1.5 transition-all duration-300"></div>
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
            <HelpCircle class="w-3.5 h-3.5" />
            <span class="text-xs font-black uppercase tracking-widest">Need Help?</span>
          </span>
        </div>
        <h2 class="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight">Travel Documents Support</h2>
        <p class="text-xs text-white/80 mb-6 max-w-lg mx-auto font-bold leading-relaxed">
          Our travel documents experts are here to help you prepare. Get personalized assistance with visa applications, document requirements, and travel planning.
        </p>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            @click="contactSupport"
            class="h-10 px-5 bg-white text-gray-900 hover:bg-gray-100 font-black text-xs uppercase tracking-wider border-4 border-gray-900 shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            <HelpCircle class="w-3.5 h-3.5 mr-1.5" />
            Get Expert Help
          </Button>
          <Button 
            class="h-10 px-5 bg-transparent border-4 border-white text-white hover:bg-white/10 font-black text-xs uppercase tracking-wider transition-all"
          >
            <Download class="w-3.5 h-3.5 mr-1.5" />
            Download Guide
          </Button>
        </div>

        <div class="mt-6 flex items-center justify-center gap-4 text-xs">
          <div class="flex items-center gap-1.5">
            <CheckCircle class="w-3.5 h-3.5 text-green-400" />
            <span class="font-bold text-white/90">Expert Guidance</span>
          </div>
          <div class="w-px h-4 bg-white/30"></div>
          <div class="flex items-center gap-1.5">
            <CheckCircle class="w-3.5 h-3.5 text-green-400" />
            <span class="font-bold text-white/90">24/7 Support</span>
          </div>
          <div class="w-px h-4 bg-white/30"></div>
          <div class="flex items-center gap-1.5">
            <CheckCircle class="w-3.5 h-3.5 text-green-400" />
            <span class="font-bold text-white/90">Free Consultation</span>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>