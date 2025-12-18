<template>
  <Container>
    <SplitBlock>
      <template #left>
        <BlockHeader>
          {{ title }}
        </BlockHeader>
      </template>

      <template #right>
        <div class="flex flex-col gap-size-12 max-xl-plus:gap-size-8">
          <div class="flex flex-col gap-size-6">
            <h2
              class="text-h2"
              v-html="$route.path === '/' ? 'Наша специфика — работа в качестве внешней команды над цифровым продуктом крупных компаний, когда не хватает собственных ресурсов, компетенций, выработанных процессов или правильно расставленных приоритетов' : info"
            />

            <div class="flex flex-col gap-size-6 text-grey max-w-[98.8rem] max-xl-plus:w-full">
              <p
                v-for="description in $route.path === '/' ? ['Наш принцип: поиск лучших решений и прозрачность процессов. Мы тщательно анализируем текущее состояние проектов, обсуждаем концепцию со стейкхолдерами и актуализируем её, презентуя наше видение. Также честны в том, что касается бюджета: не навязываем лишние услуги и честно предупреждаем о рисках'] : infoDescription"
                :key="description"
              >
                {{ description }}
              </p>
            </div>
          </div>

          <ContactUsFeature
            class="w-max text-h3 max-xl-plus:hidden"
            icon-size="2xl"
            :label="LABELS.contactUs"
          />

          <ContactUsFeature
            class="w-max text-h2 xl-plus:hidden"
            icon-size="lg"
            :label="LABELS.contactUs"
          />
        </div>
      </template>
    </SplitBlock>
  </Container>
</template>

<script setup lang="ts">
import { SplitBlock, BlockHeader, Container } from '@/global/ui'
import ContactUsFeature from '../../features/contact-us-feature.vue'

defineOptions({
  name: 'ApproachWidget'
})

const LABELS = {
  contactUs: 'Связаться с нами',
}

const {
  title,
  info,
  infoDescription,
} = await queryCollection('servicesApproach')
  .first()
</script>
