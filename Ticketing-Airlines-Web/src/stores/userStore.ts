import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface SavedPassenger {
    id: string
    firstName: string
    lastName: string
    nationality: string
    passportNumber: string
    dateOfBirth: string
    passengerType: 'Adult' | 'Child' | 'Infant'
}

export interface PaymentMethod {
    id: string
    type: 'Credit Card' | 'Debit Card'
    cardNumber: string
    cardholderName: string
    expiryDate: string
    isDefault: boolean
}

export interface UserProfile {
    userId: string
    email: string
    name: string
    phone: string
    address: string
    city: string
    country: string
    dateOfBirth: string
    nationality: string
}

export interface BookingHistory {
    id: string
    reference: string
    status: 'Upcoming' | 'Completed' | 'Cancelled'
    bookingDate: string
    from: string
    to: string
    departureDate: string
    passengers: number
    totalPrice: number
}

export const useUserStore = defineStore('user', () => {
    // State
    const profile = ref<UserProfile | null>(null)
    const savedPassengers = ref<SavedPassenger[]>([])
    const paymentMethods = ref<PaymentMethod[]>([])
    const bookingHistory = ref<BookingHistory[]>([])
    const isLoading = ref(false)

    // Actions
    function initializeUser(userId: string) {
        // Mock user data
        profile.value = {
            userId,
            email: 'john.doe@example.com',
            name: 'John Doe',
            phone: '+63 912 345 6789',
            address: '123 Main Street',
            city: 'Manila',
            country: 'Philippines',
            dateOfBirth: '1990-01-15',
            nationality: 'PH'
        }

        // Mock saved passengers
        savedPassengers.value = [
            {
                id: '1',
                firstName: 'Jane',
                lastName: 'Doe',
                nationality: 'PH',
                passportNumber: 'P1234567',
                dateOfBirth: '1992-05-20',
                passengerType: 'Adult'
            }
        ]

        // Mock payment methods
        paymentMethods.value = [
            {
                id: '1',
                type: 'Credit Card',
                cardNumber: '**** **** **** 1234',
                cardholderName: 'JOHN DOE',
                expiryDate: '12/25',
                isDefault: true
            }
        ]

        // Mock booking history
        bookingHistory.value = [
            {
                id: '1',
                reference: 'ABC123',
                status: 'Upcoming',
                bookingDate: '2024-01-15',
                from: 'Manila (MNL)',
                to: 'Cebu (CEB)',
                departureDate: '2024-02-15',
                passengers: 2,
                totalPrice: 10200
            },
            {
                id: '2',
                reference: 'XYZ789',
                status: 'Completed',
                bookingDate: '2023-12-01',
                from: 'Manila (MNL)',
                to: 'Davao (DVO)',
                departureDate: '2023-12-25',
                passengers: 1,
                totalPrice: 5500
            }
        ]
    }

    function updateProfile(data: Partial<UserProfile>) {
        if (profile.value) {
            profile.value = { ...profile.value, ...data }
        }
    }

    function addPassenger(passenger: Omit<SavedPassenger, 'id'>) {
        const newPassenger: SavedPassenger = {
            ...passenger,
            id: Date.now().toString()
        }
        savedPassengers.value.push(newPassenger)
    }

    function removePassenger(id: string) {
        const index = savedPassengers.value.findIndex(p => p.id === id)
        if (index !== -1) {
            savedPassengers.value.splice(index, 1)
        }
    }

    function addPaymentMethod(method: Omit<PaymentMethod, 'id'>) {
        const newMethod: PaymentMethod = {
            ...method,
            id: Date.now().toString()
        }
        paymentMethods.value.push(newMethod)
    }

    function removePaymentMethod(id: string) {
        const index = paymentMethods.value.findIndex(m => m.id === id)
        if (index !== -1) {
            paymentMethods.value.splice(index, 1)
        }
    }

    function setDefaultPaymentMethod(id: string) {
        paymentMethods.value.forEach(method => {
            method.isDefault = method.id === id
        })
    }

    async function getBookingHistory(filter?: 'Upcoming' | 'Completed' | 'Cancelled') {
        isLoading.value = true
        try {
            await new Promise(resolve => setTimeout(resolve, 500))

            if (filter) {
                return bookingHistory.value.filter(b => b.status === filter)
            }
            return bookingHistory.value
        } finally {
            isLoading.value = false
        }
    }

    return {
        profile,
        savedPassengers,
        paymentMethods,
        bookingHistory,
        isLoading,
        initializeUser,
        updateProfile,
        addPassenger,
        removePassenger,
        addPaymentMethod,
        removePaymentMethod,
        setDefaultPaymentMethod,
        getBookingHistory
    }
})
