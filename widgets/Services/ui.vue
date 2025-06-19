<template>
  <div class="flex flex-col gap-[6.4rem] mb:gap-gap">
    <BlockHeader class="px-gap">
      {{ LABELS.title }}
    </BlockHeader>

    <div class="flex flex-col border-t border-t-darkGrey">
      <div
        v-for="(service, index) in SERVICES"
        :key="service.id"
        class="group flex items-end px-[2.4rem] py-gap border-b border-b-darkGrey hover:text-black hover:bg-white hover:translate-x-[1.6rem] transition-all mb:flex-col mb:px-mbGap mb:py-[2.4rem] mb:gap-[1.6rem] mb:hover:translate-x-0 mb:items-start"
      >
        <div class="flex items-end gap-[9.6rem] w-[50%] mb:w-full">
          <p class="shrink-0 text-[2rem] leading-[2rem] only-desktop">
            {{ getSplitBlockTitle(`0${index + 1}`) }}
          </p>

          <h2 class="h2 grow mb:w-full">
            {{ service.title }}
          </h2>
        </div>

        <div
          class="t1sb w-[50%] text-grey transition-colors group-hover:text-black mb:w-full"
          :style="{
            maxWidth: service.descriptionWidth
          }"
        >
          {{ service.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSplitBlockTitle } from '@/global/ui'
import { BlockHeader } from '~/features'

defineOptions({
  name: 'ServicesWidget'
})

const LABELS = {
  title: 'Услуги',
}

const SERVICES = [
  {
    title: 'Проектирование',
    description: 'Информационная архитектура, user flow, прототипы, ux-тесты и проектный контроль',
    descriptionWidth: '50.6rem',
  },
  {
    title: 'Дизайн интерфейсов',
    description: 'Дизайн-концепции, дизайн-системы, контроль на этапе реализации',
  },
  {
    title: 'Исследования',
    description: 'Проверка гипотез, глубинные интервью и опросы, ux-тесты, работа со стейкхолдерами',
    descriptionWidth: '55.7rem',
  },
  {
    title: 'UX/UI аудит',
    description: 'Анализ метрик, основных user flow и эргономики интерфейса',
  },
].map((service, index) => ({
  ...service,
  id: `${service}-${index + 1}`
}))
</script>
