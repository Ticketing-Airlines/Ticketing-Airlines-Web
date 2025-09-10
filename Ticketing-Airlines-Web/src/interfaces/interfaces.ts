// TypeScript interfaces for the airline ticketing application

export interface Destination {
  id: number
  name: string
  description: string
  price: number
  originalPrice: number
  badge: 'HOT DEAL' | 'POPULAR' | 'NEW ROUTE' | 'INTERNATIONAL' | 'TRENDING'
  savings: number
  image: string
}

export interface Airport {
  code: string
  name: string
  city: string
  country: string
}

export interface FlightSearchParams {
  from: string
  to: string
  departureDate: Date | null
  returnDate: Date | null
  passengers: number
  tripType: 'round-trip' | 'one-way' | 'multi-city'
}

export interface Flight {
  id: string
  airline: string
  flightNumber: string
  from: Airport
  to: Airport
  departureTime: Date
  arrivalTime: Date
  duration: string
  price: number
  availableSeats: number
  aircraft: string
}

export interface BookingDetails {
  id: string
  flight: Flight
  passengers: Passenger[]
  totalPrice: number
  bookingDate: Date
  status: 'confirmed' | 'pending' | 'cancelled'
}

export interface Passenger {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: Date
  passportNumber?: string
  nationality: string
}

export interface Feature {
  id: number
  title: string
  description: string
  icon: string
}