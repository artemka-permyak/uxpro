<template>
  <section
    :class="['flex mb:flex-col mb:gap-[2.4rem]', {
      'gap-gap': withGap
    }]"
  >
    <div
      :class="['grow', {
        'w-full': !rightStyles
      }]"
    >
      <slot name="left" />
    </div>

    <div
      class="w-full grow only-desktop"
      :style="rightStyles"
    >
      <slot name="right" />
    </div>

    <div class="w-full grow only-mobile">
      <slot name="right" />
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SplitBlock'
})

const props = defineProps<{
  rightWidth?: string | number | null,
  withGap?: boolean
}>()

const rightStyles = computed(() => {
  return props.rightWidth ? {
    width: `${props.rightWidth}px`,
    maxWidth: `${props.rightWidth}px`
  } : undefined
})
</script>
