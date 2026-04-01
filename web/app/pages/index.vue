<template>
  <div>
    <h1>Home</h1>
    <p v-if="auth.isLoggedIn">Vous êtes connecté</p>
    <p v-else>Vous n'êtes pas connecté</p>
    <p v-if="auth.user">Utilisateur: {{ auth.user.firstname }} {{ auth.user.lastname }}</p>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()
useHead({
  title: 'Accueil',
})
</script>