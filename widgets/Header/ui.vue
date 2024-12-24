<template>
  <header
    :class="['relative overflow-hidden flex flex-col-reverse bg-black mb:flex-col-reverse mb:gap-gap mb:pb-mbGap', {
      'pb-[47.6rem]': !isShow,
      'gap-mbGap': isMain,
      'gap-[6.4rem]': !isMain,
    }]"
  >
    <div
      v-if="isShow"
      class="flex flex-col-reverse mb:flex-col-reverse mb:gap-mbGap pb-0 gap-mbGap"
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

      <div
        v-if="isMain"
        class="relative h-[39rem] px-gap overflow-hidden mb:h-[43rem] mb:px-mbGap"
      >
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
      @open:modal-burger="handleOpenModalBurger"
    />

    <transition name="fade">
      <div
        v-if="isShowStickyTopHeader"
        class="fixed bg-black top-0 left-0 right-0 z-20"
      >
        <HeaderMenuWidget
          class="max-w-[192rem] mx-auto shadow-xl px-gap mb:px-mbGap"
          @open:modal-burger="handleOpenModalBurger"
        />
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

const emit = defineEmits<{
  (event: 'open:modal-burger'): void
}>()

const isMain = isMainPage()

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

    isShowStickyTopHeader.value = !entry?.isIntersecting && entry.boundingClientRect.bottom < 0;
  }, {
    threshold: 0
  })

  if (headerMenuWidget.value) {
    observer.value.observe(headerMenuWidget.value.$el)
  }
})

function handleOpenModalBurger() {
  emit('open:modal-burger');
}
</script>

