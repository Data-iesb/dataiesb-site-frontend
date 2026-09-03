'use client'

import { ArrowRight, BarChart3, Bot, Database, GraduationCap, HeartPulse, Landmark, ShieldCheck } from 'lucide-react'

import { ApplicationCard, NewsCard, PageIntro, ResourceState } from '@/components/content-ui'
import { BrazilMap } from '@/components/brazil-map'
import { buildApplicationCatalog, getFeaturedApplications } from '@/config/catalog'
import { siteConfig } from '@/config/site'
import { useRemoteResource } from '@/hooks/use-remote-resource'
import { loadNews, loadReports, loadTeam } from '@/lib/content-api'

const areas = [
  { icon: HeartPulse, title: 'SUS Assistência à Saúde', text: 'Internações, produção ambulatorial e vigilância epidemiológica.' },
  { icon: GraduationCap, title: 'Panorama da Educação', text: 'Escolas, matrículas e condições ambientais em todo o Brasil.' },
  { icon: Landmark, title: 'Conheça o seu Município', text: 'PIB, setores censitários e informações das prefeituras.' },
  { icon: ShieldCheck, title: 'Estudos e Publicações', text: 'Análises espaciais, relatórios e conhecimento baseado em evidências.' },
]

const nationalIndicators = [
  {
    value: '214,2 milhões',
    label: 'População do Brasil em 2026',
    detail: 'Projeção da população · revisão 2024',
    source: 'IBGE',
    sourceUrl: 'https://ftp.ibge.gov.br/Projecao_da_Populacao/Projecao_da_Populacao_2024/projecoes_2024_tab1_idade_simples.xlsx',
  },
  {
    value: '178,8 mil',
    label: 'Total de escolas',
    detail: 'Censo Escolar da Educação Básica 2025',
    source: 'INEP',
    sourceUrl: 'https://www.gov.br/inep/pt-br/centrais-de-conteudo/noticias/censo-escolar/brasil-atingiu-maior-percentual-de-estudantes-em-tempo-integral',
  },
  {
    value: '25,8 milhões',
    label: 'Matrículas no Ensino Fundamental',
    detail: 'Censo Escolar da Educação Básica 2025',
    source: 'INEP',
    sourceUrl: 'https://www.gov.br/inep/pt-br/centrais-de-conteudo/noticias/censo-escolar/brasil-atingiu-maior-percentual-de-estudantes-em-tempo-integral',
  },
] as const

const differentiators = [
  { value: '05', title: '5 cursos integrados', text: 'Ciência de Dados, Ciência da Computação, Engenharia da Computação, Engenharia de Software e ADS.' },
  { value: 'IESB', title: 'Vínculo institucional IESB', text: 'Empresa júnior formalmente ligada ao Centro Universitário IESB, com orientação acadêmica.' },
  { value: 'REAL', title: 'Projetos reais entregues', text: 'Soluções de dados aplicadas a problemas concretos de pessoas e empresas.' },
]

const services = [
  { icon: Database, media: '/videos/dashboard-analytics.mp4', title: 'Análise de Dados', text: 'Exploração, limpeza e análise estatística para extrair insights acionáveis dos seus dados.' },
  { icon: Bot, media: '/videos/neural-network.mp4', title: 'Machine Learning Aplicado', text: 'Modelos preditivos e classificatórios treinados para resolver problemas específicos do seu negócio.' },
  { icon: BarChart3, media: '/videos/data-pipelines.mp4', title: 'Dashboards & Visualização', text: 'Painéis interativos que transformam dados complexos em narrativas visuais claras para tomada de decisão.' },
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
        <div className="national-map-card">
          <div className="map-card-heading"><span>Panorama nacional</span><strong>Brasil em dados</strong></div>
          <BrazilMap />
          <div className="map-card-footer">
            <span>5 regiões · 26 estados · Distrito Federal</span>
            <a href="https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo%2Bjson&amp;qualidade=minima" target="_blank" rel="noopener noreferrer">Malha: IBGE</a>
          </div>
        </div>
      </section>

      <section className="national-overview" aria-labelledby="panorama-heading">
        <div className="section-heading national-overview-heading">
          <div><span className="eyebrow">Brasil · recorte nacional</span><h2 id="panorama-heading">Indicadores em perspectiva</h2></div>
          <p>Uma leitura rápida de população, educação e assistência ambulatorial a partir de fontes públicas.</p>
        </div>
        <div className="national-indicators">
          {nationalIndicators.map((indicator) => (
            <article className="national-indicator" key={indicator.label}>
              <strong>{indicator.value}</strong>
              <h3>{indicator.label}</h3>
              <p>{indicator.detail}</p>
              <a href={indicator.sourceUrl} target="_blank" rel="noopener noreferrer">Fonte: {indicator.source}</a>
            </article>
          ))}
          <article className="national-indicator investment-indicator">
            <h3>Investimentos do SUS em procedimentos ambulatoriais</h3>
            <div className="investment-values">
              <div><strong>R$ 23,8 bi</strong><span>2025</span></div>
              <div><strong>R$ 10,4 bi</strong><span>2026 · parcial até maio</span></div>
            </div>
            <p>Valores aprovados na produção ambulatorial.</p>
            <a href="https://funasa.dataiesb.com/ambulatorio/" target="_blank" rel="noopener noreferrer">Fonte: DATA IESB / DATASUS</a>
          </article>
        </div>
      </section>

      <section className="metrics-strip" aria-label="Indicadores do portal">
        <div><strong>{applications.length}</strong><span>aplicações e estudos</span></div>
        <div><strong>{news.status === 'ready' ? news.data.length : '—'}</strong><span>publicações recentes</span></div>
        <div><strong>{team.status === 'ready' ? team.data.length : '—'}</strong><span>integrantes ativos</span></div>
        <div><strong>08</strong><span>painéis temáticos</span></div>
      </section>

      <section className="institutional-highlights" aria-label="Diferenciais do projeto">
        {differentiators.map((item) => (
          <article key={item.title}><span>{item.value}</span><h3>{item.title}</h3><p>{item.text}</p></article>
        ))}
      </section>

      <section className="page-section" aria-labelledby="servicos-heading">
        <div className="section-heading"><div><span className="eyebrow">Ciência de dados aplicada</span><h2 id="servicos-heading">O que entregamos</h2><p>Soluções estratégicas de dados, do diagnóstico à implementação.</p></div></div>
        <div className="services-grid">{services.map(({ icon: Icon, media, title, text }) => (
          <article key={title}><video className="service-card-media" autoPlay muted loop playsInline controls preload="metadata" aria-label={`Demonstração visual: ${title}`}><source src={media} type="video/mp4" /></video><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>
        ))}</div>
      </section>

      <section className="project-proof" aria-labelledby="resultados-heading">
        <div className="proof-metrics" aria-label="Resultados do DATA IESB">
          <div><strong>12</strong><span>Projetos entregues</span></div>
          <div><strong>25</strong><span>Membros ativos</span></div>
          <div><strong>05</strong><span>Cursos representados</span></div>
          <div><strong>08</strong><span>Tecnologias dominadas</span></div>
        </div>
        <div><span className="eyebrow">Projeto Big Data</span><h2 id="resultados-heading">Resultados que comprovam capacidade</h2><p>Cada projeto é uma oportunidade de aplicar rigor acadêmico a desafios reais. Nossos entregáveis combinam metodologia científica com foco em impacto mensurável.</p></div>
      </section>

      <section className="project-context" aria-labelledby="projeto-big-data-heading">
        <div className="project-context-copy">
          <span className="eyebrow">Iniciativa estratégica</span>
          <h2 id="projeto-big-data-heading">O Projeto Big Data — IESB</h2>
          <p>O <strong>Projeto Big Data — IESB</strong> é uma iniciativa estratégica voltada à criação e manutenção de um banco de dados estruturado, composto por informações públicas e, quando aplicável, dados proprietários de organizações parceiras.</p>
          <p>O objetivo central é fornecer uma <strong>análise abrangente da conjuntura estadual, distrital e municipal</strong> na melhoria da tomada de decisões, na eficiência da gestão pública, na formulação de políticas baseadas em evidências e na oferta de serviços mais qualificados à população.</p>
        </div>
        <figure className="project-context-image">
          <img src="/img/meeting.png" alt="Equipe DataIESB em sessão de trabalho colaborativo" />
          <figcaption>Pesquisa aplicada, colaboração e formação interdisciplinar.</figcaption>
        </figure>
      </section>

      <section className="page-section" aria-labelledby="destaques-heading">
        <div className="section-heading"><div><span className="eyebrow">Em destaque</span><h2 id="destaques-heading">Pesquisa que chega à prática</h2></div></div>
        <ResourceState status={news.status} error={news.error} retry={news.retry} emptyMessage="Ainda não há notícias publicadas." />
        {news.status === 'ready' && news.data[0] && <NewsCard post={news.data[0]} featured />}
      </section>

      {news.status === 'ready' && news.data.length > 1 && (
        <section className="page-section" aria-labelledby="recentes-heading">
          <div className="section-heading"><div><span className="eyebrow">Notícias</span><h2 id="recentes-heading">Publicações recentes</h2></div><a href="/noticias/">Ver todas <ArrowRight size={16} /></a></div>
          <div className="news-grid">{news.data.slice(1, 4).map((post) => <NewsCard post={post} key={post.slug} />)}</div>
        </section>
      )}

      <section className="page-section" id="projects" aria-labelledby="aplicacoes-heading">
        <div className="section-heading">
          <div><span className="eyebrow">Aplicações destacadas</span><h2 id="aplicacoes-heading">Explore os dados</h2></div>
          <a href="/aplicacoes/">Ver catálogo <ArrowRight size={16} /></a>
        </div>
        <ResourceState status={reports.status} error={reports.error} retry={reports.retry} emptyMessage="Ainda não há outras aplicações publicadas." />
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
