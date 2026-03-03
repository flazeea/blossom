// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon'
  ],
  css: ['/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }
      ]
    }
  },
})
