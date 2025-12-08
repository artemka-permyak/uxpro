<template>
  <div class="flex flex-col gap-size-16 max-xl-plus:gap-size-6">
    <Container>
      <h3 class="text-h3 text-grey max-xl-plus:hidden">
        {{ title }}
      </h3>

      <h2 class="text-h2 text-grey xl-plus:hidden">
        {{ title }}
      </h2>
    </Container>

    <div class="flex flex-col">
      <div
        v-for="form in formsOfCooperation"
        :key="form.id"
        class="border-t border-dark-grey py-size-8 last:border-b"
      >
        <Container class="grid grid-cols-2 max-xl-plus:grid-cols-1 gap-size-4">
          <h2 class="text-h2 max-xl-plus:hidden">
            {{ form.title }}
          </h2>

          <h1 class="text-h1 xl-plus:hidden">
            {{ form.title }}
          </h1>

          <div class="flex flex-col gap-size-6">
            <p>
              {{ form.description }}
            </p>

            <h3 class="text-h3 max-xl-plus:hidden">
              {{ form.price }}
            </h3>

            <p class="text-t1-bold xl-plus:hidden">
              {{ form.price }}
            </p>
          </div>
        </Container>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Container } from '~/global/ui'

defineOptions({
  name: 'FormsOfCooperation',
})

const {
  body: {
    title,
    formsOfCooperation,
  }
} = await queryCollection('services')
  .where('stem', '=', 'services/services-forms-of-cooperation')
  .first()
</script>
