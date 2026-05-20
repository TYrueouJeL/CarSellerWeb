<template>
    <div class="flex min-h-screen bg-gray-50">
        <div class="flex-1 flex items-center justify-center p-4">
            <div class="w-full max-w-md">
                <div class="bg-white rounded-lg shadow-md p-8">
                    <div class="text-center mb-8">
                        <h1 class="text-3xl font-bold text-gray-900 mb-2">Inscription</h1>
                        <p class="text-gray-600">Créez votre compte</p>
                    </div>

                    <form @submit.prevent="handleRegister" class="space-y-6">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                                <input
                                    v-model="form.firstname"
                                    type="text"
                                    placeholder="Jean"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                                <input
                                    v-model="form.lastname"
                                    type="text"
                                    placeholder="Dupont"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                v-model="form.email"
                                type="email"
                                placeholder="votre@email.com"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                            <input
                                v-model="form.password"
                                type="password"
                                placeholder="••••••••"
                                minlength="8"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>
                            <input
                                v-model="form.passwordConfirmation"
                                type="password"
                                placeholder="••••••••"
                                minlength="8"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            :disabled="authStore.loading"
                            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {{ authStore.loading ? 'Inscription...' : 'S\'inscrire' }}
                        </button>

                        <div class="text-center">
                            <p class="text-gray-600 text-sm">Vous avez déjà un compte ?
                                <NuxtLink to="/auth/login" class="text-blue-600 hover:underline font-medium">Connectez-vous !</NuxtLink>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const toast = useToast()
const form = reactive({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordConfirmation: '',
})

async function handleRegister() {
    try {
        await authStore.register(
            form.firstname,
            form.lastname,
            form.email,
            form.password,
            form.passwordConfirmation,
        )
        toast.success('Inscription réussie', 'Bienvenue sur votre espace')
    } catch {
        toast.error('Erreur d\'inscription', authStore.error ?? 'Impossible de créer le compte')
    }
}
</script>
