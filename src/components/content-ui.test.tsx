import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { ApplicationCatalogItem, NewsPost } from '@/types/content'

vi.mock('@/config/site', () => ({
  siteConfig: {
    ghostSiteUrl: 'https://noticias.example.org',
  },
}))

import { ApplicationCard, NewsCard } from './content-ui'

describe('content cards', () => {
  it('renders the image supplied by the public applications catalog', () => {
    const item: ApplicationCatalogItem = {
      key: 'report-1',
      title: 'Aplicação com imagem',
      description: 'Descrição pública.',
      eyebrow: 'Estudo',
      author: 'DATA IESB',
      href: '/aplicacoes/visualizar/?id=1',
      imageUrl: 'https://images.example.org/report-1.png',
    }

    render(<ApplicationCard item={item} />)

    expect(screen.getByRole('img', { name: 'Capa de Aplicação com imagem' })).toHaveAttribute(
      'src',
      item.imageUrl,
    )
  })

  it('builds publication links from the configured Ghost site origin', () => {
    const post: NewsPost = {
      title: 'Pesquisa aplicada',
      slug: 'pesquisa-aplicada',
      excerpt: 'Resultados do projeto.',
      publishedAt: '2026-08-20T12:00:00.000Z',
    }

    render(<NewsCard post={post} />)

    expect(screen.getByRole('link', { name: 'Ler publicação' })).toHaveAttribute(
      'href',
      'https://noticias.example.org/pesquisa-aplicada/',
    )
  })
})
