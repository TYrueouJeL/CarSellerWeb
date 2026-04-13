export const useApiClient = () => {
    const config = useRuntimeConfig()
    const authStore = useAuthStore()

    return $fetch.create({
        baseURL: config.public.apiUrl,
        onRequest({ options }) {
            if (authStore.token) {
                options.headers.set('Authorization', `Bearer ${authStore.token}`)
            }
        },
        onResponseError({ response }) {
            if (response.status === 401) {
                authStore.logout()
                navigateTo('/login')
            }
        }
    })
}