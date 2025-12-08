<template>
  <div class="max-xl-plus:text-t2 bg-white-8 text-white-100 px-size-6 max-xl-plus:px-size-5 py-size-3 max-xl-plus:py-size-2 rounded-full">
    <slot>
      {{ label }}
    </slot>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Tag',
})

const props = defineProps<{
  label?: string
}>()
</script>
