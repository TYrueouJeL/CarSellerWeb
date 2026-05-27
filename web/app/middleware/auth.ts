export default defineNuxtRouteMiddleware(async () => {
    const auth = useAuthStore()
    await auth.ensureInitialized()

    if (!auth.isLoggedIn) {
        return navigateTo('/auth/login')
    }
})
