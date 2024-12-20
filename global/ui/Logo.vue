<script setup lang="ts">
  import getImageDomainLink from '@/global/lib/imageDomainLink'

  defineOptions({
    name: 'LogoImg',
  })

  const LOGO_PATH = getImageDomainLink('/images/logo.png')
</script>

<template>
  <NuxtImg
    :src="LOGO_PATH"
    alt="Logo"
  />
</template>
