import type { Destination, Airport, Feature } from '@/interfaces/interfaces'

// Mock destinations data
export const destinations: Destination[] = [
  {
    id: 1,
    name: 'Boracay',
    description: 'White Beach Paradise',
    price: 3299,
    originalPrice: 4999,
    badge: 'HOT DEAL',
    savings: 34,
    image: '/src/assets/boracay.webp'
  },
  {
    id: 2,
    name: 'Cebu',
    description: 'Queen City of the South',
    price: 2899,
    originalPrice: 3799,
    badge: 'POPULAR',
    savings: 24,
    image: '/src/assets/cebu.webp'
  },
  {
    id: 3,
    name: 'Davao',
    description: 'City of Durian',
    price: 4199,
    originalPrice: 5499,
    badge: 'NEW ROUTE',
    savings: 24,
    image: '/src/assets/davao.webp'
  },
  {
    id: 4,
    name: 'Singapore',
    description: 'Lion City',
    price: 8999,
    originalPrice: 12999,
    badge: 'INTERNATIONAL',
    savings: 31,
    image: '/src/assets/singapore.webp'
  },
  {
    id: 5,
    name: 'Palawan',
    description: 'Last Frontier',
    price: 5799,
    originalPrice: 7299,
    badge: 'TRENDING',
    savings: 21,
    image: '/src/assets/palawan.webp'
  },
  {
    id: 6,
    name: 'Hong Kong',
    description: 'Pearl of the Orient',
    price: 11999,
    originalPrice: 15999,
    badge: 'INTERNATIONAL',
    savings: 25,
    image: '/src/assets/hongkong.webp'
  }
]

// Mock airports data
export const airports: Airport[] = [
  {
    code: 'MNL',
    name: 'Ninoy Aquino International Airport',
    city: 'Manila',
    country: 'Philippines'
  },
  {
    code: 'CEB',
    name: 'Mactan-Cebu International Airport',
    city: 'Cebu',
    country: 'Philippines'
  },
  {
    code: 'DVO',
    name: 'Francisco Bangoy International Airport',
    city: 'Davao',
    country: 'Philippines'
  },
  {
    code: 'ILO',
    name: 'Iloilo International Airport',
    city: 'Iloilo',
    country: 'Philippines'
  },
  {
    code: 'BCD',
    name: 'Bacolod-Silay Airport',
    city: 'Bacolod',
    country: 'Philippines'
  },
  {
    code: 'TAC',
    name: 'Daniel Z. Romualdez Airport',
    city: 'Tacloban',
    country: 'Philippines'
  },
  {
    code: 'SIN',
    name: 'Singapore Changi Airport',
    city: 'Singapore',
    country: 'Singapore'
  },
  {
    code: 'HKG',
    name: 'Hong Kong International Airport',
    city: 'Hong Kong',
    country: 'Hong Kong'
  }
]

// Mock features data
export const features: Feature[] = [
  {
    id: 1,
    title: 'Affordable Fares',
    description: 'Competitive prices without compromising on quality and safety.',
    icon: 'DollarSign'
  },
  {
    id: 2,
    title: 'On-Time Performance',
    description: 'Reliable schedules and punctual departures for your peace of mind.',
    icon: 'Clock'
  },
  {
    id: 3,
    title: 'Safety First',
    description: 'Highest safety standards with modern aircraft and experienced crew.',
    icon: 'Shield'
  },
  {
    id: 4,
    title: 'Filipino Hospitality',
    description: 'Warm, friendly service that makes every passenger feel like family.',
    icon: 'Heart'
  }
]

// Helper functions
export const getAirportByCode = (code: string): Airport | undefined => {
  return airports.find(airport => airport.code === code)
}

export const getDestinationById = (id: number): Destination | undefined => {
  return destinations.find(destination => destination.id === id)
}

export const getPopularDestinations = (limit: number = 6): Destination[] => {
  return destinations.slice(0, limit)
}

export const searchDestinations = (query: string): Destination[] => {
  const lowercaseQuery = query.toLowerCase()
  return destinations.filter(destination => 
    destination.name.toLowerCase().includes(lowercaseQuery) ||
    destination.description.toLowerCase().includes(lowercaseQuery)
  )
}