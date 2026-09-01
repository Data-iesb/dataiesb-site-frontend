import type { Metadata } from 'next'

import { DashboardPage } from '@/components/dashboard-page'

export const metadata: Metadata = { title: 'Aurya' }

export default function Page() { return <DashboardPage slug="iara-sus" /> }
