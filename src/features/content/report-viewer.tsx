'use client'

import { useSearchParams } from 'next/navigation'

import { DashboardEmbed } from '@/components/dashboard-embed'
import { PageIntro, ResourceState } from '@/components/content-ui'
import { resolveReportEmbed } from '@/config/catalog'
import { useRemoteResource } from '@/hooks/use-remote-resource'
import { loadReports } from '@/lib/content-api'
import type { DashboardDefinition } from '@/types/content'

export function ReportViewer() {
  const searchParams = useSearchParams()
  const reports = useRemoteResource(loadReports)
  const rawId = searchParams.get('id') ?? ''
  const id = /^\d+$/.test(rawId) ? Number(rawId) : 0
  const report = reports.data.find((item) => item.id === id)

  if (!id) return <div className="page-content"><PageIntro eyebrow="Aplicações" title="Estudo não identificado" description="O endereço informado não contém um identificador numérico válido." /></div>
  if (reports.status !== 'ready') return <div className="page-content"><ResourceState status={reports.status} error={reports.error} retry={reports.retry} emptyMessage="Nenhum estudo disponível." /></div>
  if (!report) return <div className="page-content"><PageIntro eyebrow="Aplicações" title="Estudo não encontrado" description="Este item não existe ou não está mais disponível no catálogo público." /></div>

  const dashboard: DashboardDefinition = {
    slug: `report-${report.id}`,
    title: report.title,
    shortTitle: report.title,
    description: report.description,
    sourceUrl: resolveReportEmbed(report),
    crop: { desktop: { top: 64, left: 0, bottom: 0 }, mobile: { top: 64, left: 0, bottom: 0 } },
  }

  return <DashboardEmbed dashboard={dashboard} />
}
