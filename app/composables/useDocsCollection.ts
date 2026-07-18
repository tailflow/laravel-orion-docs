export const docsLocales = ['en', 'ja', 'ko', 'zh'] as const
export type DocsLocale = typeof docsLocales[number]
export type DocsCollection = 'docsv1' | `docs_${DocsLocale}`

/**
 * The active content locale, derived from the route path. Unlike
 * `useI18n().locale`, this is already correct in the root component's setup
 * during SSR — the i18n route middleware only updates the locale ref after
 * root-level `useAsyncData` calls have resolved.
 */
export const useDocsLocale = () => {
  const route = useRoute()

  return computed<DocsLocale>(() => {
    const segment = route.path.split('/')[1] as DocsLocale
    return segment !== 'en' && docsLocales.includes(segment) ? segment : 'en'
  })
}

/**
 * The active docs collection, composed from the docs version and the locale.
 * The deprecated v1.x tree is English-only, so it ignores the locale.
 */
export const useDocsCollection = () => {
  const locale = useDocsLocale()
  const { version } = useDocsVersion()

  return computed(() => {
    return (version.value.name === 'deprecated' ? 'docsv1' : `docs_${locale.value}`) as DocsCollection
  })
}
