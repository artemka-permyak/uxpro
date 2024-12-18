<script setup lang="ts">
  defineOptions({
    name: 'LogoImg',
  })

  const LOGO_PATH = '/images/logo.png'
</script>

<template>
  <NuxtImg
    :src="LOGO_PATH"
    alt="Logo"
  />
</template>
