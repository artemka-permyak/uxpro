<template>
  <div class="flex px-[3.2rem] gap-[9.6rem] mb:flex-col-reverse mb:px-[2.4rem] mb:gap-[2.4rem]">
    <div class="w-[50%] flex flex-wrap gap-[1.2rem] mb:w-full">
      <div
        v-for="service in SERVICES"
        :key="service"
        class="flex items-center justify-center rounded-full h-[5.2rem] bg-[#FFFFFF12] backdrop-blur-[128px] px-[2.8rem] py-[1.4rem]"
      >
        {{ service }}
      </div>
    </div>

    <p class="w-[50%] text-grey mb:w-full">
      {{ LABELS.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'BriefCompanyServicesOverview'
})

const SERVICES = [
  'SaaS-сервисы',
  'ERP и CRM системы',
  'LMS-платформы',
  'HR-сервисы',
  'Task-менеджеры',
  'Личные кабинеты',
  'Сервисы покупки и доставки',
  'Сервисы аренды и бронирования',
  'Веб-приложения',
  'Мобильные приложения',
]

const LABELS = {
  description: `
    Успешно реализуем разные типы сервисов.
    Исследуем и строим пользовательские пути,
    проектируем интерфейсы, выстраиваем системную
    работу над дизайном
  `
}
</script>
