import { describe, expect, it } from 'vitest'

import { parseNewsResponse, parseReportsResponse, parseTeamResponse } from './data-contracts'

describe('parseNewsResponse', () => {
  it('rejects a malformed response envelope', () => {
    expect(() => parseNewsResponse({ message: 'upstream error' })).toThrow('notícias')
  })

  it('keeps complete posts and normalizes markdown emphasis in titles', () => {
    const result = parseNewsResponse({
      posts: [
        {
          title: '*Como Votei*: mapa eleitoral interativo',
          slug: 'como-votei',
          excerpt: 'Dados do TSE e do IBGE.',
          published_at: '2026-06-19T11:00:00Z',
          feature_image: 'https://images.example/como-votei.png',
          html: '<p>Conteúdo</p>',
        },
        { title: 'Sem slug' },
      ],
    })

    expect(result).toEqual([
      {
        title: 'Como Votei: mapa eleitoral interativo',
        slug: 'como-votei',
        excerpt: 'Dados do TSE e do IBGE.',
        publishedAt: '2026-06-19T11:00:00Z',
        featureImage: 'https://images.example/como-votei.png',
        html: '<p>Conteúdo</p>',
      },
    ])
  })
})

describe('parseReportsResponse', () => {
  it('rejects a gateway payload instead of treating it as an empty catalog', () => {
    expect(() => parseReportsResponse({ message: 'upstream error' })).toThrow('aplicações')
  })

  it('maps the keyed API object and excludes deleted or malformed reports', () => {
    const result = parseReportsResponse({
      '32': {
        titulo: 'SUS – AIH – Brasil',
        autor: 'DataIESB / FUNASA',
        descricao: 'Painel nacional.',
        id_s3: '32',
        deletado: false,
        image_url: 'https://images.example/32.png',
        url: 'https://app.dataiesb.com/sus-aih/',
      },
      '28': {
        titulo: 'SUS – AIH – RIDE-DF',
        autor: 'Equipe acadêmica',
        descricao: 'Estudo regional.',
        id_s3: '28',
        deletado: false,
        image_url: 'https://images.example/28.png',
      },
      '9': { titulo: 'Removido', id_s3: '9', deletado: true },
      bad: { titulo: 'ID inválido', id_s3: 'abc', deletado: false },
    })

    expect(result).toEqual([
      {
        id: 32,
        title: 'SUS – AIH – Brasil',
        author: 'DataIESB / FUNASA',
        description: 'Painel nacional.',
        createdAt: undefined,
        imageUrl: 'https://images.example/32.png',
        url: 'https://app.dataiesb.com/sus-aih/',
      },
      {
        id: 28,
        title: 'SUS – AIH – RIDE-DF',
        author: 'Equipe acadêmica',
        description: 'Estudo regional.',
        createdAt: undefined,
        imageUrl: 'https://images.example/28.png',
        url: undefined,
      },
    ])
  })
})

describe('parseTeamResponse', () => {
  it('rejects an unsuccessful response envelope', () => {
    expect(() => parseTeamResponse({ success: false, data: [] })).toThrow('equipe')
  })

  it('returns active members grouped by the API category contract', () => {
    const result = parseTeamResponse({
      success: true,
      data: [
        {
          id: 'coord@iesb.edu.br',
          name: 'Profa. Coordenação',
          role: 'Coordenadora Acadêmica',
          category: 'Coordenação',
          active: true,
          linkedin: null,
          escavador: 'https://www.escavador.com/sobre/coordenacao',
        },
        {
          id: 'inativo@iesb.edu.br',
          name: 'Membro inativo',
          role: 'Analista',
          category: 'Equipe Técnica',
          active: false,
        },
      ],
    })

    expect(result).toEqual([
      {
        id: 'coord@iesb.edu.br',
        name: 'Profa. Coordenação',
        role: 'Coordenadora Acadêmica',
        category: 'Coordenação',
        linkedin: undefined,
        escavador: 'https://www.escavador.com/sobre/coordenacao',
      },
    ])
  })
})
