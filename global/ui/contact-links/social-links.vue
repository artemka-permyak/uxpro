<template>
  <div class="flex flex-col gap-size-3">
    <Link
      v-for="link in filteredSocialLinks"
      :key="link.id"
      :href="link.to"
      target="_blank"
      class="justify-start"
    >
      {{ link.title }}
    </Link>
  </div>
</template>

<script setup lang="ts">
import { Link } from '~/global/ui'
import { SOCIAL_LINKS } from '~/global/const'

defineOptions({
  name: 'SocialLinks'
})

const props = withDefaults(defineProps<{
  isSmallGap?: boolean
  showOnly?: string[]
}>(), {
  showOnly: () => SOCIAL_LINKS.map(link => link.id)
})

const filteredSocialLinks = computed(() => {
  return props.showOnly && props.showOnly.length ? SOCIAL_LINKS.filter(link => props.showOnly?.includes(link.id)) : SOCIAL_LINKS
})
</script>
