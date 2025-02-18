<template>
  <section class="flex flex-col gap-[12.8rem] px-gap mb:px-mbGap mb:flex mb:flex-col mb:gap-[6.4rem]">
    <div
      v-for="(items, index) in reducedProjects"
      :key="`wrapper-projects-${index}`"
      class="w-full flex mb:flex-col mb:gap-[6.4rem]"
    >
      <div
        v-for="(project, projectIndex) in items"
        :key="project.id"
        :class="['grow w-full flex', {
          'justify-end': index % 2 === 1 && projectIndex % 2 === 1
        }]"
      >
        <nuxt-link
          :class="['group flex', {
            'cursor-pointer': [1, 2].includes(project.id),
            'cursor-not-allowed': ![1, 2].includes(project.id),
            'w-full': !((index % 2 === 0 && projectIndex % 2 === 0) || (index % 2 === 1 && projectIndex % 2 === 1)),
            'w-[65.1rem] self-baseline mb:w-full': (index % 2 === 0 && projectIndex % 2 === 0) || (index % 2 === 1 && projectIndex % 2 === 1),
          }]"
          :to="[1, 2].includes(project.id) ? `projects/${project.id}` : ''"
        >
          <div class="w-full flex flex-col gap-mbGap">
            <div class="group overflow-hidden">
              <div
                :class="[' duration-500 transition-transform overflow-hidden mb:w-[32.8rem] mb:h-[32.8rem]', {
                  'group-hover:scale-105': [1, 2].includes(project.id),
                  'w-[63rem] h-[63rem] mb:w-full mb:h-[32.8rem]': (index % 2 === 0 && projectIndex % 2 === 0) || (index % 2 === 1 && projectIndex % 2 === 1),
                  'h-[70.7rem] mb:w-full mb:h-[32.8rem]': (index % 2 === 1 && projectIndex % 2 === 0) || (index % 2 === 0 && projectIndex % 2 === 1),
                }]"
              >
                <NuxtImg
                  :src="project?.preview_image"
                  alt="Project image"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>

            <div
              :class="['group t1sb transition-colors w-full inline-block', {
                'group-hover:text-black group-hover:bg-white': [1, 2].includes(project.id)
              }]"
            >
              <ArrowRight
                width="20"
                height="20"
                class="min-w-[2rem] inline-block align-middle mb-[.25rem]"
              />

              <p class="text-black bg-white inline-block mx-[.8rem]">
                {{ project.title }}
              </p>

              <div
                :class="['w-[1rem] h-[1rem] min-w-[1rem] rotate-45 bg-white inline-block mr-[.8rem] mb-[.25rem] align-middle', {
                  'group-hover:bg-black': [1, 2].includes(project.id)
                }]"
              />

              <p class="inline">
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
  return props.projects.reduce((total, currentValue) => {
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
</script>
