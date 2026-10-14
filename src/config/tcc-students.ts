export type TccStudent = Readonly<{
  id: string
  name: string
  photoUrl?: string
  provisionalTitle?: string
}>

// Names and titles follow the TCC registration sheet. A photo is set only
// where the shared folder filename identifies the student.
export const tccStudents: readonly TccStudent[] = [
  {
    id: 'luca-adriano-melo-mendonca-soares',
    name: 'Luca Adriano Melo Mendonça Soares',
    provisionalTitle: 'Como votamos - sistema de acompanhamento eleitoral para resgate da cidadania no voto.',
  },
  {
    id: 'gabriel-cesar-de-franca-pereira',
    name: 'Gabriel César de frança pereira',
  },
  {
    id: 'caio-rosendo-jacome',
    name: 'Caio Rosendo Jácome',
    photoUrl: '/img/tcc/foto_caio.jpeg',
    provisionalTitle: 'Tipologia dos Territórios Rurais do Distrito Federal: Uma Análise de Clustering Socioespacial com a PDAD Rural 2022',
  },
  {
    id: 'leonardo-araujo-pereira',
    name: 'Leonardo Araujo Pereira',
    provisionalTitle: 'Inovação Algorítmica no Judiciário Trabalhista: Robô Orientador de Entrada de Dados para Qualificação das Metas Nacionais do CNJ',
  },
  {
    id: 'eduardo-goncalves-barbosa',
    name: 'Eduardo Gonçalves Barbosa',
  },
  {
    id: 'enzo-rodrigues-teixeira-de-andrade',
    name: 'Enzo Rodrigues Teixeira de Andrade',
    photoUrl: '/img/tcc/foto%20enzo.jpg',
    provisionalTitle: 'Relação massa-raio de exoplanetas nas duas direções de predição: qualidade dos dados, modelos estatísticos e o limite da previsão.',
  },
  {
    id: 'leonardo-borges-silva-braga',
    name: 'Leonardo Borges Silva Braga',
    photoUrl: '/img/tcc/foto_Leonardo_Borges.jpg',
    provisionalTitle: 'datalock: Uma biblioteca e interface no-code para anonimização de dados pessoais conforme a LGPD.',
  },
  {
    id: 'piettro-pecidor-nakashoji',
    name: 'Piettro pecidor nakashoji',
    provisionalTitle: 'Diabetes no Brasil: painel analítico integrado de dados epidemiológicos públicos com modelagem preditiva de risco',
  },
  {
    id: 'william-wallace-ribeiro-matos',
    name: 'William Wallace Ribeiro Matos',
  },
  {
    id: 'maycon-moriy-abe-machado',
    name: 'Maycon Moriy Abe Machado',
  },
]
