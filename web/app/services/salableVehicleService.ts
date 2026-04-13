import type { AdonisPage, ApiResponse } from "~/types/api"
import { useApiClient } from "./api"
import type { SalableVehicle, CreateSalableVehicleDTO, UpdateSalableVehicleDTO } from "~/types/salableVehicle"

export interface SalableVehicleListOptions {
  page?: number
  limit?: number
  // Prix
  minPrice?: number
  maxPrice?: number
  // Véhicule
  modelId?: number
  year?: number
  minYear?: number
  maxYear?: number
  minMileage?: number
  maxMileage?: number
  // Disponibilité
  available?: boolean
  customerId?: number
  // Tri
  orderBy?: 'price' | 'mileage' | 'year' | 'created_at'
  orderDir?: 'asc' | 'desc'
  // Relations
  preloads?: string[]
}

export const useSalableVehicleService = () => {
    const api = useApiClient()

    return {
        list: (options: SalableVehicleListOptions = {}) => {
            const params: Record<string, any> = { ...options }
            return api<AdonisPage<SalableVehicle> | SalableVehicle[]>(
                '/salablevehicle',
                { params }
            )
        },

        findById: (id: number, preloads: string[] = []) =>
            api<ApiResponse<SalableVehicle>>(
                `/salablevehicle/${id}`,
                { params: preloads.length ? { preloads } : undefined }
            ),

        create: (body: CreateSalableVehicleDTO) =>
            api<ApiResponse<SalableVehicle>>(
                '/salablevehicle',
                { method: 'POST', body }
            ),

        update: (id: number, body: UpdateSalableVehicleDTO) =>
            api<ApiResponse<SalableVehicle>>(
                `/salablevehicle/${id}`,
                { method: 'PUT', body }
            ),

        delete: (id: number) =>
            api<ApiResponse<SalableVehicle>>(
                `/salablevehicle/${id}`,
                { method: 'DELETE' }
            )
    }
}