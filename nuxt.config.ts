// https://nuxt.com/docs/api/configuration/nuxt-config

import { generateAntdColorThemes } from "@bg-dev/nuxt-naiveui/utils";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@bg-dev/nuxt-naiveui",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
  ],
  naiveui: {
    themeConfig: {
      ...generateAntdColorThemes({
        primary: "#2196F3",
      }),
    },
  },
  pwa: {
    devOptions: {
      enabled: true,
    },
  },
});
