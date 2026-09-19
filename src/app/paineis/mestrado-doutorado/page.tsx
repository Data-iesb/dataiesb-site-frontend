import type { Metadata } from 'next'

import { DashboardPage } from '@/components/dashboard-page'

export const metadata: Metadata = { title: 'Mestrado e Doutorado no Brasil' }

export default function Page() { return <DashboardPage slug="mestrado-doutorado" /> }
