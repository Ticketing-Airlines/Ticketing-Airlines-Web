import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
    FlightSearchResult,
    RoundTripResult,
    MultiCityResult,
    FareBundleType
} from '@/interfaces/interfaces'
import type { BookingPassenger } from '@/types/booking'
import type { FlightAddOn } from '@/types/flightAddOn'
import type { AddOnPrice } from '@/types/addOnPrice'
import type { PaymentMethod } from '@/types/paymentMethod'
import { bookings as mockBookings } from '@/data/mockData'
import { bookingService } from '@/services/bookingService'

export interface ContactInfo {
    email: string
    phone: string
}

// Legacy types for retrieve booking feature (mock data)
interface LegacyBooking {
    reference: string
    status: string
    bookingDate: string
    destination?: string
    date?: string
    amount?: number
    outbound?: {
        from: string
        to: string
        flightNumber: string
        date: string
        time: string
        duration: string
    }
    return?: {
        from: string
        to: string
        flightNumber: string
        date: string
        time: string
        duration: string
    }
    passengers?: Array<{
        id: number
        name: string
        type: string
        seat: string
        meal: string
    }>
    pricing?: {
        baseFare: number
        taxes: number
        addOns: number
        total: number
    }
}

export const useBookingStore = defineStore('booking', () => {
    // State
    const currentStep = ref(1)
    const selectedFlight = ref<FlightSearchResult | RoundTripResult | MultiCityResult | null>(null)
    const passengers = ref<BookingPassenger[]>([])
    const contactInfo = ref<ContactInfo>({
        email: '',
        phone: ''
    })
    const selectedPaymentMethod = ref<string>('')
    const bookingPnr = ref<string>('')
    const bookingId = ref<string>('')
    const isProcessing = ref(false)
    const error = ref<string | null>(null)
    const selectedBundle = ref<FareBundleType>('SKYPLUS')
    
    // Add-ons data
    const availableAddOns = ref<FlightAddOn[]>([])
    const addOnPrices = ref<AddOnPrice[]>([])
    const paymentMethods = ref<PaymentMethod[]>([])
    
    // Flight IDs extracted from selected flight
    const flightIds = computed(() => {
        if (!selectedFlight.value) return []
        
        if ('flightInstanceId' in selectedFlight.value) {
            // One-way flight
            return [parseInt(selectedFlight.value.flightInstanceId)]
        } else if ('outbound' in selectedFlight.value) {
            // Round-trip
            const ids = [parseInt(selectedFlight.value.outbound.flightInstanceId)]
            if (selectedFlight.value.return) {
                ids.push(parseInt(selectedFlight.value.return.flightInstanceId))
            }
            return ids
        }
        return []
    })

    // Manage Booking State (for retrieve booking feature - legacy)
    const retrievedBooking = ref<LegacyBooking | null>(null)
    const userBookings = ref<LegacyBooking[]>([])
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

    const bundleIncrement = computed(() => {
        // Bundle increment will be added per passenger
        // This is a placeholder - actual value comes from FlightBundle API
        const increments: Record<FareBundleType, number> = {
            'SKYLITE': 0,
            'SKYPLUS': 600,
            'SKYFLEX': 1200
        }
        return increments[selectedBundle.value] || 0
    })

    const taxes = computed(() => Math.round(baseFare.value * 0.12))
    const fees = computed(() => 500)

    const addOnsTotal = computed(() => {
        return passengers.value.reduce((total, passenger) => {
            return total + passenger.selectedAddOns.reduce((sum, addOnPriceId) => {
                const addOnPrice = addOnPrices.value.find(ap => ap.id === addOnPriceId)
                return sum + (addOnPrice?.priceAmount || 0)
            }, 0)
        }, 0)
    })

    const totalPrice = computed(() => {
        const farePerPassenger = baseFare.value + bundleIncrement.value
        const passengersTotal = farePerPassenger * passengers.value.length
        return passengersTotal + taxes.value + fees.value + addOnsTotal.value
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

        // Initialize passengers with backend-aligned structure
        passengers.value = Array.from({ length: passengerCount }, (_, index) => ({
            id: `passenger-${index + 1}`,
            firstName: '',
            lastName: '',
            middleName: '',
            dateOfBirth: null,
            gender: 'M' as 'M' | 'F' | 'O',
            passengerType: 'ADT' as 'ADT' | 'CHD' | 'SENIOR' | 'INFANT',
            nationality: 'PH',
            flightSeatId: undefined,
            selectedAddOns: []
        }))
    }

    function updatePassenger(index: number, data: Partial<BookingPassenger>) {
        if (passengers.value[index]) {
            passengers.value[index] = { ...passengers.value[index], ...data }
        }
    }

    function setContactInfo(data: Partial<ContactInfo>) {
        contactInfo.value = { ...contactInfo.value, ...data }
    }

    function setPaymentMethod(method: string) {
        selectedPaymentMethod.value = method
    }

    function setBundle(bundle: FareBundleType) {
        selectedBundle.value = bundle
    }

    function setAvailableAddOns(addOns: FlightAddOn[]) {
        availableAddOns.value = addOns
    }

    function setAddOnPrices(prices: AddOnPrice[]) {
        addOnPrices.value = prices
    }

    function setPaymentMethods(methods: PaymentMethod[]) {
        paymentMethods.value = methods
    }

    function toggleAddOnForPassenger(passengerIndex: number, addOnPriceId: number) {
        const passenger = passengers.value[passengerIndex]
        if (!passenger) return

        const index = passenger.selectedAddOns.indexOf(addOnPriceId)
        if (index > -1) {
            passenger.selectedAddOns.splice(index, 1)
        } else {
            passenger.selectedAddOns.push(addOnPriceId)
        }
    }

    function setStep(step: number) {
        currentStep.value = step
    }

    function setBookingResult(pnr: string, id: string) {
        bookingPnr.value = pnr
        bookingId.value = id
    }

    function setError(errorMessage: string | null) {
        error.value = errorMessage
    }

    function setProcessing(processing: boolean) {
        isProcessing.value = processing
    }

    function resetBooking() {
        currentStep.value = 1
        selectedFlight.value = null
        passengers.value = []
        contactInfo.value = {
            email: '',
            phone: ''
        }
        selectedPaymentMethod.value = ''
        bookingPnr.value = ''
        bookingId.value = ''
        isProcessing.value = false
        error.value = null
        selectedBundle.value = 'SKYPLUS'
        availableAddOns.value = []
        addOnPrices.value = []
        paymentMethods.value = []
    }

    // Legacy functions for retrieve booking feature
    async function retrieveBooking(reference: string, lastName: string) {
        isSearchingBooking.value = true
        bookingError.value = ''
        retrievedBooking.value = null
        
        try {
            // Call the real backend API
            const booking = await bookingService.getByPnrAndLastName(reference, lastName)
            
            // Transform the backend response to the legacy format for the UI
            retrievedBooking.value = transformBookingToLegacyFormat(booking)
            return true
        } catch (error) {
            const err = error as Error
            console.error('Failed to retrieve booking:', err)
            bookingError.value = err.message || 'Booking not found. Please check your details and try again.'
            retrievedBooking.value = null
            return false
        } finally {
            isSearchingBooking.value = false
        }
    }

    // Helper function to transform backend BookingResponse to legacy format
    function transformBookingToLegacyFormat(booking: {
        pnr: string
        status: string
        bookingDate: string
        totalPrice: number
        flights?: Array<{
            id: number
            flightNumber: string
            aircraftName?: string
            origin?: string
            destination?: string
            departureTime: string
            arrivalTime: string
            price: number
        }>
        passengers: Array<{
            firstName: string
            lastName: string
            passengerType: string
            seatNumber?: string | null
        }>
    }): LegacyBooking {
        // Get the first flight for outbound
        const outboundFlight = booking.flights?.[0]
        const returnFlight = booking.flights?.[1]
        
        // Helper to extract airport code and city name from full airport name
        const getAirportInfo = (airportName?: string): { city: string; code: string } => {
            if (!airportName) return { city: 'Unknown', code: 'N/A' }
            
            // Map of full airport names to city and code
            const airportMap: Record<string, { city: string; code: string }> = {
                'Ninoy Aquino International Airport': { city: 'Manila', code: 'MNL' },
                'Mactan–Cebu International Airport': { city: 'Cebu', code: 'CEB' },
                'Mactan-Cebu International Airport': { city: 'Cebu', code: 'CEB' },
                'Clark International Airport': { city: 'Clark', code: 'CRK' },
                'Francisco Bangoy International Airport': { city: 'Davao', code: 'DVO' },
                'Iloilo International Airport': { city: 'Iloilo', code: 'ILO' },
                'Kalibo International Airport': { city: 'Kalibo', code: 'KLO' },
                'Puerto Princesa International Airport': { city: 'Puerto Princesa', code: 'PPS' },
                'Laoag International Airport': { city: 'Laoag', code: 'LAO' },
                'Zamboanga International Airport': { city: 'Zamboanga', code: 'ZAM' }
            }
            
            return airportMap[airportName] || { 
                city: airportName.split(' ')[0], 
                code: airportName.substring(0, 3).toUpperCase() 
            }
        }
        
        return {
            reference: booking.pnr,
            status: booking.status,
            bookingDate: new Date(booking.bookingDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            outbound: outboundFlight ? {
                from: (() => {
                    const info = getAirportInfo(outboundFlight.origin)
                    return `${info.city} (${info.code})`
                })(),
                to: (() => {
                    const info = getAirportInfo(outboundFlight.destination)
                    return `${info.city} (${info.code})`
                })(),
                flightNumber: outboundFlight.flightNumber,
                date: new Date(outboundFlight.departureTime).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                time: `${new Date(outboundFlight.departureTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })} - ${new Date(outboundFlight.arrivalTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })}`,
                duration: calculateDuration(outboundFlight.departureTime, outboundFlight.arrivalTime)
            } : undefined,
            return: returnFlight ? {
                from: (() => {
                    const info = getAirportInfo(returnFlight.origin)
                    return `${info.city} (${info.code})`
                })(),
                to: (() => {
                    const info = getAirportInfo(returnFlight.destination)
                    return `${info.city} (${info.code})`
                })(),
                flightNumber: returnFlight.flightNumber,
                date: new Date(returnFlight.departureTime).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                time: `${new Date(returnFlight.departureTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })} - ${new Date(returnFlight.arrivalTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })}`,
                duration: calculateDuration(returnFlight.departureTime, returnFlight.arrivalTime)
            } : undefined,
            passengers: booking.passengers.map((p: {
                firstName: string
                lastName: string
                passengerType: string
                seatNumber?: string | null
            }, index: number) => ({
                id: index + 1,
                name: `${p.firstName} ${p.lastName}`,
                type: getPassengerTypeLabel(p.passengerType),
                seat: p.seatNumber || 'Not selected',
                meal: 'Standard' // Default value as backend doesn't provide meal info
            })),
            pricing: {
                baseFare: Math.round(booking.totalPrice * 0.85), // Approximate base fare
                taxes: Math.round(booking.totalPrice * 0.12), // Approximate taxes
                addOns: Math.round(booking.totalPrice * 0.03), // Approximate add-ons
                total: booking.totalPrice
            }
        }
    }

    // Helper function to calculate flight duration
    function calculateDuration(departureTime: string, arrivalTime: string): string {
        const departure = new Date(departureTime)
        const arrival = new Date(arrivalTime)
        const durationMs = arrival.getTime() - departure.getTime()
        const hours = Math.floor(durationMs / (1000 * 60 * 60))
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
        return `${hours}h ${minutes}m`
    }

    // Helper function to get passenger type label
    function getPassengerTypeLabel(type: string): string {
        const labels: Record<string, string> = {
            'ADT': 'Adult',
            'CHD': 'Child',
            'SENIOR': 'Senior',
            'INFANT': 'Infant'
        }
        return labels[type] || 'Adult'
    }

    async function getUserBookings(email: string) {
        isSearchingBooking.value = true
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            const userMockBookings = mockBookings.filter(b => b.contactEmail === email)

            userBookings.value = userMockBookings.map(b => ({
                reference: b.pnr,
                status: b.status,
                bookingDate: new Date(b.bookingDate).toLocaleDateString(),
                destination: 'Cebu (CEB)',
                date: 'Oct 16, 2025',
                amount: b.totalAmount
            }))

            if (userBookings.value.length === 0) {
                userBookings.value = [
                    {
                        reference: 'XYZ789',
                        status: 'Confirmed',
                        bookingDate: 'Oct 10, 2025',
                        destination: 'Boracay (MPH)',
                        date: 'Nov 20, 2025',
                        amount: 5499
                    }
                ]
            }

        } catch (error) {
            console.error('Failed to get user bookings:', error)
        } finally {
            isSearchingBooking.value = false
        }
    }

    function clearRetrievedBooking() {
        retrievedBooking.value = null
        bookingError.value = ''
    }

    return {
        // State
        currentStep,
        selectedFlight,
        passengers,
        contactInfo,
        selectedPaymentMethod,
        bookingPnr,
        bookingId,
        isProcessing,
        error,
        selectedBundle,
        availableAddOns,
        addOnPrices,
        paymentMethods,
        
        // Computed
        flightIds,
        baseFare,
        bundleIncrement,
        taxes,
        fees,
        addOnsTotal,
        totalPrice,
        
        // Legacy (for retrieve booking)
        retrievedBooking,
        userBookings,
        isSearchingBooking,
        bookingError,
        
        // Actions
        initBooking,
        updatePassenger,
        setContactInfo,
        setPaymentMethod,
        setBundle,
        setAvailableAddOns,
        setAddOnPrices,
        setPaymentMethods,
        toggleAddOnForPassenger,
        setStep,
        setBookingResult,
        setError,
        setProcessing,
        resetBooking,
        retrieveBooking,
        getUserBookings,
        clearRetrievedBooking
    }
}, {
    persist: {
        key: 'booking-store',
        storage: localStorage,
        omit: ['retrievedBooking', 'userBookings', 'isSearchingBooking', 'bookingError']
    }
})
