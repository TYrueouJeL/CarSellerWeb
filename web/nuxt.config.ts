// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-notify',
    '@nuxt/icon',
    '@pinia/nuxt'
  ],
  runtimeConfig: {
    apiUrl: process.env.NUXT_API_URL || 'http://api:3333',
    public: {
      apiUrl: '/api/'
    }
  },
  notify: {
    position: 'top-right',
    duration: 5000,
    maxToasts: 5,
    theme: 'dark',
    showIcon: true
  }
})