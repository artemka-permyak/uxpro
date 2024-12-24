<template>
  <div
    :class="['flex flex-col', {
      'gap-[1.6rem]': !props.isSmallGap,
      'gap-[1.2rem]': props.isSmallGap,
    }]"
  >
    <AnimatedLink
      v-for="link in SOCIAL_LINKS"
      :key="link.id"
      :href="link.to"
      target="_blank"
      class="t1sb"
    >
      {{ link.title }}
    </AnimatedLink>
  </div>
</template>

<script setup lang="ts">
import AnimatedLink from '~/global/ui/AnimatedLink.vue'

defineOptions({
  name: 'SocialLinks'
})

const props = defineProps<{
  isSmallGap?: boolean
}>()

const SOCIAL_LINKS = [
  {
    title: 'Telegram',
    id: 'Telegram',
    to: 'https://t.me/uxmerzlov',
  },

  {
    title: 'Dprofile',
    id: 'Dprofile',
    to: 'https://dprofile.ru/ux.pro',
  },

  {
    title: 'Behance',
    id: 'Behance',
    to: 'https://www.behance.net/merzlov',
  },
]
</script>
