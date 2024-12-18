<template>
  <SplitBlock
    right-width="1140"
    class="px-gap mb:px-[1.6rem]"
  >
    <template #left>
      <p class="text-grey text-[3.2rem] leading-[3.6rem] only-desktop">
        {{ LABELS.title }}
      </p>

      <p class="text-grey t1sb only-mobile">
        {{ LABELS.title }}
      </p>
    </template>

    <template #right>
      <div class="flex flex-col gap-[6.4rem] mb:gap-[3.2rem]">
        <div class="flex flex-col gap-gap">
          <h1
            class="h1"
            v-html="LABELS.info"
          />

          <p
            class="t1sb text-grey max-w-[98.8rem] only-desktop"
            v-html="LABELS.infoDescription"
          />

          <p
            class="t1 w-full text-grey only-mobile"
            v-html="LABELS.infoDescription"
          />
        </div>

        <ContactUsFeature size="large" />
      </div>
    </template>
  </SplitBlock>
</template>

<script setup lang="ts">
import { getSplitBlockTitle, SplitBlock } from '@/shared/ui'
import ContactUsFeature from '~/features/ContactUs.vue'

defineOptions({
  name: 'TransparencyWidget'
})

const LABELS = {
  title: getSplitBlockTitle('Прозрачность'),
  info: `
    Мы&nbsp;разрабатываем современные системы идентификации, которые помогают
    повысить ценность и&nbsp;конкурентоспособность услуг.
  `,
  infoDescription: `
    Мы — брендинговая студия, специализирующаяся на&nbsp;разработке фирменного стиля
    и&nbsp;веб-сайтов для&nbsp;клиентов в&nbsp;IT и&nbsp;консалтинге. С&nbsp;помощью актуального и&nbsp;практичного
    дизайна мы поддерживаем компании, стремящиеся к&nbsp;развитию и&nbsp;успеху.
  `,
  contactUs: 'Связаться с нами',
}
</script>
