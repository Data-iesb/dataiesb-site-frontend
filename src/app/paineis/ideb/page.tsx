import type { Metadata } from 'next'

import { DashboardPage } from '@/components/dashboard-page'

export const metadata: Metadata = { title: 'IDEB — Índice de Desenvolvimento da Educação Básica' }

export default function Page() { return <DashboardPage slug="ideb" /> }
