export default defineSitemapEventHandler(async () => {
  const slugs = [
    'digital-profile',
    'jarvis',
    'profibonus'
  ]

  return slugs.map(slug => ({
    loc: `/projects/${slug}`,
  }));
});
