import type { Airline } from '@/interfaces/interfaces'

/**
 * Default airline configuration.
 * Temporary until the backend Airline entity is added and seeded.
 * When the Airline table is available, replace this with an API call.
 */
export const DEFAULT_AIRLINE: Airline = {
  airlineId: 1,
  name: 'SunSkies Air',
  iataCode: 'SS',
  icaoCode: 'SUN',
  countryIso2: 'PH',
}