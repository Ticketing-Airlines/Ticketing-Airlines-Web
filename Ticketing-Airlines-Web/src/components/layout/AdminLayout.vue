<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import {
  LayoutDashboard,
  Plane,
  Users,
  Ticket,
  Package,
  LogOut,
  Menu,
  X
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isSidebarOpen = ref(true)

const menuItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Flights', path: '/admin/flights', icon: Plane },
  { name: 'Users & Roles', path: '/admin/users', icon: Users },
  { name: 'Bookings & Tickets', path: '/admin/bookings', icon: Ticket },
  { name: 'Inventory', path: '/admin/inventory', icon: Package }
]

const isActive = (path: string) => {
  return route.path === path
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const currentUser = computed(() => authStore.currentUser)
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Logo -->
      <div class="h-16 flex items-center justify-between px-6 border-b border-gray-200">
        <div class="flex items-center space-x-2">
          <Plane class="w-6 h-6 text-blue-600" />
          <span class="font-bold text-xl text-gray-900">Admin Panel</span>
        </div>
        <button @click="toggleSidebar" class="lg:hidden p-1 rounded-md hover:bg-gray-100">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6 space-y-1">
        <button
          v-for="item in menuItems"
          :key="item.path"
          @click="router.push(item.path)"
          :class="[
            'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
            isActive(item.path)
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
          ]"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span>{{ item.name }}</span>
        </button>
      </nav>

      <!-- User Info & Logout -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span class="text-white text-sm font-medium">
                {{ currentUser?.name?.charAt(0) || 'A' }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ currentUser?.name || 'Admin' }}
              </p>
              <p class="text-xs text-gray-500 truncate">
                {{ currentUser?.email }}
              </p>
            </div>
          </div>
          <button
            @click="handleLogout"
            class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Logout"
          >
            <LogOut class="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div
      :class="[
        'transition-all duration-300 ease-in-out',
        isSidebarOpen ? 'lg:ml-64' : 'ml-0'
      ]"
    >
      <!-- Top Bar -->
      <header class="h-16 bg-white border-b border-gray-200 sticky top-0 z-40">
        <div class="h-full px-4 flex items-center justify-between">
          <button
            @click="toggleSidebar"
            class="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Menu class="w-6 h-6 text-gray-600" />
          </button>

          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">
              Welcome back, <span class="font-medium">{{ currentUser?.name }}</span>
            </span>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <router-view />
      </main>
    </div>

    <!-- Overlay for mobile -->
    <div
      v-if="isSidebarOpen"
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
    ></div>
  </div>
</template>
