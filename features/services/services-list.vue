<template>
  <div class="flex flex-col border-t border-t-dark-grey">
    <Container
      v-for="(service, index) in services"
      :key="service.id"
      class="group grid grid-cols-2 max-xl-plus:grid-cols-1 items-center py-size-8 border-b border-b-dark-grey hover:text-black hover:bg-white transition-all max-xl-plus:flex-col max-xl-plus:py-size-6 max-xl-plus:gap-size-4 max-xl-plus:items-start"
    >
      <div class="flex items-end gap-size-24 max-xl-plus:w-full">
        <p
          v-if="!withoutNumbering"
          class="shrink-0 max-xl-plus:hidden"
        >
          {{ getSplitBlockTitle(`0${index + 1}`) }}
        </p>

        <h2 class="text-h2 grow max-xl-plus:w-full">
          {{ service.title }}
        </h2>
      </div>

      <div class="transition-colors group-hover:text-black">
        <div v-if="showFullInfo" class="grid grid-cols-2 max-xl-plus:grid-cols-1 gap-size-8 max-xl-plus:gap-size-4">
          <p>
            {{ service.description }}
          </p>

          <p class="text-grey">
            {{ service.secondDescription }}
          </p>
        </div>

        <p v-else class="text-grey">
          {{ service.secondDescription }}
        </p>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { Container, getSplitBlockTitle } from '~/global/ui'

defineOptions({
  name: 'ServicesList'
})

const props = defineProps<{
  withoutNumbering?: boolean
  showFullInfo?: boolean
}>()

const {
  services
} = await queryCollection('services')
  .first()
</script>
