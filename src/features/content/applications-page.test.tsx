import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ApplicationsPage } from './applications-page'

vi.mock('@/hooks/use-remote-resource', () => ({
  useRemoteResource: () => ({
    data: [],
    status: 'error',
    error: 'Catálogo indisponível',
    retry: vi.fn(),
  }),
}))

describe('ApplicationsPage', () => {
  it('keeps the three static SUS dashboards available when the reports API fails', () => {
    render(<ApplicationsPage />)

    expect(screen.getByRole('alert')).toHaveTextContent('Catálogo indisponível')
    expect(screen.getByRole('link', { name: /Visualizar Internações hospitalares/ })).toHaveAttribute('href', '/paineis/sus-aih/')
    expect(screen.getByRole('link', { name: /Visualizar Produção ambulatorial/ })).toHaveAttribute('href', '/paineis/producao-ambulatorial/')
    expect(screen.getByRole('link', { name: /Visualizar SINAN/ })).toHaveAttribute('href', '/paineis/sinan-doencas-agravos/')
  })
})
