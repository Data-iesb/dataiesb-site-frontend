'use client'

import { Send } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'

import { siteConfig } from '@/config/site'

export type ContactPayload = Readonly<{
  nome: string
  cidade: string
  email: string
  mensagem: string
}>

type SubmitContact = (payload: ContactPayload) => Promise<void>

export async function submitContact(
  payload: ContactPayload,
  options: Readonly<{ fetcher?: typeof fetch; timeoutMs?: number }> = {},
) {
  const fetcher = options.fetcher ?? fetch
  const timeoutMs = options.timeoutMs ?? 10_000
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetcher(siteConfig.contactApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    const responseBody: unknown = await response.json().catch(() => null)
    if (!response.ok) {
      const message = typeof responseBody === 'object' && responseBody !== null && 'message' in responseBody
        ? String(responseBody.message)
        : `Falha no envio (HTTP ${response.status})`
      throw new Error(message)
    }
    const isObject = typeof responseBody === 'object' && responseBody !== null
    const message = isObject && 'message' in responseBody && typeof responseBody.message === 'string'
      ? responseBody.message.trim()
      : ''
    if (isObject && 'success' in responseBody && responseBody.success !== true) {
      throw new Error(message || 'O serviço de contato recusou o envio')
    }
    if (isObject && 'ok' in responseBody && responseBody.ok !== true) {
      throw new Error(message || 'O serviço de contato recusou o envio')
    }
    const hasExplicitFlag = isObject && ('success' in responseBody || 'ok' in responseBody)
    const validSuccess = isObject && (
      ('success' in responseBody && responseBody.success === true) ||
      ('ok' in responseBody && responseBody.ok === true) ||
      (!hasExplicitFlag && /^(?:(?:mensagem|e-?mail)\s+)?(?:foi\s+)?enviad[ao]\b|^sucesso\b/i.test(message))
    )
    if (!validSuccess) throw new Error('Resposta inválida do serviço de contato')
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`O envio demorou mais que ${timeoutMs} ms para responder`)
    }
    throw error
  } finally {
    window.clearTimeout(timeout)
  }
}

export function ContactForm({ submit = submitContact }: Readonly<{ submit?: SubmitContact }>) {
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const payload: ContactPayload = {
      nome: String(data.get('nome') ?? '').trim(),
      cidade: String(data.get('cidade') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      mensagem: String(data.get('mensagem') ?? '').trim(),
    }

    if (!payload.nome || !payload.cidade || !payload.email || !payload.mensagem) {
      setError('Preencha nome, cidade, e-mail e mensagem antes de continuar.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setError('Informe um e-mail válido antes de continuar.')
      return
    }

    setError('')
    setSending(true)
    try {
      await submit(payload)
      setSent(true)
      event.currentTarget.reset()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Não foi possível enviar a mensagem.')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="form-success" role="status">
        <strong>Mensagem enviada.</strong>
        <span>A equipe do DATA IESB entrará em contato.</span>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label>Nome<input name="nome" autoComplete="name" required /></label>
        <label>Cidade<input name="cidade" autoComplete="address-level2" required /></label>
      </div>
      <label>E-mail<input name="email" type="email" autoComplete="email" required /></label>
      <label>Mensagem<textarea name="mensagem" rows={6} required /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="primary-button" type="submit" disabled={sending}>
        <Send size={17} /> {sending ? 'Enviando…' : 'Enviar mensagem'}
      </button>
    </form>
  )
}
