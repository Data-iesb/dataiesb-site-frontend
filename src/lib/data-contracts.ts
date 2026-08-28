import type { NewsPost, PublicReport, TeamMember } from '@/types/content'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const asString = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

const optionalString = (value: unknown) => {
  const normalized = asString(value)
  return normalized || undefined
}

export function parseNewsResponse(input: unknown): NewsPost[] {
  if (!isRecord(input) || !Array.isArray(input.posts)) {
    throw new Error('Resposta inválida do serviço de notícias')
  }

  return input.posts.flatMap((entry) => {
    if (!isRecord(entry)) return []
    const title = asString(entry.title).replace(/\*+/g, '')
    const slug = asString(entry.slug)
    if (!title || !slug) return []

    return [{
      title,
      slug,
      excerpt: asString(entry.excerpt),
      publishedAt: asString(entry.published_at),
      featureImage: optionalString(entry.feature_image),
      html: optionalString(entry.html),
    }]
  })
}

export function parseReportsResponse(input: unknown): PublicReport[] {
  if (!isRecord(input)) throw new Error('Resposta inválida do serviço de aplicações')

  const entries = Object.values(input)
  const reportEntries = entries.filter((entry) => isRecord(entry) && 'id_s3' in entry)
  if (entries.length > 0 && reportEntries.length === 0) {
    throw new Error('Resposta inválida do serviço de aplicações')
  }

  return reportEntries
    .flatMap((entry) => {
      if (!isRecord(entry) || entry.deletado === true) return []
      const id = Number(entry.id_s3)
      const title = asString(entry.titulo)
      if (!Number.isSafeInteger(id) || id <= 0 || !title) return []

      return [{
        id,
        title,
        author: asString(entry.autor) || 'DataIESB',
        description: asString(entry.descricao),
        createdAt: optionalString(entry.created_at),
        imageUrl: optionalString(entry.image_url),
        url: optionalString(entry.url),
      }]
    })
    .sort((first, second) => {
      const firstDate = first.createdAt ? Date.parse(first.createdAt) : Number.NaN
      const secondDate = second.createdAt ? Date.parse(second.createdAt) : Number.NaN
      if (!Number.isNaN(firstDate) && !Number.isNaN(secondDate) && firstDate !== secondDate) {
        return secondDate - firstDate
      }
      return second.id - first.id
    })
}

export function parseTeamResponse(input: unknown): TeamMember[] {
  if (!isRecord(input) || input.success !== true || !Array.isArray(input.data)) {
    throw new Error('Resposta inválida do serviço de equipe')
  }

  return input.data.flatMap((entry) => {
    if (!isRecord(entry) || entry.active !== true) return []
    const id = asString(entry.id)
    const name = asString(entry.name)
    const role = asString(entry.role)
    const category = asString(entry.category)
    if (!id || !name || !role || !category) return []

    return [{
      id,
      name,
      role,
      category,
      linkedin: optionalString(entry.linkedin),
      escavador: optionalString(entry.escavador),
    }]
  })
}
