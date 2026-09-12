import { describe, expect, it } from 'vitest'

import { portalTeamMembers } from './team'

describe('portalTeamMembers', () => {
  it('uses the roster registered for Projeto Big Data IESB', () => {
    expect(portalTeamMembers).toHaveLength(14)
    expect(portalTeamMembers.map((member) => member.name)).toContain('Marco Antônio Valério Da Cunha')
    expect(portalTeamMembers.map((member) => member.name)).toContain('Sérgio da Costa Côrtes')
    expect(portalTeamMembers.find((member) => member.id === 'joel-carolino-farias')).toMatchObject({
      linkedin: 'https://www.linkedin.com/in/joel-carolinof/',
      lattes: 'http://lattes.cnpq.br/3218791434540061',
      github: 'https://github.com/JoelFarias',
    })
  })

  it('associates available photos without hiding members that do not yet have one', () => {
    expect(portalTeamMembers.filter((member) => member.photoUrl)).toHaveLength(9)
    expect(portalTeamMembers.find((member) => member.id === 'kaike-armond-costa')).not.toHaveProperty('photoUrl')
  })

  it('includes the registered profile links without publishing registration data', () => {
    expect(portalTeamMembers.filter((member) => member.linkedin)).toHaveLength(14)
    expect(portalTeamMembers.filter((member) => member.github)).toHaveLength(14)
    expect(portalTeamMembers.filter((member) => member.lattes)).toHaveLength(12)
    expect(portalTeamMembers.find((member) => member.id === 'arthur-souza-de-melo-rosa')).not.toHaveProperty('lattes')
  })
})
