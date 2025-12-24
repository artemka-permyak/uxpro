<template>
  <div class="flex flex-col gap-size-16 max-xl:gap-size-6">
    <Container class="flex flex-col gap-size-16">
      <h3 class="text-h3 text-grey max-xl:hidden">
        {{ title }}
      </h3>

      <h2 class="text-h2 text-grey xl:hidden">
        {{ title }}
      </h2>

      <div class="grid grid-cols-2 gap-size-4 max-xl:grid-cols-1">
        <div
          v-for="form in formsOfCooperation"
          :key="form.id"
          class="flex flex-col gap-size-32 max-xl:gap-size-16 p-size-10 max-xl:p-size-6 bg-[#1A1A1A] rounded-size-4"
        >
          <h2 class="text-h2">
            {{ form.title }}
          </h2>

          <div class="flex flex-col gap-size-6">
            <Tag
              :label="form.price"
              class="w-max"
            />

            <p class="text-grey">
              {{ form.description }}
            </p>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { Container, Tag } from '~/global/ui'

defineOptions({
  name: 'FormsOfCooperation',
})

const {
  title,
  formsOfCooperation,
} = await queryCollection('servicesFormsOfCooperation')
  .first()
</script>
