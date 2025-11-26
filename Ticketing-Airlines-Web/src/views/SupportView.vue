<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  Send,
  Clock,
  MapPin,
  Shield
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const expandedFAQ = ref<number | null>(null)
const showSuccess = ref(false)

const faqs = [
  {
    question: 'How do I change my booking?',
    answer: 'You can modify your booking through the "Manage Booking" section. Enter your booking reference and last name to access your reservation and make changes.'
  },
  {
    question: 'What is the baggage allowance?',
    answer: 'Economy class passengers are allowed 7kg cabin baggage and 20kg checked baggage. Business class passengers get 10kg cabin and 30kg checked baggage.'
  },
  {
    question: 'How early should I arrive for check-in?',
    answer: 'We recommend arriving at least 2 hours before domestic flights and 3 hours before international flights.'
  },
  {
    question: 'Can I cancel my booking?',
    answer: 'Yes, bookings can be cancelled up to 24 hours before departure. Cancellation fees may apply depending on your fare type.'
  },
  {
    question: 'What documents do I need for travel?',
    answer: 'For domestic flights, a valid government-issued ID is required. For international flights, you need a valid passport and visa (if applicable).'
  }
]

const toggleFAQ = (index: number) => {
  expandedFAQ.value = expandedFAQ.value === index ? null : index
}

const submitForm = () => {
  showSuccess.value = true
  contactForm.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
  setTimeout(() => {
    showSuccess.value = false
  }, 5000)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <NavigationBar />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-green-900 text-white py-20 overflow-hidden mt-16">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(90deg, transparent, transparent 15px, #fff 15px, #fff 16px);"></div>
      </div>
      
      <div class="relative container mx-auto px-4 z-10">
        <div class="inline-flex items-center rounded-full px-4 py-2 mb-4" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
          <MessageCircle class="w-4 h-4 mr-2 text-white" />
          <span class="font-semibold text-sm text-white">HELP CENTER</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">How Can We Help?</h1>
        <p class="text-xl text-white/90 max-w-2xl font-medium">Get in touch with our support team</p>
      </div>
    </section>

    <div class="container mx-auto px-4 -mt-8 relative z-20 pb-16">
      <div class="grid md:grid-cols-2 gap-8">
        <!-- FAQs -->
        <div>
          <div class="bg-white shadow-xl border-4 border-gray-900 mb-8">
            <div class="bg-gray-900 px-6 py-4">
              <h2 class="font-black text-white uppercase tracking-widest">Frequently Asked Questions</h2>
            </div>

            <div class="p-6 space-y-4">
              <div
                v-for="(faq, index) in faqs"
                :key="index"
                class="border-4 border-gray-900"
              >
                <button
                  @click="toggleFAQ(index)"
                  class="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span class="font-black text-left uppercase text-sm">{{ faq.question }}</span>
                  <ChevronDown
                    :class="[
                      'w-6 h-6 transition-transform',
                      expandedFAQ === index ? 'rotate-180' : ''
                    ]"
                  />
                </button>
                <div
                  v-if="expandedFAQ === index"
                  class="px-6 py-4 bg-gray-50 border-t-4 border-gray-900"
                >
                  <p class="font-semibold text-gray-700">{{ faq.answer }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="bg-white shadow-xl border-4 border-gray-900">
            <div class="bg-green-600 px-6 py-4">
              <h2 class="font-black text-white uppercase tracking-widest">Contact Information</h2>
            </div>

            <div class="p-6 space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <Phone class="w-6 h-6 text-white" />
                </div>
                <div>
                  <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Hotline</div>
                  <div class="font-black text-xl">+63 2 8702 0888</div>
                  <div class="text-sm font-semibold text-gray-600">Available 24/7</div>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <Mail class="w-6 h-6 text-white" />
                </div>
                <div>
                  <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Email</div>
                  <div class="font-black text-xl">support@airline.com</div>
                  <div class="text-sm font-semibold text-gray-600">Response within 24 hours</div>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <MapPin class="w-6 h-6 text-white" />
                </div>
                <div>
                  <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Office</div>
                  <div class="font-black text-xl">NAIA Terminal 3</div>
                  <div class="text-sm font-semibold text-gray-600">Pasay City, Metro Manila</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div>
          <div class="bg-white shadow-xl border-4 border-gray-900">
            <div class="bg-blue-600 px-6 py-4">
              <h2 class="font-black text-white uppercase tracking-widest">Send Us a Message</h2>
            </div>

            <form @submit.prevent="submitForm" class="p-6 space-y-6">
              <div>
                <Label class="text-xs font-black uppercase tracking-widest mb-2 block">Your Name</Label>
                <Input
                  v-model="contactForm.name"
                  placeholder="JOHN DOE"
                  class="h-14 border-4 border-gray-900 rounded-none font-bold uppercase"
                  required
                />
              </div>

              <div>
                <Label class="text-xs font-black uppercase tracking-widest mb-2 block">Email Address</Label>
                <Input
                  v-model="contactForm.email"
                  type="email"
                  placeholder="JOHN@EXAMPLE.COM"
                  class="h-14 border-4 border-gray-900 rounded-none font-bold"
                  required
                />
              </div>

              <div>
                <Label class="text-xs font-black uppercase tracking-widest mb-2 block">Subject</Label>
                <Input
                  v-model="contactForm.subject"
                  placeholder="BOOKING INQUIRY"
                  class="h-14 border-4 border-gray-900 rounded-none font-bold uppercase"
                  required
                />
              </div>

              <div>
                <Label class="text-xs font-black uppercase tracking-widest mb-2 block">Message</Label>
                <textarea
                  v-model="contactForm.message"
                  placeholder="Type your message here..."
                  rows="6"
                  class="w-full border-4 border-gray-900 rounded-none p-4 font-semibold resize-none focus:outline-none focus:border-blue-600"
                  required
                ></textarea>
              </div>

              <Button
                type="submit"
                class="w-full h-16 bg-gray-900 hover:bg-blue-600 text-white font-black uppercase tracking-widest text-lg"
              >
                <Send class="w-5 h-5 mr-3" />
                Send Message
              </Button>
            </form>
          </div>

          <!-- Success Message -->
          <div v-if="showSuccess" class="mt-6 bg-green-50 border-4 border-green-600 p-6">
            <div class="flex items-center gap-3">
              <Shield class="w-8 h-8 text-green-600" />
              <div>
                <h4 class="font-black uppercase text-green-900">Message Sent Successfully!</h4>
                <p class="font-semibold text-green-700">We'll get back to you within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>
