import type { Metadata } from 'next'

import { DashboardPage } from '@/components/dashboard-page'

export const metadata: Metadata = { title: 'Internações hospitalares (AIH)' }

export default function Page() { return <DashboardPage slug="sus-aih" /> }
