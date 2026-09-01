import { render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { HomePage } from './home-page'

const resourceMock = vi.hoisted(() => ({ status: 'empty' }))

vi.mock('@/hooks/use-remote-resource', () => ({
  useRemoteResource: () => ({ data: [], status: resourceMock.status, error: '', retry: vi.fn() }),
}))

describe('HomePage national overview', () => {
  beforeEach(() => {
    resourceMock.status = 'empty'
  })

  it('shows the Brazil map and the four source-backed indicators requested by the professor', () => {
    render(<HomePage />)

    expect(screen.getByRole('img', { name: 'Mapa do Brasil' })).toBeInTheDocument()
    expect(screen.getByText('População do Brasil em 2026')).toBeInTheDocument()
    expect(screen.getByText('214,2 milhões')).toBeInTheDocument()
    expect(screen.getByText('Total de escolas')).toBeInTheDocument()
    expect(screen.getByText('178,8 mil')).toBeInTheDocument()
    expect(screen.getByText('Matrículas no Ensino Fundamental')).toBeInTheDocument()
    expect(screen.getByText('25,8 milhões')).toBeInTheDocument()
    expect(screen.getByText('Investimentos do SUS em procedimentos ambulatoriais')).toBeInTheDocument()
    expect(screen.getByText('R$ 23,8 bi')).toBeInTheDocument()
    expect(screen.getByText('R$ 10,4 bi')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Fonte: IBGE/ })).toHaveAttribute(
      'href',
      expect.stringContaining('ftp.ibge.gov.br'),
    )
  })

  it('keeps the static application total when the reports API is unavailable', () => {
    resourceMock.status = 'error'
    render(<HomePage />)

    const portalMetrics = screen.getByLabelText('Indicadores do portal')
    expect(within(portalMetrics).getByText('8')).toBeInTheDocument()
    expect(within(portalMetrics).queryByText('3+')).not.toBeInTheDocument()
  })
})
