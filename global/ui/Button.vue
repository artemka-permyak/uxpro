<template>
  <button
    :type="type"
    :class="['flex items-center justify-between gap-[1.2rem] px-[2.4rem] w-max bg-white text-black transition-all hover:bg-black hover:text-white hover:w-full border border-transparent border-solid hover:border-white', {
      'h-[6.2rem] py-[1.6rem]': size === 'large',
      'h-[4.5rem] py-[1.2rem]': size === 'small',
    }]"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ButtonUi'
})

const props = withDefaults(defineProps<{
  type: 'button' | 'submit',
  size: 'small' | 'large'
}>(), {
  type: 'submit',
  size: 'large',
})

const {
  type,
  size,
} = toRefs(props)

const emit = defineEmits<{
  (e: 'click'): void
}>()

function handleClick() {
  emit('click')
}
</script>
