import type { Metadata } from 'next'

import { DashboardPage } from '@/components/dashboard-page'

export const metadata: Metadata = {
  title: 'Aurya SUS',
  description: 'Ambiente da Aurya SUS para conversar sobre os dados do Sistema Único de Saúde.',
}

export default function Page() { return <DashboardPage slug="iara-sus" /> }
