<template>
  <div class="flex gap-gap mb:w-full mb:flex-row mb:gap-[2.4rem] overflow-x-auto snap-x snap-mandatory">
    <div
      v-for="award in AWARDS"
      :key="award.id"
      class="flex gap-mbGap items-center snap-center"
    >
      <component
        :is="award.icon"
        key="desktop"
        class="shrink-0 w-[64px] h-[64px] mb:w-[48px] mb:h-[48px]"
      />

      <div class="w-[20rem] flex flex-col t1 mb:w-max">
        <template v-if="award.mobileTitle">
          <span
            class="only-desktop"
            v-html="award.title"
          />
          <span
            class="only-mobile"
            v-html="award.mobileTitle"
          />
        </template>

        <span
          v-else
          v-html="award.title"
        />

        <span class="text-white/50">{{ award.description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WDAAwardIcon from '@/public/svgs/WDAAward.svg'
import dprofileAwardIcon from '@/public/svgs/dprofileAward.svg'

defineOptions({
  name: 'CompanyAwards'
})

const AWARDS = [
  {
    icon: WDAAwardIcon,
    title: 'Победитель WDA',
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
