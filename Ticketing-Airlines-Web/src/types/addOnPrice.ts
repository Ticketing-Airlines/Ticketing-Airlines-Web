import type { FlightAddOn } from './flightAddOn'

// Backend response types
export interface BackendAddOnPriceResponse {
  id: number
  flightId: number
  addOnId: number
  priceAmount: number
  currency: string
  validFrom: string
  validTo: string | null
  createdAt: string
  addOn?: {
    id: number
    name: string
    code: string
    category: number
    description: string | null
  }
}

// Frontend types
export interface AddOnPrice {
  id: number
  flightId: number
  addOnId: number
  priceAmount: number
  currency: string
  validFrom: Date
  validTo: Date | null
  addOn?: FlightAddOn
}

// Mapper function
export function mapBackendAddOnPrice(
  backend: BackendAddOnPriceResponse
): AddOnPrice {
  return {
    id: backend.id,
    flightId: backend.flightId,
    addOnId: backend.addOnId,
    priceAmount: backend.priceAmount,
    currency: backend.currency,
    validFrom: new Date(backend.validFrom),
    validTo: backend.validTo ? new Date(backend.validTo) : null,
    addOn: backend.addOn ? {
      id: backend.addOn.id,
      name: backend.addOn.name,
      code: backend.addOn.code,
      category: backend.addOn.category,
      categoryName: '',
      description: backend.addOn.description,
      weightKg: null,
      pieceCount: null,
      isPremiumSeatType: false,
      icon: 'Package'
    } : undefined
  }
}
