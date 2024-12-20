<template>
  <div class="relative z-10 h-[5.9rem] w-full flex items-center gap-gap bg-black mb:gap-mbGap">
    <HeaderMenuLogoLink class="mb:grow" />

    <div class="flex grow only-desktop">
      <nuxt-link
        v-for="menuItem in MENU_ITEMS"
        :key="menuItem.id"
        :class="['flex items-center justify-center min-w-[17.5rem] p-[1.6rem] transition-colors', {
          'text-white bg-black hover:text-black hover:bg-white': isActiveLink.to !== menuItem.to,
          'text-black bg-white hover:text-white hover:bg-black': isActiveLink.to === menuItem.to,
        }]"
        :to="menuItem.to"
      >
        {{ menuItem.title }}
      </nuxt-link>

      <ContactUsFeature
        size="small"
        class="p-[1.6rem]"
      />
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

    <transition name="fade">
      <div
        v-if="isShowModalBurger"
        class="fixed inset-0 bg-[#090909CC] backdrop-blur z-20"
      >
        <div class="h-full flex flex-col gap-[1.6rem] p-[1.6rem]">
          <div class="flex pb-[1.6rem]">
            <HeaderMenuLogoLink
              class="grow"
              @click="handleCloseModalBurger"
            />

            <Close
              width="24"
              height="24"
              class="text-white"
              @click="handleCloseModalBurger"
            />
          </div>

          <div class="flex flex-col justify-between grow">
            <div class="flex flex-col gap-[1.6rem]">
              <nuxt-link
                v-for="menuItem in MENU_ITEMS"
                :key="`mobile-${menuItem.id}`"
                class="flex items-center justify-center"
                :to="menuItem.to"
                @click="handleCloseModalBurger"
              >
                {{ menuItem.title }}
              </nuxt-link>
            </div>

            <div class="flex flex-col gap-[2.4rem]">
              <EmailAndPhone />

              <SocialLinks is-small-gap />

              <ContactUsFeature
                size="small"
                as-button
                @click="handleCloseModalBurger"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {disablePageScroll, enablePageScroll} from '@fluejs/noscroll';
import ContactUsFeature from '@/features/ContactUs.vue'
import HeaderMenuLogoLink from '@/widgets/Header/HeaderMenuLogoLink.vue'
import Close from '@/public/svgs/close.svg'
import { EmailAndPhone, SocialLinks } from '@/global/ui/ContactsLinks'

defineOptions({
  name: 'HeaderMenuWidget',
});

const MENU_ITEMS_ID = {
  PORTFOLIO: 'portfolio',
  SERVICES: 'services',
  ABOUT: 'about',
  CONTACT: 'contact',
}

const MENU_ITEMS = [
  {
    title: 'Портфолио',
    id: MENU_ITEMS_ID.PORTFOLIO,
    to: '/portfolio',
  },
  {
    title: 'Услуги',
    id: MENU_ITEMS_ID.SERVICES,
    to: '/services',
  },
  {
    title: 'О нас',
    id: MENU_ITEMS_ID.ABOUT,
    to: '/',
  },
  {
    title: 'Контакты',
    id: MENU_ITEMS_ID.CONTACT,
    to: '/contacts',
  },
]

const activeLinksIndexes = isActiveLinks(MENU_ITEMS.map(item => item.to));

const isActiveLink = computed(() => {
  const activeIndex = activeLinksIndexes.value.findIndex(active => active)

  if (activeIndex === -1) {
    return {}
  }

  return MENU_ITEMS[activeIndex]
})

const isShowModalBurger = ref(false);

watch(() => isShowModalBurger.value, value => {
  if (value) {
    disablePageScroll()
  } else {
    enablePageScroll()
  }
})

function handleClickBurger() {
  isShowModalBurger.value = true
}

function handleCloseModalBurger() {
  isShowModalBurger.value = false
}
</script>

<style scoped></style>
