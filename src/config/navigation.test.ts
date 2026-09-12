import { describe, expect, it } from 'vitest'

import { navigationGroups } from './navigation'

describe('navigationGroups', () => {
  it('organizes the portal according to the professor brief without excluded FUNASA areas', () => {
    expect(navigationGroups.map((group) => group.label)).toEqual([
      'Visão geral',
      'Inteligência Artificial',
      'Eleições',
      'SUS Assistência à Saúde',
      'Educação',
      'Conheça o seu Município',
      'Estudos e Publicações',
      'Trabalhos Acadêmicos',
      'Institucional',
    ])

    const labels = navigationGroups.flatMap((group) => group.items.map((item) => item.label))
    expect(labels.filter((label) => label === 'Atena')).toHaveLength(1)
    expect(labels).not.toContain('Atena SUS')
    expect(labels).not.toContain('Explorar catálogo')
    expect(labels).toContain('Censo Escolar — Ensino Médio e Fundamental')
    expect(labels).toContain('PIB dos Municípios')
    expect(labels).toContain('Setores Censitários 2022')
    expect(labels).toContain('Painel das Prefeituras')
    expect(labels).toContain('Clusters LISA')
    expect(labels).toContain('Como Votamos')
    expect(labels).toContain('Trabalhos de Conclusão de Curso (TCC)')
    expect(labels).toContain('Dissertações de Mestrado (Geo)')
    expect(labels).not.toContain('Aqui Tem Funasa')
    expect(labels).not.toContain('Gestão de Convênios')
  })

  it('keeps academic work entries visible without navigation until their pages are published', () => {
    const items = navigationGroups.flatMap((group) => group.items)
    expect(items.find((item) => item.id === 'trabalhos-tcc')).toMatchObject({ disabled: true })
    expect(items.find((item) => item.id === 'trabalhos-dissertacoes-geo')).toMatchObject({ disabled: true })
  })

  it('directs the assistant entry to the Atena hub', () => {
    const items = navigationGroups.flatMap((group) => group.items)
    expect(items.find((item) => item.id === 'iara-sus')).toBeUndefined()
    expect(items.find((item) => item.id === 'aurya-sus')).toBeUndefined()
    expect(items.find((item) => item.id === 'aurya')).toMatchObject({
      label: 'Atena',
      href: '/assistentes/',
    })
  })
})
