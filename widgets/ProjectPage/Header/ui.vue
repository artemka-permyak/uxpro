<template>
  <div class="relative flex p-gap gap-gap border-b border-b-solid border-b-darkGrey mb:flex-col mb:p-mbGap mb:border-none">
    <div class="w-full grow">
      <div class="w-[63rem] flex flex-wrap gap-[1.6rem] mb:gap-[.8rem] mb:w-full">
        <div
          v-for="(tag, index) in project?.tags"
          :key="`${tag}-${index}`"
          class="t1sb border-2 border-solid border-white rounded-full px-[2.4rem] py-[1rem] mb:px-[1.8rem] mb:py-[.6rem]"
        >
          {{ tag }}
        </div>
      </div>
    </div>

    <div class="w-full grow mb:flex mb:flex-col mb:gap-gap">
      <h1 class="h1 flex justify-between pb-[9.6rem] gap-[1.2rem] mb:flex-col mb:pb-0">
        <span>
          {{ project?.title }}
        </span>

        <span>
          {{ project?.publish_year }}
        </span>
      </h1>

      <div class="flex mb:flex-col mb:gap-gap">
        <div class="w-[42rem] flex flex-col gap-[.8rem] mb:w-full">
          <div
            v-for="(work, index) in project?.completed_works_titles"
            :key="`${work}-${index}`"
            class="t1sb"
          >
            {{ work }}
          </div>
        </div>

        <div class="w-[50.8rem] t1sb flex flex-col gap-[2.4rem] mb:w-full mb:gap-[1.6rem]">
          <p
            v-for="(item, index) in project?.description"
            :key="`description-${index}`"
          >
            {{ item }}
          </p>
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
import ArrowBottom from '@/public/svgs/arrowBottom.svg'

defineOptions({
  name: 'ProjectPageHeader'
})

const props = defineProps<{
  project: object
}>()

const {
  project
} = toRefs(props)
</script>
