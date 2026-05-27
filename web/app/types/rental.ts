export interface RentalPeriod {
    startDate: string
    endDate: string
}

export interface Rental {
    id: number
    vehicleId: number
    userId: number
    startDate: string
    endDate: string
    totalPrice: number
    days?: number
    dailyPrice?: number
    createdAt: string
    updatedAt: string
    vehicle?: {
        id: number
        registration: string
        model?: {
            name: string
            brand?: { name: string }
        }
    }
}
