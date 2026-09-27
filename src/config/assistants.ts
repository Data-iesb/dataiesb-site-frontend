export type AssistantMaterial = Readonly<{
  label: string
  href: string
}>

export type AssistantDefinition = Readonly<{
  id: string
  title: string
  eyebrow: string
  description: string
  welcome?: string
  suggestions: readonly string[]
  agent?: string
  mode?: 'professor' | 'aluno'
  materials?: readonly AssistantMaterial[]
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
    materials: [
      {
        label: 'Guia de Extensão Curricularizada',
        href: '/pdfs/guia-de-extensao-curricularizada.pdf',
      },
      {
        label: 'Guia de Atividades Complementares',
        href: '/pdfs/guia-de-atividades-complementares.pdf',
      },
    ],
  },
  {
    id: 'athena-professores',
    title: 'Athena Professores',
    eyebrow: 'Material didático',
    description:
      'Monta listas de exercícios graduais, com exemplo resolvido e gabarito comentado, apoiando o professor no planejamento de aulas.',
    welcome:
      'Olá! Sou a Athena Professores. Posso montar listas de exercícios adaptadas para alunos com mais dificuldade, com explicações passo a passo e nível progressivo. Me diga o tópico que você quer trabalhar.',
    suggestions: [
      'Monte uma lista bem fácil sobre introdução à inteligência artificial',
      'Crie exercícios com exemplo resolvido sobre tipos de aprendizado de máquina',
      'Quero um gabarito comentado sobre aplicações de inteligência artificial',
      'Crie uma lista gradual sobre a história e a evolução da IA',
      'Monte exercícios contextualizados sobre os impactos sociais da inteligência artificial',
    ],
    agent: 'educacional',
    mode: 'professor',
    materials: [
      {
        label: '01. Introdução à inteligência artificial',
        href: '/pdfs/01-introducao-a-inteligencia-artificial.pdf',
      },
      {
        label: '02. Inteligência Artificial',
        href: '/pdfs/02-inteligencia-artificial.pdf',
      },
      {
        label: '03. A sociedade e o avanço da inteligência artificial',
        href: '/pdfs/03-a-sociedade-e-o-avanco-da-inteligencia-artificial.pdf',
      },
      {
        label: '04. Tecnologia da inteligência',
        href: '/pdfs/04-tecnologia-da-inteligencia.pdf',
      },
    ],
  },
  {
    id: 'athena-alunos',
    title: 'Athena Alunos',
    eyebrow: 'Material didático',
    description:
      'Tutoria guiada que faz perguntas e dá dicas até o aluno chegar à resposta, sem entregá-la pronta.',
    welcome:
      'Olá! Sou a Athena Alunos e vou te ajudar a estudar. Vou te guiar com perguntas, sem entregar a resposta pronta, assim você aprende de verdade. Qual assunto vamos estudar hoje?',
    suggestions: [
      'Quero entender o que é inteligência artificial',
      'Não entendi a diferença entre IA e aprendizado de máquina',
      'Como a inteligência artificial funciona na prática?',
      'Me ajude a revisar as aplicações de inteligência artificial',
      'Quais são os impactos da inteligência artificial na sociedade?',
    ],
    agent: 'educacional',
    mode: 'aluno',
    materials: [
      {
        label: '01. Introdução à inteligência artificial',
        href: '/pdfs/01-introducao-a-inteligencia-artificial.pdf',
      },
      {
        label: '02. Inteligência Artificial',
        href: '/pdfs/02-inteligencia-artificial.pdf',
      },
      {
        label: '03. A sociedade e o avanço da inteligência artificial',
        href: '/pdfs/03-a-sociedade-e-o-avanco-da-inteligencia-artificial.pdf',
      },
      {
        label: '04. Tecnologia da inteligência',
        href: '/pdfs/04-tecnologia-da-inteligencia.pdf',
      },
    ],
  },
]

export function getAssistantById(id: string) {
  return assistants.find((assistant) => assistant.id === id)
}
