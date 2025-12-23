<template>
  <div class="h-svh border-b border-b-black pt-size-8 overflow-hidden max-xl-plus:h-[calc(100svh-6.2rem)]">
    <VideoUi
      class="absolute top-0 left-0 right-0 w-full h-svh max-h-svh object-cover"
      :src="getStorageLink('/video/video-logo.mp4')"
      :poster="getStorageLink('/images/video-logo-poster.png')"
      preload="metadata"
    />

<!--    TODO 68% -->
    <div
      class="absolute z-10 top-0 left-0 right-0 h-svh max-h-svh bg-black/[68%]"
    />

    <div class="h-full relative z-10 flex flex-col justify-between pb-size-12 max-xl-plus:justify-end max-xl-plus:pb-size-6">
      <div
        ref="logo"
        class="px-size-8 only-desktop"
      >
        <LogoImg class="w-[86rem]" />
      </div>

      <div class="flex items-end justify-between gap-size-8 px-size-8 max-xl-plus:items-start max-xl-plus:flex-col max-xl-plus:px-0">
        <h2
          class="text-h2 only-desktop grow max-xl-plus:px-size-6"
          v-html="LABELS.title"
        />

        <div class="xl-plus:hidden flex flex-col gap-size-6 max-xl-plus:px-size-6">
          <h1
            class="text-h1"
            v-html="LABELS.mobileTitle"
          />

          <ButtonUi class="self-start">
            {{ LABELS.contactUs }}
          </ButtonUi>
        </div>

        <CompanyAwards class="w-auto shrink-0 max-xl-plus:pl-size-6" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CompanyAwards } from '~/features/company-awards'
import { getStorageLink } from '~/global/lib'
import { useHeaderStore } from '~/global/store/header'
import { ButtonUi, LogoImg, VideoUi } from '~/global/ui'

defineOptions({
  name: 'CompanyPreviewWidget'
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
  `,

  contactUs: 'Оставить заявку',
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
