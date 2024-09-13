import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/apollo'],

  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost:8000/graphql' 
      }
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: '2024-09-10'
})