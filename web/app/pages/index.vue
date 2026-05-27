<template>
  <div class="bg-gray-50">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-slate-900 text-white">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-slate-900" />
      <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div class="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl" />

      <div class="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div class="max-w-2xl">
          <p v-if="auth.isLoggedIn && auth.user" class="text-blue-400 font-medium mb-3">
            Bonjour, {{ auth.user.firstname }} 👋
          </p>
          <h1 class="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Trouvez la voiture<br />
            <span class="text-blue-400">qui vous correspond</span>
          </h1>
          <p class="mt-6 text-lg text-white/70 leading-relaxed">
            Achat et location de véhicules d'occasion sélectionnés avec soin.
            Parcourez notre catalogue et prenez rendez-vous en quelques clics.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <NuxtLink
              to="/ventes"
              class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-md transition-colors"
            >
              Voir les véhicules à vendre
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
            <NuxtLink
              to="/locations"
              class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-md border border-white/20 transition-colors"
            >
              Véhicules en location
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Avantages -->
    <section class="max-w-7xl mx-auto px-6 py-16">
      <div class="text-center mb-12">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Pourquoi CarSeller ?</h2>
        <p class="mt-3 text-gray-600 max-w-xl mx-auto">
          Une plateforme simple pour acheter, louer et gérer vos démarches automobiles.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow-md p-6 text-center">
          <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 text-2xl">
            🚗
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Large choix</h3>
          <p class="text-sm text-gray-600">
            Des véhicules d'occasion vérifiés, filtrables par marque, prix, année et kilométrage.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 text-center">
          <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 text-2xl">
            📅
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Rendez-vous en ligne</h3>
          <p class="text-sm text-gray-600">
            Réservez un créneau pour essayer un véhicule ou rencontrer un conseiller.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 text-center">
          <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 text-2xl">
            🎫
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Suivi personnalisé</h3>
          <p class="text-sm text-gray-600">
            Gérez vos tickets et votre compte depuis votre espace client.
          </p>
        </div>
      </div>
    </section>

    <!-- Véhicules en vedette -->
    <section class="bg-white border-y border-gray-200">
      <div class="max-w-7xl mx-auto px-6 py-16">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Dernières arrivées</h2>
            <p class="mt-2 text-gray-600">Les 4 derniers véhicules à vendre</p>
          </div>
          <NuxtLink
            to="/ventes"
            class="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline shrink-0"
          >
            Voir tout le catalogue →
          </NuxtLink>
        </div>

        <div v-if="loadingVehicles" class="flex justify-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>

        <div v-else-if="vehicles.length === 0" class="text-center py-12 text-gray-500">
          Aucun véhicule disponible pour le moment.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink
            v-for="vehicle in vehicles"
            :key="vehicle.id"
            :to="`/ventes/${vehicle.id}`"
            class="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow block"
          >
            <div class="h-36 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
              <svg class="w-14 h-14 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 17h8M6 11h12l-1-4H7l-1 4zM5 17a2 2 0 104 0M15 17a2 2 0 104 0" />
              </svg>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-gray-900">
                {{ vehicle.model?.brand?.name }} {{ vehicle.model?.name }}
              </h3>
              <p class="text-sm text-gray-500 mt-1">{{ vehicle.year }} · {{ formatMileage(vehicle.mileage) }}</p>
              <p class="text-xl font-bold text-blue-600 mt-3">{{ formatPrice(vehicle.price) }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-7xl mx-auto px-6 py-16">
      <div class="bg-blue-600 rounded-xl p-8 md:p-12 text-center text-white">
        <h2 class="text-2xl md:text-3xl font-bold">Prêt à trouver votre prochain véhicule ?</h2>
        <p class="mt-3 text-blue-100 max-w-lg mx-auto">
          Créez un compte gratuit pour réserver un essai, suivre vos rendez-vous et contacter nos conseillers.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <NuxtLink
            v-if="!auth.isLoggedIn"
            to="/auth/register"
            class="bg-white text-blue-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-md transition-colors"
          >
            Créer un compte
          </NuxtLink>
          <NuxtLink
            v-if="!auth.isLoggedIn"
            to="/auth/login"
            class="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-md border border-blue-500 transition-colors"
          >
            Se connecter
          </NuxtLink>
          <NuxtLink
            v-else
            to="/ventes"
            class="bg-white text-blue-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-md transition-colors"
          >
            Parcourir les véhicules
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSalableVehicleService } from '~/services/salableVehicleService'

const auth = useAuthStore()

const { data: vehiclesResponse, pending: loadingVehicles } = await useAsyncData(
  'home-latest-salable-vehicles',
  () => useSalableVehicleService().list({
    preloads: ['model.brand'],
    page: 1,
    limit: 4,
    orderBy: 'created_at',
    orderDir: 'desc',
  }),
)

const vehicles = computed(() => {
  const data = vehiclesResponse.value
  if (!data) return []
  return Array.isArray(data) ? data : data.data ?? []
})

function formatPrice(price: number | null) {
  if (price === null) return 'Prix sur demande'
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
}

function formatMileage(mileage: number) {
  return new Intl.NumberFormat('fr-FR').format(mileage) + ' km'
}

useHead({ title: 'Accueil' })
</script>
