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
    siteName: 'Orion for Laravel'
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
    bottom: {
      edit: 'https://github.com/tailflow/laravel-orion-docs-new/edit/main/content',
      // `label` values are i18n keys, resolved at the usage site
      links: [{
        icon: 'i-lucide-star',
        label: 'toc.starOnGitHub',
        to: 'https://github.com/tailflow/laravel-orion',
        target: '_blank'
      }]
    }
  }
})
