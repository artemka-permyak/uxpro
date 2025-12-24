<template>
  <div class="flex flex-col m-auto text-white pb-size-6 max-xl:pb-size-6">
    <StickyHeaderWidget
      v-if="route.name !== 'index'"
      @open:modal-burger="handleOpenModalBurger"
    />

    <transition name="fade">
      <StickyHeaderWidget
        v-if="route.name === 'index' && isShowStickyHeader"
        class="w-full only-desktop fixed top-0 z-20"
        @open:modal-burger="handleOpenModalBurger"
      />
    </transition>

    <StickyHeaderWidget
      v-if="route.name === 'index'"
      class="only-mobile"
      @open:modal-burger="handleOpenModalBurger"
    />

    <main
      :class="['max-w-[192rem] w-full m-auto', {
        'pt-[12.4rem] max-xl:pt-[3.2rem]': !isMain && !['projects-slug', 'services'].includes(route.name),
        'max-xl:pt-[3.2rem]': route.name === 'projects-slug',
      }]"
    >
      <slot />
    </main>

    <FooterWidget class="max-w-[192rem] w-full m-auto" />

    <transition name="fade">
      <div
        v-if="isShowModalBurger"
        class="fixed inset-0 bg-[#090909CC] backdrop-blur z-20"
      >
        <div class="h-full flex flex-col gap-size-4 px-size-4 pb-size-6">
          <div class="flex items-center h-[6.2rem]">
            <HeaderLogoLink
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
            <div class="flex self-start flex-col gap-size-4">
              <nuxt-link
                v-for="menuItem in mobileMenuItems"
                :key="menuItem.id"
                :to="menuItem.to"
                class="self-start"
                @click="handleCloseModalBurger()"
              >
                {{ menuItem.title }}
              </nuxt-link>
            </div>

            <div class="flex flex-col gap-size-6">
              <EmailAndPhone />

              <SocialLinks class="self-start" />

              <ContactUsFeature
                class="self-start"
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
import { FooterWidget } from '@/widgets/footer'
import ContactUsFeature from '../features/contact-us-feature.vue'
import { EmailAndPhone, SocialLinks } from '~/global/ui/contact-links'
import { HeaderLogoLink } from '~/features/header'
import Close from '@/global/assets/svg/close.svg'
import { disablePageScroll, enablePageScroll } from '@fluejs/noscroll'
import { StickyHeaderWidget } from '~/widgets/sticky-header'
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

const mobileMenuItems = computed(() => {
  return [
    {
      id: 'services-in-menu',
      title: 'Услуги',
      to: {
        name: 'services'
      }
    }
  ]
})

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
