import type { Metadata } from 'next'

import { PageIntro } from '@/components/content-ui'

export const metadata: Metadata = { title: 'Parceiros' }

const partners = [
  {
    name: 'Centro Universitário IESB',
    image: '/logo.png',
    imageClass: ' is-iesb',
    paragraphs: [
      'O Instituto de Educação Superior de Brasília – IESB é a instituição idealizadora e principal apoiadora do Projeto Big Data – IESB. Com forte compromisso com a inovação, a pesquisa aplicada e a formação profissional de excelência, o IESB promove esta iniciativa como um recurso estratégico voltado à transformação digital no setor público e privado e à qualificação de seus estudantes.',
      'Por meio de sua estrutura acadêmica, técnica e institucional, o IESB oferece suporte completo ao projeto, disponibilizando corpo docente especializado, laboratórios, coordenação de pesquisa e articulação com organizações públicas e privadas.',
      'A instituição tem como propósito o uso de dados e evidências para aprimorar o ciclo de políticas públicas nas áreas de saúde, segurança pública, previdência, trabalho, demografia e direitos humanos – com foco na construção de soluções analíticas e tecnológicas de vanguarda e livre acesso.',
      'O Projeto Big Data – IESB também se integra diretamente às atividades acadêmicas da instituição, proporcionando aos estudantes a oportunidade de participar de projetos reais, com desafios concretos de análise de dados e desenvolvimento de soluções de base tecnológica. A iniciativa enriquece a aprendizagem, aliando a formação técnica, crítica e cidadã dos alunos, alinhando o ensino superior à realidade do mercado e da gestão pública.',
      'Ao apoiar e manter este projeto, o IESB reafirma seu papel como agente transformador da sociedade, comprometido com a aplicação do conhecimento em benefício do desenvolvimento social, da inovação governamental e da qualificação profissional de alto nível.',
    ],
  },
  {
    name: 'Amazon Web Services',
    image: '/img/Amazon_Web_Services-Logo.wine.png',
    imageClass: '',
    paragraphs: [
      'A Amazon Web Services (AWS) é a plataforma de nuvem mais adotada e abrangente do mundo, oferecendo mais de 200 serviços completos de datacenters em todo o mundo. Milhões de clientes – incluindo as startups que crescem mais rápido, as maiores corporações e as principais agências governamentais – utilizam a AWS para reduzir custos, ganhar agilidade operacional e acelerar processos de inovação.',
      'No contexto do Projeto Big Data - IESB, a AWS fornece a infraestrutura de nuvem que sustenta o armazenamento, processamento e análise de grandes volumes de dados. Esta parceria é fundamental para o desenvolvimento e a implantação de soluções avançadas de ciência de dados e inteligência artificial, viabilizando aplicações práticas em áreas como saúde, educação, segurança pública, desenvolvimento social e gestão governamental.',
      'A AWS oferece uma ampla variedade de serviços, como tecnologias de infraestrutura, como computação, armazenamento e bancos de dados, até recursos de ponta como machine learning, inteligência artificial, data lakes, análise em tempo real e Internet das Coisas (IoT). Esta diversidade de ferramentas permite ao IESB criar soluções de forma rápida, segura e com alto desempenho, adaptando-se às necessidades específicas de cada projeto.',
      'Além disso, a AWS disponibiliza a mais ampla gama de bancos de dados especializados, otimizados para diferentes tipos de cargas de trabalho e aplicações. Isso possibilita ao Projeto Big Data - IESB escolher sempre a ferramenta mais adequada para cada caso de uso, como melhor performance, o melhor custo-benefício e obter relatórios por requisições técnicas das instituições atendidas.',
    ],
  },
  {
    name: 'SAS',
    image: '/img/sas.png',
    imageClass: '',
    paragraphs: [
      'A parceria entre o Centro Universitário IESB e a SAS, líder global em soluções de analytics, representa um importante avanço na integração entre academia e mercado. Por meio do programa SAS Viya for Learning, o IESB oferece aos seus estudantes e professores acesso gratuito a uma plataforma tecnológica de ponta, amplamente utilizada por empresas, governos e centros de pesquisa em todo o mundo.',
      'A iniciativa assegura que os alunos desenvolvam competências práticas e avançadas em preparação e análise de dados, modelagem estatística, machine learning e visualização, fortalecendo a formação prática e a preparação para os desafios do mercado.',
      'Além do SAS Viya, a parceria também incorpora o SAS Workswich, uma ferramenta inovadora e recente que permite o desenvolvimento de projetos em ambientes de ciência de dados diretamente no navegador, com suporte a múltiplas linguagens, como Python, R, SQL e a linguagem SAS.',
      'Este recurso é de extrema importância para os estudantes e pesquisadores que atuam em iniciativas como o Projeto Big Data – IESB, que utiliza soluções SAS para processar e analisar grandes volumes de dados públicos nas áreas de saúde, educação, demografia, entre tantas outras. Com esta infraestrutura tecnológica avançada, o IESB reforça seu compromisso com a formação de excelência, a pesquisa aplicada e a formação de profissionais altamente qualificados em ciência de dados e inteligência artificial.',
      'O domínio das soluções SAS aumenta significativamente a empregabilidade dos alunos do IESB, tanto no Brasil quanto no exterior, já que a proficiência nesta plataforma é um diferencial competitivo importante. Em diversas áreas, como a governamental, educacional e de saúde, sendo frequentemente citada como requisito ou diferencial competitivo em editais de concursos e processos de seleção para diversas carreiras.',
      'A parceria com a SAS abre portas para os estudantes, ampliam suas possibilidades de inserção no mercado de trabalho, acessam oportunidades internacionais e se destacam por sua capacidade de aplicar conhecimentos analíticos em contextos reais, com tecnologias amplamente adotadas por organizações de alto desempenho.',
    ],
  },
  {
    name: 'DataI',
    image: '/img/datai.png',
    imageClass: '',
    paragraphs: [
      'A DataI – Empresa Júnior de Ciência de Dados e Inteligência Artificial do IESB é uma iniciativa estudantil vinculada aos cursos da área de tecnologia e inovação da instituição. Composta por alunos orientados por professores e profissionais do mercado, a DataI atua como um ambiente de aprendizagem empreendedora e prática, promovendo o desenvolvimento de projetos reais nas áreas de ciência de dados, inteligência artificial e transformação digital.',
      'No contexto do Projeto Big Data – IESB, a DataI desempenha um papel fundamental ao integrar o conhecimento acadêmico com a aplicação prática em projetos voltados a instituições públicas e organizações parceiras. A empresa júnior participa ativamente da coleta, estruturação, análise e visualização de dados em diversas áreas temáticas, como saúde, educação, economia, meio ambiente, segurança pública, direitos humanos, previdência, trabalho e demografia.',
      'Por meio do envolvimento da DataI, os estudantes têm a oportunidade de atuar em equipes multidisciplinares, vivenciar metodologias de projetos orientados por dados e desenvolver competências técnicas e profissionais alinhadas às demandas do setor público e do mercado. A participação da empresa júnior fortalece a cultura de inovação do IESB e contribui para a formação de lideranças jovens com consciência social, pensamento analítico e capacidade de gerar impacto positivo na sociedade.',
      'Ao integrar a DataI ao Projeto Big Data – IESB, a instituição reafirma seu compromisso com a aprendizagem ativa, a extensão universitária e a preparação dos estudantes para os desafios contemporâneos da ciência de dados aplicada à gestão pública e à inovação social.',
    ],
  },
]

export default function Page() {
  return (
    <div className="page-content">
      <PageIntro eyebrow="Ecossistema" title="Parceiros que tornam o projeto possível" description="Instituições e empresas que fortalecem pesquisa, infraestrutura, formação e inovação no Projeto Big Data IESB." />
      <div className="partners-list">{partners.map((partner) => (
        <article className="partner-card" key={partner.name}>
          <div className={`partner-logo${partner.imageClass}`}><img src={partner.image} alt={`Logo ${partner.name}`} /></div>
          <div className="partner-copy">
            <h2>{partner.name}</h2>
            {partner.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </article>
      ))}</div>
    </div>
  )
}
