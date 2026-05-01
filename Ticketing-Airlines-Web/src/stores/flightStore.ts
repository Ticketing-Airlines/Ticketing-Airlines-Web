import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
    FlightSearchParams,
    FlightSearchResult,
    RoundTripResult,
    MultiCityResult
} from '@/interfaces/interfaces'
import { flightSearchService } from '@/services/flightSearchService'
import api from '@/lib/axios'
import type { BackendFlightStatusResponse, FlightStatus } from '@/types/flightStatus'
import { mapBackendFlightStatus } from '@/types/flightStatus'

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
    const flightStatus = ref<FlightStatus | null>(null)
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
        } catch (err: unknown) {
            console.error('Flight search error:', err)
            const errorMessage = err instanceof Error ? err.message : 'An error occurred while searching for flights. Please try again.'
            error.value = errorMessage
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

        if (!flightNumber || !date) {
            statusError.value = 'Please enter a flight number and date'
            isSearchingStatus.value = false
            return false
        }

        try {
            const response = await api.post<BackendFlightStatusResponse>('/api/flights/status', {
                flightNumber: flightNumber.trim().toUpperCase(),
                date
            })
            
            if (!response.data.success) {
                throw new Error('Flight status lookup failed')
            }
            
            flightStatus.value = mapBackendFlightStatus(response.data)
            return true

        } catch (error: unknown) {
            console.error('Flight status search failed:', error)
            
            const axiosError = error as { response?: { data?: { message?: string }; status?: number } }
            
            if (axiosError.response?.status === 404) {
                statusError.value = 'Flight not found. Please check the flight number and date.'
            } else if (axiosError.response?.status === 400) {
                statusError.value = axiosError.response.data?.message || 'Invalid flight number or date format.'
            } else if (error instanceof Error) {
                statusError.value = error.message
            } else {
                statusError.value = 'Unable to retrieve flight status. Please try again later.'
            }
            
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
