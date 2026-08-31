import type { Metadata } from 'next'

import { DashboardPage } from '@/components/dashboard-page'

export const metadata: Metadata = { title: 'Saúde Ambiental nas Escolas' }

export default function Page() { return <DashboardPage slug="inep" /> }
