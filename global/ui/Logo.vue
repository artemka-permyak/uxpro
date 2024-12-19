<script setup lang="ts">
  defineOptions({
    name: 'LogoImg',
  })

  const LOGO_PATH = 'http://uxpro.ru/images/logo.png'
</script>

<template>
  <NuxtImg
    :src="LOGO_PATH"
    alt="Logo"
  />
</template>
