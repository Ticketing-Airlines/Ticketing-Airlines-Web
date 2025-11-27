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

/** SEAT BLUEPRINT sample (few rows for brevity) */
export const seatBlueprints: SeatBlueprint[] = [
  ...['1','2','3'].flatMap(row =>
    ['A','B','C','D','E','F'].map(col => ({
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
  { id: 1, label: 'Boracay',   primaryAirportCode: 'MPH', description: 'White Beach Paradise', price: 3299, originalPrice: 4999, badge: 'HOT DEAL', savings: Math.round((1 - 3299/4999) * 100), image: boracayImg },
  { id: 2, label: 'Cebu',      primaryAirportCode: 'CEB', description: 'Queen City of the South', price: 2899, originalPrice: 3799, badge: 'POPULAR', savings: Math.round((1 - 2899/3799) * 100), image: cebuImg },
  { id: 3, label: 'Davao',     primaryAirportCode: 'DVO', description: 'City of Durian', price: 4199, originalPrice: 5499, badge: 'NEW ROUTE', savings: Math.round((1 - 4199/5499) * 100), image: davaoImg },
  { id: 4, label: 'Singapore', primaryAirportCode: 'SIN', description: 'Lion City', price: 8999, originalPrice: 12999, badge: 'INTERNATIONAL', savings: Math.round((1 - 8999/12999) * 100), image: singaporeImg },
  { id: 5, label: 'Palawan',   primaryAirportCode: 'PPS', description: 'Last Frontier', price: 5799, originalPrice: 7299, badge: 'TRENDING', savings: Math.round((1 - 5799/7299) * 100), image: palawanImg },
  { id: 6, label: 'Hong Kong', primaryAirportCode: 'HKG', description: 'Pearl of the Orient', price: 11999, originalPrice: 15999, badge: 'INTERNATIONAL', savings: Math.round((1 - 11999/15999) * 100), image: hongkongImg },
]

export const features: Feature[] = [
  { id: 1, title: 'Affordable Fares',     description: 'Competitive prices without compromising on quality and safety.', icon: 'DollarSign' },
  { id: 2, title: 'On-Time Performance',  description: 'Reliable schedules and punctual departures for your peace of mind.', icon: 'Clock' },
  { id: 3, title: 'Safety First',         description: 'Highest safety standards with modern aircraft and experienced crew.', icon: 'Shield' },
  { id: 4, title: 'Filipino Hospitality', description: 'Warm, friendly service that makes every passenger feel like family.', icon: 'Heart' },
]