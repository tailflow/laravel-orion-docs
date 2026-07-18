export interface DocsVersion {
  name: 'latest' | 'deprecated'
  label: string
  icon: string
  path: string
}

const versions: DocsVersion[] = [
  {
    name: 'latest',
    label: 'v2.23.0',
    icon: 'i-lucide-box',
    path: '/'
  },
  {
    name: 'deprecated',
    label: 'v1.2.9',
    icon: 'i-lucide-package',
    path: '/v1.x'
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
