import { defineStore } from 'pinia'
import { ref } from 'vue'

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

    // Actions
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

    return {
        stats,
        recentBookings,
        flights,
        isLoading,
        getDashboardStats,
        getRecentBookings,
        getFlights,
        updateFlightStatus
    }
})
