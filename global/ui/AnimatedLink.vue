<template>
  <nuxt-link
    :href="props.href"
    :to="props.to"
    v-bind="$attrs"
    class="relative overflow-hidden group transition-colors hover:text-black"
    @click="handleClick"
  >
    <span class="relative z-10">
      <slot />
    </span>

    <span class="absolute inset-0 -z-10 bg-white translate-y-[-110%] transition-transform group-hover:translate-y-0" />
  </nuxt-link>
</template>

<script setup lang="ts">
  const props = defineProps<{
    href: string
    to?: string
  } | {
    href?: string
    to: string
  }>()

  const emit = defineEmits<{
    (event: 'click'): void
  }>()

  function handleClick() {
    emit('click')
  }
</script>
