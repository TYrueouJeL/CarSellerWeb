<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-xl mx-auto px-4 sm:px-6 py-8">
            <NuxtLink
                to="/compte"
                class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Retour à mon compte
            </NuxtLink>

            <div v-if="loadingProfile" class="flex justify-center py-20">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>

            <div v-else class="bg-white rounded-lg shadow-md p-6 md:p-8">
                <div class="mb-8">
                    <h1 class="text-2xl font-bold text-gray-900">Modifier mon compte</h1>
                    <p class="text-gray-600 mt-1">Mettez à jour vos informations personnelles.</p>
                </div>

                <form class="space-y-5" @submit.prevent="handleSubmit">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                            <input
                                v-model="form.firstname"
                                type="text"
                                required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                            <input
                                v-model="form.lastname"
                                type="text"
                                required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            v-model="form.email"
                            type="email"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                        <input
                            v-model="form.phoneNumber"
                            type="tel"
                            placeholder="06 12 34 56 78"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p class="text-xs text-gray-500 mt-1">Optionnel</p>
                    </div>

                    <hr class="border-gray-200" />

                    <p class="text-sm font-medium text-gray-700">Changer le mot de passe (optionnel)</p>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
                        <input
                            v-model="form.password"
                            type="password"
                            minlength="8"
                            autocomplete="new-password"
                            placeholder="Laisser vide pour ne pas modifier"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>
                        <input
                            v-model="form.passwordConfirmation"
                            type="password"
                            minlength="8"
                            autocomplete="new-password"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <p v-if="formError" class="text-sm text-red-600">{{ formError }}</p>

                    <div class="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                        <NuxtLink
                            to="/compte"
                            class="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Annuler
                        </NuxtLink>
                        <button
                            type="submit"
                            :disabled="saving"
                            class="inline-flex justify-center items-center flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {{ saving ? 'Enregistrement...' : 'Enregistrer les modifications' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const auth = useAuthStore()
const accountService = useAccountService()
const toast = useToast()

const loadingProfile = ref(true)
const saving = ref(false)
const formError = ref<string | null>(null)

const form = reactive({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordConfirmation: '',
})

function fillFormFromUser() {
    const user = auth.user
    if (!user) return
    form.firstname = user.firstname
    form.lastname = user.lastname
    form.email = user.email
    form.phoneNumber = user.phoneNumber ?? ''
    form.password = ''
    form.passwordConfirmation = ''
}

async function loadProfile() {
    loadingProfile.value = true
    try {
        await auth.me()
        fillFormFromUser()
    } finally {
        loadingProfile.value = false
    }
}

function validateForm(): string | null {
    if (form.password || form.passwordConfirmation) {
        if (form.password.length < 8) {
            return 'Le mot de passe doit contenir au moins 8 caractères'
        }
        if (form.password !== form.passwordConfirmation) {
            return 'Les mots de passe ne correspondent pas'
        }
    }
    return null
}

async function handleSubmit() {
    formError.value = validateForm()
    if (formError.value) return

    saving.value = true
    formError.value = null

    try {
        const payload: Record<string, string | null> = {
            firstname: form.firstname.trim(),
            lastname: form.lastname.trim(),
            email: form.email.trim(),
            phoneNumber: form.phoneNumber.trim() || null,
        }

        if (form.password) {
            payload.password = form.password
            payload.passwordConfirmation = form.passwordConfirmation
        }

        const user = await accountService.updateProfile(
            payload as Parameters<typeof accountService.updateProfile>[0],
        )
        auth.setUser(user)
        toast.success('Profil mis à jour', 'Vos informations ont été enregistrées')
        await navigateTo('/compte')
    } catch (err: unknown) {
        const message =
            (err as { data?: { message?: string } })?.data?.message ??
            'Impossible de mettre à jour le profil'
        formError.value = message
        toast.error('Erreur', message)
    } finally {
        saving.value = false
    }
}

onMounted(() => {
    loadProfile()
})
</script>
