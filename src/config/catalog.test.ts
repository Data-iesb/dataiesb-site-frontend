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
  it('keeps the existing reports, maps national AIH to SUS, and adds the two missing SUS panels', () => {
    const result = buildApplicationCatalog(reports)

    expect(result.map((item) => item.key)).toEqual([
      'report-28',
      'sus-aih',
      'sus-ambulatorial',
      'sus-sinan',
    ])
    expect(new Set(result.map((item) => item.href)).size).toBe(result.length)
    expect(result.find((item) => item.key === 'sus-aih')?.title).toBe('SUS – AIH – Brasil')
  })

  it('features the three newest general reports together with all SUS dashboards', () => {
    const manyReports: PublicReport[] = Array.from({ length: 7 }, (_, index) => ({
      id: index + 1,
      title: `Relatório ${index + 1}`,
      author: 'DATA IESB',
      description: 'Estudo',
      createdAt: `2026-08-${String(index + 1).padStart(2, '0')}T12:00:00Z`,
    }))

    expect(getFeaturedApplications(manyReports).map((item) => item.key)).toEqual([
      'report-7', 'report-6', 'report-5', 'sus-aih', 'sus-ambulatorial', 'sus-sinan',
    ])
  })
})

describe('dashboard registry', () => {
  it('exposes the approved crop contract for each SUS dashboard', () => {
    expect(getDashboardBySlug('sus-aih')?.crop).toEqual({
      desktop: { top: 64, left: 0, bottom: 0 },
      mobile: { top: 64, left: 0, bottom: 0 },
    })
    expect(getDashboardBySlug('producao-ambulatorial')?.crop).toEqual({
      desktop: { top: 64, left: 56, bottom: 0 },
      mobile: { top: 64, left: 0, bottom: 64 },
    })
  })
})
