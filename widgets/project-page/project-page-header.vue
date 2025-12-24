<template>
  <div class="relative flex flex-col p-size-8 pt-0 gap-size-8 border-b border-b-solid border-b-dark-grey max-xl:p-size-6 max-xl:pt-0 max-xl:border-none">
    <NuxtImg
      :src="getStorageLink('/images/backgrounds/points.png')"
      alt="Лого проекта"
      class="w-full object-contain max-xl:hidden"
      format="webp"
    />

    <NuxtImg
      :src="getStorageLink('/images/backgrounds/points-mobile.svg')"
      alt="Лого проекта"
      class="w-full object-contain xl:hidden"
      format="webp"
    />

    <div class="flex gap-size-8 max-xl:flex-col">
      <div class="w-[50%] grow max-xl:w-full">
        <div class="w-[64rem] flex flex-col gap-[5.6rem] pb-[8.8rem] max-xl:w-full max-xl:gap-[2.4rem] max-xl:pb-0">
          <div class="flex flex-wrap gap-[1.6rem] max-xl:gap-[.8rem]">
            <div
              v-for="(tag, index) in project?.tags"
              :key="`${tag}-${index}`"
              class="t1sb border-2 border-solid border-white rounded-full px-[2.4rem] py-[1rem] max-xl:px-[1.8rem] max-xl:py-[.6rem]"
            >
              {{ tag }}
            </div>
          </div>

          <div class="flex flex-col gap-[.8rem] max-xl:w-full">
            <div
              v-for="(work, index) in project?.completed_works_titles"
              :key="`${work}-${index}`"
              class="t1sb"
            >
              {{ work }}
            </div>
          </div>

          <ArrowBottom
            width="24"
            height="24"
            class="only-mobile"
          />
        </div>
      </div>

      <div class="w-[50%] grow max-xl:w-full max-xl:flex max-xl:flex-col max-xl:gap-[2.4rem]">
        <h1 class="text-h1 flex justify-between pb-[3.2rem] gap-[1.2rem] max-xl:flex-col max-xl:pb-0">
          <span>
            {{ project?.title }}
          </span>

          <span class="shrink-0">
            {{ project?.publish_year }}
          </span>
        </h1>

        <div class="t1sb flex flex-col gap-[2.4rem] max-xl:w-full max-xl:gap-[1.6rem]">
          <p
            v-for="(item, index) in project?.description"
            :key="`description-${index}`"
          >
            {{ item }}
          </p>
        </div>

        <div
          v-if="project?.awards"
          class="flex gap-[4rem] max-xl:w-full max-xl:whitespace-nowrap max-xl:flex-row max-xl:gap-[2.4rem] overflow-x-auto snap-x snap-mandatory pt-[3.2rem] max-xl:pt-[0]"
        >
          <CompanyAward
            v-for="award in project.awards"
            :key="award.src"
            :title="award.title"
            :mobile-title="award.mobileTitle"
            :icon="award.src"
            :description="award.description"
            size="large"
            class="snap-center only-desktop"
          />

          <CompanyAward
            v-for="award in project.awards"
            :key="award.src"
            :title="award.title"
            :mobile-title="award.mobileTitle"
            :icon="award.src"
            :description="award.description"
            size="small"
            class="only-mobile"
          />
        </div>
      </div>
    </div>

    <ArrowBottom
      width="24"
      height="24"
      class="absolute bottom-[3.2rem] left-[3.2rem] only-desktop"
    />
  </div>
</template>

<script setup lang="ts">
import ArrowBottom from '@/global/assets/svg/arrow-bottom.svg'
import { CompanyAward } from '~/features/company-awards'
import { getStorageLink } from '~/global/lib'

defineOptions({
  name: 'ProjectPageHeader'
})

const props = defineProps<{
  project?: object
}>()

const {
  project
} = toRefs(props)
</script>
