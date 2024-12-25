<template>
  <div class="flex flex-col max-w-[192rem] m-auto text-white pb-[2.4rem] mb:pb-mbGap">
    <div
      :class="[{
        'pb-[3.2rem] mb:border-none mb:pb-0': isShow
      }]"
    >
      <div
        v-if="isShow && isMain"
        ref="stickyContainerRef"
        class="sticky top-0 w-full p-gap only-desktop z-0"
      >
        <LogoImg ref="logoRef" />
      </div>

      <HeaderWidget
        class="z-10"
        @open:modal-burger="handleOpenModalBurger"
      />
    </div>

    <main>
      <slot />
    </main>

    <FooterWidget />

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
            <!--            <div class="flex flex-col gap-[1.6rem]">-->
            <!--              <nuxt-link-->
            <!--                v-for="menuItem in MENU_ITEMS"-->
            <!--                :key="`mobile-${menuItem.id}`"-->
            <!--                :class="['flex items-center justify-center', {-->
            <!--                  'text-grey': menuItem.disabled-->
            <!--                }]"-->
            <!--                :to="menuItem.to"-->
            <!--                @click="menuItem.disabled ? undefined : handleCloseModalBurger()"-->
            <!--              >-->
            <!--                {{ menuItem.title }}-->
            <!--              </nuxt-link>-->
            <!--            </div>-->

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
import { gsap } from 'gsap'
import ScrollToPlugin from "gsap/ScrollToPlugin";

// Подключение плагина для прокрутки
gsap.registerPlugin(ScrollToPlugin);
import type { VNodeRef } from 'vue'

import { LogoImg } from '@/global/ui'
import { HeaderWidget } from '@/widgets/Header'
import { FooterWidget } from '@/widgets/Footer'
import ContactUsFeature from '~/features/ContactUs.vue'
import { EmailAndPhone, SocialLinks } from '~/global/ui/ContactsLinks'
import HeaderMenuLogoLink from '~/widgets/Header/HeaderMenuLogoLink.vue'
import Close from 'public/svgs/close.svg'
import { disablePageScroll, enablePageScroll } from '@fluejs/noscroll'
import { SmoothScroll } from '@/global/lib'

defineOptions({
  name: 'LayoutDefault'
})

const logoRef = ref<VNodeRef | null>(null);
const stickyContainerRef = ref<VNodeRef | null>(null);

const isShow = isShowFullHeader();

const isShowModalBurger = ref(false);

const isMain = isMainPage()

watch(() => isShowModalBurger.value, value => {
  if (value) {
    disablePageScroll()
  } else {
    enablePageScroll()
  }
})

function handleOpenModalBurger() {
  isShowModalBurger.value = true
}

function handleCloseModalBurger() {
  isShowModalBurger.value = false
}

function handleScroll() {
  const scrollY = window.scrollY;
  const stickyContainer = stickyContainerRef.value;
  const el = logoRef.value?.$el

  if (!el || !stickyContainer) return

  if (scrollY >= el.clientHeight + 32) {
    el.style.opacity = '0';
    el.style.visibility = 'hidden';

    stickyContainer.style.zIndex = '-1';
  } else {
    el.style.opacity = '';
    el.style.visibility = '';

    stickyContainer.style.zIndex = '';
  }
}

function handleWheel(event: WheelEvent) {
  const direction = event.deltaY >= 0
}

onMounted(() => {
  handleScroll();

  window.addEventListener('scroll', handleScroll)

  window.addEventListener('wheel', handleWheel)

  new SmoothScroll(document, 35, 10)
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('wheel', handleWheel)
});
</script>
