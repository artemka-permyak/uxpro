<template>
  <section class="flex flex-col gap-size-12 px-size-8 max-xl-plus:px-size-6">
    <BlockHeader>
      {{ LABELS.title }}
    </BlockHeader>

    <div class="grid grid-cols-2 gap-size-24 max-xl-plus:grid-cols-1 max-xl-plus:gap-size-16">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="w-full gap-size-24 max-xl-plus:flex-col max-xl-plus:gap-size-12"
      >
        <div
          :class="['w-full grow shrink-0', {
            'justify-end max-xl-plus:justify-start': index % 2 === 1 && index % 2 === 1
          }]"
        >
          <nuxt-link
            :class="['w-full h-fit group flex max-xl-plus:w-auto', {
              'cursor-pointer': !project.disabled,
              'cursor-not-allowed': project.disabled,
              'mt-size-24 max-xl-plus:mt-0': !noSteps && index % 2 === 1,
              '': (index % 2 === 0 && index % 2 === 0) || (index % 2 === 1 && index % 2 === 1),
            }]"
            :to="!project.disabled ? `projects/${project.slug}` : ''"
          >
            <div class="w-full flex flex-col gap-size-6">
              <div class="group overflow-hidden">
                <div
                  :class="['relative w-full aspect-square duration-500 transition-transform overflow-hidden', {
                    'group-hover:scale-105': !project.disabled,
                  }]"
                >
                  <NuxtImg
                    :src="project?.preview.image"
                    alt="Project image"
                    class="h-full object-cover"
                  />

                  <div
                    v-if="project.disabled"
                    class="flex items-center justify-center absolute inset-0 z-10 bg-black/[66%] backdrop-blur-[.4rem]"
                  >
                    <div class="flex items-center gap-[1rem] rounded-full px-[1.6rem] py-[.7rem] text-[1.6rem] leading-[2.2rem] bg-black/[30%] border border-white/[36%]">
                      <Icon
                        name="spinner"
                        size="md"
                      />

                      {{ LABELS.inWork }}
                    </div>
                  </div>
                </div>
              </div>

              <div
                :class="['group t1sb transition-colors w-full inline-block', {
                  'group-hover:text-black group-hover:bg-white': !project.disabled
                }]"
              >
                <Icon
                  name="arrow-right"
                  size="md"
                  class="min-w-[2rem] inline-block align-middle mb-[.25rem]"
                />

                <p class="text-black bg-white inline-block mx-[.8rem]">
                  {{ project.title }}
                </p>

                <div
                  :class="['w-[1rem] h-[1rem] min-w-[1rem] rotate-45 bg-white inline-block mr-[.8rem] mb-[.25rem] align-middle', {
                    'group-hover:bg-black': !project.disabled
                  }]"
                />

                <p class="inline">
                  {{ project.preview.description }}
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
import { BlockHeader, Icon } from '~/global/ui'

defineOptions({
  name: 'ProjectsWidget'
})

const LABELS = {
  title: 'Проекты',
  inWork: 'В проработке',
}

const props = withDefaults(defineProps<{
  filterFn?: Function
  limit?: number
  noSteps?: boolean
}>(), {
  limit: 4
})

const {
  filterFn,
  limit,
  noSteps,
} = toRefs(props)

const response = await queryCollection('projects')
  .limit(limit.value)
  .all()

const projects = computed(() => {
  const sortedProjects = (response || [])
    .map(item => item.body)
    .slice()
    .sort((a, b) => a.id - b.id)

  return filterFn.value
    ? filterFn.value(sortedProjects)
    : sortedProjects
})
</script>
