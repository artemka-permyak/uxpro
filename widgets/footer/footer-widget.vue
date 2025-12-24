<template>
  <footer class="flex flex-col gap-[9.6rem] pt-[19.2rem] px-size-8 max-xl:px-size-6 max-xl:pt-[12.8rem]">
    <NuxtImg
      :src="getStorageLink('/images/footer-bg.png')"
      alt="Footer"
      class="only-desktop object-contain"
      loading="lazy"
      format="webp"
    />

    <NuxtImg
      :src="getStorageLink('/images/footer-mobile-bg.png')"
      alt="Footer"
      class="only-mobile"
      loading="lazy"
      format="webp"
    />

    <div class="w-full flex justify-between max-xl:flex-col max-xl:justify-start max-xl:gap-size-8">
      <div class="flex flex-col gap-size-8 w-[47rem] max-xl:order-1 max-xl:w-full max-xl:gap-[2.4rem]">
        <div class="flex flex-col gap-size-6">
          <SocialLinks
            :show-only="['telegram']"
            class="self-start"
          />

          <EmailAndPhone />
        </div>

        <span class="t1sb" v-html="LABELS.address" />
      </div>

      <div class="flex flex-col justify-center gap-[2.6rem] w-[62.2rem] text-center max-xl:order-3 max-xl:w-full max-xl:justify-start max-xl:text-start">
        <p
          class="font-soyuz-grotesk text-[3.8rem] leading-[3.7rem] max-xl:text-[2.4rem] max-xl:leading-[2.3rem]"
          v-html="LABELS.mainText"
        />

        <span class="t1sb">
          {{ copyright }}
        </span>
      </div>

      <SocialLinks
        :show-only="['dprofile', 'behance']"
        class="w-[44.4rem] justify-end items-end max-xl:order-2 max-xl:w-full max-xl:items-start"
      />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { EmailAndPhone, SocialLinks } from '@/global/ui/contact-links'
import { getStorageLink } from '@/global/lib'

defineOptions({
  name: 'FooterWidget'
})

const LABELS = {
  address: 'В Петербурге на улице Льва Толстого 1&#8209;3',
  mainText: 'Ведём путь к идеальным цифровым решениям',
}

const copyright = computed(() => {
  return `© ${new Date().getFullYear()} UxPRO`
})
</script>
