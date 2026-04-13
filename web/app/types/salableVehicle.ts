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

export interface SalableVehicle {
    modelId: number
    year: number
    registration: string
    mileage: string
    price: string
    createdAt: string
    updatedAt: string
    // model?: Model
    // customer?: Customer
}
