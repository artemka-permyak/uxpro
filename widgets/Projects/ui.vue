<template>
  <section class="flex flex-col gap-[12.8rem] px-gap mb:px-mbGap mb:flex mb:flex-col mb:gap-[6.4rem]">
    <div
      v-for="(items, index) in reducedProjects"
      :key="`wrapper-projects-${index}`"
      :class="'w-full flex gap-[12.8rem]'"
    >
      <div
        v-for="(project, projectIndex) in items"
        :key="project.id"
        :class="['grow w-full flex', {
          'justify-end': index % 2 === 1 && projectIndex % 2 === 1
        }]"
      >
        <nuxt-link
          :class="['group flex w-fit', {
          'cursor-pointer': project.id === 1,
          'cursor-not-allowed': project.id !== 1,
        }]"
          :to="project.id === 1 ? `projects/${project.id}` : ''"
        >
          <div class="flex flex-col gap-mbGap">
            <div class="group overflow-hidden">
              <div
                :class="['group-hover:scale-105 duration-500 transition-transform overflow-hidden mb:w-[32.8rem] mb:h-[32.8rem]', {
              'w-[63rem] h-[63rem]': (index % 2 === 0 && projectIndex % 2 === 0) || (index % 2 === 1 && projectIndex % 2 === 1),
              'h-[70.7rem]': (index % 2 === 1 && projectIndex % 2 === 0) || (index % 2 === 0 && projectIndex % 2 === 1),
            }]"
              >
                <NuxtImg
                  :src="project?.preview_image"
                  alt="Project image"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>

            <div class="group w-max flex items-center gap-[.8rem] t1sb group-hover:text-black group-hover:bg-white transition-colors mb:w-full mb:inline-block">
              <ArrowRight
                width="20"
                height="20"
                class="min-w-[2rem] mb:inline-block"
              />

              <p class="text-black bg-white mb:inline-block mb:mx-[.8rem]">
                {{ project.title }}
              </p>

              <div class="w-[1rem] h-[1rem] min-w-[1rem] rotate-45 bg-white group-hover:bg-black mb:inline-block mb:mr-[.8rem]" />

              <p class="mb:inline">
                {{ project.preview_description }}
              </p>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
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

const reducedProjects = computed(() => {
  return props.projects.reduce((total, currentValue, currentIndex) => {
    const lastIndex = total.length ? total.length - 1 : 0;

    const array = total[lastIndex]

    if (!array) {
      total[lastIndex] = [currentValue]
    } else {
      if (array.length === 2) {
        total[lastIndex + 1] = [currentValue]
      } else {
        total[lastIndex].push(currentValue)
      }
    }

    return total
  }, [])
})

console.log(reducedProjects.value)
</script>
