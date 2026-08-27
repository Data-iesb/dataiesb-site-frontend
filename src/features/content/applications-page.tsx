'use client'

import { ApplicationCard, PageIntro, ResourceState } from '@/components/content-ui'
import { buildApplicationCatalog } from '@/config/catalog'
import { useRemoteResource } from '@/hooks/use-remote-resource'
import { loadReports } from '@/lib/content-api'

export function ApplicationsPage() {
  const reports = useRemoteResource(loadReports)
  const items = buildApplicationCatalog(reports.data)
  const general = items.filter((item) => item.eyebrow !== 'SUS Assistência à Saúde')
  const sus = items.filter((item) => item.eyebrow === 'SUS Assistência à Saúde')

  return (
    <div className="page-content">
      <PageIntro eyebrow="Catálogo público" title="Aplicações e estudos" description="Visualizações, relatórios e produtos analíticos desenvolvidos pelo DATA IESB e instituições parceiras." />
      <section className="page-section" aria-labelledby="catalogo-geral"><div className="section-heading"><div><span className="eyebrow">Produção DATA IESB</span><h2 id="catalogo-geral">Catálogo atual</h2></div></div><ResourceState status={reports.status} error={reports.error} retry={reports.retry} emptyMessage="Nenhuma aplicação disponível neste momento." />{reports.status === 'ready' && <div className="card-grid">{general.map((item) => <ApplicationCard item={item} key={item.key} />)}</div>}</section>
      <section className="page-section" aria-labelledby="catalogo-sus"><div className="section-heading"><div><span className="eyebrow">Saúde pública</span><h2 id="catalogo-sus">SUS Assistência à Saúde</h2></div></div><div className="card-grid">{sus.map((item) => <ApplicationCard item={item} key={item.key} />)}</div></section>
    </div>
  )
}
