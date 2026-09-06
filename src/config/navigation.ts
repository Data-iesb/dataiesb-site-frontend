import type { NavigationGroup } from '@/types/content'

export const navigationGroups: readonly NavigationGroup[] = [
  {
    label: 'Visão geral',
    items: [
      { id: 'home', label: 'Visão geral', href: '/' },
      { id: 'noticias', label: 'Notícias', href: '/noticias/' },
    ],
  },
  {
    label: 'Inteligência Artificial',
    items: [
      {
        id: 'iara-sus',
        label: 'Aurya SUS',
        href: '/assistentes/aurya-sus/',
      },
    ],
  },
  {
    label: 'SUS Assistência à Saúde',
    items: [
      { id: 'sus-aih', label: 'Internações hospitalares — AIH', href: '/paineis/sus-aih/' },
      {
        id: 'sus-ambulatorial',
        label: 'Produção ambulatorial',
        href: '/paineis/producao-ambulatorial/',
      },
      {
        id: 'sus-sinan',
        label: 'SINAN — Doenças e Agravos',
        href: '/paineis/sinan-doencas-agravos/',
      },
    ],
  },
  {
    label: 'Educação',
    items: [
      {
        id: 'educacao-escolas',
        label: 'Censo Escolar — Ensino Médio e Fundamental',
        href: '/paineis/inep/',
      },
    ],
  },
  {
    label: 'Conheça o seu Município',
    items: [
      { id: 'municipio-pib', label: 'PIB dos Municípios', href: '/paineis/pib/' },
      {
        id: 'municipio-setores',
        label: 'Setores Censitários 2022',
        href: '/paineis/setores-censitarios/',
      },
      {
        id: 'municipio-prefeituras',
        label: 'Painel das Prefeituras',
        href: '/paineis/prefeituras/',
      },
    ],
  },
  {
    label: 'Estudos e Publicações',
    items: [
      {
        id: 'estudos-clusters-lisa',
        label: 'Clusters LISA',
        href: '/paineis/clusters-lisa/',
      },
    ],
  },
  {
    label: 'Institucional',
    items: [
      { id: 'quem-somos', label: 'Quem somos', href: '/quem-somos/' },
      { id: 'parceiros', label: 'Parceiros', href: '/parceiros/' },
      { id: 'contato', label: 'Contato', href: '/contato/' },
    ],
  },
]
