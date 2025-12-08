<template>
  <NuxtLink
    :href="href"
    :to="to"
    class="group flex items-center justify-center relative z-10 overflow-hidden group transition-colors hover:text-black px-size-1"
    v-bind="$attrs"
  >
    <span
      :class="['relative z-10 flex items-center justify-center gap-size-3', contentClass]"
    >
      <slot />

      <Icon
        v-if="icon"
        :name="icon"
        :size="iconSize"
        class="transition-transform group-hover:translate-x-size-1"
      />
    </span>

    <span class="absolute inset-0 -z-10 bg-white translate-y-[-110%] transition-transform group-hover:translate-y-0" />
  </NuxtLink>
</template>

<script setup lang="ts">
import { Icon } from '@/global/ui'

const props = defineProps<{
  href?: string
  to?: string | object
  icon?: string
  iconSize?: string
  contentClass?: string
}>()

const {
  href,
  to,
  icon,
  iconSize,
  contentClass
} = toRefs(props)
</script>
