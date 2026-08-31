'use client'

import { ApplicationCard, PageIntro, ResourceState } from '@/components/content-ui'
import { buildApplicationCatalog } from '@/config/catalog'
import { useRemoteResource } from '@/hooks/use-remote-resource'
import { loadReports } from '@/lib/content-api'

export function ApplicationsPage() {
  const reports = useRemoteResource(loadReports)
  const items = buildApplicationCatalog(reports.data)
  const general = items.filter((item) => item.key.startsWith('report-'))
  const sections = [
    { id: 'catalogo-sus', eyebrow: 'Saúde pública', title: 'SUS Assistência à Saúde' },
    { id: 'catalogo-educacao', eyebrow: 'Educação', title: 'Panorama da Educação no Brasil' },
    { id: 'catalogo-municipio', eyebrow: 'Território', title: 'Conheça o seu Município' },
    { id: 'catalogo-estudos', eyebrow: 'Análise espacial', title: 'Estudos e Publicações' },
  ] as const

  return (
    <div className="page-content">
      <PageIntro eyebrow="Catálogo público" title="Aplicações e estudos" description="Visualizações, relatórios e produtos analíticos desenvolvidos pelo DATA IESB e instituições parceiras." />
      <section className="page-section" aria-labelledby="catalogo-geral"><div className="section-heading"><div><span className="eyebrow">Produção DATA IESB</span><h2 id="catalogo-geral">Catálogo atual</h2></div></div><ResourceState status={reports.status} error={reports.error} retry={reports.retry} emptyMessage="Ainda não há outras aplicações publicadas." />{reports.status === 'ready' && <div className="card-grid">{general.map((item) => <ApplicationCard item={item} key={item.key} />)}</div>}</section>
      {sections.map((section) => {
        const sectionItems = items.filter((item) => item.eyebrow === section.title)
        if (sectionItems.length === 0) return null
        return (
          <section className="page-section" aria-labelledby={section.id} key={section.id}>
            <div className="section-heading"><div><span className="eyebrow">{section.eyebrow}</span><h2 id={section.id}>{section.title}</h2></div></div>
            <div className="card-grid">{sectionItems.map((item) => <ApplicationCard item={item} key={item.key} />)}</div>
          </section>
        )
      })}
    </div>
  )
}
