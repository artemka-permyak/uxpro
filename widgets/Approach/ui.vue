<template>
  <SplitBlock
    right-width="1140px"
    class="px-gap mb:px-[1.6rem]"
  >
    <template #left>
      <BlockHeader>
        {{ LABELS.title }}
      </BlockHeader>
    </template>

    <template #right>
      <div class="flex flex-col gap-[6.4rem] mb:gap-[3.2rem]">
        <div class="flex flex-col gap-gap">
          <h2
            class="h2"
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
import { SplitBlock } from '@/global/ui'
import ContactUsFeature from '~/features/ContactUs.vue'
import { BlockHeader } from '~/features'

defineOptions({
  name: 'ApproachWidget'
})

const LABELS = {
  title: 'Подход',
  info: `
    Наша специфика&nbsp;— работа в&nbsp;качестве внешней команды
    над&nbsp;цифровым продуктом крупных компаний, когда не&nbsp;хватает
    собственных ресурсов, компетенций и правильно
    расставленных приоритетов
  `,
  infoDescription: `
    Наш&nbsp;принцип: поиск лучших решений и&nbsp;прозрачность процессов.
    Мы&nbsp;тщательно анализируем текущее состояние проектов, обсуждаем концепцию
    со&nbsp;стейкхолдерами и&nbsp;актуализируем её, презентуя наше видение.
    Также&nbsp;честны в&nbsp;том, что&nbsp;касается бюджета: не&nbsp;навязываем
    лишние услуги и&nbsp;честно предупреждаем о&nbsp;рисках
  `,
  contactUs: 'Связаться с нами',
}
</script>
