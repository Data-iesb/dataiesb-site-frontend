import type { Metadata } from 'next'

import { AuryaChat } from '@/components/aurya-chat'
import { getAssistantById } from '@/config/assistants'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Athena IESB',
  description: 'Ambiente da Athena IESB para conversar sobre a Extensão Curricularizada e as Atividades Complementares.',
}

export default function Page() {
  const assistant = getAssistantById('aurya-iesb')
  if (!assistant) notFound()
  return <AuryaChat assistant={assistant} />
}
