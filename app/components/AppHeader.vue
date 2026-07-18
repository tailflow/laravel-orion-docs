<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { header } = useAppConfig()
const localePath = useLocalePath()
</script>

<template>
  <UHeader
    :ui="{ center: 'flex-1' }"
    :to="localePath(header?.to || '/')"
  >
    <UContentSearchButton
      v-if="header?.search"
      :collapsed="false"
      class="w-full"
    />

    <template #left>
      <NuxtLink
        :to="localePath(header?.to || '/')"
        class="flex items-end gap-1.5"
      >
        <AppLogo class="w-auto h-8 shrink-0 text-primary" />

        <span class="text-lg font-bold text-highlighted">Orion for Laravel</span>
      </NuxtLink>
    </template>

    <template #right>
      <UContentSearchButton
        v-if="header?.search"
        class="lg:hidden"
      />

      <LanguageSelect />

      <UColorModeButton v-if="header?.colorMode" />

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <template #body>
      <UContentNavigation
        highlight
        :navigation="navigation"
      />
    </template>
  </UHeader>
</template>
