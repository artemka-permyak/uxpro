<template>
  <div class="relative z-10 h-[6.2rem] w-full flex items-center gap-gap bg-black mb:gap-mbGap">
    <div class="grow w-[50%]">
      <HeaderMenuLogoLink />
    </div>

    <div class="w-[50%] flex items-center gap-gap grow only-desktop">
      <ContactUsFeature
        size="small"
        class="grow p-[1.6rem]"
      />

      <div class="shrink-0 only-desktop">
        <SocialLinks
          :show-only="['telegram']"
        />
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
import { SocialLinks } from '@/global/ui/ContactsLinks'

defineOptions({
  name: 'HeaderMenuWidget',
});

const emit = defineEmits<{
  (event: 'open:modal-burger'): void
}>()

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
