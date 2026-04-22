import type { FareBundle } from '@/interfaces/interfaces'

export const fareBundles: FareBundle[] = [
    {
        type: 'SKYLITE',
        name: 'SkyLite',
        description: 'Essential travel with hand-carry only',
        priceModifier: 1.0,
        features: {
            handCarryBag: '7kg',
            checkedBaggage: null,
            seatSelection: 'none',
            rebooking: false,
            travelFundsConversion: false,
            priorityBoarding: false
        }
    },
    {
        type: 'SKYPLUS',
        name: 'SkyPlus',
        description: 'More comfort with checked baggage and seat selection',
        priceModifier: 1.2,
        features: {
            handCarryBag: '7kg',
            checkedBaggage: '20kg',
            seatSelection: 'standard',
            rebooking: false,
            travelFundsConversion: false,
            priorityBoarding: false
        }
    },
    {
        type: 'SKYFLEX',
        name: 'SkyFlex',
        description: 'Maximum flexibility with all benefits included',
        priceModifier: 1.4,
        features: {
            handCarryBag: '7kg',
            checkedBaggage: '20kg',
            seatSelection: 'any',
            rebooking: true,
            travelFundsConversion: true,
            priorityBoarding: true
        }
    }
]

// Helper function to get bundle by type
export function getBundleByType(type: string): FareBundle | undefined {
    return fareBundles.find(bundle => bundle.type === type)
}

// Helper function to calculate price with bundle modifier
export function calculateBundlePrice(basePrice: number, bundleType: string): number {
    const bundle = getBundleByType(bundleType)
    return bundle ? Math.round(basePrice * bundle.priceModifier) : basePrice
}
