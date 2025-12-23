<template>
  <video
    v-bind="props"
  />
</template>

<script setup lang="ts">
defineOptions({
  name: 'VideoUi',
})

const props = withDefaults(defineProps<{
  autoplay?: boolean
  controls?: boolean
  muted?: boolean
  src: string
  poster?: string
  loop?: boolean
  playsinline?: boolean
  preload?: 'auto' | 'metadata' | 'none'
}>(), {
  autoplay: true,
  controls: false,
  muted: true,
  poster: '',
  loop: true,
  playsinline: true,
  preload: 'auto',
})
</script>
