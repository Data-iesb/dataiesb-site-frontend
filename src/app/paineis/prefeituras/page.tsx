import type { Metadata } from 'next'

import { DashboardPage } from '@/components/dashboard-page'

export const metadata: Metadata = { title: 'Painel das Prefeituras' }

export default function Page() { return <DashboardPage slug="prefeituras" /> }
