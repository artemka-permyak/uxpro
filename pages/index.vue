<template>
  <div class="flex flex-col gap-[19.2rem] max-w-[192rem] m-auto text-white">
    <div class="flex flex-col gap-[4.8rem]">
      <CompanyPreview />

      <BriefCompanyServicesOverview />
    </div>

    <ProjectsWidget
      v-if="projectsData?.data"
      :projects="projectsData?.data"
    />

    <ServicesWidget />

    <ApproachWidget />

    <LastProjectsWidget
      v-if="lastProjectsData?.data"
      :last-projects="lastProjectsData.data"
    />
  </div>
</template>

<script setup lang="ts">
import { CompanyPreview } from '~/widgets/CompanyPreview'
import { BriefCompanyServicesOverview } from '~/widgets/BriefCompanyServicesOverview'
import { ProjectsWidget } from '~/widgets/Projects'
import { ServicesWidget } from '~/widgets/Services'
import { ApproachWidget } from '~/widgets/Approach'
import { LastProjectsWidget } from '~/widgets/LastProjects'
import { useHeaderStore } from '~/global/store/header'

defineOptions({
  name: 'IndexPage',
});

const { data: projectsData } = useFetch('/api/projects')

const { data: lastProjectsData } = useFetch('/api/last-projects')

const headerStore = useHeaderStore()

const {
  changeShowStickyHeader
} = headerStore

changeShowStickyHeader(false)

onBeforeUnmount(() => {
  changeShowStickyHeader(false)
})
</script>

