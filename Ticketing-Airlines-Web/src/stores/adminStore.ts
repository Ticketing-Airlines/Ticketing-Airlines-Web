import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface DashboardStats {
    totalBookings: number
    totalRevenue: number
    activeFlights: number
    totalUsers: number
}

export interface RecentBooking {
    id: string
    reference: string
    passenger: string
    route: string
    status: string
    amount: number
    date: string
}

export interface Flight {
    id: string
    flightNumber: string
    from: string
    to: string
    departure: string
    arrival: string
    status: 'On Time' | 'Delayed' | 'Cancelled'
    capacity: number
    booked: number
}

// Admin credentials (mocked for frontend demo)
const ADMIN_CREDENTIALS = {
    email: 'admin@airlines.com',
    password: 'admin123'
}

export const useAdminStore = defineStore('admin', () => {
    // State
    const stats = ref<DashboardStats>({
        totalBookings: 1247,
        totalRevenue: 12500000,
        activeFlights: 45,
        totalUsers: 3892
    })

    const recentBookings = ref<RecentBooking[]>([
        {
            id: '1',
            reference: 'ABC123',
            passenger: 'John Doe',
            route: 'MNL → CEB',
            status: 'Confirmed',
            amount: 10200,
            date: '2024-01-15'
        },
        {
            id: '2',
            reference: 'XYZ789',
            passenger: 'Jane Smith',
            route: 'MNL → DVO',
            status: 'Confirmed',
            amount: 8500,
            date: '2024-01-14'
        },
        {
            id: '3',
            reference: 'DEF456',
            passenger: 'Bob Johnson',
            route: 'CEB → MNL',
            status: 'Pending',
            amount: 9200,
            date: '2024-01-14'
        }
    ])

    const flights = ref<Flight[]>([
        {
            id: '1',
            flightNumber: '5J 561',
            from: 'Manila (MNL)',
            to: 'Cebu (CEB)',
            departure: '06:00',
            arrival: '07:25',
            status: 'On Time',
            capacity: 180,
            booked: 156
        },
        {
            id: '2',
            flightNumber: '5J 562',
            from: 'Cebu (CEB)',
            to: 'Manila (MNL)',
            departure: '08:00',
            arrival: '09:25',
            status: 'On Time',
            capacity: 180,
            booked: 142
        },
        {
            id: '3',
            flightNumber: '5J 801',
            from: 'Manila (MNL)',
            to: 'Davao (DVO)',
            departure: '10:30',
            arrival: '12:15',
            status: 'Delayed',
            capacity: 180,
            booked: 165
        }
    ])

    const isLoading = ref(false)
    const isAuthenticated = ref(false)
    const adminEmail = ref<string | null>(null)
    const errorMessage = ref<string | null>(null)

    // Initialize authentication state from localStorage
    const initAuth = () => {
        const stored = localStorage.getItem('admin_authenticated')
        const storedEmail = localStorage.getItem('admin_email')
        if (stored === 'true' && storedEmail) {
            isAuthenticated.value = true
            adminEmail.value = storedEmail
        }
    }

    // Computed
    const isAdmin = computed(() => isAuthenticated.value)

    // Actions
    async function adminLogin(email: string, password: string): Promise<boolean> {
        isLoading.value = true
        errorMessage.value = null

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800))

            // Check credentials
            if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
                isAuthenticated.value = true
                adminEmail.value = email

                // Persist authentication
                localStorage.setItem('admin_authenticated', 'true')
                localStorage.setItem('admin_email', email)

                console.log('Admin login successful')
                return true
            } else {
                errorMessage.value = 'Invalid admin credentials'
                return false
            }
        } catch (error) {
            console.error('Admin login error:', error)
            errorMessage.value = 'An error occurred during login'
            return false
        } finally {
            isLoading.value = false
        }
    }

    function logout() {
        isAuthenticated.value = false
        adminEmail.value = null
        localStorage.removeItem('admin_authenticated')
        localStorage.removeItem('admin_email')
        console.log('Admin logged out')
    }

    function clearError() {
        errorMessage.value = null
    }

    async function getDashboardStats() {
        isLoading.value = true
        try {
            await new Promise(resolve => setTimeout(resolve, 500))
            return stats.value
        } finally {
            isLoading.value = false
        }
    }

    async function getRecentBookings() {
        isLoading.value = true
        try {
            await new Promise(resolve => setTimeout(resolve, 300))
            return recentBookings.value
        } finally {
            isLoading.value = false
        }
    }

    async function getFlights() {
        isLoading.value = true
        try {
            await new Promise(resolve => setTimeout(resolve, 300))
            return flights.value
        } finally {
            isLoading.value = false
        }
    }

    function updateFlightStatus(flightId: string, status: 'On Time' | 'Delayed' | 'Cancelled') {
        const flight = flights.value.find(f => f.id === flightId)
        if (flight) {
            flight.status = status
        }
    }

    // Initialize on store creation
    initAuth()

    return {
        stats,
        recentBookings,
        flights,
        isLoading,
        isAuthenticated,
        isAdmin,
        adminEmail,
        errorMessage,
        adminLogin,
        logout,
        clearError,
        getDashboardStats,
        getRecentBookings,
        getFlights,
        updateFlightStatus
    }
})
