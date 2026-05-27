<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-2xl mx-auto px-4 sm:px-6 py-8">
            <NuxtLink
                to="/tickets"
                class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Retour à mes tickets
            </NuxtLink>

            <div class="bg-white rounded-lg shadow-md p-6 md:p-8">
                <h1 class="text-2xl font-bold text-gray-900 mb-2">Nouveau ticket</h1>
                <p class="text-gray-600 mb-6">Décrivez votre demande, un conseiller vous répondra rapidement.</p>

                <form class="space-y-5" @submit.prevent="handleSubmit">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                        <input
                            v-model="form.title"
                            type="text"
                            required
                            minlength="3"
                            maxlength="200"
                            placeholder="Ex. Problème avec ma réservation"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            v-model="form.description"
                            required
                            minlength="10"
                            rows="6"
                            placeholder="Décrivez votre problème en détail..."
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p class="text-xs text-gray-500 mt-1">Minimum 10 caractères</p>
                    </div>

                    <p v-if="formError" class="text-sm text-red-600">{{ formError }}</p>

                    <div class="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                        <NuxtLink
                            to="/tickets"
                            class="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Annuler
                        </NuxtLink>
                        <button
                            type="submit"
                            :disabled="saving"
                            class="inline-flex justify-center items-center flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-md disabled:opacity-50"
                        >
                            {{ saving ? 'Envoi...' : 'Créer le ticket' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const ticketService = useTicketService()
const toast = useToast()

const saving = ref(false)
const formError = ref<string | null>(null)
const form = reactive({
    title: '',
    description: '',
})

async function handleSubmit() {
    formError.value = null
    saving.value = true

    try {
        const response = await ticketService.create({
            title: form.title.trim(),
            description: form.description.trim(),
        })
        toast.success('Ticket créé', response.message)
        await navigateTo(`/tickets/${response.data.id}`)
    } catch (err: unknown) {
        const message =
            (err as { data?: { message?: string } })?.data?.message ??
            'Impossible de créer le ticket'
        formError.value = message
        toast.error('Erreur', message)
    } finally {
        saving.value = false
    }
}
</script>
