<script setup lang="ts">
import { ref, computed } from 'vue'
import { X, AlertTriangle } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  isOpen: boolean
  bookingReference: string
  totalAmount: number
}

interface Emits {
  (e: 'close'): void
  (e: 'confirm'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const confirmText = ref('')

const isConfirmDisabled = computed(() => {
  return confirmText.value.toUpperCase() !== 'CANCEL'
})

const handleConfirm = () => {
  if (!isConfirmDisabled.value) {
    emit('confirm')
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white w-full max-w-md shadow-2xl">
          <!-- Header -->
          <div class="bg-red-600 p-6 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-white/20 flex items-center justify-center">
                <AlertTriangle class="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 class="text-2xl font-black text-white uppercase tracking-tight">Cancel Booking</h2>
                <p class="text-white/90 text-sm font-semibold mt-1">This action cannot be undone</p>
              </div>
            </div>
            <Button @click="emit('close')" variant="ghost" size="icon" class="text-white hover:bg-white/10">
              <X class="w-6 h-6" />
            </Button>
          </div>

          <!-- Content -->
          <div class="p-6 space-y-6">
            <!-- Warning Message -->
            <div class="bg-red-50 border-l-4 border-red-600 p-4">
              <h3 class="font-black text-red-900 uppercase text-sm mb-2">Warning</h3>
              <p class="text-sm text-red-800 font-semibold leading-relaxed">
                You are about to cancel your booking. This will release all reserved seats and cancel your reservation permanently.
              </p>
            </div>

            <!-- Booking Details -->
            <div class="space-y-3">
              <div class="flex justify-between items-center pb-3 border-b border-gray-200">
                <span class="text-sm text-gray-600 font-semibold">Booking Reference</span>
                <span class="font-black text-gray-900">{{ bookingReference }}</span>
              </div>
              <div class="flex justify-between items-center pb-3 border-b border-gray-200">
                <span class="text-sm text-gray-600 font-semibold">Total Amount</span>
                <span class="font-black text-gray-900">₱{{ totalAmount.toLocaleString() }}</span>
              </div>
            </div>

            <!-- Refund Policy -->
            <div class="bg-gray-50 p-4">
              <h4 class="font-bold text-gray-900 text-sm mb-2">Refund Policy</h4>
              <ul class="text-xs text-gray-700 space-y-1 font-semibold">
                <li>• Cancellations made 24+ hours before departure: 80% refund</li>
                <li>• Cancellations made 12-24 hours before: 50% refund</li>
                <li>• Cancellations made less than 12 hours: No refund</li>
              </ul>
            </div>

            <!-- Confirmation Input -->
            <div>
              <Label for="confirmText" class="text-xs font-black text-gray-900 uppercase tracking-widest mb-2 block">
                Type "CANCEL" to confirm
              </Label>
              <Input
                id="confirmText"
                v-model="confirmText"
                placeholder="CANCEL"
                class="h-11 text-base font-bold uppercase"
              />
            </div>

            <!-- Actions -->
            <div class="flex gap-3 pt-2">
              <Button @click="emit('close')" type="button" variant="outline" class="flex-1 font-bold">
                Keep Booking
              </Button>
              <Button 
                @click="handleConfirm" 
                :disabled="isConfirmDisabled"
                class="flex-1 bg-red-600 hover:bg-red-700 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AlertTriangle class="w-4 h-4 mr-2" />
                Cancel Booking
              </Button>
            </div>
          </div>
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
