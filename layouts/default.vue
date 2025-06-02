<template>
  <div class="flex flex-col max-w-[192rem] m-auto text-white pb-[2.4rem] mb:pb-mbGap">
    <StickyHeader
      v-if="route.name !== 'index'"
      @open:modal-burger="handleOpenModalBurger"
    />

    <transition name="fade">
      <StickyHeader
        v-if="route.name === 'index' && isShowStickyHeader"
        class="w-full max-w-[192rem] only-desktop fixed top-0 z-20"
        @open:modal-burger="handleOpenModalBurger"
      />
    </transition>

    <StickyHeader
      v-if="route.name === 'index'"
      class="only-mobile"
      @open:modal-burger="handleOpenModalBurger"
    />

    <main
      :class="{
        'pt-[12.4rem] mb:pt-[3.2rem]': !isMain,
      }"
    >
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
import { FooterWidget } from '@/widgets/Footer'
import ContactUsFeature from '~/features/ContactUs.vue'
import { EmailAndPhone, SocialLinks } from '~/global/ui/ContactsLinks'
import HeaderMenuLogoLink from '~/widgets/Header/HeaderMenuLogoLink.vue'
import Close from 'public/svgs/close.svg'
import { disablePageScroll, enablePageScroll } from '@fluejs/noscroll'
import StickyHeader from '~/widgets/StickyHeader/ui.vue'
import { useHeaderStore } from '~/global/store/header'

defineOptions({
  name: 'LayoutDefault'
})

const headerStore = useHeaderStore()

const {
  isShowStickyHeader
} = storeToRefs(headerStore)

const route = useRoute()

const isShowModalBurger = ref(false)

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
</script>
