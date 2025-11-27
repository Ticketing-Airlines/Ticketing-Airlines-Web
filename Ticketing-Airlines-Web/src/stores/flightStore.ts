import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
    FlightSearchParams,
    FlightSearchResult,
    RoundTripResult,
    MultiCityResult
} from '@/interfaces/interfaces'
import { flightSearchService } from '@/services/flightSearchService'
import { flightInstances, flightSchedules, airports } from '@/data/mockData'

export const useFlightStore = defineStore('flight', () => {
    // State
    const searchParams = ref<FlightSearchParams>({
        from: '',
        to: '',
        departureDate: new Date(),
        returnDate: null,
        passengers: 1,
        tripType: 'round-trip'
    })

    const searchResults = ref<FlightSearchResult[] | RoundTripResult[] | MultiCityResult[]>([])
    const totalResults = ref(0)
    const isSearching = ref(false)
    const error = ref<string | null>(null)

    // Flight Status State
    const flightStatus = ref<any>(null)
    const isSearchingStatus = ref(false)
    const statusError = ref('')

    // Getters
    const hasResults = computed(() => searchResults.value.length > 0)

    // Actions
    function setSearchParams(params: Partial<FlightSearchParams>) {
        searchParams.value = { ...searchParams.value, ...params }
    }

    async function searchFlights(params?: FlightSearchParams) {
        if (params) {
            setSearchParams(params)
        }

        isSearching.value = true
        error.value = null

        try {
            const response = await flightSearchService.searchFlights(searchParams.value)
            searchResults.value = response.results
            totalResults.value = response.totalResults
        } catch (err) {
            console.error('Flight search error:', err)
            error.value = 'An error occurred while searching for flights. Please try again.'
            searchResults.value = []
            totalResults.value = 0
        } finally {
            isSearching.value = false
        }
    }

    function clearResults() {
        searchResults.value = []
        totalResults.value = 0
        error.value = null
    }

    async function searchFlightStatus(flightNumber: string, date: string) {
        isSearchingStatus.value = true
        statusError.value = ''
        flightStatus.value = null

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            // 1. Find schedule
            // Remove spaces from input flight number for easier matching (e.g. "5J 561" -> "5J561")
            const normalizedInput = flightNumber.replace(/\s/g, '').toUpperCase()
            const schedule = flightSchedules.find(s => s.flightNumber.replace(/\s/g, '') === normalizedInput)

            if (!schedule) {
                throw new Error('Flight number not found.')
            }

            // 2. Find instance for date
            // Mock data dates are fixed (Oct 2025), so we might need to be flexible or just check if date matches
            // For this demo, let's just find ANY instance for this schedule if date doesn't match exactly, 
            // or strictly check date. Let's try strictly first, then fallback or just return a mock if not found in mock data range.
            // Actually, let's just return a constructed status based on schedule if instance not found, 
            // assuming it runs daily.

            const instance = flightInstances.find(i =>
                i.flightScheduleId === schedule.flightScheduleId &&
                i.flightDate === date
            )

            // Get airports
            const origin = airports.find(a => a.airportId === schedule.originAirportId)
            const dest = airports.find(a => a.airportId === schedule.destinationAirportId)

            if (!origin || !dest) throw new Error('Airport data missing')

            // Construct status object
            flightStatus.value = {
                flightNumber: schedule.flightNumber,
                airline: 'SunSkies Air', // Hardcoded as per mock data context
                date: new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                status: instance ? instance.status : 'Scheduled', // Default to Scheduled if no specific instance
                departure: {
                    airport: origin.city,
                    code: origin.iataCode,
                    terminal: 'Terminal 3', // Mock
                    gate: 'Gate ' + Math.floor(Math.random() * 30 + 1),
                    scheduledTime: schedule.stdLocal,
                    estimatedTime: schedule.stdLocal,
                    actualTime: instance?.status === 'Departed' ? schedule.stdLocal : null
                },
                arrival: {
                    airport: dest.city,
                    code: dest.iataCode,
                    terminal: 'Terminal 1', // Mock
                    gate: 'Gate ' + Math.floor(Math.random() * 20 + 1),
                    scheduledTime: schedule.staLocal,
                    estimatedTime: schedule.staLocal,
                    actualTime: null
                },
                aircraft: 'Airbus A320', // Mock based on aircraftId 1
                duration: '1h 15m', // Mock or calculate
                weather: {
                    departure: { temp: '28°C', condition: 'Sunny' },
                    arrival: { temp: '26°C', condition: 'Cloudy' }
                }
            }

            return true

        } catch (err: any) {
            console.error('Flight status search error:', err)
            statusError.value = err.message || 'Flight not found.'
            return false
        } finally {
            isSearchingStatus.value = false
        }
    }

    return {
        searchParams,
        searchResults,
        totalResults,
        isSearching,
        error,
        hasResults,
        flightStatus,
        isSearchingStatus,
        statusError,
        setSearchParams,
        searchFlights,
        clearResults,
        searchFlightStatus
    }
})
