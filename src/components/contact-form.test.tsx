import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ContactForm, submitContact, type ContactPayload } from './contact-form'

afterEach(() => vi.useRealTimers())

describe('ContactForm', () => {
  it('guides the user when required fields are missing', async () => {
    const user = userEvent.setup()
    render(<ContactForm submit={async () => undefined} />)

    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Preencha nome, cidade, e-mail e mensagem')
    expect(screen.getByLabelText('Nome')).toHaveFocus()
  })

  it('rejects an invalid email address before submission', async () => {
    const user = userEvent.setup()
    let submitted = false
    render(<ContactForm submit={async () => { submitted = true }} />)

    await user.type(screen.getByLabelText('Nome'), 'Pessoa')
    await user.type(screen.getByLabelText('Cidade'), 'Brasília')
    await user.type(screen.getByLabelText('E-mail'), 'email-invalido')
    await user.type(screen.getByLabelText('Mensagem'), 'Olá')
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Informe um e-mail válido')
    expect(screen.getByLabelText('E-mail')).toHaveFocus()
    expect(submitted).toBe(false)
  })

  it('sends the normalized payload and confirms completion', async () => {
    const user = userEvent.setup()
    let submitted: ContactPayload | undefined
    render(<ContactForm submit={async (payload) => { submitted = payload }} />)

    await user.type(screen.getByLabelText('Nome'), '  Joel  ')
    await user.type(screen.getByLabelText('Cidade'), '  Brasília  ')
    await user.type(screen.getByLabelText('E-mail'), 'joel@example.com')
    await user.type(screen.getByLabelText('Mensagem'), '  Quero conhecer os dados.  ')
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    expect(submitted).toEqual({
      nome: 'Joel',
      cidade: 'Brasília',
      email: 'joel@example.com',
      mensagem: 'Quero conhecer os dados.',
    })
    expect(await screen.findByRole('status')).toHaveTextContent('Mensagem enviada')
  })

  it('aborts a contact request that exceeds its timeout', async () => {
    vi.useFakeTimers()
    const fetcher: typeof fetch = vi.fn((_input, init) => new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')))
    }))
    const request = submitContact(
      { nome: 'Pessoa', cidade: '', email: 'pessoa@example.com', mensagem: 'Olá' },
      { fetcher, timeoutMs: 20 },
    )
    const rejection = expect(request).rejects.toThrow('demorou mais que 20 ms')

    await vi.advanceTimersByTimeAsync(20)
    await rejection
  })

  it('rejects a malformed success response from the contact API', async () => {
    const fetcher: typeof fetch = vi.fn(async () => new Response('{}', {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }))

    await expect(submitContact(
      { nome: 'Pessoa', cidade: 'Brasília', email: 'pessoa@example.com', mensagem: 'Olá' },
      { fetcher },
    )).rejects.toThrow('Resposta inválida')
  })

  it('rejects a 2xx response whose envelope explicitly reports failure', async () => {
    const fetcher: typeof fetch = vi.fn(async () => new Response(JSON.stringify({
      success: false,
      message: 'Erro ao persistir a mensagem',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }))

    await expect(submitContact(
      { nome: 'Pessoa', cidade: 'Brasília', email: 'pessoa@example.com', mensagem: 'Olá' },
      { fetcher },
    )).rejects.toThrow('Erro ao persistir')
  })

  it('rejects a message-only response that says the message was not sent', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ message: 'Mensagem não enviada' }),
    }) as unknown as typeof fetch

    await expect(submitContact(
      { nome: 'Pessoa', cidade: 'Brasília', email: 'pessoa@example.com', mensagem: 'Olá' },
      { fetcher },
    )).rejects.toThrow('Resposta inválida')
  })
})
