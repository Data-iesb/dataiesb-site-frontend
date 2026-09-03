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
        id: 'aurya',
        label: 'Aurya',
        href: 'https://aurya.dataiesb.com',
        external: true,
      },
      {
        id: 'iara-sus',
        label: 'Aurya — SUS',
        href: '/assistentes/iara-sus/',
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
    label: 'Panorama da Educação no Brasil',
    items: [
      {
        id: 'educacao-escolas',
        label: 'Saúde Ambiental nas Escolas',
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
      { id: 'aplicacoes', label: 'Explorar catálogo', href: '/aplicacoes/' },
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
