<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
        <form @submit.prevent="handleLogin" class="border bg-white rounded-lg border-gray-300 p-6 space-y-6 w-96">
            <p class="text-center font-semibold text-xl">Connexion</p>

            <div>
                <label class="block font-semibold mb-1">Email</label>
                <input v-model="form.email" type="email" placeholder="Email" class="w-full border hover:border-teal-400 rounded px-3 py-2" required="true" />
            </div>

            <div>
                <label class="block font-semibold mb-1">Mot de passe</label>
                <input v-model="form.password" type="password" placeholder="Mot de passe" class="w-full border hover:border-teal-400 rounded px-2 py-2" required="true" />
            </div>
    
            <button type="submit" :disabled="authStore.loading" class="border border-teal-400 hover:bg-teal-300 bg-teal-100 hover:shadow p-2 rounded-xl transition mx-auto block">
                {{ authStore.loading ? 'Connexion...' : 'Se connecter' }}
            </button>

            <p class="text-sm text-center">Vous n'avez pas de compte ? <NuxtLink to="/register" class="text-blue-800 hover:underline">Inscrivez vous !</NuxtLink></p>

        </form>
    </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const toast = useToast()
const form = reactive({ email: '', password: '' })

async function handleLogin() {
    try {
        await authStore.login(form.email, form.password)
        toast.success('Connexion réussie', 'Bienvenue sur votre espace')
    } catch (error) {
        toast.error('Erreur de connexion', 'Email ou mot de passe incorrect')
    }
}
</script>