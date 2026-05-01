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
      throw new Error('Unable to load airports. Please check your connection and try again.')
    }
  },

  getCachedAirports(): Airport[] | null {
    return cachedAirports
  },
}
