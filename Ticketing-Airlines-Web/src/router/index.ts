import { createRouter, createWebHistory } from 'vue-router'
import { useAdminStore } from '@/stores/adminStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top when navigating to a new route
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
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
    // Admin routes
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: () => import('@/views/AdminLoginView.vue'),
      meta: { isAdminAuth: true }
    },
    {
      path: '/admin',
      component: () => import('@/components/layout/AdminLayout.vue'),
      meta: { requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'AdminDashboard',
          component: () => import('@/admin/AdminDashboard.vue'),
        },
        {
          path: 'flights',
          name: 'AdminFlights',
          component: () => import('@/admin/FlightsManager.vue'),
        },
        {
          path: 'users',
          name: 'AdminUsers',
          component: () => import('@/admin/UsersManager.vue'),
        },
        {
          path: 'bookings',
          name: 'AdminBookings',
          component: () => import('@/admin/BookingsManager.vue'),
        },
        {
          path: 'inventory',
          name: 'AdminInventory',
          component: () => import('@/admin/InventoryManager.vue'),
        },
      ],
    },
    {
      path: '/access-denied',
      name: 'AccessDenied',
      component: () => import('@/views/AccessDenied.vue'),
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
      path: '/boarding-pass/:pnr',
      name: 'BoardingPass',
      component: () => import('@/views/BoardingPassView.vue')
    },
    {
      path: '/support',
      name: 'Support',
      component: () => import('@/views/SupportView.vue')
    },
    // 404 - Must be last
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue')
    }
  ],
})

// Navigation guard for admin routes
router.beforeEach((to, _from, next) => {
  const adminStore = useAdminStore()

  // Check if route requires admin authentication
  if (to.meta.requiresAdmin) {
    if (adminStore.isAuthenticated) {
      next()
    } else {
      // Redirect to admin login if not authenticated
      next('/admin/login')
    }
  }
  // If admin is already authenticated and trying to access login page
  else if (to.meta.isAdminAuth && adminStore.isAuthenticated) {
    // Redirect to admin dashboard
    next('/admin')
  }
  // Otherwise proceed normally
  else {
    next()
  }
})

export default router
