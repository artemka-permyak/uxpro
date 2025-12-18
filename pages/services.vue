<template>
  <div class="flex flex-col gap-size-32 max-xl-plus:gap-size-18">
    <Container class="flex flex-col gap-size-12">
      <NuxtImg
        :src="getDomainLink('/images/project/project-bg.png')"
        alt="Лого проекта"
        class="w-full min-h-[20rem] object-cover"
      />

      <div class="flex flex-col gap-size-6">
        <Slider
          :options="{
            align: 'start',
            loop: true,
          }"
          :plugins="[
            AutoScroll({
              playOnInit: true,
              speed: 1,
              startDelay: 0,
            })
          ]"
          class="xl-plus:hidden shrink-0"
        >
          <div
            v-for="service in servicesPageTags"
            :key="`mobile-service-page-tag-${service}`"
            class="pl-size-3 shrink-0"
          >
            <Tag :label="service"/>
          </div>
        </Slider>

        <h1 class="text-h1">
          {{ servicesPageTitle }}
        </h1>

        <div class="grid grid-cols-2 max-xl-plus:grid-cols-1 gap-size-12">
          <div class="flex flex-col gap-size-8">
            <p class="text-grey">
              {{ servicesPageDescription }}
            </p>

            <ContactUsFeature
              as-button
              class="self-start"
            />
          </div>

          <div class="flex flex-wrap gap-size-3 max-xl-plus:hidden">
            <Tag
              v-for="service in servicesPageTags"
              :key="`service-page-tag-${service}`"
              :label="service"
            />
          </div>
        </div>
      </div>
    </Container>

    <div class="flex flex-col gap-size-42 max-xl-plus:gap-size-24">
      <ServicesList
        show-full-info
        without-numbering
      />

      <ApproachWidget />

      <FormsOfCooperation />

      <ServicesPageFounderMessage />

      <ServicesPageProjectTypes />

      <ServicesPageReviews />

      <ProjectsWidget
        :limit="2"
        no-steps
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDomainLink } from '~/global/lib'
import ContactUsFeature from '../features/contact-us-feature.vue'
import { Tag, Icon, Container, Slider } from '@/global/ui'
import { ServicesList } from '~/features'
import SplitBlock from '@/global/ui/split-block/split-block.vue'
import { ApproachWidget } from '~/widgets/approach'
import { FormsOfCooperation } from '~/widgets/forms-of-cooperation'
import AutoScroll from 'embla-carousel-auto-scroll'
import { ServicesPageReviews, ServicesPageFounderMessage, ServicesPageProjectTypes } from '~/widgets/services-page'
import { ProjectsWidget } from '~/widgets/projects'

defineOptions({
  name: 'ServicesPage'
})

const {
  title: servicesPageTitle,
  description: servicesPageDescription,
  tags: servicesPageTags,
} = await queryCollection('servicesPage')
  .first()
</script>
