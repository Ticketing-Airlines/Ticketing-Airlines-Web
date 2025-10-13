import type { 
  FlightSearchParams, 
  FlightSearchResult, 
  RoundTripResult, 
  MultiCityResult, 
  FlightSearchResponse,
  Airport
} from '@/interfaces/interfaces'
import { 
  flightInstances, 
  flightSchedules, 
  airports, 
  aircrafts, 
  airlines, 
  fareBuckets 
} from '@/data/mockData'

export class FlightSearchService {
  private static instance: FlightSearchService

  public static getInstance(): FlightSearchService {
    if (!FlightSearchService.instance) {
      FlightSearchService.instance = new FlightSearchService()
    }
    return FlightSearchService.instance
  }

  public searchFlights(params: FlightSearchParams): FlightSearchResponse {
    const { from, to, departureDate, returnDate, passengers, tripType } = params

    if (!departureDate) {
      return {
        results: [],
        totalResults: 0,
        searchParams: params
      }
    }

    const searchDate = departureDate.toISOString().split('T')[0]
    const returnSearchDate = returnDate ? returnDate.toISOString().split('T')[0] : null

    // Find origin and destination airports
    const originAirport = airports.find(airport => airport.iataCode === from)
    const destinationAirport = airports.find(airport => airport.iataCode === to)

    if (!originAirport || !destinationAirport) {
      return {
        results: [],
        totalResults: 0,
        searchParams: params
      }
    }

    switch (tripType) {
      case 'one-way':
        return this.searchOneWay(originAirport, destinationAirport, searchDate, passengers)
      case 'round-trip':
        return this.searchRoundTrip(originAirport, destinationAirport, searchDate, returnSearchDate, passengers)
      case 'multi-city':
        return this.searchMultiCity(originAirport, destinationAirport, searchDate, passengers)
      default:
        return {
          results: [],
          totalResults: 0,
          searchParams: params
        }
    }
  }

  private searchOneWay(
    origin: Airport, 
    destination: Airport, 
    date: string, 
    passengers: number
  ): FlightSearchResponse {
    const results = this.findFlights(origin, destination, date, passengers)
    
    return {
      results,
      totalResults: results.length,
      searchParams: {
        from: origin.iataCode,
        to: destination.iataCode,
        departureDate: new Date(date),
        returnDate: null,
        passengers,
        tripType: 'one-way'
      }
    }
  }

  private searchRoundTrip(
    origin: Airport, 
    destination: Airport, 
    departureDate: string, 
    returnDate: string | null, 
    passengers: number
  ): FlightSearchResponse {
    const outboundFlights = this.findFlights(origin, destination, departureDate, passengers)
    
    if (!returnDate) {
      return {
        results: outboundFlights,
        totalResults: outboundFlights.length,
        searchParams: {
          from: origin.iataCode,
          to: destination.iataCode,
          departureDate: new Date(departureDate),
          returnDate: null,
          passengers,
          tripType: 'round-trip'
        }
      }
    }

    const returnFlights = this.findFlights(destination, origin, returnDate, passengers)
    
    // Create round trip combinations
    const roundTripResults: RoundTripResult[] = []
    
    outboundFlights.forEach(outbound => {
      returnFlights.forEach(returnFlight => {
        roundTripResults.push({
          outbound,
          return: returnFlight,
          totalPrice: outbound.price + returnFlight.price,
          currency: outbound.currency
        })
      })
    })

    return {
      results: roundTripResults,
      totalResults: roundTripResults.length,
      searchParams: {
        from: origin.iataCode,
        to: destination.iataCode,
        departureDate: new Date(departureDate),
        returnDate: new Date(returnDate),
        passengers,
        tripType: 'round-trip'
      }
    }
  }

  private searchMultiCity(
    origin: Airport, 
    destination: Airport, 
    date: string, 
    passengers: number
  ): FlightSearchResponse {
    // For multi-city, we'll simulate a complex itinerary
    const outboundFlights = this.findFlights(origin, destination, date, passengers)
    
    // Add a stopover flight (simplified multi-city)
    const stopoverDate = new Date(date)
    stopoverDate.setDate(stopoverDate.getDate() + 2)
    const stopoverFlights = this.findFlights(destination, origin, stopoverDate.toISOString().split('T')[0], passengers)
    
    const multiCityResults: MultiCityResult[] = []
    
    outboundFlights.forEach(outbound => {
      stopoverFlights.forEach(returnFlight => {
        multiCityResults.push({
          segments: [outbound, returnFlight],
          totalPrice: outbound.price + returnFlight.price,
          currency: outbound.currency
        })
      })
    })

    return {
      results: multiCityResults,
      totalResults: multiCityResults.length,
      searchParams: {
        from: origin.iataCode,
        to: destination.iataCode,
        departureDate: new Date(date),
        returnDate: null,
        passengers,
        tripType: 'multi-city'
      }
    }
  }

  private findFlights(
    origin: Airport, 
    destination: Airport, 
    date: string, 
    passengers: number
  ): FlightSearchResult[] {
    const results: FlightSearchResult[] = []

    // Find flight schedules for this route
    const schedules = flightSchedules.filter(schedule => 
      schedule.originAirportId === origin.airportId && 
      schedule.destinationAirportId === destination.airportId
    )

    // Find flight instances for the given date
    const instances = flightInstances.filter(instance => 
      instance.flightDate === date && 
      schedules.some(schedule => schedule.flightScheduleId === instance.flightScheduleId)
    )

    instances.forEach(instance => {
      const schedule = schedules.find(s => s.flightScheduleId === instance.flightScheduleId)!
      const aircraft = aircrafts.find(a => a.aircraftId === schedule.aircraftId)!
      const airline = airlines.find(a => a.airlineId === schedule.operatingAirlineId)!
      
      // Find available fare buckets
      const availableFares = fareBuckets.filter(fare => 
        fare.flightInstanceId === instance.flightInstanceId && 
        (fare.total - fare.held - fare.sold) >= passengers
      )

      availableFares.forEach(fare => {
        const departureTime = this.formatTime(schedule.stdLocal)
        const arrivalTime = this.formatTime(schedule.staLocal)
        const duration = this.calculateDuration(schedule.stdLocal, schedule.staLocal)

        results.push({
          flightInstanceId: instance.flightInstanceId,
          flightNumber: schedule.flightNumber,
          originAirport: origin,
          destinationAirport: destination,
          departureTime,
          arrivalTime,
          duration,
          price: fare.price,
          currency: fare.currency,
          fareCode: fare.code,
          availableSeats: fare.total - fare.held - fare.sold,
          aircraft,
          airline
        })
      })
    })

    // Sort by price (lowest first)
    return results.sort((a, b) => a.price - b.price)
  }

  private formatTime(timeString: string): string {
    return timeString
  }

  private calculateDuration(departure: string, arrival: string): string {
    const depTime = new Date(`2000-01-01T${departure}:00`)
    const arrTime = new Date(`2000-01-01T${arrival}:00`)
    
    // Handle overnight flights
    if (arrTime < depTime) {
      arrTime.setDate(arrTime.getDate() + 1)
    }
    
    const diffMs = arrTime.getTime() - depTime.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${diffHours}h ${diffMinutes}m`
  }
}

export const flightSearchService = FlightSearchService.getInstance()
