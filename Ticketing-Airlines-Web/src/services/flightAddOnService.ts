import api from '@/lib/axios'
import type { BackendFlightAddOnResponse, FlightAddOn, AddOnCategory } from '@/types/flightAddOn'
import { mapBackendFlightAddOn } from '@/types/flightAddOn'

export class FlightAddOnService {
  private static instance: FlightAddOnService

  public static getInstance(): FlightAddOnService {
    if (!FlightAddOnService.instance) {
      FlightAddOnService.instance = new FlightAddOnService()
    }
    return FlightAddOnService.instance
  }

  public async getAll(): Promise<FlightAddOn[]> {
    try {
      const response = await api.get<BackendFlightAddOnResponse[]>('/api/flightaddon')
      return response.data.map(mapBackendFlightAddOn)
    } catch (error) {
      console.error('Failed to fetch flight add-ons:', error)
      
      const axiosError = error as { response?: { status?: number } }
      
      if (axiosError.response?.status === 404) {
        throw new Error('Add-on services are not available at this time.')
      }
      
      if (axiosError.response?.status === 500) {
        throw new Error('Our system is experiencing issues loading add-ons. Please try again.')
      }
      
      if (!axiosError.response) {
        throw new Error('Unable to connect. Please check your internet connection.')
      }
      
      throw new Error('Unable to load add-on options. Please try again.')
    }
  }

  public async getById(id: number): Promise<FlightAddOn> {
    try {
      const response = await api.get<BackendFlightAddOnResponse>(`/api/flightaddon/${id}`)
      return mapBackendFlightAddOn(response.data)
    } catch (error) {
      console.error(`Failed to fetch flight add-on ${id}:`, error)
      throw new Error('Unable to load add-on details.')
    }
  }

  public async getByCategory(category: AddOnCategory): Promise<FlightAddOn[]> {
    try {
      const allAddOns = await this.getAll()
      return allAddOns.filter(addOn => addOn.category === category)
    } catch (error) {
      throw error
    }
  }
}

export const flightAddOnService = FlightAddOnService.getInstance()
