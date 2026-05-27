<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Mes rendez-vous</h1>
                    <p class="text-gray-600 mt-1">
                        Planifiez l'entretien de vos véhicules (contrôle technique, révisions…).
                    </p>
                </div>
                <NuxtLink
                    to="/rendez-vous/nouveau"
                    class="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-md transition-colors shrink-0"
                >
                    Prendre rendez-vous
                </NuxtLink>
            </div>

            <div v-if="pending" class="flex justify-center py-20">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>

            <div v-else-if="loadError" class="bg-white rounded-lg shadow-md p-8 text-center">
                <p class="text-gray-600">{{ loadError }}</p>
                <button type="button" class="mt-4 text-blue-600 hover:underline" @click="loadRequests">
                    Réessayer
                </button>
            </div>

            <div v-else-if="requests.length === 0" class="bg-white rounded-lg shadow-md p-12 text-center">
                <p class="text-gray-600 text-lg">Aucun rendez-vous planifié.</p>
                <p v-if="!hasVehicles" class="text-sm text-gray-500 mt-2">
                    Vous devez d'abord posséder un véhicule pour prendre rendez-vous.
                </p>
                <NuxtLink
                    v-if="hasVehicles"
                    to="/rendez-vous/nouveau"
                    class="mt-4 inline-block text-blue-600 hover:underline font-medium"
                >
                    Prendre un rendez-vous
                </NuxtLink>
                <NuxtLink v-else to="/ventes" class="mt-4 inline-block text-blue-600 hover:underline font-medium">
                    Voir les véhicules à vendre
                </NuxtLink>
            </div>

            <ul v-else class="space-y-4">
                <li
                    v-for="request in requests"
                    :key="request.id"
                    class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                    <NuxtLink :to="`/rendez-vous/${request.id}`" class="block p-6">
                        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <div>
                                <h2 class="text-lg font-semibold text-gray-900">
                                    {{ request.serviceType?.name ?? 'Prestation' }}
                                </h2>
                                <p class="text-sm text-gray-600 mt-1">
                                    <template v-if="request.vehicle?.model">
                                        {{ request.vehicle.model.brand?.name }}
                                        {{ request.vehicle.model.name }}
                                        · {{ request.vehicle.registration }}
                                    </template>
                                </p>
                                <p class="text-sm text-gray-500 mt-2">
                                    {{ formatDateTime(request.requestDate) }}
                                    <span v-if="request.technician">
                                        · {{ request.technician.firstname }} {{ request.technician.lastname }}
                                    </span>
                                </p>
                            </div>
                            <span
                                class="shrink-0 inline-flex px-3 py-1 rounded-full text-sm font-medium"
                                :class="statusClass(request.statusLabel)"
                            >
                                {{ request.statusLabel }}
                            </span>
                        </div>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { MaintenanceRequest } from '~/types/maintenanceRequest'
import { formatDateTime } from '~/utils/format'

definePageMeta({ middleware: 'auth' })

const maintenanceService = useMaintenanceRequestService()
const requests = ref<MaintenanceRequest[]>([])
const pending = ref(true)
const loadError = ref<string | null>(null)
const hasVehicles = ref(true)

function statusClass(label: string) {
    if (label === 'Approuvé') return 'bg-green-100 text-green-800'
    return 'bg-amber-100 text-amber-800'
}

async function loadRequests() {
    pending.value = true
    loadError.value = null
    try {
        const listResponse = await maintenanceService.list()
        requests.value = listResponse.data
    } catch {
        loadError.value = 'Impossible de charger vos rendez-vous.'
    } finally {
        pending.value = false
    }

    try {
        const vehiclesResponse = await maintenanceService.listVehicles()
        hasVehicles.value = vehiclesResponse.data.length > 0
    } catch {
        hasVehicles.value = false
    }
}

onMounted(() => {
    loadRequests()
})
</script>
