import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
    FlightSearchResult,
    RoundTripResult,
    MultiCityResult
} from '@/interfaces/interfaces'

export interface Passenger {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    nationality: string
    passportNumber: string
    dateOfBirth: string
    passengerType: 'Adult' | 'Child' | 'Infant'
}

export interface ContactInfo {
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
    country: string
}

export interface PaymentInfo {
    method: string
    cardNumber: string
    expiryDate: string
    cvv: string
    cardholderName: string
}

export const useBookingStore = defineStore('booking', () => {
    // State
    const currentStep = ref(1)
    const selectedFlight = ref<FlightSearchResult | RoundTripResult | MultiCityResult | null>(null)
    const passengers = ref<Passenger[]>([])
    const contactInfo = ref<ContactInfo>({
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'Philippines'
    })
    const paymentInfo = ref<PaymentInfo>({
        method: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: ''
    })
    const bookingReference = ref<string>('')
    const isProcessing = ref(false)

    // Manage Booking State
    const retrievedBooking = ref<any>(null)
    const isSearchingBooking = ref(false)
    const bookingError = ref('')

    // Getters
    const baseFare = computed(() => {
        if (!selectedFlight.value) return 0
        if ('price' in selectedFlight.value) {
            return selectedFlight.value.price
        } else if ('totalPrice' in selectedFlight.value) {
            return selectedFlight.value.totalPrice
        }
        return 0
    })

    const taxes = computed(() => Math.round(baseFare.value * 0.12))
    const fees = computed(() => 500)

    const totalPrice = computed(() => {
        return (baseFare.value + taxes.value + fees.value) * passengers.value.length
    })

    // Actions
    function initBooking(flight: FlightSearchResult | RoundTripResult | MultiCityResult, passengerCount: number = 1) {
        resetBooking()
        selectedFlight.value = flight

        // Initialize passengers
        passengers.value = Array.from({ length: passengerCount }, (_, index) => ({
            id: index + 1,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            nationality: 'PH',
            passportNumber: '',
            dateOfBirth: '',
            passengerType: 'Adult'
        }))
    }

    function updatePassenger(index: number, data: Partial<Passenger>) {
        if (passengers.value[index]) {
            passengers.value[index] = { ...passengers.value[index], ...data }
        }
    }

    function setContactInfo(data: Partial<ContactInfo>) {
        contactInfo.value = { ...contactInfo.value, ...data }
    }

    function setPaymentInfo(data: Partial<PaymentInfo>) {
        paymentInfo.value = { ...paymentInfo.value, ...data }
    }

    function setStep(step: number) {
        currentStep.value = step
    }

    async function processPayment() {
        isProcessing.value = true
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Generate random booking reference
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
            let result = ''
            for (let i = 0; i < 6; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length))
            }
            bookingReference.value = result

            return true
        } catch (error) {
            console.error('Payment processing failed:', error)
            return false
        } finally {
            isProcessing.value = false
        }
    }

    function resetBooking() {
        currentStep.value = 1
        selectedFlight.value = null
        passengers.value = []
        contactInfo.value = {
            email: '',
            phone: '',
            address: '',
            city: '',
            postalCode: '',
            country: 'Philippines'
        }
        paymentInfo.value = {
            method: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            cardholderName: ''
        }
        bookingReference.value = ''
        isProcessing.value = false
    }

    async function retrieveBooking(reference: string, lastName: string) {
        isSearchingBooking.value = true
        bookingError.value = ''
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Mock validation
            if (reference.length < 6 || lastName.length < 2) {
                throw new Error('Invalid booking reference or last name')
            }

            // Mock booking data
            retrievedBooking.value = {
                reference: reference.toUpperCase(),
                status: 'Confirmed',
                bookingDate: 'January 15, 2024',
                outbound: {
                    from: 'Manila (MNL)',
                    to: 'Cebu (CEB)',
                    flightNumber: '5J 561',
                    date: 'February 15, 2024',
                    time: '06:00 - 07:25',
                    duration: '1h 25m'
                },
                return: {
                    from: 'Cebu (CEB)',
                    to: 'Manila (MNL)',
                    flightNumber: '5J 562',
                    date: 'February 18, 2024',
                    time: '08:00 - 09:25',
                    duration: '1h 25m'
                },
                passengers: [
                    {
                        id: 1,
                        name: 'John Doe',
                        type: 'Adult',
                        seat: '12A',
                        meal: 'Standard'
                    },
                    {
                        id: 2,
                        name: 'Jane Doe',
                        type: 'Adult',
                        seat: '12B',
                        meal: 'Vegetarian'
                    }
                ],
                pricing: {
                    baseFare: 8500,
                    taxes: 1200,
                    addOns: 500,
                    total: 10200
                }
            }
            return true
        } catch (error: any) {
            console.error('Failed to retrieve booking:', error)
            bookingError.value = error.message || 'Booking not found'
            retrievedBooking.value = null
            return false
        } finally {
            isSearchingBooking.value = false
        }
    }

    return {
        currentStep,
        selectedFlight,
        passengers,
        contactInfo,
        paymentInfo,
        bookingReference,
        isProcessing,
        baseFare,
        taxes,
        fees,
        totalPrice,
        retrievedBooking,
        isSearchingBooking,
        bookingError,
        initBooking,
        updatePassenger,
        setContactInfo,
        setPaymentInfo,
        setStep,
        processPayment,
        resetBooking,
        retrieveBooking
    }
})
