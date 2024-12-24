<template>
  <component
    :is="asButton ? NuxtLink : AnimatedLink"
    :to="PATH"
    class="group w-full"
    @click="handleClick"
  >
    <div
      :class="['flex items-center', {
        'gap-[1.2rem]': isSmall,
        'gap-[2.4rem] h2 mb:gap-[1.6rem]': isLarge,
        't1sb min-h-[4.8rem] bg-white px-[2.4rem] py-[1.2rem] text-black w-max': asButton,
      }]"
    >
      <span>
        Связаться с нами
      </span>

      <div class="flex justify-end transition-transform group-hover:translate-x-[.8rem]">
        <ArrowRight
          :width="iconSize"
          :height="iconSize"
          class="only-desktop"
        />

        <ArrowRight
          :width="mobileIconSize"
          :height="mobileIconSize"
          class="only-mobile"
        />
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import ArrowRight from 'public/svgs/arrowRight.svg'
import AnimatedLink from '~/global/ui/AnimatedLink.vue'
import { NuxtLink } from '#components'

defineOptions({
  name: 'ContactUsFeature'
})

const PATH = '/contact-us'

const props = defineProps<{
  size: 'small' | 'large',
  asButton?: boolean,
  withoutBorder?: boolean
}>()

const isLarge = computed(() => {
  return props.size === 'large';
})

const isSmall = computed(() => {
  return props.size === 'small';
})

const iconSize = computed(() => {
  return isLarge.value ? 48 : 20
})

const mobileIconSize = computed(() => {
  return isLarge.value ? 44 : 20
})

const route = useRoute()

function handleClick() {
  if (route.fullPath.includes('/contact-us')) {
      const form = document.querySelector('#contactUsFormWidget');

      if (form) {
        form.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        });
      }
  }
}
</script>

