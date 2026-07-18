import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const contentDir = fileURLToPath(new URL('./content', import.meta.url))

const locales = ['en', 'ja', 'ko', 'zh'] as const

/**
 * Collect the route path of every content page. Used to prerender routes the
 * crawler cannot discover from '/': `/raw/<path>.md` links only appear inside
 * a client-side dropdown menu, and the whole `/v1.x` tree is only reachable
 * through the version-switcher dropdown — without this hook they would 404 on
 * static hosting.
 */
function collectContentPaths(dir: string, prefix = ''): string[] {
  const paths: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name.startsWith('_')) {
      continue
    }
    const segment = entry.name.replace(/^\d+\./, '')
    if (entry.isDirectory()) {
      paths.push(...collectContentPaths(join(dir, entry.name), `${prefix}/${segment}`))
    } else if (segment.endsWith('.md')) {
      const stem = segment.slice(0, -'.md'.length)
      const path = stem === 'index' ? prefix : `${prefix}/${stem}`
      if (path) {
        paths.push(path)
      }
    }
  }
  return paths
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    'nuxt-llms'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://orion.tailflow.org',
    name: 'Orion for Laravel'
  },

  colorMode: {
    preference: 'dark'
  },

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1
        },
        highlight: {
          langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'php', 'bash']
        }
      }
    },
    experimental: {
      sqliteConnector: 'native'
    }
  },

  experimental: {
    asyncContext: true
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  hooks: {
    'prerender:routes'(ctx) {
      const trees = [
        ...locales.map(locale => ({ dir: locale as string, prefix: locale === 'en' ? '' : `/${locale}` })),
        { dir: 'v1.x', prefix: '/v1.x' }
      ]
      for (const { dir, prefix } of trees) {
        for (const path of collectContentPaths(join(contentDir, dir), prefix)) {
          ctx.routes.add(path)
          // Landing pages (path === prefix) are MDC component pages with no
          // raw-markdown mirror.
          if (path !== prefix) {
            ctx.routes.add(`/raw${path}.md`)
          }
        }
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  // The og-image default font set has no CJK glyphs; Noto Sans JP/KR/SC cover
  // the localized titles. `global: true` is required for the OG renderer to
  // see the font data.
  fonts: {
    families: [
      { name: 'Noto Sans JP', weights: [400, 700], global: true },
      { name: 'Noto Sans KR', weights: [400, 700], global: true },
      { name: 'Noto Sans SC', weights: [400, 700], global: true }
    ]
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    baseUrl: 'https://orion.tailflow.org',
    detectBrowserLanguage: false,
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'ja', language: 'ja-JP', name: '日本語', file: 'ja.json' },
      { code: 'ko', language: 'ko-KR', name: '한국어', file: 'ko.json' },
      { code: 'zh', language: 'zh-CN', name: '简体中文', file: 'zh.json' }
    ]
  },

  llms: {
    domain: 'https://orion.tailflow.org',
    title: 'Orion for Laravel',
    description: 'The simplest way to create REST API with Laravel.',
    full: {
      title: 'Orion for Laravel - Full Documentation',
      description: 'This is the full documentation for Orion for Laravel.'
    },
    sections: [
      {
        title: 'Guide',
        contentCollection: 'docs_en',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/guide%' }
        ]
      },
      {
        title: 'TypeScript SDK',
        contentCollection: 'docs_en',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/typescript-sdk%' }
        ]
      }
    ]
  },

  ogImage: {
    zeroRuntime: true
  },

  // The /raw/*.md mirror routes are for LLM consumption, not search engines
  robots: {
    disallow: ['/raw']
  },

  sitemap: {
    exclude: ['/raw/**']
  }
})
