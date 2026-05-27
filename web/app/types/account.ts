import type { User } from './user'
import type { UserVehicle } from './userVehicle'
import type { Rental } from './rental'

export interface AccountDashboard {
    user: User
    vehicles: UserVehicle[]
    rentals: RentalWithVehicle[]
    appointments: AppointmentSummary[]
}

export interface RentalWithVehicle extends Rental {
    vehicle?: {
        id: number
        registration: string
        model?: {
            name: string
            brand?: { name: string }
        }
    }
}

export interface AppointmentSummary {
    id: number
    date: string
    time?: string
    subject?: string
    status?: string
}

export interface UpdateProfilePayload {
    firstname: string
    lastname: string
    email: string
    phoneNumber?: string | null
    password?: string
    passwordConfirmation?: string
}
