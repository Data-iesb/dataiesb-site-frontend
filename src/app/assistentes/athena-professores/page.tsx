import type { Metadata } from 'next'

import { AuryaChat } from '@/components/aurya-chat'
import { getAssistantById } from '@/config/assistants'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Athena Professores',
  description: 'Ambiente da Athena Professores para montar listas de exercícios com exemplo resolvido e gabarito comentado.',
}

export default function Page() {
  const assistant = getAssistantById('athena-professores')
  if (!assistant) notFound()
  return <AuryaChat assistant={assistant} />
}
