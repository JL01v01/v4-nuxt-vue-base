import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-10-10',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', 'vue-sonner/style.css'],
  modules: ['@nuxtjs/color-mode', '@nuxt/fonts'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  colorMode: {
    classSuffix: '',
  },
  build: {
    transpile: [
      'vee-validate',
      'vue-sonner',
    ],
  },
  nitro: {
    preset: 'cloudflare_module',
  },
  routeRules: {
    '/**': { static: true },
  },
})
