import type { RentalPeriod } from './rental'

export type { RentalPeriod }

export interface CreateRentableVehicleDTO {
    modelId: number
    year: number
    registration: string
    mileage: string
    dailyPrice: string
}

export interface UpdateRentableVehicleDTO {
    modelId?: number
    year?: number
    registration?: string
    mileage?: string
    dailyPrice?: string
}

export interface RentableVehicle {
    id: number
    modelId: number
    year: number
    registration: string
    mileage: number
    dailyPrice: number | null
    available: boolean
    bookedPeriods?: RentalPeriod[]
    createdAt: string
    updatedAt: string
    model?: {
        id: number
        name: string
        brand?: { id: number; name: string }
    }
}
