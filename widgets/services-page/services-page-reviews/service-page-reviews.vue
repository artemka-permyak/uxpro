<template>
  <section class="flex flex-col gap-size-16">
    <Container class="flex">
      <h3 class="text-h3 text-grey grow max-xl-plus:hidden">
        {{ title }}
      </h3>

      <h2 class="text-h2 text-grey grow xl-plus:hidden">
        {{ title }}
      </h2>

      <div class="flex gap-size-4 shrink-0 cursor-pointer max-xl-plus:hidden">
        <Icon
          name="arrow-left"
          :size="48"
          class="transition-colors hover:text-white-hover active:text-white-active"
          @click="handlePrev"
        />

        <Icon
          name="arrow-right"
          :size="48"
          class="transition-colors hover:text-white-hover active:text-white-active"
          @click="handleNext"
        />
      </div>
    </Container>

    <Slider
      ref="slider"
      :options="{
        loop: true,
      }"
      class="max-xl-plus:hidden"
    >
      <div
        v-for="review in servicesReviews"
        :key="review.id"
        class="flex-[0_0_75%] min-w-0 px-size-2 translate-z-0"
      >
        <div class="bg-white-8 p-size-12 rounded-size-4">
          <div class="flex flex-col gap-size-8">
            <Icon
              name="review-quotes"
              size="2xl"
            />

            <p
              v-for="(description, index) in review.description"
              :key="`description-${index}`"
            >
              {{ description }}
            </p>

            <div class="flex items-center gap-size-6">
              <NuxtImg
                :src="getDomainLink('/images/contacts/sergey-logo.png')"
                :alt="review.author.name"
                class="w-[6.4rem] h-[6.4rem] rounded-full object-cover"
              />

              <div class="flex flex-col gap-size-1">
                <span>
                  {{ review.author.name }}
                </span>

                <span class="text-t3 text-grey">
                  {{ review.author.description }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slider>

    <Slider
      :options="{
        align: 'start',
        loop: true,
      }"
      class="xl-plus:hidden"
    >
      <div
        v-for="review in servicesReviews"
        :key="review.id"
        class="flex-[0_0_90%] min-w-0 px-size-2 translate-z-0"
      >
        <div class="h-full bg-white-8 p-size-12 rounded-size-4">
          <div class="flex flex-col gap-size-8">
            <Icon
              name="review-quotes"
              size="2xl"
            />

            <p
              v-for="(description, index) in review.description"
              :key="`description-${index}`"
            >
              {{ description }}
            </p>

            <div class="flex items-center gap-size-6">
              <NuxtImg
                :src="getDomainLink('/images/contacts/sergey-logo.png')"
                :alt="review.author.name"
                class="w-[6.4rem] h-[6.4rem] rounded-full object-cover"
              />

              <div class="flex flex-col gap-size-1">
                <span>
                  {{ review.author.name }}
                </span>

                <span class="text-t3 text-grey">
                  {{ review.author.description }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slider>
  </section>
</template>

<script setup lang="ts">
import { Slider, Icon, Container } from '~/global/ui'
import { getDomainLink } from '~/global/lib'

defineOptions({
  name: 'ServicesPageReviews'
})

const {
  body: {
    title,
    servicesReviews,
  }
} = await queryCollection('services')
  .where('stem', '=', 'services/services-reviews')
  .first()

const slider = ref(null)

const emblaApi = computed(() => {
  return slider.value?.emblaApi
})

function handlePrev() {
  if (!emblaApi.value?.canScrollPrev()) return

  emblaApi.value.scrollPrev()
}

function handleNext() {
  if (!emblaApi.value?.canScrollNext()) return

  emblaApi.value.scrollNext()
}
</script>
