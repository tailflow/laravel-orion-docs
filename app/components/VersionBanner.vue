<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { version } = useDocsVersion()

const currentPath = computed(() => route.path.replace(/^\/v1\.x/, '') || '/')
</script>

<template>
  <UAlert
    v-if="version.name === 'deprecated'"
    class="mt-8"
    color="warning"
    variant="subtle"
    icon="i-lucide-triangle-alert"
    :title="t('version.banner.title')"
    :description="t('version.banner.description')"
    :actions="[{
      label: t('version.banner.action'),
      color: 'warning',
      variant: 'outline',
      to: currentPath
    }]"
  />
</template>
