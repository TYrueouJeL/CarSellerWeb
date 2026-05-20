<template>
    <div class="flex min-h-screen bg-gray-50">
        <div class="flex-1 flex items-center justify-center p-4">
            <div class="w-full max-w-md">
                <div class="bg-white rounded-lg shadow-md p-8">
                    <div class="text-center mb-8">
                        <h1 class="text-3xl font-bold text-gray-900 mb-2">Connexion</h1>
                        <p class="text-gray-600">Connectez-vous à votre espace</p>
                    </div>

                    <form @submit.prevent="handleLogin" class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input 
                                v-model="form.email" 
                                type="email" 
                                placeholder="votre@email.com" 
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                                required="true" 
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                            <input 
                                v-model="form.password" 
                                type="password" 
                                placeholder="••••••••" 
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                                required="true" 
                            />
                        </div>
            
                        <button 
                            type="submit" 
                            :disabled="authStore.loading" 
                            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {{ authStore.loading ? 'Connexion...' : 'Se connecter' }}
                        </button>

                        <div class="text-center">
                            <p class="text-gray-600 text-sm">Vous n'avez pas de compte ? 
                                <NuxtLink to="/auth/register" class="text-blue-600 hover:underline font-medium">Inscrivez-vous !</NuxtLink>
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
const form = reactive({ email: '', password: '' })

async function handleLogin() {
  try {
    await authStore.login(form.email, form.password)
    toast.success('Connexion réussie', 'Bienvenue sur votre espace')
  } catch {
    toast.error('Erreur de connexion', authStore.error ?? 'Email ou mot de passe incorrect')
  }
}
</script>