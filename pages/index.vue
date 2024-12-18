<template>
  <div class="pt-[9.6rem] flex flex-col gap-[19.2rem] max-w-[192rem] m-auto text-white mb:pt-[6.4rem]">
    <ProjectsWidget
      v-if="data?.data"
      :projects="data?.data"
    />

    <TransparencyWidget />

    <ServicesWidget />
  </div>
</template>

<script setup lang="ts">
import { ProjectsWidget } from '~/widgets/Projects'
import { TransparencyWidget } from '~/widgets/Transparency'
import { ServicesWidget } from '~/widgets/Services'

defineOptions({
  name: 'IndexPage',
});

const { data } = useFetch('/api/projects')
</script>

