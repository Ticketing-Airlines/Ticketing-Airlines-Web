import api from '@/lib/axios'
import type { BackendPaymentMethodResponse, PaymentMethod } from '@/types/paymentMethod'
import { mapBackendPaymentMethod } from '@/types/paymentMethod'

export class PaymentMethodService {
  private static instance: PaymentMethodService
  private cachedMethods: PaymentMethod[] | null = null

  public static getInstance(): PaymentMethodService {
    if (!PaymentMethodService.instance) {
      PaymentMethodService.instance = new PaymentMethodService()
    }
    return PaymentMethodService.instance
  }

  public async getAll(): Promise<PaymentMethod[]> {
    // Return cached if available
    if (this.cachedMethods) {
      return this.cachedMethods
    }

    try {
      const response = await api.get<{ success: boolean; data: { paymentMethods: BackendPaymentMethodResponse[] } }>('/api/payment-methods/active')
      
      if (!response.data.success || !response.data.data.paymentMethods) {
        throw new Error('No payment methods available')
      }
      
      this.cachedMethods = response.data.data.paymentMethods.map(mapBackendPaymentMethod)
      return this.cachedMethods
    } catch (error) {
      console.error('Failed to fetch payment methods:', error)
      
      const axiosError = error as { response?: { status?: number } }
      
      if (axiosError.response?.status === 404) {
        throw new Error('Payment methods are not available at this time.')
      }
      
      if (axiosError.response?.status === 500) {
        throw new Error('Our system is experiencing issues loading payment options. Please try again.')
      }
      
      if (!axiosError.response) {
        throw new Error('Unable to connect. Please check your internet connection.')
      }
      
      throw new Error('Unable to load payment methods. Please try again.')
    }
  }

  public async getActive(): Promise<PaymentMethod[]> {
    try {
      const allMethods = await this.getAll()
      return allMethods
        .filter(method => method.isActive && method.isAvailable)
        .sort((a, b) => a.displayOrder - b.displayOrder)
    } catch (error) {
      throw error
    }
  }

  public async getFeatured(): Promise<PaymentMethod[]> {
    try {
      const allMethods = await this.getAll()
      return allMethods
        .filter(method => method.featured && method.isActive && method.isAvailable)
        .sort((a, b) => a.displayOrder - b.displayOrder)
    } catch (error) {
      throw error
    }
  }

  public async getById(id: string): Promise<PaymentMethod | null> {
    try {
      const allMethods = await this.getAll()
      return allMethods.find(method => method.id === id) || null
    } catch (error) {
      throw error
    }
  }

  public clearCache(): void {
    this.cachedMethods = null
  }
}

export const paymentMethodService = PaymentMethodService.getInstance()
