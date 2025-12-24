<template>
  <div class="flex flex-col gap-size-24 max-w-[192rem] m-auto text-white max-xl:gap-size-16">
    <div class="flex flex-col gap-size-12">
      <CompanyPreviewWidget />

      <BriefCompanyServicesOverviewWidget />
    </div>

    <LazyProjectsWidget />

    <LazyServicesWidget />

    <LazyApproachWidget />

    <LazyLastProjectsWidget />
  </div>
</template>

<script setup lang="ts">
import { CompanyPreviewWidget } from '~/widgets/company-preview'
import { BriefCompanyServicesOverviewWidget } from '~/widgets/brief-company-services-overview'
import { useHeaderStore } from '~/global/store/header'

const LazyProjectsWidget = defineAsyncComponent(() =>
  import('~/widgets/projects').then(m => m.ProjectsWidget)
)
const LazyServicesWidget = defineAsyncComponent(() =>
  import('~/widgets/services').then(m => m.ServicesWidget)
)
const LazyApproachWidget = defineAsyncComponent(() =>
  import('~/widgets/approach').then(m => m.ApproachWidget)
)
const LazyLastProjectsWidget = defineAsyncComponent(() =>
  import('~/widgets/last-projects').then(m => m.LastProjectsWidget)
)

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

