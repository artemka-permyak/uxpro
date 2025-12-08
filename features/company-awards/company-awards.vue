<template>
  <div class="flex gap-size-6 max-xl-plus:w-full max-xl-plus:flex-row overflow-x-auto snap-x snap-mandatory">
    <div
      v-for="award in AWARDS"
      :key="award.id"
      class="flex gap-size-6 items-center snap-center"
    >
      <CompanyAward v-bind="award" />
    </div>
  </div>
</template>

<script setup lang="ts">
import RunetAwardIcon from '@/global/assets/svg/runet-award.svg'
import WDAAwardIcon from '@/global/assets/svg/wda-award.svg'
import dprofileAwardIcon from '@/global/assets/svg/dprofile-award.svg'
import CompanyAward from '~/features/company-awards/company-award.vue'

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
