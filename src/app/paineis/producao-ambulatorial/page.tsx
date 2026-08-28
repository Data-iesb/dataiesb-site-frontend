import type { Metadata } from 'next'

import { DashboardPage } from '@/components/dashboard-page'

export const metadata: Metadata = { title: 'Produção ambulatorial' }

export default function Page() { return <DashboardPage slug="producao-ambulatorial" /> }
