export interface SeatSalePricing {
  originalPrice: number
  salePrice: number
  discount: number
  currency: string
  priceNote: string
}

export interface SeatSaleValidity {
  travelPeriodStart: string
  travelPeriodEnd: string
  bookingDeadline: string
}

export interface SeatSaleAvailability {
  seatsLeft: number
  totalSeats: number
  isLowAvailability: boolean
}

export interface SeatSale {
  id: string
  destination: string
  destinationAirportCode: string
  country: string
  countryIso2: string
  type: string
  description: string
  image: string
  pricing: SeatSalePricing
  validity: SeatSaleValidity
  availability: SeatSaleAvailability
  features: string[]
  featured: boolean
  isActive: boolean
  createdAt: string
  updatedAt?: string
}

export interface SeatSaleAppliedFilters {
  type: string
  priceMin?: number
  priceMax?: number
  featured?: boolean
  sortBy?: string
}

export interface SeatSaleActiveDealsResult {
  deals: SeatSale[]
  appliedFilters: SeatSaleAppliedFilters
  metadata: {
    totalDeals: number
    featuredCount: number
  }
}

export interface TermsCondition {
  id: number
  icon: string
  title: string
  description: string
  color: string
}

export interface SeatSaleMetadata {
  lastUpdated: string
  version: string
}

export interface SeatSaleConfig {
  saleEndDate: string
  saleTitle: string
  saleSubtitle: string
  isActive: boolean
  heroMessage: string
  termsAndConditions: TermsCondition[]
  metadata: SeatSaleMetadata
}
