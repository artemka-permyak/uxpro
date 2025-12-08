import getDomainName from '~/global/lib/domain-name'

export default function getDomainLink(path: string) {
  return `${getDomainName()}${path}`
}
