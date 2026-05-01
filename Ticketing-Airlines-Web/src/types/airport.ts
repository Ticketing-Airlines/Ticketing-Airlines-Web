import type { Airport } from '@/interfaces/interfaces'

// ============================================================
// Backend response type — mirrors AirportResponse DTO exactly
// ============================================================

export interface BackendAirport {
  id: number
  iataCode: string
  icaoCode: string
  name: string
  city: string
  country: string
  latitude: number | null
  longitude: number | null
  timeZone: string
  terminals: number
  isActive: boolean
  createdAt: string
  updatedAt: string | null
}

// ============================================================
// Country name → ISO 3166-1 alpha-2 mapping
// Temporary until backend adds countryIso2 column
// ============================================================

const COUNTRY_TO_ISO: Record<string, string> = {
  Philippines: 'PH',
  Singapore: 'SG',
  'Hong Kong': 'HK',
  Vietnam: 'VN',
  Thailand: 'TH',
  Malaysia: 'MY',
  Indonesia: 'ID',
  Japan: 'JP',
  'South Korea': 'KR',
  China: 'CN',
  Taiwan: 'TW',
  Australia: 'AU',
  'United States': 'US',
  'United Arab Emirates': 'AE',
  'Saudi Arabia': 'SA',
  India: 'IN',
  Cambodia: 'KH',
  Myanmar: 'MM',
  Laos: 'LA',
  Brunei: 'BN',
}

export function countryToIso(country: string | undefined | null): string {
  if (!country) {
    return 'XX' // Default fallback for missing country
  }
  return COUNTRY_TO_ISO[country] ?? country.substring(0, 2).toUpperCase()
}

export function mapBackendAirport(airport: BackendAirport): Airport {
  return {
    airportId: airport.id,
    name: airport.name,
    city: airport.city,
    countryIso2: countryToIso(airport.country),
    iataCode: airport.iataCode,
    timezone: airport.timeZone,
    latitude: airport.latitude ?? undefined,
    longitude: airport.longitude ?? undefined,
  }
}