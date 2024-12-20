<template>
  <header
    :class="['relative overflow-hidden flex flex-col bg-black mb:flex-col-reverse mb:gap-gap mb:pb-[1.6rem]', {
      'pb-[47.6rem]': !isShow,
      'flex-col-reverse gap-[1.6rem]': props.isReversed,
    }]"
  >
    <div
      v-if="isShow"
      :class="['flex flex-col mb:flex-col-reverse mb:gap-mbGap pb-0', {
        'gap-gap': !props.isReversed,
        'flex-col-reverse gap-mbGap': props.isReversed,
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
          :src="getImageDomainLink('/images/header-bg.png')"
          alt="Header bg"
          format="webp"
          preload
          class="object-cover only-desktop"
        />

        <NuxtImg
          :src="getImageDomainLink('/images/header-mobile-bg.png')"
          alt="Header bg"
          format="webp"
          preload
          class="object-cover mx-auto only-mobile"
        />
      </div>
    </div>

    <HeaderMenuWidget
      ref="headerMenuWidget"
      class="px-gap border-t border-solid border-darkGrey mb:px-mbGap"
    />

    <transition name="fade">
      <div
        v-if="isShowStickyTopHeader"
        class="fixed max-w-[192rem] mx-auto top-0 left-0 right-0 px-gap mb:px-mbGap z-20"
      >
        <HeaderMenuWidget />
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { EmailAndPhone, SocialLinks } from '@/global/ui/ContactsLinks'

import { useHeaderStore } from '@/global/store/header'
import { getImageDomainLink } from '@/global/lib'

import HeaderMenuWidget from '@/widgets/Header/HeaderMenu.vue'
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

watch(() => route.fullPath, () => {
  changeTitle()
}, {
  immediate: true
})

function changeTitle() {
  store.changeTitle(PAGES_HEADERS[route.fullPath as '/' | '/contact-us'])
}

const isShow = isShowFullHeader();

const isShowStickyTopHeader = ref(false)
const observer = ref<IntersectionObserver | null>(null)
const headerMenuWidget = ref<Element | null>(null)

onMounted(() => {
  observer.value = new IntersectionObserver(entries => {
    const entry = entries[0]

    isShowStickyTopHeader.value = !entry?.isIntersecting
  }, {
    rootMargin: '0px 0px 200px 0px',
    threshold: 0
  })

  if (headerMenuWidget.value) {
    observer.value.observe(headerMenuWidget.value.$el)
  }
})
</script>

