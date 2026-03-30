export interface CreateSalableVehicleDTO {
    modelId: number
    year: number
    registration: string
    mileage: string
    price: string
}

export interface UpdateSalableVehicleDTO {
    modelId?: number
    year?: number
    registration?: string
    mileage?: string
    price?: string
}

export interface SalableVehicleDTO {
    modelId: number
    year: number
    registration: string
    mileage: string
    price: string
    createdAt: string
    updatedAt: string
}