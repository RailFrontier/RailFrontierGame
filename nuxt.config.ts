// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['assets/index.scss'],
  modules: ['@pinia/nuxt', 'vue3-swatches/nuxt'],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/RailFrontier/Rodalies_de_Catalunya_símbol.svg' } // Aquí se enlaza el favicon
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  experimental: {
    viewTransition: true
  }
})
