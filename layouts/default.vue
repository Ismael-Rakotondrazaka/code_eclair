<script setup lang="ts">
import type { MenuLinkRoute } from "#build/types/naiveui";
import { omit } from "es-toolkit";

/* ---------------------------------- Home ---------------------------------- */
const homeMenu: MenuLinkRoute = {
  icon: "mdi:home",
  label: "Accueil",
  to: {
    name: "index",
  },
};

/* --------------------------------- Routes --------------------------------- */

const routes = computed<MenuLinkRoute[]>(() =>
  [homeMenu].map((menu) => omit(menu, ["icon"]))
);

/* ------------------------------ Drawer routes ----------------------------- */
const drawerRoutes = computed<MenuLinkRoute[]>(() => [homeMenu]);

const year = computed(() => new Date().getFullYear());
</script>

<template>
  <NaiveLayoutNavbar
    :routes="routes"
    :drawer-routes="drawerRoutes"
    drawer-width="85%"
    toggle-icon="mdi:menu"
  >
    <template #start>
      <div>
        <NuxtLink
          :to="{
            name: 'index',
          }"
        >
          <NuxtImg
            src="/images/logos/logo-code-eclair.svg"
            width="32"
            height="32"
            class="inline-block mr-3"
          />
        </NuxtLink>
        <span class="font-bold text-[#2196F3]">Code Éclair</span
        ><span class="hidden lg:inline"
          >&nbsp;|&nbsp;Apprends vite. Révise fort. Réussis le Code.</span
        >
      </div>
    </template>

    <template #drawer-header> Code Éclair </template>

    <template #default>
      <slot />
    </template>

    <template #drawer-footer>
      <div class="text-center">
        <p class="text-sm">
          &copy;
          <span class="font-bold">Code Éclair</span> {{ year }}
          Tous droits réservés.
        </p>
      </div>
    </template>
  </NaiveLayoutNavbar>
</template>
