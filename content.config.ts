import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    servicesPage: defineCollection({
      type: 'data',
      source: 'services/services-page/services-page.{yaml,yml}',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
      })
    }),

    servicesPageFounderMessage: defineCollection({
      type: 'data',
      source: 'services/services-page/services-page-founder-message.{yaml,yml}',
      schema: z.object({
        title: z.string(),
        author: z.object({
          name: z.string(),
          description: z.string(),
        })
      })
    }),

    servicesProjectTypes: defineCollection({
      type: 'data',
      source: 'services/services-project-types.{yaml,yml}',
      schema: z.object({
        title: z.string(),
        types: z.array(z.string()),
      })
    }),

    services: defineCollection({
      type: 'data',
      source: 'services/services.{yaml,yml}',
      schema: z.object({
        services: z.array(z.object({
          title: z.string(),
          description: z.string(),
          secondDescription: z.string(),
        })),
      })
    }),

    servicesApproach: defineCollection({
      type: 'data',
      source: 'services/services-approach.{yaml,yml}',
      schema: z.object({
        title: z.string(),
        info: z.string(),
        infoDescription: z.array(z.string()),
      })
    }),

    servicesFormsOfCooperation: defineCollection({
      type: 'data',
      source: 'services/services-forms-of-cooperation.{yaml,yml}',
      schema: z.object({
        title: z.string(),
        formsOfCooperation: z.array(z.object({
          title: z.string(),
          description: z.string(),
          price: z.string(),
          id: z.string(),
        })),
      })
    }),

    servicesReviews: defineCollection({
      type: 'data',
      source: 'services/services-reviews.{yaml,yml}',
      schema: z.object({
        title: z.string(),
        reviews: z.array(z.object({
          description: z.string(),
          id: z.string(),
          author: z.object({
            name: z.string(),
            image: z.string(),
            description: z.string(),
          }),
        })),
      })
    }),

    projects: defineCollection({
      type: 'data',
      source: 'projects/**/index.{yaml,yml}',
      schema: z.object({
        slug: z.string(),
        projectId: z.string(),
        disabled: z.string(),
        title: z.string(),
        description: z.array(z.string()),
        publishYear: z.string(),
        createdAt: z.string().datetime(),
        completedWorks: z.array(z.string()),
        preview: z.object({
          image: z.string(),
          description: z.string(),
        }),
        tags: z.array(z.string()),
        media: z.array(z.object({
          src: z.string(),
          type: z.string(),
        })),
        awards: z.array(z.object({
          src: z.string(),
          title: z.string(),
          description: z.string(),
        }))
      })
    }),

    projectsBlocks: defineCollection({
      type: 'data',
      source: 'projects/**/blocks/*.{yaml,yml}',
      schema: z.object({
        blockId: z.string(),
        projectId: z.string(),
        type: z.string(),
        title: z.string(),
        content: z.array(z.object({
          title: z.string(),
          description: z.string(),
          dedicatedDescription: z.string(),
        })),
        ordinaryTitle: z.string().nullable(),
        ordinaryContent: z.string().nullable(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
        description: z.array(z.string()),
        order: z.string(),
        review: z.array(z.string()),
        reviewerName: z.string().nullable(),
        reviewerPhoto: z.string().nullable(),
        reviewerJobTitle: z.string().nullable(),
        media: z.array(z.object({
          src: z.string(),
          type: z.string(),
          poster: z.string(),
          row: z.string().nullable(),
          cols: z.string().nullable(),
          media: z.array(z.object({
            src: z.string(),
            type: z.string(),
          })),
        })),
        dedicatedDescription: z.array(z.string()),
      })
    }),

    lastProjects: defineCollection({
      type: 'data',
      source: 'projects/**/last-projects.{yaml,yml}',
      schema: z.object({
        title: z.string(),
        projects: z.array(z.object({
          id: z.string(),
          isNda: z.string(),
          title: z.string(),
          directory: z.string(),
          deadline: z.string(),
          tags: z.array(z.string()),
          position: z.string(),
        })),
      })
    }),
  }
})
