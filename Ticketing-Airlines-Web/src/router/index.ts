import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: () => import('@/views/LandingView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
    },
    // Book routes
    {
      path: '/flights',
      name: 'Flights',
      component: () => import('../views/FlightsView.vue')
    },
    {
      path: '/booking',
      name: 'Booking',
      component: () => import('../views/BookingView.vue')
    },
    {
      path: '/booking-confirmation',
      name: 'BookingConfirmation',
      component: () => import('@/views/BookingConfirmationView.vue')
    },
    {
      path: '/seat-sale',
      name: 'SeatSale',
      component: () => import('../views/SeatSaleView.vue')
    },
    // Manage routes
    {
      path: '/check-in',
      name: 'CheckIn',
      component: () => import('../views/CheckInView.vue')
    },
    {
      path: '/manage-booking',
      name: 'ManageBooking',
      component: () => import('../views/ManageBookingView.vue')
    },
    {
      path: '/flight-status',
      name: 'FlightStatus',
      component: () => import('@/views/FlightStatusView.vue')
    },
    {
      path: '/baggage-information',
      name: 'BaggageInformation',
      component: () => import('@/views/BaggageInfoView.vue')
    },
    {
      path: '/payment-options',
      name: 'PaymentOptions',
      component: () => import('@/views/PaymentOptionsView.vue')
    },
    {
      path: '/travel-advisories',
      name: 'TravelAdvisories',
      component: () => import('@/views/TravelAdvisoriesView.vue')
    },
    {
      path: '/travel-documents',
      name: 'TravelDocuments',
      component: () => import('@/views/TravelDocumentsView.vue')
    },
    {
      path: '/philippine-destinations',
      name: 'PhilippineDestinations',
      component: () => import('@/views/PhilippinesDestinationsView.vue')
    },
    {
      path: '/international-destinations',
      name: 'InternationalDestinations',
      component: () => import('@/views/InternationalDestinationsView.vue')
    },
    // New Routes
    {
      path: '/profile',
      name: 'UserProfile',
      component: () => import('@/views/UserProfileView.vue')
    },
    {
      path: '/my-bookings',
      name: 'MyBookings',
      component: () => import('@/views/MyBookingsView.vue')
    },
    {
      path: '/support',
      name: 'Support',
      component: () => import('@/views/SupportView.vue')
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: () => import('@/views/AdminDashboardView.vue')
    },
    // 404 - Must be last
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue')
    }
  ],
})

export default router
