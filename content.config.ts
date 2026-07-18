import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const schema = z.object({
  links: z.array(z.object({
    label: z.string(),
    icon: z.string(),
    to: z.string(),
    target: z.string().optional()
  })).optional()
})

// One landing + docs collection pair per locale. Non-default locales keep their
// locale prefix in the content path so `queryCollection(col).path(route.path)`
// works without path arithmetic (same trick as `docsv1` at /v1.x).
const locales = ['en', 'ja', 'ko', 'zh'] as const

const collections: Record<string, ReturnType<typeof defineCollection>> = {
  docsv1: defineCollection({
    type: 'page',
    source: {
      include: 'v1.x/**'
    },
    schema
  })
}

for (const locale of locales) {
  const prefix = locale === 'en' ? '' : `/${locale}`

  collections[`landing_${locale}`] = defineCollection({
    type: 'page',
    source: {
      include: `${locale}/index.md`,
      prefix
    }
  })

  collections[`docs_${locale}`] = defineCollection({
    type: 'page',
    source: {
      include: `${locale}/**`,
      exclude: [`${locale}/index.md`],
      prefix
    },
    schema
  })
}

export default defineContentConfig({ collections })
