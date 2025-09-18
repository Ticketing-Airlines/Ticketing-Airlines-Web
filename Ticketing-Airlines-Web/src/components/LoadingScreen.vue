<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Plane } from 'lucide-vue-next'

const props = defineProps<{
  isVisible: boolean
}>()

const emit = defineEmits<{
  finished: []
}>()

const loadingText = ref('Preparing your flight experience...')
const progress = ref(0)
const circumference = 2 * Math.PI * 54 // radius = 54

let progressInterval: ReturnType<typeof setInterval> | null = null

const cleanup = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
}

const startLoading = () => {
  progress.value = 0
  loadingText.value = 'Preparing your flight experience...'

  // Progress animation over 3 seconds
  progressInterval = setInterval(() => {
    progress.value += 4

    // Update text based on progress
    if (progress.value >= 80) {
      loadingText.value = 'Almost ready...'
    } else if (progress.value >= 60) {
      loadingText.value = 'Loading destinations...'
    } else if (progress.value >= 40) {
      loadingText.value = 'Preparing your journey...'
    }

    if (progress.value >= 100) {
      cleanup()
      setTimeout(() => {
        emit('finished')
      }, 300)
    }
  }, 120) // 120ms * 25 iterations = 3 seconds
}

// Watch for visibility changes to start loading
watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    startLoading()
  } else {
    cleanup()
  }
}, { immediate: true })

// Cleanup on unmount
onMounted(() => {
  return cleanup
})
</script>

<template>
  <Transition
    name="loading"
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-500"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isVisible" class="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden">
      <!-- Subtle background pattern -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50"></div>

      <!-- Main Loading Content -->
      <div class="relative text-center">
        <!-- Circular Progress Container -->
        <div class="relative mb-8">
          <!-- Background Circle -->
          <div class="w-32 h-32 rounded-full border-4 border-gray-200 mx-auto"></div>

          <!-- Progress Circle -->
          <svg
            class="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 -rotate-90"
            viewBox="0 0 120 120"
          >
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="#3b82f6"
              stroke-width="4"
              fill="none"
              stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="circumference - (progress / 100) * circumference"
              class="transition-all duration-300 ease-out"
            />
          </svg>

          <!-- Logo in Center -->
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <Plane class="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <!-- Brand Name -->
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          Ticketing Airlines
        </h1>

        <!-- Tagline -->
        <p class="text-gray-600 text-sm mb-6">
          Philippines' Favorite Airline
        </p>

        <!-- Progress Percentage -->
        <div class="mb-4">
          <span class="text-3xl font-light text-blue-600">{{ progress }}%</span>
        </div>

        <!-- Loading Text -->
        <p class="text-gray-700 font-medium">
          {{ loadingText }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Ensure the loading screen covers everything */
body {
  overflow: hidden;
}
</style>
