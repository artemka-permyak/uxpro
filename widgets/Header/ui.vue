<template>
  <header
    :class="['relative overflow-hidden flex flex-col bg-black mb:flex-col-reverse mb:gap-gap mb:pb-[1.6rem]', {
      'pb-[47.6rem]': !isShow,
      'flex-col-reverse gap-[1.6rem]': props.isReversed,
    }]"
  >
    <transition name="fade">
      <div
        v-if="isShow"
        :class="['flex flex-col mb:flex-col-reverse mb:gap-gap pb-gap mb:pb-0', {
          'pb-gap': !props.isReversed,
          'flex-col-reverse gap-[1.6rem] pb-0': props.isReversed,
        }]"
      >
        <div class="relative z-10 bg-black flex px-gap mb:px-mbGap mb:flex-col mb:gap-[2.4rem]">
          <h1
            class="h1 w-full grow"
            v-html="store.getTitle"
          />

          <div class="w-full flex grow only-desktop">
            <EmailAndPhone class="gap-[1.2rem]" />

            <SocialLinks class="items-end justify-end" />
          </div>

          <ContactUsFeature
            size="small"
            class="only-mobile"
            as-button
          />
        </div>

        <div class="relative h-[39rem] px-gap overflow-hidden mb:h-[43rem] mb:px-mbGap">
          <NuxtImg
            src="http://uxpro.ru/images/header-bg.png"
            alt="Header bg"
            class="object-cover only-desktop"
          />

          <NuxtImg
            src="http://uxpro.ru/images/header-mobile-bg.png"
            alt="Header bg"
            class="object-cover mx-auto only-mobile"
          />
        </div>
      </div>
    </transition>

    <HeaderMenuWidget class="px-gap border-t border-solid border-darkGrey mb:px-mbGap" />
  </header>
</template>

<script setup lang="ts">
import { EmailAndPhone, SocialLinks } from '@/global/ui/ContactsLinks'

import HeaderMenuWidget from '@/widgets/Header/HeaderMenu.vue'
import { useHeaderStore } from '@/global/store/header'
import ContactUsFeature from '@/features/ContactUs.vue'

defineOptions({
  name: 'HeaderWidget',
});

const props = defineProps<{
  isReversed?: boolean
}>()

const PAGES_HEADERS = {
  '/': `
    Создаём дизайн
    и проектируем цифровые
    продукты
  `,

  '/contact-us': `
    Напишите нам и мы
    вместе придумаем
    что-то крутое!
  `,

  '/contact-us/': `
    Напишите нам и мы
    вместе придумаем
    что-то крутое!
  `
}

const store = useHeaderStore();

const route = useRoute()

store.changeTitle(PAGES_HEADERS[route.fullPath as '/' | '/contact-us'])

const isShow = isShowFullHeader();
</script>

