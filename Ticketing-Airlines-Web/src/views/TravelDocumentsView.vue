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

// Import destination images
import singaporeImg from '@/assets/singapore.webp'
import tokyoImg from '@/assets/tokyo.webp'
import bangkokImg from '@/assets/bangkok.webp'
import seoulImg from '@/assets/seoul.webp'

// Travel Documents Data
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
    type: "Comprehensive Coverage",
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

// Computed properties
const completedItems = computed(() => documentChecklist.value.filter(item => item.completed).length)
const totalItems = computed(() => documentChecklist.value.length)
const progressPercentage = computed(() => Math.round((completedItems.value / totalItems.value) * 100))

// Methods
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
          <FileText class="w-4 h-4 mr-2 text-white" />
          <span class="font-semibold text-sm text-white">Travel Documents</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Travel Ready
        </h1>
        <p class="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto font-medium">
          Everything you need to know about travel documents and requirements
        </p>
      </div>
    </section>

    <!-- Passport Requirements Section -->
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
            <h2 class="text-5xl font-black text-black mb-2 tracking-tight uppercase">Passport Requirements</h2>
            <p class="text-lg text-gray-600 font-semibold">Essential passport information for international travel</p>
          </div>
        </div>

        <!-- Passport Requirements Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="requirement in passportRequirements"
            :key="requirement.id"
            class="bg-white p-8 border-4 border-gray-900 relative group cursor-pointer transform hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full flex flex-col"
          >
            <!-- Corner Accent -->
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-t-blue-600 border-r-[50px] border-r-transparent"></div>
            
            <div class="w-16 h-16 bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
              <component :is="requirement.icon" class="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </div>
            
            <div class="flex-1 flex flex-col">
              <h3 class="text-2xl font-black text-gray-900 group-hover:text-white mb-4 uppercase tracking-tight transition-colors duration-300">
                {{ requirement.title }}
              </h3>
              <p class="text-gray-600 group-hover:text-white font-bold leading-relaxed mb-4 flex-1 transition-colors duration-300">
                {{ requirement.description }}
              </p>
              <p class="text-sm text-gray-500 group-hover:text-white font-semibold mb-6 transition-colors duration-300">
                {{ requirement.details }}
              </p>
              
              <!-- Mandatory Badge -->
              <div class="mt-auto">
                <div v-if="requirement.mandatory" class="inline-block px-3 py-1 bg-red-100 text-red-700 group-hover:bg-white group-hover:text-red-700 text-xs font-black uppercase tracking-wider transition-colors duration-300">
                  Mandatory
                </div>
              </div>
            </div>
            
            <!-- Shadow Block -->
            <div class="absolute top-2 left-2 w-full h-full bg-blue-600 -z-10 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Visa Requirements Section -->
    <section class="py-20 bg-gray-50 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-3 mb-4">
            <div class="w-4 h-4 bg-blue-600"></div>
            <div class="w-4 h-4 bg-green-600"></div>
            <div class="w-4 h-4 bg-orange-600"></div>
          </div>
          <h2 class="text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Visa Requirements</h2>
          <p class="text-xl text-gray-600 font-semibold">Country-specific visa information and requirements</p>
        </div>

        <!-- Visa Requirements Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            v-for="visa in visaRequirements"
            :key="visa.id"
            class="group overflow-hidden bg-white border-4 border-gray-900 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] rounded-none p-0 gap-0 h-full flex flex-col"
          >
            <div class="relative h-64 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
              <!-- Background Image -->
              <img
                :src="visa.image"
                :alt="visa.country"
                class="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              
              <!-- Status Badge -->
              <div class="absolute top-6 right-6 z-10">
                <span
                  :class="getVisaStatusColor(visa.status)"
                  class="px-4 py-2 font-black text-xs uppercase tracking-wider shadow-lg backdrop-blur-sm border-2 border-white/30"
                >
                  {{ getVisaStatusText(visa.status) }}
                </span>
              </div>

              <!-- Country Code Indicator -->
              <div class="absolute top-6 left-6 z-10">
                <div class="w-12 h-12 bg-white/90 backdrop-blur-sm border-2 border-white shadow-lg flex items-center justify-center">
                  <span class="text-blue-600 text-lg font-black">
                    {{ visa.code }}
                  </span>
                </div>
              </div>

              <!-- Decorative elements -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

              <!-- Content -->
              <div class="absolute bottom-6 left-6 right-6">
                <CardTitle class="text-3xl font-black text-white mb-2">
                  {{ visa.country }}
                </CardTitle>
                <CardDescription class="text-gray-200 font-bold text-lg">
                  {{ visa.validity }} stay • {{ visa.cost }}
                </CardDescription>
              </div>
            </div>

            <CardContent class="p-8 bg-white flex-1 flex flex-col">
              <!-- Requirements -->
              <div class="mb-6 flex-1">
                <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-3">Requirements</div>
                <div class="space-y-2">
                  <div v-for="requirement in visa.requirements" :key="requirement" class="flex items-center gap-2">
                    <CheckCircle class="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span class="text-sm font-bold text-gray-700">{{ requirement }}</span>
                  </div>
                </div>
              </div>

              <!-- Processing Info -->
              <div class="mb-6">
                <div class="flex justify-between items-center py-2 border-b border-gray-200">
                  <span class="text-xs font-bold text-gray-500 uppercase tracking-widest">Processing Time</span>
                  <span class="text-sm font-black text-gray-900">{{ visa.processingTime }}</span>
                </div>
                <div class="flex justify-between items-center py-2">
                  <span class="text-xs font-bold text-gray-500 uppercase tracking-widest">Cost</span>
                  <span class="text-sm font-black text-green-600">{{ visa.cost }}</span>
                </div>
              </div>

              <div class="mt-auto">
                <Button
                  class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-14 font-black text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 rounded-none"
                >
                  <span class="flex items-center justify-center gap-2">
                    <Globe class="w-5 h-5" />
                    View Details
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Travel Documents Checklist Section -->
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
            <h2 class="text-5xl font-black text-black mb-2 tracking-tight uppercase">Travel Checklist</h2>
            <p class="text-lg text-gray-600 font-semibold">Interactive checklist to ensure you have everything</p>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="bg-white p-8 border-4 border-gray-900 mb-8 relative overflow-hidden">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-2xl font-black text-gray-900 uppercase tracking-tight">Progress</h3>
              <p class="text-sm text-gray-600 font-semibold">{{ completedItems }} of {{ totalItems }} items completed</p>
            </div>
            <div class="text-right">
              <div class="text-4xl font-black text-blue-600">{{ progressPercentage }}%</div>
              <div class="text-sm text-gray-600 font-semibold">Complete</div>
            </div>
          </div>
          
          <!-- Progress Bar -->
          <div class="w-full bg-gray-200 h-8 border-4 border-gray-900 relative overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-500 ease-out"
              :style="{ width: `${progressPercentage}%` }"
            ></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-white font-black text-sm uppercase tracking-wider">
                {{ progressPercentage }}% Complete
              </span>
            </div>
          </div>
        </div>

        <!-- Checklist Items -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="item in documentChecklist"
            :key="item.id"
            @click="toggleChecklistItem(item.id)"
            class="bg-white p-6 border-4 border-gray-900 cursor-pointer transform hover:-translate-y-1 transition-all duration-300 relative group h-full"
            :class="item.completed ? 'bg-green-50 border-green-600' : 'hover:bg-gray-50'"
          >
            <div class="flex items-center gap-4 h-full">
              <div class="w-8 h-8 border-4 border-gray-900 group-hover:border-white flex items-center justify-center transition-all duration-300 flex-shrink-0"
                   :class="item.completed ? 'bg-green-600 border-green-600' : 'group-hover:border-white'">
                <CheckCircle v-if="item.completed" class="w-5 h-5 text-white" />
                <div v-else class="w-3 h-3 bg-transparent group-hover:bg-white transition-colors duration-300"></div>
              </div>
              
              <div class="flex-1 flex flex-col justify-center">
                <h4 class="text-lg font-black text-gray-900 group-hover:text-white uppercase tracking-tight transition-colors duration-300"
                    :class="item.completed ? 'line-through text-green-700 group-hover:text-white' : ''">
                  {{ item.item }}
                </h4>
                <div class="flex items-center gap-2 mt-2">
                  <span v-if="item.mandatory" class="px-2 py-1 bg-red-100 text-red-700 group-hover:bg-white group-hover:text-red-700 text-xs font-black uppercase tracking-wider transition-colors duration-300">
                    Mandatory
                  </span>
                  <span v-else class="px-2 py-1 bg-gray-100 text-gray-700 group-hover:bg-white group-hover:text-gray-700 text-xs font-black uppercase tracking-wider transition-colors duration-300">
                    Recommended
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Shadow Block -->
            <div class="absolute top-2 left-2 w-full h-full bg-blue-600 -z-10 transition-all duration-300"
                 :class="item.completed ? 'bg-green-600' : ''"></div>
          </div>
        </div>

        <!-- Download Button -->
        <div class="text-center mt-12">
          <Button 
            @click="downloadChecklist"
            class="inline-flex items-center justify-center gap-3 h-16 px-10 font-black text-lg bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-none transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 shadow-2xl"
          >
            <Download class="w-6 h-6" />
            Download Checklist
          </Button>
        </div>
      </div>
    </section>

    <!-- Travel Insurance Section -->
    <section class="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white overflow-hidden relative">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #fff 20px, #fff 21px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center rounded-full px-4 py-2 mb-6" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
            <Shield class="w-4 h-4 mr-2 text-white" />
            <span class="font-semibold text-sm text-white">Travel Protection</span>
          </div>
          <h2 class="text-5xl font-black text-white mb-4 uppercase tracking-tighter">Travel Insurance</h2>
          <p class="text-xl text-white/80 font-semibold">Protect your journey with comprehensive coverage</p>
        </div>

        <!-- Insurance Plans -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="plan in travelInsurance"
            :key="plan.id"
            class="bg-white/10 backdrop-blur-md border-2 border-white/20 p-8 relative group h-full flex flex-col"
            :class="plan.recommended ? 'border-green-400 bg-green-500/10' : ''"
          >
            <!-- Recommended Badge -->
            <div v-if="plan.recommended" class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span class="bg-green-600 text-white px-4 py-2 font-black text-xs uppercase tracking-wider">
                Recommended
              </span>
            </div>
            
            <div class="text-center flex-1 flex flex-col">
              <h3 class="text-2xl font-black text-white mb-4 uppercase tracking-tight">{{ plan.type }}</h3>
              <div class="text-4xl font-black text-white mb-2">{{ plan.price }}</div>
              <p class="text-white/70 text-sm font-semibold mb-6">per person</p>
              
              <p class="text-white/90 font-semibold leading-relaxed mb-6 flex-1">{{ plan.coverage }}</p>
              
              <div class="space-y-3 mb-8">
                <div v-for="feature in plan.features" :key="feature" class="flex items-center gap-3">
                  <CheckCircle class="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span class="text-white/90 font-semibold text-sm">{{ feature }}</span>
                </div>
              </div>
              
              <div class="mt-auto">
                <Button 
                  class="w-full h-14 font-black text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 rounded-none"
                  :class="plan.recommended ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-white/20 hover:bg-white/30 text-white border-2 border-white/30'"
                >
                  <span class="flex items-center justify-center gap-2">
                    <CreditCard class="w-5 h-5" />
                    Get Coverage
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Health Certificates Section -->
    <section class="py-20 bg-gray-50 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-3 mb-4">
            <div class="w-4 h-4 bg-green-600"></div>
            <div class="w-4 h-4 bg-blue-600"></div>
            <div class="w-4 h-4 bg-purple-600"></div>
          </div>
          <h2 class="text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Health Certificates</h2>
          <p class="text-xl text-gray-600 font-semibold">Health documentation requirements for travel</p>
        </div>

        <!-- Health Certificates Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="certificate in healthCertificates"
            :key="certificate.id"
            class="bg-white p-8 border-4 border-gray-900 relative group cursor-pointer transform hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full flex flex-col"
          >
            <!-- Corner Accent -->
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-t-green-600 border-r-[50px] border-r-transparent"></div>
            
            <div class="w-16 h-16 bg-green-100 flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors duration-300">
              <component :is="certificate.icon" class="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
            </div>
            
            <div class="flex-1 flex flex-col">
              <h3 class="text-2xl font-black text-gray-900 group-hover:text-white mb-4 uppercase tracking-tight transition-colors duration-300">
                {{ certificate.title }}
              </h3>
              <p class="text-gray-600 group-hover:text-white font-bold leading-relaxed mb-4 flex-1 transition-colors duration-300">
                {{ certificate.description }}
              </p>
              <p class="text-sm text-gray-500 group-hover:text-white font-semibold mb-6 transition-colors duration-300">
                {{ certificate.details }}
              </p>
              
              <!-- Mandatory Badge -->
              <div class="mt-auto">
                <div v-if="certificate.mandatory" class="inline-block px-3 py-1 bg-red-100 text-red-700 group-hover:bg-white group-hover:text-red-700 text-xs font-black uppercase tracking-wider transition-colors duration-300">
                  Mandatory
                </div>
                <div v-else class="inline-block px-3 py-1 bg-gray-100 text-gray-700 group-hover:bg-white group-hover:text-gray-700 text-xs font-black uppercase tracking-wider transition-colors duration-300">
                  Optional
                </div>
              </div>
            </div>
            
            <!-- Shadow Block -->
            <div class="absolute top-2 left-2 w-full h-full bg-green-600 -z-10 transition-all duration-300"></div>
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
            <HelpCircle class="w-12 h-12 text-white" />
          </div>
          
          <h2 class="text-5xl font-black text-white mb-6 uppercase tracking-tight">Need Help?</h2>
          <p class="text-xl text-white/90 mb-12 font-semibold max-w-2xl mx-auto">
            Our travel documents experts are here to help you prepare for your journey. Get personalized assistance with visa applications, document requirements, and travel planning.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              @click="contactSupport"
              class="h-16 px-10 bg-white text-gray-900 hover:bg-gray-100 font-black text-lg uppercase tracking-wider shadow-2xl"
            >
              <HelpCircle class="w-6 h-6 mr-3" />
              Get Expert Help
            </Button>
            <Button 
              class="h-16 px-10 bg-transparent border-4 border-white text-white hover:bg-white/10 font-black text-lg uppercase tracking-wider transition-all"
            >
              <Download class="w-6 h-6 mr-3" />
              Download Guide
            </Button>
          </div>

          <div class="mt-12 flex items-center justify-center gap-6 text-sm">
            <div class="flex items-center gap-2">
              <CheckCircle class="w-5 h-5 text-green-400" />
              <span class="font-bold text-white/90">Expert Guidance</span>
            </div>
            <div class="w-px h-6 bg-white/30"></div>
            <div class="flex items-center gap-2">
              <CheckCircle class="w-5 h-5 text-green-400" />
              <span class="font-bold text-white/90">24/7 Support</span>
            </div>
            <div class="w-px h-6 bg-white/30"></div>
            <div class="flex items-center gap-2">
              <CheckCircle class="w-5 h-5 text-green-400" />
              <span class="font-bold text-white/90">Free Consultation</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
