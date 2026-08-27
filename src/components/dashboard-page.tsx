import { notFound } from 'next/navigation'

import { DashboardEmbed } from '@/components/dashboard-embed'
import { getDashboardBySlug } from '@/config/catalog'

export function DashboardPage({ slug }: Readonly<{ slug: string }>) {
  const dashboard = getDashboardBySlug(slug)
  if (!dashboard) notFound()
  return <DashboardEmbed dashboard={dashboard} />
}
