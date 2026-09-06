import type { Metadata } from 'next'

import { DashboardPage } from '@/components/dashboard-page'

export const metadata: Metadata = { title: 'Censo Escolar — Ensino Médio e Fundamental' }

export default function Page() { return <DashboardPage slug="inep" /> }
