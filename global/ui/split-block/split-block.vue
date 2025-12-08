<template>
  <div
    :class="['flex max-xl-plus:flex-col max-xl-plus:gap-size-6', {
      'gap-size-8': withGap
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
  </div>
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
