import { ref, computed, unref, type Ref } from 'vue'

// Generic validation rule that accepts any value type
export type ValidationRule<T = unknown> = (value: T) => string | boolean
export type ValidationRules<T extends Record<string, unknown>> = {
  [K in keyof T]?: ValidationRule<T[K]>[]
}

// Common rules with proper typing
export const rules = {
    required: (message = 'This field is required') => (value: unknown): string | boolean => {
        if (value === null || value === undefined || value === '') return message
        if (Array.isArray(value) && value.length === 0) return message
        return true
    },
    email: (message = 'Invalid email address') => (value: unknown): string | boolean => {
        if (!value) return true // Allow empty if not required
        if (typeof value !== 'string') return message
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value) || message
    },
    minLength: (min: number, message?: string) => (value: unknown): string | boolean => {
        if (!value) return true
        if (typeof value !== 'string') return message || 'Must be a string'
        return value.length >= min || (message || `Must be at least ${min} characters`)
    },
    pattern: (regex: RegExp, message = 'Invalid format') => (value: unknown): string | boolean => {
        if (!value) return true
        if (typeof value !== 'string') return message
        return regex.test(value) || message
    }
}

export function useValidation<T extends Record<string, unknown>>(
    initialData: T | Ref<T>, 
    validationRules: ValidationRules<T>
) {
    const errors = ref<Partial<Record<keyof T, string>>>({})
    const isSubmitted = ref(false)

    const isValid = computed(() => {
        const data = unref(initialData)
        for (const key in validationRules) {
            const value = data[key]
            const fieldRules = validationRules[key]

            if (fieldRules) {
                for (const rule of fieldRules) {
                    const result = rule(value)
                    if (typeof result === 'string') {
                        return false
                    }
                }
            }
        }
        return true
    })

    const validate = (): boolean => {
        isSubmitted.value = true
        errors.value = {}
        let valid = true

        const data = unref(initialData)
        for (const key in validationRules) {
            const value = data[key]
            const fieldRules = validationRules[key]

            if (fieldRules) {
                for (const rule of fieldRules) {
                    const result = rule(value)
                    if (typeof result === 'string') {
                        errors.value[key] = result
                        valid = false
                        break // Stop at first error for this field
                    }
                }
            }
        }

        return valid
    }

    const clearErrors = () => {
        errors.value = {}
        isSubmitted.value = false
    }

    return {
        errors,
        isSubmitted,
        isValid,
        validate,
        clearErrors,
        rules // Keep returning rules for backward compatibility if needed, or remove
    }
}
