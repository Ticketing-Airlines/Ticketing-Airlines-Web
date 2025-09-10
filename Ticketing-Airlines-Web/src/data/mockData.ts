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
  Ticket, Payment, DestinationCard, Feature
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
  { airportId: 6, name: 'Singapore Changi Airport', city: 'Singapore', countryIso2: 'SG', iataCode: 'SIN', timezone: 'Asia/Singapore', latitude: 1.364, longitude: 103.991 },
  { airportId: 7, name: 'Hong Kong International Airport', city: 'Hong Kong', countryIso2: 'HK', iataCode: 'HKG', timezone: 'Asia/Hong_Kong', latitude: 22.315, longitude: 113.936 },
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
  { flightScheduleId: 101, flightNumber: 'SS101', originAirportId: 1, destinationAirportId: 4, aircraftId: 1, operatingAirlineId: 1, stdLocal: '08:00', staLocal: '09:15', published: true },
  { flightScheduleId: 201, flightNumber: 'SS201', originAirportId: 1, destinationAirportId: 5, aircraftId: 1, operatingAirlineId: 1, stdLocal: '10:30', staLocal: '11:50', published: true },
  { flightScheduleId: 901, flightNumber: 'SS901', originAirportId: 1, destinationAirportId: 6, aircraftId: 2, operatingAirlineId: 1, stdLocal: '18:10', staLocal: '21:55', published: true },
]

/** FLIGHT INSTANCES (dated flights) */
export const flightInstances: FlightInstance[] = [
  { flightInstanceId: uuid('fi-101'), flightScheduleId: 101, flightDate: '2025-09-25', departureUtc: '2025-09-25T00:00:00Z', arrivalUtc: '2025-09-25T01:15:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-201'), flightScheduleId: 201, flightDate: '2025-09-25', departureUtc: '2025-09-25T02:30:00Z', arrivalUtc: '2025-09-25T03:50:00Z', status: 'Scheduled' },
  { flightInstanceId: uuid('fi-901'), flightScheduleId: 901, flightDate: '2025-09-25', departureUtc: '2025-09-25T10:10:00Z', arrivalUtc: '2025-09-25T13:55:00Z', status: 'Scheduled' }
]

/** FLIGHT SEATS (tiny sample) */
export const flightSeats: FlightSeat[] = [
  { flightSeatId: uuid('fs'), flightInstanceId: flightInstances[0].flightInstanceId, seatNumber: '1A', cabinClass: 'Economy', status: 'Available' },
  { flightSeatId: uuid('fs'), flightInstanceId: flightInstances[0].flightInstanceId, seatNumber: '1B', cabinClass: 'Economy', status: 'Available' },
  { flightSeatId: uuid('fs'), flightInstanceId: flightInstances[0].flightInstanceId, seatNumber: '1C', cabinClass: 'Economy', status: 'Available' },
]

/** FARE BUCKETS (inventory-aware) */
export const fareBuckets: FareBucket[] = [
  { fareBucketId: uuid('fb'), flightInstanceId: flightInstances[0].flightInstanceId, code: 'Y', price: 3299, currency: 'PHP', total: 100, held: 2, sold: 30 },
  { fareBucketId: uuid('fb'), flightInstanceId: flightInstances[0].flightInstanceId, code: 'M', price: 3899, currency: 'PHP', total: 50,  held: 0, sold: 10 },
  { fareBucketId: uuid('fb'), flightInstanceId: flightInstances[0].flightInstanceId, code: 'B', price: 4599, currency: 'PHP', total: 30,  held: 0, sold: 5  },
]

/** USERS */
const adminUserId = uuid('user')
const customerUserId = uuid('user')

export const users: User[] = [
  { userId: adminUserId, email: 'admin@sunskies.example', name: 'Admin User', passwordHash: '***', createdAt: now },
  { userId: customerUserId, email: 'jane.doe@example.com', name: 'Jane Doe', createdAt: now },
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