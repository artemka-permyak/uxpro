<template>
  <div class="text-grey">
    <h3 class="h3 only-desktop">
      <slot />
    </h3>

    <h2 class="h2 only-mobile">
      <slot />
    </h2>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'BlockHeader'
})
</script>
