<template>
  <div
    :class="['flex', {
      'gap-[1.6rem]': !props.isSmallGap,
      'gap-[0.8rem]': props.isSmallGap,
    }]"
  >
    <AnimatedLink
      :href="`tel:${PHONE}`"
      class="t1sb"
    >
      {{ PHONE }},
    </AnimatedLink>

    <AnimatedLink
      :href="`mailto:${EMAIL}`"
      class="t1sb"
    >
      {{ EMAIL }}
    </AnimatedLink>
  </div>
</template>

<script setup lang="ts">
import { EMAIL, PHONE } from '@/global/const'
import AnimatedLink from '~/global/ui/AnimatedLink.vue'

defineOptions({
  name: 'EmailAndPhone'
})

const props = defineProps<{
  isSmallGap?: boolean
}>()
</script>
