<template>
  <div :class="['flex grow flex-col justify-end', {
    'gap-[1.6rem]': !props.isSmallGap,
    'gap-[0.8rem]': props.isSmallGap,
  }]">
    <a
      :href="`mailto:${EMAIL}`"
      class="animated-link t1sb"
    >
      {{ EMAIL }}
    </a>

    <a
      :href="`tel:${PHONE}`"
      class="animated-link t1sb"
    >
      {{ PHONE }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { EMAIL, PHONE } from '@/shared/const'

defineOptions({
  name: 'EmailAndPhone'
})

const props = defineProps<{
  isSmallGap?: boolean
}>()
</script>
