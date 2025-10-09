<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { 
  CreditCard,
  Wallet,
  Building2,
  Smartphone,
  Globe,
  Shield,
  CheckCircle,
  ArrowRight,
  Zap,
  Clock,
  Lock,
  Banknote,
  Landmark,
  AlertCircle,
  Info,
  Star,
  TrendingUp
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

// Payment methods data
const paymentMethods = ref([
  {
    id: 1,
    category: 'Cards',
    name: 'Credit/Debit Cards',
    icon: CreditCard,
    description: 'Visa, Mastercard, JCB, American Express',
    processingTime: 'Instant',
    fee: 'No Fee',
    color: 'blue',
    featured: true,
    providers: ['Visa', 'Mastercard', 'JCB', 'Amex']
  },
  {
    id: 2,
    category: 'E-Wallets',
    name: 'GCash',
    icon: Wallet,
    description: 'Pay with your GCash wallet',
    processingTime: 'Instant',
    fee: 'No Fee',
    color: 'blue',
    featured: true,
    providers: ['GCash']
  },
  {
    id: 3,
    category: 'E-Wallets',
    name: 'PayMaya',
    icon: Wallet,
    description: 'Pay securely with PayMaya',
    processingTime: 'Instant',
    fee: 'No Fee',
    color: 'green',
    featured: true,
    providers: ['PayMaya']
  },
  {
    id: 4,
    category: 'E-Wallets',
    name: 'GrabPay',
    icon: Smartphone,
    description: 'Pay using your Grab wallet',
    processingTime: 'Instant',
    fee: 'No Fee',
    color: 'green',
    featured: false,
    providers: ['GrabPay']
  },
  {
    id: 5,
    category: 'Bank Transfer',
    name: 'Online Banking',
    icon: Building2,
    description: 'BDO, BPI, Metrobank, UnionBank & more',
    processingTime: '1-2 hours',
    fee: 'No Fee',
    color: 'purple',
    featured: false,
    providers: ['BDO', 'BPI', 'Metrobank', 'UnionBank']
  },
  {
    id: 6,
    category: 'Over the Counter',
    name: '7-Eleven',
    icon: Banknote,
    description: 'Pay at any 7-Eleven branch',
    processingTime: '30 minutes',
    fee: '₱25',
    color: 'orange',
    featured: false,
    providers: ['7-Eleven']
  },
  {
    id: 7,
    category: 'Over the Counter',
    name: 'Bayad Center',
    icon: Landmark,
    description: 'Pay at Bayad Center outlets',
    processingTime: '30 minutes',
    fee: '₱25',
    color: 'orange',
    featured: false,
    providers: ['Bayad Center']
  },
  {
    id: 8,
    category: 'International',
    name: 'PayPal',
    icon: Globe,
    description: 'International payment gateway',
    processingTime: 'Instant',
    fee: '3.9% + ₱15',
    color: 'blue',
    featured: false,
    providers: ['PayPal']
  }
])

const selectedCategory = ref('All')
const categories = ref(['All', 'Cards', 'E-Wallets', 'Bank Transfer', 'Over the Counter', 'International'])

// Select category and update filter
const selectCategory = (category: string) => {
  selectedCategory.value = category
}

// Security features
const securityFeatures = ref([
  {
    id: 1,
    title: 'SSL Encryption',
    description: '256-bit encryption for all transactions',
    icon: Lock
  },
  {
    id: 2,
    title: 'PCI DSS Compliant',
    description: 'Highest security standards',
    icon: Shield
  },
  {
    id: 3,
    title: 'Fraud Protection',
    description: 'Advanced fraud detection system',
    icon: AlertCircle
  },
  {
    id: 4,
    title: 'Secure Gateway',
    description: 'Trusted payment processors',
    icon: CheckCircle
  }
])

// Payment FAQs
const faqs = ref([
  {
    id: 1,
    question: 'Are my payment details safe?',
    answer: 'Absolutely! We use industry-standard 256-bit SSL encryption and are PCI DSS compliant. Your card details are never stored on our servers.'
  },
  {
    id: 2,
    question: 'How long does payment processing take?',
    answer: 'Most payments are instant. Bank transfers may take 1-2 hours. Over-the-counter payments are confirmed within 30 minutes.'
  },
  {
    id: 3,
    question: 'Can I get a refund?',
    answer: 'Yes! Refunds are processed to your original payment method within 7-14 business days, depending on your bank or payment provider.'
  },
  {
    id: 4,
    question: 'What if my payment fails?',
    answer: 'If payment fails, your booking is automatically cancelled and any holds are released. You can try again with a different payment method.'
  }
])
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-green-900 text-white py-32 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <div class="relative container mx-auto px-4 text-center z-10 pt-12">
        <div class="inline-flex items-center rounded-full px-4 py-2 mb-6" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
          <CreditCard class="w-4 h-4 mr-2 text-white" />
          <span class="font-semibold text-sm text-white">Payment Options</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Safe & Secure Payments
        </h1>
        <p class="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto font-medium">
          Multiple payment methods for your convenience
        </p>
      </div>
    </section>

    <!-- Quick Stats Banner -->
    <div class="container mx-auto px-4 -mt-16 relative z-20 mb-16">
      <div class="bg-white shadow-2xl overflow-hidden">
        <div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
          <!-- Stat 1 -->
          <div class="p-6 text-center hover:bg-gray-50 transition-colors">
            <div class="w-12 h-12 bg-blue-100 mx-auto mb-3 flex items-center justify-center">
              <Zap class="w-6 h-6 text-blue-600" />
            </div>
            <div class="text-3xl font-black text-gray-900 mb-1">Instant</div>
            <div class="text-xs text-gray-600 font-bold uppercase tracking-wider">Processing</div>
          </div>

          <!-- Stat 2 -->
          <div class="p-6 text-center hover:bg-gray-50 transition-colors">
            <div class="w-12 h-12 bg-green-100 mx-auto mb-3 flex items-center justify-center">
              <Shield class="w-6 h-6 text-green-600" />
            </div>
            <div class="text-3xl font-black text-gray-900 mb-1">100%</div>
            <div class="text-xs text-gray-600 font-bold uppercase tracking-wider">Secure</div>
          </div>

          <!-- Stat 3 -->
          <div class="p-6 text-center hover:bg-gray-50 transition-colors">
            <div class="w-12 h-12 bg-purple-100 mx-auto mb-3 flex items-center justify-center">
              <Wallet class="w-6 h-6 text-purple-600" />
            </div>
            <div class="text-3xl font-black text-gray-900 mb-1">8+</div>
            <div class="text-xs text-gray-600 font-bold uppercase tracking-wider">Methods</div>
          </div>

          <!-- Stat 4 -->
          <div class="p-6 text-center hover:bg-gray-50 transition-colors">
            <div class="w-12 h-12 bg-orange-100 mx-auto mb-3 flex items-center justify-center">
              <TrendingUp class="w-6 h-6 text-orange-600" />
            </div>
            <div class="text-3xl font-black text-gray-900 mb-1">24/7</div>
            <div class="text-xs text-gray-600 font-bold uppercase tracking-wider">Available</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Filter - Brutalist Tabs -->
    <section class="py-12 bg-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
          <div class="flex items-center gap-4 mb-3">
            <div class="flex gap-1">
              <div class="w-3 h-3 bg-gray-900"></div>
              <div class="w-3 h-3 bg-green-600"></div>
              <div class="w-3 h-3 bg-blue-600"></div>
            </div>
            <h2 class="text-4xl font-black text-gray-900 uppercase tracking-tighter">Payment Methods</h2>
          </div>
          <div class="flex items-center gap-3 ml-12">
            <div class="h-px w-16 bg-gray-900"></div>
            <p class="text-gray-600 font-bold text-sm uppercase tracking-wide">Choose your preferred method</p>
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="flex flex-wrap gap-3 mb-12">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectCategory(category)"
            :class="[
              'px-6 py-3 font-black uppercase tracking-wide text-sm border-4 transition-all transform hover:-translate-y-1',
              selectedCategory === category
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-900 border-gray-900 hover:bg-gray-50'
            ]"
          >
            {{ category }}
          </button>
        </div>

        <!-- Payment Methods Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="method in (selectedCategory === 'All' ? paymentMethods : paymentMethods.filter(m => m.category === selectedCategory))"
            :key="method.id"
            class="relative group cursor-pointer flex"
          >
            <!-- Card Wrapper -->
            <div class="bg-white shadow-xl relative overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 w-full flex flex-col"
          >
            <!-- Featured Badge -->
            <div v-if="method.featured" class="absolute top-0 right-0 z-10">
              <div class="bg-yellow-400 px-4 py-2 flex items-center gap-2">
                <Star class="w-4 h-4 text-gray-900" fill="currentColor" />
                <span class="font-black text-xs uppercase text-gray-900 tracking-widest">Popular</span>
              </div>
            </div>

            <!-- Corner Accent -->
            <div 
              class="absolute top-0 left-0 w-0 h-0 transition-all"
              :class="{
                'border-t-[50px] border-t-blue-600 border-r-[50px] border-r-transparent': method.color === 'blue',
                'border-t-[50px] border-t-green-600 border-r-[50px] border-r-transparent': method.color === 'green',
                'border-t-[50px] border-t-purple-600 border-r-[50px] border-r-transparent': method.color === 'purple',
                'border-t-[50px] border-t-orange-600 border-r-[50px] border-r-transparent': method.color === 'orange'
              }"
            ></div>

            <!-- Content -->
            <div class="p-8 relative z-10 bg-white group-hover:bg-white transition-colors flex-1 flex flex-col">
              <div class="flex-1">
                <!-- Icon -->
                <div 
                  class="w-16 h-16 flex items-center justify-center mb-6 transition-all duration-300"
                  :class="{
                    'bg-blue-100 group-hover:bg-blue-600': method.color === 'blue',
                    'bg-green-100 group-hover:bg-green-600': method.color === 'green',
                    'bg-purple-100 group-hover:bg-purple-600': method.color === 'purple',
                    'bg-orange-100 group-hover:bg-orange-600': method.color === 'orange'
                  }"
                >
                  <component 
                    :is="method.icon" 
                    class="w-8 h-8 transition-colors duration-300"
                    :class="{
                      'text-blue-600 group-hover:text-white': method.color === 'blue',
                      'text-green-600 group-hover:text-white': method.color === 'green',
                      'text-purple-600 group-hover:text-white': method.color === 'purple',
                      'text-orange-600 group-hover:text-white': method.color === 'orange'
                    }"
                  />
                </div>

                <!-- Name & Description -->
                <h3 class="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-gray-900 transition-colors">{{ method.name }}</h3>
                <p class="text-gray-600 font-semibold text-sm mb-6 group-hover:text-gray-700 transition-colors">{{ method.description }}</p>

                <!-- Details Grid -->
                <div class="space-y-3 mb-6">
                  <div class="flex items-center justify-between py-2 border-b border-gray-200 group-hover:border-gray-300 transition-colors">
                    <div class="flex items-center gap-2">
                      <Clock class="w-4 h-4 text-gray-500 group-hover:text-gray-600 transition-colors" />
                      <span class="text-xs font-bold text-gray-600 uppercase tracking-widest group-hover:text-gray-700 transition-colors">Processing</span>
                    </div>
                    <span class="text-sm font-black text-gray-900 transition-colors">{{ method.processingTime }}</span>
                  </div>

                  <div class="flex items-center justify-between py-2 border-b border-gray-200 group-hover:border-gray-300 transition-colors">
                    <div class="flex items-center gap-2">
                      <Banknote class="w-4 h-4 text-gray-500 group-hover:text-gray-600 transition-colors" />
                      <span class="text-xs font-bold text-gray-600 uppercase tracking-widest group-hover:text-gray-700 transition-colors">Fee</span>
                    </div>
                    <span 
                      class="text-sm font-black transition-colors"
                      :class="method.fee === 'No Fee' ? 'text-green-600 group-hover:text-green-700' : 'text-gray-900'"
                    >
                      {{ method.fee }}
                    </span>
                  </div>
                </div>

                <!-- Providers -->
                <div v-if="method.providers && method.providers.length > 0" class="mb-6">
                  <div class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 group-hover:text-gray-600 transition-colors">Supported</div>
                  <div class="flex flex-wrap gap-2 min-h-[32px]">
                    <span 
                      v-for="provider in method.providers.slice(0, 4)" 
                      :key="provider"
                      class="px-3 py-1 bg-gray-100 text-gray-900 text-xs font-bold uppercase tracking-wide group-hover:bg-gray-200 transition-colors"
                    >
                      {{ provider }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Action Button (Pushed to bottom) -->
              <Button 
                class="w-full h-12 font-black uppercase tracking-wider text-sm transition-all group-hover:scale-105"
                :class="{
                  'bg-blue-600 hover:bg-blue-700 text-white': method.color === 'blue',
                  'bg-green-600 hover:bg-green-700 text-white': method.color === 'green',
                  'bg-purple-600 hover:bg-purple-700 text-white': method.color === 'purple',
                  'bg-orange-600 hover:bg-orange-700 text-white': method.color === 'orange'
                }"
              >
                <span class="flex items-center justify-center gap-2">
                  <span>Select Method</span>
                  <ArrowRight class="w-4 h-4" />
                </span>
              </Button>
            </div>
            </div>

            <!-- Shadow Block (Outside card wrapper) -->
            <div 
              class="absolute top-2 left-2 right-0 bottom-0 -z-10 group-hover:top-4 group-hover:left-4 transition-all duration-300 pointer-events-none"
              :class="{
                'bg-blue-600': method.color === 'blue',
                'bg-green-600': method.color === 'green',
                'bg-purple-600': method.color === 'purple',
                'bg-orange-600': method.color === 'orange'
              }"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Security Features Section -->
    <section class="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white overflow-hidden relative">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #fff 20px, #fff 21px);"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16">
          <div class="inline-flex items-center rounded-full px-4 py-2 mb-6" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
            <Shield class="w-4 h-4 mr-2 text-white" />
            <span class="font-semibold text-sm text-white">Bank-Level Security</span>
          </div>
          <h2 class="text-5xl font-black text-white mb-4 uppercase tracking-tighter">Your Money is Safe</h2>
          <p class="text-xl text-white/80 font-semibold">Industry-leading security for every transaction</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="(feature, index) in securityFeatures" 
            :key="feature.id"
            class="bg-white/10 backdrop-blur-md border-2 border-white/20 p-8 relative group hover:bg-white/20 transition-all"
          >
            <!-- Number Badge -->
            <div 
              class="absolute -top-5 -left-5 w-14 h-14 border-4 border-white flex items-center justify-center z-10 transform rotate-12 group-hover:rotate-0 transition-transform"
              :class="{
                'bg-blue-600': index === 0,
                'bg-green-600': index === 1,
                'bg-purple-600': index === 2,
                'bg-orange-600': index === 3
              }"
            >
              <span class="text-2xl font-black text-white">{{ index + 1 }}</span>
            </div>

            <div class="mt-4">
              <div class="w-12 h-12 bg-white/20 flex items-center justify-center mb-4">
                <component :is="feature.icon" class="w-6 h-6 text-white" />
              </div>
              
              <h3 class="text-2xl font-black text-white mb-3 uppercase tracking-tight">{{ feature.title }}</h3>
              <p class="text-white/90 font-semibold leading-relaxed">{{ feature.description }}</p>
            </div>

            <!-- Corner Accent -->
            <div class="absolute bottom-0 right-0 w-0 h-0 border-b-[30px] border-b-white/20 border-l-[30px] border-l-transparent"></div>
          </div>
        </div>

        <!-- Trust Badges -->
        <div class="mt-16 flex flex-wrap justify-center items-center gap-8">
          <div class="bg-white/10 backdrop-blur-sm px-6 py-4 border-2 border-white/20">
            <div class="flex items-center gap-3">
              <Lock class="w-6 h-6 text-green-400" />
              <span class="font-black text-white uppercase tracking-wider">SSL Secured</span>
            </div>
          </div>
          
          <div class="bg-white/10 backdrop-blur-sm px-6 py-4 border-2 border-white/20">
            <div class="flex items-center gap-3">
              <Shield class="w-6 h-6 text-blue-400" />
              <span class="font-black text-white uppercase tracking-wider">PCI DSS Compliant</span>
            </div>
          </div>
          
          <div class="bg-white/10 backdrop-blur-sm px-6 py-4 border-2 border-white/20">
            <div class="flex items-center gap-3">
              <CheckCircle class="w-6 h-6 text-purple-400" />
              <span class="font-black text-white uppercase tracking-wider">Verified Secure</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How to Pay Section - Step by Step -->
    <section class="py-20 bg-gray-50 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="mb-16">
          <div class="flex items-end gap-8 mb-6">
            <div>
              <div class="text-sm font-black text-green-600 uppercase tracking-widest mb-2">Simple Process</div>
              <h2 class="text-7xl md:text-8xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                How to Pay
              </h2>
            </div>
            <div class="flex gap-3 mb-6">
              <div class="w-8 h-8 bg-green-600"></div>
              <div class="w-8 h-8 bg-blue-600"></div>
              <div class="w-8 h-8 bg-gray-900"></div>
            </div>
          </div>
          <div class="h-2 w-full bg-gradient-to-r from-green-600 via-blue-600 to-transparent"></div>
        </div>

        <!-- Steps Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-6xl mx-auto">
          <!-- Step 1 -->
          <div class="relative bg-green-600 p-10 group cursor-pointer">
            <!-- Decorative Pattern -->
            <div class="absolute inset-0 opacity-10">
              <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, #fff 10px, #fff 11px);"></div>
            </div>

            <div class="relative z-10">
              <!-- Step Number -->
              <div class="mb-8">
                <div class="w-24 h-24 border-8 border-white bg-green-600 flex items-center justify-center">
                  <span class="text-6xl font-black text-white">1</span>
                </div>
              </div>

              <!-- Content -->
              <div class="space-y-4">
                <div class="h-1 w-16 bg-white"></div>
                <h3 class="text-3xl font-black text-white uppercase tracking-tight leading-tight">
                  Select<br/>Payment
                </h3>
                <p class="text-white/90 font-bold text-sm leading-relaxed">
                  Choose your preferred payment method from our secure options.
                </p>
              </div>

              <!-- Icon -->
              <div class="mt-8">
                <CreditCard class="w-12 h-12 text-white/50" />
              </div>
            </div>

            <!-- Arrow Connector (hidden on mobile) -->
            <div class="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
              <ArrowRight class="w-12 h-12 text-green-600" />
            </div>
          </div>

          <!-- Step 2 -->
          <div class="relative bg-blue-600 p-10 group cursor-pointer">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, #fff 10px, #fff 11px);"></div>
            </div>

            <div class="relative z-10">
              <div class="mb-8">
                <div class="w-24 h-24 border-8 border-white bg-blue-600 flex items-center justify-center">
                  <span class="text-6xl font-black text-white">2</span>
                </div>
              </div>

              <div class="space-y-4">
                <div class="h-1 w-16 bg-white"></div>
                <h3 class="text-3xl font-black text-white uppercase tracking-tight leading-tight">
                  Enter<br/>Details
                </h3>
                <p class="text-white/90 font-bold text-sm leading-relaxed">
                  Provide your payment information securely on our encrypted platform.
                </p>
              </div>

              <div class="mt-8">
                <Lock class="w-12 h-12 text-white/50" />
              </div>
            </div>

            <div class="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
              <ArrowRight class="w-12 h-12 text-blue-600" />
            </div>
          </div>

          <!-- Step 3 -->
          <div class="relative bg-gray-900 p-10 group cursor-pointer">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, #fff 10px, #fff 11px);"></div>
            </div>

            <div class="relative z-10">
              <div class="mb-8">
                <div class="w-24 h-24 border-8 border-white bg-gray-900 flex items-center justify-center">
                  <span class="text-6xl font-black text-white">3</span>
                </div>
              </div>

              <div class="space-y-4">
                <div class="h-1 w-16 bg-white"></div>
                <h3 class="text-3xl font-black text-white uppercase tracking-tight leading-tight">
                  Get<br/>Confirmed
                </h3>
                <p class="text-white/90 font-bold text-sm leading-relaxed">
                  Receive instant confirmation and e-ticket via email.
                </p>
              </div>

              <div class="mt-8">
                <CheckCircle class="w-12 h-12 text-white/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section - Asymmetric Layout -->
    <section class="py-20 bg-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Header -->
        <div class="mb-20">
          <div class="flex items-end gap-8 mb-8">
            <div>
              <div class="text-sm font-black text-blue-600 uppercase tracking-widest mb-2">Common Questions</div>
              <h2 class="text-7xl md:text-9xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                FAQ
              </h2>
            </div>
            <div class="flex gap-3 mb-8">
              <div class="w-8 h-8 bg-blue-600"></div>
              <div class="w-8 h-8 bg-green-600"></div>
              <div class="w-8 h-8 bg-gray-900"></div>
            </div>
          </div>
          <div class="h-2 w-full bg-gradient-to-r from-blue-600 via-green-600 to-transparent"></div>
        </div>

        <!-- FAQ Grid -->
        <div class="grid grid-cols-12 gap-6">
          <!-- FAQ 1 - Large -->
          <div class="col-span-12 lg:col-span-7 bg-gray-900 relative group">
            <div class="absolute -top-8 -left-8 w-24 h-24 bg-blue-600 border-8 border-white flex items-center justify-center z-10">
              <span class="text-5xl font-black text-white">1</span>
            </div>

            <div class="p-10 pt-16">
              <div class="mb-6">
                <div class="inline-block bg-blue-600 px-4 py-1 mb-4">
                  <span class="text-white font-black text-xs uppercase tracking-widest">Security</span>
                </div>
                <h3 class="text-3xl font-black text-white uppercase tracking-tight leading-tight">
                  {{ faqs[0].question }}
                </h3>
              </div>

              <div class="bg-white/10 backdrop-blur-sm p-6 border-l-4 border-blue-600">
                <p class="text-white font-bold leading-relaxed">
                  {{ faqs[0].answer }}
                </p>
              </div>
            </div>
          </div>

          <!-- FAQ 2 - Small -->
          <div class="col-span-12 lg:col-span-5 bg-white border-8 border-green-600 relative group">
            <div class="absolute -top-8 -right-8 w-24 h-24 bg-green-600 border-8 border-white flex items-center justify-center z-10">
              <span class="text-5xl font-black text-white">2</span>
            </div>

            <div class="p-8 pt-16">
              <div class="mb-4">
                <div class="inline-block bg-green-600 px-4 py-1 mb-3">
                  <span class="text-white font-black text-xs uppercase tracking-widest">Processing</span>
                </div>
                <h3 class="text-2xl font-black text-gray-900 uppercase tracking-tight leading-tight">
                  {{ faqs[1].question }}
                </h3>
              </div>

              <p class="text-gray-700 font-bold leading-relaxed">
                {{ faqs[1].answer }}
              </p>
            </div>
          </div>

          <!-- FAQ 3 - Small -->
          <div class="col-span-12 lg:col-span-5 bg-white border-8 border-purple-600 relative group">
            <div class="absolute -top-8 -left-8 w-24 h-24 bg-purple-600 border-8 border-white flex items-center justify-center z-10">
              <span class="text-5xl font-black text-white">3</span>
            </div>

            <div class="p-8 pt-16">
              <div class="mb-4">
                <div class="inline-block bg-purple-600 px-4 py-1 mb-3">
                  <span class="text-white font-black text-xs uppercase tracking-widest">Refunds</span>
                </div>
                <h3 class="text-2xl font-black text-gray-900 uppercase tracking-tight leading-tight">
                  {{ faqs[2].question }}
                </h3>
              </div>

              <p class="text-gray-700 font-bold leading-relaxed">
                {{ faqs[2].answer }}
              </p>
            </div>
          </div>

          <!-- FAQ 4 - Large -->
          <div class="col-span-12 lg:col-span-7 bg-gradient-to-br from-orange-500 to-red-600 relative group">
            <div class="absolute -top-8 -right-8 w-24 h-24 bg-gray-900 border-8 border-white flex items-center justify-center z-10">
              <span class="text-5xl font-black text-white">4</span>
            </div>

            <div class="p-10 pt-16">
              <div class="mb-6">
                <div class="inline-block bg-gray-900 px-4 py-1 mb-4">
                  <span class="text-white font-black text-xs uppercase tracking-widest">Support</span>
                </div>
                <h3 class="text-3xl font-black text-white uppercase tracking-tight leading-tight">
                  {{ faqs[3].question }}
                </h3>
              </div>

              <div class="bg-white/10 backdrop-blur-sm p-6 border-l-4 border-white">
                <p class="text-white font-bold leading-relaxed">
                  {{ faqs[3].answer }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-green-900 text-white py-20 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div class="relative container mx-auto px-4 z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm mb-8">
            <CreditCard class="w-12 h-12 text-white" />
          </div>

          <h2 class="text-5xl font-black text-white mb-6 uppercase tracking-tight">Ready to Book?</h2>
          <p class="text-xl text-white/90 mb-12 font-semibold max-w-2xl mx-auto">
            Choose from our secure payment options and start your journey today. Fast, safe, and hassle-free!
          </p>

          <div class="flex flex-col sm:flex-row gap-6 justify-center">
            <Button class="h-16 px-10 bg-white text-gray-900 hover:bg-gray-100 font-black text-lg uppercase tracking-wider shadow-2xl">
              <Wallet class="w-6 h-6 mr-3" />
              Book a Flight
            </Button>
            <Button class="h-16 px-10 bg-transparent border-4 border-white text-white hover:bg-white/10 font-black text-lg uppercase tracking-wider transition-all">
              <Info class="w-6 h-6 mr-3" />
              Contact Support
            </Button>
          </div>

          <div class="mt-12 flex items-center justify-center gap-6 text-sm flex-wrap">
            <div class="flex items-center gap-2">
              <CheckCircle class="w-5 h-5 text-green-400" />
              <span class="font-bold text-white/90">Instant Confirmation</span>
            </div>
            <div class="w-px h-6 bg-white/30"></div>
            <div class="flex items-center gap-2">
              <CheckCircle class="w-5 h-5 text-green-400" />
              <span class="font-bold text-white/90">Secure Payment</span>
            </div>
            <div class="w-px h-6 bg-white/30"></div>
            <div class="flex items-center gap-2">
              <CheckCircle class="w-5 h-5 text-green-400" />
              <span class="font-bold text-white/90">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

