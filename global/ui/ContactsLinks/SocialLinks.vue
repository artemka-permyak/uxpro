<template>
  <div
    :class="['flex flex-col', {
      'gap-[1.6rem]': !props.isSmallGap,
      'gap-[1.2rem]': props.isSmallGap,
    }]"
  >
    <a
      v-for="link in SOCIAL_LINKS"
      :key="link.id"
      :href="link.to"
      target="_blank"
      class="animated-link t1sb"
    >
      {{ link.title }}
    </a>
  </div>
</template>

<script setup lang="ts">
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
