<template>
  <header class="sticky top-0 z-50 bg-slate-900/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_32px_rgba(0,0,0,0.3)]">
    <div class="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between gap-8">
      <nuxt-link to="/" class="flex items-center gap-2 no-underline group">
        <span class="text-2xl text-blue-400 leading-none">⬡</span>
        <span class="font-bold text-xl tracking-tight text-white font-sans group-hover:opacity-80 transition-opacity">
            Car<strong class="text-blue-400">Seller</strong>
        </span>
      </nuxt-link>

      <nav class="flex items-center gap-1 text-sm">
        <nuxt-link to="/" class="text-white/65 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md transition-all duration-200">Accueil</nuxt-link>
        <nuxt-link to="/locations" class="text-white/65 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md transition-all duration-200">Locations</nuxt-link>
        <nuxt-link to="/ventes" class="text-white/65 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md transition-all duration-200">Ventes</nuxt-link>

        <div class="w-px h-5 bg-white/15 mx-2"></div>

        <nuxt-link v-if="!auth.isLoggedIn" to="/auth/login" class="text-white/65 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md transition-all duration-200">Connexion</nuxt-link>
        <nuxt-link v-if="!auth.isLoggedIn" to="/auth/register" class="text-white font-medium bg-blue-600 hover:bg-blue-500 border border-blue-400/30 px-4 py-1.5 rounded-md transition-all duration-200 hover:-translate-y-px">Inscription</nuxt-link>
        
        <nuxt-link v-if="auth.isLoggedIn" to="/rendez-vous" class="text-white/65 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md transition-all duration-200">Mes rendez-vous</nuxt-link>
        <nuxt-link v-if="auth.isLoggedIn" to="/tickets" class="text-white/65 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md transition-all duration-200">Mes tickets</nuxt-link>
        <nuxt-link v-if="auth.isLoggedIn" to="/compte" class="text-white/65 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md transition-all duration-200">Mon compte</nuxt-link>
        <button v-if="auth.isLoggedIn" @click="auth.logout()" class="text-red-400/75 hover:text-red-400 hover:bg-red-400/10 px-3 py-1.5 rounded-md transition-all duration-200">Déconnexion</button>
      </nav>
    </div>
  </header>

  <main>
    <slot />
  </main>
</template>

<script setup lang="ts">
const auth = useAuthStore()
</script>