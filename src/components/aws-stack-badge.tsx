'use client'

import { useEffect, useId, useRef, useState } from 'react'

import stackConfig from '@/config/aws-stack.json'

type Service = Readonly<{ id: string; name: string; role: string; iconKey: string; url: string }>
type Stack = Readonly<{ services: readonly Service[]; openSource: readonly string[] }>

const overrides: Readonly<Record<string, Stack>> = stackConfig.overrides

export function AwsStackBadge({ dashboardSlug, variant = 'floating' }: Readonly<{
  dashboardSlug: string
  variant?: 'floating' | 'inline'
}>) {
  const stack = overrides[dashboardSlug] ?? stackConfig.default
  const [open, setOpen] = useState(false)
  const popupId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<number | null>(null)
  const openedByHover = useRef(false)

  const cancelClose = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current)
    closeTimer.current = null
  }

  useEffect(() => () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current)
  }, [])

  return (
    <div
      className={`aws-stack-badge${variant === 'inline' ? ' is-inline' : ''}`}
      onMouseEnter={() => {
        cancelClose()
        if (!open) openedByHover.current = true
        setOpen(true)
      }}
      onMouseLeave={() => {
        openedByHover.current = false
        cancelClose()
        closeTimer.current = window.setTimeout(() => setOpen(false), 120)
      }}
      onFocusCapture={cancelClose}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          openedByHover.current = false
          setOpen(false)
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setOpen(false)
          openedByHover.current = false
          triggerRef.current?.focus()
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className="aws-stack-trigger"
        aria-expanded={open}
        aria-controls={popupId}
        onClick={() => {
          if (openedByHover.current) {
            openedByHover.current = false
            setOpen(true)
          } else {
            setOpen((current) => !current)
          }
        }}
      >
        <span className="aws-stack-trigger-label">Construído com AWS</span>
        <span className="aws-stack-trigger-icons" aria-hidden="true">
          {stack.services.map((service) => <img key={service.id} src={`/aws-icons/${service.iconKey}.svg`} alt="" width={22} height={22} loading="lazy" />)}
        </span>
      </button>
      <div id={popupId} className={`aws-stack-popup${open ? ' is-open' : ''}`} role="dialog" aria-label="Stack AWS utilizada neste painel" hidden={!open}>
        <p className="aws-stack-popup-title">Stack AWS deste painel</p>
        <ul className="aws-stack-service-list">
          {stack.services.map((service) => (
            <li key={service.id}>
              <img src={`/aws-icons/${service.iconKey}.svg`} alt={service.name} width={28} height={28} loading="lazy" />
              <span className="aws-stack-service-text">
                <strong>{service.name}</strong>
                <small>{service.role}</small>
                <a className="aws-stack-service-link" href={service.url} target="_blank" rel="noopener noreferrer">Saiba mais na AWS</a>
              </span>
            </li>
          ))}
        </ul>
        {stack.openSource.length > 0 && <p className="aws-stack-open-source">+ Software livre: {stack.openSource.join(', ')}</p>}
      </div>
    </div>
  )
}
