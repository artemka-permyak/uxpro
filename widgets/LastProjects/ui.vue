<template>
  <section class="flex flex-col gap-[6.4rem] px-gap mb:gap-gap mb:px-mbGap">
    <BlockHeader>
      {{ LABELS.title }}
    </BlockHeader>

    <div class="w-full flex h-[57.8rem] overflow-x-auto snap-x">
      <div
        v-for="(project, index) in lastProjects"
        :key="project.id"
        :class="['w-full h-full min-w-[30.9rem] snap-center', {
          'pt-[6.4rem]': index !== 0 && index % 3 === 1,
          'pb-[6.4rem]': index !== 0 && index % 3 === 2,
        }]"
      >
        <div :class="['relative group hover:bg-white transition-colors w-full h-full flex flex-col gap-mbGap p-gap border-t border-b border-darkGrey', {
          'border-l border-r': index % 3 === 0,
          'border-r': index !== 0 && index % 3 === 1 || index === lastProjects.length - 1,
          'before:h-[6.4rem] before:bg-darkGrey before:border-l before:border-darkGrey before:absolute before:left-[-.05rem] before:top-[-.05rem] mb:before:left-[-.1rem] mb:before:top-[-.1rem]': index !== 0 && index % 3 === 2,
        }]">
          <div class="group flex flex-col grow gap-mbGap">
            <div class="group flex justify-between gap-mbGap">
              <p class="text-[1.8rem] leading-[2.4rem] transition-colors group-hover:text-black">
                0{{ project.position }}
              </p>

              <div
                v-if="project.is_nda"
                class="flex gap-[.2rem] text-[1.4rem] leading-[2rem] px-[1.2rem] py-[.4rem] font-medium rounded-full border border-white transition-colors group-hover:border-black group-hover:text-black"
              >
                <EyeClosedIcon
                  width="20"
                  height="20"
                /> {{ LABELS.nda }}
              </div>
            </div>

            <p class="t1sb transition-colors group-hover:text-black">
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

                <p class="text-[1.6rem] leading-[2.2rem] font-medium transition-colors group-hover:text-black">
                  {{ item.value }}
                </p>
              </div>
            </div>

            <div class="group flex flex-col gap-[.4rem]">
              <div
                v-for="tag in project.tags"
                :key="`project-${project.id}-tag-${tag}`"
                class="text-[1.8rem] leading-[2.4rem] text-grey group-hover:text-black"
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
import EyeClosedIcon from '@/public/svgs/eyeClosed.svg'
import { BlockHeader } from '~/features'

defineOptions({
  name: 'LastProjectsWidget'
})

const LABELS = {
  title: 'Последние проекты',
  nda: 'NDA',
  direction: 'Направление',
  deadline: 'Срок исполнения'
}

const props = defineProps<{
  lastProjects: any[]
}>()

const {
  lastProjects
} = toRefs(props)

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
