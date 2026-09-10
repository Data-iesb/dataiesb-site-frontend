import type { Metadata } from 'next'

import { AuryaChat } from '@/components/aurya-chat'
import { getAssistantById } from '@/config/assistants'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Atena SUS',
  description: 'Ambiente da Atena SUS para conversar sobre os dados do Sistema Único de Saúde.',
}

export default function Page() {
  const assistant = getAssistantById('aurya-sus')
  if (!assistant) notFound()
  return <AuryaChat assistant={assistant} />
}