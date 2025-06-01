<script setup lang="ts">
  import getDomainLink from '~/global/lib/domainLink'

  defineOptions({
    name: 'LogoImg',
  })

  const LOGO_PATH = getDomainLink('/images/logo.png')
</script>

<template>
  <NuxtImg
    :src="LOGO_PATH"
    alt="Logo"
    format="webp"
    preload
  />
</template>
