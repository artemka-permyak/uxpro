<template>
  <div class="pt-[9.6rem] flex flex-col gap-[19.2rem] max-w-[192rem] m-auto text-white mb:pt-[6.4rem]">
    <ProjectsWidget
      v-if="projectsData?.data"
      :projects="projectsData?.data"
    />

    <LastProjectsWidget
      v-if="lastProjectsData?.data"
      :last-projects="lastProjectsData.data"
    />

    <ApproachWidget />

    <ServicesWidget />
  </div>
</template>

<script setup lang="ts">
import { ProjectsWidget } from '~/widgets/Projects'
import { ApproachWidget } from '~/widgets/Approach'
import { ServicesWidget } from '~/widgets/Services'
import { LastProjectsWidget } from '~/widgets/LastProjects'

defineOptions({
  name: 'IndexPage',
});

const { data: projectsData } = useFetch('/api/projects')

const { data: lastProjectsData } = useFetch('/api/last-projects')
</script>

