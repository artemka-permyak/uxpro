<template>
<!--  <header-->
<!--    :class="['relative overflow-hidden flex flex-col-reverse bg-black mb:flex-col-reverse mb:gap-gap', {-->
<!--      'gap-mbGap': isMain,-->
<!--      'gap-[6.4rem]': !isMain && !isContacts,-->
<!--      'gap-[3.2rem]': !isMain,-->
<!--    }]"-->
<!--  >-->
<!--    <div-->
<!--      v-if="isShowImgAndLinks"-->
<!--      class="flex flex-col-reverse mb:flex-col-reverse mb:gap-mbGap pb-0 gap-mbGap"-->
<!--    >-->
<!--      <div-->
<!--        v-if="isShow"-->
<!--        class="relative z-10 bg-black flex px-gap mb:px-mbGap mb:flex-col mb:gap-[2.4rem]"-->
<!--      >-->
<!--        <CompanyAwards-->
<!--          v-if="isMain"-->
<!--          class="only-mobile pt-mbGap"-->
<!--        />-->

<!--        <h1-->
<!--          class="h1 w-full grow"-->
<!--          v-html="store.getTitle"-->
<!--        />-->

<!--        <div class="w-full grow flex items-end only-desktop">-->
<!--          <CompanyAwards-->
<!--            v-if="isMain"-->
<!--            class="shrink-0"-->
<!--          />-->

<!--          <div class="w-full flex flex-col grow justify-end gap-gap">-->
<!--            <div class="flex flex-col gap-mbGap">-->
<!--              <SocialLinks-->
<!--                :show-only="['telegram']"-->
<!--                class="items-end"-->
<!--              />-->

<!--              <EmailAndPhone class="justify-end gap-[1.2rem]" />-->
<!--            </div>-->

<!--            <SocialLinks-->
<!--              class="w-full !flex-row items-end justify-end"-->
<!--              :show-only="['dprofile', 'behance']"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->

<!--        <ContactUsFeature-->
<!--          v-if="!isContacts"-->
<!--          size="small"-->
<!--          class="only-mobile"-->
<!--          as-button-->
<!--        />-->
<!--      </div>-->

<!--      <div-->
<!--        v-if="isMain"-->
<!--        class="relative px-gap overflow-hidden h-[45rem] mb:h-[43rem] mb:px-mbGap"-->
<!--      >-->
<!--        &lt;!&ndash;        <NuxtImg&ndash;&gt;-->
<!--        &lt;!&ndash;          :key="`${isMain}-${isContacts}-key`"&ndash;&gt;-->
<!--        &lt;!&ndash;          :src="bgImageDesktopSrc"&ndash;&gt;-->
<!--        &lt;!&ndash;          alt="Header bg"&ndash;&gt;-->
<!--        &lt;!&ndash;          format="webp"&ndash;&gt;-->
<!--        &lt;!&ndash;          preload&ndash;&gt;-->
<!--        &lt;!&ndash;          class="object-cover only-desktop w-full h-full"&ndash;&gt;-->
<!--        &lt;!&ndash;        />&ndash;&gt;-->

<!--        <NuxtImg-->
<!--          :src="getDomainLink('/images/header-mobile-bg.png')"-->
<!--          alt="Header bg"-->
<!--          format="webp"-->
<!--          preload-->
<!--          class="object-cover mx-auto only-mobile"-->
<!--        />-->
<!--      </div>-->
<!--    </div>-->

<!--    <HeaderMenuWidget-->
<!--      ref="headerMenuWidget"-->
<!--      class="px-gap border-t border-solid border-darkGrey mb:px-mbGap"-->
<!--      @open:modal-burger="handleOpenModalBurger"-->
<!--    />-->

<!--    <transition name="fade">-->
<!--      <div-->
<!--        v-if="isShowStickyTopHeader"-->
<!--        class="fixed bg-black top-0 left-0 right-0 z-20"-->
<!--      >-->
<!--        <HeaderMenuWidget-->
<!--          class="max-w-[192rem] mx-auto shadow-xl px-gap mb:px-mbGap"-->
<!--          @open:modal-burger="handleOpenModalBurger"-->
<!--        />-->
<!--      </div>-->
<!--    </transition>-->
<!--  </header>-->
</template>

<script setup lang="ts">
import { EmailAndPhone, SocialLinks } from '@/global/ui/ContactsLinks'

import { useHeaderStore } from '@/global/store/header'
import { getDomainLink } from '@/global/lib'

import HeaderMenuWidget from '@/widgets/Header/HeaderMenu.vue'
import { CompanyAwards, ContactUsFeature } from '@/features'

defineOptions({
  name: 'HeaderWidget',
});

const emit = defineEmits<{
  (event: 'open:modal-burger'): void
}>()

const isMain = isMainPage()
const isContacts = isContactsPage()

const PAGES_HEADERS = {
  'index': `
    Создаём дизайн
    и проектируем сложные цифровые
    продукты
  `,

  'contact-us': `
    Давайте познакомимся и
    обсудим ваш проект
  `,
}

const store = useHeaderStore();

const route = useRoute()

const bgImageDesktopSrc = computed(() => {
  const path = isMain.value
    ? 'header-bg.png'
    : isContacts.value
    ? 'contacts/contacts-bg.png'
      : 'project/project-bg.png'

  return getDomainLink(`/images/${path}`)
})

watch(() => route.path, () => {
  changeTitle()
}, {
  immediate: true
})

function changeTitle() {
  store.changeTitle(PAGES_HEADERS[route.name as keyof typeof PAGES_HEADERS])
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

const isShowImgAndLinks = computed(() => {
  return !['/policy', '/policy/'].includes(route.path)
})

function handleOpenModalBurger() {
  emit('open:modal-burger');
}
</script>

