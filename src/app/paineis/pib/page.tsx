import type { Metadata } from 'next'

import { DashboardPage } from '@/components/dashboard-page'

export const metadata: Metadata = { title: 'PIB dos Municípios' }

export default function Page() { return <DashboardPage slug="pib" /> }
