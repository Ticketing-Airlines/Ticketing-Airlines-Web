<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Printer, Mail, ArrowLeft, CheckCircle2 } from 'lucide-vue-next'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import BoardingPass from '@/components/BoardingPass.vue'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const route = useRoute()
const router = useRouter()

// Boarding pass data (in real app, fetch from API)
const boardingPassData = ref({
  bookingReference: route.params.pnr as string || 'ABC123',
  passengerName: route.query.name as string || 'JOHN DOE',
  from: route.query.from as string || 'MNL',
  to: route.query.to as string || 'CEB',
  flightNumber: route.query.flight as string || 'SS-101',
  date: route.query.date as string || '2025-12-01',
  boardingTime: route.query.boarding as string || '10:30 AM',
  gate: route.query.gate as string || 'G5',
  seat: route.query.seat as string || '12A',
  travelClass: route.query.class as string || 'Economy'
})

const isDownloading = ref(false)
const emailSent = ref(false)

// Print boarding pass
const printBoardingPass = () => {
  window.print()
}

// Download as PDF
const downloadPDF = async () => {
  try {
    isDownloading.value = true
    
    const boardingPassElement = document.getElementById('boarding-pass-container')
    if (!boardingPassElement) return

    // Convert boarding pass to canvas
    const canvas = await html2canvas(boardingPassElement, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false
    })

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    const imgWidth = 210 // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    const imgData = canvas.toDataURL('image/png')
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)

    // Download
    pdf.save(`BoardingPass_${boardingPassData.value.bookingReference}.pdf`)
  } catch (error) {
    console.error('PDF generation failed:', error)
    alert('Failed to generate PDF. Please try again.')
  } finally {
    isDownloading.value = false
  }
}

// Email boarding pass (simulated)
const emailBoardingPass = () => {
  // In real app, send to backend API
  console.log('Email boarding pass to:', boardingPassData.value.passengerName)
  emailSent.value = true
  setTimeout(() => {
    emailSent.value = false
  }, 3000)
}

// Navigate back
const goBack = () => {
  router.push('/my-bookings')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <NavigationBar />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 print:py-0">
      <!-- Header - Hide on print -->
      <div class="mb-8 print:hidden">
        <Button
          @click="goBack"
          variant="outline"
          class="border-4 border-gray-900 rounded-none font-black uppercase mb-6"
        >
          <ArrowLeft class="w-4 h-4 mr-2" />
          Back to My Bookings
        </Button>

        <h1 class="text-4xl font-black text-gray-900 mb-2 uppercase">Your Boarding Pass</h1>
        <p class="text-lg font-bold text-gray-600">
          Booking Reference: <span class="text-blue-600">{{ boardingPassData.bookingReference }}</span>
        </p>
      </div>

      <!-- Actions Bar - Hide on print -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 print:hidden">
        <Button
          @click="downloadPDF"
          :disabled="isDownloading"
          class="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase py-6 rounded-none"
        >
          <Download class="w-5 h-5 mr-2" />
          {{ isDownloading ? 'Generating PDF...' : 'Download PDF' }}
        </Button>

        <Button
          @click="printBoardingPass"
          class="bg-gray-900 hover:bg-gray-800 text-white font-black uppercase py-6 rounded-none"
        >
          <Printer class="w-5 h-5 mr-2" />
          Print Boarding Pass
        </Button>

        <Button
          @click="emailBoardingPass"
          variant="outline"
          class="border-4 border-gray-900 font-black uppercase py-6 rounded-none hover:bg-gray-100"
        >
          <Mail class="w-5 h-5 mr-2" />
          Email to Me
        </Button>
      </div>

      <!-- Success Message - Hide on print -->
      <div v-if="emailSent" class="mb-6 bg-green-50 border-4 border-green-600 p-6 print:hidden">
        <div class="flex items-center gap-3">
          <CheckCircle2 class="w-6 h-6 text-green-600" />
          <div>
            <h4 class="font-black text-green-900 uppercase">Email Sent!</h4>
            <p class="font-bold text-green-700">Your boarding pass has been sent to your email.</p>
          </div>
        </div>
      </div>

      <!-- Boarding Pass Component -->
      <div id="boarding-pass-container">
        <BoardingPass
          :bookingReference="boardingPassData.bookingReference"
          :passengerName="boardingPassData.passengerName"
          :from="boardingPassData.from"
          :to="boardingPassData.to"
          :flightNumber="boardingPassData.flightNumber"
          :date="boardingPassData.date"
          :boardingTime="boardingPassData.boardingTime"
          :gate="boardingPassData.gate"
          :seat="boardingPassData.seat"
          :travelClass="boardingPassData.travelClass"
        />
      </div>

      <!-- Travel Tips - Hide on print -->
      <Card class="border-4 border-gray-900 rounded-none mt-8 print:hidden">
        <CardContent class="p-8">
          <h3 class="text-xl font-black text-gray-900 mb-4 uppercase">Travel Reminders</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex gap-3">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-black">
                1
              </div>
              <div>
                <h4 class="font-black text-gray-900 mb-1">Arrive Early</h4>
                <p class="text-sm font-bold text-gray-600">
                  Be at the gate <strong>{{ boardingPassData.boardingTime }}</strong> for boarding
                </p>
              </div>
            </div>
            <div class="flex gap-3">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-black">
                2
              </div>
              <div>
                <h4 class="font-black text-gray-900 mb-1">Bring Valid ID</h4>
                <p class="text-sm font-bold text-gray-600">
                  Government-issued ID matching your boarding pass name
                </p>
              </div>
            </div>
            <div class="flex gap-3">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-black">
                3
              </div>
              <div>
                <h4 class="font-black text-gray-900 mb-1">Check Baggage Limits</h4>
                <p class="text-sm font-bold text-gray-600">
                  Review your baggage allowance before arriving at the airport
                </p>
              </div>
            </div>
            <div class="flex gap-3">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-black">
                4
              </div>
              <div>
                <h4 class="font-black text-gray-900 mb-1">Mobile/Printed Pass</h4>
                <p class="text-sm font-bold text-gray-600">
                  Have either a mobile or printed boarding pass ready
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <AppFooter class="print:hidden" />
  </div>
</template>

<style scoped>
@media print {
  /* Hide everything except boarding pass */
  body * {
    visibility: hidden;
  }
  
  #boarding-pass-container,
  #boarding-pass-container * {
    visibility: visible;
  }
  
  #boarding-pass-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }

  /* Remove page margins */
  @page {
    margin: 10mm;
  }
}
</style>
