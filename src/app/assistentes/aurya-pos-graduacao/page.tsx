import type { Metadata } from 'next'

import { AuryaChat } from '@/components/aurya-chat'
import { getAssistantById } from '@/config/assistants'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Atena Pós-Graduação',
  description: 'Ambiente da Atena Pós-Graduação para conversar sobre os programas de pós-graduação do Brasil (CAPES).',
}

export default function Page() {
  const assistant = getAssistantById('aurya-pos-graduacao')
  if (!assistant) notFound()
  return <AuryaChat assistant={assistant} />
}