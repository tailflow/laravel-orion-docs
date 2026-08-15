import type { Nuxt } from '@nuxt/schema'
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
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    'nuxt-llms',
    // Nuxt tree-shakes `onServerPrefetch` from production client bundles, but
    // @nuxt/icon registers it in setup and Vue marks such instances as async
    // boundaries — server-only boundaries shift every useId (reka-ui a11y ids)
    // between the prerendered HTML and the hydrating client. Keep the hook in
    // the client bundle until https://github.com/vuejs/core/issues/12591 is
    // resolved. (A plain config override cannot remove entries: the schema
    // default is defu-merged, and defu concatenates arrays.)
    function keepOnServerPrefetch(_options: unknown, nuxt: Nuxt) {
      const client = nuxt.options.optimization?.treeShake?.composables?.client
      if (client?.vue) {
        client.vue = client.vue.filter(c => c !== 'onServerPrefetch')
      }
    }
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
    cloudflare: {
      wrangler: {
        assets: {
          html_handling: 'drop-trailing-slash'
        }
      }
    },
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

  // The Cloudflare preset detection flips the icon server bundle to `remote`,
  // making the prerenderer fetch icons from the Iconify API (and time out on
  // slow CI networks). The server bundle only exists at build time here, so
  // always read icons from the installed @iconify-json packages.
  icon: {
    serverBundle: 'local'
  },

  // These three inspections cannot handle CJK anchors: heading ids render as
  // raw unicode while markdown hrefs are percent-encoded (uppercase hex), so
  // the checker mis-compares strings that browsers resolve correctly.
  linkChecker: {
    skipInspections: ['missing-hash', 'no-uppercase-chars', 'no-non-ascii-chars']
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

  // nuxt-seo-utils' prerender HTML minifier rewrites every inline <style> and
  // <script> — including ones Vue renders inside #__nuxt (the shiki highlight
  // styles from @nuxt/content), which must match the client payload
  // byte-for-byte or hydration reports mismatches on every page.
  seo: {
    minify: false
  },

  sitemap: {
    exclude: ['/raw/**']
  }
})
