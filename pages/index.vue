<template>
  <div class="flex flex-col gap-size-24 max-w-[192rem] m-auto text-white max-xl-plus:gap-size-16">
    <div class="flex flex-col gap-size-12">
      <CompanyPreviewWidget />

      <BriefCompanyServicesOverviewWidget />
    </div>

    <ProjectsWidget />

    <ServicesWidget />

    <ApproachWidget />

    <LastProjectsWidget />
  </div>
</template>

<script setup lang="ts">
import { CompanyPreviewWidget } from '~/widgets/company-preview'
import { BriefCompanyServicesOverviewWidget } from '~/widgets/brief-company-services-overview'
import { ProjectsWidget } from '~/widgets/projects'
import { ServicesWidget } from '~/widgets/services'
import { ApproachWidget } from '~/widgets/approach'
import { LastProjectsWidget } from '~/widgets/last-projects'
import { useHeaderStore } from '~/global/store/header'

defineOptions({
  name: 'IndexPage',
});

const headerStore = useHeaderStore()

const {
  changeShowStickyHeader
} = headerStore

changeShowStickyHeader(false)

onBeforeUnmount(() => {
  changeShowStickyHeader(false)
})
</script>

