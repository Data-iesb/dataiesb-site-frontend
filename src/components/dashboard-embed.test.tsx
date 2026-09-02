import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { getDashboardBySlug } from '@/config/catalog'

import { DashboardEmbed } from './dashboard-embed'

afterEach(() => {
  vi.useRealTimers()
})

describe('DashboardEmbed', () => {
  it('keeps a DATA IESB preparation screen until the dashboard reveal delay expires', () => {
    vi.useFakeTimers()
    const dashboard = getDashboardBySlug('sus-aih')!
    render(<DashboardEmbed dashboard={dashboard} />)

    expect(screen.getByRole('status')).toHaveTextContent('Carregando painel')
    const frame = screen.getByTitle(`Painel interativo: ${dashboard.title}`)
    expect(frame).toHaveAttribute('src', dashboard.sourceUrl)
    expect(frame).toHaveAttribute('tabindex', '-1')
    expect(screen.getByRole('link', { name: 'Abrir painel' })).toHaveAttribute('href', dashboard.sourceUrl)
    expect(screen.getByRole('button', { name: 'Recarregar painel' })).toBeInTheDocument()

    fireEvent.load(frame)
    expect(screen.getByRole('status')).toHaveTextContent('Preparando dados do painel')
    expect(screen.getByRole('button', { name: 'Exibir agora' })).toBeInTheDocument()
    expect(frame).toHaveClass('is-preparing')

    act(() => vi.advanceTimersByTime(dashboard.revealDelayMs!))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(frame).toHaveClass('is-revealed')
    expect(screen.getByText('Painel exibido · disponibilidade externa não confirmada')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Abrir painel' })).toBeInTheDocument()
  })

  it('lets the visitor reveal the dashboard before the preparation delay expires', () => {
    vi.useFakeTimers()
    const dashboard = getDashboardBySlug('producao-ambulatorial')!
    render(<DashboardEmbed dashboard={dashboard} />)

    const frame = screen.getByTitle(`Painel interativo: ${dashboard.title}`)
    fireEvent.load(frame)
    fireEvent.click(screen.getByRole('button', { name: 'Exibir agora' }))

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(frame).toHaveClass('is-revealed')
  })

  it('reveals public report embeds immediately when they have no preparation delay', () => {
    const reportDashboard = {
      ...getDashboardBySlug('sus-aih')!,
      revealDelayMs: undefined,
    }
    render(<DashboardEmbed dashboard={reportDashboard} />)

    const frame = screen.getByTitle(`Painel interativo: ${reportDashboard.title}`)
    fireEvent.load(frame)

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(frame).toHaveClass('is-revealed')
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

    fireEvent.click(screen.getByRole('button', { name: 'Recarregar painel' }))
    expect(screen.getByRole('status')).toHaveTextContent('Carregando painel')
  })

  it('publishes the desktop and mobile crop contract as CSS variables', () => {
    const dashboard = getDashboardBySlug('sinan-doencas-agravos')!
    render(<DashboardEmbed dashboard={dashboard} />)

    expect(screen.getByTestId('dashboard-canvas')).toHaveStyle({
      '--crop-top-desktop': '121px',
      '--crop-left-desktop': '0px',
      '--crop-bottom-desktop': '0px',
      '--crop-top-mobile': '85px',
      '--crop-left-mobile': '0px',
      '--crop-bottom-mobile': '0px',
      '--frame-scale-mobile': '1',
      '--frame-top-mobile': '85px',
      '--frame-left-mobile': '0px',
      '--frame-width-mobile': 'calc(100% + 0px)',
      '--frame-height-mobile': 'calc(100% + 85px)',
    })
  })

  it('publishes the compensated mobile viewport for the census-sector dashboard', () => {
    const dashboard = getDashboardBySlug('setores-censitarios')!
    render(<DashboardEmbed dashboard={dashboard} />)

    expect(screen.getByTestId('dashboard-canvas')).toHaveStyle({
      '--frame-scale-mobile': '0.8',
      '--frame-top-mobile': '0px',
      '--frame-left-mobile': '0px',
      '--frame-width-mobile': 'calc(125% + 0px)',
      '--frame-height-mobile': 'calc(125% + 0px)',
    })
  })
})
