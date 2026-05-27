<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            <NuxtLink
                to="/rendez-vous"
                class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Retour à mes rendez-vous
            </NuxtLink>

            <div v-if="pending" class="flex justify-center py-20">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>

            <div v-else-if="loadError || !request" class="bg-white rounded-lg shadow-md p-8 text-center">
                <p class="text-gray-600">{{ loadError ?? 'Rendez-vous introuvable' }}</p>
                <NuxtLink to="/rendez-vous" class="mt-4 inline-block text-blue-600 hover:underline">
                    Retour à la liste
                </NuxtLink>
            </div>

            <article v-else class="bg-white rounded-lg shadow-md p-6 md:p-8">
                <div class="flex flex-wrap items-start justify-between gap-3 mb-6">
                    <h1 class="text-2xl font-bold text-gray-900">
                        {{ request.serviceType?.name ?? 'Rendez-vous' }}
                    </h1>
                    <span
                        class="inline-flex px-3 py-1 rounded-full text-sm font-medium"
                        :class="request.statusLabel === 'Approuvé' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'"
                    >
                        {{ request.statusLabel }}
                    </span>
                </div>

                <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                        <dt class="text-sm text-gray-500">Date et heure</dt>
                        <dd class="font-medium text-gray-900">{{ formatDateTime(request.requestDate) }}</dd>
                    </div>
                    <div v-if="request.approvedDate">
                        <dt class="text-sm text-gray-500">Approuvé le</dt>
                        <dd class="font-medium text-gray-900">{{ formatDateTime(request.approvedDate) }}</dd>
                    </div>
                    <div class="sm:col-span-2">
                        <dt class="text-sm text-gray-500">Véhicule</dt>
                        <dd class="font-medium text-gray-900">
                            <template v-if="request.vehicle?.model">
                                {{ request.vehicle.model.brand?.name }}
                                {{ request.vehicle.model.name }}
                                — {{ request.vehicle.registration }} ({{ request.vehicle.year }})
                            </template>
                        </dd>
                    </div>
                    <div>
                        <dt class="text-sm text-gray-500">Technicien</dt>
                        <dd class="font-medium text-gray-900">
                            <template v-if="request.technician">
                                {{ request.technician.firstname }} {{ request.technician.lastname }}
                            </template>
                        </dd>
                    </div>
                    <div v-if="request.serviceType">
                        <dt class="text-sm text-gray-500">Tarif indicatif</dt>
                        <dd class="font-medium text-blue-600">{{ formatPrice(request.serviceType.price) }}</dd>
                    </div>
                </dl>

                <div v-if="request.serviceType" class="mt-6 pt-6 border-t border-gray-100">
                    <h2 class="text-sm font-medium text-gray-700 mb-2">Description de la prestation</h2>
                    <p class="text-gray-600 text-sm leading-relaxed">{{ request.serviceType.description }}</p>
                    <p class="text-sm text-gray-500 mt-2">
                        Durée estimée : {{ request.serviceType.duration }} minutes
                    </p>
                </div>
            </article>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { MaintenanceRequest } from '~/types/maintenanceRequest'
import { formatDateTime, formatPrice } from '~/utils/format'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const maintenanceService = useMaintenanceRequestService()

const requestId = computed(() => Number(route.params.id))
const request = ref<MaintenanceRequest | null>(null)
const pending = ref(true)
const loadError = ref<string | null>(null)

async function loadRequest() {
    pending.value = true
    loadError.value = null
    try {
        const response = await maintenanceService.findById(requestId.value)
        request.value = response.data
    } catch {
        loadError.value = 'Impossible de charger ce rendez-vous.'
    } finally {
        pending.value = false
    }
}

onMounted(() => {
    loadRequest()
})
</script>
