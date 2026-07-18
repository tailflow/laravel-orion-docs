<script setup lang="ts">
import type { NuxtError } from '#app'
import type { Collections } from '@nuxt/content'
import { en, ja, ko, zh_cn } from '@nuxt/ui/locale'

defineProps<{
  error: NuxtError
}>()

const { locale, t } = useI18n()

const uiLocales = { en, ja, ko, zh: zh_cn }
const uiLocale = computed(() => uiLocales[locale.value])

const localeHead = useLocaleHead({ lang: true, seo: true })

useHead(() => ({
  htmlAttrs: {
    lang: localeHead.value.htmlAttrs?.lang
  }
}))

useSeoMeta({
  title: t('error.title'),
  description: t('error.description')
})

const { data: navigation } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation(`docs_${locale.value}` as keyof Collections)
    .then(nav => locale.value === 'en' ? nav : (nav[0]?.children ?? []))
})
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections(`docs_${locale.value}` as keyof Collections), {
  server: false
})

provide('navigation', navigation)
</script>

<template>
  <UApp :locale="uiLocale">
    <AppHeader />

    <UError :error="error" />

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </UApp>
</template>
