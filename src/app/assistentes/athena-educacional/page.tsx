import type { Metadata } from 'next'

import { AuryaChat } from '@/components/aurya-chat'
import { getAssistantById } from '@/config/assistants'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Athena Educacional',
  description: 'Ambiente da Athena Educacional para professores criarem listas de exercícios e alunos estudarem Amostragem Aplicada com tutoria guiada.',
}

export default function Page() {
  const assistant = getAssistantById('athena-educacional')
  if (!assistant) notFound()
  return <AuryaChat assistant={assistant} />
}
