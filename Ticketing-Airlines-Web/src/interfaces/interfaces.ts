export type Role = 'Admin' | 'Scheduler' | 'Agent' | 'Customer';
export type CabinClass = 'Economy' | 'Premium' | 'Business';
export type FlightStatus = 'Scheduled' | 'Cancelled' | 'Delayed' | 'Departed' | 'Arrived';
export type SeatStatus = 'Available' | 'Held' | 'Sold' | 'Blocked';
export type FareCode = 'Y' | 'M' | 'B';
export type BookingStatus = 'Pending' | 'Paid' | 'Ticketed' | 'Cancelled' | 'Refunded';
export type TicketStatus = 'Issued' | 'Void' | 'Refunded';
export type PaymentStatus = 'Pending' | 'Authorized' | 'Captured' | 'Failed' | 'Refunded';
export type PaxType = 'ADT' | 'CHD' | 'INF';

export interface User {
  userId: string;
  email: string;
  passwordHash?: string;
  name: string;
  phone?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UserRole {
  userId: string;
  role: Role;
}

export interface Airline {
  airlineId: number;
  name: string;
  iataCode: string;
  icaoCode?: string;
  countryIso2: string;
}

export interface Airport {
  airportId: number;
  name: string;
  city: string;
  countryIso2: string;
  iataCode: string;      // 3-letter IATA
  timezone: string;      // IANA (e.g., "Asia/Manila")
  latitude?: number;
  longitude?: number;
}

export interface Aircraft {
  aircraftId: number;
  model: string;
  icaoType: string;      // e.g., A320
  seatCapacity: number;
  airlineId: number;
}

export interface SeatBlueprint {
  seatBlueprintId: number;
  aircraftId: number;
  seatNumber: string;
  cabinClass: CabinClass;
  isExitRow?: boolean;
  isAisle?: boolean;
  isWindow?: boolean;
}

export interface FlightSchedule {
  flightScheduleId: number;
  flightNumber: string;
  originAirportId: number;
  destinationAirportId: number;
  aircraftId: number;
  operatingAirlineId: number;
  marketingAirlineId?: number;
  stdLocal: string; // "HH:mm"
  staLocal: string; // "HH:mm"
  published: boolean;
}

export interface FlightInstance {
  flightInstanceId: string;
  flightScheduleId: number;
  flightDate: string;    // YYYY-MM-DD (local date of origin)
  departureUtc: string;  // ISO instant
  arrivalUtc: string;    // ISO instant
  status: FlightStatus;
}

export interface FlightSeat {
  flightSeatId: string;
  flightInstanceId: string;
  seatNumber: string;
  cabinClass: CabinClass;
  status: SeatStatus;
}

export interface FareBucket {
  fareBucketId: string;
  flightInstanceId: string;
  code: FareCode;
  price: number;
  currency: string;
  total: number;
  held: number;
  sold: number;
}

export interface Passenger {
  passengerId: string;
  userId?: string; // nullable for guest-owned passengers
  firstName: string;
  lastName: string;
  dob?: string; // YYYY-MM-DD
  nationality?: string;
  passportNumber?: string;
}

export interface Booking {
  bookingId: string;
  pnr: string;
  bookingDate: string;
  totalAmount: number;
  currency: string;
  status: BookingStatus;
  userId?: string; // nullable (guest bookings)
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
}

export interface BookingPassenger {
  bookingPassengerId: string;
  bookingId: string;
  passengerId: string;
  paxType: PaxType;
}

export interface Ticket {
  ticketId: string;
  bookingId: string;
  bookingPassengerId: string;
  flightInstanceId: string;
  flightSeatId?: string;
  eticketNumber: string;
  segmentIndex: number;
  issueDateUtc: string;
  status: TicketStatus;
}

export interface Payment {
  paymentId: string;
  bookingId: string;
  provider: string;
  providerRef: string;
  idempotencyKey: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paidAtUtc?: string;
}

// Home/marketing UI
export interface DestinationCard {
  id: number;
  label: string;
  primaryAirportCode: string; // e.g., 'MPH'
  description: string;
  price: number;
  originalPrice: number;
  badge?: 'HOT DEAL' | 'POPULAR' | 'NEW ROUTE' | 'INTERNATIONAL' | 'TRENDING';
  savings: number;
  image: string; // imported asset path
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface FlightSearchParams {
  from: string;
  to: string;
  departureDate: Date | null;
  returnDate: Date | null;
  passengers: number;
  tripType: string;
}

export interface FlightSearchResult {
  flightInstanceId: string;
  flightNumber: string;
  originAirport: Airport;
  destinationAirport: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  fareCode: FareCode;
  availableSeats: number;
  aircraft: Aircraft;
  airline: Airline;
}

export interface RoundTripResult {
  outbound: FlightSearchResult;
  return?: FlightSearchResult;
  totalPrice: number;
  currency: string;
}

export interface MultiCityResult {
  segments: FlightSearchResult[];
  totalPrice: number;
  currency: string;
}

export interface FlightSearchResponse {
  results: FlightSearchResult[] | RoundTripResult[] | MultiCityResult[];
  totalResults: number;
  searchParams: FlightSearchParams;
}