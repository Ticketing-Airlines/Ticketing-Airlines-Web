import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
    FlightSearchParams,
    FlightSearchResult,
    RoundTripResult,
    MultiCityResult
} from '@/interfaces/interfaces'
import { flightSearchService } from '@/services/flightSearchService'

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

    return {
        searchParams,
        searchResults,
        totalResults,
        isSearching,
        error,
        hasResults,
        setSearchParams,
        searchFlights,
        clearResults
    }
})
