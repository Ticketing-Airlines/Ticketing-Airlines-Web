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
    // Travel Info routes
    // {
    //   path: '/baggage-information',
    //   name: 'BaggageInformation',
    //   component: () => import('@/views/BaggageInfoView.vue')
    // },
    // {
    //   path: '/payment-options',
    //   name: 'PaymentOptions',
    //   component: () => import('@/views/PaymentOptionsView.vue')
    // },
    // {
    //   path: '/travel-advisories',
    //   name: 'TravelAdvisories',
    //   component: () => import('@/views/TravelAdvisoriesView.vue')
    // },
    // {
    //   path: '/travel-documents',
    //   name: 'TravelDocuments',
    //   component: () => import('@/views/TravelDocumentsView.vue')
    // },
    // // Explore routes
    // {
    //   path: '/philippine-destinations',
    //   name: 'PhilippineDestinations',
    //   component: () => import('@/views/PhilippineDestinationsView.vue')
    // },
    // {
    //   path: '/international-destinations',
    //   name: 'InternationalDestinations',
    //   component: () => import('@/views/InternationalDestinationsView.vue')
    // },
  ],
})

export default router
