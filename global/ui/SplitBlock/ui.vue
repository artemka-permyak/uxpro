<template>
  <section
    :class="['flex mb:flex-col mb:gap-[2.4rem]', {
      'gap-gap': withGap
    }]"
  >
    <div
      :class="['grow shrink-0', {
        'w-[50%]': !rightStyles
      }]"
    >
      <slot name="left" />
    </div>

    <div
      class="w-[50%] grow only-desktop"
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
  rightWidth?: string
  withGap?: boolean
}>()

const rightStyles = computed(() => {
  return props.rightWidth ? {
    width: `${props.rightWidth}`,
    maxWidth: `${props.rightWidth}`
  } : undefined
})
</script>
