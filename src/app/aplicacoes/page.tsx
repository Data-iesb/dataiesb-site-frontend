import type { Metadata } from 'next'

import { ApplicationsPage } from '@/features/content/applications-page'

export const metadata: Metadata = { title: 'Aplicações e estudos' }

export default function Page() { return <ApplicationsPage /> }
