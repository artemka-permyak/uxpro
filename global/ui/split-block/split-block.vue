<template>
  <div
    :class="['flex max-xl:flex-col max-xl:gap-size-6', {
      'gap-size-8': withGap
    }]"
  >
    <div
      :class="['grow shrink-0', {
        'w-[50%] max-xl:w-full': !rightStyles
      }]"
    >
      <slot name="left" />
    </div>

    <div
      class="w-[50%] grow max-xl:hidden"
      :style="rightStyles"
    >
      <slot name="right" />
    </div>

    <div class="w-full grow xl:hidden">
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
