<script setup lang="ts">
import { ref, computed } from 'vue'

interface Seat {
  row: number
  col: string
  type: 'standard' | 'exit' | 'extra' | 'reserved'
  status: 'available' | 'occupied' | 'selected'
  price?: number
}

const props = defineProps<{
  maxRows?: number
  seatsPerRow?: number
}>()

const emit = defineEmits<{
  'seat-selected': [seat: Seat]
  'seat-deselected': [seat: Seat]
}>()

const maxRows = props.maxRows || 30
const seatsPerRow = props.seatsPerRow || 6
const cols = ['A', 'B', 'C', 'D', 'E', 'F']

// Generate seat map
const seats = ref<Seat[][]>([])

// Initialize seats
for (let row = 1; row <= maxRows; row++) {
  const rowSeats: Seat[] = []
  for (let colIndex = 0; colIndex < seatsPerRow; colIndex++) {
    const col = cols[colIndex]
    const isExit = row === 12 || row === 25
    const isExtra = row >= 1 && row <= 5
    
    // Random occupied seats for demo
    const isOccupied = Math.random() > 0.7

    rowSeats.push({
      row,
      col,
      type: isExit ? 'exit' : isExtra ? 'extra' : 'standard',
      status: isOccupied ? 'occupied' : 'available',
      price: isExit ? 500 : isExtra ? 300 : 0
    })
  }
  seats.value.push(rowSeats)
}

const selectedSeat = ref<Seat | null>(null)

const toggleSeat = (seat: Seat) => {
  if (seat.status === 'occupied') return

  if (selectedSeat.value?.row === seat.row && selectedSeat.value?.col === seat.col) {
    seat.status = 'available'
    emit('seat-deselected', seat)
    selectedSeat.value = null
  } else {
    if (selectedSeat.value) {
      const prevSeat = seats.value[selectedSeat.value.row - 1].find(
        s => s.col === selectedSeat.value!.col
      )
      if (prevSeat) prevSeat.status = 'available'
    }
    
    seat.status = 'selected'
    selectedSeat.value = seat
    emit('seat-selected', seat)
  }
}

const getSeatClass = (seat: Seat) => {
  const base = 'w-10 h-10 border-2 font-black text-xs flex items-center justify-center cursor-pointer transition-all transform hover:scale-110'
  
  if (seat.status === 'occupied') {
    return `${base} bg-gray-400 border-gray-600 text-gray-600 cursor-not-allowed opacity-50`
  }
  
  if (seat.status === 'selected') {
    return `${base} bg-green-600 border-green-800 text-white scale-110 shadow-lg`
  }
  
  if (seat.type === 'exit') {
    return `${base} bg-blue-100 border-blue-600 text-blue-900 hover:bg-blue-200`
  }
  
  if (seat.type === 'extra') {
    return `${base} bg-purple-100 border-purple-600 text-purple-900 hover:bg-purple-200`
  }
  
  return `${base} bg-white border-gray-900 text-gray-900 hover:bg-gray-100`
}
</script>

<template>
  <div class="bg-white border-4 border-gray-900 p-8">
    <!-- Legend -->
    <div class="mb-8 flex flex-wrap gap-6 justify-center">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-white border-2 border-gray-900"></div>
        <span class="font-bold text-xs uppercase">Available</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-gray-400 border-2 border-gray-600"></div>
        <span class="font-bold text-xs uppercase">Occupied</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-green-600 border-2 border-green-800"></div>
        <span class="font-bold text-xs uppercase">Selected</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-100 border-2 border-blue-600"></div>
        <span class="font-bold text-xs uppercase">Exit Row (+₱500)</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-purple-100 border-2 border-purple-600"></div>
        <span class="font-bold text-xs uppercase">Extra Legroom (+₱300)</span>
      </div>
    </div>

    <!-- Plane Front -->
    <div class="mb-4 text-center">
      <div class="inline-block bg-gray-900 text-white px-6 py-2 font-black uppercase text-xs">
        ✈ Front
      </div>
    </div>

    <!-- Seat Map -->
    <div class="max-h-[600px] overflow-y-auto">
      <div class="flex flex-col gap-2">
        <div v-for="(row, rowIndex) in seats" :key="rowIndex" class="flex items-center gap-2 justify-center">
          <!-- Row Number -->
          <div class="w-8 text-center font-black text-gray-900">{{ row[0].row }}</div>
          
          <!-- Left Side Seats (A, B, C) -->
          <div class="flex gap-1">
            <button
              v-for="seat in row.slice(0, 3)"
              :key="`${seat.row}-${seat.col}`"
              :class="getSeatClass(seat)"
              @click="toggleSeat(seat)"
              :disabled="seat.status === 'occupied'"
            >
              {{ seat.col }}
            </button>
          </div>

          <!-- Aisle -->
          <div class="w-8 border-l-2 border-r-2 border-dashed border-gray-300 h-10 flex items-center justify-center">
            <div class="text-gray-400 text-xs font-bold">║</div>
          </div>

          <!-- Right Side Seats (D, E, F) -->
          <div class="flex gap-1">
            <button
              v-for="seat in row.slice(3, 6)"
              :key="`${seat.row}-${seat.col}`"
              :class="getSeatClass(seat)"
              @click="toggleSeat(seat)"
              :disabled="seat.status === 'occupied'"
            >
              {{ seat.col }}
            </button>
          </div>

          <!-- Row Number -->
          <div class="w-8 text-center font-black text-gray-900">{{ row[0].row }}</div>
        </div>
      </div>
    </div>

    <!-- Plane Back -->
    <div class="mt-4 text-center">
      <div class="inline-block bg-gray-900 text-white px-6 py-2 font-black uppercase text-xs">
        Back ✈
      </div>
    </div>

    <!-- Selected Seat Info -->
    <div v-if="selectedSeat" class="mt-8 bg-green-50 border-4 border-green-600 p-6">
      <div class="flex justify-between items-center">
        <div>
          <div class="text-xs text-green-700 font-bold uppercase tracking-widest mb-1">Selected Seat</div>
          <div class="text-3xl font-black text-green-900">{{ selectedSeat.row }}{{ selectedSeat.col }}</div>
          <div class="text-sm text-green-700 font-bold uppercase mt-1">
            {{ selectedSeat.type }} Seat
          </div>
        </div>
        <div v-if="selectedSeat.price" class="text-right">
          <div class="text-xs text-green-700 font-bold uppercase tracking-widest mb-1">Additional Fee</div>
          <div class="text-3xl font-black text-green-900">₱{{ selectedSeat.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
