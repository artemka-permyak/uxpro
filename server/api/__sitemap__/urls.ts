export default defineSitemapEventHandler(async (event) => {
  const slugs = [
    'digital-profile',
    'jarvis',
    'profibonus'
  ]

  return slugs.map(slug => ({
    loc: `/projects/${slug}`,
  }));
});
