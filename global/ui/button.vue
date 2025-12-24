<template>
  <button
    :type="type"
    class="text-t1-bold max-xl:text-t2-bold py-size-4 max-xl:py-size-3 px-size-7 max-xl:px-size-6 flex items-center justify-center gap-size-2 bg-white-100 text-black-100 rounded-full cursor-pointer transition-colors hover:bg-white-hover active:bg-white-active"
  >
    <slot />

    <Icon
      name="arrow-right"
      size="lg"
      class="max-xl:hidden"
    />

    <Icon
      name="arrow-right"
      size="md"
      class="xl:hidden"
    />
  </button>
</template>

<script setup lang="ts">
import Icon from '~/global/ui/icon.vue'

defineOptions({
  name: 'ButtonUi'
})

const props = withDefaults(defineProps<{
  type?: 'button' | 'submit',
}>(), {
  type: 'submit',
})

const {
  type,
} = toRefs(props)
</script>
