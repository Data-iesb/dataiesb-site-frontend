'use client'

import { useCallback, useEffect, useState } from 'react'

type ResourceStatus = 'loading' | 'ready' | 'empty' | 'error'

export function useRemoteResource<T>(load: () => Promise<T[]>) {
  const [data, setData] = useState<T[]>([])
  const [status, setStatus] = useState<ResourceStatus>('loading')
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true
    load()
      .then((nextData) => {
        if (!active) return
        setData(nextData)
        setStatus(nextData.length ? 'ready' : 'empty')
      })
      .catch((reason: unknown) => {
        if (!active) return
        setData([])
        setError(reason instanceof Error ? reason.message : 'Não foi possível carregar os dados.')
        setStatus('error')
      })

    return () => { active = false }
  }, [attempt, load])

  const retry = useCallback(() => {
    setStatus('loading')
    setError('')
    setAttempt((value) => value + 1)
  }, [])

  return { data, status, error, retry } as const
}
