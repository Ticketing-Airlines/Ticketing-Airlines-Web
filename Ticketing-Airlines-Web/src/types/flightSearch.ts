import type {
  Airport,
  Aircraft,
  Airline,
  FlightSearchResult,
  RoundTripResult,
  FlightSearchResponse,
  FlightSearchParams,
  FareCode
} from '@/interfaces/interfaces'

export interface BackendAirportSearch {
  airportId: number
  iataCode: string
  name: string
  city: string
  countryIso2: string | null
}

export interface BackendAircraftSearch {
  aircraftId: number
  model: string
  manufacturer: string
  capacity: number
}

export interface BackendAirlineSearch {
  airlineId: number
  name: string
  iataCode: string
  logo: string | null
}

export interface BackendFlightSearchResult {
  flightInstanceId: number
  flightNumber: string
  originAirport: BackendAirportSearch
  destinationAirport: BackendAirportSearch
  departureTime: string
  arrivalTime: string
  duration: string
  price: number
  currency: string
  fareCode: string | null
  availableSeats: number
  aircraft: BackendAircraftSearch | null
  airline: BackendAirlineSearch | null
}

export interface BackendRoundTripCombination {
  outbound: BackendFlightSearchResult
  return: BackendFlightSearchResult
  totalPrice: number
}

export interface BackendFlightSearchData {
  results: (BackendFlightSearchResult | BackendRoundTripCombination)[]
  totalResults: number
  searchParams: {
    from: string
    to: string
    departureDate: string
    returnDate: string | null
    passengers: number
    tripType: string
  }
}

export interface BackendFlightSearchResponse {
  success: boolean
  data: BackendFlightSearchData
}

function mapBackendAirportSearch(airport: BackendAirportSearch): Airport {
  return {
    airportId: airport.airportId,
    name: airport.name,
    city: airport.city,
    countryIso2: airport.countryIso2 ?? 'XX', // Use backend's countryIso2 directly, fallback to XX
    iataCode: airport.iataCode,
    timezone: 'Asia/Manila', // Backend doesn't provide timezone in search response
  }
}

function mapBackendAircraftSearch(aircraft: BackendAircraftSearch | null): Aircraft {
  if (!aircraft) {
    return {
      aircraftId: 0,
      model: 'Unknown',
      icaoType: '',
      seatCapacity: 0,
      airlineId: 0,
    }
  }

  const icaoType = aircraft.model.match(/[A-Z]\d{3}/)?.[0] ?? aircraft.model

  return {
    aircraftId: aircraft.aircraftId,
    model: aircraft.model,
    icaoType,
    seatCapacity: aircraft.capacity,
    airlineId: 0,
  }
}

function mapBackendAirlineSearch(airline: BackendAirlineSearch | null): Airline {
  if (!airline) {
    return {
      airlineId: 0,
      name: 'Unknown',
      iataCode: '',
      countryIso2: 'PH',
    }
  }

  return {
    airlineId: airline.airlineId,
    name: airline.name,
    iataCode: airline.iataCode,
    icaoCode: undefined,
    countryIso2: 'PH',
  }
}

function mapBackendFlightSearchResult(result: BackendFlightSearchResult): FlightSearchResult {
  return {
    flightInstanceId: String(result.flightInstanceId),
    flightNumber: result.flightNumber,
    originAirport: mapBackendAirportSearch(result.originAirport),
    destinationAirport: mapBackendAirportSearch(result.destinationAirport),
    departureTime: result.departureTime,
    arrivalTime: result.arrivalTime,
    duration: result.duration,
    price: result.price,
    currency: result.currency,
    fareCode: (result.fareCode as FareCode) ?? 'Y',
    availableSeats: result.availableSeats,
    aircraft: mapBackendAircraftSearch(result.aircraft),
    airline: mapBackendAirlineSearch(result.airline),
  }
}

function isRoundTripCombination(
  item: BackendFlightSearchResult | BackendRoundTripCombination
): item is BackendRoundTripCombination {
  return 'outbound' in item && 'return' in item
}

export function mapBackendFlightSearch(
  backendResponse: BackendFlightSearchResponse
): FlightSearchResponse {
  const { data } = backendResponse

  // Determine if all results are round-trip combinations
  const isAllRoundTrip = data.results.length > 0 && data.results.every(isRoundTripCombination)
  const isAllOneWay = data.results.length > 0 && data.results.every(item => !isRoundTripCombination(item))

  // Map search params
  const searchParams: FlightSearchParams = {
    from: data.searchParams.from,
    to: data.searchParams.to,
    departureDate: new Date(data.searchParams.departureDate),
    returnDate: data.searchParams.returnDate ? new Date(data.searchParams.returnDate) : null,
    passengers: data.searchParams.passengers,
    tripType: data.searchParams.tripType,
  }

  // Map results based on type - ensure homogeneous arrays
  if (isAllRoundTrip) {
    const roundTripResults: RoundTripResult[] = data.results.map((item) => {
      const combo = item as BackendRoundTripCombination
      return {
        outbound: mapBackendFlightSearchResult(combo.outbound),
        return: mapBackendFlightSearchResult(combo.return),
        totalPrice: combo.totalPrice,
        currency: combo.outbound.currency,
      }
    })
    
    return {
      results: roundTripResults,
      totalResults: data.totalResults,
      searchParams,
    }
  } else if (isAllOneWay) {
    const oneWayResults: FlightSearchResult[] = data.results.map((item) => {
      return mapBackendFlightSearchResult(item as BackendFlightSearchResult)
    })
    
    return {
      results: oneWayResults,
      totalResults: data.totalResults,
      searchParams,
    }
  } else {
    const oneWayResults: FlightSearchResult[] = data.results
      .filter(item => !isRoundTripCombination(item))
      .map((item) => mapBackendFlightSearchResult(item as BackendFlightSearchResult))
    
    return {
      results: oneWayResults,
      totalResults: oneWayResults.length,
      searchParams,
    }
  }
}
