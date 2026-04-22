import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Notification {
    id: string
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
    timeout?: number
}

export const useUiStore = defineStore('ui', () => {
    // State
    const isLoading = ref(false)
    const isSidebarOpen = ref(false)
    const theme = ref<'light' | 'dark'>('light')
    const notifications = ref<Notification[]>([])

    // Actions
    function setLoading(loading: boolean) {
        isLoading.value = loading
    }

    function toggleSidebar() {
        isSidebarOpen.value = !isSidebarOpen.value
    }

    function toggleTheme() {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
        // Apply theme to document
        if (theme.value === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    function showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', timeout = 3000) {
        const id = Date.now().toString()
        const notification: Notification = { id, message, type, timeout }
        notifications.value.push(notification)

        if (timeout > 0) {
            setTimeout(() => {
                removeNotification(id)
            }, timeout)
        }
    }

    function removeNotification(id: string) {
        const index = notifications.value.findIndex(n => n.id === id)
        if (index !== -1) {
            notifications.value.splice(index, 1)
        }
    }

    return {
        isLoading,
        isSidebarOpen,
        theme,
        notifications,
        setLoading,
        toggleSidebar,
        toggleTheme,
        showNotification,
        removeNotification
    }
})
