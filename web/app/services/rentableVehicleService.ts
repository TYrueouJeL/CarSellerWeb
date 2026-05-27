import type { AdonisPage, ApiResponse } from "~/types/api"
import { useApiClient } from "./api"
import type { RentableVehicle, CreateRentableVehicleDTO, UpdateRentableVehicleDTO } from "~/types/rentableVehicle"
import type { Rental, RentalPeriod } from "~/types/rental"

export interface RentableVehicleListOptions {
  page?: number
  limit?: number
  minPrice?: number
  maxPrice?: number
  modelId?: number
  year?: number
  minYear?: number
  maxYear?: number
  minMileage?: number
  maxMileage?: number
  available?: boolean
  customerId?: number
  orderBy?: 'price' | 'mileage' | 'year' | 'created_at'
  orderDir?: 'asc' | 'desc'
  preloads?: string[]
}

export interface RentVehicleDTO {
  startDate: string
  endDate: string
}

export const useRentableVehicleService = () => {
    const api = useApiClient()

    return {
        list: (options: RentableVehicleListOptions = {}) => {
            const { orderBy, orderDir, minPrice, maxPrice, modelId, minYear, maxYear, minMileage, maxMileage, customerId, preloads, ...rest } = options
            const params: Record<string, unknown> = { ...rest }

            if (preloads?.length) params.preloads = preloads.join(',')
            if (minPrice !== undefined) params.min_price = minPrice
            if (maxPrice !== undefined) params.max_price = maxPrice
            if (modelId !== undefined) params.model_id = modelId
            if (minYear !== undefined) params.min_year = minYear
            if (maxYear !== undefined) params.max_year = maxYear
            if (minMileage !== undefined) params.min_mileage = minMileage
            if (maxMileage !== undefined) params.max_mileage = maxMileage
            if (customerId !== undefined) params.customer_id = customerId
            if (orderBy !== undefined) params.order_by = orderBy
            if (orderDir !== undefined) params.order_dir = orderDir

            return api<AdonisPage<RentableVehicle> | RentableVehicle[]>(
                '/rentablevehicle',
                { params }
            )
        },

        findById: (id: number, preloads: string[] = []) =>
            api<ApiResponse<RentableVehicle>>(
                `/rentablevehicle/${id}`,
                { params: preloads.length ? { preloads: preloads.join(',') } : undefined }
            ),

        checkAvailability: (id: number, dates: RentVehicleDTO) =>
            api<ApiResponse<{ available: boolean }>>(
                `/rentablevehicle/${id}/availability`,
                { params: dates }
            ),

        rent: (id: number, body: RentVehicleDTO) =>
            api<ApiResponse<Rental> & { message?: string }>(
                `/rentablevehicle/${id}/rent`,
                { method: 'POST', body }
            ),

        getBookedPeriods: (id: number) =>
            api<ApiResponse<RentalPeriod[]>>(
                `/rentablevehicle/${id}/rentals`
            ),

        create: (body: CreateRentableVehicleDTO) =>
            api<ApiResponse<RentableVehicle>>(
                '/rentablevehicle',
                { method: 'POST', body }
            ),

        update: (id: number, body: UpdateRentableVehicleDTO) =>
            api<ApiResponse<RentableVehicle>>(
                `/rentablevehicle/${id}`,
                { method: 'PUT', body }
            ),

        delete: (id: number) =>
            api<ApiResponse<RentableVehicle>>(
                `/rentablevehicle/${id}`,
                { method: 'DELETE' }
            )
    }
}
