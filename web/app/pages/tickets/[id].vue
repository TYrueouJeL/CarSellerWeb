<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            <NuxtLink
                to="/tickets"
                class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Retour à mes tickets
            </NuxtLink>

            <div v-if="pending" class="flex justify-center py-20">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>

            <div v-else-if="loadError || !ticket" class="bg-white rounded-lg shadow-md p-8 text-center">
                <p class="text-gray-600">{{ loadError ?? 'Ticket introuvable' }}</p>
                <NuxtLink to="/tickets" class="mt-4 inline-block text-blue-600 hover:underline">
                    Retour à la liste
                </NuxtLink>
            </div>

            <template v-else>
                <article class="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
                    <div class="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <h1 class="text-2xl font-bold text-gray-900">{{ ticket.title }}</h1>
                        <span
                            class="inline-flex px-3 py-1 rounded-full text-sm font-medium"
                            :class="statusClass(ticket.status?.name)"
                        >
                            {{ ticket.status?.name }}
                        </span>
                    </div>

                    <p class="text-sm text-gray-500 mb-4">
                        Créé le {{ formatDateTime(ticket.createdAt) }}
                        <span v-if="ticket.technician">
                            · Technicien : {{ ticket.technician.firstname }} {{ ticket.technician.lastname }}
                        </span>
                        <span v-else> · Aucun technicien assigné</span>
                    </p>

                    <div class="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                        {{ ticket.description }}
                    </div>
                </article>

                <section class="bg-white rounded-lg shadow-md p-6 md:p-8">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">
                        Commentaires
                        <span class="text-gray-500 font-normal">({{ ticket.comments?.length ?? 0 }})</span>
                    </h2>

                    <div v-if="!ticket.comments?.length" class="text-center py-8 text-gray-500 text-sm">
                        Aucun commentaire pour l'instant. Soyez le premier à répondre.
                    </div>

                    <ul v-else class="space-y-4 mb-6">
                        <li
                            v-for="comment in ticket.comments"
                            :key="comment.id"
                            class="border border-gray-100 rounded-lg p-4"
                        >
                            <div class="flex items-center justify-between gap-2 mb-2">
                                <p class="text-sm font-medium text-gray-900">
                                    {{ comment.author?.firstname }} {{ comment.author?.lastname }}
                                    <span
                                        v-if="comment.author?.type === 'technician'"
                                        class="ml-1 text-xs font-normal text-blue-600"
                                    >
                                        (Technicien)
                                    </span>
                                </p>
                                <time class="text-xs text-gray-400">{{ formatDateTime(comment.createdAt) }}</time>
                            </div>
                            <p class="text-sm text-gray-700 whitespace-pre-wrap">{{ comment.comment }}</p>
                        </li>
                    </ul>

                    <form class="space-y-3 border-t border-gray-100 pt-6" @submit.prevent="submitComment">
                        <label class="block text-sm font-medium text-gray-700">Ajouter un commentaire</label>
                        <textarea
                            v-model="newComment"
                            rows="3"
                            required
                            placeholder="Votre message..."
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p v-if="commentError" class="text-sm text-red-600">{{ commentError }}</p>
                        <button
                            type="submit"
                            :disabled="savingComment"
                            class="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-md disabled:opacity-50"
                        >
                            {{ savingComment ? 'Envoi...' : 'Publier' }}
                        </button>
                    </form>
                </section>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Ticket } from '~/types/ticket'
import { formatDateTime } from '~/utils/format'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const ticketService = useTicketService()
const toast = useToast()

const ticketId = computed(() => Number(route.params.id))
const ticket = ref<Ticket | null>(null)
const pending = ref(true)
const loadError = ref<string | null>(null)
const newComment = ref('')
const savingComment = ref(false)
const commentError = ref<string | null>(null)

function statusClass(name?: string) {
    switch (name) {
        case 'Ouvert':
            return 'bg-blue-100 text-blue-800'
        case 'En cours':
            return 'bg-amber-100 text-amber-800'
        case 'En attente':
            return 'bg-orange-100 text-orange-800'
        case 'Résolu':
            return 'bg-green-100 text-green-800'
        case 'Fermé':
            return 'bg-gray-100 text-gray-600'
        default:
            return 'bg-gray-100 text-gray-600'
    }
}

async function loadTicket() {
    pending.value = true
    loadError.value = null
    try {
        const response = await ticketService.findById(ticketId.value)
        ticket.value = response.data
    } catch (err: unknown) {
        const status = (err as { status?: number })?.status
        loadError.value =
            status === 403
                ? 'Vous n\'avez pas accès à ce ticket.'
                : 'Impossible de charger ce ticket.'
    } finally {
        pending.value = false
    }
}

async function submitComment() {
    if (!ticket.value) return
    commentError.value = null
    savingComment.value = true

    try {
        const response = await ticketService.addComment(ticketId.value, {
            comment: newComment.value.trim(),
        })
        if (!ticket.value.comments) {
            ticket.value.comments = []
        }
        ticket.value.comments.push(response.data)
        newComment.value = ''
        toast.success('Commentaire ajouté', response.message)
    } catch (err: unknown) {
        commentError.value =
            (err as { data?: { message?: string } })?.data?.message ??
            'Impossible d\'ajouter le commentaire'
    } finally {
        savingComment.value = false
    }
}

onMounted(() => {
    loadTicket()
})
</script>
