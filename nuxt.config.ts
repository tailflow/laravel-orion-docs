import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const contentDir = fileURLToPath(new URL('./content', import.meta.url))

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
    'nuxt-og-image',
    'nuxt-llms'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

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
      for (const path of collectContentPaths(contentDir)) {
        ctx.routes.add(path)
        ctx.routes.add(`/raw${path}.md`)
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
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/guide%' }
        ]
      },
      {
        title: 'TypeScript SDK',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/typescript-sdk%' }
        ]
      }
    ]
  },

  ogImage: {
    zeroRuntime: true
  }
})
