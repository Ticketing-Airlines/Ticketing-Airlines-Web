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
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-green-900 text-white py-16 lg:py-20 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 lg:w-96 lg:h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div class="relative container mx-auto px-4 text-center z-10 pt-8 lg:pt-12">
        <div class="inline-flex items-center rounded-full px-3 py-1.5 mb-4" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
          <CreditCard class="w-3.5 h-3.5 mr-2 text-white" />
          <span class="font-semibold text-xs text-white">Payment Options</span>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 lg:mb-4 leading-tight">
          Safe & Secure Payments
        </h1>
        <p class="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto font-medium">
          Multiple payment methods for your convenience
        </p>
      </div>
    </section>

    <!-- Quick Stats Banner -->
    <div class="container mx-auto px-4 -mt-10 lg:-mt-12 relative z-20 mb-8 lg:mb-12">
      <div class="bg-white shadow-2xl overflow-hidden">
        <div class="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200">
          <!-- Stat 1 -->
          <div class="p-4 lg:p-5 text-center hover:bg-gray-50 transition-colors">
            <div class="w-10 h-10 lg:w-11 lg:h-11 bg-blue-100 mx-auto mb-2 flex items-center justify-center">
              <Zap class="w-5 h-5 lg:w-5.5 lg:h-5.5 text-blue-600" />
            </div>
            <div class="text-2xl lg:text-2xl font-black text-gray-900 mb-0.5">Instant</div>
            <div class="text-[10px] lg:text-xs text-gray-600 font-bold uppercase tracking-wider">Processing</div>
          </div>

          <!-- Stat 2 -->
          <div class="p-4 lg:p-5 text-center hover:bg-gray-50 transition-colors">
            <div class="w-10 h-10 lg:w-11 lg:h-11 bg-green-100 mx-auto mb-2 flex items-center justify-center">
              <Shield class="w-5 h-5 lg:w-5.5 lg:h-5.5 text-green-600" />
            </div>
            <div class="text-2xl lg:text-2xl font-black text-gray-900 mb-0.5">100%</div>
            <div class="text-[10px] lg:text-xs text-gray-600 font-bold uppercase tracking-wider">Secure</div>
          </div>

          <!-- Stat 3 -->
          <div class="p-4 lg:p-5 text-center hover:bg-gray-50 transition-colors">
            <div class="w-10 h-10 lg:w-11 lg:h-11 bg-purple-100 mx-auto mb-2 flex items-center justify-center">
              <Wallet class="w-5 h-5 lg:w-5.5 lg:h-5.5 text-purple-600" />
            </div>
            <div class="text-2xl lg:text-2xl font-black text-gray-900 mb-0.5">8+</div>
            <div class="text-[10px] lg:text-xs text-gray-600 font-bold uppercase tracking-wider">Methods</div>
          </div>

          <!-- Stat 4 -->
          <div class="p-4 lg:p-5 text-center hover:bg-gray-50 transition-colors">
            <div class="w-10 h-10 lg:w-11 lg:h-11 bg-orange-100 mx-auto mb-2 flex items-center justify-center">
              <TrendingUp class="w-5 h-5 lg:w-5.5 lg:h-5.5 text-orange-600" />
            </div>
            <div class="text-2xl lg:text-2xl font-black text-gray-900 mb-0.5">24/7</div>
            <div class="text-[10px] lg:text-xs text-gray-600 font-bold uppercase tracking-wider">Available</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Filter - Brutalist Tabs -->
    <section class="py-8 lg:py-10 bg-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-6 lg:mb-8">
          <div class="flex items-center gap-3 mb-2">
            <div class="flex gap-1">
              <div class="w-2.5 h-2.5 bg-gray-900"></div>
              <div class="w-2.5 h-2.5 bg-green-600"></div>
              <div class="w-2.5 h-2.5 bg-blue-600"></div>
            </div>
            <h2 class="text-2xl lg:text-3xl font-black text-gray-900 uppercase tracking-tighter">Payment Methods</h2>
          </div>
          <div class="flex items-center gap-2 ml-9 lg:ml-10">
            <div class="h-px w-12 bg-gray-900"></div>
            <p class="text-gray-600 font-bold text-xs uppercase tracking-wide">Choose your preferred method</p>
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="flex flex-wrap gap-2 mb-6 lg:mb-8">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectCategory(category)"
            :class="[
              'px-4 py-2 lg:px-5 lg:py-2.5 font-black uppercase tracking-wide text-xs lg:text-sm border-3 lg:border-4 transition-all transform hover:-translate-y-0.5',
              selectedCategory === category
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-900 border-gray-900 hover:bg-gray-50'
            ]"
          >
            {{ category }}
          </button>
        </div>

        <!-- Payment Methods Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          <div
            v-for="method in (selectedCategory === 'All' ? paymentMethods : paymentMethods.filter(m => m.category === selectedCategory))"
            :key="method.id"
            class="relative group cursor-pointer flex"
          >
            <!-- Card Wrapper -->
            <div class="bg-white shadow-xl relative overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 w-full flex flex-col"
          >
            <!-- Featured Badge -->
            <div v-if="method.featured" class="absolute top-0 right-0 z-10">
              <div class="bg-yellow-400 px-3 py-1.5 flex items-center gap-1.5">
                <Star class="w-3.5 h-3.5 text-gray-900" fill="currentColor" />
                <span class="font-black text-[10px] uppercase text-gray-900 tracking-widest">Popular</span>
              </div>
            </div>

            <!-- Corner Accent -->
            <div
              class="absolute top-0 left-0 w-0 h-0 transition-all"
              :class="{
                'border-t-[40px] border-t-blue-600 border-r-[40px] border-r-transparent': method.color === 'blue',
                'border-t-[40px] border-t-green-600 border-r-[40px] border-r-transparent': method.color === 'green',
                'border-t-[40px] border-t-purple-600 border-r-[40px] border-r-transparent': method.color === 'purple',
                'border-t-[40px] border-t-orange-600 border-r-[40px] border-r-transparent': method.color === 'orange'
              }"
            ></div>

            <!-- Content -->
            <div class="p-5 lg:p-6 relative z-10 bg-white group-hover:bg-white transition-colors flex-1 flex flex-col">
              <div class="flex-1">
                <!-- Icon -->
                <div
                  class="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center mb-4 transition-all duration-300"
                  :class="{
                    'bg-blue-100 group-hover:bg-blue-600': method.color === 'blue',
                    'bg-green-100 group-hover:bg-green-600': method.color === 'green',
                    'bg-purple-100 group-hover:bg-purple-600': method.color === 'purple',
                    'bg-orange-100 group-hover:bg-orange-600': method.color === 'orange'
                  }"
                >
                  <component
                    :is="method.icon"
                    class="w-6 h-6 lg:w-7 lg:h-7 transition-colors duration-300"
                    :class="{
                      'text-blue-600 group-hover:text-white': method.color === 'blue',
                      'text-green-600 group-hover:text-white': method.color === 'green',
                      'text-purple-600 group-hover:text-white': method.color === 'purple',
                      'text-orange-600 group-hover:text-white': method.color === 'orange'
                    }"
                  />
                </div>

                <!-- Name & Description -->
                <h3 class="text-lg lg:text-xl font-black text-gray-900 mb-1.5 uppercase tracking-tight group-hover:text-gray-900 transition-colors">{{ method.name }}</h3>
                <p class="text-gray-600 font-semibold text-xs lg:text-sm mb-4 group-hover:text-gray-700 transition-colors">{{ method.description }}</p>

                <!-- Details Grid -->
                <div class="space-y-2 mb-4">
                  <div class="flex items-center justify-between py-1.5 border-b border-gray-200 group-hover:border-gray-300 transition-colors">
                    <div class="flex items-center gap-1.5">
                      <Clock class="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-600 transition-colors" />
                      <span class="text-[10px] lg:text-xs font-bold text-gray-600 uppercase tracking-widest group-hover:text-gray-700 transition-colors">Processing</span>
                    </div>
                    <span class="text-xs lg:text-sm font-black text-gray-900 transition-colors">{{ method.processingTime }}</span>
                  </div>

                  <div class="flex items-center justify-between py-1.5 border-b border-gray-200 group-hover:border-gray-300 transition-colors">
                    <div class="flex items-center gap-1.5">
                      <Banknote class="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-600 transition-colors" />
                      <span class="text-[10px] lg:text-xs font-bold text-gray-600 uppercase tracking-widest group-hover:text-gray-700 transition-colors">Fee</span>
                    </div>
                    <span
                      class="text-xs lg:text-sm font-black transition-colors"
                      :class="method.fee === 'No Fee' ? 'text-green-600 group-hover:text-green-700' : 'text-gray-900'"
                    >
                      {{ method.fee }}
                    </span>
                  </div>
                </div>

                <!-- Providers -->
                <div v-if="method.providers && method.providers.length > 0" class="mb-4">
                  <div class="text-[10px] lg:text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 group-hover:text-gray-600 transition-colors">Supported</div>
                  <div class="flex flex-wrap gap-1.5 min-h-[28px]">
                    <span
                      v-for="provider in method.providers.slice(0, 4)"
                      :key="provider"
                      class="px-2 py-0.5 bg-gray-100 text-gray-900 text-[10px] lg:text-xs font-bold uppercase tracking-wide group-hover:bg-gray-200 transition-colors"
                    >
                      {{ provider }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Action Button (Pushed to bottom) -->
              <Button
                class="w-full h-10 lg:h-11 font-black uppercase tracking-wider text-xs lg:text-sm transition-all group-hover:scale-105"
                :class="{
                  'bg-blue-600 hover:bg-blue-700 text-white': method.color === 'blue',
                  'bg-green-600 hover:bg-green-700 text-white': method.color === 'green',
                  'bg-purple-600 hover:bg-purple-700 text-white': method.color === 'purple',
                  'bg-orange-600 hover:bg-orange-700 text-white': method.color === 'orange'
                }"
              >
                <span class="flex items-center justify-center gap-1.5">
                  <span>Select Method</span>
                  <ArrowRight class="w-3.5 h-3.5" />
                </span>
              </Button>
            </div>
            </div>

            <!-- Shadow Block (Outside card wrapper) -->
            <div
              class="absolute top-1.5 left-1.5 right-0 bottom-0 -z-10 group-hover:top-3 group-hover:left-3 transition-all duration-300 pointer-events-none"
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


    <!-- How to Pay Section - Step by Step -->
    <section class="py-12 lg:py-16 bg-gray-50 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="mb-10 lg:mb-12">
          <div class="flex items-end gap-4 lg:gap-6 mb-4 lg:mb-5">
            <div>
              <div class="text-xs lg:text-sm font-black text-green-600 uppercase tracking-widest mb-1.5 lg:mb-2">Simple Process</div>
              <h2 class="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                How to Pay
              </h2>
            </div>
            <div class="flex gap-2 lg:gap-2.5 mb-4 lg:mb-5">
              <div class="w-6 h-6 lg:w-7 lg:h-7 bg-green-600"></div>
              <div class="w-6 h-6 lg:w-7 lg:h-7 bg-blue-600"></div>
              <div class="w-6 h-6 lg:w-7 lg:h-7 bg-gray-900"></div>
            </div>
          </div>
          <div class="h-1.5 lg:h-2 w-full bg-gradient-to-r from-green-600 via-blue-600 to-transparent"></div>
        </div>

        <!-- Steps Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-6xl mx-auto">
          <!-- Step 1 -->
          <div class="relative bg-green-600 p-6 lg:p-8 group cursor-pointer">
            <!-- Decorative Pattern -->
            <div class="absolute inset-0 opacity-10">
              <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, #fff 10px, #fff 11px);"></div>
            </div>

            <div class="relative z-10">
              <!-- Step Number -->
              <div class="mb-5 lg:mb-6">
                <div class="w-16 h-16 lg:w-20 lg:h-20 border-6 lg:border-8 border-white bg-green-600 flex items-center justify-center">
                  <span class="text-4xl lg:text-5xl font-black text-white">1</span>
                </div>
              </div>

              <!-- Content -->
              <div class="space-y-2.5 lg:space-y-3">
                <div class="h-0.5 lg:h-1 w-12 lg:w-14 bg-white"></div>
                <h3 class="text-xl lg:text-2xl font-black text-white uppercase tracking-tight leading-tight">
                  Select<br/>Payment
                </h3>
                <p class="text-white/90 font-bold text-xs lg:text-sm leading-relaxed">
                  Choose your preferred payment method from our secure options.
                </p>
              </div>

              <!-- Icon -->
              <div class="mt-5 lg:mt-6">
                <CreditCard class="w-9 h-9 lg:w-10 lg:h-10 text-white/50" />
              </div>
            </div>

            <!-- Arrow Connector (hidden on mobile) -->
            <div class="hidden md:block absolute top-1/2 -right-5 lg:-right-6 transform -translate-y-1/2 z-20">
              <ArrowRight class="w-10 h-10 lg:w-12 lg:h-12 text-green-600" />
            </div>
          </div>

          <!-- Step 2 -->
          <div class="relative bg-blue-600 p-6 lg:p-8 group cursor-pointer">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, #fff 10px, #fff 11px);"></div>
            </div>

            <div class="relative z-10">
              <div class="mb-5 lg:mb-6">
                <div class="w-16 h-16 lg:w-20 lg:h-20 border-6 lg:border-8 border-white bg-blue-600 flex items-center justify-center">
                  <span class="text-4xl lg:text-5xl font-black text-white">2</span>
                </div>
              </div>

              <div class="space-y-2.5 lg:space-y-3">
                <div class="h-0.5 lg:h-1 w-12 lg:w-14 bg-white"></div>
                <h3 class="text-xl lg:text-2xl font-black text-white uppercase tracking-tight leading-tight">
                  Enter<br/>Details
                </h3>
                <p class="text-white/90 font-bold text-xs lg:text-sm leading-relaxed">
                  Provide your payment information securely on our encrypted platform.
                </p>
              </div>

              <div class="mt-5 lg:mt-6">
                <Lock class="w-9 h-9 lg:w-10 lg:h-10 text-white/50" />
              </div>
            </div>

            <div class="hidden md:block absolute top-1/2 -right-5 lg:-right-6 transform -translate-y-1/2 z-20">
              <ArrowRight class="w-10 h-10 lg:w-12 lg:h-12 text-blue-600" />
            </div>
          </div>

          <!-- Step 3 -->
          <div class="relative bg-gray-900 p-6 lg:p-8 group cursor-pointer">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, #fff 10px, #fff 11px);"></div>
            </div>

            <div class="relative z-10">
              <div class="mb-5 lg:mb-6">
                <div class="w-16 h-16 lg:w-20 lg:h-20 border-6 lg:border-8 border-white bg-gray-900 flex items-center justify-center">
                  <span class="text-4xl lg:text-5xl font-black text-white">3</span>
                </div>
              </div>

              <div class="space-y-2.5 lg:space-y-3">
                <div class="h-0.5 lg:h-1 w-12 lg:w-14 bg-white"></div>
                <h3 class="text-xl lg:text-2xl font-black text-white uppercase tracking-tight leading-tight">
                  Get<br/>Confirmed
                </h3>
                <p class="text-white/90 font-bold text-xs lg:text-sm leading-relaxed">
                  Receive instant confirmation and e-ticket via email.
                </p>
              </div>

              <div class="mt-5 lg:mt-6">
                <CheckCircle class="w-9 h-9 lg:w-10 lg:h-10 text-white/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section - Asymmetric Layout -->
    <section class="py-12 lg:py-16 bg-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Header -->
        <div class="mb-10 lg:mb-14">
          <div class="flex items-end gap-4 lg:gap-6 mb-4 lg:mb-6">
            <div>
              <div class="text-xs lg:text-sm font-black text-blue-600 uppercase tracking-widest mb-1.5 lg:mb-2">Common Questions</div>
              <h2 class="text-4xl lg:text-6xl xl:text-7xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                FAQ
              </h2>
            </div>
            <div class="flex gap-2 lg:gap-2.5 mb-4 lg:mb-6">
              <div class="w-6 h-6 lg:w-7 lg:h-7 bg-blue-600"></div>
              <div class="w-6 h-6 lg:w-7 lg:h-7 bg-green-600"></div>
              <div class="w-6 h-6 lg:w-7 lg:h-7 bg-gray-900"></div>
            </div>
          </div>
          <div class="h-1.5 lg:h-2 w-full bg-gradient-to-r from-blue-600 via-green-600 to-transparent"></div>
        </div>

        <!-- FAQ Grid -->
        <div class="grid grid-cols-12 gap-4 lg:gap-5">
          <!-- FAQ 1 - Large -->
          <div class="col-span-12 lg:col-span-7 bg-gray-900 relative group">
            <div class="absolute -top-6 -left-6 lg:-top-7 lg:-left-7 w-16 h-16 lg:w-20 lg:h-20 bg-blue-600 border-6 lg:border-8 border-white flex items-center justify-center z-10">
              <span class="text-3xl lg:text-4xl font-black text-white">1</span>
            </div>

            <div class="p-6 lg:p-8 pt-12 lg:pt-14">
              <div class="mb-4 lg:mb-5">
                <div class="inline-block bg-blue-600 px-3 py-0.5 lg:px-4 lg:py-1 mb-3 lg:mb-4">
                  <span class="text-white font-black text-[10px] lg:text-xs uppercase tracking-widest">Security</span>
                </div>
                <h3 class="text-xl lg:text-2xl font-black text-white uppercase tracking-tight leading-tight">
                  {{ faqs[0].question }}
                </h3>
              </div>

              <div class="bg-white/10 backdrop-blur-sm p-4 lg:p-5 border-l-3 lg:border-l-4 border-blue-600">
                <p class="text-white font-bold text-xs lg:text-sm leading-relaxed">
                  {{ faqs[0].answer }}
                </p>
              </div>
            </div>
          </div>

          <!-- FAQ 2 - Small -->
          <div class="col-span-12 lg:col-span-5 bg-white border-6 lg:border-8 border-green-600 relative group">
            <div class="absolute -top-6 -right-6 lg:-top-7 lg:-right-7 w-16 h-16 lg:w-20 lg:h-20 bg-green-600 border-6 lg:border-8 border-white flex items-center justify-center z-10">
              <span class="text-3xl lg:text-4xl font-black text-white">2</span>
            </div>

            <div class="p-5 lg:p-6 pt-12 lg:pt-14">
              <div class="mb-3 lg:mb-4">
                <div class="inline-block bg-green-600 px-3 py-0.5 lg:px-4 lg:py-1 mb-2 lg:mb-3">
                  <span class="text-white font-black text-[10px] lg:text-xs uppercase tracking-widest">Processing</span>
                </div>
                <h3 class="text-lg lg:text-xl font-black text-gray-900 uppercase tracking-tight leading-tight">
                  {{ faqs[1].question }}
                </h3>
              </div>

              <p class="text-gray-700 font-bold text-xs lg:text-sm leading-relaxed">
                {{ faqs[1].answer }}
              </p>
            </div>
          </div>

          <!-- FAQ 3 - Small -->
          <div class="col-span-12 lg:col-span-5 bg-white border-6 lg:border-8 border-purple-600 relative group">
            <div class="absolute -top-6 -left-6 lg:-top-7 lg:-left-7 w-16 h-16 lg:w-20 lg:h-20 bg-purple-600 border-6 lg:border-8 border-white flex items-center justify-center z-10">
              <span class="text-3xl lg:text-4xl font-black text-white">3</span>
            </div>

            <div class="p-5 lg:p-6 pt-12 lg:pt-14">
              <div class="mb-3 lg:mb-4">
                <div class="inline-block bg-purple-600 px-3 py-0.5 lg:px-4 lg:py-1 mb-2 lg:mb-3">
                  <span class="text-white font-black text-[10px] lg:text-xs uppercase tracking-widest">Refunds</span>
                </div>
                <h3 class="text-lg lg:text-xl font-black text-gray-900 uppercase tracking-tight leading-tight">
                  {{ faqs[2].question }}
                </h3>
              </div>

              <p class="text-gray-700 font-bold text-xs lg:text-sm leading-relaxed">
                {{ faqs[2].answer }}
              </p>
            </div>
          </div>

          <!-- FAQ 4 - Large -->
          <div class="col-span-12 lg:col-span-7 bg-gradient-to-br from-orange-500 to-red-600 relative group">
            <div class="absolute -top-6 -right-6 lg:-top-7 lg:-right-7 w-16 h-16 lg:w-20 lg:h-20 bg-gray-900 border-6 lg:border-8 border-white flex items-center justify-center z-10">
              <span class="text-3xl lg:text-4xl font-black text-white">4</span>
            </div>

            <div class="p-6 lg:p-8 pt-12 lg:pt-14">
              <div class="mb-4 lg:mb-5">
                <div class="inline-block bg-gray-900 px-3 py-0.5 lg:px-4 lg:py-1 mb-3 lg:mb-4">
                  <span class="text-white font-black text-[10px] lg:text-xs uppercase tracking-widest">Support</span>
                </div>
                <h3 class="text-xl lg:text-2xl font-black text-white uppercase tracking-tight leading-tight">
                  {{ faqs[3].question }}
                </h3>
              </div>

              <div class="bg-white/10 backdrop-blur-sm p-4 lg:p-5 border-l-3 lg:border-l-4 border-white">
                <p class="text-white font-bold text-xs lg:text-sm leading-relaxed">
                  {{ faqs[3].answer }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-green-900 text-white py-12 lg:py-16 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 left-0 w-64 h-64 lg:w-96 lg:h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div class="relative container mx-auto px-4 z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-white/10 backdrop-blur-sm mb-5 lg:mb-6">
            <CreditCard class="w-8 h-8 lg:w-10 lg:h-10 text-white" />
          </div>

          <h2 class="text-3xl lg:text-4xl font-black text-white mb-4 lg:mb-5 uppercase tracking-tight">Ready to Book?</h2>
          <p class="text-base lg:text-lg text-white/90 mb-8 lg:mb-10 font-semibold max-w-2xl mx-auto">
            Choose from our secure payment options and start your journey today. Fast, safe, and hassle-free!
          </p>

          <div class="flex flex-col sm:flex-row gap-4 lg:gap-5 justify-center">
            <Button class="h-12 lg:h-14 px-8 lg:px-10 bg-white text-gray-900 hover:bg-gray-100 font-black text-base lg:text-lg uppercase tracking-wider shadow-2xl">
              <Wallet class="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" />
              Book a Flight
            </Button>
            <Button class="h-12 lg:h-14 px-8 lg:px-10 bg-transparent border-3 lg:border-4 border-white text-white hover:bg-white/10 font-black text-base lg:text-lg uppercase tracking-wider transition-all">
              <Info class="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" />
              Contact Support
            </Button>
          </div>

          <div class="mt-8 lg:mt-10 flex items-center justify-center gap-4 lg:gap-5 text-xs lg:text-sm flex-wrap">
            <div class="flex items-center gap-1.5 lg:gap-2">
              <CheckCircle class="w-4 h-4 lg:w-5 lg:h-5 text-green-400" />
              <span class="font-bold text-white/90">Instant Confirmation</span>
            </div>
            <div class="w-px h-5 lg:h-6 bg-white/30"></div>
            <div class="flex items-center gap-1.5 lg:gap-2">
              <CheckCircle class="w-4 h-4 lg:w-5 lg:h-5 text-green-400" />
              <span class="font-bold text-white/90">Secure Payment</span>
            </div>
            <div class="w-px h-5 lg:h-6 bg-white/30"></div>
            <div class="flex items-center gap-1.5 lg:gap-2">
              <CheckCircle class="w-4 h-4 lg:w-5 lg:h-5 text-green-400" />
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

