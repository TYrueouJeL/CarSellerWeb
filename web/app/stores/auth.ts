import type { User } from "~/types/user"
import { defineStore } from "pinia"

export const useAuthStore = defineStore('auth', () => {
    const config = useRuntimeConfig()
    const apiUrl = config.public.apiUrl
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
        
        console.log('Tentative de connexion avec:', email)
        
        try {
            const data = await $fetch<{ data: { token: string; user: User } }>(`${apiUrl}/auth/login`, {
                method: 'POST',
                body: {
                    email,
                    password
                }
            })

            console.log('Réponse API:', data)

            user.value = data.data.user
            token.value = data.data.token

            console.log('User défini:', user.value)
            console.log('Token défini:', token.value)
            console.log('isLoggedIn:', isLoggedIn.value)

            await navigateTo('/')
        } catch (err: any) {
            console.error('Erreur de connexion:', err)
            error.value = err?.data?.message ?? 'Erreur lors de la connexion'
        } finally {
            loading.value = false
        }
    }

    async function me() {
        if (!token.value) {
            console.log('me(): pas de token, retour')
            return
        }

        console.log('me(): appel API avec token:', token.value)
        
        try {
            const data = await $fetch<{ data: { user: User } }>(`${apiUrl}/auth/me`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })

            console.log('me(): réponse API:', data)
            user.value = data.data.user
            console.log('me(): user défini:', user.value)
        } catch (err: any) {
            console.error('me(): erreur:', err)
            error.value = err?.data?.message ?? 'Erreur lors de la récupération des informations'
        }
    }

    async function logout() {
        await $fetch(`${apiUrl}/auth/logout`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token.value}`
            }
        })
        user.value = null
        token.value = null
        
        await navigateTo('/')
    }

    return {
        user,
        token,
        loading,
        error,
        isLoggedIn,
        register,
        login,
        me,
        logout
    }
})