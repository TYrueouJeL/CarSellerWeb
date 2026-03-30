import type { User } from "~/types/user"

const apiUrl = import.meta.env.API_URL

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const token = useCookie('token')
    const loading = ref(false)
    const error = ref<string | null>(null)

    const isLoggedIn = computed(() => !!token.value && !!user.value)

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
            const data = await $fetch<{ token: string; user: User }>(`${apiUrl}/auth/login`, {
                method: 'POST',
                body: {
                    email,
                    password
                }
            })

            user.value = data.user
            token.value = data.token

            await navigateTo('/')
        } catch (err: any) {
            error.value = err?.data?.message ?? 'Erreur lors de la connexion'
        } finally {
            loading.value = false
        }
    }

    async function me() {
        if (!token.value) return

        try {
            const data = await $fetch<{ user: User }>(`${apiUrl}/auth/me`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })

            user.value = data.user
        } catch (err: any) {
            error.value = err?.data?.message ?? 'Erreur lors de la récupération des informations'
        }
    }

    return {
        user,
        token,
        loading,
        error,
        isLoggedIn,
        register,
        login,
        me
    }
})