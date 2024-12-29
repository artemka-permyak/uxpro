<template>
  <footer class="flex flex-col gap-[9.6rem] pt-[19.2rem] px-gap mb:px-mbGap mb:pt-[12.8rem]">
    <NuxtImg
      :src="getImageDomainLink('/images/footer-bg.png')"
      alt="Footer"
      class="only-desktop object-contain"
    />

    <NuxtImg
      :src="getImageDomainLink('/images/footer-mobile-bg.png')"
      alt="Footer"
      class="only-mobile"
    />

    <div class="w-full flex justify-between mb:flex-col mb:justify-start mb:gap-gap">
      <div class="flex flex-col gap-gap w-[44.4rem] mb:order-1 mb:w-full mb:gap-[2.4rem]">
        <EmailAndPhone is-small-gap />

        <span class="t1sb">
          {{ LABELS.address }}
        </span>
      </div>

      <div class="flex flex-col justify-center gap-[2.6rem] w-[62.2rem] text-center mb:order-3 mb:w-full mb:justify-start mb:text-start">
        <p class="font-SoyuzGrotesk text-[3.8rem] leading-[3.7rem] mb:text-[2.4rem] mb:leading-[2.3rem]">
          {{ LABELS.mainText }}
        </p>

        <span class="t1sb">
          {{ copyright }}
        </span>
      </div>

      <SocialLinks
        is-small-gap
        class="w-[44.4rem] items-end mb:order-2 mb:w-full mb:items-start"
      />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { EmailAndPhone, SocialLinks } from '@/global/ui/ContactsLinks'
import { getImageDomainLink } from '@/global/lib'

defineOptions({
  name: 'FooterWidget'
})

const LABELS = {
  address: 'Петербург, ул. Льва Толстого 1-3',
  mainText: 'Ведем путь к идеальным цифровым решениям',
}

const copyright = computed(() => {
  return `© ${new Date().getFullYear()} UxPRO`
})
</script>
