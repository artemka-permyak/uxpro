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
}>(), {
  autoplay: true,
  controls: false,
  muted: true,
  poster: '',
  loop: true,
})
</script>
