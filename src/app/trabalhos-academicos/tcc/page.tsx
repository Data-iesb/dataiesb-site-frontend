import type { Metadata } from 'next'

import { TccPage } from '@/features/content/tcc-page'

export const metadata: Metadata = { title: 'Trabalhos de Conclusão de Curso (TCC)' }

export default function Page() { return <TccPage /> }
