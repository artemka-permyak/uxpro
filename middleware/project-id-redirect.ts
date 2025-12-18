export default defineNuxtRouteMiddleware(async (to) => {
  const slug = String(to.params.slug)

  if (!/^\d+$/.test(slug)) return

  const projectById = await queryCollection('projects')
    .where('projectId', '=', slug)
    .first()

  if (projectById?.slug) {
    return navigateTo({
      name: to.name,
      params: {
        slug: projectById.slug,
      },
    }, {
      replace: true
    })
  }

  return navigateTo({
    name: 'index'
  })
})
