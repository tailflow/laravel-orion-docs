<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

defineProps<{
  headline?: string
  title?: string
  description?: string
}>()
</script>

<template>
  <div
    class="w-full h-full flex bg-neutral-950 relative overflow-hidden"
    data-theme="dark"
  >
    <div class="absolute top-0 left-0 w-1.5 h-full bg-primary-400" />

    <div class="flex flex-col justify-between flex-1 px-20 py-16">
      <div />

      <div class="flex flex-col gap-5">
        <span
          v-if="headline"
          class="text-2xl font-medium text-primary-400"
        >
          {{ headline }}
        </span>

        <h1
          v-if="title"
          class="text-6xl font-bold text-highlighted"
        >
          {{ title }}
        </h1>

        <p
          v-if="description"
          class="text-3xl/11 text-muted"
          :style="{ lineClamp: 2, textOverflow: 'ellipsis' }"
        >
          {{ description }}
        </p>
      </div>

      <div class="flex items-center gap-4">
        <svg
          class="size-8 text-primary-400"
          viewBox="0 0 1024 1070"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M445.783 0.00224395C400.193 -1.49569 91.4753 747.475 74.1316 786.422C56.7879 825.368 94.9441 908.254 171.752 878.795C248.56 849.335 405.975 774.438 434.881 729C463.787 683.563 491.372 1.50017 445.783 0.00224395Z"
            fill="currentColor"
          />
          <path
            d="M578.217 0.00224395C623.807 -1.49569 932.525 747.475 949.868 786.422C967.212 825.368 929.056 908.254 852.248 878.795C775.44 849.335 618.025 774.438 589.119 729C560.213 683.563 532.628 1.50017 578.217 0.00224395Z"
            fill="currentColor"
          />
          <path
            d="M882 1009.06C882 948.315 676.068 838.26 512 838C347.442 837.741 142 942.031 142 1009.06C142 1076.08 882 1069.8 882 1009.06Z"
            fill="currentColor"
          />
        </svg>
        <div class="h-px flex-1 bg-border" />
        <span class="text-xl text-dimmed">orion.tailflow.org</span>
      </div>
    </div>
  </div>
</template>
