<template>
  <section class="w-full mx-auto px-size-8 max-xl-plus:px-size-4">
    <slot />
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Container'
})
</script>
