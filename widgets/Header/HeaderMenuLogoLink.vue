<template>
  <nuxt-link
    class="block h-[2.7rem]"
    :to="{
      name: 'index',
    }"
  >
    <Logo class="h-full" />
  </nuxt-link>
</template>

<script setup lang="ts">
import Logo from '@/global/ui/Logo.vue'
</script>
