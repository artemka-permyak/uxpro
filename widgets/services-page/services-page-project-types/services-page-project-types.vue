<template>
  <Container>
    <SplitBlock>
      <template #left>
        <h3 class="text-h3 text-grey max-xl-plus:hidden">
          {{ title }}
        </h3>

        <h2 class="text-h2 text-grey xl-plus:hidden">
          {{ title }}
        </h2>
      </template>

      <template #right>
        <div class="flex flex-wrap gap-size-4">
          <Tag
            v-for="type in types"
            :key="`project-type-${type}`"
            :label="type"
          />
        </div>
      </template>
    </SplitBlock>
  </Container>
</template>

<script setup lang="ts">
import { Container, Tag, SplitBlock } from '~/global/ui'

defineOptions({
  name: 'ServicesPageProjectTypes',
})

const {
  title,
  types,
} = await queryCollection('servicesProjectTypes')
  .first()
</script>
