import type { Metadata } from 'next'

import { DashboardPage } from '@/components/dashboard-page'

export const metadata: Metadata = { title: 'Monitoramento de Queimadas' }

export default function Page() { return <DashboardPage slug="queimadas" /> }
