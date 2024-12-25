<template>
  <div>
    <button
      ref="buttonRef"
      :type="type"
      :class="['only-desktop flex items-center justify-between gap-[1.2rem] px-[2.4rem] w-max bg-white text-black transition-all hover:bg-black hover:text-white border border-transparent border-solid hover:border-white', {
        'h-[6.2rem] py-[1.6rem]': size === 'large',
        'h-[4.5rem] py-[1.2rem]': size === 'small',
      }]"
      @mouseenter="handleMouse('enter')"
      @mouseleave="handleMouse('leave')"
      @click="handleClick"
    >
      <slot />
    </button>

    <button
      :type="type"
      :class="['only-mobile flex items-center justify-between gap-[1.2rem] px-[2.4rem] w-max bg-white text-black transition-all hover:bg-black hover:text-white border border-transparent border-solid hover:border-white', {
        'h-[6.2rem] py-[1.6rem]': size === 'large',
        'h-[4.5rem] py-[1.2rem]': size === 'small',
      }]"
      @click="handleClick"
    >
      <slot />
    </button>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";

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

const buttonRef = ref<HTMLButtonElement | null>(null)
const buttonWidth = ref<number>(0)

function handleClick() {
  emit('click')
}

function handleMouse(type: 'enter' | 'leave') {
  gsap.to(buttonRef.value, {
    duration: .3,
    width: type === 'enter' ? '100%' : (buttonWidth.value ? `${buttonWidth.value}px` : ''),
  });
}

function handleResize() {
  buttonWidth.value = buttonRef.value?.offsetWidth ? buttonRef.value?.offsetWidth + 1 : 0
}

onMounted(() => {
  handleResize()

  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
