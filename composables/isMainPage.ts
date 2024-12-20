export default function isMainPage() {
  const route = useRoute()

  return computed(() => {
    return route.fullPath === '/'
  })
}
