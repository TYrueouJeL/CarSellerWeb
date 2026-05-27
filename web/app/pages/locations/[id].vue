<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            <NuxtLink to="/locations" class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
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
                <NuxtLink to="/locations" class="mt-4 inline-block text-blue-600 hover:underline">
                    Retour aux locations
                </NuxtLink>
            </div>

            <div v-else class="space-y-6">
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="h-56 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <svg class="w-24 h-24 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 17h8M6 11h12l-1-4H7l-1 4zM5 17a2 2 0 104 0M15 17a2 2 0 104 0" />
                        </svg>
                    </div>

                    <div class="p-6 md:p-8">
                        <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
                            {{ vehicle.model?.brand?.name }} {{ vehicle.model?.name }}
                        </h1>
                        <p class="text-gray-500 mt-1">{{ vehicle.registration }}</p>

                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                            <div class="bg-gray-50 rounded-lg p-4">
                                <p class="text-sm text-gray-600">Année</p>
                                <p class="text-lg font-semibold text-gray-900">{{ vehicle.year }}</p>
                            </div>
                            <div class="bg-gray-50 rounded-lg p-4">
                                <p class="text-sm text-gray-600">Kilométrage</p>
                                <p class="text-lg font-semibold text-gray-900">{{ formatMileage(vehicle.mileage) }}</p>
                            </div>
                            <div class="bg-gray-50 rounded-lg p-4">
                                <p class="text-sm text-gray-600">Tarif journalier</p>
                                <p class="text-lg font-semibold text-blue-600">{{ formatDailyPrice(vehicle.dailyPrice) }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Réservation -->
                <div class="bg-white rounded-lg shadow-md p-6 md:p-8">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">Réserver ce véhicule</h2>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Date de début</label>
                            <input
                                v-model="startDate"
                                type="date"
                                :min="minStartDate"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Date de fin</label>
                            <input
                                v-model="endDate"
                                type="date"
                                :min="minEndDate"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <p v-if="dateError" class="text-sm text-red-600 mb-4">{{ dateError }}</p>
                    <p v-else-if="checkingAvailability" class="text-sm text-gray-500 mb-4">Vérification des disponibilités...</p>
                    <p v-else-if="startDate && endDate && !dateError && serverAvailable === false" class="text-sm text-red-600 mb-4">
                        Ce véhicule n'est pas disponible pour ces dates
                    </p>

                    <div v-if="rentalDays > 0 && vehicle.dailyPrice && !dateError" class="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                        <div class="flex justify-between text-sm text-gray-700">
                            <span>{{ rentalDays }} jour{{ rentalDays > 1 ? 's' : '' }} × {{ formatDailyPrice(vehicle.dailyPrice) }}</span>
                            <span class="font-bold text-blue-600 text-lg">{{ formatDailyPrice(estimatedTotal) }}</span>
                        </div>
                    </div>

                    <div v-if="auth.isLoggedIn">
                        <button
                            @click="handleRent"
                            :disabled="!canSubmit || renting"
                            class="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {{ renting ? 'Réservation...' : 'Confirmer la location' }}
                        </button>
                    </div>
                    <NuxtLink
                        v-else
                        to="/auth/login"
                        class="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Se connecter pour louer
                    </NuxtLink>
                </div>

                <!-- Périodes indisponibles -->
                <div v-if="bookedPeriods.length > 0" class="bg-white rounded-lg shadow-md p-6 md:p-8">
                    <h2 class="text-lg font-semibold text-gray-900 mb-3">Périodes déjà réservées</h2>
                    <ul class="space-y-2">
                        <li
                            v-for="(period, index) in bookedPeriods"
                            :key="index"
                            class="text-sm text-gray-600 flex items-center gap-2"
                        >
                            <span class="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                            Du {{ formatDateFr(period.startDate) }} au {{ formatDateFr(period.endDate) }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRentableVehicleService } from '~/services/rentableVehicleService'
import {
    countRentalDays,
    formatDateFr,
    todayIso,
    validateRentalDates,
} from '~/utils/rentalDates'

const route = useRoute()
const auth = useAuthStore()
const toast = useToast()

const vehicleId = computed(() => Number(route.params.id))
const startDate = ref('')
const endDate = ref('')
const renting = ref(false)
const checkingAvailability = ref(false)
const serverAvailable = ref<boolean | null>(null)

const minStartDate = todayIso()

const { data: vehicleResponse, error: fetchError, pending } = await useAsyncData(
    () => `rentable-vehicle-${vehicleId.value}`,
    () => useRentableVehicleService().findById(vehicleId.value, ['model.brand']),
    { watch: [vehicleId] },
)

const vehicle = computed(() => vehicleResponse.value?.data)
const bookedPeriods = computed(() => vehicle.value?.bookedPeriods ?? [])

const minEndDate = computed(() => startDate.value || minStartDate)

const dateError = computed(() => {
    if (!startDate.value && !endDate.value) return null
    return validateRentalDates(startDate.value, endDate.value, bookedPeriods.value)
})

const rentalDays = computed(() => {
    if (!startDate.value || !endDate.value || dateError.value) return 0
    return countRentalDays(startDate.value, endDate.value)
})

const estimatedTotal = computed(() => {
    if (!vehicle.value?.dailyPrice || rentalDays.value < 1) return null
    return vehicle.value.dailyPrice * rentalDays.value
})

const canSubmit = computed(() => {
    return (
        startDate.value
        && endDate.value
        && !dateError.value
        && serverAvailable.value === true
        && vehicle.value?.dailyPrice
        && !renting.value
    )
})

watch([startDate, endDate], async () => {
    serverAvailable.value = null
    if (!startDate.value || !endDate.value || dateError.value) return

    checkingAvailability.value = true
    try {
        const result = await useRentableVehicleService().checkAvailability(vehicleId.value, {
            startDate: startDate.value,
            endDate: endDate.value,
        })
        serverAvailable.value = result.data.available
    } catch {
        serverAvailable.value = false
    } finally {
        checkingAvailability.value = false
    }
})

function formatDailyPrice(price: number | null) {
    if (price === null) return 'Tarif sur demande'
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
}

function formatMileage(mileage: number) {
    return new Intl.NumberFormat('fr-FR').format(mileage) + ' km'
}

async function handleRent() {
    if (!canSubmit.value) return

    renting.value = true
    try {
        const result = await useRentableVehicleService().rent(vehicleId.value, {
            startDate: startDate.value,
            endDate: endDate.value,
        })
        toast.success(
            'Location confirmée',
            `Du ${formatDateFr(result.data.startDate)} au ${formatDateFr(result.data.endDate)} — ${formatDailyPrice(result.data.totalPrice)}`,
        )
        await navigateTo('/locations')
    } catch (err: any) {
        toast.error('Erreur', err?.data?.message ?? 'Impossible de réserver ce véhicule')
    } finally {
        renting.value = false
    }
}

useHead(() => ({
    title: vehicle.value
        ? `${vehicle.value.model?.brand?.name} ${vehicle.value.model?.name} — Location`
        : 'Détail location',
}))
</script>
