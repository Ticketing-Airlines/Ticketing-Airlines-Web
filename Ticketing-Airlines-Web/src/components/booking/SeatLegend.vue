<script setup lang="ts">
import { Check, X } from 'lucide-vue-next'
</script>

<template>
  <div class="seat-legend">
    <h4 class="font-black text-gray-900 uppercase tracking-widest text-xs mb-4">Seat Legend</h4>
    
    <div class="legend-grid">
      <!-- Available -->
      <div class="legend-item">
        <div class="legend-seat seat-available">
          <span>A</span>
        </div>
        <span class="legend-label">Available</span>
      </div>

      <!-- Selected -->
      <div class="legend-item">
        <div class="legend-seat seat-selected">
          <Check class="w-4 h-4 text-white" />
        </div>
        <span class="legend-label">Selected</span>
      </div>

      <!-- Occupied -->
      <div class="legend-item">
        <div class="legend-seat seat-occupied">
          <span>X</span>
        </div>
        <span class="legend-label">Occupied</span>
      </div>

      <!-- Premium -->
      <div class="legend-item">
        <div class="legend-seat seat-premium">
          <span>A</span>
        </div>
        <span class="legend-label">Premium (+₱500)</span>
      </div>

      <!-- Exit Row -->
      <div class="legend-item">
        <div class="legend-seat seat-exit-row">
          <span>A</span>
        </div>
        <span class="legend-label">Exit Row (+₱800)</span>
      </div>

      <!-- Extra Legroom -->
      <div class="legend-item">
        <div class="legend-seat seat-extra-legroom">
          <span>A</span>
        </div>
        <span class="legend-label">Extra Legroom (+₱600)</span>
      </div>
    </div>

    <!-- Seat Types -->
    <div class="mt-6">
      <h5 class="font-black text-gray-900 uppercase tracking-widest text-xs mb-3">Seat Types</h5>
      <div class="text-sm space-y-2">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-gray-900"></div>
          <span class="font-bold text-gray-700">Window (A, F)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-gray-900"></div>
          <span class="font-bold text-gray-700">Aisle (C, D)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-gray-900"></div>
          <span class="font-bold text-gray-700">Middle (B, E)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.seat-legend {
  background: white;
  border: 4px solid #111827;
  padding: 1.5rem;
}

.legend-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.legend-seat {
  width: 40px;
  height: 40px;
  border: 2px solid #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.legend-label {
  font-weight: 700;
  font-size: 0.875rem;
  color: #374151;
  white-space: nowrap;
}

/* Reuse seat styles from SeatMap */
.seat-available {
  background: white;
  color: #111827;
}

.seat-selected {
  background: #2563eb;
  color: white;
  border-color: #1e40af;
}

.seat-occupied {
  background: #6b7280;
  color: #d1d5db;
  border-color: #374151;
}

.seat-premium {
  background: white;
  border-color: #eab308;
  box-shadow: 0 0 0 2px #fef08a;
}

.seat-exit-row {
  background: white;
  border-color: #16a34a;
  box-shadow: 0 0 0 2px #86efac;
}

.seat-extra-legroom {
  background: white;
  border-color: #7c3aed;
  box-shadow: 0 0 0 2px #d8b4fe;
}

@media (max-width: 768px) {
  .legend-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}
</style>
