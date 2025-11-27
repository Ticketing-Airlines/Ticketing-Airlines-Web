<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plane, User, Calendar, Clock, MapPin, Barcode } from 'lucide-vue-next'
import QRCode from 'qrcode'

interface BoardingPassProps {
  bookingReference: string
  passengerName: string
  from: string
  to: string
  flightNumber: string
  date: string
  boardingTime: string
  gate: string
  seat: string
  travelClass?: string
}

const props = defineProps<BoardingPassProps>()

// Generate real QR code
const qrCodeDataUrl = ref('')

onMounted(async () => {
  try {
    // QR code contains essential boarding information
    const qrData = `${props.bookingReference}|${props.passengerName}|${props.flightNumber}|${props.seat}|${props.gate}`
    qrCodeDataUrl.value = await QRCode.toDataURL(qrData, {
      width: 150,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })
  } catch (error) {
    console.error('QR Code generation failed:', error)
  }
  })
</script>

<template>
  <div class="bg-white max-w-3xl mx-auto">
    <!-- Main Boarding Pass -->
    <div class="border-8 border-gray-900 relative">
      <!-- Perforation Line -->
      <div class="absolute left-0 right-0 top-72 h-0 border-t-4 border-dashed border-gray-400 z-10"></div>
      
      <!-- Top Section - Main Boarding Pass -->
      <div class="p-8 pb-12 relative">
        <!-- Header -->
        <div class="flex justify-between items-start mb-8">
          <div>
            <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Boarding Pass</div>
            <div class="text-3xl font-black uppercase tracking-tight">{{ flightNumber }}</div>
          </div>
          <div class="text-right">
            <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Booking Ref</div>
            <div class="text-2xl font-black">{{ bookingReference }}</div>
          </div>
        </div>

        <!-- Route -->
        <div class="flex items-center gap-6 mb-8">
          <div class="flex-1">
            <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">From</div>
            <div class="text-6xl font-black text-gray-900">{{ from }}</div>
          </div>
          
          <Plane class="w-12 h-12 text-blue-600" />
          
          <div class="flex-1 text-right">
            <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">To</div>
            <div class="text-6xl font-black text-gray-900">{{ to }}</div>
          </div>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-4 gap-6 mb-8">
          <div>
            <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Passenger</div>
            <div class="font-black text-lg">{{ passengerName }}</div>
          </div>
          <div>
            <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Date</div>
            <div class="font-black text-lg">{{ date }}</div>
          </div>
          <div>
            <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Boarding</div>
            <div class="font-black text-lg">{{ boardingTime }}</div>
          </div>
          <div>
            <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Gate</div>
            <div class="font-black text-3xl text-blue-600">{{ gate }}</div>
          </div>
        </div>

        <!-- Seat & Class -->
        <div class="flex gap-6">
          <div class="flex-1 bg-gray-900 text-white p-6">
            <div class="text-xs font-black uppercase tracking-widest mb-2">Seat</div>
            <div class="text-5xl font-black">{{ seat }}</div>
          </div>
          <div class="flex-1 bg-blue-600 text-white p-6">
            <div class="text-xs font-black uppercase tracking-widest mb-2">Class</div>
            <div class="text-5xl font-black">{{ travelClass || 'Economy' }}</div>
          </div>
        </div>

        <!-- QR Code -->
        <div class="absolute bottom-8 right-8">
          <div class="bg-white p-2 border-4 border-gray-900">
            <img v-if="qrCodeDataUrl" :src="qrCodeDataUrl" alt="QR Code" class="w-28 h-28" />
            <div v-else class="w-24 h-24 bg-gray-200 flex items-center justify-center">
              <Barcode class="w-16 h-16 text-gray-900" />
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section - Passenger Stub -->
      <div class="p-8 pt-12 bg-gray-50 border-t-4 border-dashed border-gray-400">
        <div class="flex justify-between items-center">
          <div>
            <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Flight</div>
            <div class="text-2xl font-black">{{ flightNumber }}</div>
          </div>
          <div>
            <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Route</div>
            <div class="text-xl font-black">{{ from }} → {{ to }}</div>
          </div>
          <div>
            <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Seat</div>
            <div class="text-2xl font-black">{{ seat }}</div>
          </div>
          <div>
            <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Gate</div>
            <div class="text-2xl font-black text-blue-600">{{ gate }}</div>
          </div>
          <div>
            <div class="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Boarding</div>
            <div class="text-xl font-black">{{ boardingTime }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Important Information -->
    <div class="mt-6 border-4 border-gray-900 bg-yellow-50 p-6">
      <h4 class="font-black uppercase text-sm mb-3">⚠ Important Information</h4>
      <ul class="space-y-2 text-sm font-bold text-gray-700">
        <li>• Please arrive at the gate 30 minutes before boarding time</li>
        <li>• Keep your boarding pass and ID ready for verification</li>
        <li>• This boarding pass is valid for one person only</li>
        <li>• No refund after check-in completion</li>
      </ul>
    </div>
  </div>
</template>
