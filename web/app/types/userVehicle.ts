export interface UserVehicle {
    id: number
    year: number
    registration: string
    mileage: number
    price: number | null
    type: 'user_vehicle'
    customerId: number
    createdAt: string
    updatedAt: string
    model?: {
        id: number
        name: string
        brand?: {
            id: number
            name: string
        }
    }
}
