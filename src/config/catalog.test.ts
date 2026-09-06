import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import {
  buildApplicationCatalog,
  getDashboardBySlug,
  getFeaturedApplications,
  isAllowedEmbedUrl,
  resolveReportEmbed,
} from './catalog'
import type { PublicReport } from '@/types/content'

const reports: PublicReport[] = [
  {
    id: 32,
    title: 'SUS – AIH – Brasil',
    author: 'DataIESB / FUNASA',
    description: 'Painel nacional.',
    imageUrl: 'https://images.example/32.png',
    url: 'https://app.dataiesb.com/sus-aih/',
  },
  {
    id: 28,
    title: 'SUS – AIH – RIDE-DF',
    author: 'Equipe acadêmica',
    description: 'Estudo regional.',
    imageUrl: 'https://images.example/28.png',
  },
]

describe('isAllowedEmbedUrl', () => {
  it('allows only HTTPS dashboards from the two approved hosts', () => {
    expect(isAllowedEmbedUrl('https://app.dataiesb.com/votei/')).toBe(true)
    expect(isAllowedEmbedUrl('https://funasa.dataiesb.com/ambulatorio/')).toBe(true)
    expect(isAllowedEmbedUrl('http://app.dataiesb.com/votei/')).toBe(false)
    expect(isAllowedEmbedUrl('https://app.dataiesb.com.evil.example/votei/')).toBe(false)
    expect(isAllowedEmbedUrl('javascript:alert(1)')).toBe(false)
  })
})

describe('resolveReportEmbed', () => {
  it('uses an approved report URL and derives the canonical viewer otherwise', () => {
    expect(resolveReportEmbed(reports[0])).toBe('https://app.dataiesb.com/sus-aih/')
    expect(resolveReportEmbed(reports[1])).toBe('https://app.dataiesb.com/report/?id=28')
  })

  it('rejects an unapproved source instead of forwarding it', () => {
    expect(resolveReportEmbed({ ...reports[1], url: 'https://evil.example/report/28' })).toBe(
      'https://app.dataiesb.com/report/?id=28',
    )
  })
})

describe('buildApplicationCatalog', () => {
  it('keeps existing reports, deduplicates national AIH, and adds every professor-requested panel', () => {
    const result = buildApplicationCatalog(reports)

    expect(result.map((item) => item.key)).toEqual([
      'report-28',
      'sus-aih',
      'sus-ambulatorial',
      'sus-sinan',
      'educacao-escolas',
      'municipio-pib',
      'municipio-setores',
      'municipio-prefeituras',
      'estudos-clusters-lisa',
    ])
    expect(new Set(result.map((item) => item.href)).size).toBe(result.length)
    expect(result.find((item) => item.key === 'sus-aih')?.title).toBe('SUS – AIH – Brasil')
  })

  it('features Como Votei and every integrated panel without unrelated reports', () => {
    const manyReports: PublicReport[] = [
      ...reports,
      { id: 33, title: 'Como Votei', author: 'DATA IESB', description: 'Eleições na RIDE-DF' },
      { id: 34, title: 'Outro estudo', author: 'DATA IESB', description: 'Estudo mais recente' },
    ]

    expect(getFeaturedApplications(manyReports).map((item) => item.key)).toEqual([
      'report-33',
      'sus-aih',
      'sus-ambulatorial',
      'sus-sinan',
      'educacao-escolas',
      'municipio-pib',
      'municipio-setores',
      'municipio-prefeituras',
      'estudos-clusters-lisa',
    ])
  })
})

describe('dashboard registry', () => {
  it('documents the direct Aurya SUS route for environment-based builds', () => {
    expect(readFileSync('.env.example', 'utf8')).toContain(
      'NEXT_PUBLIC_IARA_SUS_URL=https://funasa.dataiesb.com/chatbot?agent=sus',
    )
  })

  it('locks the full reveal, crop, and mobile-scale contract for all nine embeds', () => {
    const zeroCrop = {
      desktop: { top: 0, left: 0, bottom: 0 },
      mobile: { top: 0, left: 0, bottom: 0 },
    }
    const contracts = [
      ['sus-aih', 11_000, undefined, { desktop: { top: 68, left: 0, bottom: 0 }, mobile: { top: 130, left: 0, bottom: 0 } }],
      ['producao-ambulatorial', 15_000, undefined, { desktop: { top: 71, left: 0, bottom: 0 }, mobile: { top: 150, left: 0, bottom: 0 } }],
      ['sinan-doencas-agravos', 7_000, undefined, { desktop: { top: 121, left: 0, bottom: 0 }, mobile: { top: 85, left: 0, bottom: 0 } }],
      ['iara-sus', 2_000, undefined, { desktop: { top: 64, left: 56, bottom: 0 }, mobile: { top: 60, left: 0, bottom: 0 } }],
      ['inep', 6_000, undefined, zeroCrop],
      ['pib', 6_000, undefined, { desktop: { top: 121, left: 0, bottom: 0 }, mobile: { top: 85, left: 0, bottom: 0 } }],
      ['setores-censitarios', 8_000, 0.8, zeroCrop],
      ['prefeituras', 9_000, undefined, { desktop: { top: 96, left: 0, bottom: 0 }, mobile: { top: 112, left: 0, bottom: 0 } }],
      ['clusters-lisa', 9_000, undefined, zeroCrop],
    ] as const

    for (const [slug, revealDelayMs, mobileScale, crop] of contracts) {
      const dashboard = getDashboardBySlug(slug)
      expect(dashboard, slug).toBeDefined()
      expect({
        revealDelayMs: dashboard?.revealDelayMs,
        mobileScale: dashboard?.mobileScale,
        crop: dashboard?.crop,
      }, slug).toEqual({ revealDelayMs, mobileScale, crop })
    }

    expect(getDashboardBySlug('iara-sus')).toMatchObject({
      title: 'Aurya SUS',
      shortTitle: 'Aurya SUS',
      sourceUrl: 'https://funasa.dataiesb.com/chatbot?agent=sus',
      mask: {
        desktopBottom: 50,
        mobileBottom: 0,
        desktopTopLeft: { width: 280, height: 43 },
      },
    })
  })
})
