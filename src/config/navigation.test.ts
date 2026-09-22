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
      'Meio Ambiente',
      'Conhecendo os nossos municípios',
      'Estudos e Publicações',
      'Trabalhos Acadêmicos',
      'Institucional',
      'Exemplos de Aplicações com ferramentas de IA - AWS',
    ])

    const labels = navigationGroups.flatMap((group) => group.items.map((item) => item.label))
    expect(labels.filter((label) => label === 'Athena')).toHaveLength(1)
    expect(labels).not.toContain('Athena SUS')
    expect(labels).not.toContain('Explorar catálogo')
    expect(labels).toContain('Censo Escolar — Ensino Médio e Fundamental')
    expect(labels).toContain('Conheça o seu Município')
    expect(labels).toContain('Mestrado e Doutorado')
    expect(labels).toContain('Queimadas')
    expect(labels).toContain('Setores Censitários 2022')
    expect(labels).toContain('Painel das Prefeituras')
    expect(labels).toContain('Clusters LISA')
    expect(labels).toContain('Como Votamos')
    expect(labels).toContain('Trabalhos de Conclusão de Curso (TCC)')

    expect(navigationGroups.find((group) => group.label === 'Educação')?.items.map((item) => item.label)).toEqual([
      'Censo Escolar — Ensino Médio e Fundamental',
      'Educação Superior',
      'Mestrado e Doutorado',
    ])
    expect(labels).toContain('Dissertações de Mestrado (Geo)')
    expect(labels).not.toContain('Aqui Tem Funasa')
    expect(labels).not.toContain('Gestão de Convênios')

    expect(navigationGroups.at(-1)).toEqual({
      label: 'Exemplos de Aplicações com ferramentas de IA - AWS',
      items: [],
    })
  })

  it('keeps academic work entries visible without navigation until their pages are published', () => {
    const items = navigationGroups.flatMap((group) => group.items)
    expect(items.find((item) => item.id === 'trabalhos-tcc')).toMatchObject({ disabled: true })
    expect(items.find((item) => item.id === 'trabalhos-dissertacoes-geo')).toMatchObject({ disabled: true })
  })

  it('directs the assistant entry to the Athena hub', () => {
    const items = navigationGroups.flatMap((group) => group.items)
    expect(items.find((item) => item.id === 'iara-sus')).toBeUndefined()
    expect(items.find((item) => item.id === 'aurya-sus')).toBeUndefined()
    expect(items.find((item) => item.id === 'aurya')).toMatchObject({
      label: 'Athena',
      href: '/assistentes/',
    })
  })
})
