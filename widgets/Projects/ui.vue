<template>
  <section class="grid grid-cols-2 gap-y-[12.8rem] px-gap mb:px-mbGap mb:flex mb:flex-col mb:gap-[6.4rem]">
    <nuxt-link
      v-for="(project, index) in projects"
      :key="project.id"
      class="w-full flex"
      :to="`projects/${project.id}`"
    >
      <div class="group w-max flex flex-col gap-[1.6rem] cursor-pointer mb:w-full">
        <div class="group overflow-hidden">
          <div
            :class="['group-hover:scale-110 transition-transform overflow-hidden mb:w-[32.8rem] mb:h-[32.8rem]', {
              'w-[63rem] h-[63rem]': index % 2 === 0,
              'h-[70.7rem]': index % 2 === 1,
            }]"
          >
            <NuxtImg
              :src="project?.preview_image"
              alt="Project image"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <div class="group w-max flex items-center gap-[.8rem] t1sb group-hover:text-black group-hover:bg-white transition-colors mb:w-full">
          <ArrowRight
            width="20"
            height="20"
            class="min-w-[2rem]"
          />

          <p class="text-black bg-white mb:w-full">
            {{ project.title }}
          </p>

          <div class="w-[1rem] h-[1rem] min-w-[1rem] rotate-45 bg-white group-hover:bg-black" />

          <p>
            {{ project.preview_description }}
          </p>
        </div>
      </div>
    </nuxt-link>
  </section>
</template>

<script setup lang="ts">
import ArrowRight from 'public/svgs/arrowRight.svg'

defineOptions({
  name: 'ProjectsWidget'
})

const props = defineProps<{
  projects: any[]
}>()
</script>
