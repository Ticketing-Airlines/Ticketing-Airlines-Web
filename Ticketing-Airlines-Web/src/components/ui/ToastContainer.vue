<script setup lang="ts">
import { computed } from 'vue'
import ToastNotification from './ToastNotification.vue'
import type { ToastProps } from '@/types/toast'

export interface ToastContainerProps {
  toasts: ToastProps[]
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
}

const props = withDefaults(defineProps<ToastContainerProps>(), {
  position: 'top-right'
})

const emit = defineEmits<{
  close: [id: string]
}>()

const positionClasses = computed(() => {
  switch (props.position) {
    case 'top-right':
      return 'top-4 right-4'
    case 'top-left':
      return 'top-4 left-4'
    case 'bottom-right':
      return 'bottom-4 right-4'
    case 'bottom-left':
      return 'bottom-4 left-4'
    case 'top-center':
      return 'top-4 left-1/2 -translate-x-1/2'
    case 'bottom-center':
      return 'bottom-4 left-1/2 -translate-x-1/2'
    default:
      return 'top-4 right-4'
  }
})

const handleClose = (id: string) => {
  emit('close', id)
}
</script>

<template>
  <div
    :class="[
      'fixed z-50 flex flex-col gap-3 pointer-events-none',
      positionClasses
    ]"
  >
    <TransitionGroup
      name="toast"
      tag="div"
      class="flex flex-col gap-3"
    >
      <ToastNotification
        v-for="toast in toasts"
        :key="toast.id"
        :id="toast.id"
        :message="toast.message"
        :type="toast.type"
        :duration="toast.duration"
        @close="handleClose"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
/* Toast enter/leave animations */
.toast-enter-active {
  animation: toast-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-leave-active {
  animation: toast-out 0.2s ease-in;
}

.toast-move {
  transition: all 0.3s ease;
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateX(100%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes toast-out {
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(100%) scale(0.8);
  }
}

/* For left-positioned toasts */
.top-left .toast-enter-active,
.bottom-left .toast-enter-active {
  animation: toast-in-left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.top-left .toast-leave-active,
.bottom-left .toast-leave-active {
  animation: toast-out-left 0.2s ease-in;
}

@keyframes toast-in-left {
  from {
    opacity: 0;
    transform: translateX(-100%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes toast-out-left {
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(-100%) scale(0.8);
  }
}

/* For center-positioned toasts */
.top-center .toast-enter-active,
.bottom-center .toast-enter-active {
  animation: toast-in-center 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.top-center .toast-leave-active,
.bottom-center .toast-leave-active {
  animation: toast-out-center 0.2s ease-in;
}

@keyframes toast-in-center {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

@keyframes toast-out-center {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px) scale(0.8);
  }
}
</style>
