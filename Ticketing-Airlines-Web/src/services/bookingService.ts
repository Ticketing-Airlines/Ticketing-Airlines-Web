import api from '@/lib/axios'
import type {
  CreateBookingRequest,
  BookingResponse,
  ConfirmPaymentRequest,
  UpdateBookingRequest,
  CalculateCostResponse
} from '@/types/booking'
import { mapBookingResponse } from '@/types/booking'

export class BookingService {
  private static instance: BookingService

  public static getInstance(): BookingService {
    if (!BookingService.instance) {
      BookingService.instance = new BookingService()
    }
    return BookingService.instance
  }

  public async calculateCost(request: CreateBookingRequest): Promise<number> {
    try {
      const response = await api.post<CalculateCostResponse>('/api/booking/calculate-cost', request)
      return response.data.totalCost
    } catch (error) {
      console.error('Failed to calculate booking cost:', error)
      
      const axiosError = error as { response?: { status?: number; data?: { error?: string } } }
      
      if (axiosError.response?.status === 404) {
        throw new Error('One or more selected items are no longer available.')
      }
      
      if (axiosError.response?.status === 400) {
        const errorMsg = axiosError.response.data?.error
        throw new Error(errorMsg || 'Invalid booking details. Please check your selections.')
      }
      
      if (axiosError.response?.status === 500) {
        throw new Error('Unable to calculate total cost. Please try again.')
      }
      
      if (!axiosError.response) {
        throw new Error('Unable to connect. Please check your internet connection.')
      }
      
      throw new Error('Unable to calculate booking cost. Please try again.')
    }
  }

  public async create(request: CreateBookingRequest): Promise<BookingResponse> {
    try {
      const response = await api.post<BookingResponse>('/api/booking', request)
      return mapBookingResponse(response.data)
    } catch (error) {
      console.error('Failed to create booking:', error)
      
      const axiosError = error as { response?: { status?: number; data?: { error?: string } } }
      
      if (axiosError.response?.status === 404) {
        throw new Error('Selected flight or options are no longer available.')
      }
      
      if (axiosError.response?.status === 400) {
        const errorMsg = axiosError.response.data?.error
        throw new Error(errorMsg || 'Unable to create booking. Please check your details.')
      }
      
      if (axiosError.response?.status === 500) {
        throw new Error('Our system encountered an error. Please try again.')
      }
      
      if (!axiosError.response) {
        throw new Error('Unable to connect. Please check your internet connection.')
      }
      
      throw new Error('Unable to create your booking. Please try again.')
    }
  }

  public async getByPnr(pnr: string): Promise<BookingResponse | null> {
    try {
      const response = await api.get<BookingResponse>(`/api/booking/${pnr}`)
      return mapBookingResponse(response.data)
    } catch (error) {
      console.error(`Failed to fetch booking ${pnr}:`, error)
      
      const axiosError = error as { response?: { status?: number } }
      
      if (axiosError.response?.status === 404) {
        return null
      }
      
      throw new Error('Unable to retrieve booking details.')
    }
  }

  public async getByPnrAndLastName(pnr: string, lastName: string): Promise<BookingResponse> {
    try {
      const response = await api.get<BookingResponse>(`/api/booking/${pnr}`)
      const booking = mapBookingResponse(response.data)
      
      // Validate that at least one passenger has the matching last name
      // Support partial matching (e.g., "Inot" matches "Keith Inot")
      const normalizedSearchName = lastName.toLowerCase().trim()
      const hasMatchingPassenger = booking.passengers.some(
        passenger => {
          const passengerLastName = passenger.lastName.toLowerCase().trim()
          // Check if the search term matches the full last name or is contained in it
          return passengerLastName === normalizedSearchName || 
                 passengerLastName.includes(normalizedSearchName) ||
                 normalizedSearchName.includes(passengerLastName)
        }
      )
      
      if (!hasMatchingPassenger) {
        throw new Error('Booking not found. Please check your details and try again.')
      }
      
      return booking
    } catch (error) {
      console.error(`Failed to fetch booking ${pnr} with last name validation:`, error)
      
      const axiosError = error as { response?: { status?: number }; message?: string }
      
      if (axiosError.response?.status === 404) {
        throw new Error('Booking not found. Please check your booking reference.')
      }
      
      // Re-throw validation errors
      if (axiosError.message?.includes('Please check your details')) {
        throw error
      }
      
      if (!axiosError.response) {
        throw new Error('Unable to connect. Please check your internet connection.')
      }
      
      throw new Error('Unable to retrieve booking details. Please try again.')
    }
  }

  public async confirmPayment(pnr: string, request: ConfirmPaymentRequest): Promise<BookingResponse> {
    try {
      const response = await api.post<BookingResponse>(`/api/booking/${pnr}/confirm`, request)
      return mapBookingResponse(response.data)
    } catch (error) {
      console.error(`Failed to confirm payment for booking ${pnr}:`, error)
      
      const axiosError = error as { response?: { status?: number; data?: { error?: string } } }
      
      if (axiosError.response?.status === 404) {
        throw new Error('Booking not found. Please check your booking reference.')
      }
      
      if (axiosError.response?.status === 400) {
        const errorMsg = axiosError.response.data?.error
        throw new Error(errorMsg || 'Unable to confirm payment. Please try again.')
      }
      
      if (axiosError.response?.status === 500) {
        throw new Error('Payment confirmation failed. Please contact support.')
      }
      
      if (!axiosError.response) {
        throw new Error('Unable to connect. Please check your internet connection.')
      }
      
      throw new Error('Unable to confirm payment. Please try again.')
    }
  }

  public async updateContact(pnr: string, request: UpdateBookingRequest): Promise<BookingResponse> {
    try {
      const response = await api.put<BookingResponse>(`/api/booking/${pnr}`, request)
      return mapBookingResponse(response.data)
    } catch (error) {
      console.error(`Failed to update booking ${pnr}:`, error)
      
      const axiosError = error as { response?: { status?: number } }
      
      if (axiosError.response?.status === 404) {
        throw new Error('Booking not found.')
      }
      
      throw new Error('Unable to update booking details.')
    }
  }

  public async archive(bookingId: string): Promise<BookingResponse> {
    try {
      const response = await api.post<BookingResponse>('/api/booking/archive', { bookingId })
      return mapBookingResponse(response.data)
    } catch (error) {
      console.error(`Failed to archive booking ${bookingId}:`, error)
      
      const axiosError = error as { response?: { status?: number; data?: { error?: string } } }
      
      if (axiosError.response?.status === 404) {
        throw new Error('Booking not found.')
      }
      
      if (axiosError.response?.status === 400) {
        const errorMsg = axiosError.response.data?.error
        throw new Error(errorMsg || 'Unable to cancel booking.')
      }
      
      throw new Error('Unable to cancel booking. Please contact support.')
    }
  }
}

export const bookingService = BookingService.getInstance()
