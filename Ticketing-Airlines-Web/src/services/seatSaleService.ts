import apiClient from '@/lib/axios'
import type { SeatSaleActiveDealsResult, SeatSaleConfig } from '@/types/seatSale'

interface ApiResponse<T> {
  success: boolean
  data: T
}

export const seatSaleService = {
  /**
   * Get all active seat sale deals with optional filtering and sorting
   */
  async getActiveDeals(params?: {
    type?: string
    priceMin?: number
    priceMax?: number
    featured?: boolean
    sortBy?: string
  }): Promise<SeatSaleActiveDealsResult> {
    const response = await apiClient.get<ApiResponse<SeatSaleActiveDealsResult>>(
      '/api/SeatSales/active',
      { params }
    )
    return response.data.data
  },

  /**
   * Get the current seat sale configuration including terms and conditions
   */
  async getConfig(): Promise<SeatSaleConfig> {
    const response = await apiClient.get<ApiResponse<SeatSaleConfig>>('/api/SeatSales/config')
    return response.data.data
  }
}
