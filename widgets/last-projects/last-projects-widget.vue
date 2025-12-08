<template>
  <section class="flex flex-col gap-size-16 px-size-8 max-xl-plus:gap-size-8 max-xl-plus:px-size-6">
    <BlockHeader>
      {{ title }}
    </BlockHeader>

    <div class="w-full flex h-[51.2rem] overflow-x-auto snap-x">
      <div
        v-for="(project, index) in lastProjects"
        :key="project.id"
        :class="['w-full h-full min-w-[30.9rem] snap-center', {
          'xl-plus:pt-size-16': index !== 0 && index % 3 === 1,
          'xl-plus:pb-size-16': index !== 0 && index % 3 === 2,
        }]"
      >
        <div :class="['relative transition-colors w-full h-full flex flex-col gap-size-6 p-size-8 border-t border-b border-dark-grey', {
          'border-l border-r': index % 3 === 0,
          'border-r': index !== 0 && index % 3 === 1 || index === lastProjects.length - 1,
          'before:h-size-16 before:bg-dark-grey before:border-l before:border-dark-grey before:absolute before:left-[-.05rem] before:top-[-.05rem] max-xl-plus:before:left-[-.1rem] max-xl-plus:before:top-[-.1rem]': index !== 0 && index % 3 === 2,
        }]">
          <div class="group flex flex-col grow gap-size-6">
            <div class="group flex justify-between gap-size-6">
              <p class="transition-colors">
                0{{ project.position }}
              </p>

              <div
                v-if="project.is_nda"
                class="flex gap-[.2rem] text-[1.4rem] leading-[2rem] px-[1.2rem] py-[.4rem] font-medium rounded-full border border-white transition-colors"
              >
                <EyeClosedIcon
                  width="20"
                  height="20"
                /> {{ LABELS.nda }}
              </div>
            </div>

            <p class="t1sb transition-colors">
              {{ project.title }}
            </p>
          </div>

          <div class="group flex flex-col gap-[3.2rem]">
            <div class="group flex flex-col gap-[2.4rem]">
              <div
                v-for="item in getProjectItems(project)"
                :key="item.id"
                class="flex flex-col gap-[.4rem] group"
              >
                <p class="text-[1.4rem] leading-[2rem] text-grey">
                  {{ item.title }}
                </p>

                <p class="text-[1.6rem] leading-[2.2rem] font-medium transition-colors">
                  {{ item.value }}
                </p>
              </div>
            </div>

            <div class="group flex flex-col gap-[.4rem]">
              <div
                v-for="tag in project.tags"
                :key="`project-${project.id}-tag-${tag}`"
                class="text-[1.8rem] leading-[2.4rem] text-grey"
              >
                {{ tag }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import EyeClosedIcon from '@/global/assets/svg/eye-closed.svg'
import { BlockHeader } from '@/global/ui'

defineOptions({
  name: 'LastProjectsWidget'
})

const LABELS = {
  nda: 'NDA',
  direction: 'Направление',
  deadline: 'Срок исполнения'
}

const {
  body: {
    title,
    lastProjects,
  }
} = await queryCollection('lastProjects')
  .first()

function getProjectItems(project: any) {
  const {
    id,
    direction,
    deadline
  } = project

  return [
    {
      title: LABELS.direction,
      value: direction,
      id: `direction-${id}`
    },

    {
      title: LABELS.deadline,
      value: deadline,
      id: `deadline-${id}`
    }
  ]
}
</script>
