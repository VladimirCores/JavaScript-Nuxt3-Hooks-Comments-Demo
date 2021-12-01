import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
  buildModules: [
    'nuxt-windicss',
  ],
})
