<template>
  <Container class="flex flex-col gap-size-8">
    <Icon
      name="review-quotes"
      :size="48"
    />

    <h2 class="text-h2">
      {{ title }}
    </h2>

    <div class="flex items-center gap-size-6">
      <NuxtImg
        :src="author.src"
        :alt="author.name"
        class="w-[8rem] h-[8rem] rounded-full object-cover"
        loading="lazy"
        format="webp"
      />

      <div class="flex flex-col gap-size-1">
        <span>
          {{ author.name }}
        </span>

        <span class="text-t3 text-grey">
          {{ author.description }}
        </span>
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { getStorageLink } from '~/global/lib'
import { Container, Icon } from '~/global/ui'

defineOptions({
  name: 'ServicesPageFounderMessage',
})

const {
  title,
  author,
} = await queryCollection('servicesPageFounderMessage')
  .first()
</script>
