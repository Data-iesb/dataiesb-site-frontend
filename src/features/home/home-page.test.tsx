import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { HomePage } from './home-page'

vi.mock('@/hooks/use-remote-resource', () => ({
  useRemoteResource: () => ({ data: [], status: 'empty', error: '', retry: vi.fn() }),
}))

describe('HomePage national overview', () => {
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
})
