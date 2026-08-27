'use client'

import { ArrowRight, Bot, Database, GraduationCap, HeartPulse, Landmark, ShieldCheck } from 'lucide-react'

import { ApplicationCard, NewsCard, PageIntro, ResourceState } from '@/components/content-ui'
import { buildApplicationCatalog, getFeaturedApplications } from '@/config/catalog'
import { siteConfig } from '@/config/site'
import { useRemoteResource } from '@/hooks/use-remote-resource'
import { loadNews, loadReports, loadTeam } from '@/lib/content-api'

const areas = [
  { icon: HeartPulse, title: 'Saúde pública', text: 'Internações, produção ambulatorial e vigilância epidemiológica.' },
  { icon: Landmark, title: 'Gestão e políticas', text: 'Evidências para decisões públicas, institucionais e territoriais.' },
  { icon: GraduationCap, title: 'Educação aplicada', text: 'Pesquisa, formação e projetos reais com estudantes do IESB.' },
  { icon: ShieldCheck, title: 'Dados responsáveis', text: 'Fontes públicas, rastreabilidade e comunicação acessível.' },
]

export function HomePage() {
  const news = useRemoteResource(loadNews)
  const reports = useRemoteResource(loadReports)
  const team = useRemoteResource(loadTeam)
  const applications = buildApplicationCatalog(reports.data)
  const featuredApplications = getFeaturedApplications(reports.data)

  return (
    <div className="page-content home-page">
      <section className="overview-hero">
        <div>
          <PageIntro
            eyebrow="Projeto Big Data — IESB"
            title="Dados públicos transformados em conhecimento aplicável."
            description="Um portal de ciência de dados e inteligência artificial para compreender cenários, apoiar decisões e aproximar pesquisa acadêmica de desafios reais."
            actions={(
              <>
                <a className="primary-button" href="/aplicacoes/">Explorar aplicações <ArrowRight size={17} /></a>
                <a className="secondary-button" href={siteConfig.auryaUrl} target="_blank" rel="noopener noreferrer">
                  <Bot size={17} /> Conversar com a Aurya
                </a>
              </>
            )}
          />
        </div>
        <div className="signal-visual" aria-hidden="true">
          <div className="signal-grid" />
          <Database size={44} />
          <strong>DATA / EVIDÊNCIA / IMPACTO</strong>
          <span>IESB · Brasília</span>
        </div>
      </section>

      <section className="metrics-strip" aria-label="Indicadores do portal">
        <div><strong>{reports.status === 'ready' ? applications.length : '—'}</strong><span>aplicações e estudos</span></div>
        <div><strong>{news.status === 'ready' ? news.data.length : '—'}</strong><span>publicações recentes</span></div>
        <div><strong>{team.status === 'ready' ? team.data.length : '—'}</strong><span>integrantes ativos</span></div>
        <div><strong>03</strong><span>painéis SUS</span></div>
      </section>

      <section className="page-section" aria-labelledby="destaques-heading">
        <div className="section-heading"><div><span className="eyebrow">Em destaque</span><h2 id="destaques-heading">Pesquisa que chega à prática</h2></div></div>
        <ResourceState status={news.status} error={news.error} retry={news.retry} emptyMessage="Ainda não há notícias publicadas." />
        {news.status === 'ready' && news.data[0] && <NewsCard post={news.data[0]} featured />}
      </section>

      <section className="page-section" id="projects" aria-labelledby="aplicacoes-heading">
        <div className="section-heading">
          <div><span className="eyebrow">Aplicações destacadas</span><h2 id="aplicacoes-heading">Explore os dados</h2></div>
          <a href="/aplicacoes/">Ver catálogo <ArrowRight size={16} /></a>
        </div>
        <ResourceState status={reports.status} error={reports.error} retry={reports.retry} emptyMessage="Nenhuma aplicação disponível neste momento." />
        {featuredApplications.length > 0 && <div className="card-grid">{featuredApplications.map((item) => <ApplicationCard item={item} key={item.key} />)}</div>}
      </section>

      <section className="page-section" aria-labelledby="areas-heading">
        <div className="section-heading"><div><span className="eyebrow">Áreas temáticas</span><h2 id="areas-heading">Conhecimento interdisciplinar</h2></div></div>
        <div className="area-grid">{areas.map(({ icon: Icon, title, text }) => (
          <article className="area-card" key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>
        ))}</div>
      </section>

      <section className="callout" id="contact">
        <div><span className="eyebrow">Colabore conosco</span><h2>Tem um problema que os dados podem ajudar a resolver?</h2></div>
        <a className="primary-button" href="/contato/">Fale com a equipe <ArrowRight size={17} /></a>
      </section>
    </div>
  )
}
