export interface DocsVersion {
  name: 'latest' | 'deprecated'
  label: string
  suffix: string
  icon: string
  path: string
  collection: 'docs' | 'docsv1'
}

const versions: DocsVersion[] = [
  {
    name: 'latest',
    label: 'v2.23.0',
    suffix: 'latest',
    icon: 'i-lucide-box',
    path: '/',
    collection: 'docs'
  },
  {
    name: 'deprecated',
    label: 'v1.2.9',
    suffix: 'deprecated',
    icon: 'i-lucide-package',
    path: '/v1.x',
    collection: 'docsv1'
  }
]

export const useDocsVersion = () => {
  const route = useRoute()
  const router = useRouter()

  const version = computed(() => versions.find(v => v.name === (route.path.startsWith('/v1.x') ? 'deprecated' : 'latest'))!)

  function select(v: DocsVersion) {
    if (v.name === version.value.name) {
      return
    }

    router.push(v.name === 'deprecated' ? '/v1.x/guide' : '/guide')
  }

  return {
    versions,
    version,
    select
  }
}
