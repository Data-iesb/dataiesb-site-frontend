'use client'

import { NewsCard, PageIntro, ResourceState } from '@/components/content-ui'
import { useRemoteResource } from '@/hooks/use-remote-resource'
import { loadNews } from '@/lib/content-api'

export function NewsPage() {
  const news = useRemoteResource(loadNews)
  return (
    <div className="page-content">
      <PageIntro eyebrow="Publicações" title="Notícias e conhecimento" description="Atualizações, análises e resultados produzidos pelo ecossistema DATA IESB." />
      <ResourceState status={news.status} error={news.error} retry={news.retry} emptyMessage="Ainda não há notícias publicadas." />
      {news.status === 'ready' && <div className="news-grid">{news.data.map((post) => <NewsCard post={post} key={post.slug} />)}</div>}
    </div>
  )
}
