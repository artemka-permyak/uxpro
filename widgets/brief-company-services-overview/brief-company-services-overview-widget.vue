<template>
  <div class="flex px-size-8 gap-size-24 max-xl:flex-col-reverse max-xl:px-size-6 max-xl:gap-size-6">
    <div class="w-[50%] flex flex-wrap gap-size-3 max-xl:w-full">
      <div
        v-for="service in types"
        :key="service"
        class="flex items-center justify-center rounded-full h-[5.2rem] bg-[#FFFFFF12] backdrop-blur-[128px] px-size-7 py-size-3 max-xl:h-[4rem] max-xl:px-size-5 max-xl:py-size-3"
      >
        {{ service }}
      </div>
    </div>

    <p class="w-[50%] text-grey leading-[3rem] max-xl:w-full">
      {{ LABELS.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'BriefCompanyServicesOverviewWidget'
})

const LABELS = {
  description: `
    Успешно реализуем разные типы сервисов.
    Исследуем и строим пользовательские пути,
    проектируем интерфейсы, выстраиваем системную
    работу над дизайном
  `
}

const {
  types
} = await queryCollection('servicesProjectTypes')
  .first()
</script>
