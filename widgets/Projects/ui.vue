<template>
  <section class="flex flex-col gap-[4.8rem] px-gap mb:px-[2.4rem]">
    <BlockHeader>
      {{ LABELS.title }}
    </BlockHeader>

    <div class="flex flex-col gap-[12.8rem] mb:flex mb:flex-col mb:gap-[6.4rem]">
      <div
        v-for="(items, index) in reducedProjects"
        :key="`wrapper-projects-${index}`"
        class="w-full flex gap-[9.6rem] mb:flex-col mb:gap-[4.8rem]"
      >
        <div
          v-for="(project, projectIndex) in items"
          :key="project.id"
          :class="['w-[calc(50%-4.8rem)] grow flex gap-[9.6rem] mb:gap-[4.8rem] shrink-0 mb:w-full', {
            'justify-end': index % 2 === 1 && projectIndex % 2 === 1
          }]"
        >
          <nuxt-link
            :class="['w-full h-fit group flex', {
              'cursor-pointer': [1, 2].includes(project.id),
              'cursor-default': ![1, 2].includes(project.id),
              // 'w-full': !((index % 2 === 0 && projectIndex % 2 === 0) || (index % 2 === 1 && projectIndex % 2 === 1)),
              // 'w-[65.1rem] self-baseline mb:w-full': (index % 2 === 0 && projectIndex % 2 === 0) || (index % 2 === 1 && projectIndex % 2 === 1),
              'mt-[9.6rem] mb:mt-0': projectIndex % 2 === 1,
              '': (index % 2 === 0 && projectIndex % 2 === 0) || (index % 2 === 1 && projectIndex % 2 === 1),
            }]"
            :to="[1, 2].includes(project.id) ? `projects/${project.id}` : ''"
          >
            <div class="w-full flex flex-col gap-mbGap">
              <div class="group overflow-hidden">
                <div
                  :class="['relative w-full aspect-square duration-500 transition-transform overflow-hidden', {
                    'group-hover:scale-105': [1, 2].includes(project.id),
                  }]"
                >
                  <NuxtImg
                    :src="project?.preview_image"
                    alt="Project image"
                    class="h-full object-cover"
                  />

                  <div
                    v-if="project.id === 3"
                    class="flex items-center justify-center absolute inset-0 z-10 bg-black/[66%] backdrop-blur-[.4rem]"
                  >
                    <div class="flex items-center gap-[1rem] rounded-full px-[1.6rem] py-[.7rem] text-[1.6rem] leading-[2.2rem] bg-black/[30%] border border-white/[36%]">
                      <SpinnerIcon
                        width="20"
                        height="20"
                      />

                      {{ LABELS.inWork }}
                    </div>
                  </div>
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
    </div>
  </section>
</template>

<script setup lang="ts">
import ArrowRight from 'public/svgs/arrowRight.svg'
import SpinnerIcon from 'public/svgs/spinner.svg'
import { BlockHeader } from '~/features'

defineOptions({
  name: 'ProjectsWidget'
})

const LABELS = {
  title: 'Проекты',
  inWork: 'В проработке',
}

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
