<template>
  <div class="relative flex p-gap gap-gap border-b border-b-solid border-b-darkGrey mb:flex-col mb:p-mbGap mb:border-none">
    <div class="w-full grow">
      <div class="w-[64rem] flex flex-col gap-[5.6rem] pb-[8.8rem] mb:w-full mb:gap-[2.4rem] mb:pb-0">
        <div class="flex flex-wrap gap-[1.6rem] mb:gap-[.8rem]">
          <div
            v-for="(tag, index) in project?.tags"
            :key="`${tag}-${index}`"
            class="t1sb border-2 border-solid border-white rounded-full px-[2.4rem] py-[1rem] mb:px-[1.8rem] mb:py-[.6rem]"
          >
            {{ tag }}
          </div>
        </div>

        <div class="flex flex-col gap-[.8rem] mb:w-full">
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

    <div class="w-full grow mb:flex mb:flex-col mb:gap-gap">
      <h1 class="h1 flex justify-between pb-[3.2rem] gap-[1.2rem] mb:flex-col mb:pb-0">
        <span>
          {{ project?.title }}
        </span>

        <span class="shrink-0">
          {{ project?.publish_year }}
        </span>
      </h1>

      <div class="t1sb flex flex-col gap-[2.4rem] mb:w-full mb:gap-[1.6rem]">
        <p
          v-for="(item, index) in project?.description"
          :key="`description-${index}`"
        >
          {{ item }}
        </p>
      </div>

      <div
        v-if="project?.awards"
        class="flex gap-[4rem] mb:w-full mb:flex-row mb:gap-[2.4rem] overflow-x-auto snap-x snap-mandatory pt-[4.8rem] only-desktop"
      >
        <CompanyAward
          v-for="award in project.awards"
          :title="award.title"
          :mobile-title="award.mobileTitle"
          :icon="award.src"
          :description="award.description"
          class="flex gap-mbGap items-center snap-center"
        />
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
import ArrowBottom from '@/public/svgs/arrowBottom.svg'
import { CompanyAward } from '~/features'

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
