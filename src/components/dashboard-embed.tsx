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

type EmbedState = 'loading' | 'preparing' | 'revealed' | 'error'
const subscribeToClient = () => () => undefined

export function DashboardEmbed({ dashboard, timeoutMs = 30_000 }: Props) {
  const mounted = useSyncExternalStore(subscribeToClient, () => true, () => false)
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState<EmbedState>('loading')
  const allowed = isAllowedEmbedUrl(dashboard.sourceUrl)

  useEffect(() => {
    if (!mounted || !allowed) return
    const delay = state === 'loading'
      ? timeoutMs
      : state === 'preparing'
        ? dashboard.revealDelayMs ?? 0
        : null
    if (delay === null) return
    const timer = window.setTimeout(
      () => setState(state === 'loading' ? 'error' : 'revealed'),
      delay,
    )
    return () => window.clearTimeout(timer)
  }, [allowed, attempt, dashboard.revealDelayMs, mounted, state, timeoutMs])

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
  const mobileScale = dashboard.mobileScale ?? 1
  const mobileSize = 100 / mobileScale
  const cropStyle = {
    '--crop-top-desktop': `${crop.desktop.top}px`,
    '--crop-left-desktop': `${crop.desktop.left}px`,
    '--crop-bottom-desktop': `${crop.desktop.bottom}px`,
    '--crop-top-mobile': `${crop.mobile.top}px`,
    '--crop-left-mobile': `${crop.mobile.left}px`,
    '--crop-bottom-mobile': `${crop.mobile.bottom}px`,
    '--frame-scale-mobile': `${mobileScale}`,
    '--frame-top-mobile': `${crop.mobile.top * mobileScale}px`,
    '--frame-left-mobile': `${crop.mobile.left * mobileScale}px`,
    '--frame-width-mobile': `calc(${mobileSize}% + ${crop.mobile.left}px)`,
    '--frame-height-mobile': `calc(${mobileSize}% + ${crop.mobile.top + crop.mobile.bottom}px)`,
  } as CSSProperties

  return (
    <section className="dashboard-embed" aria-label={`Visualização: ${dashboard.title}`}>
      <h1 className="sr-only">{dashboard.title}</h1>
      <div className="dashboard-toolbar">
        <span>
          {state === 'revealed'
            ? 'Painel exibido · disponibilidade externa não confirmada'
            : state === 'preparing'
              ? 'Preparando painel DATA IESB'
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

        {state === 'preparing' && (
          <div className="embed-status is-preparing" role="status" aria-live="polite">
            <span className="embed-brand" aria-hidden="true">Data<strong>IESB</strong></span>
            <span className="loading-orbit" aria-hidden="true" />
            <strong>Preparando dados do painel</strong>
            <span>Estamos organizando indicadores, mapas e gráficos para você.</span>
            <button type="button" onClick={() => setState('revealed')}>Exibir agora</button>
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
          onLoad={() => setState((dashboard.revealDelayMs ?? 0) > 0 ? 'preparing' : 'revealed')}
          onError={() => setState('error')}
        />
      </div>
    </section>
  )
}
