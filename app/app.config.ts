export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate'
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    }
  },
  seo: {
    siteName: 'Orion for Laravel - The simplest way to create REST API with Laravel'
  },
  header: {
    title: '',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/tailflow/laravel-orion',
      'target': '_blank',
      'aria-label': 'Orion for Laravel on GitHub'
    }]
  },
  footer: {
    credits: 'Copyright © 2019-2026 Aleksei Zarubin',
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-x',
      'to': 'https://x.com/alexzarbn',
      'target': '_blank',
      'aria-label': 'Orion for Laravel creator on X'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/tailflow/laravel-orion',
      'target': '_blank',
      'aria-label': 'Orion for Laravel on GitHub'
    }]
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/tailflow/laravel-orion-docs-new/edit/main/content',
      links: [{
        icon: 'i-lucide-star',
        label: 'Star on GitHub',
        to: 'https://github.com/tailflow/laravel-orion',
        target: '_blank'
      }]
    }
  }
})
