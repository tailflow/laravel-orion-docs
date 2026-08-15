<script setup lang="ts">
import type { Collections } from '@nuxt/content'
import { en, ja, ko, zh_cn } from '@nuxt/ui/locale'

const { seo } = useAppConfig()
const locale = useDocsLocale()
const { version } = useDocsVersion()
const collection = useDocsCollection()

const uiLocales = { en, ja, ko, zh: zh_cn }
const uiLocale = computed(() => uiLocales[locale.value])

// The key must include the locale: prerendering shares useAsyncData payloads
// across pages by key (sharedPrerenderData), so a locale-blind key would leak
// one locale's navigation into every page.
const { data: navLatest } = await useAsyncData(computed(() => `navigation-${locale.value}`), () => {
  // Non-default locales get a `/{locale}` root node (page: false) from the
  // prefixed collection — unwrap it, same as the `/v1.x` node below.
  return queryCollectionNavigation(`docs_${locale.value}` as keyof Collections)
    .then(nav => locale.value === 'en' ? nav : (nav[0]?.children ?? []))
})
const { data: navV1 } = await useAsyncData('navigation-v1', () => {
  // Unwrap the `/v1.x` root node (page: false) returned by the prefixed collection
  return queryCollectionNavigation('docsv1').then(nav => nav[0]?.children ?? [])
})

const navigation = computed(() => version.value.name === 'latest' ? (navLatest.value ?? []) : (navV1.value ?? []))

// Version- and locale-scoped search sections; `useSearchCollection` stalls
// hydration when called in the root setup, so we feed the `files` prop instead
// (refetched on collection change).
const { open: searchOpen } = useContentSearch()
const { data: files, status: searchStatus, execute: loadSearch } = useLazyAsyncData('search', () => queryCollectionSearchSections(collection.value), {
  server: false,
  immediate: false,
  watch: [collection]
})

watch(searchOpen, (value) => {
  if (value && (searchStatus.value === 'idle' || searchStatus.value === 'error')) {
    loadSearch()
  }
})

if (!import.meta.dev) {
  useScript('https://scripts.simpleanalyticscdn.com/latest.js')
}

const localeHead = useLocaleHead({ lang: true, seo: true })

const route = useRoute()
const isV1 = computed(() => route.path.startsWith('/v1.x'))

useHead(() => ({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ...(localeHead.value.meta || []).filter(m => !isV1.value || m.property !== 'og:locale:alternate')
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    ...(localeHead.value.link || []).filter(l => !isV1.value || l.rel === 'canonical')
  ],
  htmlAttrs: {
    lang: localeHead.value.htmlAttrs?.lang
  }
}))

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  twitterCard: 'summary_large_image'
})

provide('navigation', navigation)
</script>

<template>
  <UApp :locale="uiLocale">
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
        :loading="searchStatus === 'pending'"
      />
    </ClientOnly>
  </UApp>
</template>
