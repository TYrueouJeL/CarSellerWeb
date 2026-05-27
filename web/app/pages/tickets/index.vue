<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Mes tickets</h1>
                    <p class="text-gray-600 mt-1">Suivez vos demandes de support et échangez avec l'équipe.</p>
                </div>
                <NuxtLink
                    to="/tickets/nouveau"
                    class="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-md transition-colors shrink-0"
                >
                    Nouveau ticket
                </NuxtLink>
            </div>

            <div v-if="pending" class="flex justify-center py-20">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>

            <div v-else-if="loadError" class="bg-white rounded-lg shadow-md p-8 text-center">
                <p class="text-gray-600">{{ loadError }}</p>
                <button type="button" class="mt-4 text-blue-600 hover:underline" @click="loadTickets">
                    Réessayer
                </button>
            </div>

            <div v-else-if="tickets.length === 0" class="bg-white rounded-lg shadow-md p-12 text-center">
                <p class="text-gray-600 text-lg">Vous n'avez aucun ticket pour le moment.</p>
                <NuxtLink
                    to="/tickets/nouveau"
                    class="mt-4 inline-block text-blue-600 hover:underline font-medium"
                >
                    Créer votre premier ticket
                </NuxtLink>
            </div>

            <ul v-else class="space-y-4">
                <li
                    v-for="ticket in tickets"
                    :key="ticket.id"
                    class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                    <NuxtLink :to="`/tickets/${ticket.id}`" class="block p-6">
                        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <div class="min-w-0 flex-1">
                                <h2 class="text-lg font-semibold text-gray-900 truncate">{{ ticket.title }}</h2>
                                <p class="text-sm text-gray-600 mt-1 line-clamp-2">{{ ticket.description }}</p>
                                <p class="text-xs text-gray-400 mt-2">
                                    Créé le {{ formatDateTime(ticket.createdAt) }}
                                    <span v-if="ticket.commentsCount">
                                        · {{ ticket.commentsCount }} commentaire(s)
                                    </span>
                                </p>
                            </div>
                            <span
                                class="shrink-0 inline-flex px-3 py-1 rounded-full text-sm font-medium"
                                :class="statusClass(ticket.status?.name)"
                            >
                                {{ ticket.status?.name ?? '—' }}
                            </span>
                        </div>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Ticket } from '~/types/ticket'
import { formatDateTime } from '~/utils/format'

definePageMeta({ middleware: 'auth' })

const ticketService = useTicketService()
const tickets = ref<Ticket[]>([])
const pending = ref(true)
const loadError = ref<string | null>(null)

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

async function loadTickets() {
    pending.value = true
    loadError.value = null
    try {
        const response = await ticketService.list()
        tickets.value = response.data
    } catch {
        loadError.value = 'Impossible de charger vos tickets.'
    } finally {
        pending.value = false
    }
}

onMounted(() => {
    loadTickets()
})
</script>
