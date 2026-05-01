<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useUiStore } from '@/stores/uiStore'
import ToastContainer from '@/components/ui/ToastContainer.vue'
import { useToast } from '@/composables/useToast'

const authStore = useAuthStore()
const uiStore = useUiStore()
const { toasts, removeToast } = useToast()

onMounted(() => {
  authStore.checkAuthStatus()
  authStore.loadRememberedEmail()
})
</script>

<template>
  <div :class="{ 'dark': uiStore.theme === 'dark' }">
    <RouterView />
    
    <!-- Toast Notifications -->
    <ToastContainer :toasts="toasts" position="top-right" @close="removeToast" />
  </div>
</template>
