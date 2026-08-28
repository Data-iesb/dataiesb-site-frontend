import type { Metadata } from 'next'

import { DashboardPage } from '@/components/dashboard-page'

export const metadata: Metadata = { title: 'SINAN — Doenças e Agravos' }

export default function Page() { return <DashboardPage slug="sinan-doencas-agravos" /> }
