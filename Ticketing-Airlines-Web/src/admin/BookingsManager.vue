<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Ticket,
  Search,
  Eye,
  X,
  User,
  Mail,
  Phone,
  CreditCard,
  Plane,
  Calendar
} from 'lucide-vue-next'
import { bookings, tickets, payments, bookingPassengers, passengers, flightInstances, airports } from '@/data/mockData'
import type { Booking, BookingStatus, Ticket as TicketType, Payment, Passenger } from '@/interfaces/interfaces'

const searchQuery = ref('')
const selectedStatus = ref<BookingStatus | 'All'>('All')
const isDetailsModalOpen = ref(false)
const selectedBooking = ref<Booking | null>(null)

const bookingStatuses: BookingStatus[] = ['Pending', 'Paid', 'Ticketed', 'Cancelled', 'Refunded']

const getBookingTickets = (bookingId: number): TicketType[] => {
  return tickets.filter((t) => t.bookingId === bookingId)
}

const getBookingPayments = (bookingId: number): Payment[] => {
  return payments.filter((p) => p.bookingId === bookingId)
}

const getBookingPassengers = (bookingId: number): Passenger[] => {
  const bookingPassengerIds = bookingPassengers
    .filter((bp) => bp.bookingId === bookingId)
    .map((bp) => bp.passengerId)
  return passengers.filter((p) => bookingPassengerIds.includes(p.passengerId))
}

const filteredBookings = computed(() => {
  let filtered = bookings

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (booking) =>
        booking.pnrCode.toLowerCase().includes(query) ||
        booking.contactEmail.toLowerCase().includes(query) ||
        booking.contactPhone?.toLowerCase().includes(query)
    )
  }

  if (selectedStatus.value !== 'All') {
    filtered = filtered.filter((booking) => booking.bookingStatus === selectedStatus.value)
  }

  return filtered
})

const openDetailsModal = (booking: Booking) => {
  selectedBooking.value = booking
  isDetailsModalOpen.value = true
}

const closeModal = () => {
  isDetailsModalOpen.value = false
  selectedBooking.value = null
}

const getStatusColor = (status: BookingStatus | string) => {
  const colors: Record<string, string> = {
    Paid: 'text-green-600 bg-green-50',
    Ticketed: 'text-green-700 bg-green-100',
    Pending: 'text-yellow-600 bg-yellow-50',
    Cancelled: 'text-red-600 bg-red-50',
    Refunded: 'text-gray-600 bg-gray-50',
    Authorized: 'text-blue-600 bg-blue-50',
    Captured: 'text-green-600 bg-green-50',
    Failed: 'text-red-600 bg-red-50',
    Issued: 'text-green-600 bg-green-50',
    Void: 'text-gray-600 bg-gray-50'
  }
  return colors[status] || 'text-gray-600 bg-gray-50'
}

const getFlightInfo = (flightInstanceId: number) => {
  return flightInstances.find((f) => f.flightInstanceId === flightInstanceId)
}

const getAirportInfo = (airportId: number) => {
  return airports.find((a) => a.airportId === airportId)
}

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Bookings & Tickets Management</h1>
      <p class="mt-2 text-sm text-gray-600">
        Search and view all bookings, tickets, passenger details, and payment status
      </p>
    </div>

    <!-- Filters -->
    <Card>
      <CardContent class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              v-model="searchQuery"
              placeholder="Search by PNR, email, or phone..."
              class="pl-10"
            />
          </div>
          <Select v-model="selectedStatus">
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem v-for="status in bookingStatuses" :key="status" :value="status">
                {{ status }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>

    <!-- Bookings Table -->
    <Card>
      <CardContent class="p-0">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PNR
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Passengers
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="booking in filteredBookings" :key="booking.bookingId" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <Ticket class="w-4 h-4 text-purple-600 mr-2" />
                    <span class="text-sm font-medium text-gray-900">{{ booking.pnrCode }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">{{ booking.contactEmail }}</div>
                  <div class="text-xs text-gray-500 mt-1">{{ booking.contactPhone }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-gray-900">
                    ₱{{ booking.totalAmount.toLocaleString() }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      getStatusColor(booking.bookingStatus)
                    ]"
                  >
                    {{ booking.bookingStatus }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ new Date(booking.bookingDate).toLocaleDateString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ getBookingPassengers(booking.bookingId).length }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="openDetailsModal(booking)"
                    class="text-blue-600 hover:text-blue-900"
                    title="View Details"
                  >
                    <Eye class="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="filteredBookings.length === 0" class="text-center py-12 text-gray-500">
            <Ticket class="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No bookings found</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Booking Details Modal -->
    <div
      v-if="isDetailsModalOpen && selectedBooking"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      @click.self="closeModal"
    >
      <Card class="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader class="flex flex-row items-center justify-between border-b">
          <div>
            <CardTitle class="text-2xl">Booking Details</CardTitle>
            <p class="text-sm text-gray-500 mt-1">PNR: {{ selectedBooking.pnrCode }}</p>
          </div>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <X class="w-6 h-6" />
          </button>
        </CardHeader>
        <CardContent class="p-6 space-y-6">
          <!-- Contact Information -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center space-x-3">
                <Mail class="w-5 h-5 text-gray-400" />
                <div>
                  <p class="text-xs text-gray-500">Email</p>
                  <p class="text-sm font-medium text-gray-900">{{ selectedBooking.contactEmail }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <Phone class="w-5 h-5 text-gray-400" />
                <div>
                  <p class="text-xs text-gray-500">Phone</p>
                  <p class="text-sm font-medium text-gray-900">{{ selectedBooking.contactPhone }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Passengers -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Passengers</h3>
            <div class="space-y-3">
              <div
                v-for="passenger in getBookingPassengers(selectedBooking.bookingId)"
                :key="passenger.passengerId"
                class="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
              >
                <User class="w-5 h-5 text-gray-400 mt-1" />
                <div class="flex-1">
                  <p class="font-medium text-gray-900">
                    {{ passenger.firstName }} {{ passenger.lastName }}
                  </p>
                  <div class="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-600">
                    <p>DOB: {{ new Date(passenger.dateOfBirth).toLocaleDateString() }}</p>
                    <p>Nationality: {{ passenger.nationality }}</p>
                    <p>Passport: {{ passenger.passportNumber }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tickets -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Tickets</h3>
            <div class="space-y-3">
              <div
                v-for="ticket in getBookingTickets(selectedBooking.bookingId)"
                :key="ticket.ticketId"
                class="p-4 border border-gray-200 rounded-lg"
              >
                <div class="flex items-center justify-between mb-3">
                  <div>
                    <p class="font-medium text-gray-900">E-Ticket: {{ ticket.eticketNumber }}</p>
                    <p class="text-xs text-gray-500">Segment {{ ticket.segmentNumber }}</p>
                  </div>
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      getStatusColor(ticket.ticketStatus)
                    ]"
                  >
                    {{ ticket.ticketStatus }}
                  </span>
                </div>
                <div
                  v-if="getFlightInfo(ticket.flightInstanceId)"
                  class="flex items-center space-x-2 text-sm text-gray-600"
                >
                  <Plane class="w-4 h-4" />
                  <span>{{ getFlightInfo(ticket.flightInstanceId)?.flightNumber }}</span>
                  <span>-</span>
                  <span>
                    {{ getAirportInfo(getFlightInfo(ticket.flightInstanceId)?.originAirportId!)?.iataCode }}
                    →
                    {{ getAirportInfo(getFlightInfo(ticket.flightInstanceId)?.destinationAirportId!)?.iataCode }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Information -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Payment Information</h3>
            <div class="space-y-3">
              <div
                v-for="payment in getBookingPayments(selectedBooking.bookingId)"
                :key="payment.paymentId"
                class="p-4 bg-gray-50 rounded-lg"
              >
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center space-x-2">
                    <CreditCard class="w-5 h-5 text-gray-400" />
                    <span class="font-medium text-gray-900">₱{{ payment.amount.toLocaleString() }}</span>
                  </div>
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      getStatusColor(payment.paymentStatus)
                    ]"
                  >
                    {{ payment.paymentStatus }}
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <p>Provider: {{ payment.paymentProvider }}</p>
                  <p>Date: {{ formatDateTime(payment.paymentDate) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Summary -->
          <div class="border-t pt-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Booking Status</p>
                <span
                  :class="[
                    'inline-flex px-3 py-1 text-sm font-semibold rounded-full mt-1',
                    getStatusColor(selectedBooking.bookingStatus)
                  ]"
                >
                  {{ selectedBooking.bookingStatus }}
                </span>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-600">Total Amount</p>
                <p class="text-2xl font-bold text-gray-900">
                  ₱{{ selectedBooking.totalAmount.toLocaleString() }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <Button variant="outline" @click="closeModal">Close</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
