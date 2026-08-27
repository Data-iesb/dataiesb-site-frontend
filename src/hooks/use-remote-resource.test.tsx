import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useRemoteResource } from './use-remote-resource'

describe('useRemoteResource', () => {
  it('loads data and exposes an empty result', async () => {
    const load = vi.fn().mockResolvedValue([])
    const { result } = renderHook(() => useRemoteResource(load))

    expect(result.current.status).toBe('loading')
    await waitFor(() => expect(result.current.status).toBe('empty'))
    expect(result.current.data).toEqual([])
  })

  it('reports an error and retries the request', async () => {
    const load = vi.fn()
      .mockRejectedValueOnce(new Error('indisponível'))
      .mockResolvedValueOnce(['ok'])
    const { result } = renderHook(() => useRemoteResource(load))

    await waitFor(() => expect(result.current.status).toBe('error'))
    expect(result.current.error).toBe('indisponível')

    await act(() => result.current.retry())
    await waitFor(() => expect(result.current.status).toBe('ready'))
    expect(result.current.data).toEqual(['ok'])
    expect(load).toHaveBeenCalledTimes(2)
  })
})
