export interface User {
    id: number
    firstname: string
    lastname: string
    email: string
    roles: string[]
    phoneNumber: string | null
    type: 'customer' | 'technician'
    createdAt?: string
    updatedAt?: string
}
