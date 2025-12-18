import getStorageName from '~/global/lib/storage-name'

export default function getStorageLink(path: string) {
  return `${getStorageName()}${path}`
}
