'use client'

import { Bot, Mic, Plus, RefreshCw, Send, Sparkles } from 'lucide-react'
import type { FormEvent, KeyboardEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import type { AssistantDefinition } from '@/config/assistants'

type ChatMessage = Readonly<{ role: 'user' | 'assistant'; content: string }>

const PENDING_RESPONSE =
  'A conexão com o modelo de inteligência artificial será habilitada em breve. Sua pergunta foi registrada e poderá ser respondida assim que o backend estiver disponível.'

export function AuryaChat({ assistant }: Readonly<{ assistant: AssistantDefinition }>) {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    role: 'assistant',
    content: `Olá! Sou a ${assistant.title}, a assistente de inteligência artificial do DATA IESB. Digite sua pergunta abaixo ou escolha uma sugestão para começar.`,
  }])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const streamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    streamRef.current?.scrollTo({ top: streamRef.current.scrollHeight })
  }, [messages, isProcessing])

  const resetChat = () => {
    setMessages([{
      role: 'assistant',
      content: `Olá! Sou a ${assistant.title}, a assistente de inteligência artificial do DATA IESB. Digite sua pergunta abaixo ou escolha uma sugestão para começar.`,
    }])
    setInput('')
    setIsProcessing(false)
  }

  const sendMessage = (content: string) => {
    const question = content.trim()
    if (!question || isProcessing) return
    setMessages((current) => [...current, { role: 'user', content: question }])
    setInput('')
    setIsProcessing(true)
    window.setTimeout(() => {
      setMessages((current) => [...current, { role: 'assistant', content: PENDING_RESPONSE }])
      setIsProcessing(false)
    }, 900)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <div className="aurya-chat-page">
      <aside className="aurya-chat-history" aria-label="Histórico e opções da conversa">
        <button type="button" className="aurya-new-chat" onClick={resetChat}>
          <Plus size={14} strokeWidth={1.5} /> Nova conversa
        </button>
        <section className="aurya-chat-agent-summary">
          <span>{assistant.eyebrow}</span>
          <h2>{assistant.title}</h2>
          <p>{assistant.description}</p>
        </section>
        <section className="aurya-chat-suggestions">
          <h2>PERGUNTAS SUGERIDAS</h2>
          {assistant.suggestions.map((suggestion) => (
            <button
              type="button"
              key={suggestion}
              onClick={() => sendMessage(suggestion)}
              disabled={isProcessing}
            >
              <Sparkles size={14} strokeWidth={1.5} />
              <span>{suggestion}</span>
            </button>
          ))}
        </section>
      </aside>

      <section className="aurya-chat-main" aria-label={`Conversa com ${assistant.title}`}>
        <header className="aurya-chat-topbar">
          <h1><span>Aurya AI /</span> {assistant.title.toUpperCase()}</h1>
          <button type="button" onClick={resetChat}>
            <RefreshCw size={13} strokeWidth={1.5} /> Reiniciar
          </button>
        </header>

        <div className="aurya-message-stream" aria-live="polite" ref={streamRef}>
          <section className="aurya-mobile-suggestions" aria-label="Perguntas sugeridas">
            <h2>PERGUNTAS SUGERIDAS</h2>
            {assistant.suggestions.map((suggestion) => (
              <button
                type="button"
                key={suggestion}
                onClick={() => sendMessage(suggestion)}
                disabled={isProcessing}
              >
                <Sparkles size={14} strokeWidth={1.5} />
                <span>{suggestion}</span>
              </button>
            ))}
          </section>

          {messages.map((message, index) => (
            <article
              className={`aurya-chat-message ${message.role === 'assistant' ? 'message-assistant' : 'message-user'}`}
              key={`${message.role}-${index}`}
            >
              {message.role === 'assistant' && (
                <span className="aurya-message-avatar" aria-hidden="true"><Bot size={18} strokeWidth={1.6} /></span>
              )}
              <div className="aurya-message-bubble">
                <p>{message.content}</p>
              </div>
            </article>
          ))}

          {isProcessing && (
            <article className="aurya-chat-typing" aria-label="Aurya está digitando">
              <span className="aurya-message-avatar" aria-hidden="true"><Bot size={18} strokeWidth={1.6} /></span>
              <span className="aurya-typing-dots"><i /><i /><i /></span>
            </article>
          )}
        </div>

        <form className="aurya-chat-composer" onSubmit={handleSubmit}>
          <div className="with-mic">
            <label className="sr-only" htmlFor="aurya-chat-input">Digite sua pergunta</label>
            <textarea
              id="aurya-chat-input"
              rows={1}
              disabled={isProcessing}
              value={input}
              placeholder={`Pergunte para ${assistant.title}...`}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              aria-label="Gravar mensagem por voz"
              className="aurya-chat-mic"
              disabled
            >
              <Mic size={16} strokeWidth={1.5} />
            </button>
            <button type="submit" aria-label="Enviar pergunta" disabled={!input.trim() || isProcessing}>
              <Send size={18} strokeWidth={1.5} />
            </button>
          </div>
          <small>
            A Aurya pode cometer erros de interpretação matemática. Certifique-se de validar dados
            sensíveis em relatórios formais.
          </small>
        </form>
      </section>
    </div>
  )
}