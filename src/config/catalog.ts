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
      'https://funasa.dataiesb.com/base-sus/',
    ),
    revealDelayMs: 11_000,
    crop: {
      desktop: { top: 68, left: 0, bottom: 0 },
      mobile: { top: 130, left: 0, bottom: 0 },
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
    revealDelayMs: 15_000,
    crop: {
      desktop: { top: 71, left: 0, bottom: 0 },
      mobile: { top: 150, left: 0, bottom: 0 },
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
    revealDelayMs: 7_000,
    crop: {
      desktop: { top: 121, left: 0, bottom: 0 },
      mobile: { top: 85, left: 0, bottom: 0 },
    },
  },
  {
    slug: 'iara-sus',
    title: 'Aurya',
    shortTitle: 'Aurya — SUS',
    description: 'Assistente de inteligência artificial para consulta às bases de dados oficiais.',
    sourceUrl: envOr(
      process.env.NEXT_PUBLIC_IARA_SUS_URL,
      'https://funasa.dataiesb.com/chatbot?agent=sus',
    ),
    revealDelayMs: 2_000,
    mask: {
      desktopBottom: 50,
      mobileBottom: 0,
      desktopTopLeft: { width: 280, height: 43 },
    },
    crop: {
      desktop: { top: 64, left: 56, bottom: 0 },
      mobile: { top: 60, left: 0, bottom: 0 },
    },
  },
  {
    slug: 'inep',
    title: 'Saúde Ambiental nas Escolas',
    shortTitle: 'Saúde Ambiental nas Escolas',
    description: 'Panorama das escolas brasileiras e de suas condições ambientais e sanitárias.',
    sourceUrl: envOr(
      process.env.NEXT_PUBLIC_EDUCACAO_ESCOLAS_URL,
      'https://funasa.dataiesb.com/inep/',
    ),
    revealDelayMs: 6_000,
    crop: {
      desktop: { top: 0, left: 0, bottom: 0 },
      mobile: { top: 0, left: 0, bottom: 0 },
    },
  },
  {
    slug: 'pib',
    title: 'PIB dos Municípios',
    shortTitle: 'PIB dos Municípios',
    description: 'Participação econômica e produto interno bruto nos estados e municípios brasileiros.',
    sourceUrl: envOr(
      process.env.NEXT_PUBLIC_PIB_MUNICIPIOS_URL,
      'https://funasa.dataiesb.com/pib/',
    ),
    revealDelayMs: 6_000,
    crop: {
      desktop: { top: 121, left: 0, bottom: 0 },
      mobile: { top: 85, left: 0, bottom: 0 },
    },
  },
  {
    slug: 'setores-censitarios',
    title: 'Setores Censitários 2022',
    shortTitle: 'Setores Censitários 2022',
    description: 'Indicadores territoriais do Censo Demográfico 2022 por setor censitário.',
    sourceUrl: envOr(
      process.env.NEXT_PUBLIC_SETORES_CENSITARIOS_URL,
      'https://funasa.dataiesb.com/setores-censitarios/',
    ),
    revealDelayMs: 8_000,
    mobileScale: 0.8,
    crop: {
      desktop: { top: 0, left: 0, bottom: 0 },
      mobile: { top: 0, left: 0, bottom: 0 },
    },
  },
  {
    slug: 'prefeituras',
    title: 'Painel das Prefeituras',
    shortTitle: 'Painel das Prefeituras',
    description: 'Consulta territorial de informações das prefeituras e dos municípios brasileiros.',
    sourceUrl: envOr(
      process.env.NEXT_PUBLIC_PREFEITURAS_URL,
      'https://funasa.dataiesb.com/prefeituras/',
    ),
    revealDelayMs: 9_000,
    crop: {
      desktop: { top: 96, left: 0, bottom: 0 },
      mobile: { top: 112, left: 0, bottom: 0 },
    },
  },
  {
    slug: 'clusters-lisa',
    title: 'Análise de Clusters LISA',
    shortTitle: 'Clusters LISA',
    description: 'Agrupamentos espaciais que ajudam a identificar padrões e desigualdades territoriais.',
    sourceUrl: envOr(
      process.env.NEXT_PUBLIC_CLUSTERS_LISA_URL,
      'https://funasa.dataiesb.com/clusters-lisa/',
    ),
    revealDelayMs: 9_000,
    crop: {
      desktop: { top: 0, left: 0, bottom: 0 },
      mobile: { top: 0, left: 0, bottom: 0 },
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
  const dashboard = (slug: string) => {
    const definition = getDashboardBySlug(slug)
    if (!definition) throw new Error(`Painel não registrado: ${slug}`)
    return definition
  }
  const aih = dashboard('sus-aih')
  const ambulatorial = dashboard('producao-ambulatorial')
  const sinan = dashboard('sinan-doencas-agravos')
  const susItems: ApplicationCatalogItem[] = [
    {
      key: 'sus-aih',
      title: nationalAih?.title ?? aih.shortTitle,
      description: nationalAih?.description ?? aih.description,
      eyebrow: 'SUS Assistência à Saúde',
      author: nationalAih?.author ?? 'DataIESB / FUNASA',
      href: '/paineis/sus-aih/',
      imageUrl: nationalAih?.imageUrl,
    },
    {
      key: 'sus-ambulatorial',
      title: ambulatorial.shortTitle,
      description: ambulatorial.description,
      eyebrow: 'SUS Assistência à Saúde',
      author: 'DataIESB / FUNASA',
      href: '/paineis/producao-ambulatorial/',
    },
    {
      key: 'sus-sinan',
      title: sinan.shortTitle,
      description: sinan.description,
      eyebrow: 'SUS Assistência à Saúde',
      author: 'DataIESB / FUNASA',
      href: '/paineis/sinan-doencas-agravos/',
    },
  ]

  const requestedItems: ApplicationCatalogItem[] = [
    {
      key: 'educacao-escolas',
      title: dashboard('inep').shortTitle,
      description: dashboard('inep').description,
      eyebrow: 'Panorama da Educação no Brasil',
      author: 'DataIESB / FUNASA',
      href: '/paineis/inep/',
    },
    {
      key: 'municipio-pib',
      title: dashboard('pib').shortTitle,
      description: dashboard('pib').description,
      eyebrow: 'Conheça o seu Município',
      author: 'DataIESB / FUNASA',
      href: '/paineis/pib/',
    },
    {
      key: 'municipio-setores',
      title: dashboard('setores-censitarios').shortTitle,
      description: dashboard('setores-censitarios').description,
      eyebrow: 'Conheça o seu Município',
      author: 'DataIESB / FUNASA',
      href: '/paineis/setores-censitarios/',
    },
    {
      key: 'municipio-prefeituras',
      title: dashboard('prefeituras').shortTitle,
      description: dashboard('prefeituras').description,
      eyebrow: 'Conheça o seu Município',
      author: 'DataIESB / FUNASA',
      href: '/paineis/prefeituras/',
    },
    {
      key: 'estudos-clusters-lisa',
      title: dashboard('clusters-lisa').shortTitle,
      description: dashboard('clusters-lisa').description,
      eyebrow: 'Estudos e Publicações',
      author: 'DataIESB / FUNASA',
      href: '/paineis/clusters-lisa/',
    },
  ]

  return [...generalReports, ...susItems, ...requestedItems]
}

export function getFeaturedApplications(reports: readonly PublicReport[]) {
  const catalog = buildApplicationCatalog(reports)
  const general = catalog.filter((item) => item.key.startsWith('report-')).slice(0, 3)
  const featuredKeys = new Set([
    'sus-aih',
    'educacao-escolas',
    'municipio-pib',
    'estudos-clusters-lisa',
  ])
  return [...general, ...catalog.filter((item) => featuredKeys.has(item.key))]
}
