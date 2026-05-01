// Backend response types
export interface BackendPaymentFeeDto {
  type: string
  amount: number
  fixedAmount: number | null
  currency: string
  displayText: string
}

export interface BackendPaymentAvailabilityDto {
  isAvailable: boolean
  maintenanceSchedule: string | null
}

export interface BackendPaymentMethodResponse {
  id: string
  category: string
  name: string
  description: string
  processingTime: string
  fee: BackendPaymentFeeDto
  color: string
  featured: boolean
  isActive: boolean
  providers: string[]
  icon: string
  features: string[]
  availability: BackendPaymentAvailabilityDto
  order: number
}

// Frontend types
export interface PaymentMethod {
  id: string
  category: string
  name: string
  description: string
  processingTime: string
  feeType: 'fixed' | 'percentage'
  feeAmount: number
  feeFixedAmount: number | null
  feeCurrency: string
  feeDisplayText: string
  color: string
  featured: boolean
  isActive: boolean
  providers: string[]
  icon: string
  features: string[]
  isAvailable: boolean
  maintenanceSchedule: string | null
  displayOrder: number
  methodCode: string // For selection
}

// Mapper function
export function mapBackendPaymentMethod(
  backend: BackendPaymentMethodResponse
): PaymentMethod {
  return {
    id: backend.id,
    category: backend.category,
    name: backend.name,
    description: backend.description,
    processingTime: backend.processingTime,
    feeType: backend.fee.type as 'fixed' | 'percentage',
    feeAmount: backend.fee.amount,
    feeFixedAmount: backend.fee.fixedAmount,
    feeCurrency: backend.fee.currency,
    feeDisplayText: backend.fee.displayText,
    color: backend.color,
    featured: backend.featured,
    isActive: backend.isActive,
    providers: backend.providers,
    icon: backend.icon,
    features: backend.features,
    isAvailable: backend.availability.isAvailable,
    maintenanceSchedule: backend.availability.maintenanceSchedule,
    displayOrder: backend.order,
    methodCode: backend.id // Use ID as method code
  }
}
