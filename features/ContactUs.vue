<template>
  <nuxt-link
    :class="['group flex w-full items-center transition-colors', {
      'gap-[1.2rem]': isSmall,
      'gap-[2.4rem] h1 mb:gap-[1.6rem]': isLarge,
      'text-white': !asButton && !isActive,
      't1sb min-h-[4.8rem] bg-white px-[2.4rem] py-[1.2rem] text-black w-max': asButton,
      'text-black bg-white hover:text-white hover:bg-black': isActive,
      'hover:text-black hover:bg-white': !isActive
    }]"
    :to="PATH"
    @click="handleClick"
  >
    <span
      :class="[{
        'border-b-white border-b-4 mb:border-b-[.3rem]': isLarge && !asButton && !withoutBorder,
      }]"
    >
      Связаться с нами
    </span>

    <div
      :class="['flex justify-end', {
        'grow': isActive,
        'group-hover:grow': !isActive,
      }]"
    >
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
  </nuxt-link>
</template>

<script setup lang="ts">
import ArrowRight from 'public/svgs/arrowRight.svg'

defineOptions({
  name: 'ContactUsFeature'
})

const PATH = '/contact-us'

const isActive = isActiveLinks(PATH);

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
  return isLarge.value ? 64 : 20
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

