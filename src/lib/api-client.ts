type Fetcher = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>

type FetchOptions = Readonly<{
  fetcher?: Fetcher
  timeoutMs?: number
  init?: RequestInit
}>

export async function fetchJsonWithTimeout<T>(
  url: string,
  parse: (value: unknown) => T,
  options: FetchOptions = {},
): Promise<T> {
  const timeoutMs = options.timeoutMs ?? 10_000
  const fetcher = options.fetcher ?? fetch
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetcher(url, { ...options.init, signal: controller.signal })
    if (!response.ok) throw new Error(`Serviço indisponível (HTTP ${response.status})`)
    return parse(await response.json())
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`O serviço demorou mais que ${timeoutMs} ms para responder`)
    }
    throw error
  } finally {
    clearTimeout(timeout)
  }
}
