<template>
  <footer class="flex flex-col gap-[9.6rem] pt-[19.2rem] px-gap mb:px-mbGap mb:pt-[12.8rem]">
    <NuxtImg
      :src="getDomainLink('/images/footer-bg.png')"
      alt="Footer"
      class="only-desktop object-contain"
    />

    <NuxtImg
      :src="getDomainLink('/images/footer-mobile-bg.png')"
      alt="Footer"
      class="only-mobile"
    />

    <div class="w-full flex justify-between mb:flex-col mb:justify-start mb:gap-gap">
      <div class="flex flex-col gap-gap w-[47rem] mb:order-1 mb:w-full mb:gap-[2.4rem]">
        <div class="flex flex-col gap-mbGap">
          <SocialLinks
            is-small-gap
            :show-only="['telegram']"
          />

          <EmailAndPhone is-small-gap />
        </div>

        <span class="t1sb" v-html="LABELS.address" />
      </div>

      <div class="flex flex-col justify-center gap-[2.6rem] w-[62.2rem] text-center mb:order-3 mb:w-full mb:justify-start mb:text-start">
        <p
          class="font-SoyuzGrotesk text-[3.8rem] leading-[3.7rem] mb:text-[2.4rem] mb:leading-[2.3rem]"
          v-html="LABELS.mainText"
        />

        <span class="t1sb">
          {{ copyright }}
        </span>
      </div>

      <SocialLinks
        is-small-gap
        :show-only="['dprofile', 'behance']"
        class="w-[44.4rem] justify-end items-end mb:order-2 mb:w-full mb:items-start"
      />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { EmailAndPhone, SocialLinks } from '@/global/ui/ContactsLinks'
import { getDomainLink } from '@/global/lib'

defineOptions({
  name: 'FooterWidget'
})

const LABELS = {
  address: 'В Петербурге на улице Льва Толстого 1&#8209;3',
  mainText: 'Ведем путь к идеальным цифровым <span class="underline underline-offset-4 decoration-2">решениям</span>',
}

const copyright = computed(() => {
  return `© ${new Date().getFullYear()} UxPRO`
})
</script>
