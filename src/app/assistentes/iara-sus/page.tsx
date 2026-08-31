import type { Metadata } from 'next'

import { DashboardPage } from '@/components/dashboard-page'

export const metadata: Metadata = { title: 'IARA-SUS' }

export default function Page() { return <DashboardPage slug="iara-sus" /> }
