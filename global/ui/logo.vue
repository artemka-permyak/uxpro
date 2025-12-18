<template>
  <NuxtImg
    :src="LOGO_PATH"
    alt="Logo"
    format="webp"
    preload
  />
</template>

<script setup lang="ts">
import getStorageLink from '~/global/lib/storage-link'

defineOptions({
  name: 'LogoImg',
})

const LOGO_PATH = getStorageLink('/images/logo.png')
</script>
