import type { Metadata } from 'next'

import { DashboardPage } from '@/components/dashboard-page'

export const metadata: Metadata = { title: 'Clusters LISA' }

export default function Page() { return <DashboardPage slug="clusters-lisa" /> }
