import { defineNuxtConfig } from 'nuxt/config';
import eslint from 'vite-plugin-eslint';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    'nuxt-windicss',
  ],
  experimental: {
    externalVue: true,
    payloadExtraction: true
  },
  runtimeConfig: {
    public: {
      API_URL: 'https://jsonplaceholder.typicode.com',
    },
  },
  vite: {
    plugins: [eslint()],
  },
});
