<template>
  <component
    :is="isNuxtLink ? NuxtLink : 'a'"
    :href="props.href"
    :to="props.to"
    v-bind="$attrs"
    class="t1sb relative z-10 overflow-hidden group transition-colors hover:text-black"
    @click="handleClick"
  >
    <span class="relative z-10">
      <slot />
    </span>

    <span class="absolute inset-0 -z-10 bg-white translate-y-[-110%] transition-transform group-hover:translate-y-0" />
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

const props = withDefaults(defineProps<{
  isNuxtLink?: boolean
  href?: string
  to?: string | object
}>(), {
  isNuxtLink: true,
  href: undefined,
  to: undefined,
})

const emit = defineEmits<{
  (event: 'click'): void
}>()

function handleClick() {
  emit('click')
}
</script>
