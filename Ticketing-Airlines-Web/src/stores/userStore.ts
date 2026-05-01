import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService } from '@/services/userService'

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
    dateOfBirth: string
    gender?: string
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
    async function initializeUser(userId: string) {
        isLoading.value = true
        try {
            const userData = await userService.getUserById(userId)
            
            if (userData) {
                profile.value = {
                    userId: userData.id,
                    email: userData.email,
                    name: userData.fullName,
                    phone: userData.phoneNumber ?? '',
                    dateOfBirth: userData.dateOfBirth,
                    gender: userData.gender ?? undefined,
                }
            } else {
                throw new Error('User data not found')
            }
        } catch (error) {
            profile.value = null
            throw error
        } finally {
            isLoading.value = false
        }
    }

    async function updateProfile(data: Partial<UserProfile>) {
        if (!profile.value) {
            throw new Error('No profile loaded')
        }

        const nameParts = data.name?.split(' ') || []
        const firstName = nameParts[0] || ''
        const lastName = nameParts.slice(1).join(' ') || ''

        const updateData = {
            firstName,
            lastName,
            phoneNumber: data.phone,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
        }

        try {
            const result = await userService.updateUser(profile.value.userId, updateData)
            
            if (result && profile.value) {
                profile.value = {
                    ...profile.value,
                    name: result.fullName,
                    phone: result.phoneNumber ?? profile.value.phone,
                    dateOfBirth: result.dateOfBirth,
                    gender: result.gender ?? profile.value.gender,
                }
            }
            
            return result
        } catch (error) {
            // Re-throw the error so the component can handle it
            throw error
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
