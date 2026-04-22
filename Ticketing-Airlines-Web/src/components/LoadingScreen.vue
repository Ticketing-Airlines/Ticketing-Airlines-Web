<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Plane, Zap, Globe, Shield } from 'lucide-vue-next'

const props = defineProps<{
  isVisible: boolean
}>()

const emit = defineEmits<{
  finished: []
}>()

const loadingText = ref('INITIALIZING FLIGHT SYSTEMS...')
const progress = ref(0)
const circumference = 2 * Math.PI * 54 // radius = 54
const loadingSteps = ref([
  { text: 'INITIALIZING FLIGHT SYSTEMS...', icon: Zap, color: 'blue' },
  { text: 'PREPARING YOUR JOURNEY...', icon: Plane, color: 'green' },
  { text: 'LOADING DESTINATIONS...', icon: Globe, color: 'purple' },
  { text: 'SECURING YOUR BOOKING...', icon: Shield, color: 'orange' },
  { text: 'ALMOST READY...', icon: Zap, color: 'red' }
])

let progressInterval: ReturnType<typeof setInterval> | null = null

const cleanup = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
}

const startLoading = () => {
  progress.value = 0
  loadingText.value = loadingSteps.value[0].text

  // Progress animation over 3 seconds
  progressInterval = setInterval(() => {
    progress.value += 4

    // Update text based on progress
    if (progress.value >= 80) {
      loadingText.value = loadingSteps.value[4].text
    } else if (progress.value >= 60) {
      loadingText.value = loadingSteps.value[3].text
    } else if (progress.value >= 40) {
      loadingText.value = loadingSteps.value[2].text
    } else if (progress.value >= 20) {
      loadingText.value = loadingSteps.value[1].text
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
    <div v-if="isVisible" class="fixed inset-0 z-[9999] bg-white overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10" style="background: repeating-linear-gradient(45deg, transparent, transparent 20px, #1f2937 20px, #1f2937 21px);"></div>

      <!-- Corner Accents -->
      <div class="absolute top-0 right-0 w-0 h-0 border-t-[120px] border-t-blue-600 border-l-[120px] border-l-transparent"></div>
      <div class="absolute bottom-0 left-0 w-0 h-0 border-b-[100px] border-b-green-600 border-r-[100px] border-r-transparent"></div>

      <!-- Main Loading Content -->
      <div class="relative flex items-center justify-center min-h-screen px-4 py-8">
        <div class="text-center max-w-xl mx-auto">
          <!-- Logo Section -->
          <div class="relative mb-6">
            <!-- Shadow Block -->
            <div class="absolute top-2 left-2 w-20 h-20 bg-blue-600 -z-10"></div>

            <!-- Main Logo -->
            <div class="relative w-20 h-20 bg-gray-900 flex items-center justify-center mx-auto">
              <Plane class="w-10 h-10 text-white" />
            </div>

            <!-- Corner Accent -->
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[25px] border-t-green-600 border-l-[25px] border-l-transparent"></div>
          </div>

          <!-- Brand Name -->
          <div class="mb-6">
            <h1 class="text-3xl sm:text-4xl font-black text-gray-900 mb-2 uppercase tracking-tight">
              AIRLINES
            </h1>
            <div class="flex items-center justify-center gap-3 mb-1.5">
              <div class="h-0.5 w-12 bg-gray-900"></div>
              <div class="w-1.5 h-1.5 bg-blue-600"></div>
              <div class="h-0.5 w-12 bg-gray-900"></div>
            </div>
            <h2 class="text-base font-black text-gray-600 uppercase tracking-widest">
              TICKETING
            </h2>
          </div>

          <!-- Progress Section -->
          <div class="bg-white border-4 border-gray-900 p-4 mb-4 relative">
            <!-- Corner Accent -->
            <div class="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-t-purple-600 border-l-[20px] border-l-transparent"></div>

            <!-- Progress Circle -->
            <div class="relative mb-4">
              <div class="w-16 h-16 mx-auto relative">
                <!-- Progress Circle -->
                <svg
                  class="w-16 h-16 -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    stroke="#1f2937"
                    stroke-width="8"
                    fill="none"
                    stroke-linecap="square"
                    :stroke-dasharray="circumference"
                    :stroke-dashoffset="circumference - (progress / 100) * circumference"
                    class="transition-all duration-300 ease-out"
                  />
                </svg>

                <!-- Progress Percentage -->
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span class="text-lg font-black text-gray-900">{{ progress }}%</span>
                </div>
              </div>
            </div>

            <!-- Loading Text -->
            <div class="mb-3">
              <p class="text-sm font-black text-gray-900 uppercase tracking-wider">
                {{ loadingText }}
              </p>
            </div>

            <!-- Progress Bar -->
            <div class="w-full h-3 bg-gray-900 border-2 border-gray-900">
              <div
                class="h-full bg-blue-600 transition-all duration-300 ease-out"
                :style="{ width: `${progress}%` }"
              ></div>
            </div>
          </div>

          <!-- Status Cards -->
          <div class="grid grid-cols-4 gap-2">
            <div class="bg-white border-4 border-gray-900 p-2 text-center">
              <div class="w-6 h-6 bg-blue-600 mx-auto mb-1.5 flex items-center justify-center">
                <Zap class="w-3 h-3 text-white" />
              </div>
              <p class="text-[10px] font-black text-gray-900 uppercase tracking-wider">SYSTEMS</p>
            </div>

            <div class="bg-white border-4 border-gray-900 p-2 text-center">
              <div class="w-6 h-6 bg-green-600 mx-auto mb-1.5 flex items-center justify-center">
                <Plane class="w-3 h-3 text-white" />
              </div>
              <p class="text-[10px] font-black text-gray-900 uppercase tracking-wider">FLIGHTS</p>
            </div>

            <div class="bg-white border-4 border-gray-900 p-2 text-center">
              <div class="w-6 h-6 bg-purple-600 mx-auto mb-1.5 flex items-center justify-center">
                <Globe class="w-3 h-3 text-white" />
              </div>
              <p class="text-[10px] font-black text-gray-900 uppercase tracking-wider">ROUTES</p>
            </div>

            <div class="bg-white border-4 border-gray-900 p-2 text-center">
              <div class="w-6 h-6 bg-orange-600 mx-auto mb-1.5 flex items-center justify-center">
                <Shield class="w-3 h-3 text-white" />
              </div>
              <p class="text-[10px] font-black text-gray-900 uppercase tracking-wider">SECURITY</p>
            </div>
          </div>

          <!-- Tagline -->
          <div class="mt-4">
            <p class="text-xs font-black text-gray-600 uppercase tracking-widest">
              PHILIPPINES' FAVORITE AIRLINE
            </p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Ensure the loading screen covers everything */
body {
  overflow: hidden;
}

/* Brutalist loading animations */
@keyframes pulse-brutal {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.pulse-brutal {
  animation: pulse-brutal 2s ease-in-out infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #1f2937;
  border-radius: 0;
}

::-webkit-scrollbar-thumb:hover {
  background: #374151;
}
</style>
