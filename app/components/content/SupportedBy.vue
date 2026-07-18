<script setup lang="ts">
const light = {
  geecko: '/geecko-light.svg',
  laravelDaily: '/laravel-daily.png'
}
const dark = {
  geecko: '/geecko-dark.svg',
  laravelDaily: '/laravel-daily.png'
}
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3">
    <NuxtLink
      target="_blank"
      href="https://geecko.com?utm_campaign=opensource&utm_source=laravel-orion&utm_medium=docs"
      class="border-0"
    >
      <UColorModeImage
        :light="light.geecko"
        :dark="dark.geecko"
        class="m-0"
      />
    </NuxtLink>
    <NuxtLink
      class="ml-5 border-0"
      target="_blank"
      href="https://laraveldaily.com?utm_campaign=opensource&utm_source=laravel-orion&utm_medium=docs"
    >
      <UColorModeImage
        :light="light.laravelDaily"
        :dark="dark.laravelDaily"
        class="m-0"
        width="30%"
      />
    </NuxtLink>
  </div>
</template>
