<template>
  <nuxt-link
    class="block h-[2.4rem]"
    :to="{
      name: 'index',
    }"
  >
    <Logo class="h-full" />
  </nuxt-link>
</template>

<script setup lang="ts">
import Logo from '~/global/ui/logo.vue'
</script>
