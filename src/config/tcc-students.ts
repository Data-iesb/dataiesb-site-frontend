export type TccStudent = Readonly<{
  id: string
  name: string
  photoUrl?: string
  provisionalTitle?: string
  linkedin?: string
  lattes?: string
  github?: string
}>

// Names and titles follow the TCC registration sheet and explicit confirmations.
// Photos use identified filenames or a confirmed association from the student.
export const tccStudents: readonly TccStudent[] = [
  {
    id: 'luca-adriano-melo-mendonca-soares',
    name: 'Luca Adriano Melo Mendonça Soares',
    linkedin: 'https://www.linkedin.com/in/luca-adriano-melo-mendon%C3%A7a-soares/',
    lattes: 'https://wwws.cnpq.br/cvlattesweb/PKG_MENU.menu?f_cod=BE1A5C9DBC5E47300871648E1A6AF4EF',
    github: 'https://github.com/LucaSoares66/',
    provisionalTitle: 'Como votamos - sistema de acompanhamento eleitoral para resgate da cidadania no voto.',
  },
  {
    id: 'gabriel-cesar-de-franca-pereira',
    name: 'Gabriel César de frança pereira',
    linkedin: 'https://www.linkedin.com/in/gabrielcesar-dados/',
    github: 'https://github.com/gabrielp-data',
  },
  {
    id: 'caio-rosendo-jacome',
    name: 'Caio Rosendo Jácome',
    photoUrl: '/img/tcc/foto_caio.jpeg',
    linkedin: 'http://www.linkedin.com/in/caio-rosendo-j%C3%A1come-69037a295',
    lattes: 'http://lattes.cnpq.br/7522283393263788',
    github: 'https://github.com/caiorj2004',
    provisionalTitle: 'Tipologia dos Territórios Rurais do Distrito Federal: Uma Análise de Clustering Socioespacial com a PDAD Rural 2022',
  },
  {
    id: 'leonardo-araujo-pereira',
    name: 'Leonardo Araujo Pereira',
    linkedin: 'https://www.linkedin.com/in/leoap2004/',
    lattes: 'https://lattes.cnpq.br/9660036516610210',
    github: 'https://github.com/leoarjo',
    provisionalTitle: 'Inovação Algorítmica no Judiciário Trabalhista: Robô Orientador de Entrada de Dados para Qualificação das Metas Nacionais do CNJ',
  },
  {
    id: 'eduardo-goncalves-barbosa',
    name: 'Eduardo Gonçalves Barbosa',
    linkedin: 'https://www.linkedin.com/in/eduardo-gonçalves-barbosa/',
    github: 'https://github.com/zWizhard',
  },
  {
    id: 'enzo-rodrigues-teixeira-de-andrade',
    name: 'Enzo Rodrigues Teixeira de Andrade',
    photoUrl: '/img/tcc/foto%20enzo.jpg',
    linkedin: 'https://www.linkedin.com/in/enzo-rodrigues-879649265',
    github: 'https://github.com/3nzo4ndrad3',
    provisionalTitle: 'Relação massa-raio de exoplanetas nas duas direções de predição: qualidade dos dados, modelos estatísticos e o limite da previsão.',
  },
  {
    id: 'leonardo-borges-silva-braga',
    name: 'Leonardo Borges Silva Braga',
    photoUrl: '/img/tcc/foto_Leonardo_Borges.jpg',
    linkedin: 'https://www.linkedin.com/in/leonardo-braga-1',
    github: 'https://github.com/Leo-bsb',
    provisionalTitle: 'datalock: Uma biblioteca e interface no-code para anonimização de dados pessoais conforme a LGPD.',
  },
  {
    id: 'piettro-pecidor-nakashoji',
    name: 'Piettro pecidor nakashoji',
    linkedin: 'https://www.linkedin.com/in/piettro-nakashoji-031782231?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    github: 'https://github.com/PiettroNaka',
    provisionalTitle: 'Diabetes no Brasil: painel analítico integrado de dados epidemiológicos públicos com modelagem preditiva de risco',
  },
  {
    id: 'william-wallace-ribeiro-matos',
    name: 'William Wallace Ribeiro Matos',
    linkedin: 'https://www.linkedin.com/in/william-matos-058371210/?isSelfProfile=true',
    lattes: 'http://lattes.cnpq.br/9934558267537131',
    github: 'https://github.com/wwrmatos',
  },
  {
    id: 'maycon-moriy-abe-machado',
    name: 'Maycon Moriy Abe Machado',
    linkedin: 'https://www.linkedin.com/in/mayconabe/',
    github: 'https://github.com/mayconabe',
  },
  {
    id: 'pedro-martins-rodrigues',
    name: 'Pedro Martins Rodrigues',
    photoUrl: '/img/tcc/pedro-martins-rodrigues.jpg',
    provisionalTitle: 'Detector de Fake News',
    linkedin: 'https://www.linkedin.com/in/pedro-martins-rodrigues-15176a326/?isSelfProfile=true',
    lattes: 'https://wwws.cnpq.br/cvlattesweb/PKG_MENU.menu?f_cod=08ED9A3BB4C4E29E63B39E2A0A267D70',
    github: 'https://github.com/Pedro-M-R',
  },
  {
    id: 'carlos-henrique-de-brito-teles',
    name: 'Carlos Henrique de Brito Teles',
    provisionalTitle: 'Classificação de imagens medicas com o framework MONAI',
    linkedin: 'https://www.linkedin.com/in/carlos-henrique-de-brito-teles-23208228a/',
    github: 'https://github.com/carloshenrique0309',
  },
  {
    id: 'joel-carolino-farias',
    name: 'Joel Carolino Farias',
    photoUrl: '/img/team/joel-farias.png',
    linkedin: 'https://www.linkedin.com/in/joel-carolinof/',
    lattes: 'http://lattes.cnpq.br/3218791434540061',
    github: 'https://github.com/JoelFarias',
  },
]
