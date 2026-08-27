import type { Metadata } from 'next'
import { Suspense } from 'react'

import { ReportViewer } from '@/features/content/report-viewer'

export const metadata: Metadata = { title: 'Visualizar aplicação' }

export default function Page() {
  return <Suspense fallback={<div className="resource-state" role="status">Preparando visualização…</div>}><ReportViewer /></Suspense>
}
