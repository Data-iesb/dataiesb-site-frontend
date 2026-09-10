import type { Metadata } from 'next'

import { DashboardPage } from '@/components/dashboard-page'

export const metadata: Metadata = { title: 'Educação Superior' }

export default function Page() { return <DashboardPage slug="educacao-superior" /> }
