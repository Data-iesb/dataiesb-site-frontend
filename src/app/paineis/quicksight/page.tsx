import type { Metadata } from 'next'

import { DashboardPage } from '@/components/dashboard-page'

export const metadata: Metadata = { title: 'Painel QuickSight — Big Data IESB' }

export default function Page() { return <DashboardPage slug="quicksight" /> }
