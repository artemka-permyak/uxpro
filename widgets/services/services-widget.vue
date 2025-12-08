<template>
  <div class="flex flex-col gap-size-16 max-xl-plus:gap-size-8">
    <BlockHeader class="px-size-8 max-xl-plus:px-size-6">
      {{ LABELS.title }}
    </BlockHeader>

    <ServicesList />
  </div>
</template>

<script setup lang="ts">
import { ServicesList } from '~/features'
import { BlockHeader } from '~/global/ui'

defineOptions({
  name: 'ServicesWidget'
})

const LABELS = {
  title: 'Услуги',
}
</script>
