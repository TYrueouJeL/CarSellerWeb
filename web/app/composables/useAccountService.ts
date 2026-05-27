import type { AccountDashboard, UpdateProfilePayload } from '~/types/account'
import type { User } from '~/types/user'
import { useApiClient } from '~/services/api'

export const useAccountService = () => {
    const api = useApiClient()

    async function getDashboard(): Promise<AccountDashboard> {
        const response = await api<{ data: AccountDashboard }>('/account/dashboard')
        return response.data
    }

    async function updateProfile(payload: UpdateProfilePayload): Promise<User> {
        const response = await api<{ data: { user: User; message: string } }>('/account/profile', {
            method: 'PUT',
            body: payload,
        })
        return response.data.user
    }

    return { getDashboard, updateProfile }
}
