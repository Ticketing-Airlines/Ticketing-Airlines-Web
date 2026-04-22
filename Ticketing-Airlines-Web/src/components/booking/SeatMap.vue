<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { X, Check } from 'lucide-vue-next'
import type { AircraftSeatConfig } from '@/data/mockData'
import { getSeatType, getSeatPrice } from '@/data/mockData'

interface Props {
  config: AircraftSeatConfig
  selectedSeats: Record<number, string> // passengerId -> seatNumber
  currentPassengerId: number
  onSeatSelect: (passengerId: number, seatNumber: string, price: number) => void
}

const props = defineProps<Props>()

const getSeatStatus = (seatNumber: string): 'available' | 'occupied' | 'selected' | 'selected-other' => {
  // Check if occupied
  if (props.config.occupiedSeats.includes(seatNumber)) {
    return 'occupied'
  }
  
  // Check if selected by current passenger
  if (props.selectedSeats[props.currentPassengerId] === seatNumber) {
    return 'selected'
  }
  
  // Check if selected by another passenger
  const isSelectedByOther = Object.entries(props.selectedSeats).some(
    ([passengerId, seat]) => seat === seatNumber && Number(passengerId) !== props.currentPassengerId
  )
  if (isSelectedByOther) {
    return 'selected-other'
  }
  
  return 'available'
}

const getSeatClass = (seatNumber: string): string[] => {
  const status = getSeatStatus(seatNumber)
  const row = parseInt(seatNumber.match(/\d+/)?.[0] || '0')
  const classes = ['seat']
  
  // Status classes
  if (status === 'available') {
    classes.push('seat-available')
  } else if (status === 'occupied') {
    classes.push('seat-occupied')
  } else if (status === 'selected') {
    classes.push('seat-selected')
  } else if (status === 'selected-other') {
    classes.push('seat-selected-other')
  }
  
  // Special seat types
  if (props.config.exitRows.includes(row)) {
    classes.push('seat-exit-row')
  } else if (props.config.premiumRows.includes(row)) {
    classes.push('seat-premium')
  } else if (props.config.extraLegroomSeats.includes(seatNumber)) {
    classes.push('seat-extra-legroom')
  }
  
  return classes
}

const handleSeatClick = (seatNumber: string) => {
  const status = getSeatStatus(seatNumber)
  if (status === 'occupied' || status === 'selected-other') {
    return // Cannot select occupied or seats selected by others
  }
  
  const price = getSeatPrice(seatNumber, props.config)
  props.onSeatSelect(props.currentPassengerId, seatNumber, price)
}

const getSeatLabel = (seatNumber: string): string => {
  const column = seatNumber.replace(/\d+/, '')
  return column
}

const rows = computed(() => {
  const result = []
  for (let i = 1; i <= props.config.totalRows; i++) {
    result.push(i)
  }
  return result
})
</script>

<template>
  <div class="seat-map-container">
    <!-- Seat Map Header -->
    <div class="bg-gray-900 px-6 py-4 mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-black text-white uppercase tracking-widest text-sm">
            {{ config.aircraftType }}
          </h3>
          <p class="text-white/70 text-xs font-bold mt-1">
            {{ config.totalRows }} Rows • {{ config.seatsPerRow.length }} Seats per Row
          </p>
        </div>
        <div class="text-right">
          <div class="text-white/70 text-xs font-bold uppercase">Capacity</div>
          <div class="text-white font-black text-lg">{{ config.totalRows * config.seatsPerRow.length }} Seats</div>
        </div>
      </div>
    </div>

    <!-- Seat Map Grid -->
    <div class="seat-map-wrapper">
      <!-- Column Headers -->
      <div class="seat-row seats-header">
        <div class="row-number"></div>
        <div
          v-for="(col, index) in config.seatsPerRow"
          :key="col"
          class="seat-column"
        >
          <div class="seat-header">{{ col }}</div>
          <!-- Aisle spacer -->
          <div v-if="config.aisleAfter.includes(index)" class="aisle-spacer"></div>
        </div>
      </div>

      <!-- Seat Rows -->
      <div
        v-for="row in rows"
        :key="row"
        class="seat-row"
        :class="{ 'exit-row-spacer': config.exitRows.includes(row) }"
      >
        <!-- Row Number -->
        <div class="row-number">
          <span class="font-black text-gray-900">{{ row }}</span>
        </div>

        <!-- Seats -->
        <div
          v-for="(col, index) in config.seatsPerRow"
          :key="col"
          class="seat-column"
        >
          <button
            :class="getSeatClass(`${row}${col}`)"
            @click="handleSeatClick(`${row}${col}`)"
            :disabled="getSeatStatus(`${row}${col}`) === 'occupied' || getSeatStatus(`${row}${col}`) === 'selected-other'"
            :title="`${row}${col} - ${getSeatType(`${row}${col}`, config)} - ₱${getSeatPrice(`${row}${col}`, config)}`"
          >
            <span class="seat-label">{{ getSeatLabel(`${row}${col}`) }}</span>
            <Check v-if="getSeatStatus(`${row}${col}`) === 'selected'" class="seat-check" />
          </button>
          
          <!-- Aisle spacer -->
          <div v-if="config.aisleAfter.includes(index)" class="aisle-spacer"></div>
        </div>
      </div>
    </div>

    <!-- Exit Row Labels -->
    <div v-for="exitRow in config.exitRows" :key="`exit-${exitRow}`" class="exit-row-label" :style="{ top: `${exitRow * 45 + 100}px` }">
      <div class="bg-green-600 text-white px-3 py-1 font-black text-xs uppercase">
        Emergency Exit Row {{ exitRow }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.seat-map-container {
  position: relative;
  background: white;
  border: 4px solid #111827;
}

.seat-map-wrapper {
  padding: 1.5rem;
  overflow-x: auto;
  max-height: 600px;
  overflow-y: auto;
}

.seats-header {
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid #111827;
}

.seat-row {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.exit-row-spacer {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.exit-row-spacer::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: -0.75rem;
  height: 2px;
  background: #16a34a;
}

.row-number {
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.seat-column {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.seat-header {
  width: 40px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.75rem;
  color: #111827;
  text-transform: uppercase;
}

.aisle-spacer {
  width: 30px;
  flex-shrink: 0;
}

.seat {
  width: 40px;
  height: 40px;
  border: 2px solid #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  font-weight: 900;
  font-size: 0.75rem;
  background: white;
}

.seat:hover:not(:disabled) {
  transform: scale(1.1);
  z-index: 5;
}

.seat:disabled {
  cursor: not-allowed;
}

.seat-label {
  position: relative;
  z-index: 1;
}

.seat-check {
  position: absolute;
  width: 1rem;
  height: 1rem;
  color: white;
  z-index: 2;
}

/* Seat Status Styles */
.seat-available {
  background: white;
  color: #111827;
}

.seat-available:hover:not(:disabled) {
  background: #dbeafe;
  border-color: #2563eb;
}

.seat-occupied {
  background: #6b7280;
  color: #d1d5db;
  border-color: #374151;
}

.seat-selected {
  background: #2563eb;
  color: white;
  border-color: #1e40af;
}

.seat-selected-other {
  background: #fbbf24;
  color: #78350f;
  border-color: #f59e0b;
}

/* Special Seat Types */
.seat-premium {
  border-color: #eab308;
  box-shadow: 0 0 0 2px #fef08a;
}

.seat-exit-row {
  border-color: #16a34a;
  box-shadow: 0 0 0 2px #86efac;
}

.seat-extra-legroom {
  border-color: #7c3aed;
  box-shadow: 0 0 0 2px #d8b4fe;
}

.exit-row-label {
  position: absolute;
  right: -150px;
  transform: translateY(-50%);
  pointer-events: none;
}

@media (max-width: 768px) {
  .seat {
    width: 35px;
    height: 35px;
    font-size: 0.625rem;
  }
  
  .row-number {
    width: 30px;
  }
  
  .aisle-spacer {
    width: 20px;
  }
}
</style>
