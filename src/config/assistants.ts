export type AssistantDefinition = Readonly<{
  id: string
  title: string
  eyebrow: string
  description: string
  suggestions: readonly string[]
  agent?: string
}>

export const assistants: readonly AssistantDefinition[] = [
  {
    id: 'aurya-sus',
    title: 'Athena SUS',
    eyebrow: 'Base SUS',
    description:
      'Consulta dados hospitalares do SUS (AIH) por município de residência: procedimentos, internações, gastos e grupos cirúrgicos, clínicos e de transplantes.',
    suggestions: [
      'Quais estados mais gastam com o SUS?',
      'Qual a evolução mensal de procedimentos e valores em 2025?',
      'Quais os municípios com mais internações em São Paulo em 2025?',
    ],
  },
  {
    id: 'aurya-pos-graduacao',
    title: 'Athena Pós-Graduação',
    eyebrow: 'Base CAPES',
    description:
      'Consulta os programas de pós-graduação stricto sensu do Brasil (CAPES/Sucupira) por instituição, área de conhecimento, modalidade, conceito e região.',
    suggestions: [
      'Quais instituições têm mais programas de pós-graduação?',
      'Qual a distribuição dos programas por grau?',
      'Quantos programas de pós-graduação existem por região?',
    ],
    agent: 'pos_graduacao',
  },
  {
    id: 'aurya-iesb',
    title: 'Athena IESB',
    eyebrow: 'Guias IESB',
    description:
      'Responde dúvidas sobre a Extensão Curricularizada e as Atividades Complementares do IESB, com base nos guias oficiais da instituição.',
    suggestions: [
      'Quantas horas de extensão curricularizada eu preciso cumprir?',
      'Como envio as comprovações das atividades complementares?',
      'O que conta como atividade complementar?',
    ],
    agent: 'iesb',
  },
]

export function getAssistantById(id: string) {
  return assistants.find((assistant) => assistant.id === id)
}
