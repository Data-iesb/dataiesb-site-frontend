import type { Metadata } from 'next'

import { TeamPage } from '@/features/content/team-page'

export const metadata: Metadata = { title: 'Quem somos' }

export default function Page() { return <TeamPage /> }
