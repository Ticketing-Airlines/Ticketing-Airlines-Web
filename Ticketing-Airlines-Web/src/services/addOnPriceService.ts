import api from '@/lib/axios'
import type { BackendAddOnPriceResponse, AddOnPrice } from '@/types/addOnPrice'
import { mapBackendAddOnPrice } from '@/types/addOnPrice'

export class AddOnPriceService {
  private static instance: AddOnPriceService

  public static getInstance(): AddOnPriceService {
    if (!AddOnPriceService.instance) {
      AddOnPriceService.instance = new AddOnPriceService()
    }
    return AddOnPriceService.instance
  }

  public async getByFlightId(flightId: number): Promise<AddOnPrice[]> {
    try {
      const response = await api.get<BackendAddOnPriceResponse[]>(`/api/addonprice/flight/${flightId}`)
      return response.data.map(mapBackendAddOnPrice)
    } catch (error) {
      console.error(`Failed to fetch add-on prices for flight ${flightId}:`, error)
      
      const axiosError = error as { response?: { status?: number } }
      
      if (axiosError.response?.status === 404) {
        // No add-ons available for this flight - return empty array
        return []
      }
      
      if (axiosError.response?.status === 500) {
        throw new Error('Unable to load add-on pricing. Please try again.')
      }
      
      if (!axiosError.response) {
        throw new Error('Unable to connect. Please check your internet connection.')
      }
      
      throw new Error('Unable to load add-on prices. Please try again.')
    }
  }

  public async getByFlightAndAddOn(flightId: number, addOnId: number): Promise<AddOnPrice | null> {
    try {
      const prices = await this.getByFlightId(flightId)
      return prices.find(price => price.addOnId === addOnId) || null
    } catch (error) {
      throw error
    }
  }

  public async getByMultipleFlights(flightIds: number[]): Promise<Map<number, AddOnPrice[]>> {
    try {
      const priceMap = new Map<number, AddOnPrice[]>()
      
      // Fetch prices for all flights in parallel
      const promises = flightIds.map(async (flightId) => {
        const prices = await this.getByFlightId(flightId)
        priceMap.set(flightId, prices)
      })
      
      await Promise.all(promises)
      return priceMap
    } catch (error) {
      console.error('Failed to fetch add-on prices for multiple flights:', error)
      throw new Error('Unable to load add-on pricing for your flights.')
    }
  }
}

export const addOnPriceService = AddOnPriceService.getInstance()
