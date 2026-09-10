import type { Metadata } from 'next'

import { AssistantsHub } from '@/features/content/assistants-hub'

export const metadata: Metadata = {
  title: 'Atena',
  description: 'Escolha a assistente de inteligência artificial do DATA IESB e converse com os dados.',
}

export default function Page() { return <AssistantsHub /> }