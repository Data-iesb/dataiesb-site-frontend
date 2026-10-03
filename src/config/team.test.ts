import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { portalTeamMembers } from './team'

describe('portalTeamMembers', () => {
  it('uses the roster registered for Projeto Big Data IESB', () => {
    expect(portalTeamMembers).toHaveLength(31)
    expect(portalTeamMembers.map((member) => member.name)).toContain('Marco Antônio Valério Da Cunha')
    expect(portalTeamMembers.map((member) => member.name)).toContain('Sérgio da Costa Côrtes')
    expect(portalTeamMembers.map((member) => member.name)).toContain('Simone de Araújo Góes Assis')
    expect(portalTeamMembers.map((member) => member.name)).toContain('Ana Sophia Sousa Barros')
    expect(portalTeamMembers.find((member) => member.id === 'roberto-diniz')).toMatchObject({
      name: 'Roberto Diniz',
      linkedin: 'https://www.linkedin.com/in/s33ding/',
    })
    expect(portalTeamMembers.find((member) => member.id === 'joel-carolino-farias')).toMatchObject({
      linkedin: 'https://www.linkedin.com/in/joel-carolinof/',
      lattes: 'http://lattes.cnpq.br/3218791434540061',
      github: 'https://github.com/JoelFarias',
    })
    expect(portalTeamMembers.find((member) => member.id === 'ivan-sasha-viana-stemler')).toMatchObject({
      name: 'Ivan Sasha Viana Stemler',
      role: 'Professor Colaborador do Projeto',
      linkedin: 'https://www.linkedin.com/in/sashastemler/',
      lattes: 'http://lattes.cnpq.br/0431403577503497',
    })
    expect(portalTeamMembers.map((member) => member.id)).toEqual(expect.arrayContaining([
      'jose-roberto-steiner-de-moura',
      'ivan-sasha-viana-stemler',
    ]))
    expect(portalTeamMembers.findIndex((member) => member.id === 'ivan-sasha-viana-stemler')).toBe(
      portalTeamMembers.findIndex((member) => member.id === 'jose-roberto-steiner-de-moura') + 1,
    )
  })

  it('associates available photos without hiding members that do not yet have one', () => {
    expect(portalTeamMembers.filter((member) => member.photoUrl)).toHaveLength(21)
    expect(portalTeamMembers.find((member) => member.id === 'roberto-diniz')).not.toHaveProperty('photoUrl')
    expect(portalTeamMembers.find((member) => member.id === 'kaike-armond-costa')).not.toHaveProperty('photoUrl')
    expect(portalTeamMembers.find((member) => member.id === 'ivan-sasha-viana-stemler')).toHaveProperty('photoUrl', '/img/team/ivan-stemler.webp')
  })

  it('does not reuse the same photo for different members', () => {
    const hashes = portalTeamMembers.flatMap((member) => {
      if (!member.photoUrl) return []

      const photo = readFileSync(join(process.cwd(), 'public', member.photoUrl))
      return [createHash('sha256').update(photo).digest('hex')]
    })

    expect(new Set(hashes).size).toBe(hashes.length)
  })

  it('includes the registered profile links without publishing registration data', () => {
    expect(portalTeamMembers.filter((member) => member.linkedin)).toHaveLength(28)
    expect(portalTeamMembers.filter((member) => member.github)).toHaveLength(26)
    expect(portalTeamMembers.filter((member) => member.lattes)).toHaveLength(20)
    expect(portalTeamMembers.find((member) => member.id === 'arthur-souza-de-melo-rosa')).not.toHaveProperty('lattes')
  })

  it('keeps confirmed photo associations and omits ambiguous profile data', () => {
    const expectedPhotos = {
      'daniella-goulart': '/img/team/daniella-goulart.webp',
      'mirna-favacho-da-silveira': '/img/team/mirna-silveira.webp',
      'enzo-rodrigues-teixeira-de-andrade': '/img/team/enzo-rodrigues.webp',
      'leonardo-borges-silva-braga': '/img/team/leonardo-borges.webp',
      'igor-dos-santos-conceicao-de-andrade-filho': '/img/team/igor-andrade.webp',
      'samuel-tavares-rego': '/img/team/samuel-tavares.webp',
      'nicole-lima-duarte': '/img/team/nicole-duarte.webp',
      'mateus-de-lima-costa': '/img/team/mateus-lima-costa.webp',
    }
    for (const [id, photoUrl] of Object.entries(expectedPhotos)) {
      expect(portalTeamMembers.find((member) => member.id === id)?.photoUrl).toBe(photoUrl)
    }
    expect(new Set(portalTeamMembers.map((member) => member.id)).size).toBe(portalTeamMembers.length)
    expect(portalTeamMembers.find((member) => member.id === 'leonardo-araujo-pereira')).not.toHaveProperty('photoUrl')
    expect(portalTeamMembers.find((member) => member.id === 'daniella-goulart')).not.toHaveProperty('lattes')
    expect(portalTeamMembers.find((member) => member.id === 'leonardo-borges-silva-braga')).not.toHaveProperty('lattes')
    expect(portalTeamMembers.some((member) => member.name.includes('Helga'))).toBe(false)
  })
})
