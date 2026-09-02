import type { TeamMember } from '@/types/content'

const portalTeamMembers: readonly TeamMember[] = [
  {
    id: 'joel-carolino-farias',
    name: 'Joel Carolino Farias',
    role: 'Analista de Dados e IA',
    category: 'Equipe Técnica',
    linkedin: 'https://www.linkedin.com/in/joel-carolinof/',
  },
]

const normalizeLinkedin = (value?: string) => {
  if (!value) return ''
  try {
    const url = new URL(value)
    return `${url.hostname.replace(/^www\./, '')}${url.pathname}`.replace(/\/$/, '').toLowerCase()
  } catch {
    return value.replace(/\/$/, '').toLowerCase()
  }
}

export function mergeTeamMembers(remoteMembers: readonly TeamMember[]): TeamMember[] {
  const remoteLinkedin = new Set(remoteMembers.map((member) => normalizeLinkedin(member.linkedin)))
  return [
    ...remoteMembers,
    ...portalTeamMembers.filter(
      (member) => !remoteLinkedin.has(normalizeLinkedin(member.linkedin)),
    ),
  ]
}
