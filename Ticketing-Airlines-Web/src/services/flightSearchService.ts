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
      throw new Error('Please select a departure date')
    }

    if (!from || !to) {
      throw new Error('Please select departure and destination airports')
    }

    if (tripType === 'round-trip' && !returnDate) {
      throw new Error('Please select a return date for round-trip flights')
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
        throw new Error('Flight search failed. Please try again.')
      }

      const result = mapBackendFlightSearch(response.data)
      
      if (result.totalResults === 0) {
        throw new Error('No flights found for your search. Please try different dates or destinations.')
      }

      return result
    } catch (error: unknown) {
      console.error('Flight search error:', error)
      
      if (error instanceof Error) {
        throw error
      }
      
      const axiosError = error as { response?: { data?: { message?: string }; status?: number } }
      
      if (axiosError.response?.status === 404) {
        throw new Error('No flights found for this route. Please try a different destination.')
      }
      
      if (axiosError.response?.status === 400) {
        throw new Error(axiosError.response.data?.message || 'Invalid search parameters. Please check your inputs.')
      }
      
      if (axiosError.response?.status === 500) {
        throw new Error('Server error. Please try again later.')
      }
      
      throw new Error('Unable to search flights. Please check your connection and try again.')
    }
  }
}

export const flightSearchService = FlightSearchService.getInstance()
