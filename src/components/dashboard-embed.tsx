'use client'

import { ExternalLink, RefreshCw } from 'lucide-react'
import type { CSSProperties } from 'react'
import { useEffect, useState, useSyncExternalStore } from 'react'

import { isAllowedEmbedUrl } from '@/config/catalog'
import type { DashboardDefinition } from '@/types/content'

type Props = Readonly<{
  dashboard: DashboardDefinition
  timeoutMs?: number
}>

type EmbedState = 'loading' | 'unverified' | 'error'
const subscribeToClient = () => () => undefined

export function DashboardEmbed({ dashboard, timeoutMs = 30_000 }: Props) {
  const mounted = useSyncExternalStore(subscribeToClient, () => true, () => false)
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState<EmbedState>('loading')
  const allowed = isAllowedEmbedUrl(dashboard.sourceUrl)

  useEffect(() => {
    if (!mounted || !allowed || state !== 'loading') return
    const timer = window.setTimeout(() => setState('error'), timeoutMs)
    return () => window.clearTimeout(timer)
  }, [allowed, attempt, mounted, state, timeoutMs])

  const reload = () => {
    setAttempt((value) => value + 1)
    setState('loading')
  }

  if (!allowed) {
    return (
      <section className="embed-error" role="alert">
        <h2>Origem do painel não autorizada</h2>
        <p>Confira a configuração antes de abrir esta visualização.</p>
      </section>
    )
  }

  const crop = dashboard.crop
  const cropStyle = {
    '--crop-top-desktop': `${crop.desktop.top}px`,
    '--crop-left-desktop': `${crop.desktop.left}px`,
    '--crop-bottom-desktop': `${crop.desktop.bottom}px`,
    '--crop-top-mobile': `${crop.mobile.top}px`,
    '--crop-left-mobile': `${crop.mobile.left}px`,
    '--crop-bottom-mobile': `${crop.mobile.bottom}px`,
  } as CSSProperties

  return (
    <section className="dashboard-embed" aria-label={`Visualização: ${dashboard.title}`}>
      <h1 className="sr-only">{dashboard.title}</h1>
      <div className="dashboard-toolbar">
        <span>
          {state === 'unverified'
            ? 'Conteúdo externo · disponibilidade não confirmada'
            : 'Visualização incorporada'}
        </span>
        <div>
          <button type="button" onClick={reload}><RefreshCw size={15} /> Recarregar painel</button>
          <a href={dashboard.sourceUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={15} /> Abrir painel
          </a>
        </div>
      </div>
      <div className="dashboard-canvas" data-testid="dashboard-canvas" style={cropStyle}>
        {state === 'loading' && (
          <div className="embed-status" role="status" aria-live="polite">
            <span className="loading-orbit" aria-hidden="true" />
            <strong>Carregando painel</strong>
            <span>Os dados podem levar alguns instantes para aparecer.</span>
          </div>
        )}

        {state === 'error' && (
          <div className="embed-status" role="alert">
            <strong>Não foi possível confirmar o carregamento</strong>
            <span>Tente novamente ou abra a visualização em tela cheia.</span>
            <span>Use as ações acima para recarregar ou abrir a visualização completa.</span>
          </div>
        )}

        <iframe
          key={attempt}
          className={`dashboard-frame is-${state}`}
          src={mounted ? dashboard.sourceUrl : undefined}
          title={`Painel interativo: ${dashboard.title}`}
          allow="clipboard-read; clipboard-write; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-downloads allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          tabIndex={-1}
          onLoad={() => setState('unverified')}
          onError={() => setState('error')}
        />
      </div>
    </section>
  )
}
