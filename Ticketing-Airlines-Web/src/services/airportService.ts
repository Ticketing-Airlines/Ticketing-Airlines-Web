import api from '@/lib/axios'
import type { Airport } from '@/interfaces/interfaces'
import type { BackendAirport } from '@/types/airport'
import { mapBackendAirport } from '@/types/airport'

let cachedAirports: Airport[] | null = null

export const airportService = {
  async getAirports(params?: {
    country?: string
    search?: string
  }): Promise<{ data: Airport[]; total: number }> {
    try {
      const response = await api.get<BackendAirport[]>('/api/v1/airports')
      const mapped = response.data.map(mapBackendAirport)
      cachedAirports = mapped

      let filtered = mapped
      if (params?.country) {
        filtered = filtered.filter(a => a.countryIso2 === params.country)
      }
      if (params?.search) {
        const searchLower = params.search.toLowerCase()
        filtered = filtered.filter(
          a =>
            a.name.toLowerCase().includes(searchLower) ||
            a.city.toLowerCase().includes(searchLower) ||
            a.iataCode.toLowerCase().includes(searchLower),
        )
      }

      filtered.sort((a, b) => a.city.localeCompare(b.city))
      return { data: filtered, total: filtered.length }
    } catch (error: unknown) {
      console.error('Failed to load airports:', error)
      
      const axiosError = error as { response?: { status?: number } }
      
      if (axiosError.response?.status === 404) {
        throw new Error('Airport information is not available at this time.')
      }
      
      if (axiosError.response?.status === 500) {
        throw new Error('Our system is experiencing issues. Please refresh the page and try again.')
      }
      
      if (axiosError.response?.status === 503) {
        throw new Error('Our airport service is temporarily unavailable. Please try again in a few moments.')
      }
      
      // Network or timeout errors
      if (!axiosError.response) {
        throw new Error('Unable to connect. Please check your internet connection and refresh the page.')
      }
      
      throw new Error('Unable to load airport information. Please refresh the page and try again.')
    }
  },

  getCachedAirports(): Airport[] | null {
    return cachedAirports
  },
}
