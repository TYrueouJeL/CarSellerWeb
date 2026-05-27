<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            <NuxtLink to="/ventes" class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Retour au catalogue
            </NuxtLink>

            <div v-if="pending" class="flex justify-center py-20">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>

            <div v-else-if="fetchError || !vehicle" class="bg-white rounded-lg shadow-md p-8 text-center">
                <p class="text-gray-600 text-lg">Véhicule introuvable</p>
                <NuxtLink to="/ventes" class="mt-4 inline-block text-blue-600 hover:underline">
                    Retour aux ventes
                </NuxtLink>
            </div>

            <div v-else class="bg-white rounded-lg shadow-md overflow-hidden">
                <div class="h-56 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                    <svg class="w-24 h-24 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 17h8M6 11h12l-1-4H7l-1 4zM5 17a2 2 0 104 0M15 17a2 2 0 104 0" />
                    </svg>
                </div>

                <div class="p-6 md:p-8">
                    <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
                        <div>
                            <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
                                {{ vehicle.model?.brand?.name }} {{ vehicle.model?.name }}
                            </h1>
                            <p class="text-gray-500 mt-1">{{ vehicle.registration }}</p>
                        </div>
                        <span
                            v-if="vehicle.available"
                            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                        >
                            Disponible
                        </span>
                        <span
                            v-else
                            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600"
                        >
                            Vendu
                        </span>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div class="bg-gray-50 rounded-lg p-4">
                            <p class="text-sm text-gray-600">Année</p>
                            <p class="text-lg font-semibold text-gray-900">{{ vehicle.year }}</p>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-4">
                            <p class="text-sm text-gray-600">Kilométrage</p>
                            <p class="text-lg font-semibold text-gray-900">{{ formatMileage(vehicle.mileage) }}</p>
                        </div>
                    </div>

                    <div class="border-t pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <p class="text-sm text-gray-600">Prix de vente</p>
                            <p class="text-3xl font-bold text-blue-600">{{ formatPrice(vehicle.price) }}</p>
                        </div>

                        <div v-if="vehicle.available" class="flex flex-col sm:flex-row gap-3">
                            <button
                                v-if="auth.isLoggedIn"
                                @click="handlePurchase"
                                :disabled="purchasing"
                                class="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {{ purchasing ? 'Achat en cours...' : 'Acheter ce véhicule' }}
                            </button>
                            <NuxtLink
                                v-else
                                to="/auth/login"
                                class="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors text-center"
                            >
                                Se connecter pour acheter
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSalableVehicleService } from '~/services/salableVehicleService'

const route = useRoute()
const auth = useAuthStore()
const toast = useToast()

const vehicleId = computed(() => Number(route.params.id))
const purchasing = ref(false)

const { data: vehicleResponse, error: fetchError, pending } = await useAsyncData(
    () => `salable-vehicle-${vehicleId.value}`,
    () => useSalableVehicleService().findById(vehicleId.value, ['model.brand']),
    { watch: [vehicleId] },
)

const vehicle = computed(() => vehicleResponse.value?.data)

function formatPrice(price: number | null) {
    if (price === null) return 'Prix sur demande'
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
}

function formatMileage(mileage: number) {
    return new Intl.NumberFormat('fr-FR').format(mileage) + ' km'
}

async function handlePurchase() {
    purchasing.value = true
    try {
        await useSalableVehicleService().purchase(vehicleId.value)
        toast.success('Achat réussi', 'Ce véhicule est maintenant dans votre garage')
        await navigateTo('/ventes')
    } catch (err: any) {
        toast.error('Erreur', err?.data?.message ?? 'Impossible d\'acheter ce véhicule')
    } finally {
        purchasing.value = false
    }
}

useHead(() => ({
    title: vehicle.value
        ? `${vehicle.value.model?.brand?.name} ${vehicle.value.model?.name}`
        : 'Détail véhicule',
}))
</script>
