import type { Metadata } from 'next'

import { LegacyAthenaEducacional } from '@/components/legacy-athena-educacional'

export const metadata: Metadata = {
  title: 'Athena Educacional',
  description: 'Ambiente da Athena Educacional para professores criarem listas de exercícios e alunos estudarem Amostragem Aplicada com tutoria guiada.',
}

export default function Page() { return <LegacyAthenaEducacional /> }
