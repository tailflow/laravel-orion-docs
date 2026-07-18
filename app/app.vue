<script setup lang="ts">
const { seo } = useAppConfig()
const { version } = useDocsVersion()

const { data: navLatest } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'))
const { data: navV1 } = await useAsyncData('navigation-v1', () => {
  // Unwrap the `/v1.x` root node (page: false) returned by the prefixed collection
  return queryCollectionNavigation('docsv1').then(nav => nav[0]?.children ?? [])
})

const navigation = computed(() => version.value.collection === 'docs' ? (navLatest.value ?? []) : (navV1.value ?? []))

// Version-scoped search sections; `useSearchCollection` stalls hydration when
// called in the root setup, so we feed the `files` prop instead (refetched on
// version change).
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections(version.value.collection), {
  server: false,
  watch: [version]
})

if (!import.meta.dev) {
  useScript('https://scripts.simpleanalyticscdn.com/latest.js')
}

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  twitterCard: 'summary_large_image'
})

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <AppHeader />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </UApp>
</template>
