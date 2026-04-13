<template>
    <div class="flex min-h-screen bg-gray-50">
        <!-- Sidebar Filtres -->
        <aside class="hidden lg:block w-64 bg-white shadow-lg h-screen overflow-y-auto">
            <div class="p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-6">Filtres</h2>
                
                <!-- Filtre Prix -->
                <div class="mb-6">
                    <h3 class="text-sm font-medium text-gray-700 mb-3">Prix (EUR)</h3>
                    <div class="space-y-2">
                        <input type="number" v-model.number="filterOptions.minPrice" placeholder="Prix min" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm">
                        <input type="number" v-model.number="filterOptions.maxPrice" placeholder="Prix max" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm">
                    </div>
                </div>
                
                <!-- Filtre Kilométrage --> 
                <div class="mb-6">
                    <h3 class="text-sm font-medium text-gray-700 mb-3">Kilométrage (km)</h3>
                    <div class="space-y-2">
                        <input type="number" v-model.number="filterOptions.minMileage" placeholder="Min" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm">
                        <input type="number" v-model.number="filterOptions.maxMileage" placeholder="Max" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm">
                    </div>
                </div>
                
                <!-- Filtre Année -->
                <div class="mb-6">
                    <h3 class="text-sm font-medium text-gray-700 mb-3">Année</h3>
                    <div class="space-y-2">
                        <input type="number" v-model.number="filterOptions.minYear" placeholder="Année min" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm">
                        <input type="number" v-model.number="filterOptions.maxYear" placeholder="Année max" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm">
                    </div>
                </div>
                
                                
                <!-- Filtre Tri -->
                <div class="mb-6">
                    <h3 class="text-sm font-medium text-gray-700 mb-3">Trier par</h3>
                    <div class="space-y-2">
                        <select v-model="filterOptions.orderBy" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm">
                            <option value="created_at">Date d'ajout</option>
                            <option value="price">Prix</option>
                            <option value="mileage">Kilométrage</option>
                            <option value="year">Année</option>
                        </select>
                        <select v-model="filterOptions.orderDir" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm">
                            <option value="desc">Décroissant</option>
                            <option value="asc">Croissant</option>
                        </select>
                    </div>
                </div>
                
                <!-- Boutons d'action -->
                <div class="flex space-x-2">
                    <button @click="applyFilters" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                        Appliquer
                    </button>
                    <button @click="resetFilters" class="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium">
                        Réinitialiser
                    </button>
                </div>
            </div>
        </aside>

        <!-- Contenu Principal -->
        <main class="flex-1 overflow-auto">
            <!-- Header Mobile -->
            <div class="bg-white shadow-sm border-b lg:hidden">
                <div class="px-4 py-4 flex justify-between items-center">
                    <h1 class="text-xl font-bold text-gray-900">Véhicules d'occasion</h1>
                    <button class="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Header Desktop -->
            <div class="bg-white shadow-sm border-b hidden lg:block">
                <div class="max-w-7xl mx-auto px-6 py-6">
                    <div class="flex justify-between items-center">
                        <div>
                            <h1 class="text-3xl font-bold text-gray-900">Véhicules d'occasion</h1>
                            <p class="mt-2 text-gray-600">Découvrez notre sélection de véhicules de qualité</p>
                        </div>
                        <div class="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{{ total }} véhicules</span>
                        </div>
                    </div>
                </div>
            </div>
        
        <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center py-20">
                <div class="text-center">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p class="mt-4 text-gray-600">Chargement des véhicules...</p>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <div class="text-red-600 text-lg font-medium">Erreur de chargement</div>
                    <p class="mt-2 text-red-500">{{ error }}</p>
                    <button @click="fetchRecipes" class="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                        Réessayer
                    </button>
                </div>
            </div>

            <!-- Vehicle Grid -->
            <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div v-if="vehicles.length === 0" class="text-center py-20">
                    <div class="text-gray-400 text-lg">Aucun véhicule disponible</div>
                    <p class="mt-2 text-gray-500">Revenez consulter nos prochaines arrivées</p>
                </div>
                
                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <div v-for="vehicle in vehicles" :key="vehicle.id" 
                         class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                        
                        <!-- Vehicle Image Placeholder -->
                        <!-- <div class="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                            <div class="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                            <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <div class="absolute top-2 right-2">
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Disponible
                                </span>
                            </div>
                        </div> -->

                        <!-- Vehicle Info -->
                        <div class="p-4">
                            <div class="mb-3">
                                <h3 class="text-lg font-semibold text-gray-900">
                                    {{ vehicle.model?.brand?.name }} {{ vehicle.model?.name }}
                                </h3>
                                <p class="text-sm text-gray-500">{{ vehicle.year }} - {{ vehicle.registration }}</p>
                            </div>

                            <div class="space-y-2 mb-4">
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">Kilométrage</span>
                                    <span class="font-medium">{{ formatMileage(vehicle.mileage) }}</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">Année</span>
                                    <span class="font-medium">{{ vehicle.year }}</span>
                                </div>
                            </div>

                            <!-- Price -->
                            <div class="border-t pt-3">
                                <div class="flex items-center justify-between">
                                    <div class="text-2xl font-bold text-blue-600">
                                        {{ formatPrice(vehicle.price) }}
                                    </div>
                                    <button class="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                                        Détails
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <div class="flex flex-col items-center space-y-4 mt-8">
                <div class="text-sm text-gray-600 text-center">
                    Affichage de {{ (currentPage - 1) * 12 + 1 }} à {{ Math.min(currentPage * 12, total) }} sur {{ total }} véhicules
                </div>
                <div class="flex items-center space-x-2">
                    <button 
                        @click="changePage(currentPage - 1)"
                        :disabled="currentPage === 1"
                        class="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Précédent
                    </button>
                    <span class="text-sm text-gray-600">
                        Page {{ currentPage }} sur {{ totalPages }}
                    </span>
                    <button 
                        @click="changePage(currentPage + 1)"
                        :disabled="currentPage === totalPages"
                        class="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { useSalableVehicleService } from '~/services/salableVehicleService';

const vehicles = ref<any[]>([]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const total = ref<number>(0);
const currentPage = ref<number>(1);
const totalPages = ref<number>(1);

// Simple filter state
const filterOptions = ref({
    minPrice: null as number | null,
    maxPrice: null as number | null,
    minYear: null as number | null,
    maxYear: null as number | null,
    minMileage: null as number | null,
    maxMileage: null as number | null,
    orderBy: 'created_at' as 'price' | 'mileage' | 'year' | 'created_at',
    orderDir: 'desc' as 'asc' | 'desc'
});

const formatPrice = (price: number | null) => {
    if (price === null) return 'Prix sur demande';
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
};

const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('fr-FR').format(mileage) + ' km';
};

const changePage = async (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages.value) {
        currentPage.value = newPage;
        await applyFilters();
    }
};

const applyFilters = async () => {
    await fetchVehicles();
};

const resetFilters = async () => {
    filterOptions.value = {
        minPrice: null,
        maxPrice: null,
        minYear: null,
        maxYear: null,
        minMileage: null,
        maxMileage: null,
        orderBy: 'created_at',
        orderDir: 'desc'
    };
    await fetchVehicles();
};

const fetchVehicles = async () => {
    loading.value = true;
    error.value = null;
    
    try {
        // Build API parameters from filterOptions
        const params: any = {
            preloads: ['model.brand'],
            page: currentPage.value,
            limit: 12
        };

        // Add non-null filter values with correct backend naming
        if (filterOptions.value.minPrice !== null) params.min_price = filterOptions.value.minPrice;
        if (filterOptions.value.maxPrice !== null) params.max_price = filterOptions.value.maxPrice;
        if (filterOptions.value.minYear !== null) params.min_year = filterOptions.value.minYear;
        if (filterOptions.value.maxYear !== null) params.max_year = filterOptions.value.maxYear;
        if (filterOptions.value.minMileage !== null) params.min_mileage = filterOptions.value.minMileage;
        if (filterOptions.value.maxMileage !== null) params.max_mileage = filterOptions.value.maxMileage;
        if (filterOptions.value.orderBy !== 'created_at') params.order_by = filterOptions.value.orderBy;
        if (filterOptions.value.orderDir !== 'desc') params.order_dir = filterOptions.value.orderDir;

        console.log('Filter params sent to API:', params);
        const data = await useSalableVehicleService().list(params);
        vehicles.value = Array.isArray(data) ? data : data.data;
        total.value = Array.isArray(data) ? data.length : data.meta.total || 0;
        totalPages.value = Array.isArray(data) ? 1 : data.meta.lastPage || 1;
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Erreur inconnue';
    } finally {
        loading.value = false;
    }
};

const fetchRecipes = async () => {
    await fetchVehicles();
};

onMounted(() => {
    fetchRecipes();
});

useHead({
  title: 'Ventes',
})
</script>