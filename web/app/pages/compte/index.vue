<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <div v-if="pending" class="flex justify-center py-20">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>

            <template v-else-if="dashboard">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Mon compte</h1>
                        <p class="text-gray-600 mt-1">
                            Bonjour {{ dashboard.user.firstname }}, voici le récapitulatif de votre espace.
                        </p>
                    </div>
                    <NuxtLink
                        to="/compte/modifier"
                        class="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-md transition-colors shrink-0"
                    >
                        Modifier mes informations
                    </NuxtLink>
                </div>

                <!-- Informations personnelles -->
                <section class="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h2>
                    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                        <div>
                            <dt class="text-sm text-gray-500">Nom complet</dt>
                            <dd class="font-medium text-gray-900">
                                {{ dashboard.user.firstname }} {{ dashboard.user.lastname }}
                            </dd>
                        </div>
                        <div>
                            <dt class="text-sm text-gray-500">Email</dt>
                            <dd class="font-medium text-gray-900">{{ dashboard.user.email }}</dd>
                        </div>
                        <div>
                            <dt class="text-sm text-gray-500">Téléphone</dt>
                            <dd class="font-medium text-gray-900">
                                {{ dashboard.user.phoneNumber || 'Non renseigné' }}
                            </dd>
                        </div>
                        <div>
                            <dt class="text-sm text-gray-500">Type de compte</dt>
                            <dd class="font-medium text-gray-900">
                                {{ formatUserType(dashboard.user.type) }}
                            </dd>
                        </div>
                        <div>
                            <dt class="text-sm text-gray-500">Rôles</dt>
                            <dd class="flex flex-wrap gap-2 mt-1">
                                <span
                                    v-for="role in dashboard.user.roles"
                                    :key="role"
                                    class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                    {{ formatRole(role) }}
                                </span>
                                <span v-if="!dashboard.user.roles.length" class="text-gray-500 text-sm">—</span>
                            </dd>
                        </div>
                        <div>
                            <dt class="text-sm text-gray-500">Membre depuis</dt>
                            <dd class="font-medium text-gray-900">
                                {{ formatDateTime(dashboard.user.createdAt) }}
                            </dd>
                        </div>
                        <div class="sm:col-span-2">
                            <dt class="text-sm text-gray-500">Dernière mise à jour</dt>
                            <dd class="font-medium text-gray-900">
                                {{ formatDateTime(dashboard.user.updatedAt) }}
                            </dd>
                        </div>
                    </dl>
                </section>

                <!-- Mes véhicules achetés -->
                <section class="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-lg font-semibold text-gray-900">
                            Mes véhicules
                            <span class="text-gray-500 font-normal text-base">({{ dashboard.vehicles.length }})</span>
                        </h2>
                        <NuxtLink to="/ventes" class="text-sm text-blue-600 hover:underline">
                            Parcourir les ventes
                        </NuxtLink>
                    </div>

                    <div v-if="dashboard.vehicles.length === 0" class="text-center py-10 text-gray-500">
                        <p>Vous n'avez pas encore acheté de véhicule.</p>
                        <NuxtLink to="/ventes" class="mt-3 inline-block text-blue-600 hover:underline text-sm">
                            Découvrir le catalogue
                        </NuxtLink>
                    </div>

                    <ul v-else class="divide-y divide-gray-100">
                        <li
                            v-for="vehicle in dashboard.vehicles"
                            :key="vehicle.id"
                            class="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                        >
                            <div>
                                <p class="font-medium text-gray-900">
                                    {{ vehicle.model?.brand?.name }} {{ vehicle.model?.name }}
                                </p>
                                <p class="text-sm text-gray-500">{{ vehicle.registration }} · {{ vehicle.year }}</p>
                                <p class="text-sm text-gray-500">{{ formatMileage(vehicle.mileage) }}</p>
                            </div>
                            <div class="text-left sm:text-right shrink-0">
                                <p v-if="vehicle.price" class="font-semibold text-blue-600">
                                    {{ formatPrice(vehicle.price) }}
                                </p>
                                <p class="text-xs text-gray-400 mt-1">
                                    Acheté le {{ formatDateTime(vehicle.createdAt) }}
                                </p>
                            </div>
                        </li>
                    </ul>
                </section>

                <!-- Mes locations -->
                <section class="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-lg font-semibold text-gray-900">
                            Mes locations
                            <span class="text-gray-500 font-normal text-base">({{ dashboard.rentals.length }})</span>
                        </h2>
                        <NuxtLink to="/locations" class="text-sm text-blue-600 hover:underline">
                            Louer un véhicule
                        </NuxtLink>
                    </div>

                    <div v-if="dashboard.rentals.length === 0" class="text-center py-10 text-gray-500">
                        <p>Aucune location enregistrée.</p>
                        <NuxtLink to="/locations" class="mt-3 inline-block text-blue-600 hover:underline text-sm">
                            Voir les véhicules disponibles
                        </NuxtLink>
                    </div>

                    <ul v-else class="divide-y divide-gray-100">
                        <li
                            v-for="rental in dashboard.rentals"
                            :key="rental.id"
                            class="py-4 first:pt-0 last:pb-0"
                        >
                            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                <div>
                                    <p class="font-medium text-gray-900">
                                        <template v-if="rental.vehicle?.model">
                                            {{ rental.vehicle.model.brand?.name }}
                                            {{ rental.vehicle.model.name }}
                                        </template>
                                        <template v-else>Véhicule #{{ rental.vehicleId }}</template>
                                    </p>
                                    <p v-if="rental.vehicle?.registration" class="text-sm text-gray-500">
                                        {{ rental.vehicle.registration }}
                                    </p>
                                    <p class="text-sm text-gray-600 mt-1">
                                        Du {{ formatDateFr(rental.startDate) }}
                                        au {{ formatDateFr(rental.endDate) }}
                                    </p>
                                    <span
                                        class="inline-flex mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium"
                                        :class="rentalStatusClass(rental)"
                                    >
                                        {{ rentalStatusLabel(rental) }}
                                    </span>
                                </div>
                                <div class="text-left sm:text-right shrink-0">
                                    <p class="font-semibold text-blue-600">{{ formatPrice(rental.totalPrice) }}</p>
                                    <p class="text-xs text-gray-400 mt-1">
                                        Réservé le {{ formatDateTime(rental.createdAt) }}
                                    </p>
                                    <NuxtLink
                                        v-if="rental.vehicleId"
                                        :to="`/locations/${rental.vehicleId}`"
                                        class="text-sm text-blue-600 hover:underline mt-2 inline-block"
                                    >
                                        Voir le véhicule
                                    </NuxtLink>
                                </div>
                            </div>
                        </li>
                    </ul>
                </section>

                <!-- Rendez-vous -->
                <section class="bg-white rounded-lg shadow-md p-6 md:p-8">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-lg font-semibold text-gray-900">
                            Mes rendez-vous
                            <span class="text-gray-500 font-normal text-base">({{ dashboard.appointments.length }})</span>
                        </h2>
                        <NuxtLink to="/rendez-vous" class="text-sm text-blue-600 hover:underline">
                            Gérer mes rendez-vous
                        </NuxtLink>
                    </div>

                    <div v-if="dashboard.appointments.length === 0" class="text-center py-10 text-gray-500">
                        <p>Aucun rendez-vous planifié.</p>
                        <p class="text-sm mt-2">
                            Planifiez l'entretien de vos véhicules (contrôle technique, révision…).
                        </p>
                    </div>

                    <ul v-else class="divide-y divide-gray-100">
                        <li
                            v-for="appointment in dashboard.appointments"
                            :key="appointment.id"
                            class="py-4 first:pt-0 last:pb-0 flex justify-between gap-4"
                        >
                            <div>
                                <p class="font-medium text-gray-900">{{ appointment.subject || 'Rendez-vous' }}</p>
                                <p class="text-sm text-gray-500">
                                    {{ formatDateFr(appointment.date) }}
                                    <span v-if="appointment.time"> à {{ appointment.time }}</span>
                                </p>
                            </div>
                            <span
                                v-if="appointment.status"
                                class="shrink-0 inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                            >
                                {{ appointment.status }}
                            </span>
                        </li>
                    </ul>
                </section>
            </template>

            <div v-else-if="loadError" class="bg-white rounded-lg shadow-md p-8 text-center">
                <p class="text-gray-600">{{ loadError }}</p>
                <button
                    type="button"
                    class="mt-4 text-blue-600 hover:underline"
                    @click="refresh()"
                >
                    Réessayer
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { AccountDashboard } from '~/types/account'
import type { Rental } from '~/types/rental'
import { formatDateFr, todayIso } from '~/utils/rentalDates'
import {
    formatDateTime,
    formatMileage,
    formatPrice,
    formatRole,
    formatUserType,
} from '~/utils/format'

definePageMeta({ middleware: 'auth' })

const accountService = useAccountService()
const pending = ref(true)
const loadError = ref<string | null>(null)
const dashboard = ref<AccountDashboard | null>(null)

async function refresh() {
    pending.value = true
    loadError.value = null
    try {
        dashboard.value = await accountService.getDashboard()
    } catch {
        loadError.value = 'Impossible de charger votre compte. Veuillez réessayer.'
    } finally {
        pending.value = false
    }
}

function rentalStatusLabel(rental: Rental): string {
    const today = todayIso()
    if (rental.endDate < today) return 'Terminée'
    if (rental.startDate > today) return 'À venir'
    return 'En cours'
}

function rentalStatusClass(rental: Rental): string {
    const label = rentalStatusLabel(rental)
    if (label === 'En cours') return 'bg-green-100 text-green-800'
    if (label === 'À venir') return 'bg-blue-100 text-blue-800'
    return 'bg-gray-100 text-gray-600'
}

onMounted(() => {
    refresh()
})
</script>
