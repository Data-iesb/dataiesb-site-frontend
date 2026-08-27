import type {
  ApplicationCatalogItem,
  DashboardDefinition,
  PublicReport,
} from '@/types/content'

const ALLOWED_EMBED_HOSTS = new Set(['app.dataiesb.com', 'funasa.dataiesb.com'])

const envOr = (value: string | undefined, fallback: string) => value?.trim() || fallback

export const dashboards: readonly DashboardDefinition[] = [
  {
    slug: 'sus-aih',
    title: 'SUS — Autorizações de Internação Hospitalar (AIH)',
    shortTitle: 'Internações hospitalares — AIH',
    description: 'Gastos, procedimentos e tendências das internações hospitalares no Brasil.',
    sourceUrl: envOr(
      process.env.NEXT_PUBLIC_SUS_AIH_URL,
      'https://app.dataiesb.com/sus-aih/',
    ),
    crop: {
      desktop: { top: 64, left: 0, bottom: 0 },
      mobile: { top: 64, left: 0, bottom: 0 },
    },
  },
  {
    slug: 'producao-ambulatorial',
    title: 'SUS — Produção Ambulatorial',
    shortTitle: 'Produção ambulatorial',
    description: 'Procedimentos ambulatoriais aprovados por região, UF e município.',
    sourceUrl: envOr(
      process.env.NEXT_PUBLIC_SUS_AMBULATORIAL_URL,
      'https://funasa.dataiesb.com/ambulatorio/',
    ),
    crop: {
      desktop: { top: 64, left: 56, bottom: 0 },
      mobile: { top: 64, left: 0, bottom: 64 },
    },
  },
  {
    slug: 'sinan-doencas-agravos',
    title: 'SUS — SINAN: Doenças e Agravos',
    shortTitle: 'SINAN — Doenças e Agravos',
    description: 'Casos notificados por doença, período e município no território nacional.',
    sourceUrl: envOr(
      process.env.NEXT_PUBLIC_SUS_SINAN_URL,
      'https://funasa.dataiesb.com/doencas-agravos/',
    ),
    crop: {
      desktop: { top: 64, left: 56, bottom: 0 },
      mobile: { top: 64, left: 0, bottom: 64 },
    },
  },
]

export function isAllowedEmbedUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && ALLOWED_EMBED_HOSTS.has(url.hostname)
  } catch {
    return false
  }
}

export function resolveReportEmbed(report: PublicReport): string {
  if (report.url && isAllowedEmbedUrl(report.url)) return report.url
  return `https://app.dataiesb.com/report/?id=${report.id}`
}

export function getDashboardBySlug(slug: string) {
  return dashboards.find((dashboard) => dashboard.slug === slug)
}

export function buildApplicationCatalog(reports: readonly PublicReport[]): ApplicationCatalogItem[] {
  const generalReports = [...reports]
    .filter((report) => report.id !== 32)
    .sort((first, second) => {
      const firstDate = first.createdAt ? Date.parse(first.createdAt) : Number.NaN
      const secondDate = second.createdAt ? Date.parse(second.createdAt) : Number.NaN
      if (!Number.isNaN(firstDate) && !Number.isNaN(secondDate) && firstDate !== secondDate) {
        return secondDate - firstDate
      }
      return second.id - first.id
    })
    .map((report) => ({
      key: `report-${report.id}`,
      title: report.title,
      description: report.description,
      eyebrow: report.url ? 'Painel interativo' : 'Estudo',
      author: report.author,
      href: `/aplicacoes/visualizar/?id=${report.id}`,
      imageUrl: report.imageUrl,
    }))

  const nationalAih = reports.find((report) => report.id === 32)
  const susItems: ApplicationCatalogItem[] = [
    {
      key: 'sus-aih',
      title: nationalAih?.title ?? dashboards[0].shortTitle,
      description: nationalAih?.description ?? dashboards[0].description,
      eyebrow: 'SUS Assistência à Saúde',
      author: nationalAih?.author ?? 'DataIESB / FUNASA',
      href: '/paineis/sus-aih/',
      imageUrl: nationalAih?.imageUrl,
    },
    {
      key: 'sus-ambulatorial',
      title: dashboards[1].shortTitle,
      description: dashboards[1].description,
      eyebrow: 'SUS Assistência à Saúde',
      author: 'DataIESB / FUNASA',
      href: '/paineis/producao-ambulatorial/',
    },
    {
      key: 'sus-sinan',
      title: dashboards[2].shortTitle,
      description: dashboards[2].description,
      eyebrow: 'SUS Assistência à Saúde',
      author: 'DataIESB / FUNASA',
      href: '/paineis/sinan-doencas-agravos/',
    },
  ]

  return [...generalReports, ...susItems]
}

export function getFeaturedApplications(reports: readonly PublicReport[]) {
  const catalog = buildApplicationCatalog(reports)
  const general = catalog.filter((item) => item.eyebrow !== 'SUS Assistência à Saúde').slice(0, 3)
  const sus = catalog.filter((item) => item.eyebrow === 'SUS Assistência à Saúde')
  return [...general, ...sus]
}
