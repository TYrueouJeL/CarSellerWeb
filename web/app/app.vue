<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()

onMounted(() => {
  auth.me()
})
</script>
