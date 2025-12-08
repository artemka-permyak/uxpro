<template>
  <Link
    :href="getDomainLink('/files/uxpro-presentation.pdf')"
    target="_blank"
    download
  >
    <div class="flex gap-[1.6rem]">
      {{ LABELS.title }}

      <Icon
        name="download-simple"
        :size="30"
        class="max-xl-plus:hidden"
      />

      <Icon
        name="download-simple"
        size="lg"
        class="xl-plus:hidden"
      />
    </div>
  </Link>
</template>

<script setup lang="ts">
import { Link, Icon } from '@/global/ui'
import { getDomainLink } from '@/global/lib'

defineOptions({
  name: 'DownloadPresentation'
})

const LABELS = {
  title: 'Скачать презентацию'
}
</script>
