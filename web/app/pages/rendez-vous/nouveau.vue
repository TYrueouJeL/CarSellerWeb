<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-2xl mx-auto px-4 sm:px-6 py-8">
            <NuxtLink
                to="/rendez-vous"
                class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Retour à mes rendez-vous
            </NuxtLink>

            <div v-if="loadingOptions" class="flex justify-center py-20">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>

            <div v-else-if="optionsError" class="bg-white rounded-lg shadow-md p-8 text-center">
                <p class="text-gray-600">{{ optionsError }}</p>
            </div>

            <div v-else-if="vehicles.length === 0" class="bg-white rounded-lg shadow-md p-8 text-center">
                <p class="text-gray-600">Vous n'avez aucun véhicule enregistré.</p>
                <p class="text-sm text-gray-500 mt-2">
                    Achetez un véhicule pour pouvoir prendre rendez-vous en atelier.
                </p>
                <NuxtLink to="/ventes" class="mt-4 inline-block text-blue-600 hover:underline font-medium">
                    Voir les véhicules à vendre
                </NuxtLink>
            </div>

            <div v-else class="bg-white rounded-lg shadow-md p-6 md:p-8">
                <h1 class="text-2xl font-bold text-gray-900 mb-2">Nouveau rendez-vous</h1>
                <p class="text-gray-600 mb-6">Choisissez votre véhicule, la prestation et le créneau souhaité.</p>

                <form class="space-y-5" @submit.prevent="handleSubmit">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Véhicule</label>
                        <select
                            v-model.number="form.vehicleId"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="" disabled>Sélectionnez un véhicule</option>
                            <option v-for="vehicle in vehicles" :key="vehicle.id" :value="vehicle.id">
                                {{ vehicleLabel(vehicle) }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Type de prestation</label>
                        <select
                            v-model.number="form.typeId"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            @change="onTypeChange"
                        >
                            <option value="" disabled>Sélectionnez une prestation</option>
                            <option v-for="type in serviceTypes" :key="type.id" :value="type.id">
                                {{ type.name }} — {{ formatPrice(type.price) }}
                            </option>
                        </select>
                        <p v-if="selectedType" class="text-sm text-gray-600 mt-2">
                            {{ selectedType.description }}
                            <span class="block text-gray-500 mt-1">
                                Durée estimée : {{ selectedType.duration }} min
                            </span>
                        </p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Technicien</label>
                        <select
                            v-model.number="form.technicianId"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="" disabled>Sélectionnez un technicien</option>
                            <option v-for="tech in technicians" :key="tech.id" :value="tech.id">
                                {{ tech.firstname }} {{ tech.lastname }}
                            </option>
                        </select>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
                            <input
                                v-model="form.date"
                                type="date"
                                required
                                :min="minDate"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Heure</label>
                            <input
                                v-model="form.time"
                                type="time"
                                required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <p v-if="formError" class="text-sm text-red-600">{{ formError }}</p>

                    <div class="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                        <NuxtLink
                            to="/rendez-vous"
                            class="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Annuler
                        </NuxtLink>
                        <button
                            type="submit"
                            :disabled="saving"
                            class="inline-flex justify-center items-center flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-md disabled:opacity-50"
                        >
                            {{ saving ? 'Réservation...' : 'Confirmer le rendez-vous' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { MaintenanceServiceType, TechnicianOption } from '~/types/maintenanceRequest'
import type { UserVehicle } from '~/types/userVehicle'
import { formatPrice } from '~/utils/format'
import { todayIso } from '~/utils/rentalDates'

definePageMeta({ middleware: 'auth' })

const maintenanceService = useMaintenanceRequestService()
const toast = useToast()

const loadingOptions = ref(true)
const optionsError = ref<string | null>(null)
const saving = ref(false)
const formError = ref<string | null>(null)

const vehicles = ref<UserVehicle[]>([])
const serviceTypes = ref<MaintenanceServiceType[]>([])
const technicians = ref<TechnicianOption[]>([])

const form = reactive({
    vehicleId: '' as number | '',
    typeId: '' as number | '',
    technicianId: '' as number | '',
    date: '',
    time: '',
})

const minDate = todayIso()
const selectedType = computed(() =>
    serviceTypes.value.find((t) => t.id === form.typeId),
)

function vehicleLabel(vehicle: UserVehicle) {
    const brand = vehicle.model?.brand?.name ?? ''
    const model = vehicle.model?.name ?? ''
    return `${brand} ${model} — ${vehicle.registration}`.trim()
}

function onTypeChange() {
    // force reactivity for description block
}

async function loadOptions() {
    loadingOptions.value = true
    optionsError.value = null
    try {
        const [typesRes, techRes, vehiclesRes] = await Promise.all([
            maintenanceService.listTypes(),
            maintenanceService.listTechnicians(),
            maintenanceService.listVehicles(),
        ])
        serviceTypes.value = typesRes.data
        technicians.value = techRes.data
        vehicles.value = vehiclesRes.data

        if (technicians.value.length === 1) {
            form.technicianId = technicians.value[0]!.id
        }
        if (vehicles.value.length === 1) {
            form.vehicleId = vehicles.value[0]!.id
        }
    } catch {
        optionsError.value = 'Impossible de charger le formulaire.'
    } finally {
        loadingOptions.value = false
    }
}

async function handleSubmit() {
    formError.value = null

    if (!form.date || !form.time) {
        formError.value = 'Veuillez renseigner la date et l\'heure'
        return
    }

    const requestDate = `${form.date}T${form.time}:00`
    const parsed = new Date(requestDate)
    if (Number.isNaN(parsed.getTime()) || parsed <= new Date()) {
        formError.value = 'Le créneau doit être dans le futur'
        return
    }

    saving.value = true
    try {
        const response = await maintenanceService.create({
            typeId: Number(form.typeId),
            vehicleId: Number(form.vehicleId),
            technicianId: Number(form.technicianId),
            requestDate: parsed.toISOString(),
        })
        toast.success('Rendez-vous confirmé', response.message)
        await navigateTo(`/rendez-vous/${response.data.id}`)
    } catch (err: unknown) {
        const message =
            (err as { data?: { message?: string } })?.data?.message ??
            'Impossible d\'enregistrer le rendez-vous'
        formError.value = message
        toast.error('Erreur', message)
    } finally {
        saving.value = false
    }
}

onMounted(() => {
    loadOptions()
})
</script>
