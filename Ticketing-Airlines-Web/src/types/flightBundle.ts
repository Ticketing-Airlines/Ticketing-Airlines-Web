export interface BackendFlightBundleResponse {
  id: number
  name: string
  code: string
  priceIncrement: number
  carryOnWeightKg: number
  checkedBaggagePcs: number
  checkedBaggageWeightKg: number
  includesPreferredSeatSelection: boolean
  changeFeeType: number
  isCancellable: boolean
  allowsTravelFundConversion: boolean
  tagline: string | null
}

export interface FlightBundle {
  id: number
  type: string 
  name: string
  description: string
  priceIncrement: number
  features: {
    handCarryBag: string
    checkedBaggage: string | null
    seatSelection: 'none' | 'standard' | 'any'
    rebooking: boolean
    travelFundsConversion: boolean
    priorityBoarding: boolean
  }
}

// Mapper function
export function mapBackendFlightBundle(
  backend: BackendFlightBundleResponse
): FlightBundle {
  // Determine seat selection type
  let seatSelection: 'none' | 'standard' | 'any' = 'none'
  if (backend.includesPreferredSeatSelection) {
    // SKYFLEX gets 'any', SKYPLUS gets 'standard'
    seatSelection = backend.code === 'SKYFLEX' ? 'any' : 'standard'
  }

  // Format checked baggage
  let checkedBaggage: string | null = null
  if (backend.checkedBaggagePcs > 0) {
    checkedBaggage = `${backend.checkedBaggageWeightKg}kg (${backend.checkedBaggagePcs} pc${backend.checkedBaggagePcs > 1 ? 's' : ''})`
  }

  return {
    id: backend.id,
    type: backend.code,
    name: backend.name,
    description: backend.tagline || 'Flight bundle',
    priceIncrement: backend.priceIncrement,
    features: {
      handCarryBag: `${backend.carryOnWeightKg}kg`,
      checkedBaggage,
      seatSelection,
      rebooking: backend.changeFeeType === 1, // 1 = Free/Flexible
      travelFundsConversion: backend.allowsTravelFundConversion,
      priorityBoarding: backend.code === 'SKYFLEX' // Only SKYFLEX has priority boarding
    }
  }
}
