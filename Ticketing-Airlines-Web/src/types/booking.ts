// Request types for booking creation
export interface CreateBookingPassengerRequest {
  firstName: string
  lastName: string
  middleName?: string
  dateOfBirth: string // ISO date string
  gender: 'M' | 'F' | 'O'
  passengerType: 'ADT' | 'CHD' | 'SENIOR' | 'INFANT'
  flightSeatId?: string // UUID
  addOnPriceIds: number[]
}

export interface CreateBookingRequest {
  flightIds: number[]
  flightBundleId: number
  contactEmail: string
  contactPhone: string
  userId?: string
  passengers: CreateBookingPassengerRequest[]
}

export interface ConfirmPaymentRequest {
  paymentMethod: string
  paymentReference: string
}

export interface UpdateBookingRequest {
  contactEmail?: string
  contactPhone?: string
}

// Response types
export interface FlightResponse {
  id: number
  flightNumber: string
  aircraftName?: string
  origin?: string
  destination?: string
  departureTime: string
  arrivalTime: string
  price: number
}

export interface BookingAddOnResponse {
  bookingAddOnId: number
  addOnPriceId: number
  addOnName: string
  addOnCode: string
  priceAtBooking: number
}

export interface BookingPassengerResponse {
  passengerId: string | null
  firstName: string
  lastName: string
  middleName: string | null
  dateOfBirth: string
  gender: string
  passengerType: string
  flightSeatId: string | null
  seatNumber: string | null
  addOns: BookingAddOnResponse[]
}

export interface BookingResponse {
  bookingId: string
  pnr: string
  flights: FlightResponse[]
  flightBundleId: number
  flightBundleName: string
  userId: string | null
  contactEmail: string
  contactPhone: string
  totalPrice: number
  currency: string
  status: string
  paymentMethod: string | null
  paymentReference: string | null
  bookingDate: string
  paymentDate: string | null
  passengers: BookingPassengerResponse[]
}

export interface CalculateCostResponse {
  totalCost: number
  currency: string
}

// Frontend booking state
export interface BookingPassenger {
  id: string // Local ID for tracking
  firstName: string
  lastName: string
  middleName: string
  dateOfBirth: string | null // Changed to string for HTML date input compatibility
  gender: 'M' | 'F' | 'O'
  passengerType: 'ADT' | 'CHD' | 'SENIOR' | 'INFANT'
  nationality: string
  flightSeatId?: string
  selectedAddOns: number[] // AddOnPrice IDs
}

// Mapper functions
export function mapBookingPassengerToRequest(
  passenger: BookingPassenger
): CreateBookingPassengerRequest {
  if (!passenger.dateOfBirth) {
    throw new Error('Date of birth is required')
  }

  return {
    firstName: passenger.firstName,
    lastName: passenger.lastName,
    middleName: passenger.middleName || undefined,
    dateOfBirth: passenger.dateOfBirth, // Already in YYYY-MM-DD format
    gender: passenger.gender,
    passengerType: passenger.passengerType,
    flightSeatId: passenger.flightSeatId,
    addOnPriceIds: passenger.selectedAddOns
  }
}

export function mapBookingResponse(backend: BookingResponse): BookingResponse {
  // For now, just return as-is since the structure matches
  // Can add transformations here if needed
  return backend
}
