<template>
  <div class="relative h-screen border-b border-b-black pt-[3.2rem] overflow-hidden mb:h-[calc(100vh-6.2rem)]">
    <VideoUi
      class="absolute inset-0 w-full h-full object-cover"
      :src="getDomainLink('/video/video-logo.mp4')"
      :poster="getDomainLink('/images/video-logo-poster.png')"
    />

    <div class="h-full relative z-10 flex flex-col justify-between pb-[4.8rem] mb:justify-end mb:pb-[2.4rem]">
      <div
        ref="logo"
        class="px-gap only-desktop"
      >
        <LogoImg class="w-[86rem]" />
      </div>

      <div class="flex items-end justify-between gap-gap px-gap mb:items-start mb:flex-col">
        <h2
          class="h2 only-desktop grow"
          v-html="LABELS.title"
        />

        <div class="only-mobile flex flex-col gap-[2.4rem]">
          <h1
            class="h1"
            v-html="LABELS.mobileTitle"
          />

          <ContactUsFeature
            as-button
          />
        </div>

        <CompanyAwards class="w-auto shrink-0" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoImg from '~/global/ui/Logo.vue'
import { CompanyAwards } from '~/features'
import { ContactUsFeature } from '~/features'
import VideoUi from '~/global/ui/Video.vue'
import { getDomainLink } from '~/global/lib'
import { useHeaderStore } from '~/global/store/header'

defineOptions({
  name: 'CompanyPreview'
})

const LABELS = {
  title: `
    Создаём дизайн<br>
    и проектируем сложные<br>
    цифровые продукты
  `,

  mobileTitle: `
    Создаём дизайн
    и&nbsp;проектируем сложные
    цифровые продукты
  `
}

const headerStore = useHeaderStore()

const {
  changeShowStickyHeader
} = headerStore

const observer = ref<IntersectionObserver | null>(null)
const logo = ref<Element | null>(null)

onMounted(() => {
  observer.value = new IntersectionObserver(entries => {
    const entry = entries[0]

    changeShowStickyHeader(!entry?.isIntersecting && entry.boundingClientRect.bottom < 0)
  }, {
    threshold: 0
  })

  if (logo.value) {
    observer.value.observe(logo.value)
  }
})
</script>
