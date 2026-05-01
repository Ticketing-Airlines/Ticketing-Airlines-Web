export interface BackendAirportInfo {
  code: string
  airport: string
  city: string
  terminal: string | null
  gate: string | null
  scheduledTime: string
  actualTime: string | null
  estimatedTime: string | null
}

export interface BackendWeatherInfo {
  departure: {
    temp: string
    condition: string
  }
  arrival: {
    temp: string
    condition: string
  }
}

export interface BackendFlightStatusLookup {
  flightNumber: string
  airline: string
  aircraft: string
  date: string
  status: string
  duration: string
  departure: BackendAirportInfo
  arrival: BackendAirportInfo
  weather: BackendWeatherInfo
}

export interface BackendFlightStatusResponse {
  success: boolean
  data: BackendFlightStatusLookup | null
  error?: string
  message?: string
}

// ============================================================
// Frontend flight status type
// ============================================================

export interface FlightStatus {
  flightNumber: string
  airline: string
  date: string
  status: string
  duration: string
  departure: {
    airport: string
    code: string
    terminal: string
    gate: string
    scheduledTime: string
    estimatedTime?: string
    actualTime?: string | null
  }
  arrival: {
    airport: string
    code: string
    terminal: string
    gate: string
    scheduledTime: string
    estimatedTime?: string
    actualTime?: string | null
  }
  aircraft: string
  weather: {
    departure: { temp: string; condition: string }
    arrival: { temp: string; condition: string }
  }
}

// ============================================================
// Mapping function
// ============================================================

export function mapBackendFlightStatus(
  backendResponse: BackendFlightStatusResponse
): FlightStatus | null {
  if (!backendResponse.success || !backendResponse.data) {
    return null
  }

  const { data } = backendResponse

  return {
    flightNumber: data.flightNumber,
    airline: data.airline,
    date: data.date,
    status: data.status,
    duration: data.duration,
    departure: {
      airport: data.departure.airport,
      code: data.departure.code,
      terminal: data.departure.terminal ?? 'N/A',
      gate: data.departure.gate ?? 'N/A',
      scheduledTime: data.departure.scheduledTime,
      estimatedTime: data.departure.estimatedTime ?? undefined,
      actualTime: data.departure.actualTime,
    },
    arrival: {
      airport: data.arrival.airport,
      code: data.arrival.code,
      terminal: data.arrival.terminal ?? 'N/A',
      gate: data.arrival.gate ?? 'N/A',
      scheduledTime: data.arrival.scheduledTime,
      estimatedTime: data.arrival.estimatedTime ?? undefined,
      actualTime: data.arrival.actualTime,
    },
    aircraft: data.aircraft,
    weather: data.weather,
  }
}
