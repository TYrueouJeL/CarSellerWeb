import type { ApiResponse } from "~/types/api"
import { useApiClient } from "./api"

export interface Brand {
    id: number
    name: string
    created_at?: string
    updated_at?: string
}

export const useBrandService = () => {
    const api = useApiClient()

    return {
        getAll: () => 
            api<ApiResponse<Brand[]>>(
                '/brand',
                { method: 'GET' }
            ),

        findById: (id: number) =>
            api<ApiResponse<Brand>>(
                `/brand/${id}`,
                { method: 'GET' }
            )
    }
}
