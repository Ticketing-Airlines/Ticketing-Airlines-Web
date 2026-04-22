import { ref, computed } from 'vue'

export type ValidationRule = (value: any) => string | boolean
export type ValidationRules = Record<string, ValidationRule[]>

// Common rules
export const rules = {
    required: (message = 'This field is required') => (value: any) => {
        if (value === null || value === undefined || value === '') return message
        if (Array.isArray(value) && value.length === 0) return message
        return true
    },
    email: (message = 'Invalid email address') => (value: string) => {
        if (!value) return true // Allow empty if not required
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value) || message
    },
    minLength: (min: number, message?: string) => (value: string) => {
        if (!value) return true
        return value.length >= min || (message || `Must be at least ${min} characters`)
    },
    pattern: (regex: RegExp, message = 'Invalid format') => (value: string) => {
        if (!value) return true
        return regex.test(value) || message
    }
}

export function useValidation<T extends Record<string, any>>(initialData: T, validationRules: ValidationRules) {
    const errors = ref<Record<string, string>>({})
    const isSubmitted = ref(false)

    const isValid = computed(() => {
        for (const key in validationRules) {
            const value = initialData[key]
            const fieldRules = validationRules[key]

            for (const rule of fieldRules) {
                const result = rule(value)
                if (typeof result === 'string') {
                    return false
                }
            }
        }
        return true
    })

    const validate = () => {
        isSubmitted.value = true
        errors.value = {}
        let valid = true

        for (const key in validationRules) {
            const value = initialData[key]
            const fieldRules = validationRules[key]

            for (const rule of fieldRules) {
                const result = rule(value)
                if (typeof result === 'string') {
                    errors.value[key] = result
                    valid = false
                    break // Stop at first error for this field
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
