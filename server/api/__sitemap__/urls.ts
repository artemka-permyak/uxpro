export default defineSitemapEventHandler(async () => {
  const { data: projects } = await fetch(`${process.env.DOMAIN_NAME}/api/projects`).then(res => res.json());

  return projects.map((project: { id: number }) => ({
    loc: `/project/${project.id}`
  }));
});
