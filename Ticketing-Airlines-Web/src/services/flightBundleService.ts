import api from '@/lib/axios'
import type { BackendFlightBundleResponse, FlightBundle } from '@/types/flightBundle'
import { mapBackendFlightBundle } from '@/types/flightBundle'

export class FlightBundleService {
  private static instance: FlightBundleService

  public static getInstance(): FlightBundleService {
    if (!FlightBundleService.instance) {
      FlightBundleService.instance = new FlightBundleService()
    }
    return FlightBundleService.instance
  }

  public async getAll(): Promise<FlightBundle[]> {
    try {
      const response = await api.get<BackendFlightBundleResponse[]>('/api/flightbundle')
      
      // Map backend response to frontend format
      const bundles = response.data.map(mapBackendFlightBundle)
      
      if (bundles.length === 0) {
        throw new Error('No fare bundles are currently available.')
      }
      
      return bundles
    } catch (error) {
      console.error('Failed to fetch flight bundles:', error)
      
      const axiosError = error as { response?: { status?: number } }
      
      if (axiosError.response?.status === 404) {
        throw new Error('Fare bundles are not available at this time. Please try again later.')
      }
      
      if (axiosError.response?.status === 500) {
        throw new Error('Our system is experiencing issues loading fare options. Please try again in a moment.')
      }
      
      if (axiosError.response?.status === 503) {
        throw new Error('Our fare bundle service is temporarily unavailable. Please try again shortly.')
      }
      
      // Network or timeout errors
      if (!axiosError.response) {
        throw new Error('Unable to connect to our servers. Please check your internet connection.')
      }
      
      throw new Error('Unable to load fare options. Please try again.')
    }
  }

  public async getById(id: number): Promise<FlightBundle> {
    try {
      const response = await api.get<BackendFlightBundleResponse>(`/api/flightbundle/${id}`)
      return mapBackendFlightBundle(response.data)
    } catch (error) {
      console.error(`Failed to fetch flight bundle ${id}:`, error)
      
      const axiosError = error as { response?: { status?: number } }
      
      if (axiosError.response?.status === 404) {
        throw new Error('The selected fare bundle is no longer available.')
      }
      
      throw new Error('Unable to load fare bundle details. Please try again.')
    }
  }
}

export const flightBundleService = FlightBundleService.getInstance()
