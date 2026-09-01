import type { Metadata } from 'next'

import { DashboardPage } from '@/components/dashboard-page'

export const metadata: Metadata = { title: 'IARA — Assistente de Inteligência Artificial' }

export default function Page() { return <DashboardPage slug="iara-sus" /> }
