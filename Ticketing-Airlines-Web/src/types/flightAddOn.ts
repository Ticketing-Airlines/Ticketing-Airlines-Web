// Backend response types
export interface BackendFlightAddOnResponse {
  id: number
  name: string
  code: string
  category: number // 1=Baggage, 2=Seat, 3=Meal, 4=Insurance, 99=Other
  description: string | null
  weightKg: number | null
  pieceCount: number | null
  isPremiumSeatType: boolean
  createdAt: string
  updatedAt: string | null
}

// Frontend types
export enum AddOnCategory {
  Baggage = 1,
  Seat = 2,
  Meal = 3,
  Insurance = 4,
  Other = 99
}

export interface FlightAddOn {
  id: number
  name: string
  code: string
  category: AddOnCategory
  categoryName: string
  description: string | null
  weightKg: number | null
  pieceCount: number | null
  isPremiumSeatType: boolean
  icon: string // Icon name for UI
}

// Mapper function
export function mapBackendFlightAddOn(
  backend: BackendFlightAddOnResponse
): FlightAddOn {
  const getCategoryName = (category: number): string => {
    switch (category) {
      case AddOnCategory.Baggage:
        return 'Baggage'
      case AddOnCategory.Seat:
        return 'Seat'
      case AddOnCategory.Meal:
        return 'Meal'
      case AddOnCategory.Insurance:
        return 'Insurance'
      default:
        return 'Other'
    }
  }

  const getIcon = (category: number): string => {
    switch (category) {
      case AddOnCategory.Baggage:
        return 'Luggage'
      case AddOnCategory.Seat:
        return 'Armchair'
      case AddOnCategory.Meal:
        return 'UtensilsCrossed'
      case AddOnCategory.Insurance:
        return 'Shield'
      default:
        return 'Package'
    }
  }

  return {
    id: backend.id,
    name: backend.name,
    code: backend.code,
    category: backend.category as AddOnCategory,
    categoryName: getCategoryName(backend.category),
    description: backend.description,
    weightKg: backend.weightKg,
    pieceCount: backend.pieceCount,
    isPremiumSeatType: backend.isPremiumSeatType,
    icon: getIcon(backend.category)
  }
}
