import type { User } from "~/types/user"
import { defineStore } from "pinia"

export const useAuthStore = defineStore('auth', () => {
    const config = useRuntimeConfig()
    const apiUrl = config.public.apiUrl
    const user = ref<User | null>(null)
    const token = useCookie<string | null>('token')
    const loading = ref(false)
    const initializing = ref(true)
    const error = ref<string | null>(null)

    let initPromise: Promise<void> | null = null

    const isLoggedIn = computed(() => !!token.value)

    function clearSession() {
        user.value = null
        token.value = null
    }

    async function register(firstname: string, lastname: string, email: string, password: string, passwordConfirmation: string) {
        loading.value = true
        error.value = null
        
        try {
            const data = await $fetch<{ data: { token: string; user: User } }>(`${apiUrl}/auth/signup`, {
                method: 'POST',
                body: {
                    firstname,
                    lastname,
                    email,
                    password,
                    passwordConfirmation
                }
            })

            user.value = data.data.user
            token.value = data.data.token

            await navigateTo('/')
        } catch (err: any) {
            error.value = err?.data?.message ?? 'Erreur lors de l\'inscription'
            throw err
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
            throw err
        } finally {
            loading.value = false
        }
    }

    async function me() {
        if (!token.value) {
            initializing.value = false
            return
        }

        try {
            const data = await $fetch<{ data: { user: User } }>(`${apiUrl}/account/profile`, {
                headers: { Authorization: `Bearer ${token.value}` },
            })
            user.value = data.data.user
        } catch {
            clearSession()
        } finally {
            initializing.value = false
        }
    }

    async function ensureInitialized() {
        if (initPromise) {
            await initPromise
            return
        }
        if (!initializing.value) return

        initPromise = me()
        try {
            await initPromise
        } finally {
            initPromise = null
        }
    }

    function setUser(updated: User) {
        user.value = updated
    }

    async function logout() {
        const currentToken = token.value
        clearSession()

        if (currentToken) {
            try {
                await $fetch(`${apiUrl}/auth/logout`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${currentToken}` },
                })
            } catch {
                // session déjà invalide côté serveur
            }
        }

        await navigateTo('/')
    }

    return {
        user,
        token,
        loading,
        initializing,
        error,
        isLoggedIn,
        clearSession,
        register,
        login,
        me,
        ensureInitialized,
        setUser,
        logout
    }
})