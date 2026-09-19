export type AssistantMode = Readonly<{
  id: string
  title: string
  description: string
  welcome: string
  suggestions: readonly string[]
}>

export type AssistantDefinition = Readonly<{
  id: string
  title: string
  eyebrow: string
  description: string
  suggestions: readonly string[]
  agent?: string
  modes?: readonly AssistantMode[]
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
  {
    id: 'athena-educacional',
    title: 'Athena Educacional',
    eyebrow: 'Apostilas CIA031',
    description:
      'Ajuda professores a montar listas de exercícios adaptadas para alunos com mais dificuldade e tutora os alunos de Amostragem Aplicada passo a passo, sem entregar a resposta pronta.',
    suggestions: [],
    agent: 'educacional',
    modes: [
      {
        id: 'professor',
        title: 'Sou professor',
        description:
          'Monta listas de exercícios graduais sobre Amostragem Aplicada, com exemplo resolvido e gabarito comentado.',
        welcome:
          'Olá! Sou a Athena Educacional. Posso montar listas de exercícios adaptadas para alunos com mais dificuldade, com explicações passo a passo e nível progressivo. Me diga a unidade ou o tópico que você quer trabalhar.',
        suggestions: [
          'Monte uma lista bem fácil sobre amostragem aleatória simples',
          'Crie exercícios com exemplo resolvido sobre amostragem sistemática',
          'Quero um gabarito comentado sobre tamanho da amostra',
        ],
      },
      {
        id: 'aluno',
        title: 'Quero estudar',
        description:
          'Tutoria guiada: te faz perguntas e dá dicas até você chegar na resposta, sem entregá-la pronta.',
        welcome:
          'Olá! Sou a Athena Educacional e vou te ajudar a estudar Amostragem Aplicada. Vou te guiar com perguntas, sem entregar a resposta pronta — assim você aprende de verdade. Qual assunto vamos estudar hoje?',
        suggestions: [
          'Quero entender amostragem aleatória simples',
          'Não entendi o que é amostragem sistemática',
          'Me ajude a revisar tamanho da amostra',
        ],
      },
    ],
  },
]

export function getAssistantById(id: string) {
  return assistants.find((assistant) => assistant.id === id)
}
