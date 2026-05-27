import type {
    CreateMaintenanceRequestPayload,
    MaintenanceRequest,
    MaintenanceServiceType,
    TechnicianOption,
} from '~/types/maintenanceRequest'
import type { UserVehicle } from '~/types/userVehicle'
import { useApiClient } from '~/services/api'

export const useMaintenanceRequestService = () => {
    const api = useApiClient()

    function listTypes() {
        return api<{ data: MaintenanceServiceType[] }>('/maintenance-request/types')
    }

    function listTechnicians() {
        return api<{ data: TechnicianOption[] }>('/maintenance-request/technicians')
    }

    function listVehicles() {
        return api<{ data: UserVehicle[] }>('/maintenance-request/vehicles')
    }

    function list() {
        return api<{ data: MaintenanceRequest[] }>('/maintenance-request')
    }

    function findById(id: number) {
        return api<{ data: MaintenanceRequest }>(`/maintenance-request/${id}`)
    }

    function create(body: CreateMaintenanceRequestPayload) {
        return api<{ data: MaintenanceRequest; message: string }>('/maintenance-request', {
            method: 'POST',
            body,
        })
    }

    return { listTypes, listTechnicians, listVehicles, list, findById, create }
}
