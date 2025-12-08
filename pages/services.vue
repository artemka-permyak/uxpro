<template>
  <div class="flex flex-col gap-size-32 max-xl-plus:gap-size-24">
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
            v-for="service in servicesPage.tags"
            :key="`mobile-service-page-tag-${service}`"
            class="pl-size-3 shrink-0"
          >
            <Tag :label="service"/>
          </div>
        </Slider>

        <h1 class="text-h1">
          {{ servicesPage.title }}
        </h1>

        <div class="grid grid-cols-2 max-xl-plus:grid-cols-1 gap-size-12">
          <div class="flex flex-col gap-size-8">
            <p class="text-grey">
              {{ servicesPage.description }}
            </p>

            <ContactUsFeature
              as-button
              class="self-start"
            />
          </div>

          <div class="flex flex-wrap gap-size-3 max-xl-plus:hidden">
            <Tag
              v-for="service in servicesPage.tags"
              :key="`service-page-tag-${service}`"
              :label="service"
            />
          </div>
        </div>
      </div>
    </Container>

    <ServicesList
      show-full-info
      without-numbering
    />

    <Container>
      <SplitBlock>
        <template #left>
          <h3 class="text-h3 text-grey max-xl-plus:hidden">
            {{ servicesProjectTypesTitle }}
          </h3>

          <h2 class="text-h2 text-grey xl-plus:hidden">
            {{ servicesProjectTypesTitle }}
          </h2>
        </template>

        <template #right>
          <div class="flex flex-wrap gap-size-4">
            <Tag
              v-for="type in servicesProjectTypes"
              :key="`project-type-${type}`"
              :label="type"
            />
          </div>
        </template>
      </SplitBlock>
    </Container>

    <Container class="flex flex-col gap-size-8">
      <Icon
        name="review-quotes"
        :size="48"
      />

      <h2 class="text-h2">
        {{ servicesPage.founderMessage.title }}
      </h2>

      <div class="flex items-center gap-size-6">
        <NuxtImg
          :src="getDomainLink('/images/contacts/sergey-logo.png')"
          :alt="servicesPage.founderMessage.author.name"
          class="w-[8rem] h-[8rem] rounded-full object-cover"
        />

        <div class="flex flex-col gap-size-1">
          <span>
            {{ servicesPage.founderMessage.author.name }}
          </span>

          <span class="text-t3 text-grey">
            {{ servicesPage.founderMessage.author.description }}
          </span>
        </div>
      </div>
    </Container>

    <ApproachWidget />

    <ServicesPageReviews />

    <FormsOfCooperation />

    <ProjectsWidget
      :filter-fn="getFilterFnOfProjects"
      :limit="2"
      no-steps
    />
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
import { ServicesPageReviews } from '~/widgets/services-page'
import { ProjectsWidget } from '~/widgets/projects'

defineOptions({
  name: 'ServicesPage'
})

const LABELS = {
  title: 'Услуги',
  projectTypes: 'Типы проектов',
}

const {
  body: servicesPage
} = await queryCollection('services')
  .where('stem', '=', 'services/services-page')
  .first()

const {
  body: {
    title: servicesProjectTypesTitle,
    servicesProjectTypes,
  }
} = await queryCollection('services')
  .where('stem', '=', 'services/services-project-types')
  .first()

function getFilterFnOfProjects(projects) {
  return [...projects]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 2)
}
</script>
