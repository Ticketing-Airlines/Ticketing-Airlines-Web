// Example mock dataset, now importing interfaces from a separate file

import boracayImg from '@/assets/boracay.webp'
import cebuImg from '@/assets/cebu.webp'
import davaoImg from '@/assets/davao.webp'
import singaporeImg from '@/assets/singapore.webp'
import palawanImg from '@/assets/palawan.webp'
import hongkongImg from '@/assets/hongkong.webp'

import { v4 as uuidv4 } from 'uuid'
import type {
  Airline, Airport, Aircraft, SeatBlueprint, FlightSchedule, FlightInstance,
  FlightSeat, FareBucket, User, UserRole, Passenger, Booking, BookingPassenger,
  Ticket, Payment, DestinationCard, Feature, FareCode
} from '@/interfaces/interfaces'

const uuid = (prefix?: string): string => {
  const id = uuidv4()
  return prefix ? `${prefix}-${id}` : id
}
const now = new Date().toISOString()

/** AIRLINES */
export const airlines: Airline[] = [
  { airlineId: 1, name: 'SunSkies Air', iataCode: 'SS', icaoCode: 'SUN', countryIso2: 'PH' }
]

/** AIRPORTS (with IATA + timezone) */
export const airports: Airport[] = [
  { airportId: 1, name: 'Ninoy Aquino International Airport', city: 'Manila', countryIso2: 'PH', iataCode: 'MNL', timezone: 'Asia/Manila', latitude: 14.508, longitude: 121.019 },
  { airportId: 2, name: 'Mactan–Cebu International Airport', city: 'Cebu', countryIso2: 'PH', iataCode: 'CEB', timezone: 'Asia/Manila', latitude: 10.31, longitude: 123.98 },
  { airportId: 3, name: 'Francisco Bangoy International Airport', city: 'Davao', countryIso2: 'PH', iataCode: 'DVO', timezone: 'Asia/Manila', latitude: 7.125, longitude: 125.645 },
  { airportId: 4, name: 'Godofredo P. Ramos Airport (Caticlan)', city: 'Caticlan (Boracay)', countryIso2: 'PH', iataCode: 'MPH', timezone: 'Asia/Manila', latitude: 11.924, longitude: 121.953 },
  { airportId: 5, name: 'Puerto Princesa International Airport', city: 'Puerto Princesa', countryIso2: 'PH', iataCode: 'PPS', timezone: 'Asia/Manila', latitude: 9.742, longitude: 118.759 },
  { airportId: 6, name: 'Clark International Airport', city: 'Clark (Pampanga)', countryIso2: 'PH', iataCode: 'CRK', timezone: 'Asia/Manila', latitude: 15.186, longitude: 120.560 },
  { airportId: 7, name: 'Iloilo International Airport', city: 'Iloilo', countryIso2: 'PH', iataCode: 'ILO', timezone: 'Asia/Manila', latitude: 10.833, longitude: 122.493 },
  { airportId: 8, name: 'Kalibo International Airport', city: 'Kalibo (Aklan)', countryIso2: 'PH', iataCode: 'KLO', timezone: 'Asia/Manila', latitude: 11.679, longitude: 122.376 },
  { airportId: 9, name: 'Bacolod-Silay Airport', city: 'Bacolod', countryIso2: 'PH', iataCode: 'BCD', timezone: 'Asia/Manila', latitude: 10.776, longitude: 123.015 },
  { airportId: 10, name: 'Cagayan de Oro Airport (Laguindingan)', city: 'Cagayan de Oro', countryIso2: 'PH', iataCode: 'CGY', timezone: 'Asia/Manila', latitude: 8.641, longitude: 124.611 },
  { airportId: 11, name: 'General Santos Airport', city: 'General Santos', countryIso2: 'PH', iataCode: 'GES', timezone: 'Asia/Manila', latitude: 6.058, longitude: 125.096 },
  { airportId: 12, name: 'Zamboanga International Airport', city: 'Zamboanga', countryIso2: 'PH', iataCode: 'ZAM', timezone: 'Asia/Manila', latitude: 6.922, longitude: 122.060 },
  { airportId: 13, name: 'Butuan Airport', city: 'Butuan', countryIso2: 'PH', iataCode: 'BXU', timezone: 'Asia/Manila', latitude: 8.951, longitude: 125.479 },
  { airportId: 14, name: 'Dumaguete Airport', city: 'Dumaguete', countryIso2: 'PH', iataCode: 'DGT', timezone: 'Asia/Manila', latitude: 9.334, longitude: 123.300 },
  { airportId: 15, name: 'Tacloban Airport', city: 'Tacloban', countryIso2: 'PH', iataCode: 'TAC', timezone: 'Asia/Manila', latitude: 11.228, longitude: 125.028 },
  { airportId: 16, name: 'Tuguegarao Airport', city: 'Tuguegarao', countryIso2: 'PH', iataCode: 'TUG', timezone: 'Asia/Manila', latitude: 17.643, longitude: 121.733 },
  { airportId: 17, name: 'Bohol-Panglao International Airport', city: 'Bohol (Panglao)', countryIso2: 'PH', iataCode: 'TAG', timezone: 'Asia/Manila', latitude: 9.665, longitude: 123.853 },
  { airportId: 18, name: 'Roxas Airport', city: 'Roxas (Capiz)', countryIso2: 'PH', iataCode: 'RXS', timezone: 'Asia/Manila', latitude: 11.597, longitude: 122.751 },
  { airportId: 19, name: 'Surigao Airport', city: 'Surigao', countryIso2: 'PH', iataCode: 'SUG', timezone: 'Asia/Manila', latitude: 9.756, longitude: 125.481 },
  { airportId: 20, name: 'Legazpi Airport', city: 'Legazpi (Albay)', countryIso2: 'PH', iataCode: 'LGP', timezone: 'Asia/Manila', latitude: 13.157, longitude: 123.735 },
  { airportId: 21, name: 'Singapore Changi Airport', city: 'Singapore', countryIso2: 'SG', iataCode: 'SIN', timezone: 'Asia/Singapore', latitude: 1.364, longitude: 103.991 },
  { airportId: 22, name: 'Hong Kong International Airport', city: 'Hong Kong', countryIso2: 'HK', iataCode: 'HKG', timezone: 'Asia/Hong_Kong', latitude: 22.315, longitude: 113.936 },
]

/** AIRCRAFTS */
export const aircrafts: Aircraft[] = [
  { aircraftId: 1, model: 'Airbus A320-200', icaoType: 'A320', seatCapacity: 180, airlineId: 1 },
  { aircraftId: 2, model: 'Airbus A321-200', icaoType: 'A321', seatCapacity: 220, airlineId: 1 },
]

/** AIRCRAFT SEAT CONFIGURATIONS - For Visual Seat Map */
export interface AircraftSeatConfig {
  aircraftId: number
  aircraftType: string
  totalRows: number
  seatsPerRow: string[] // ['A', 'B', 'C', 'D', 'E', 'F']
  aisleAfter: number[] // Aisle positions (e.g., [2, 5] means aisle after column 2 and 5)
  exitRows: number[]
  premiumRows: number[]
  extraLegroomSeats: string[]
  occupiedSeats: string[] // Mock occupied seats
}

export const aircraftSeatConfigs: AircraftSeatConfig[] = [
  // Airbus A320-200 - 180 seats, 3-3 configuration
  {
    aircraftId: 1,
    aircraftType: 'Airbus A320-200',
    totalRows: 30,
    seatsPerRow: ['A', 'B', 'C', 'D', 'E', 'F'],
    aisleAfter: [2, 5], // Aisle after C and after F (3-3 config)
    exitRows: [12, 13],
    premiumRows: [1, 2, 3, 4, 5],
    extraLegroomSeats: ['14A', '14B', '14C', '14D', '14E', '14F', '25A', '25F'],
    occupiedSeats: [
      '1A', '1B', '2C', '2D', '3A', '3F', '4B', '4E',
      '5C', '5D', '7A', '7F', '8B', '8C', '8D', '8E',
      '10A', '10F', '11B', '11C', '12D', '12E', '15A', '15B',
      '16C', '16D', '17E', '17F', '18A', '18B', '20C', '20D',
      '22A', '22F', '23B', '23E', '25C', '25D', '27A', '27F'
    ]
  },
  // Airbus A321-200 - 220 seats, 3-3 configuration
  {
    aircraftId: 2,
    aircraftType: 'Airbus A321-200',
    totalRows: 37,
    seatsPerRow: ['A', 'B', 'C', 'D', 'E', 'F'],
    aisleAfter: [2, 5],
    exitRows: [15, 16],
    premiumRows: [1, 2, 3, 4, 5, 6],
    extraLegroomSeats: ['17A', '17B', '17C', '17D', '17E', '17F', '30A', '30F'],
    occupiedSeats: [
      '1A', '1B', '1C', '2D', '2E', '2F', '3A', '3B', '4C', '4D',
      '5E', '5F', '6A', '6B', '8C', '8D', '10A', '10F', '12B', '12E',
      '15A', '15F', '16C', '16D', '18B', '18E', '20A', '20F', '22C', '22D'
    ]
  }
]

/** Seat pricing configuration */
export interface SeatPricing {
  standard: number
  premium: number
  exitRow: number
  extraLegroom: number
}

export const seatPricing: SeatPricing = {
  standard: 0,      // Free (included in base fare)
  premium: 500,     // Front rows 1-5/6
  exitRow: 800,     // Exit row seats
  extraLegroom: 600 // Specific extra legroom seats
}

/** Helper function to get seat type */
export function getSeatType(seatNumber: string, config: AircraftSeatConfig): 'window' | 'middle' | 'aisle' {
  const column = seatNumber.replace(/\d+/, '')
  const firstColumn = config.seatsPerRow[0]
  const lastColumn = config.seatsPerRow[config.seatsPerRow.length - 1]

  // Window seats (first and last columns)
  if (column === firstColumn || column === lastColumn) {
    return 'window'
  }

  // Aisle seats (columns adjacent to aisles)
  const aisleColumns: string[] = []
  config.aisleAfter.forEach(pos => {
    if (pos < config.seatsPerRow.length) {
      aisleColumns.push(config.seatsPerRow[pos])
      if (pos + 1 < config.seatsPerRow.length) {
        aisleColumns.push(config.seatsPerRow[pos + 1])
      }
    }
  })

  if (aisleColumns.includes(column)) {
    return 'aisle'
  }

  return 'middle'
}

/** Helper function to get seat price */
export function getSeatPrice(seatNumber: string, config: AircraftSeatConfig): number {
  const row = parseInt(seatNumber.match(/\d+/)?.[0] || '0')

  // Exit row seats
  if (config.exitRows.includes(row)) {
    return seatPricing.exitRow
  }

  // Extra legroom seats
  if (config.extraLegroomSeats.includes(seatNumber)) {
    return seatPricing.extraLegroom
  }

  // Premium seats (front rows)
  if (config.premiumRows.includes(row)) {
    return seatPricing.premium
  }

  // Standard seats
  return seatPricing.standard
}

/** SEAT BLUEPRINT sample (keeping for compatibility, but using aircraftSeatConfigs for visual map) */
export const seatBlueprints: SeatBlueprint[] = [
  ...['1', '2', '3'].flatMap(row =>
    ['A', 'B', 'C', 'D', 'E', 'F'].map(col => ({
      seatBlueprintId: Number(row + (col.charCodeAt(0) - 60)),
      aircraftId: 1,
      seatNumber: `${row}${col}`,
      cabinClass: 'Economy' as const,
      isWindow: col === 'A' || col === 'F',
      isAisle: col === 'C' || col === 'D',
      isExitRow: row === '3'
    }))
  )
]

/** FLIGHT SCHEDULES (templates) */
export const flightSchedules: FlightSchedule[] = [
  // Manila to Cebu
  { flightScheduleId: 101, flightNumber: 'SS101', originAirportId: 1, destinationAirportId: 2, aircraftId: 1, operatingAirlineId: 1, stdLocal: '08:00', staLocal: '09:15', published: true },

  // Manila to Davao
  { flightScheduleId: 201, flightNumber: 'SS201', originAirportId: 1, destinationAirportId: 3, aircraftId: 1, operatingAirlineId: 1, stdLocal: '10:30', staLocal: '11:50', published: true },

  // Manila to Singapore
  { flightScheduleId: 301, flightNumber: 'SS301', originAirportId: 1, destinationAirportId: 21, aircraftId: 2, operatingAirlineId: 1, stdLocal: '18:10', staLocal: '21:55', published: true },

  // Manila to Hong Kong
  { flightScheduleId: 401, flightNumber: 'SS401', originAirportId: 1, destinationAirportId: 22, aircraftId: 2, operatingAirlineId: 1, stdLocal: '22:20', staLocal: '01:45', published: true },

  // Manila to Boracay
  { flightScheduleId: 501, flightNumber: 'SS501', originAirportId: 1, destinationAirportId: 4, aircraftId: 1, operatingAirlineId: 1, stdLocal: '14:30', staLocal: '15:45', published: true },

  // Manila to Palawan
  { flightScheduleId: 601, flightNumber: 'SS601', originAirportId: 1, destinationAirportId: 5, aircraftId: 1, operatingAirlineId: 1, stdLocal: '16:45', staLocal: '18:00', published: true },

  // Manila to Iloilo
  { flightScheduleId: 701, flightNumber: 'SS701', originAirportId: 1, destinationAirportId: 7, aircraftId: 1, operatingAirlineId: 1, stdLocal: '20:15', staLocal: '21:30', published: true },

  // Return flights
  // Cebu to Manila
  { flightScheduleId: 801, flightNumber: 'SS801', originAirportId: 2, destinationAirportId: 1, aircraftId: 1, operatingAirlineId: 1, stdLocal: '02:00', staLocal: '03:15', published: true },

  // Davao to Manila
  { flightScheduleId: 901, flightNumber: 'SS901', originAirportId: 3, destinationAirportId: 1, aircraftId: 1, operatingAirlineId: 1, stdLocal: '04:30', staLocal: '05:50', published: true },

  // Singapore to Manila
  { flightScheduleId: 1001, flightNumber: 'SS1001', originAirportId: 21, destinationAirportId: 1, aircraftId: 2, operatingAirlineId: 1, stdLocal: '06:10', staLocal: '09:55', published: true },

  // Hong Kong to Manila
  { flightScheduleId: 1101, flightNumber: 'SS1101', originAirportId: 22, destinationAirportId: 1, aircraftId: 2, operatingAirlineId: 1, stdLocal: '07:20', staLocal: '10:45', published: true }
]

/** FLIGHT INSTANCES (dated flights) */
export const flightInstances: FlightInstance[] = [
  // Manila to Cebu routes
  { flightInstanceId: uuid('fi-101'), flightScheduleId: 101, flightDate: '2025-10-16', departureUtc: '2025-10-16T00:00:00Z', arrivalUtc: '2025-10-16T01:15:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-102'), flightScheduleId: 101, flightDate: '2025-10-17', departureUtc: '2025-10-17T00:00:00Z', arrivalUtc: '2025-10-17T01:15:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-103'), flightScheduleId: 101, flightDate: '2025-10-18', departureUtc: '2025-10-18T00:00:00Z', arrivalUtc: '2025-10-18T01:15:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-104'), flightScheduleId: 101, flightDate: '2025-10-19', departureUtc: '2025-10-19T00:00:00Z', arrivalUtc: '2025-10-19T01:15:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-105'), flightScheduleId: 101, flightDate: '2025-10-20', departureUtc: '2025-10-20T00:00:00Z', arrivalUtc: '2025-10-20T01:15:00Z', status: 'Scheduled' },

  // Manila to Davao routes
  { flightInstanceId: uuid('fi-201'), flightScheduleId: 201, flightDate: '2025-10-16', departureUtc: '2025-10-16T02:30:00Z', arrivalUtc: '2025-10-16T03:50:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-202'), flightScheduleId: 201, flightDate: '2025-10-17', departureUtc: '2025-10-17T02:30:00Z', arrivalUtc: '2025-10-17T03:50:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-203'), flightScheduleId: 201, flightDate: '2025-10-18', departureUtc: '2025-10-18T02:30:00Z', arrivalUtc: '2025-10-18T03:50:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-204'), flightScheduleId: 201, flightDate: '2025-10-19', departureUtc: '2025-10-19T02:30:00Z', arrivalUtc: '2025-10-19T03:50:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-205'), flightScheduleId: 201, flightDate: '2025-10-20', departureUtc: '2025-10-20T02:30:00Z', arrivalUtc: '2025-10-20T03:50:00Z', status: 'Scheduled' },

  // Manila to Singapore routes
  { flightInstanceId: uuid('fi-301'), flightScheduleId: 301, flightDate: '2025-10-16', departureUtc: '2025-10-16T10:10:00Z', arrivalUtc: '2025-10-16T13:55:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-302'), flightScheduleId: 301, flightDate: '2025-10-17', departureUtc: '2025-10-17T10:10:00Z', arrivalUtc: '2025-10-17T13:55:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-303'), flightScheduleId: 301, flightDate: '2025-10-18', departureUtc: '2025-10-18T10:10:00Z', arrivalUtc: '2025-10-18T13:55:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-304'), flightScheduleId: 301, flightDate: '2025-10-19', departureUtc: '2025-10-19T10:10:00Z', arrivalUtc: '2025-10-19T13:55:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-305'), flightScheduleId: 301, flightDate: '2025-10-20', departureUtc: '2025-10-20T10:10:00Z', arrivalUtc: '2025-10-20T13:55:00Z', status: 'Scheduled' },

  // Manila to Hong Kong routes
  { flightInstanceId: uuid('fi-401'), flightScheduleId: 401, flightDate: '2025-10-16', departureUtc: '2025-10-16T14:20:00Z', arrivalUtc: '2025-10-16T17:45:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-402'), flightScheduleId: 401, flightDate: '2025-10-17', departureUtc: '2025-10-17T14:20:00Z', arrivalUtc: '2025-10-17T17:45:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-403'), flightScheduleId: 401, flightDate: '2025-10-18', departureUtc: '2025-10-18T14:20:00Z', arrivalUtc: '2025-10-18T17:45:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-404'), flightScheduleId: 401, flightDate: '2025-10-19', departureUtc: '2025-10-19T14:20:00Z', arrivalUtc: '2025-10-19T17:45:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-405'), flightScheduleId: 401, flightDate: '2025-10-20', departureUtc: '2025-10-20T14:20:00Z', arrivalUtc: '2025-10-20T17:45:00Z', status: 'Scheduled' },

  // Manila to Boracay routes
  { flightInstanceId: uuid('fi-501'), flightScheduleId: 501, flightDate: '2025-10-16', departureUtc: '2025-10-16T06:30:00Z', arrivalUtc: '2025-10-16T07:45:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-502'), flightScheduleId: 501, flightDate: '2025-10-17', departureUtc: '2025-10-17T06:30:00Z', arrivalUtc: '2025-10-17T07:45:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-503'), flightScheduleId: 501, flightDate: '2025-10-18', departureUtc: '2025-10-18T06:30:00Z', arrivalUtc: '2025-10-18T07:45:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-504'), flightScheduleId: 501, flightDate: '2025-10-19', departureUtc: '2025-10-19T06:30:00Z', arrivalUtc: '2025-10-19T07:45:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-505'), flightScheduleId: 501, flightDate: '2025-10-20', departureUtc: '2025-10-20T06:30:00Z', arrivalUtc: '2025-10-20T07:45:00Z', status: 'Scheduled' },

  // Manila to Palawan routes
  { flightInstanceId: uuid('fi-601'), flightScheduleId: 601, flightDate: '2025-10-16', departureUtc: '2025-10-16T08:45:00Z', arrivalUtc: '2025-10-16T10:00:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-602'), flightScheduleId: 601, flightDate: '2025-10-17', departureUtc: '2025-10-17T08:45:00Z', arrivalUtc: '2025-10-17T10:00:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-603'), flightScheduleId: 601, flightDate: '2025-10-18', departureUtc: '2025-10-18T08:45:00Z', arrivalUtc: '2025-10-18T10:00:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-604'), flightScheduleId: 601, flightDate: '2025-10-19', departureUtc: '2025-10-19T08:45:00Z', arrivalUtc: '2025-10-19T10:00:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-605'), flightScheduleId: 601, flightDate: '2025-10-20', departureUtc: '2025-10-20T08:45:00Z', arrivalUtc: '2025-10-20T10:00:00Z', status: 'Scheduled' },

  // Manila to Iloilo routes
  { flightInstanceId: uuid('fi-701'), flightScheduleId: 701, flightDate: '2025-10-16', departureUtc: '2025-10-16T12:15:00Z', arrivalUtc: '2025-10-16T13:30:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-702'), flightScheduleId: 701, flightDate: '2025-10-17', departureUtc: '2025-10-17T12:15:00Z', arrivalUtc: '2025-10-17T13:30:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-703'), flightScheduleId: 701, flightDate: '2025-10-18', departureUtc: '2025-10-18T12:15:00Z', arrivalUtc: '2025-10-18T13:30:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-704'), flightScheduleId: 701, flightDate: '2025-10-19', departureUtc: '2025-10-19T12:15:00Z', arrivalUtc: '2025-10-19T13:30:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-705'), flightScheduleId: 701, flightDate: '2025-10-20', departureUtc: '2025-10-20T12:15:00Z', arrivalUtc: '2025-10-20T13:30:00Z', status: 'Scheduled' },

  // Return flights (Cebu to Manila)
  { flightInstanceId: uuid('fi-801'), flightScheduleId: 801, flightDate: '2025-10-16', departureUtc: '2025-10-16T18:00:00Z', arrivalUtc: '2025-10-16T19:15:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-802'), flightScheduleId: 801, flightDate: '2025-10-17', departureUtc: '2025-10-17T18:00:00Z', arrivalUtc: '2025-10-17T19:15:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-803'), flightScheduleId: 801, flightDate: '2025-10-18', departureUtc: '2025-10-18T18:00:00Z', arrivalUtc: '2025-10-18T19:15:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-804'), flightScheduleId: 801, flightDate: '2025-10-19', departureUtc: '2025-10-19T18:00:00Z', arrivalUtc: '2025-10-19T19:15:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-805'), flightScheduleId: 801, flightDate: '2025-10-20', departureUtc: '2025-10-20T18:00:00Z', arrivalUtc: '2025-10-20T19:15:00Z', status: 'Scheduled' },

  // Return flights (Davao to Manila)
  { flightInstanceId: uuid('fi-901'), flightScheduleId: 901, flightDate: '2025-10-16', departureUtc: '2025-10-16T20:30:00Z', arrivalUtc: '2025-10-16T21:50:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-902'), flightScheduleId: 901, flightDate: '2025-10-17', departureUtc: '2025-10-17T20:30:00Z', arrivalUtc: '2025-10-17T21:50:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-903'), flightScheduleId: 901, flightDate: '2025-10-18', departureUtc: '2025-10-18T20:30:00Z', arrivalUtc: '2025-10-18T21:50:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-904'), flightScheduleId: 901, flightDate: '2025-10-19', departureUtc: '2025-10-19T20:30:00Z', arrivalUtc: '2025-10-19T21:50:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-905'), flightScheduleId: 901, flightDate: '2025-10-20', departureUtc: '2025-10-20T20:30:00Z', arrivalUtc: '2025-10-20T21:50:00Z', status: 'Scheduled' },

  // Return flights (Singapore to Manila)
  { flightInstanceId: uuid('fi-1001'), flightScheduleId: 1001, flightDate: '2025-10-16', departureUtc: '2025-10-16T22:10:00Z', arrivalUtc: '2025-10-17T01:55:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-1002'), flightScheduleId: 1001, flightDate: '2025-10-17', departureUtc: '2025-10-17T22:10:00Z', arrivalUtc: '2025-10-18T01:55:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-1003'), flightScheduleId: 1001, flightDate: '2025-10-18', departureUtc: '2025-10-18T22:10:00Z', arrivalUtc: '2025-10-19T01:55:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-1004'), flightScheduleId: 1001, flightDate: '2025-10-19', departureUtc: '2025-10-19T22:10:00Z', arrivalUtc: '2025-10-20T01:55:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-1005'), flightScheduleId: 1001, flightDate: '2025-10-20', departureUtc: '2025-10-20T22:10:00Z', arrivalUtc: '2025-10-21T01:55:00Z', status: 'Scheduled' },

  // Return flights (Hong Kong to Manila)
  { flightInstanceId: uuid('fi-1101'), flightScheduleId: 1101, flightDate: '2025-10-16', departureUtc: '2025-10-16T23:20:00Z', arrivalUtc: '2025-10-17T02:45:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-1102'), flightScheduleId: 1101, flightDate: '2025-10-17', departureUtc: '2025-10-17T23:20:00Z', arrivalUtc: '2025-10-18T02:45:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-1103'), flightScheduleId: 1101, flightDate: '2025-10-18', departureUtc: '2025-10-18T23:20:00Z', arrivalUtc: '2025-10-19T02:45:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-1104'), flightScheduleId: 1101, flightDate: '2025-10-19', departureUtc: '2025-10-19T23:20:00Z', arrivalUtc: '2025-10-20T02:45:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-1105'), flightScheduleId: 1101, flightDate: '2025-10-20', departureUtc: '2025-10-20T23:20:00Z', arrivalUtc: '2025-10-21T02:45:00Z', status: 'Scheduled' }
]

/** FLIGHT SEATS (tiny sample) */
export const flightSeats: FlightSeat[] = [
  { flightSeatId: uuid('fs'), flightInstanceId: flightInstances[0].flightInstanceId, seatNumber: '1A', cabinClass: 'Economy', status: 'Available' },
  { flightSeatId: uuid('fs'), flightInstanceId: flightInstances[0].flightInstanceId, seatNumber: '1B', cabinClass: 'Economy', status: 'Available' },
  { flightSeatId: uuid('fs'), flightInstanceId: flightInstances[0].flightInstanceId, seatNumber: '1C', cabinClass: 'Economy', status: 'Available' },
]

/** FARE BUCKETS (inventory-aware) - Comprehensive pricing for all flights */
export const fareBuckets: FareBucket[] = [
  // Generate fare buckets for all flight instances
  ...flightInstances.flatMap(flight => [
    { fareBucketId: uuid('fb'), flightInstanceId: flight.flightInstanceId, code: 'Y' as FareCode, price: getBasePrice(flight.flightScheduleId), currency: 'PHP', total: 100, held: 2, sold: 30 },
    { fareBucketId: uuid('fb'), flightInstanceId: flight.flightInstanceId, code: 'M' as FareCode, price: getBasePrice(flight.flightScheduleId) + 600, currency: 'PHP', total: 50, held: 0, sold: 10 },
    { fareBucketId: uuid('fb'), flightInstanceId: flight.flightInstanceId, code: 'B' as FareCode, price: getBasePrice(flight.flightScheduleId) + 1200, currency: 'PHP', total: 30, held: 0, sold: 5 }
  ])
]

// Helper function to get base price based on route
function getBasePrice(scheduleId: number): number {
  const priceMap: Record<number, number> = {
    101: 2899,  // MNL-CEB
    201: 4199,  // MNL-DVO
    301: 8999,  // MNL-SIN
    401: 11999, // MNL-HKG
    501: 3299,  // MNL-MPH (Boracay)
    601: 5799,  // MNL-PPS (Palawan)
    701: 3799,  // MNL-ILO
    801: 2899,  // CEB-MNL
    901: 4199,  // DVO-MNL
    1001: 8999, // SIN-MNL
    1101: 11999 // HKG-MNL
  }
  return priceMap[scheduleId] || 3999
}

/** USERS */
const adminUserId = uuid('user')
const customerUserId = uuid('user')

export const users: User[] = [
  { userId: adminUserId, email: 'admin@sunskies.example', name: 'Admin User', passwordHash: '***', createdAt: now },
  { userId: customerUserId, email: 'jane.doe@example.com', name: 'Jane Doe', createdAt: now },
  { userId: uuid('user'), email: 'john.smith@example.com', name: 'John Smith', createdAt: now },
  { userId: uuid('user'), email: 'test@example.com', name: 'Test User', createdAt: now },
]
export const userRoles: UserRole[] = [
  { userId: adminUserId, role: 'Admin' },
  { userId: customerUserId, role: 'Customer' },
]

/** PASSENGERS */
const passengerId = uuid('passenger')

export const passengers: Passenger[] = [
  { passengerId, userId: customerUserId, firstName: 'Jane', lastName: 'Doe', dob: '1996-07-14', nationality: 'PH', passportNumber: 'P1234567' }
]

/** BOOKINGS */
const bookingId = uuid('booking')
const bookingPassengerId = uuid('booking-passenger')

export const bookings: Booking[] = [
  { bookingId, pnr: 'ABC123', bookingDate: now, totalAmount: 3299, currency: 'PHP', status: 'Ticketed', contactName: 'Chris Guest', contactEmail: 'guest@example.com', contactPhone: '+63-900-000-0000' }
]

export const bookingPassengers: BookingPassenger[] = [
  { bookingPassengerId, bookingId, passengerId, paxType: 'ADT' }
]

export const tickets: Ticket[] = [
  { ticketId: uuid('ticket'), bookingId, bookingPassengerId, flightInstanceId: flightInstances[0].flightInstanceId, flightSeatId: flightSeats[0].flightSeatId, eticketNumber: '999-1234567890', segmentIndex: 1, issueDateUtc: now, status: 'Issued' }
]

export const payments: Payment[] = [
  { paymentId: uuid('payment'), bookingId, provider: 'Stripe', providerRef: 'pi_123', idempotencyKey: 'idem-abc', amount: 3299, currency: 'PHP', status: 'Captured', paidAtUtc: now }
]

/** Marketing cards + features (mapped to real airport codes) */
export const destinationCards: DestinationCard[] = [
  { id: 1, label: 'Boracay', primaryAirportCode: 'MPH', description: 'White Beach Paradise', price: 3299, originalPrice: 4999, badge: 'HOT DEAL', savings: Math.round((1 - 3299 / 4999) * 100), image: boracayImg },
  { id: 2, label: 'Cebu', primaryAirportCode: 'CEB', description: 'Queen City of the South', price: 2899, originalPrice: 3799, badge: 'POPULAR', savings: Math.round((1 - 2899 / 3799) * 100), image: cebuImg },
  { id: 3, label: 'Davao', primaryAirportCode: 'DVO', description: 'City of Durian', price: 4199, originalPrice: 5499, badge: 'NEW ROUTE', savings: Math.round((1 - 4199 / 5499) * 100), image: davaoImg },
  { id: 4, label: 'Singapore', primaryAirportCode: 'SIN', description: 'Lion City', price: 8999, originalPrice: 12999, badge: 'INTERNATIONAL', savings: Math.round((1 - 8999 / 12999) * 100), image: singaporeImg },
  { id: 5, label: 'Palawan', primaryAirportCode: 'PPS', description: 'Last Frontier', price: 5799, originalPrice: 7299, badge: 'TRENDING', savings: Math.round((1 - 5799 / 7299) * 100), image: palawanImg },
  { id: 6, label: 'Hong Kong', primaryAirportCode: 'HKG', description: 'Pearl of the Orient', price: 11999, originalPrice: 15999, badge: 'INTERNATIONAL', savings: Math.round((1 - 11999 / 15999) * 100), image: hongkongImg },
]

export const features: Feature[] = [
  { id: 1, title: 'Affordable Fares', description: 'Competitive prices without compromising on quality and safety.', icon: 'DollarSign' },
  { id: 2, title: 'On-Time Performance', description: 'Reliable schedules and punctual departures for your peace of mind.', icon: 'Clock' },
  { id: 3, title: 'Safety First', description: 'Highest safety standards with modern aircraft and experienced crew.', icon: 'Shield' },
  { id: 4, title: 'Filipino Hospitality', description: 'Warm, friendly service that makes every passenger feel like family.', icon: 'Heart' },
]

/** SUPPORT CENTER DATA */

// FAQ Items
export interface FAQItem {
  id: number
  category: string
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  // Booking & Ticketing
  { id: 1, category: 'Booking & Ticketing', question: 'How do I book a flight?', answer: 'You can book a flight through our website by selecting your departure and arrival cities, choosing your travel dates, and completing the booking process. You can also book through our mobile app or by calling our customer service hotline.' },
  { id: 2, category: 'Booking & Ticketing', question: 'Can I change my booking after confirmation?', answer: 'Yes, you can modify your booking up to 24 hours before departure. Changes may be subject to fare differences and change fees. Visit "Manage Booking" to make changes online.' },
  { id: 3, category: 'Booking & Ticketing', question: 'How do I find my booking reference (PNR)?', answer: 'Your PNR (Passenger Name Record) is a 6-character code sent to your email after booking. You can also find it in "My Bookings" after logging in to your account.' },
  { id: 4, category: 'Booking & Ticketing', question: 'What payment methods do you accept?', answer: 'We accept credit/debit cards (Visa, Mastercard, JCB, Amex), e-wallets (GCash, PayMaya, GrabPay), online banking, over-the-counter payments (7-Eleven, Bayad Center), and PayPal for international transactions.' },

  // Flight Changes & Cancellations
  { id: 5, category: 'Flight Changes & Cancellations', question: 'How do I cancel my booking?', answer: 'You can cancel your booking online through "Manage Booking" or by contacting customer service. Cancellation fees and refund eligibility depend on your fare type.' },
  { id: 6, category: 'Flight Changes & Cancellations', question: 'What is your refund policy?', answer: 'Refunds depend on your ticket type. Fully refundable tickets receive 100% refund. Non-refundable tickets may only receive taxes and fees. Processing takes 7-14 business days.' },
  { id: 7, category: 'Flight Changes & Cancellations', question: 'What happens if my flight is delayed or cancelled?', answer: 'If we cancel your flight, you can choose a full refund or free rebooking. For delays over 3 hours, we provide meal vouchers and, if necessary, accommodation.' },

  // Baggage
  { id: 8, category: 'Baggage', question: 'What is the baggage allowance?', answer: 'Economy class passengers get 7kg cabin baggage. Checked baggage starts at 20kg and can be purchased during booking or later. Business class passengers get 32kg checked baggage included.' },
  { id: 9, category: 'Baggage', question: 'What items are prohibited in baggage?', answer: 'Prohibited items include explosives, flammable materials, weapons, and lithium batteries over 100Wh. Liquids in cabin baggage must not exceed 100ml per container.' },
  { id: 10, category: 'Baggage', question: 'How do I add extra baggage?', answer: 'You can add baggage during booking or anytime before check-in through "Manage Booking". Pre-purchased baggage is cheaper than airport rates.' },

  // Check-in
  { id: 11, category: 'Check-in', question: 'When does online check-in open?', answer: 'Online check-in opens 48 hours before departure and closes 4 hours before for domestic flights, 6 hours for international flights.' },
  { id: 12, category: 'Check-in', question: 'Do I need to print my boarding pass?', answer: 'Mobile boarding passes are accepted at all airports. However, we recommend having a printed copy as backup, especially for international flights.' },
  { id: 13, category: 'Check-in', question: 'What documents do I need for check-in?', answer: 'For domestic flights, bring a valid government-issued ID. For international flights, you need your passport (valid for at least 6 months) and any required visas.' },

  // Payment & Refunds
  { id: 14, category: 'Payment & Refunds', question: 'My payment failed but money was deducted. What should I do?', answer: 'Failed transactions are automatically reversed within 7-14 business days. If you don\'t receive a booking confirmation, the payment wasn\'t successful. Contact your bank if the reversal is delayed.' },
  { id: 15, category: 'Payment & Refunds', question: 'How long does a refund take?', answer: 'Refunds are processed within 7-14 business days for cards and e-wallets. Bank processing may take an additional 3-5 business days depending on your financial institution.' },

  // Travel Documents
  { id: 16, category: 'Travel Documents', question: 'Do I need a visa for international travel?', answer: 'Visa requirements vary by destination and nationality. Philippine passport holders can enter ASEAN countries visa-free for tourism. Check with the embassy of your destination country.' },
  { id: 17, category: 'Travel Documents', question: 'Can I travel with an expiring passport?', answer: 'Your passport must be valid for at least 6 months from your date of travel. Airlines can deny boarding if your passport expires within this period.' },

  // Special Assistance
  { id: 18, category: 'Special Assistance', question: 'How do I request special assistance?', answer: 'Request special assistance (wheelchair, medical equipment, etc.) at least 48 hours before departure by calling customer service or adding it during booking.' },
  { id: 19, category: 'Special Assistance', question: 'Can I travel with my pet?', answer: 'Small pets (max 7kg including carrier) can travel in cabin. Larger pets travel as checked baggage. Book pet travel at least 48 hours in advance and bring health certificates.' },
  { id: 20, category: 'Special Assistance', question: 'Do you offer assistance for unaccompanied minors?', answer: 'Children aged 5-11 can travel alone with our Unaccompanied Minor service. Fee applies. Parents must complete required forms and stay until departure.' },
]

// Help Articles
export interface HelpArticle {
  id: number
  title: string
  category: string
  content: string
  lastUpdated: string
  readTime: string
  relatedArticles: number[]
}

export const helpArticles: HelpArticle[] = [
  {
    id: 1,
    title: 'How to Book Your First Flight',
    category: 'Getting Started',
    content: `<h3>Step-by-Step Booking Guide</h3>
    <p>Booking your first flight with SunSkies Air is easy! Follow these simple steps:</p>
    <ol>
      <li><strong>Search for Flights:</strong> Enter your departure city, destination, and travel dates on our homepage.</li>
      <li><strong>Select Your Flight:</strong> Choose from available flights based on price, time, and convenience.</li>
      <li><strong>Add Passengers:</strong> Enter details for all travelers. Make sure names match government IDs exactly.</li>
      <li><strong>Choose Add-ons:</strong> Select baggage, meals, and seats if desired.</li>
      <li><strong>Payment:</strong> Complete payment using your preferred method.</li>
      <li><strong>Confirmation:</strong> You'll receive a booking confirmation email with your PNR.</li>
    </ol>
    <p><strong>Pro Tips:</strong></p>
    <ul>
      <li>Book early for better prices</li>
      <li>Sign up for an account to save passenger details</li>
      <li>Consider travel insurance for peace of mind</li>
    </ul>`,
    lastUpdated: '2025-11-15',
    readTime: '3 min',
    relatedArticles: [2, 3]
  },
  {
    id: 2,
    title: 'Understanding Fare Types',
    category: 'Booking Guide',
    content: `<h3>Choose the Right Fare for Your Journey</h3>
    <p>SunSkies Air offers three fare types to suit different needs:</p>
    <h4>Economy Lite (Y Fare)</h4>
    <ul>
      <li>Lowest price</li>
      <li>Cabin baggage only (7kg)</li>
      <li>No changes or refunds</li>
      <li>Seat selection for a fee</li>
    </ul>
    <h4>Economy Flex (M Fare)</h4>
    <ul>
      <li>Mid-range pricing</li>
      <li>20kg checked baggage included</li>
      <li>One free change allowed</li>
      <li>Standard seat selection included</li>
    </ul>
    <h4>Business Flex (B Fare)</h4>
    <ul>
      <li>Premium pricing</li>
      <li>32kg baggage + priority boarding</li>
      <li>Unlimited changes</li>
      <li>Premium seat selection</li>
      <li>Lounge access</li>
    </ul>`,
    lastUpdated: '2025-11-10',
    readTime: '4 min',
    relatedArticles: [1, 4]
  },
  {
    id: 3,
    title: 'Managing Your Booking Online',
    category: 'Managing Your Booking',
    content: `<h3>Make Changes to Your Booking</h3>
    <p>Need to modify your booking? Here's how:</p>
    <ol>
      <li>Go to "Manage Booking" on our website</li>
      <li>Enter your PNR and last name</li>
      <li>Select what you want to change:
        <ul>
          <li>Flight dates or times</li>
          <li>Passenger details (name corrections)</li>
          <li>Add baggage or meals</li>
          <li>Select or change seats</li>
        </ul>
      </li>
      <li>Pay any applicable fees</li>
      <li>Receive updated confirmation</li>
    </ol>
    <p><strong>Important Notes:</strong></p>
    <ul>
      <li>Changes must be made at least 24 hours before departure</li>
      <li>Fare differences and change fees may apply</li>
      <li>Some ticket types don't allow changes</li>
    </ul>`,
    lastUpdated: '2025-11-12',
    readTime: '3 min',
    relatedArticles: [1, 5]
  },
  {
    id: 4,
    title: 'Baggage Guidelines and Restrictions',
    category: 'Baggage Guidelines',
    content: `<h3>Everything You Need to Know About Baggage</h3>
    <h4>Cabin Baggage</h4>
    <ul>
      <li>Maximum 7kg</li>
      <li>Dimensions: 56cm x 36cm x 23cm</li>
      <li>One personal item (laptop bag, purse)</li>
    </ul>
    <h4>Checked Baggage</h4>
    <ul>
      <li>Purchase 20kg, 32kg, or 40kg allowances</li>
      <li>Maximum 32kg per bag</li>
      <li>Larger amounts must be split into multiple bags</li>
    </ul>
    <h4>Prohibited Items</h4>
    <ul>
      <li>Explosives and flammable materials</li>
      <li>Weapons and sharp objects</li>
      <li>Liquids over 100ml in cabin (in checked bag is okay)</li>
      <li>Power banks over 100Wh</li>
    </ul>
    <h4>Special Items</h4>
    <ul>
      <li>Sports equipment: Additional fees apply</li>
      <li>Musical instruments: Can be carried in cabin if fits overhead bin</li>
      <li>Medical equipment: Contact us 48 hours before travel</li>
    </ul>`,
    lastUpdated: '2025-11-08',
    readTime: '5 min',
    relatedArticles: [5, 6]
  },
  {
    id: 5,
    title: 'Airport Check-in and Boarding Process',
    category: 'Airport & Check-in',
    content: `<h3>What to Expect at the Airport</h3>
    <h4>Before You Arrive</h4>
    <ul>
      <li>Complete online check-in 48 hours before departure</li>
      <li>Download or print your boarding pass</li>
      <li>Prepare travel documents</li>
    </ul>
    <h4>At the Airport</h4>
    <ol>
      <li><strong>Check-in Counter:</strong> If you have checked baggage, proceed to designated counters
        <ul>
          <li>Domestic: 2 hours before departure</li>
          <li>International: 3 hours before departure</li>
        </ul>
      </li>
      <li><strong>Security Screening:</strong> Remove electronics and liquids for screening</li>
      <li><strong>Immigration (International):</strong> Present passport and boarding pass</li>
      <li><strong>Boarding Gate:</strong> Arrive 45 minutes before departure</li>
    </ol>
    <h4>Boarding Process</h4>
    <ul>
      <li>Priority boarding: Business class, families with infants</li>
      <li>General boarding: By zone or row number</li>
      <li>Final call: 15 minutes before departure</li>
    </ul>`,
    lastUpdated: '2025-11-14',
    readTime: '4 min',
    relatedArticles: [3, 6]
  },
  {
    id: 6,
    title: 'Travel Document Requirements',
    category: 'Travel Requirements',
    content: `<h3>Required Documents for Travel</h3>
    <h4>Domestic Flights (Within Philippines)</h4>
    <ul>
      <li>Valid government-issued ID with photo</li>
      <li>Accepted IDs: Passport, Driver's License, UMID, Postal ID, PRC ID</li>
      <li>Students: School ID with parent's valid ID</li>
      <li>Minors: Birth certificate + parent's valid ID</li>
    </ul>
    <h4>International Flights</h4>
    <ul>
      <li><strong>Passport:</strong> Valid for at least 6 months</li>
      <li><strong>Visa:</strong> Check requirements for destination country</li>
      <li><strong>Return Ticket:</strong> Proof of onward travel</li>
      <li><strong>Travel Authorization:</strong> For minors traveling alone or with one parent</li>
    </ul>
    <h4>COVID-19 Requirements</h4>
    <p>Requirements vary by destination. Check latest travel advisories before booking.</p>`,
    lastUpdated: '2025-11-16',
    readTime: '3 min',
    relatedArticles: [5, 7]
  }
]

// Chat Bot Responses
export interface ChatBotResponse {
  keywords: string[]
  response: string
  quickReplies?: string[]
}

export const chatBotResponses: ChatBotResponse[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'start'],
    response: 'Hello! 👋 Welcome to SunSkies Air support. How can I help you today?',
    quickReplies: ['Book a flight', 'Manage booking', 'Check flight status', 'Baggage info']
  },
  {
    keywords: ['book', 'booking', 'reserve', 'ticket'],
    response: 'To book a flight, simply go to our homepage and enter your travel details. Need help with a specific step?',
    quickReplies: ['How to search flights?', 'Payment methods', 'I have a booking issue']
  },
  {
    keywords: ['manage', 'change', 'modify', 'edit'],
    response: 'You can manage your booking online! Go to "Manage Booking" and enter your PNR and last name. What would you like to change?',
    quickReplies: ['Change flight date', 'Add baggage', 'Select seat', 'Cancel booking']
  },
  {
    keywords: ['baggage', 'luggage', 'bag', 'weight'],
    response: 'Cabin baggage allowance is 7kg. Checked baggage can be purchased (20kg, 32kg, or 40kg). Would you like more details?',
    quickReplies: ['Prohibited items', 'Add baggage', 'Special items', 'Baggage fees']
  },
  {
    keywords: ['check-in', 'checkin', 'boarding', 'pass'],
    response: 'Online check-in opens 48 hours before departure. You can check-in on our website or mobile app. Need help?',
    quickReplies: ['How to check-in?', 'Print boarding pass', 'Airport arrival time']
  },
  {
    keywords: ['payment', 'pay', 'card', 'gcash', 'paymaya'],
    response: 'We accept credit/debit cards, GCash, PayMaya, GrabPay, online banking, and over-the-counter payments. What payment method do you prefer?',
    quickReplies: ['Payment failed', 'Refund status', 'Payment options']
  },
  {
    keywords: ['refund', 'cancel', 'cancellation'],
    response: 'Refund eligibility depends on your fare type. Refundable tickets get 100% refund, while non-refundable tickets may only receive taxes. Process takes 7-14 days.',
    quickReplies: ['How to cancel?', 'Refund policy', 'Contact support']
  },
  {
    keywords: ['flight', 'status', 'delayed', 'schedule'],
    response: 'You can check real-time flight status on our "Flight Status" page. Enter your flight number or route to see updates.',
    quickReplies: ['Check flight status', 'Delayed flight policy', 'Flight changes']
  },
  {
    keywords: ['contact', 'support', 'help', 'agent'],
    response: 'For urgent matters, call our 24/7 hotline: +63-2-8888-8888. Email: support@sunskiesair.com. Or use the contact form to send us a message!',
    quickReplies: ['Contact form', 'Call hotline', 'Email support']
  },
  {
    keywords: ['thanks', 'thank you', 'great', 'perfect'],
    response: 'You\'re welcome! Is there anything else I can help you with today? 😊',
    quickReplies: ['No, that\'s all', 'Yes, another question']
  }
]

// Default fallback response
export const defaultChatResponse: ChatBotResponse = {
  keywords: [],
  response: 'I\'m not sure I understand. Could you try rephrasing your question? Or choose from these common topics:',
  quickReplies: ['Book a flight', 'Manage booking', 'Check-in help', 'Contact support']
}