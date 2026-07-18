<script setup lang="ts">
import type { Collections } from '@nuxt/content'
import { en, ja, ko, zh_cn } from '@nuxt/ui/locale'

const { seo } = useAppConfig()
const { locale } = useI18n()
const { version } = useDocsVersion()
const collection = useDocsCollection()

const uiLocales = { en, ja, ko, zh: zh_cn }
const uiLocale = computed(() => uiLocales[locale.value])

const { data: navLatest } = await useAsyncData('navigation', () => {
  // Non-default locales get a `/{locale}` root node (page: false) from the
  // prefixed collection — unwrap it, same as the `/v1.x` node below.
  return queryCollectionNavigation(`docs_${locale.value}` as keyof Collections)
    .then(nav => locale.value === 'en' ? nav : (nav[0]?.children ?? []))
}, { watch: [locale] })
const { data: navV1 } = await useAsyncData('navigation-v1', () => {
  // Unwrap the `/v1.x` root node (page: false) returned by the prefixed collection
  return queryCollectionNavigation('docsv1').then(nav => nav[0]?.children ?? [])
})

const navigation = computed(() => version.value.name === 'latest' ? (navLatest.value ?? []) : (navV1.value ?? []))

// Version- and locale-scoped search sections; `useSearchCollection` stalls
// hydration when called in the root setup, so we feed the `files` prop instead
// (refetched on collection change).
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections(collection.value), {
  server: false,
  watch: [collection]
})

if (!import.meta.dev) {
  useScript('https://scripts.simpleanalyticscdn.com/latest.js')
}

const localeHead = useLocaleHead({ lang: true, seo: true })

useHead(() => ({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ...(localeHead.value.meta || [])
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    ...(localeHead.value.link || [])
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
      />
    </ClientOnly>
  </UApp>
</template>
