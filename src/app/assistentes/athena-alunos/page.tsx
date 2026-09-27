import type { Metadata } from 'next'

import { AuryaChat } from '@/components/aurya-chat'
import { getAssistantById } from '@/config/assistants'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Athena Alunos',
  description: 'Ambiente da Athena Alunos para estudar com tutoria guiada, sem receber a resposta pronta.',
}

export default function Page() {
  const assistant = getAssistantById('athena-alunos')
  if (!assistant) notFound()
  return <AuryaChat assistant={assistant} />
}
