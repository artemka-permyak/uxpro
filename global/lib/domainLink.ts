import getDomainName from '~/global/lib/domainName'

export default function getDomainLink(path: string) {
  return `${getDomainName()}${path}`
}
