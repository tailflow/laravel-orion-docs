<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const { version } = useDocsVersion()

const items = computed<DropdownMenuItem[]>(() => locales.value.map(l => ({
  label: l.name,
  ...(l.code === locale.value
    ? { type: 'checkbox' as const, checked: true }
    : { onSelect: () => navigateTo(switchLocalePath(l.code)) })
})))
</script>

<template>
  <!-- The deprecated v1.x tree is English-only, so no switcher there -->
  <UDropdownMenu
    v-if="version.name !== 'deprecated'"
    :items="items"
    :content="{ align: 'end' }"
  >
    <UButton
      icon="i-lucide-languages"
      color="neutral"
      variant="ghost"
      :aria-label="t('header.selectLanguage')"
    />
  </UDropdownMenu>
</template>
