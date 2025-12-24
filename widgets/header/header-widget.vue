<template>
  <div class="relative z-20 h-[5.6rem] w-full bg-black-90 max-xl:gap-size-6">
    <div class="h-full flex items-center gap-size-8 max-w-[192rem] m-auto px-size-8 max-xl:px-size-4 border-b border-b-dark-grey backdrop-blur-size-4">
      <div class="h-full grow flex items-center gap-size-6 w-[50%]">
        <HeaderLogoLink />

        <Link
          :to="{
            name: 'services'
          }"
          class="h-full px-size-7 max-xl:hidden"
        >
          {{ LABELS.services }}
        </Link>
      </div>

      <div class="h-full w-[50%] flex items-center grow max-xl:hidden">
        <ContactUsFeature
          class="h-full justify-start grow px-size-7"
        />

        <div
          v-if="tg"
          class="h-full shrink-0 only-desktop"
        >
          <Link
            :href="tg.to"
            target="_blank"
            class="h-full px-size-7"
          >
            <Icon
              name="telegram"
              size="lg"
            />

            {{ tg.title }}
          </Link>
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
  </div>
</template>

<script setup lang="ts">
import ContactUsFeature from '../../features/contact-us-feature.vue'
import { HeaderLogoLink } from '~/features/header'
import { Link } from '@/global/ui'
import { SOCIAL_LINKS } from '~/global/const'
import { Icon } from '~/global/ui'

defineOptions({
  name: 'HeaderMenuWidget',
})

const LABELS = {
  services: 'Услуги'
}

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
