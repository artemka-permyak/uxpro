<template>
  <div class="relative z-20 h-[6.2rem] w-full flex items-center gap-gap bg-black mb:gap-mbGap">
    <div class="grow w-[50%]">
      <HeaderMenuLogoLink />
    </div>

    <div class="h-full w-[50%] flex items-center gap-gap grow only-desktop">
      <ContactUsFeature
        size="small"
        class="grow p-[1.6rem]"
      />

      <div
        v-if="tg"
        class="h-full shrink-0 only-desktop"
      >
        <FilledLink
          :href="tg.to"
          target="_blank"
          class="h-full flex items-center px-[1.6rem]"
        >
          {{ tg.title }}
        </FilledLink>
      </div>
    </div>

    <div
      class="only-mobile w-[4.8rem] flex flex-col gap-[.6rem]"
      @click="handleClickBurger"
    >
      <div
        v-for="item in 2"
        :key="`burger-mobile-${item}`"
        class="w-full h-[.2rem] bg-white"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ContactUsFeature from '@/features/ContactUs.vue'
import HeaderMenuLogoLink from '@/widgets/Header/HeaderMenuLogoLink.vue'
import { FilledLink } from '@/global/ui'
import { SOCIAL_LINKS } from '~/global/const'

defineOptions({
  name: 'HeaderMenuWidget',
});

const emit = defineEmits<{
  (event: 'open:modal-burger'): void
}>()

const tg = computed(() => {
  return SOCIAL_LINKS.find(link => link.id === 'telegram')
})

// const MENU_ITEMS_ID = {
//   PORTFOLIO: 'portfolio',
//   SERVICES: 'services',
//   ABOUT: 'about',
//   CONTACT: 'contact',
// }

// const MENU_ITEMS = [
  // {
  //   title: 'Портфолио',
  //   id: MENU_ITEMS_ID.PORTFOLIO,
  //   to: '',
  //   disabled: true,
  // },
  // {
  //   title: 'Услуги',
  //   id: MENU_ITEMS_ID.SERVICES,
  //   to: '',
  //   disabled: true,
  // },
  // {
  //   title: 'О нас',
  //   id: MENU_ITEMS_ID.ABOUT,
  //   to: '/',
  // },
  // {
  //   title: 'Контакты',
  //   id: MENU_ITEMS_ID.CONTACT,
  //   to: '',
  //   disabled: true,
  // },
// ]

// const activeLinksIndexes = isActiveLinks(MENU_ITEMS.map(item => item.to));

// const isActiveLink = computed(() => {
//   const activeIndex = activeLinksIndexes.value.findIndex(active => active)
//
//   if (activeIndex === -1) {
//     return {}
//   }
//
//   return MENU_ITEMS[activeIndex]
// })

function handleClickBurger() {
  emit('open:modal-burger');
}
</script>
