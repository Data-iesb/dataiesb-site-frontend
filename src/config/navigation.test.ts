import { describe, expect, it } from 'vitest'

import { navigationGroups } from './navigation'

describe('navigationGroups', () => {
  it('organizes the portal according to the professor brief without excluded FUNASA areas', () => {
    expect(navigationGroups.map((group) => group.label)).toEqual([
      'Visão geral',
      'Inteligência Artificial',
      'SUS Assistência à Saúde',
      'Educação',
      'Conheça o seu Município',
      'Estudos e Publicações',
      'Institucional',
    ])

    const labels = navigationGroups.flatMap((group) => group.items.map((item) => item.label))
    expect(labels).not.toContain('Aurya')
    expect(labels.filter((label) => label === 'Aurya SUS')).toHaveLength(1)
    expect(labels).not.toContain('Explorar catálogo')
    expect(labels).toContain('Censo Escolar — Ensino Médio e Fundamental')
    expect(labels).toContain('PIB dos Municípios')
    expect(labels).toContain('Setores Censitários 2022')
    expect(labels).toContain('Painel das Prefeituras')
    expect(labels).toContain('Clusters LISA')
    expect(labels).not.toContain('Aqui Tem Funasa')
    expect(labels).not.toContain('Gestão de Convênios')
  })

  it('directs the only assistant entry to the Aurya SUS environment', () => {
    const items = navigationGroups.flatMap((group) => group.items)
    expect(items.find((item) => item.id === 'aurya')).toBeUndefined()
    expect(items.find((item) => item.id === 'iara-sus')).toMatchObject({
      label: 'Aurya SUS',
      href: '/assistentes/aurya-sus/',
    })
  })
})
