export default function isContactsPage() {
  const route = useRoute()

  return computed(() => {
    return ['/contact-us', '/contact-us/'].includes(route.path)
  })
}
