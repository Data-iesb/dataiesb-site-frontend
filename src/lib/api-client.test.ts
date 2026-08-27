import { afterEach, describe, expect, it, vi } from 'vitest'

import { fetchJsonWithTimeout } from './api-client'

afterEach(() => {
  vi.useRealTimers()
})

describe('fetchJsonWithTimeout', () => {
  it('parses the JSON body through the supplied contract', async () => {
    const result = await fetchJsonWithTimeout(
      'https://api.example/data',
      (value) => (value as { value: number }).value,
      {
        fetcher: async () => new Response(JSON.stringify({ value: 42 }), { status: 200 }),
      },
    )

    expect(result).toBe(42)
  })

  it('reports the HTTP status when the remote service fails', async () => {
    await expect(
      fetchJsonWithTimeout('https://api.example/data', (value) => value, {
        fetcher: async () => new Response('unavailable', { status: 503 }),
      }),
    ).rejects.toThrow('Serviço indisponível (HTTP 503)')
  })

  it('aborts a request that exceeds its timeout', async () => {
    vi.useFakeTimers()
    const pendingFetcher = (_input: RequestInfo | URL, init?: RequestInit) =>
      new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () =>
          reject(new DOMException('Aborted', 'AbortError')),
        )
      })

    const request = fetchJsonWithTimeout('https://api.example/slow', (value) => value, {
      fetcher: pendingFetcher,
      timeoutMs: 50,
    })
    const rejection = expect(request).rejects.toThrow(
      'O serviço demorou mais que 50 ms para responder',
    )

    await vi.advanceTimersByTimeAsync(50)
    await rejection
  })
})
