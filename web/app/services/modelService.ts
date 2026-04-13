import type { ApiResponse } from "~/types/api"
import { useApiClient } from "./api"

export interface Model {
    id: number
    name: string
    brandId: number
    categoryId?: number
    brand?: {
        id: number
        name: string
    }
    created_at?: string
    updated_at?: string
}

export const useModelService = () => {
    const api = useApiClient()

    return {
        getAll: (brandId?: number) => {
            const params = brandId ? { brandId } : undefined
            return api<ApiResponse<Model[]>>(
                '/model',
                { method: 'GET', params }
            )
        },
        
        findById: (id: number) =>
            api<ApiResponse<Model>>(
                `/model/${id}`,
                { method: 'GET' }
            )
    }
}
