export default function isShowFullHeader() {
  const route = useRoute();

  return computed(() => {
    return !route.path.includes('/projects')
  })
}
