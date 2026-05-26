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
