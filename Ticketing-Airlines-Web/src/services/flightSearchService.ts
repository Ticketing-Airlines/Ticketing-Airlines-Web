import type { 
  FlightSearchParams, 
  FlightSearchResponse,
} from '@/interfaces/interfaces'
import api from '@/lib/axios'
import type { BackendFlightSearchResponse } from '@/types/flightSearch'
import { mapBackendFlightSearch } from '@/types/flightSearch'

export class FlightSearchService {
  private static instance: FlightSearchService

  public static getInstance(): FlightSearchService {
    if (!FlightSearchService.instance) {
      FlightSearchService.instance = new FlightSearchService()
    }
    return FlightSearchService.instance
  }

  public async searchFlights(params: FlightSearchParams): Promise<FlightSearchResponse> {
    const { from, to, departureDate, returnDate, passengers, tripType } = params

    if (!departureDate) {
      throw new Error('Please select a departure date to continue your search.')
    }

    if (!from || !to) {
      throw new Error('Please select both departure and destination airports.')
    }

    if (from === to) {
      throw new Error('Departure and destination airports must be different.')
    }

    if (tripType === 'round-trip' && !returnDate) {
      throw new Error('Please select a return date for your round-trip journey.')
    }

    if (returnDate && departureDate && returnDate < departureDate) {
      throw new Error('Return date must be after the departure date.')
    }

    // Format dates in local time (YYYY-MM-DD)
    const formatDateLocal = (date: Date): string => {
      const y = date.getFullYear()
      const m = String(date.getMonth() + 1).padStart(2, '0')
      const d = String(date.getDate()).padStart(2, '0')
      return `${y}-${m}-${d}`
    }

    const request = {
      from,
      to,
      departureDate: formatDateLocal(departureDate),
      returnDate: returnDate ? formatDateLocal(returnDate) : null,
      passengers,
      tripType,
    }

    try {
      const response = await api.post<BackendFlightSearchResponse>('/api/flights/search', request)
      
      if (!response.data.success) {
        throw new Error('We couldn\'t complete your search. Please try again in a moment.')
      }

      const result = mapBackendFlightSearch(response.data)
      
      if (result.totalResults === 0) {
        throw new Error('No flights found for your selected route and dates. Please try different options.')
      }

      return result
    } catch (error: unknown) {
      console.error('Flight search error:', error)
      
      if (error instanceof Error) {
        // If it's already a user-friendly error message, throw it as is
        if (error.message.includes('Please') || error.message.includes('No flights')) {
          throw error
        }
      }
      
      const axiosError = error as { response?: { data?: { message?: string }; status?: number } }
      
      if (axiosError.response?.status === 404) {
        throw new Error('This route is not currently available. Please try a different destination.')
      }
      
      if (axiosError.response?.status === 400) {
        const backendMessage = axiosError.response.data?.message
        throw new Error(backendMessage || 'Please check your search details and try again.')
      }
      
      if (axiosError.response?.status === 500) {
        throw new Error('Our system is experiencing issues. Please try again in a few moments.')
      }

      if (axiosError.response?.status === 503) {
        throw new Error('Our flight search service is temporarily unavailable. Please try again shortly.')
      }
      
      // Network or timeout errors
      if (!axiosError.response) {
        throw new Error('Unable to connect to our servers. Please check your internet connection and try again.')
      }
      
      throw new Error('Something went wrong while searching for flights. Please try again.')
    }
  }
}

export const flightSearchService = FlightSearchService.getInstance()
