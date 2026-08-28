import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ApplicationsPage } from './applications-page'

const remoteResource = vi.hoisted(() => ({
  current: {
    data: [],
    status: 'error',
    error: 'Catálogo indisponível',
    retry: vi.fn(),
  },
}))

vi.mock('@/hooks/use-remote-resource', () => ({
  useRemoteResource: () => remoteResource.current,
}))

describe('ApplicationsPage', () => {
  beforeEach(() => {
    remoteResource.current = {
      data: [],
      status: 'error',
      error: 'Catálogo indisponível',
      retry: vi.fn(),
    }
  })

  it('keeps the three static SUS dashboards available when the reports API fails', () => {
    render(<ApplicationsPage />)

    expect(screen.getByRole('alert')).toHaveTextContent('Catálogo indisponível')
    expect(screen.getByRole('link', { name: /Visualizar Internações hospitalares/ })).toHaveAttribute('href', '/paineis/sus-aih/')
    expect(screen.getByRole('link', { name: /Visualizar Produção ambulatorial/ })).toHaveAttribute('href', '/paineis/producao-ambulatorial/')
    expect(screen.getByRole('link', { name: /Visualizar SINAN/ })).toHaveAttribute('href', '/paineis/sinan-doencas-agravos/')
  })

  it('describes an empty dynamic catalog without denying the static SUS dashboards', () => {
    remoteResource.current = {
      data: [],
      status: 'empty',
      error: '',
      retry: vi.fn(),
    }

    render(<ApplicationsPage />)

    expect(screen.getByText('Ainda não há outras aplicações publicadas.')).toBeInTheDocument()
    expect(screen.queryByText('Nenhuma aplicação disponível neste momento.')).not.toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })
})
