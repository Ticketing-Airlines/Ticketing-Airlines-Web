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

    const allBookings = ref<RecentBooking[]>([
        { id: '1', reference: 'ABC123', passenger: 'John Doe', route: 'MNL → CEB', status: 'Confirmed', amount: 10200, date: '2024-01-15' },
        { id: '2', reference: 'XYZ789', passenger: 'Jane Smith', route: 'MNL → DVO', status: 'Confirmed', amount: 8500, date: '2024-01-14' },
        { id: '3', reference: 'DEF456', passenger: 'Bob Johnson', route: 'CEB → MNL', status: 'Pending', amount: 9200, date: '2024-01-14' },
        { id: '4', reference: 'GHI789', passenger: 'Maria Santos', route: 'MNL → BCD', status: 'Confirmed', amount: 12500, date: '2024-01-13' },
        { id: '5', reference: 'JKL012', passenger: 'Pedro Cruz', route: 'DVO → MNL', status: 'Confirmed', amount: 9800, date: '2024-01-13' },
        { id: '6', reference: 'MNO345', passenger: 'Lisa Wong', route: 'MNL → CEB', status: 'Cancelled', amount: 11200, date: '2024-01-12' },
        { id: '7', reference: 'PQR678', passenger: 'Michael Tan', route: 'CEB → DVO', status: 'Confirmed', amount: 7500, date: '2024-01-12' },
        { id: '8', reference: 'STU901', passenger: 'Sarah Lee', route: 'MNL → ILO', status: 'Pending', amount: 8900, date: '2024-01-11' },
        { id: '9', reference: 'VWX234', passenger: 'David Garcia', route: 'BCD → MNL', status: 'Confirmed', amount: 13000, date: '2024-01-11' },
        { id: '10', reference: 'YZA567', passenger: 'Anna Reyes', route: 'MNL → DVO', status: 'Confirmed', amount: 9200, date: '2024-01-10' },
        { id: '11', reference: 'BCD890', passenger: 'Robert Kim', route: 'CEB → MNL', status: 'Cancelled', amount: 10500, date: '2024-01-10' },
        { id: '12', reference: 'EFG123', passenger: 'Emma Rodriguez', route: 'MNL → CEB', status: 'Confirmed', amount: 11800, date: '2024-01-09' },
        { id: '13', reference: 'HIJ456', passenger: 'James Park', route: 'DVO → CEB', status: 'Pending', amount: 6500, date: '2024-01-09' },
        { id: '14', reference: 'KLM789', passenger: 'Sofia Gonzales', route: 'MNL → BCD', status: 'Confirmed', amount: 14200, date: '2024-01-08' },
        { id: '15', reference: 'NOP012', passenger: 'Daniel Lim', route: 'ILO → MNL', status: 'Confirmed', amount: 8700, date: '2024-01-08' }
    ])

    const recentBookings = computed(() => allBookings.value.slice(0, 5))

    const allFlights = ref<Flight[]>([
        { id: '1', flightNumber: '5J 561', from: 'Manila (MNL)', to: 'Cebu (CEB)', departure: '06:00', arrival: '07:25', status: 'On Time', capacity: 180, booked: 156 },
        { id: '2', flightNumber: '5J 562', from: 'Cebu (CEB)', to: 'Manila (MNL)', departure: '08:00', arrival: '09:25', status: 'On Time', capacity: 180, booked: 142 },
        { id: '3', flightNumber: '5J 801', from: 'Manila (MNL)', to: 'Davao (DVO)', departure: '10:30', arrival: '12:15', status: 'Delayed', capacity: 180, booked: 165 },
        { id: '4', flightNumber: 'PR 2801', from: 'Manila (MNL)', to: 'Boracay (MPH)', departure: '07:00', arrival: '08:10', status: 'On Time', capacity: 156, booked: 145 },
        { id: '5', flightNumber: 'PR 2802', from: 'Boracay (MPH)', to: 'Manila (MNL)', departure: '09:00', arrival: '10:10', status: 'On Time', capacity: 156, booked: 138 },
        { id: '6', flightNumber: '5J 321', from: 'Cebu (CEB)', to: 'Davao (DVO)', departure: '11:30', arrival: '12:45', status: 'On Time', capacity: 180, booked: 92 },
        { id: '7', flightNumber: '5J 322', from: 'Davao (DVO)', to: 'Cebu (CEB)', departure: '13:30', arrival: '14:45', status: 'Cancelled', capacity: 180, booked: 0 },
        { id: '8', flightNumber: 'Z2 101', from: 'Manila (MNL)', to: 'Iloilo (ILO)', departure: '14:00', arrival: '15:15', status: 'On Time', capacity: 180, booked: 168 },
        { id: '9', flightNumber: 'Z2 102', from: 'Iloilo (ILO)', to: 'Manila (MNL)', departure: '16:00', arrival: '17:15', status: 'Delayed', capacity: 180, booked: 175 },
        { id: '10', flightNumber: 'PR 103', from: 'Manila (MNL)', to: 'Singapore (SIN)', departure: '22:00', arrival: '01:45', status: 'On Time', capacity: 295, booked: 267 }
    ])

    const flights = computed(() => allFlights.value.slice(0, 5))

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
        const flight = allFlights.value.find(f => f.id === flightId)
        if (flight) {
            flight.status = status
        }
    }

    function searchBookings(query: string): RecentBooking[] {
        if (!query.trim()) return allBookings.value

        const lowerQuery = query.toLowerCase()
        return allBookings.value.filter(booking =>
            booking.reference.toLowerCase().includes(lowerQuery) ||
            booking.passenger.toLowerCase().includes(lowerQuery) ||
            booking.route.toLowerCase().includes(lowerQuery)
        )
    }

    function filterBookingsByStatus(status: string): RecentBooking[] {
        if (status === 'All') return allBookings.value
        return allBookings.value.filter(booking => booking.status === status)
    }

    function cancelBooking(bookingId: string): boolean {
        const booking = allBookings.value.find(b => b.id === bookingId)
        if (booking && booking.status !== 'Cancelled') {
            booking.status = 'Cancelled'
            return true
        }
        return false
    }

    function searchFlights(query: string): Flight[] {
        if (!query.trim()) return allFlights.value

        const lowerQuery = query.toLowerCase()
        return allFlights.value.filter(flight =>
            flight.flightNumber.toLowerCase().includes(lowerQuery) ||
            `${flight.from} → ${flight.to}`.toLowerCase().includes(lowerQuery) ||
            flight.from.toLowerCase().includes(lowerQuery) ||
            flight.to.toLowerCase().includes(lowerQuery)
        )
    }

    function filterFlightsByStatus(status: string): Flight[] {
        if (status === 'All') return allFlights.value
        return allFlights.value.filter(flight => flight.status === status)
    }

    function getAllBookings() {
        return allBookings.value
    }

    function getAllFlights() {
        return allFlights.value
    }

    // Initialize on store creation
    initAuth()

    return {
        stats,
        recentBookings,
        flights,
        allBookings,
        allFlights,
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
        updateFlightStatus,
        searchBookings,
        filterBookingsByStatus,
        cancelBooking,
        searchFlights,
        filterFlightsByStatus,
        getAllBookings,
        getAllFlights
    }
})
