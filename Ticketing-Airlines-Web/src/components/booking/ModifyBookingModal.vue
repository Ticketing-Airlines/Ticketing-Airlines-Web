<script setup lang="ts">
import { reactive, watch } from 'vue'
import { X, Mail, Phone, Check } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useValidation, rules } from '@/composables/useValidation'

interface Props {
  isOpen: boolean
  currentEmail: string
  currentPhone: string
}

interface Emits {
  (e: 'close'): void
  (e: 'update', data: { email: string; phone: string }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const form = reactive({
  email: '',
  phone: ''
})

const { validate, errors, resetValidation } = useValidation(form, {
  email: [
    rules.required('Email is required'),
    rules.email('Please enter a valid email address')
  ],
  phone: [
    rules.required('Phone number is required'),
    rules.phone('Please enter a valid phone number')
  ]
})

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    form.email = props.currentEmail
    form.phone = props.currentPhone
    resetValidation()
  }
})

const handleSubmit = () => {
  if (!validate()) return
  
  emit('update', {
    email: form.email,
    phone: form.phone
  })
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white w-full max-w-md shadow-2xl">
          <!-- Header -->
          <div class="bg-gray-900 p-6 flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-black text-white uppercase tracking-tight">Modify Booking</h2>
              <p class="text-white/80 text-sm font-semibold mt-1">Update contact information</p>
            </div>
            <Button @click="emit('close')" variant="ghost" size="icon" class="text-white hover:bg-white/10">
              <X class="w-6 h-6" />
            </Button>
          </div>

          <!-- Content -->
          <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
            <!-- Email -->
            <div>
              <Label for="email" class="text-xs font-black text-gray-900 uppercase tracking-widest mb-2 block">
                <Mail class="w-4 h-4 inline mr-2" />
                Email Address
              </Label>
              <Input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="your.email@example.com"
                class="h-11 text-base font-semibold"
                :class="{ 'border-red-600': errors.email }"
              />
              <span v-if="errors.email" class="text-red-600 text-xs font-bold mt-1 block">{{ errors.email }}</span>
            </div>

            <!-- Phone -->
            <div>
              <Label for="phone" class="text-xs font-black text-gray-900 uppercase tracking-widest mb-2 block">
                <Phone class="w-4 h-4 inline mr-2" />
                Phone Number
              </Label>
              <Input
                id="phone"
                v-model="form.phone"
                type="tel"
                placeholder="+63 912 345 6789"
                class="h-11 text-base font-semibold"
                :class="{ 'border-red-600': errors.phone }"
              />
              <span v-if="errors.phone" class="text-red-600 text-xs font-bold mt-1 block">{{ errors.phone }}</span>
            </div>

            <!-- Info Note -->
            <div class="bg-blue-50 border-l-4 border-blue-600 p-4">
              <p class="text-sm text-gray-700 font-semibold">
                Your updated contact information will be used for all booking communications and notifications.
              </p>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 pt-2">
              <Button @click="emit('close')" type="button" variant="outline" class="flex-1 font-bold">
                Cancel
              </Button>
              <Button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 font-bold">
                <Check class="w-4 h-4 mr-2" />
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
