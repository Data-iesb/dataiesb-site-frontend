import { ArrowRight, RefreshCw } from 'lucide-react'
import type { ReactNode } from 'react'

import { siteConfig } from '@/config/site'
import type { ApplicationCatalogItem, NewsPost } from '@/types/content'

export function PageIntro({ eyebrow, title, description, actions }: Readonly<{
  eyebrow: string
  title: string
  description: string
  actions?: ReactNode
}>) {
  return (
    <header className="page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
      {actions && <div className="intro-actions">{actions}</div>}
    </header>
  )
}

export function ResourceState({ status, error, retry, emptyMessage }: Readonly<{
  status: 'loading' | 'ready' | 'empty' | 'error'
  error?: string
  retry: () => void
  emptyMessage: string
}>) {
  if (status === 'ready') return null
  if (status === 'loading') {
    return <div className="resource-state" role="status"><span className="loading-orbit" /> Carregando dados…</div>
  }
  if (status === 'empty') return <div className="resource-state">{emptyMessage}</div>
  return (
    <div className="resource-state is-error" role="alert">
      <span>{error || 'Não foi possível carregar os dados.'}</span>
      <button type="button" onClick={retry}><RefreshCw size={15} /> Tentar novamente</button>
    </div>
  )
}

export function ApplicationCard({ item }: Readonly<{ item: ApplicationCatalogItem }>) {
  return (
    <article className="content-card application-card">
      {item.imageUrl && <img className="application-card-image" src={item.imageUrl} alt={`Capa de ${item.title}`} loading="lazy" />}
      <div className="application-card-body">
      <span className="card-eyebrow">{item.eyebrow}</span>
      <h3>{item.title}</h3>
      <p>{item.description || 'Explore esta análise interativa do DATA IESB.'}</p>
      <footer>
        <span>{item.author}</span>
        <a href={item.href} aria-label={`Visualizar ${item.title}`}>
          Visualizar <ArrowRight size={15} />
        </a>
      </footer>
      </div>
    </article>
  )
}

const formatDate = (value: string) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? 'DATA IESB'
    : new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(date)
}

export function NewsCard({ post, featured = false }: Readonly<{ post: NewsPost; featured?: boolean }>) {
  const href = new URL(`${post.slug.replace(/^\/+|\/+$/g, '')}/`, `${siteConfig.ghostSiteUrl}/`).toString()
  return (
    <article className={`content-card news-card${featured ? ' is-featured' : ''}`}>
      {post.featureImage && <img src={post.featureImage} alt="" loading="lazy" />}
      <div className="news-card-body">
        <span className="card-eyebrow">{formatDate(post.publishedAt)}</span>
        <h3>{post.title}</h3>
        <p>{post.excerpt || 'Leia a publicação completa no portal de notícias do DATA IESB.'}</p>
        <a href={href} target="_blank" rel="noopener noreferrer">
          Ler publicação <ArrowRight size={15} />
        </a>
      </div>
    </article>
  )
}
