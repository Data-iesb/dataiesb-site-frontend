import type { Metadata } from 'next'

import { PageIntro } from '@/components/content-ui'

export const metadata: Metadata = { title: 'Parceiros' }

const partners = [
  { name: 'Centro Universitário IESB', image: '/logo.png', text: 'Instituição idealizadora e principal apoiadora do Projeto Big Data IESB. Sua estrutura acadêmica, técnica e de pesquisa conecta formação profissional, inovação e aplicação do conhecimento em benefício da sociedade.' },
  { name: 'Amazon Web Services', image: '/img/Amazon_Web_Services-Logo.wine.png', text: 'A infraestrutura de nuvem apoia o armazenamento, o processamento e a análise de grandes volumes de dados, viabilizando soluções escaláveis em ciência de dados e inteligência artificial.' },
  { name: 'SAS', image: '/img/sas.png', text: 'A parceria amplia o acesso de estudantes e professores a tecnologias de analytics e a ambientes de aprendizagem aplicados, fortalecendo a integração entre academia, pesquisa e mercado.' },
  { name: 'DataI', image: '/img/datai.png', text: 'A empresa júnior de Ciência de Dados e Inteligência Artificial do IESB aproxima os estudantes de projetos reais, promove aprendizagem empreendedora e desenvolve soluções orientadas por dados.' },
]

export default function Page() {
  return (
    <div className="page-content">
      <PageIntro eyebrow="Ecossistema" title="Parceiros que tornam o projeto possível" description="Instituições e empresas que fortalecem pesquisa, infraestrutura, formação e inovação no Projeto Big Data IESB." />
      <div className="partners-list">{partners.map((partner) => (
        <article className="partner-card" key={partner.name}><div className="partner-logo"><img src={partner.image} alt={`Logo ${partner.name}`} /></div><div><h2>{partner.name}</h2><p>{partner.text}</p></div></article>
      ))}</div>
    </div>
  )
}
