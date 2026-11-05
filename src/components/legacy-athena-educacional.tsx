'use client'

import { Plus, RefreshCw } from 'lucide-react'
import { useState } from 'react'

import { getAssistantById } from '@/config/assistants'

import { AuryaChat } from './aurya-chat'

type Mode = 'professor' | 'aluno'

const description = 'Ajuda professores a montar listas de exercícios adaptadas para alunos com mais dificuldade e tutora os alunos passo a passo, sem entregar a resposta pronta.'
const modes = {
  professor: {
    title: 'Sou professor',
    description: 'Monta listas de exercícios graduais sobre o conteúdo indexado, com exemplo resolvido e gabarito comentado.',
    welcome: 'Olá! Sou a Athena Educacional. Posso montar listas de exercícios adaptadas para alunos com mais dificuldade, com explicações passo a passo e nível progressivo. Me diga o tópico que você quer trabalhar.',
    assistantId: 'athena-professores',
  },
  aluno: {
    title: 'Quero estudar',
    description: 'Tutoria guiada: te faz perguntas e dá dicas até você chegar na resposta, sem entregá-la pronta.',
    welcome: 'Olá! Sou a Athena Educacional e vou te ajudar a estudar. Vou te guiar com perguntas, sem entregar a resposta pronta — assim você aprende de verdade. Qual assunto vamos estudar hoje?',
    assistantId: 'athena-alunos',
  },
} as const

export function LegacyAthenaEducacional() {
  const [mode, setMode] = useState<Mode | null>(null)

  if (mode) {
    const selected = modes[mode]
    const assistant = getAssistantById(selected.assistantId)
    if (!assistant) return <p>Esta assistente não está disponível.</p>
    return <AuryaChat key={mode} assistant={{ ...assistant, title: 'Athena Educacional', description, welcome: selected.welcome }} modeLabel={selected.title} onChangeMode={() => setMode(null)} />
  }

  return (
    <div className="aurya-chat-page">
      <aside className="aurya-chat-history" aria-label="Histórico e opções da conversa">
        <button type="button" className="aurya-new-chat" onClick={() => setMode(null)}><Plus size={14} strokeWidth={1.5} /> Nova conversa</button>
        <section className="aurya-chat-agent-summary">
          <span>Material didático</span>
          <h2>Athena Educacional</h2>
          <p>{description}</p>
        </section>
      </aside>
      <section className="aurya-chat-main" aria-label="Conversa com Athena Educacional">
        <header className="aurya-chat-topbar">
          <img className="atena-logo" src="/img/atena.png" alt="Athena — Deusa do Conhecimento" width={44} height={44} />
          <h1><span>Athena AI /</span> ATHENA EDUCACIONAL</h1>
          <button type="button" onClick={() => setMode(null)}><RefreshCw size={13} strokeWidth={1.5} /> Reiniciar</button>
        </header>
        <div className="aurya-mode-picker">
          <h2>Como você quer usar a Athena Educacional?</h2>
          <p>Escolha o modo para começar — dá para trocar depois.</p>
          <div className="aurya-mode-grid">
            {(Object.keys(modes) as Mode[]).map((key) => (
              <button type="button" key={key} className="aurya-mode-card" onClick={() => setMode(key)}>
                <strong>{modes[key].title}</strong>
                <span>{modes[key].description}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
