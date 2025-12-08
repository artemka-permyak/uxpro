<template>
  <div class="text-grey">
    <h3 class="text-h3 max-xl-plus:hidden">
      <slot />
    </h3>

    <h2 class="text-h2 xl-plus:hidden">
      <slot />
    </h2>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'BlockHeader'
})
</script>
