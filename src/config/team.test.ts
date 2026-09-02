import { describe, expect, it } from 'vitest'

import type { TeamMember } from '@/types/content'

import { mergeTeamMembers } from './team'

const remoteMember: TeamMember = {
  id: 'remote@example.org',
  name: 'Pessoa Remota',
  role: 'Analista de Dados e IA',
  category: 'Equipe Técnica',
}

describe('mergeTeamMembers', () => {
  it('keeps the portal technical contributor when the public API does not list him', () => {
    expect(mergeTeamMembers([remoteMember])).toEqual([
      remoteMember,
      expect.objectContaining({
        id: 'joel-carolino-farias',
        name: 'Joel Carolino Farias',
        role: 'Analista de Dados e IA',
        category: 'Equipe Técnica',
        linkedin: 'https://www.linkedin.com/in/joel-carolinof/',
      }),
    ])
  })

  it('does not duplicate the contributor when the API later includes the same LinkedIn profile', () => {
    const apiJoel: TeamMember = {
      id: 'joel@example.org',
      name: 'Joel C. Farias',
      role: 'Função atualizada pela API',
      category: 'Equipe Técnica',
      linkedin: 'https://linkedin.com/in/joel-carolinof',
    }

    expect(mergeTeamMembers([apiJoel])).toEqual([apiJoel])
  })
})
