import type { User } from "~/types/user"
import { defineStore } from "pinia"
import { useApiClient } from "~/services/api"

export const useAuthStore = defineStore('auth', () => {
    const config = useRuntimeConfig()
    const apiUrl = config.public.apiUrl
    const user = ref<User | null>(null)
    const token = useCookie<string | null>('token')
    const loading = ref(false)
    const initializing = ref(true)
    const error = ref<string | null>(null)

    const isLoggedIn = computed(() => !!token.value)

    async function register(firstname: string, lastname: string, email: string, password: string, passwordConfirmation: string) {
        loading.value = true
        error.value = null
        
        try {
            const data = await $fetch<{ message: string }>(`${apiUrl}/auth/signup`, {
                method: 'POST',
                body: {
                    firstname,
                    lastname,
                    email,
                    password,
                    passwordConfirmation
                }
            })

            await navigateTo('/')
        } catch (err: any) {
            error.value = err?.data?.message ?? 'Erreur lors de l\'inscription'
        } finally {
            loading.value = false
        }
    }

    async function login(email: string, password: string) {
        loading.value = true
        error.value = null
        
        try {
            const data = await $fetch<{ data: { token: string; user: User } }>(`${apiUrl}/auth/login`, {
                method: 'POST',
                body: { email, password }
            })

            user.value = data.data.user
            token.value = data.data.token

            await navigateTo('/')
        } catch (err: any) {
            error.value = err?.data?.message ?? 'Erreur lors de la connexion'
        } finally {
            loading.value = false
        }
    }

    async function me() {
        if (!token.value) {
            initializing.value = false
            return
        }

        const api = useApiClient()
        try {
            const data = await api<{ data: { user: User } }>(`/account/profile`)

            user.value = data.data.user
        } catch {
            token.value = null
        } finally {
            initializing.value = false
        }
    }

    async function logout() {
        const api = useApiClient()
        try {
            await api(`/auth/logout`, { method: 'POST' })
        } catch {}
        
        user.value = null
        token.value = null
        await navigateTo('/')
    }

    return {
        user,
        token,
        loading,
        initializing,
        error,
        isLoggedIn,
        register,
        login,
        me,
        logout
    }
})