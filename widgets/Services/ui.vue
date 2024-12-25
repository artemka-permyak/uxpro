<template>
  <div class="flex flex-col gap-[6.4rem] mb:gap-gap">
    <p class="pl-[23rem] text-[3.2rem] text-grey leading-[3.6rem] only-desktop">
      {{ LABELS.title }}
    </p>

    <p class="t1sb text-grey px-mbGap only-mobile">
      {{ LABELS.title }}
    </p>

    <div class="flex flex-col border-t border-t-darkGrey">
      <div
        v-for="(service, index) in SERVICES"
        :key="service.id"
        class="group flex items-end px-[2.4rem] py-gap border-b border-b-darkGrey hover:text-black hover:bg-white hover:translate-x-[1.6rem] transition-all mb:flex-col mb:px-mbGap mb:py-[2.4rem] mb:gap-[1.6rem] mb:hover:translate-x-0"
      >
        <p class="w-[20.6rem] text-[2rem] leading-[2rem] only-desktop">
          {{ getSplitBlockTitle(`0${index + 1}`) }}
        </p>

        <h1 class="h1 w-[80rem] mb:w-full">
          {{ service.title }}
        </h1>

        <div class="t1sb w-[46rem] text-grey transition-colors group-hover:text-black mb:w-full">
          {{ service.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSplitBlockTitle } from '@/global/ui'

defineOptions({
  name: 'ServicesWidget'
})

const LABELS = {
  title: getSplitBlockTitle('Услуги'),
}

const SERVICES = [
  {
    title: 'Проектирование',
    description: 'Мы разрабатываем современные системы идентификации',
  },
  {
    title: 'Дизайн интерфейсов',
    description: 'Наша команда создает инновационные решения для бизнеса',
  },
  {
    title: 'Исследования',
    description: 'Наша студия специализируется на творческом дизайне',
  },
  {
    title: 'UX/UI аудит',
    description: 'Мы предлагаем комплексные услуги в области цифрового маркетинга',
  }
].map((service, index) => ({
  ...service,
  id: `${service}-${index + 1}`
}))
</script>
