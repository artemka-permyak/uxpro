<template>
  <NuxtImg
    :src="LOGO_PATH"
    alt="Logo"
    format="webp"
    preload
  />
</template>

<script setup lang="ts">
import getDomainLink from '~/global/lib/domain-link'

defineOptions({
  name: 'LogoImg',
})

const LOGO_PATH = getDomainLink('/images/logo.png')
</script>
