import type { Metadata } from 'next'

import { DashboardPage } from '@/components/dashboard-page'

export const metadata: Metadata = { title: 'Setores Censitários 2022' }

export default function Page() { return <DashboardPage slug="setores-censitarios" /> }
