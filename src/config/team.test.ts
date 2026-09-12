import { describe, expect, it } from 'vitest'

import { portalTeamMembers } from './team'

describe('portalTeamMembers', () => {
  it('uses the roster registered for Projeto Big Data IESB', () => {
    expect(portalTeamMembers).toHaveLength(13)
    expect(portalTeamMembers.map((member) => member.name)).toContain('Marco Antônio Valério Da Cunha')
    expect(portalTeamMembers.map((member) => member.name)).toContain('Sérgio da Costa Côrtes')
  })

  it('associates available photos without hiding members that do not yet have one', () => {
    expect(portalTeamMembers.filter((member) => member.photoUrl)).toHaveLength(9)
    expect(portalTeamMembers.find((member) => member.id === 'kaike-armond-costa')).not.toHaveProperty('photoUrl')
  })
})
