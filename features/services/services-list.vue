<template>
  <div class="flex flex-col border-t border-t-dark-grey">
    <Container
      v-for="(service, index) in services"
      :key="service.id"
      class="group grid grid-cols-2 gap-size-12 max-xl:grid-cols-1 items-center py-size-8 border-b border-b-dark-grey hover:text-black hover:bg-white transition-all max-xl:flex-col max-xl:py-size-6 max-xl:gap-size-4 max-xl:items-start"
    >
      <div class="flex items-end gap-size-24 max-xl:w-full">
        <p
          v-if="!withoutNumbering"
          class="shrink-0 max-xl:hidden"
        >
          {{ getSplitBlockTitle(`0${index + 1}`) }}
        </p>

        <h2 class="text-h2 grow max-xl:w-full">
          {{ service.title }}
        </h2>
      </div>

      <div class="transition-colors group-hover:text-black">
        <div v-if="showFullInfo" class="grid grid-cols-2 max-xl:grid-cols-1 gap-size-8 max-xl:gap-size-4">
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
