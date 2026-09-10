export type AssistantDefinition = Readonly<{
  id: string
  title: string
  eyebrow: string
  description: string
  suggestions: readonly string[]
}>

export const assistants: readonly AssistantDefinition[] = [
  {
    id: 'aurya-sus',
    title: 'Aurya SUS',
    eyebrow: 'Base SUS',
    description:
      'Consulta dados hospitalares do SUS (AIH) por município de residência: procedimentos, internações, gastos e grupos cirúrgicos, clínicos e de transplantes.',
    suggestions: [
      'Quais estados mais gastam com o SUS?',
      'Qual a evolução mensal de procedimentos e valores em 2025?',
      'Quais os municípios com mais internações em São Paulo em 2025?',
    ],
  },
]

export function getAssistantById(id: string) {
  return assistants.find((assistant) => assistant.id === id)
}