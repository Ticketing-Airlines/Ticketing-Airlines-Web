import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
    FlightSearchResult,
    RoundTripResult,
    MultiCityResult,
    FareBundleType
} from '@/interfaces/interfaces'
import { bookings as mockBookings } from '@/data/mockData'
import { getBundleByType } from '@/data/fareBundles'

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
    const selectedBundle = ref<FareBundleType>('SKYPLUS') // Default to SkyPlus (recommended)

    // Add-ons State
    const addOns = ref({
        baggage: [] as { passengerId: number, weight: number, price: number }[],
        meals: [] as { passengerId: number, mealId: string, price: number }[],
        seats: [] as { passengerId: number, seatNumber: string, price: number }[]
    })

    // Manage Booking State
    const retrievedBooking = ref<any>(null)
    const userBookings = ref<any[]>([])
    const isSearchingBooking = ref(false)
    const bookingError = ref('')

    // Getters
    const baseFare = computed(() => {
        if (!selectedFlight.value) return 0

        let basePrice = 0
        if ('price' in selectedFlight.value) {
            basePrice = selectedFlight.value.price
        } else if ('totalPrice' in selectedFlight.value) {
            basePrice = selectedFlight.value.totalPrice
        }

        // Apply bundle price modifier
        const bundle = getBundleByType(selectedBundle.value)
        return bundle ? Math.round(basePrice * bundle.priceModifier) : basePrice
    })

    const taxes = computed(() => Math.round(baseFare.value * 0.12))
    const fees = computed(() => 500)

    const totalPrice = computed(() => {
        const addOnsTotal =
            addOns.value.baggage.reduce((sum, item) => sum + item.price, 0) +
            addOns.value.meals.reduce((sum, item) => sum + item.price, 0) +
            addOns.value.seats.reduce((sum, item) => sum + item.price, 0)

        return ((baseFare.value + taxes.value + fees.value) * passengers.value.length) + addOnsTotal
    })

    // Actions
    function initBooking(
        flight: FlightSearchResult | RoundTripResult | MultiCityResult,
        passengerCount: number = 1,
        bundle: FareBundleType = 'SKYPLUS'
    ) {
        resetBooking()
        selectedFlight.value = flight
        selectedBundle.value = bundle

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

    function setBundle(bundle: FareBundleType) {
        selectedBundle.value = bundle
    }

    function updateBaggage(passengerId: number, weight: number, price: number) {
        const index = addOns.value.baggage.findIndex(b => b.passengerId === passengerId)
        if (index !== -1) {
            if (weight === 0) {
                addOns.value.baggage.splice(index, 1)
            } else {
                addOns.value.baggage[index] = { passengerId, weight, price }
            }
        } else if (weight > 0) {
            addOns.value.baggage.push({ passengerId, weight, price })
        }
    }

    function updateMeal(passengerId: number, mealId: string, price: number) {
        const index = addOns.value.meals.findIndex(m => m.passengerId === passengerId)
        if (index !== -1) {
            if (!mealId) {
                addOns.value.meals.splice(index, 1)
            } else {
                addOns.value.meals[index] = { passengerId, mealId, price }
            }
        } else if (mealId) {
            addOns.value.meals.push({ passengerId, mealId, price })
        }
    }

    function selectSeat(passengerId: number, seatNumber: string, price: number) {
        const index = addOns.value.seats.findIndex(s => s.passengerId === passengerId)
        if (index !== -1) {
            addOns.value.seats[index] = { passengerId, seatNumber, price }
        } else {
            addOns.value.seats.push({ passengerId, seatNumber, price })
        }
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
        selectedBundle.value = 'SKYPLUS'
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

            // Check against mock data first
            const foundMock = mockBookings.find(b => b.pnr === reference.toUpperCase())

            if (foundMock) {
                // Construct a full booking object from mock data parts if needed, 
                // or just return a standard mock structure for now to ensure UI works
                // For simplicity in this phase, we'll return a rich object similar to the previous mock
                retrievedBooking.value = {
                    reference: foundMock.pnr,
                    status: foundMock.status,
                    bookingDate: new Date(foundMock.bookingDate).toLocaleDateString(),
                    outbound: {
                        from: 'Manila (MNL)',
                        to: 'Cebu (CEB)',
                        flightNumber: 'SS 101',
                        date: 'October 16, 2025',
                        time: '08:00 - 09:15',
                        duration: '1h 15m'
                    },
                    passengers: [
                        {
                            id: 1,
                            name: foundMock.contactName,
                            type: 'Adult',
                            seat: '1A',
                            meal: 'Standard'
                        }
                    ],
                    pricing: {
                        baseFare: 2500,
                        taxes: 500,
                        addOns: 299,
                        total: foundMock.totalAmount
                    }
                }
                return true
            }

            // Fallback for testing specific PNRs not in mockData but used in manual tests
            if (reference.toUpperCase() === 'TEST01') {
                retrievedBooking.value = {
                    reference: 'TEST01',
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
            }

            throw new Error('Booking not found. Please check your details and try again.')

        } catch (error: any) {
            console.error('Failed to retrieve booking:', error)
            bookingError.value = error.message || 'Booking not found'
            retrievedBooking.value = null
            return false
        } finally {
            isSearchingBooking.value = false
        }
    }

    async function getUserBookings(email: string) {
        isSearchingBooking.value = true
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Filter mock bookings by email
            const userMockBookings = mockBookings.filter(b => b.contactEmail === email)

            // Transform to UI friendly format
            userBookings.value = userMockBookings.map(b => ({
                reference: b.pnr,
                status: b.status,
                bookingDate: new Date(b.bookingDate).toLocaleDateString(),
                destination: 'Cebu (CEB)', // Mock destination for list view
                date: 'Oct 16, 2025',
                amount: b.totalAmount
            }))

            // Add some dummy data if empty for demo purposes
            if (userBookings.value.length === 0) {
                userBookings.value = [
                    {
                        reference: 'XYZ789',
                        status: 'Confirmed',
                        bookingDate: 'Oct 10, 2025',
                        destination: 'Boracay (MPH)',
                        date: 'Nov 20, 2025',
                        amount: 5499
                    },
                    {
                        reference: 'PQR456',
                        status: 'Completed',
                        bookingDate: 'Sep 01, 2025',
                        destination: 'Davao (DVO)',
                        date: 'Sep 15, 2025',
                        amount: 4199
                    }
                ]
            }

        } catch (error) {
            console.error('Failed to get user bookings:', error)
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
        userBookings,
        isSearchingBooking,
        bookingError,
        initBooking,
        updatePassenger,
        setContactInfo,
        setPaymentInfo,
        setStep,
        processPayment,
        resetBooking,
        retrieveBooking,
        getUserBookings,
        addOns,
        updateBaggage,
        updateMeal,
        selectSeat,
        selectedBundle,
        setBundle
    }
})
