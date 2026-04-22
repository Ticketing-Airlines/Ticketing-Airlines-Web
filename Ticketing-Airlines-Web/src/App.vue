<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useUiStore } from '@/stores/uiStore'

const authStore = useAuthStore()
const uiStore = useUiStore()

onMounted(() => {
  authStore.checkAuthStatus()
  authStore.loadRememberedEmail()
})
</script>

<template>
  <div :class="{ 'dark': uiStore.theme === 'dark' }">
    <RouterView />
    
    <!-- Global Notifications -->
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <transition-group name="list">
        <div 
          v-for="notification in uiStore.notifications" 
          :key="notification.id"
          class="p-4 rounded shadow-lg text-white font-bold min-w-[300px] transform transition-all duration-300"
          :class="{
            'bg-green-600': notification.type === 'success',
            'bg-red-600': notification.type === 'error',
            'bg-blue-600': notification.type === 'info',
            'bg-yellow-600': notification.type === 'warning'
          }"
        >
          {{ notification.message }}
        </div>
      </transition-group>
    </div>
  </div>
</template>
