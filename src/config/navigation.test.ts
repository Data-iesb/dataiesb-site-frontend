import { describe, expect, it } from 'vitest'

import { navigationGroups } from './navigation'

describe('navigationGroups', () => {
  it('organizes the portal according to the professor brief without excluded FUNASA areas', () => {
    expect(navigationGroups.map((group) => group.label)).toEqual([
      'Visão geral',
      'Inteligência Artificial',
      'SUS Assistência à Saúde',
      'Panorama da Educação no Brasil',
      'Conheça o seu Município',
      'Estudos e Publicações',
      'Institucional',
    ])

    const labels = navigationGroups.flatMap((group) => group.items.map((item) => item.label))
    expect(labels).toContain('Aurya')
    expect(labels).toContain('Aurya — SUS')
    expect(labels.filter((label) => label === 'Aurya')).toHaveLength(1)
    expect(labels).toContain('Saúde Ambiental nas Escolas')
    expect(labels).toContain('PIB dos Municípios')
    expect(labels).toContain('Setores Censitários 2022')
    expect(labels).toContain('Painel das Prefeituras')
    expect(labels).toContain('Clusters LISA')
    expect(labels).not.toContain('Aqui Tem Funasa')
    expect(labels).not.toContain('Gestão de Convênios')
  })

  it('keeps the official Aurya external and the temporary Aurya integration inside the portal', () => {
    const items = navigationGroups.flatMap((group) => group.items)
    expect(items.find((item) => item.id === 'aurya')).toMatchObject({
      href: 'https://aurya.dataiesb.com',
      external: true,
    })
    expect(items.find((item) => item.id === 'iara-sus')).toMatchObject({
      label: 'Aurya — SUS',
      href: '/assistentes/iara-sus/',
    })
  })
})
