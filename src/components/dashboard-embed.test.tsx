import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { getDashboardBySlug } from '@/config/catalog'

import { DashboardEmbed } from './dashboard-embed'

afterEach(() => {
  vi.useRealTimers()
})

describe('DashboardEmbed', () => {
  it('shows a loading state and reveals the approved iframe after load', () => {
    const dashboard = getDashboardBySlug('sus-aih')!
    render(<DashboardEmbed dashboard={dashboard} />)

    expect(screen.getByRole('status')).toHaveTextContent('Carregando painel')
    const frame = screen.getByTitle(`Painel interativo: ${dashboard.title}`)
    expect(frame).toHaveAttribute('src', dashboard.sourceUrl)

    fireEvent.load(frame)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('offers retry and external access after the load timeout', () => {
    vi.useFakeTimers()
    const dashboard = getDashboardBySlug('producao-ambulatorial')!
    render(<DashboardEmbed dashboard={dashboard} timeoutMs={100} />)

    act(() => vi.advanceTimersByTime(100))
    expect(screen.getByRole('alert')).toHaveTextContent('Não foi possível confirmar o carregamento')
    expect(screen.getByRole('link', { name: 'Abrir painel' })).toHaveAttribute(
      'href',
      dashboard.sourceUrl,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Tentar novamente' }))
    expect(screen.getByRole('status')).toHaveTextContent('Carregando painel')
  })

  it('publishes the desktop and mobile crop contract as CSS variables', () => {
    const dashboard = getDashboardBySlug('sinan-doencas-agravos')!
    render(<DashboardEmbed dashboard={dashboard} />)

    expect(screen.getByTestId('dashboard-canvas')).toHaveStyle({
      '--crop-top-desktop': '64px',
      '--crop-left-desktop': '56px',
      '--crop-bottom-desktop': '0px',
      '--crop-top-mobile': '64px',
      '--crop-left-mobile': '0px',
      '--crop-bottom-mobile': '64px',
    })
  })
})
