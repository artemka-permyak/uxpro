export default function isActiveLinks(paths: string | string[], isExact = true) {
  const route = useRoute();

  if (Array.isArray(paths)) {
    return computed(() => {
      return paths.map(path => {
        const splitPath = path.split('/');
        const isLastSlash = !splitPath[splitPath.length - 1]

        const fullPaths = [
          path,
          isLastSlash ? path.slice(0, path.length - 1) : `${path}/`
        ]

        return isExact ? fullPaths.includes(route.fullPath) : route.fullPath.includes(path)
      })
    })
  } else {
    return computed(() => {
      const splitPath = paths.split('/');
      const isLastSlash = !splitPath[splitPath.length - 1]

      const fullPaths = [
        paths,
        isLastSlash ? paths.slice(0, paths.length - 1) : `${paths}/`
      ]

      return isExact ? fullPaths.includes(route.fullPath) : route.fullPath.includes(paths)
    })
  }
}
