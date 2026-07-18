export type DocsCollection = 'docsv1' | `docs_${'en' | 'ja' | 'ko' | 'zh'}`

/**
 * The active docs collection, composed from the docs version and the locale.
 * The deprecated v1.x tree is English-only, so it ignores the locale.
 */
export const useDocsCollection = () => {
  const { locale } = useI18n()
  const { version } = useDocsVersion()

  return computed(() => {
    return (version.value.name === 'deprecated' ? 'docsv1' : `docs_${locale.value}`) as DocsCollection
  })
}
