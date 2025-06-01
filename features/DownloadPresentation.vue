<template>
  <AnimatedLink
    :href="getDomainLink('/files/uxpro-presentation.pdf')"
    target="_blank"
    download
  >
    <div class="flex gap-[1.6rem]">
      {{ LABELS.title }}

      <DownloadSimpleIcon
        width="30"
        height="30"
        class="only-desktop"
      />

      <DownloadSimpleIcon
        width="24"
        height="24"
        class="only-mobile"
      />
    </div>
  </AnimatedLink>
</template>

<script setup lang="ts">
import DownloadSimpleIcon from '@/public/svgs/downloadSimple.svg'
import AnimatedLink from '@/global/ui/AnimatedLink.vue'
import { getDomainLink } from '@/global/lib'

defineOptions({
  name: 'DownloadPresentation'
})

const LABELS = {
  title: 'Скачать презентацию'
}
</script>
