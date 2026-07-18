<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { versions, version, select } = useDocsVersion()
const { t } = useI18n()

const items = computed<DropdownMenuItem[]>(() => versions.map(v => ({
  label: v.label,
  icon: v.icon,
  suffix: t(`version.${v.name}`),
  ...(v.name === version.value.name
    ? { type: 'checkbox' as const, checked: true }
    : { onSelect: () => select(v) })
})))
</script>

<template>
  <div class="mb-3 lg:mb-6">
    <UDropdownMenu
      :items="items"
      :content="{ align: 'start' }"
      :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width)' }"
    >
      <UButton
        color="neutral"
        variant="outline"
        block
        :icon="version.icon"
        trailing-icon="i-lucide-chevron-down"
        :ui="{ base: 'justify-start', trailingIcon: 'ms-auto' }"
      >
        <span class="text-highlighted">{{ version.label }}</span>
        <span class="text-muted">{{ t(`version.${version.name}`) }}</span>
      </UButton>

      <template #item-label="{ item }">
        {{ item.label }}
        <span class="ms-1 text-muted">{{ item.suffix }}</span>
      </template>
    </UDropdownMenu>
  </div>
</template>
