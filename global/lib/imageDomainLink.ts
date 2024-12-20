import getDomainName from '~/global/lib/domainName'

export default function getImageDomainLink(path: string) {
  return `${getDomainName()}${path}`
}
