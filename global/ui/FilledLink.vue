<template>
  <component
    :is="asButton ? NuxtLink : AnimatedLink"
    :to="to"
    :href="href"
    :target="target"
    class="group w-full"
  >
    <div>
      <slot />
    </div>
  </component>
</template>

<script setup lang="ts">
import AnimatedLink from '~/global/ui/AnimatedLink.vue'
import { NuxtLink } from '#components'

defineOptions({
  name: 'ArrowFilledLink'
})

const props = withDefaults(defineProps<{
  asButton?: boolean,
  to?: string | object,
  href?: string
  target?: string
}>(),{
  to: undefined,
  href: undefined,
  target: '',
})

const {
  asButton,
  to,
  href,
  target,
} = toRefs(props)
</script>

