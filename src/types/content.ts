export type NewsPost = Readonly<{
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  featureImage?: string
  html?: string
}>

export type PublicReport = Readonly<{
  id: number
  title: string
  author: string
  description: string
  createdAt?: string
  imageUrl?: string
  url?: string
}>

export type TeamMember = Readonly<{
  id: string
  name: string
  role: string
  category: string
  linkedin?: string
  escavador?: string
}>

export type NavigationItem = Readonly<{
  id: string
  label: string
  href: string
  external?: boolean
}>

export type NavigationGroup = Readonly<{
  label: string
  items: readonly NavigationItem[]
}>

export type DashboardCrop = Readonly<{
  top: number
  left: number
  bottom: number
}>

export type DashboardDefinition = Readonly<{
  slug: string
  title: string
  shortTitle: string
  description: string
  sourceUrl: string
  revealDelayMs?: number
  mobileScale?: number
  mask?: Readonly<{
    desktopBottom: number
    mobileBottom: number
    desktopTopLeft?: Readonly<{
      width: number
      height: number
    }>
  }>
  crop: Readonly<{
    desktop: DashboardCrop
    mobile: DashboardCrop
  }>
}>

export type ApplicationCatalogItem = Readonly<{
  key: string
  title: string
  description: string
  eyebrow: string
  author: string
  href: string
  imageUrl?: string
}>
