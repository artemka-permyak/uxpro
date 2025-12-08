import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    services: defineCollection({
      type: 'page',
      source: 'services/*.{yaml,yml}',
    }),

    projects: defineCollection({
      type: 'page',
      source: 'projects/**/index.{yaml,yml}',
    }),

    projectsBlocks: defineCollection({
      type: 'page',
      source: 'projects/**/blocks/*.{yaml,yml}',
    }),

    lastProjects: defineCollection({
      type: 'page',
      source: 'projects/**/last-projects.{yaml,yml}',
    }),
  }
})
