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
    label: 'Assistente IA',
    items: [
      {
        id: 'aurya',
        label: 'Conversar com a Aurya',
        href: 'https://aurya.dataiesb.com',
        external: true,
      },
    ],
  },
  {
    label: 'Aplicações e estudos',
    items: [
      { id: 'aplicacoes', label: 'Explorar catálogo', href: '/aplicacoes/' },
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
    label: 'Institucional',
    items: [
      { id: 'quem-somos', label: 'Quem somos', href: '/quem-somos/' },
      { id: 'parceiros', label: 'Parceiros', href: '/parceiros/' },
      { id: 'contato', label: 'Contato', href: '/contato/' },
    ],
  },
]
