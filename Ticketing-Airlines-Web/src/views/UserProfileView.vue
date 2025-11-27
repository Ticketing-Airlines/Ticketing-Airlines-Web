<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  User,
  Users,
  CreditCard,
  Settings,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Check
} from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

import { useValidation, rules } from '@/composables/useValidation'

const userStore = useUserStore()
const authStore = useAuthStore()
const { profile, savedPassengers, paymentMethods } = storeToRefs(userStore)

const activeSection = ref<'profile' | 'passengers' | 'payments' | 'settings'>('profile')
const isEditing = ref(false)
const editForm = ref({
  name: '',
  phone: '',
  address: '',
  city: '',
  country: '',
  dateOfBirth: '',
  nationality: ''
})

// Profile Validation
const { validate: validateProfile, errors: profileErrors } = useValidation(editForm, {
  name: [rules.required('Full name is required')],
  phone: [rules.required('Phone number is required')],
  address: [rules.required('Address is required')],
  city: [rules.required('City is required')],
  country: [rules.required('Country is required')],
  nationality: [rules.required('Nationality is required')]
})

const newPassenger = ref({
  firstName: '',
  lastName: '',
  nationality: 'PH',
  passportNumber: '',
  dateOfBirth: '',
  passengerType: 'Adult' as 'Adult' | 'Child' | 'Infant'
})
const showAddPassenger = ref(false)

// Passenger Validation
const { validate: validatePassenger, errors: passengerErrors, clearErrors: clearPassengerErrors } = useValidation(newPassenger, {
  firstName: [rules.required('First name is required')],
  lastName: [rules.required('Last name is required')],
  passportNumber: [rules.required('Passport number is required')],
  dateOfBirth: [rules.required('Date of birth is required')]
})

onMounted(() => {
  if (authStore.user) {
    userStore.initializeUser(authStore.user.userId)
  }
})

const startEditing = () => {
  if (profile.value) {
    editForm.value = {
      name: profile.value.name,
      phone: profile.value.phone,
      address: profile.value.address,
      city: profile.value.city,
      country: profile.value.country,
      dateOfBirth: profile.value.dateOfBirth,
      nationality: profile.value.nationality
    }
    isEditing.value = true
  }
}

const saveProfile = () => {
  if (!validateProfile()) return
  
  userStore.updateProfile(editForm.value)
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
}

const addPassenger = () => {
  if (!validatePassenger()) return

  userStore.addPassenger(newPassenger.value)
  newPassenger.value = {
    firstName: '',
    lastName: '',
    nationality: 'PH',
    passportNumber: '',
    dateOfBirth: '',
    passengerType: 'Adult'
  }
  clearPassengerErrors()
  showAddPassenger.value = false
}

const removePassenger = (id: string) => {
  if (confirm('Remove this saved passenger?')) {
    userStore.removePassenger(id)
  }
}

const removePayment = (id: string) => {
  if (confirm('Remove this payment method?')) {
    userStore.removePaymentMethod(id)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <NavigationBar />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white py-20 overflow-hidden mt-16">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 10px, #fff 10px, #fff 11px);"></div>
      </div>
      
      <div class="relative container mx-auto px-4 z-10">
        <div class="inline-flex items-center rounded-full px-4 py-2 mb-4" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
          <User class="w-4 h-4 mr-2 text-white" />
          <span class="font-semibold text-sm text-white">MY ACCOUNT</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">Profile Settings</h1>
        <p class="text-xl text-white/90 max-w-2xl font-medium">Manage your personal information and preferences</p>
      </div>
    </section>

    <div class="container mx-auto px-4 -mt-8 relative z-20 pb-16">
      <div class="grid md:grid-cols-12 gap-6">
        <!-- Sidebar -->
        <div class="md:col-span-3">
          <div class="bg-gray-900 p-6 shadow-xl sticky top-24">
            <nav class="space-y-2">
              <button
                @click="activeSection = 'profile'"
                :class="[
                  'w-full flex items-center gap-3 px-4 py-3 font-black uppercase text-xs tracking-widest transition-all',
                  activeSection === 'profile' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                ]"
              >
                <User class="w-5 h-5" />
                <span>Personal Info</span>
              </button>

              <button
                @click="activeSection = 'passengers'"
                :class="[
                  'w-full flex items-center gap-3 px-4 py-3 font-black uppercase text-xs tracking-widest transition-all',
                  activeSection === 'passengers' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                ]"
              >
                <Users class="w-5 h-5" />
                <span>Saved Passengers</span>
              </button>

              <button
                @click="activeSection = 'payments'"
                :class="[
                  'w-full flex items-center gap-3 px-4 py-3 font-black uppercase text-xs tracking-widest transition-all',
                  activeSection === 'payments' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                ]"
              >
                <CreditCard class="w-5 h-5" />
                <span>Payment Methods</span>
              </button>

              <button
                @click="activeSection = 'settings'"
                :class="[
                  'w-full flex items-center gap-3 px-4 py-3 font-black uppercase text-xs tracking-widest transition-all',
                  activeSection === 'settings' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                ]"
              >
                <Settings class="w-5 h-5" />
                <span>Preferences</span>
              </button>
            </nav>
          </div>
        </div>

        <!-- Content Area -->
        <div class="md:col-span-9">
          <!-- Personal Info Section -->
          <div v-if="activeSection === 'profile'" class="bg-white shadow-xl border-4 border-gray-900">
            <div class="bg-gray-900 px-6 py-4 flex justify-between items-center">
              <h2 class="font-black text-white uppercase tracking-widest">Personal Information</h2>
              <Button
                v-if="!isEditing"
                @click="startEditing"
                class="bg-blue-600 hover:bg-blue-700 font-black uppercase text-xs"
              >
                <Edit class="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>

            <div class="p-6" v-if="profile">
              <div v-if="!isEditing" class="space-y-4">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Full Name</div>
                    <div class="font-black text-lg text-gray-900">{{ profile.name }}</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Email</div>
                    <div class="font-black text-lg text-gray-900">{{ profile.email }}</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Phone</div>
                    <div class="font-black text-lg text-gray-900">{{ profile.phone }}</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Date of Birth</div>
                    <div class="font-black text-lg text-gray-900">{{ profile.dateOfBirth }}</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Address</div>
                    <div class="font-black text-lg text-gray-900">{{ profile.address }}</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">City</div>
                    <div class="font-black text-lg text-gray-900">{{ profile.city }}</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Country</div>
                    <div class="font-black text-lg text-gray-900">{{ profile.country }}</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Nationality</div>
                    <div class="font-black text-lg text-gray-900">{{ profile.nationality }}</div>
                  </div>
                </div>
              </div>

              <form v-else @submit.prevent="saveProfile" class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label class="text-xs font-black uppercase tracking-widest mb-2 block">Full Name</Label>
                    <Input v-model="editForm.name" class="h-12 border-2 border-gray-900 font-bold" :class="{ 'border-red-600': profileErrors.name }" required />
                    <span v-if="profileErrors.name" class="text-red-600 text-xs font-bold mt-1 block">{{ profileErrors.name }}</span>
                  </div>
                  <div>
                    <Label class="text-xs font-black uppercase tracking-widest mb-2 block">Phone</Label>
                    <Input v-model="editForm.phone" class="h-12 border-2 border-gray-900 font-bold" :class="{ 'border-red-600': profileErrors.phone }" required />
                    <span v-if="profileErrors.phone" class="text-red-600 text-xs font-bold mt-1 block">{{ profileErrors.phone }}</span>
                  </div>
                  <div>
                    <Label class="text-xs font-black uppercase tracking-widest mb-2 block">Address</Label>
                    <Input v-model="editForm.address" class="h-12 border-2 border-gray-900 font-bold" :class="{ 'border-red-600': profileErrors.address }" required />
                    <span v-if="profileErrors.address" class="text-red-600 text-xs font-bold mt-1 block">{{ profileErrors.address }}</span>
                  </div>
                  <div>
                    <Label class="text-xs font-black uppercase tracking-widest mb-2 block">City</Label>
                    <Input v-model="editForm.city" class="h-12 border-2 border-gray-900 font-bold" :class="{ 'border-red-600': profileErrors.city }" required />
                    <span v-if="profileErrors.city" class="text-red-600 text-xs font-bold mt-1 block">{{ profileErrors.city }}</span>
                  </div>
                  <div>
                    <Label class="text-xs font-black uppercase tracking-widest mb-2 block">Country</Label>
                    <Input v-model="editForm.country" class="h-12 border-2 border-gray-900 font-bold" :class="{ 'border-red-600': profileErrors.country }" required />
                    <span v-if="profileErrors.country" class="text-red-600 text-xs font-bold mt-1 block">{{ profileErrors.country }}</span>
                  </div>
                  <div>
                    <Label class="text-xs font-black uppercase tracking-widest mb-2 block">Nationality</Label>
                    <Input v-model="editForm.nationality" class="h-12 border-2 border-gray-900 font-bold" :class="{ 'border-red-600': profileErrors.nationality }" required />
                    <span v-if="profileErrors.nationality" class="text-red-600 text-xs font-bold mt-1 block">{{ profileErrors.nationality }}</span>
                  </div>
                </div>

                <div class="flex gap-4">
                  <Button type="submit" class="bg-green-600 hover:bg-green-700 font-black uppercase">
                    <Save class="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button type="button" @click="cancelEdit" variant="outline" class="border-2 border-gray-900 font-black uppercase">
                    <X class="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <!-- Saved Passengers Section -->
          <div v-if="activeSection === 'passengers'" class="space-y-6">
            <div class="bg-white shadow-xl border-4 border-gray-900">
              <div class="bg-gray-900 px-6 py-4 flex justify-between items-center">
                <h2 class="font-black text-white uppercase tracking-widest">Saved Passengers</h2>
                <Button
                  @click="showAddPassenger = true"
                  class="bg-blue-600 hover:bg-blue-700 font-black uppercase text-xs"
                >
                  <Plus class="w-4 h-4 mr-2" />
                  Add Passenger
                </Button>
              </div>

              <div class="p-6">
                <div v-if="savedPassengers.length === 0" class="text-center py-12">
                  <Users class="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p class="text-gray-500 font-bold">No saved passengers yet</p>
                </div>

                <div v-else class="space-y-4">
                  <div
                    v-for="passenger in savedPassengers"
                    :key="passenger.id"
                    class="bg-gray-50 p-5 border-l-4 border-gray-900 flex justify-between items-start"
                  >
                    <div class="flex-1 grid grid-cols-2 gap-4">
                      <div>
                        <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">Name</div>
                        <div class="font-black text-gray-900">{{ passenger.firstName }} {{ passenger.lastName }}</div>
                      </div>
                      <div>
                        <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">Type</div>
                        <div class="font-black text-gray-900">{{ passenger.passengerType }}</div>
                      </div>
                      <div>
                        <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">Passport</div>
                        <div class="font-black text-gray-900">{{ passenger.passportNumber }}</div>
                      </div>
                      <div>
                        <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">Date of Birth</div>
                        <div class="font-black text-gray-900">{{ passenger.dateOfBirth }}</div>
                      </div>
                    </div>
                    <Button
                      @click="removePassenger(passenger.id)"
                      variant="outline"
                      class="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 class="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add Passenger Form -->
            <div v-if="showAddPassenger" class="bg-white shadow-xl border-4 border-gray-900">
              <div class="bg-blue-600 px-6 py-4">
                <h3 class="font-black text-white uppercase tracking-widest">Add New Passenger</h3>
              </div>
              <form @submit.prevent="addPassenger" class="p-6 space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label class="text-xs font-black uppercase tracking-widest mb-2 block">First Name</Label>
                    <Input v-model="newPassenger.firstName" class="h-12 border-2 border-gray-900 font-bold" :class="{ 'border-red-600': passengerErrors.firstName }" required />
                    <span v-if="passengerErrors.firstName" class="text-red-600 text-xs font-bold mt-1 block">{{ passengerErrors.firstName }}</span>
                  </div>
                  <div>
                    <Label class="text-xs font-black uppercase tracking-widest mb-2 block">Last Name</Label>
                    <Input v-model="newPassenger.lastName" class="h-12 border-2 border-gray-900 font-bold" :class="{ 'border-red-600': passengerErrors.lastName }" required />
                    <span v-if="passengerErrors.lastName" class="text-red-600 text-xs font-bold mt-1 block">{{ passengerErrors.lastName }}</span>
                  </div>
                  <div>
                    <Label class="text-xs font-black uppercase tracking-widest mb-2 block">Passport Number</Label>
                    <Input v-model="newPassenger.passportNumber" class="h-12 border-2 border-gray-900 font-bold" :class="{ 'border-red-600': passengerErrors.passportNumber }" required />
                    <span v-if="passengerErrors.passportNumber" class="text-red-600 text-xs font-bold mt-1 block">{{ passengerErrors.passportNumber }}</span>
                  </div>
                  <div>
                    <Label class="text-xs font-black uppercase tracking-widest mb-2 block">Date of Birth</Label>
                    <Input v-model="newPassenger.dateOfBirth" type="date" class="h-12 border-2 border-gray-900 font-bold" :class="{ 'border-red-600': passengerErrors.dateOfBirth }" required />
                    <span v-if="passengerErrors.dateOfBirth" class="text-red-600 text-xs font-bold mt-1 block">{{ passengerErrors.dateOfBirth }}</span>
                  </div>
                </div>

                <div class="flex gap-4">
                  <Button type="submit" class="bg-green-600 hover:bg-green-700 font-black uppercase">
                    <Check class="w-4 h-4 mr-2" />
                    Add Passenger
                  </Button>
                  <Button type="button" @click="showAddPassenger = false" variant="outline" class="border-2 border-gray-900 font-black uppercase">
                    <X class="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <!-- Payment Methods Section -->
          <div v-if="activeSection === 'payments'" class="bg-white shadow-xl border-4 border-gray-900">
            <div class="bg-gray-900 px-6 py-4">
              <h2 class="font-black text-white uppercase tracking-widest">Payment Methods</h2>
            </div>

            <div class="p-6">
              <div v-if="paymentMethods.length === 0" class="text-center py-12">
                <CreditCard class="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p class="text-gray-500 font-bold">No payment methods saved</p>
              </div>

              <div v-else class="space-y-4">
                <div
                  v-for="method in paymentMethods"
                  :key="method.id"
                  class="bg-gray-50 p-5 border-l-4 flex justify-between items-start"
                  :class="method.isDefault ? 'border-green-600' : 'border-gray-900'"
                >
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-3">
                      <div class="font-black text-xl text-gray-900">{{ method.cardNumber }}</div>
                      <span v-if="method.isDefault" class="px-3 py-1 bg-green-600 text-white text-xs font-black uppercase">
                        Default
                      </span>
                    </div>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">Cardholder</div>
                        <div class="font-black text-gray-900">{{ method.cardholderName }}</div>
                      </div>
                      <div>
                        <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">Expires</div>
                        <div class="font-black text-gray-900">{{ method.expiryDate }}</div>
                      </div>
                    </div>
                  </div>
                  <Button
                    @click="removePayment(method.id)"
                    variant="outline"
                    class="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 class="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <!-- Settings Section -->
          <div v-if="activeSection === 'settings'" class="bg-white shadow-xl border-4 border-gray-900">
            <div class="bg-gray-900 px-6 py-4">
              <h2 class="font-black text-white uppercase tracking-widest">Preferences</h2>
            </div>

            <div class="p-6">
              <div class="space-y-6">
                <div class="p-5 border-4 border-gray-900">
                  <h3 class="font-black text-gray-900 uppercase mb-2">Email Notifications</h3>
                  <p class="text-gray-600 font-semibold mb-4">Receive updates about your bookings and special offers</p>
                  <div class="flex items-center gap-2">
                    <input type="checkbox" id="emailNotif" class="w-5 h-5" checked />
                    <label for="emailNotif" class="font-bold text-gray-900">Enable email notifications</label>
                  </div>
                </div>

                <div class="p-5 border-4 border-gray-900">
                  <h3 class="font-black text-gray-900 uppercase mb-2">SMS Alerts</h3>
                  <p class="text-gray-600 font-semibold mb-4">Get flight status updates via SMS</p>
                  <div class="flex items-center gap-2">
                    <input type="checkbox" id="smsAlert" class="w-5 h-5" />
                    <label for="smsAlert" class="font-bold text-gray-900">Enable SMS alerts</label>
                  </div>
                </div>

                <div class="p-5 border-4 border-gray-900">
                  <h3 class="font-black text-gray-900 uppercase mb-2">Currency</h3>
                  <p class="text-gray-600 font-semibold mb-4">Default currency for displaying prices</p>
                  <select class="w-full h-12 border-2 border-gray-900 px-4 font-bold">
                    <option>PHP - Philippine Peso</option>
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>
