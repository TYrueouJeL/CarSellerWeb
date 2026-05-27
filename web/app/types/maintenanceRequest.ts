import type { UserVehicle } from './userVehicle'

export interface MaintenanceServiceType {
    id: number
    name: string
    description: string
    price: number
    duration: number
}

export interface TechnicianOption {
    id: number
    firstname: string
    lastname: string
    email: string
}

export interface MaintenanceRequest {
    id: number
    customerId: number
    typeId: number
    vehicleId: number
    technicianId: number
    requestDate: string
    approvedDate: string | null
    createdAt: string
    updatedAt: string
    statusLabel: string
    serviceType?: MaintenanceServiceType
    vehicle?: UserVehicle
    technician?: { id: number; firstname: string; lastname: string }
}

export interface CreateMaintenanceRequestPayload {
    typeId: number
    vehicleId: number
    technicianId: number
    requestDate: string
}
