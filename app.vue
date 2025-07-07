<template>
  <naive-config :breakpoints="breakPoints">
    <n-notification-provider>
      <n-message-provider>
        <n-dialog-provider>
          <nuxt-layout>
            <nuxt-pwa-manifest />
            <nuxt-page />
          </nuxt-layout>
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
  </naive-config>
</template>

<!-- eslint-disable perfectionist/sort-objects -->
<script lang="ts" setup>
const breakPoints = {
  xs: 0,
  s: 640, // matches Tailwind's 'sm'
  m: 768, // matches Tailwind's 'md'
  l: 1024, // matches Tailwind's 'lg'
  xl: 1280, // matches Tailwind's 'xl'
  xxl: 1536, // matches Tailwind's '2xl'
};
</script>
