<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const route = useRoute()
const toast = useToast()
const { copy, copied } = useClipboard()
const site = useSiteConfig()
const { t } = useI18n()

const mdPath = computed(() => `${site.url}/raw${route.path}.md`)

const items = computed(() => [
  {
    label: t('page.copyMarkdownLink'),
    icon: 'i-lucide-link',
    onSelect() {
      copy(mdPath.value)
      toast.add({
        title: t('page.copiedToClipboard'),
        icon: 'i-lucide-check-circle'
      })
    }
  },
  {
    label: t('page.viewAsMarkdown'),
    icon: 'i-simple-icons:markdown',
    target: '_blank',
    to: `/raw${route.path}.md`
  },
  {
    label: t('page.openInChatGPT'),
    icon: 'i-simple-icons:openai',
    target: '_blank',
    to: `https://chatgpt.com/?hints=search&q=${encodeURIComponent(`Read ${mdPath.value} so I can ask questions about it.`)}`
  },
  {
    label: t('page.openInClaude'),
    icon: 'i-simple-icons:anthropic',
    target: '_blank',
    to: `https://claude.ai/new?q=${encodeURIComponent(`Read ${mdPath.value} so I can ask questions about it.`)}`
  }
])

async function copyPage() {
  copy(await $fetch<string>(`/raw${route.path}.md`))
}
</script>

<template>
  <UFieldGroup>
    <UButton
      :label="t('page.copyPage')"
      :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
      color="neutral"
      variant="outline"
      :ui="{
        leadingIcon: [copied ? 'text-primary' : 'text-neutral', 'size-3.5']
      }"
      @click="copyPage"
    />
    <UDropdownMenu
      :items="items"
      :content="{
        align: 'end',
        side: 'bottom',
        sideOffset: 8
      }"
      :ui="{
        content: 'w-48'
      }"
    >
      <UButton
        icon="i-lucide-chevron-down"
        size="sm"
        color="neutral"
        variant="outline"
        :aria-label="t('page.openCopyActionsMenu')"
      />
    </UDropdownMenu>
  </UFieldGroup>
</template>
