<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-vue-next'
import type { ToastProps } from '@/types/toast'

export type { ToastProps }

const props = defineProps<ToastProps>()
const emit = defineEmits<{
  close: [id: string]
}>()

const icon = computed(() => {
  switch (props.type) {
    case 'success':
      return CheckCircle
    case 'error':
      return XCircle
    case 'warning':
      return AlertCircle
    case 'info':
      return Info
    default:
      return Info
  }
})

const colorClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return {
        bg: 'bg-green-50',
        border: 'border-green-600',
        text: 'text-green-900',
        icon: 'text-green-600',
        shadow: 'bg-green-600',
        accent: 'bg-green-600'
      }
    case 'error':
      return {
        bg: 'bg-red-50',
        border: 'border-red-600',
        text: 'text-red-900',
        icon: 'text-red-600',
        shadow: 'bg-red-600',
        accent: 'bg-red-600'
      }
    case 'warning':
      return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-600',
        text: 'text-yellow-900',
        icon: 'text-yellow-600',
        shadow: 'bg-yellow-600',
        accent: 'bg-yellow-600'
      }
    case 'info':
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-600',
        text: 'text-blue-900',
        icon: 'text-blue-600',
        shadow: 'bg-blue-600',
        accent: 'bg-blue-600'
      }
    default:
      return {
        bg: 'bg-gray-50',
        border: 'border-gray-600',
        text: 'text-gray-900',
        icon: 'text-gray-600',
        shadow: 'bg-gray-600',
        accent: 'bg-gray-600'
      }
  }
})

const handleClose = () => {
  emit('close', props.id)
}
</script>

<template>
  <div
    class="relative min-w-[320px] max-w-md pointer-events-auto"
    role="alert"
    :aria-live="type === 'error' ? 'assertive' : 'polite'"
  >
    <!-- Main Toast Container -->
    <div
      :class="[
        'relative border-4 p-4 flex items-start gap-3',
        colorClasses.bg,
        colorClasses.border
      ]"
    >
      <!-- Corner Accent -->
      <div
        :class="[
          'absolute top-0 right-0 w-0 h-0',
          `border-t-[20px] border-r-[20px] border-r-transparent`,
          colorClasses.accent === 'bg-green-600' && 'border-t-green-600',
          colorClasses.accent === 'bg-red-600' && 'border-t-red-600',
          colorClasses.accent === 'bg-yellow-600' && 'border-t-yellow-600',
          colorClasses.accent === 'bg-blue-600' && 'border-t-blue-600'
        ]"
      ></div>

      <!-- Icon -->
      <div
        :class="[
          'flex-shrink-0 w-10 h-10 flex items-center justify-center border-2',
          colorClasses.border,
          'bg-white'
        ]"
      >
        <component :is="icon" :class="['w-5 h-5', colorClasses.icon]" />
      </div>

      <!-- Content -->
      <div class="flex-1 pt-1">
        <p
          :class="[
            'text-sm font-black uppercase tracking-wide leading-relaxed',
            colorClasses.text
          ]"
        >
          {{ message }}
        </p>
      </div>

      <!-- Close Button -->
      <button
        @click="handleClose"
        :class="[
          'flex-shrink-0 w-6 h-6 flex items-center justify-center border-2 hover:bg-white transition-colors',
          colorClasses.border,
          colorClasses.icon
        ]"
        aria-label="Close notification"
      >
        <X class="w-4 h-4" />
      </button>

      <!-- Shadow Block -->
      <div
        :class="[
          'absolute top-1.5 left-1.5 w-full h-full -z-10',
          colorClasses.shadow
        ]"
      ></div>
    </div>
  </div>
</template>

<style scoped>
/* Animation classes will be handled by ToastContainer */
</style>
