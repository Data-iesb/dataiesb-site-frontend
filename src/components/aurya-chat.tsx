'use client'

import { Bot, Mic, Plus, RefreshCw, Send, Sparkles } from 'lucide-react'
import type { FormEvent, KeyboardEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { siteConfig } from '@/config/site'
import type { AssistantDefinition } from '@/config/assistants'

type ChatMessage = Readonly<{ role: 'user' | 'assistant'; content: string }>

type AssistantContentBlock =
  | { type: 'text'; content: string }
  | { type: 'table'; headers: string[]; rows: string[][] }

function parseTableLine(line: string) {
  const delimiter = line.includes('|') ? '|' : line.includes('\t') ? /\t+/ : null

  if (!delimiter) {
    return null
  }

  const cells = line
    .split(delimiter)
    .map((cell) => cell.trim())
    .filter(Boolean)

  return cells.length > 1 ? cells : null
}

function isMarkdownSeparatorRow(cells: string[]) {
  return cells.every((cell) => /^:?-{3,}:?$/.test(cell))
}

function isPlainSeparatorLine(line: string) {
  const trimmed = line.trim()
  const dashCount = trimmed.replace(/[^-]/g, '').length

  return dashCount >= 3 && Array.from(trimmed).every((char) => (
    char === '-' || char === ':' || char === '|' || char.trim() === ''
  ))
}

function parseAssistantContent(content: string): AssistantContentBlock[] {
  const blocks: AssistantContentBlock[] = []
  const textLines: string[] = []
  const lines = content.split(/\r?\n/)

  const flushText = () => {
    const text = textLines.join('\n').trim()

    if (text) {
      blocks.push({ type: 'text', content: text })
    }

    textLines.length = 0
  }

  for (let index = 0; index < lines.length; index += 1) {
    const firstRow = parseTableLine(lines[index])

    if (!firstRow) {
      textLines.push(lines[index])
      continue
    }

    const tableRows = [firstRow]
    const skippedTableLines: string[] = []
    let foundPlainSeparator = false
    let nextIndex = index + 1

    while (nextIndex < lines.length) {
      const nextLine = lines[nextIndex]
      const nextRow = parseTableLine(nextLine)

      if (!nextRow || nextRow.length !== firstRow.length) {
        if (tableRows.length === 1 && isPlainSeparatorLine(nextLine)) {
          skippedTableLines.push(nextLine)
          foundPlainSeparator = true
          nextIndex += 1
          continue
        }

        if (tableRows.length === 1 && foundPlainSeparator && !nextLine.trim()) {
          skippedTableLines.push(nextLine)
          nextIndex += 1
          continue
        }

        break
      }

      tableRows.push(nextRow)
      nextIndex += 1
    }

    if (tableRows.length < 2) {
      textLines.push(lines[index])
      textLines.push(...skippedTableLines)
      index = nextIndex - 1
      continue
    }

    flushText()

    const bodyRows = isMarkdownSeparatorRow(tableRows[1])
      ? tableRows.slice(2)
      : tableRows.slice(1)

    if (bodyRows.length === 0) {
      textLines.push(...lines.slice(index, nextIndex))
      index = nextIndex - 1
      continue
    }

    blocks.push({
      type: 'table',
      headers: tableRows[0],
      rows: bodyRows,
    })
    index = nextIndex - 1
  }

  flushText()

  return blocks
}

function AssistantMessageContent({ content }: Readonly<{ content: string }>) {
  const blocks = parseAssistantContent(content)

  if (blocks.length === 0) {
    return <p>{content}</p>
  }

  return (
    <>
      {blocks.map((block, blockIndex) => {
        if (block.type === 'text') {
          return <p key={`text-${blockIndex}`}>{block.content}</p>
        }

        return (
          <div className="aurya-chat-table-wrap" key={`table-${blockIndex}`}>
            <table>
              <thead>
                <tr>
                  {block.headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={`${row.join('|')}-${rowIndex}`}>
                    {row.map((cell, cellIndex) => (
                      <td key={`${cell}-${cellIndex}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      })}
    </>
  )
}

type WsResponse = Readonly<{
  answer?: string
  error?: string
  message_id?: string
  query?: string
}>

const RESPONSE_TIMEOUT_MS = 120_000

const welcome = (assistant: AssistantDefinition): ChatMessage => ({
  role: 'assistant',
  content: `Olá! Sou a ${assistant.title}, a assistente de inteligência artificial do DATA IESB. Digite sua pergunta abaixo ou escolha uma sugestão para começar.`,
})

const newSessionId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2)

export function AuryaChat({ assistant }: Readonly<{ assistant: AssistantDefinition }>) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [welcome(assistant)])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [connectionError, setConnectionError] = useState('')
  const streamRef = useRef<HTMLDivElement>(null)
  const socketRef = useRef<WebSocket | null>(null)
  const sessionIdRef = useRef(newSessionId())
  const pendingRef = useRef<{
    resolve: (response: WsResponse) => void
    timer: number
  } | null>(null)

  useEffect(() => {
    streamRef.current?.scrollTo({ top: streamRef.current.scrollHeight })
  }, [messages, isProcessing])

  const ensureSocket = useCallback(async (): Promise<WebSocket> => {
    const existing = socketRef.current
    if (existing) {
      if (existing.readyState === WebSocket.OPEN) return existing
      if (existing.readyState === WebSocket.CONNECTING) {
        return new Promise((resolve, reject) => {
          existing.addEventListener('open', () => resolve(existing), { once: true })
          existing.addEventListener('error', () => reject(new Error('Falha na conexão')), { once: true })
        })
      }
      existing.close()
      socketRef.current = null
    }

    setConnectionError('')
    const agentQuery = assistant.agent ? `?agent=${assistant.agent}` : ''
    const socket = new WebSocket(`${siteConfig.auryaWsUrl}/ws/${sessionIdRef.current}${agentQuery}`)
    socketRef.current = socket

    socket.addEventListener('message', (event) => {
      let data: WsResponse
      try {
        data = JSON.parse(String(event.data)) as WsResponse
      } catch {
        data = { error: 'Resposta inválida do backend' }
      }
      if (!pendingRef.current) return
      const { resolve, timer } = pendingRef.current
      pendingRef.current = null
      window.clearTimeout(timer)
      resolve(data)
    })

    socket.addEventListener('close', () => {
      if (pendingRef.current) {
        const { resolve, timer } = pendingRef.current
        pendingRef.current = null
        window.clearTimeout(timer)
        resolve({ error: 'Conexão encerrada pelo servidor' })
      }
    })

    await new Promise<void>((resolve, reject) => {
      socket.addEventListener('open', () => resolve(), { once: true })
      socket.addEventListener('error', () => reject(new Error('Não foi possível conectar ao servidor da Aurya')), { once: true })
    })
    return socket
  }, [assistant.agent])

  const request = useCallback(async (question: string): Promise<WsResponse> => {
    const socket = await ensureSocket()
    const messageId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    return new Promise((resolve) => {
      const timer = window.setTimeout(() => {
        if (pendingRef.current) {
          pendingRef.current = null
          resolve({ error: 'Tempo esgotado. Tente reformular a pergunta.' })
        }
      }, RESPONSE_TIMEOUT_MS)
      pendingRef.current = { resolve, timer }
      socket.send(JSON.stringify({ input_string: question, message_id: messageId }))
    })
  }, [ensureSocket])

  const sendMessage = async (content: string) => {
    const question = content.trim()
    if (!question || isProcessing) return
    setMessages((current) => [...current, { role: 'user', content: question }])
    setInput('')
    setIsProcessing(true)
    try {
      const response = await request(question)
      setMessages((current) => [...current, {
        role: 'assistant',
        content: response.error
          ? `Desculpe, não consegui processar sua pergunta agora.\n\n${response.error}`
          : (response.answer ?? 'Sem resposta do servidor.'),
      }])
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido'
      setConnectionError(message)
      setMessages((current) => [...current, {
        role: 'assistant',
        content: `Não foi possível conversar com a Aurya agora.\n\n${message}`,
      }])
    } finally {
      setIsProcessing(false)
    }
  }

  const resetChat = async () => {
    if (socketRef.current) {
      socketRef.current.close()
      socketRef.current = null
    }
    sessionIdRef.current = newSessionId()
    if (pendingRef.current) {
      window.clearTimeout(pendingRef.current.timer)
      pendingRef.current = null
    }
    setConnectionError('')
    setMessages([welcome(assistant)])
    setInput('')
    setIsProcessing(false)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void sendMessage(input)
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
        <button type="button" className="aurya-new-chat" onClick={() => void resetChat()}>
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
              onClick={() => void sendMessage(suggestion)}
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
          <button type="button" onClick={() => void resetChat()}>
            <RefreshCw size={13} strokeWidth={1.5} /> Reiniciar
          </button>
        </header>

        <div className="aurya-message-stream" aria-live="polite" ref={streamRef}>
          {connectionError && (
            <p className="aurya-connection-error" role="alert">{connectionError}</p>
          )}

          <section className="aurya-mobile-suggestions" aria-label="Perguntas sugeridas">
            <h2>PERGUNTAS SUGERIDAS</h2>
            {assistant.suggestions.map((suggestion) => (
              <button
                type="button"
                key={suggestion}
                onClick={() => void sendMessage(suggestion)}
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
                {message.role === 'assistant'
                  ? <AssistantMessageContent content={message.content} />
                  : <p>{message.content}</p>}
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