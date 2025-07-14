<template>
  <div class="flex gap-[4rem] mb:w-full mb:flex-row mb:gap-[2.4rem] overflow-x-auto snap-x snap-mandatory">
    <div
      v-for="award in AWARDS"
      :key="award.id"
      class="flex gap-mbGap items-center snap-center"
    >
      <CompanyAward v-bind="award" />
    </div>
  </div>
</template>

<script setup lang="ts">
import RunetAwardIcon from 'public/svgs/runetAward.svg'
import WDAAwardIcon from 'public/svgs/WDAAward.svg'
import dprofileAwardIcon from 'public/svgs/dprofileAward.svg'
import CompanyAward from '~/features/CompanyAwards/CompanyAward.vue'

defineOptions({
  name: 'CompanyAwards'
})

const AWARDS = [
  {
    icon: RunetAwardIcon,
    title: 'Продуктовый дизайн',
    description: '46 место',
    id: 'runet',
  },

  {
    icon: WDAAwardIcon,
    title: 'Призёр WDA',
    description: '2 место',
    id: 'wda',
  },

  {
    icon: dprofileAwardIcon,
    title: 'Рекомендуемое на dprofile.ru',
    mobileTitle: 'Рекомендуемое на<br> dprofile.ru',
    id: 'dprofile',
  }
]
</script>
